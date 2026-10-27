import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ValidFile } from "./security";

/**
 * Persistent storage for enquiries (Supabase Postgres) and private uploads (Supabase Storage).
 * Uses the service-role key server-side only; tables have RLS enabled with no public policies,
 * and the uploads bucket is private.
 */
let client: SupabaseClient | null | undefined;

function db() {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
  return client;
}

export const storageConfigured = () => !!db();
const bucket = () => process.env.SUPABASE_UPLOAD_BUCKET || "quote-uploads";

export type StoredFile = { path: string; name: string; size: number; mime: string };

export async function uploadQuoteFiles(reference: string, files: ValidFile[]): Promise<StoredFile[]> {
  const c = db();
  if (!c || !files.length) return [];
  const stored: StoredFile[] = [];
  for (const [i, f] of files.entries()) {
    const path = `${reference}/${i + 1}-${f.name}`;
    const { error } = await c.storage.from(bucket()).upload(path, f.bytes, { contentType: f.mime, upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    stored.push({ path, name: f.name, size: f.size, mime: f.mime });
  }
  return stored;
}

export async function saveQuote(row: {
  reference: string;
  company: string;
  buyer_name: string;
  buyer_email: string;
  country: string;
  products: string[];
  payload: unknown;
  files: StoredFile[];
  recaptcha_score: number | null;
  needs_review: boolean;
  ip_hash: string;
}) {
  const c = db();
  if (!c) return false;
  const { error } = await c.from("quote_enquiries").insert(row);
  if (error) throw new Error(`Database insert failed: ${error.message}`);
  return true;
}

export async function saveContact(row: {
  reference: string;
  name: string;
  email: string;
  company: string;
  topic: string;
  payload: unknown;
  recaptcha_score: number | null;
  needs_review: boolean;
  ip_hash: string;
}) {
  const c = db();
  if (!c) return false;
  const { error } = await c.from("contact_enquiries").insert(row);
  if (error) throw new Error(`Database insert failed: ${error.message}`);
  return true;
}

/** Global rate limit across instances — counts recent submissions from the same hashed IP. */
export async function recentSubmissions(table: "quote_enquiries" | "contact_enquiries", ipHash: string, minutes: number) {
  const c = db();
  if (!c) return 0;
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const { count, error } = await c.from(table).select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
  if (error) {
    console.error("[storage] rate-limit query failed", error.message);
    return 0;
  }
  return count ?? 0;
}

export async function markEmailStatus(table: "quote_enquiries" | "contact_enquiries", reference: string, status: { notified: boolean; acknowledged: boolean }) {
  const c = db();
  if (!c) return;
  const { error } = await c.from(table).update({ team_notified: status.notified, buyer_acknowledged: status.acknowledged }).eq("reference", reference);
  if (error) console.error("[storage] could not record email status", error.message);
}
