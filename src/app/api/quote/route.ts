import { NextResponse } from "next/server";
import { UPLOAD_RULES } from "@/data/quote-options";
import { envelopeSchema, issuesToMap, quoteSchema } from "@/lib/schemas";
import { emailConfigured, sendQuoteEmails } from "@/lib/server/email";
import { recaptchaMessage, verifyRecaptcha } from "@/lib/server/recaptcha";
import { clientIp, hashIp, makeReference, rateLimit, sameOrigin, tooFast, validateUploads } from "@/lib/server/security";
import { markEmailStatus, recentSubmissions, saveQuote, storageConfigured, uploadQuoteFiles } from "@/lib/server/storage";

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

  const ipHash = hashIp(ip);
  if ((await recentSubmissions("quote_enquiries", ipHash, 60)) >= 5) return fail(429, "Too many submissions from your network. Please email us directly.");

  const files = form.getAll("files").filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && (f as File).size > 0);
  const uploads = await validateUploads(files, UPLOAD_RULES.maxFiles, UPLOAD_RULES.maxTotalBytes);
  if (!uploads.ok) return fail(422, uploads.error, { files: uploads.error });

  const canStore = storageConfigured();
  if (!canStore && !emailConfigured()) {
    console.error("[quote] neither storage nor email is configured");
    return fail(503, "Online submissions are temporarily unavailable. Please email info@axisagro.co.uk.");
  }

  let stored = false;
  let storedFiles: Awaited<ReturnType<typeof uploadQuoteFiles>> = [];
  if (canStore) {
    try {
      storedFiles = await uploadQuoteFiles(reference, uploads.files);
      stored = await saveQuote({
        reference,
        company: quote.buyer.company,
        buyer_name: quote.buyer.fullName,
        buyer_email: quote.buyer.email,
        country: quote.buyer.country,
        products: quote.items.map((i) => i.productName),
        payload: quote,
        files: storedFiles,
        recaptcha_score: captcha.score,
        needs_review: captcha.review,
        ip_hash: ipHash,
      });
    } catch (err) {
      console.error("[quote] storage failed", err);
      return fail(500, "We could not save your enquiry. Please try again or email info@axisagro.co.uk.");
    }
  }

  // Without private storage, files travel only as attachments to the internal notification.
  const attachments = canStore ? [] : uploads.files.map((f) => ({ filename: f.name, content: Buffer.from(f.bytes) }));
  const fileMeta = canStore ? storedFiles : uploads.files.map((f) => ({ path: "", name: f.name, size: f.size, mime: f.mime }));
  const mail = await sendQuoteEmails({ reference, quote, files: fileMeta, attachments, review: captcha.review, score: captcha.score, stored });

  if (!stored && !mail.notified) return fail(502, "Your enquiry could not be delivered. Please email info@axisagro.co.uk.");
  if (stored) await markEmailStatus("quote_enquiries", reference, mail);

  return NextResponse.json({ ok: true, reference, acknowledged: mail.acknowledged });
}
