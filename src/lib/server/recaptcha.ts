import "server-only";

export type RecaptchaResult =
  | { ok: true; score: number; review: boolean }
  | { ok: false; reason: "missing-token" | "not-configured" | "invalid" | "action-mismatch" | "hostname-mismatch" | "low-score" | "unavailable"; score?: number };

const DEFAULT_HOSTS = ["axisagro.co.uk", "www.axisagro.co.uk", "localhost", "127.0.0.1"];

function allowedHost(hostname: string) {
  const configured = (process.env.RECAPTCHA_ALLOWED_HOSTNAMES || "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  const hosts = configured.length ? configured : DEFAULT_HOSTS;
  const h = hostname.toLowerCase();
  // Allow this project's Vercel preview hostnames.
  return hosts.includes(h) || (h.endsWith(".vercel.app") && h.startsWith("axis-"));
}

/**
 * Verifies a reCAPTCHA v3 token server-side: success, action, hostname and score.
 * Scores below `hardFloor` are rejected; scores between the floor and the minimum
 * score are accepted but flagged for manual review.
 */
export async function verifyRecaptcha(token: string, expectedAction: string, remoteIp?: string): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: false, reason: "not-configured" };
  if (!token) return { ok: false, reason: "missing-token" };

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);
  const hardFloor = Math.min(0.3, minScore);

  let data: { success: boolean; score?: number; action?: string; hostname?: string; "error-codes"?: string[] };
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    data = await res.json();
  } catch (err) {
    console.error("[recaptcha] verification request failed", err);
    return { ok: false, reason: "unavailable" };
  }

  if (!data.success) {
    console.warn("[recaptcha] invalid token", data["error-codes"]);
    return { ok: false, reason: "invalid" };
  }
  if (data.action !== expectedAction) return { ok: false, reason: "action-mismatch", score: data.score };
  if (!data.hostname || !allowedHost(data.hostname)) {
    console.warn("[recaptcha] unexpected hostname", data.hostname);
    return { ok: false, reason: "hostname-mismatch", score: data.score };
  }
  const score = data.score ?? 0;
  if (score < hardFloor) return { ok: false, reason: "low-score", score };
  return { ok: true, score, review: score < minScore };
}

export function recaptchaMessage(reason: Exclude<RecaptchaResult, { ok: true }>["reason"]) {
  switch (reason) {
    case "missing-token":
      return "Spam protection did not load. Please allow it in cookie settings and try again.";
    case "not-configured":
      return "Online submissions are temporarily unavailable. Please email us directly.";
    case "unavailable":
      return "We could not verify your submission right now. Please try again in a moment.";
    case "low-score":
      return "Your submission could not be verified automatically. Please email us directly and we will respond.";
    default:
      return "Verification failed. Please refresh the page and try again.";
  }
}
