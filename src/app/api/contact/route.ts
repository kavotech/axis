import { NextResponse } from "next/server";
import { contactSchema, envelopeSchema, issuesToMap } from "@/lib/schemas";
import { emailConfigured, sendContactEmails } from "@/lib/server/email";
import { recaptchaMessage, verifyRecaptcha } from "@/lib/server/recaptcha";
import { clientIp, makeReference, rateLimit, sameOrigin, tooFast } from "@/lib/server/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fail = (status: number, error: string, fields?: Record<string, string>) => NextResponse.json({ ok: false, error, fields }, { status });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return fail(403, "Request rejected.");
  const ip = clientIp(req);
  const local = rateLimit(`contact:${ip}`, 5, 10 * 60_000);
  if (!local.ok) return NextResponse.json({ ok: false, error: "Too many messages. Please wait a few minutes and try again." }, { status: 429, headers: { "Retry-After": String(local.retryAfter) } });

  const text = await req.text();
  if (text.length > 20_000) return fail(413, "Your message is too long.");
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return fail(400, "The submission could not be read.");
  }

  const envelope = envelopeSchema.safeParse(body);
  if (!envelope.success) return fail(400, "The submission could not be read.");
  const reference = makeReference("AXC");
  if (envelope.data.fax) return NextResponse.json({ ok: true, reference });
  if (tooFast(envelope.data.startedAt, 3_000)) return fail(400, "That was quick! Please check your message and send again.");

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return fail(422, "Please correct the highlighted fields.", issuesToMap(parsed.error));
  const data = parsed.data;

  const captcha = await verifyRecaptcha(envelope.data.recaptchaToken, "contact", ip);
  if (!captcha.ok) {
    console.warn("[contact] reCAPTCHA rejected", captcha.reason, captcha.score);
    return fail(captcha.reason === "not-configured" || captcha.reason === "unavailable" ? 503 : 400, recaptchaMessage(captcha.reason));
  }

  if (!emailConfigured()) return fail(503, "Online messages are temporarily unavailable. Please email info@axisagro.co.uk.");

  const mail = await sendContactEmails({ reference, data, review: captcha.review, score: captcha.score });
  if (!mail.notified) return fail(502, "Your message could not be delivered. Please email info@axisagro.co.uk.");

  return NextResponse.json({ ok: true, reference, acknowledged: mail.acknowledged });
}
