import "server-only";
import { createHash, randomBytes } from "node:crypto";

/**
 * Best-effort, per-instance sliding-window rate limiter. Serverless instances do not
 * share memory, so persistent storage applies a second, global check when available.
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}

export function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

/** Salted hash so raw IP addresses are never stored. */
export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT || process.env.RECAPTCHA_SECRET_KEY || "axis-agro";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/** Same-origin check for browser POSTs. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // non-browser clients are still subject to reCAPTCHA
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    return o.host === host;
  } catch {
    return false;
  }
}

/** Reference like AXQ-261027-7KQ4MZ — date-stamped, unambiguous characters. */
export function makeReference(prefix: "AXQ" | "AXC") {
  const d = new Date();
  const ymd = `${String(d.getUTCFullYear()).slice(2)}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  const tail = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `${prefix}-${ymd}-${tail}`;
}

/** Anti-bot timing: humans take more than a few seconds to fill a form. */
export function tooFast(startedAt: number, minMs: number) {
  return !startedAt || Date.now() - startedAt < minMs;
}

// ── File validation ──────────────────────────────────────────────────────────

const SIGNATURES: { ext: string[]; mime: string; test: (b: Uint8Array) => boolean }[] = [
  { ext: ["pdf"], mime: "application/pdf", test: (b) => b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46 },
  { ext: ["png"], mime: "image/png", test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: ["jpg", "jpeg"], mime: "image/jpeg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: ["docx"], mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", test: (b) => b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04 },
  { ext: ["xlsx"], mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", test: (b) => b[0] === 0x50 && b[1] === 0x4b && b[2] === 0x03 && b[3] === 0x04 },
  {
    ext: ["csv"],
    mime: "text/csv",
    // Printable text only — no NUL bytes in the first chunk.
    test: (b) => b.length > 0 && !b.subarray(0, 2048).includes(0),
  },
];

export type ValidFile = { name: string; mime: string; size: number; bytes: Uint8Array };

export async function validateUploads(files: File[], maxFiles: number, maxTotal: number): Promise<{ ok: true; files: ValidFile[] } | { ok: false; error: string }> {
  if (files.length > maxFiles) return { ok: false, error: `Upload up to ${maxFiles} files.` };
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > maxTotal) return { ok: false, error: `Files must total ${Math.round(maxTotal / 1024 / 1024)}MB or less.` };
  const out: ValidFile[] = [];
  for (const f of files) {
    if (!f.size) return { ok: false, error: `“${f.name}” is empty.` };
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    const sig = SIGNATURES.find((s) => s.ext.includes(ext));
    if (!sig) return { ok: false, error: `“${f.name}” is not an accepted file type.` };
    const bytes = new Uint8Array(await f.arrayBuffer());
    if (!sig.test(bytes)) return { ok: false, error: `“${f.name}” does not match its file type.` };
    const safeName = f.name
      .normalize("NFKD")
      .replace(/[^\w.\- ]+/g, "")
      .replace(/\s+/g, "-")
      .slice(-80) || `file.${ext}`;
    out.push({ name: safeName, mime: sig.mime, size: f.size, bytes });
  }
  return { ok: true, files: out };
}
