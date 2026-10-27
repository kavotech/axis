import { NextResponse } from "next/server";
import { UPLOAD_RULES } from "@/data/quote-options";
import { envelopeSchema, issuesToMap, quoteSchema } from "@/lib/schemas";
import { emailConfigured, sendQuoteEmails } from "@/lib/server/email";
import { recaptchaMessage, verifyRecaptcha } from "@/lib/server/recaptcha";
import { clientIp, makeReference, rateLimit, sameOrigin, tooFast, validateUploads } from "@/lib/server/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const fail = (status: number, error: string, fields?: Record<string, string>) => NextResponse.json({ ok: false, error, fields }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, "Request rejected.");

  const ip = clientIp(req);
  const local = rateLimit(`quote:${ip}`, 5, 10 * 60_000);
  if (!local.ok) return NextResponse.json({ ok: false, error: "Too many submissions. Please wait a few minutes and try again." }, { status: 429, headers: { "Retry-After": String(local.retryAfter) } });

  const len = Number(req.headers.get("content-length") || 0);
  if (len > UPLOAD_RULES.maxTotalBytes + 256 * 1024) return fail(413, "Your files are too large. Please keep uploads under 4MB in total.");

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail(400, "The submission could not be read. Please try again.");
  }

  const rawData = form.get("data");
  if (typeof rawData !== "string" || rawData.length > 100_000) return fail(400, "The submission could not be read.");

  const field = (k: string) => form.get(k) ?? undefined;
  const envelope = envelopeSchema.safeParse({ recaptchaToken: field("recaptchaToken"), fax: field("fax"), startedAt: field("startedAt") });
  if (!envelope.success) return fail(400, "The submission could not be read.");
  const reference = makeReference("AXQ");

  // Honeypot: silently accept so bots learn nothing.
  if (envelope.data.fax) return NextResponse.json({ ok: true, reference });
  if (tooFast(envelope.data.startedAt, 8_000)) return fail(400, "That was quick! Please review your details and submit again.");

  let json: unknown;
  try {
    json = JSON.parse(rawData);
  } catch {
    return fail(400, "The submission could not be read.");
  }
  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) return fail(422, "Please correct the highlighted fields.", issuesToMap(parsed.error));
  const quote = parsed.data;

  const captcha = await verifyRecaptcha(envelope.data.recaptchaToken, "quote", ip);
  if (!captcha.ok) {
    console.warn("[quote] reCAPTCHA rejected", captcha.reason, captcha.score);
    return fail(captcha.reason === "not-configured" || captcha.reason === "unavailable" ? 503 : 400, recaptchaMessage(captcha.reason));
  }

  const files = form.getAll("files").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && (f as File).size > 0);
  const uploads = await validateUploads(files, UPLOAD_RULES.maxFiles, UPLOAD_RULES.maxTotalBytes);
  if (!uploads.ok) return fail(422, uploads.error, { files: uploads.error });

  if (!emailConfigured()) {
    console.error("[quote] email is not configured");
    return fail(503, "Online submissions are temporarily unavailable. Please email info@axisagro.co.uk.");
  }

  // Uploaded files travel only as attachments to the internal notification email.
  const attachments = uploads.files.map((f) => ({ filename: f.name, content: Buffer.from(f.bytes) }));
  const mail = await sendQuoteEmails({ reference, quote, files: uploads.files, attachments, review: captcha.review, score: captcha.score });
  if (!mail.notified) return fail(502, "Your enquiry could not be delivered. Please email info@axisagro.co.uk.");

  return NextResponse.json({ ok: true, reference, acknowledged: mail.acknowledged });
}
