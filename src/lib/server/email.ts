import "server-only";
import { Resend } from "resend";
import { DOCUMENTS, QUANTITY_UNITS } from "@/data/quote-options";
import { SITE } from "@/data/site";
import type { ContactData, QuoteData } from "@/lib/schemas";

// ── Configuration ────────────────────────────────────────────────────────────

const env = (...names: string[]) => names.map((n) => process.env[n]?.trim()).find(Boolean) || "";

function fromAddress() {
  const raw = env("EMAIL_FROM_ADDRESS", "SENDER_EMAIL");
  if (!raw) return "";
  return raw.includes("<") ? raw : `Axis Agro International <${raw}>`;
}
const list = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);
const uniq = (xs: string[]) => [...new Set(xs.map((x) => x.toLowerCase()))];
/** Quotations go to general + operations mailboxes unless QUOTE_NOTIFICATION_EMAIL overrides. ADMIN_EMAIL_1 is kept as a copy if set. */
const quoteRecipients = () => {
  const override = env("QUOTE_NOTIFICATION_EMAIL");
  return override ? list(override) : uniq([SITE.emails.general, SITE.emails.operations, ...list(env("ADMIN_EMAIL_1"))]);
};
/** Contact messages are routed by topic unless CONTACT_NOTIFICATION_EMAIL overrides. */
const TOPIC_ROUTES: Record<string, string> = {
  "Supplier / sourcing partnership": SITE.emails.uganda,
  "Logistics & documentation": SITE.emails.operations,
  "Leadership / strategic partnership": SITE.emails.director,
};
const contactRecipients = (topic?: string) => {
  const override = env("CONTACT_NOTIFICATION_EMAIL");
  if (override) return list(override);
  return uniq([(topic && TOPIC_ROUTES[topic]) || SITE.emails.general, ...list(env("ADMIN_EMAIL_1"))]);
};

let resend: Resend | null | undefined;
function client() {
  if (resend !== undefined) return resend;
  const key = process.env.RESEND_API_KEY;
  resend = key ? new Resend(key) : null;
  return resend;
}
export const emailConfigured = () => !!client() && !!fromAddress();

type Attachment = { filename: string; content: Buffer };

async function send(opts: { to: string[]; subject: string; html: string; text: string; replyTo?: string; attachments?: Attachment[] }) {
  const c = client();
  const from = fromAddress();
  if (!c || !from) return { ok: false as const, error: "Email is not configured" };
  try {
    const { data, error } = await c.emails.send({ from, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text, replyTo: opts.replyTo, attachments: opts.attachments });
    if (error) {
      console.error("[email] Resend rejected message", error);
      return { ok: false as const, error: error.message };
    }
    return { ok: true as const, id: data?.id };
  } catch (err) {
    console.error("[email] send failed", err);
    return { ok: false as const, error: "Email delivery failed" };
  }
}

// ── Template helpers ─────────────────────────────────────────────────────────

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

const C = { forest: "#0c2a1e", botanical: "#2e6b45", gold: "#b8924a", cream: "#f7f3ea", line: "#e6dfd0", ink: "#15211a", muted: "#5d6b61" };

function layout(opts: { title: string; preheader: string; body: string }) {
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(opts.title)}</title></head>
<body style="margin:0;padding:0;background:${C.cream};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid ${C.line};">
<tr><td style="background:#ffffff;padding:24px 32px;border-bottom:1px solid ${C.line};">
  <img src="${SITE.url}/brand/axis-logo.png" width="140" height="72" alt="Axis Agro International" style="display:block;border:0;width:140px;height:auto;">
</td></tr>
<tr><td style="height:4px;background:${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${C.ink};">
${opts.body}
</td></tr>
<tr><td style="padding:22px 32px;background:${C.cream};border-top:1px solid ${C.line};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${C.muted};">
  ${esc(SITE.legalName)} · ${esc(SITE.registration)}<br>
  <a href="mailto:${SITE.email}" style="color:${C.botanical};">${SITE.email}</a> · ${esc(SITE.phone)} · <a href="${SITE.url}" style="color:${C.botanical};">${SITE.url.replace(/^https?:\/\//, "")}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

const h = (t: string) => `<h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:26px;line-height:1.25;color:${C.forest};margin:0 0 14px;">${esc(t)}</h1>`;
const p = (html: string) => `<p style="margin:0 0 14px;">${html}</p>`;
const refBox = (ref: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 22px;"><tr><td style="background:${C.cream};border:1px solid ${C.line};border-radius:8px;padding:12px 18px;font-family:'Courier New',monospace;font-size:18px;letter-spacing:1px;color:${C.forest};"><strong>${esc(ref)}</strong></td></tr></table>`;

function section(title: string, rows: [string, string | undefined | null][]) {
  const filtered = rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");
  if (!filtered.length) return "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 18px;border:1px solid ${C.line};border-radius:10px;border-collapse:separate;overflow:hidden;">
<tr><td colspan="2" style="background:${C.cream};padding:10px 14px;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;color:${C.botanical};border-bottom:1px solid ${C.line};">${esc(title)}</td></tr>
${filtered
  .map(
    ([k, v], i) =>
      `<tr><td valign="top" style="padding:9px 14px;width:38%;color:${C.muted};font-size:13px;${i < filtered.length - 1 ? `border-bottom:1px solid ${C.line};` : ""}">${esc(k)}</td><td valign="top" style="padding:9px 14px;font-size:14px;color:${C.ink};${i < filtered.length - 1 ? `border-bottom:1px solid ${C.line};` : ""}">${nl2br(String(v))}</td></tr>`,
  )
  .join("")}
</table>`;
}

const unitLabel = (u: string) => QUANTITY_UNITS.find((x) => x.id === u)?.label ?? u;
const docLabel = (id: string) => DOCUMENTS.find((d) => d.id === id)?.label ?? id;

function quoteSections(q: QuoteData, files: { name: string; size: number }[]) {
  const b = q.buyer;
  const parts: string[] = [];
  parts.push(
    section("Buyer", [
      ["Name", b.fullName],
      ["Company", b.company],
      ["Classification", b.buyerType === "Other" ? `Other — ${b.buyerTypeOther}` : b.buyerType],
      ["Country", b.country],
      ["Email", b.email],
      ["Phone", b.phone],
      ["Website", b.website],
      ["Delivery address", b.deliveryAddress],
    ]),
  );
  q.items.forEach((it, i) => {
    parts.push(
      section(`Product ${i + 1} — ${it.productName}`, [
        ["Variety", it.variety],
        ["Grade", it.grade ? (it.grade.startsWith("Other") ? `Other — ${it.gradeOther}` : it.grade) : ""],
        ["Origin preference", it.originPreference],
        ["Quantity", `${it.quantity.toLocaleString("en-GB")} × ${unitLabel(it.unit)}`],
        ["Container", it.containerType],
        ["Packaging", it.packaging === "Custom packaging" ? `Custom — ${it.packagingOther}` : it.packaging],
        ["Size / calibre", it.calibre],
        ["Ripeness / maturity", it.ripeness],
        ["Handling", it.handling],
        ["Specifications", it.specifications],
      ]),
    );
  });
  const t = q.trade;
  parts.push(
    section("Trade & shipment", [
      ["Origin country", t.originCountry],
      ["Destination country", t.destinationCountry],
      ["Delivery city", t.deliveryCity],
      ["Loading port / airport", t.loadingPort],
      ["Destination port / airport", t.destinationPort],
      ["Freight mode", t.freightMode],
      ["Incoterm", t.incoterm],
      ["Expected shipment", `${t.shipmentDate}${t.dateFlexible ? " (flexible)" : ""}`],
    ]),
  );
  parts.push(
    section("Quality & documents requested", [
      ["Documents", q.quality.documents.length ? q.quality.documents.map(docLabel).join(", ") : "None specified"],
      ["Additional requirements", q.quality.additionalRequirements],
    ]),
  );
  const m = q.commercial;
  parts.push(
    section("Commercial", [
      ["Currency", m.currency],
      ["Target price", m.targetPrice],
      ["Payment method", m.paymentMethod],
      ["Payment terms", m.paymentTerms],
      ["Supply", m.supplyType + (m.frequency ? ` — ${m.frequency}` : "")],
      ["Contract duration", m.contractDuration],
      ["Additional conditions", m.conditions],
    ]),
  );
  if (files.length) parts.push(section("Uploaded documents", files.map((f, i) => [`File ${i + 1}`, `${f.name} (${Math.max(1, Math.round(f.size / 1024))} KB)`])));
  return parts.join("");
}

function quoteText(q: QuoteData) {
  const lines = [
    `Buyer: ${q.buyer.fullName}, ${q.buyer.company} (${q.buyer.buyerType}) — ${q.buyer.country}`,
    `Email: ${q.buyer.email} | Phone: ${q.buyer.phone}`,
    "",
    ...q.items.map(
      (it, i) =>
        `Product ${i + 1}: ${it.productName}${it.grade ? ` — ${it.grade}` : ""}${it.variety ? ` (${it.variety})` : ""}: ${it.quantity} ${unitLabel(it.unit)}, ${it.packaging}${it.specifications ? `\n  Spec: ${it.specifications}` : ""}`,
    ),
    "",
    `Route: ${q.trade.originCountry} → ${q.trade.destinationCountry} (${q.trade.deliveryCity}) by ${q.trade.freightMode}, ${q.trade.incoterm} ${q.trade.destinationPort}`,
    `Shipment: ${q.trade.shipmentDate}${q.trade.dateFlexible ? " (flexible)" : ""}`,
    `Documents: ${q.quality.documents.map(docLabel).join(", ") || "None specified"}`,
    `Commercial: ${q.commercial.currency}${q.commercial.targetPrice ? `, target ${q.commercial.targetPrice}` : ""}; ${q.commercial.paymentMethod}; ${q.commercial.paymentTerms}; ${q.commercial.supplyType}${q.commercial.frequency ? ` (${q.commercial.frequency})` : ""}; ${q.commercial.contractDuration}`,
  ];
  return lines.join("\n");
}

// ── Public senders ───────────────────────────────────────────────────────────

export async function sendQuoteEmails(opts: { reference: string; quote: QuoteData; files: { name: string; size: number }[]; attachments: Attachment[]; review: boolean; score: number | null }) {
  const { reference, quote, files } = opts;
  const products = quote.items.map((i) => i.productName).join(", ");
  const flag = opts.review ? `<div style="background:#fbeeea;border:1px solid #e9b8ad;color:#a33a2b;border-radius:8px;padding:10px 14px;margin:0 0 18px;font-size:13px;"><strong>Review flagged:</strong> low reCAPTCHA confidence (score ${opts.score ?? "n/a"}). Verify the buyer before engaging.</div>` : "";

  const teamHtml = layout({
    title: `New quotation request ${reference}`,
    preheader: `${quote.buyer.company} — ${products}`,
    body: `${h("New quotation request")}${refBox(reference)}${flag}
${p(`<strong>${esc(quote.buyer.company)}</strong> (${esc(quote.buyer.country)}) has requested a quotation for <strong>${esc(products)}</strong>.`)}
${p(`Reply directly to this email to respond to ${esc(quote.buyer.fullName)}. Any uploaded files are attached.`)}
${quoteSections(quote, files)}`,
  });

  const team = await send({
    to: quoteRecipients(),
    subject: `${opts.review ? "[REVIEW] " : ""}Quote request ${reference} — ${quote.buyer.company} — ${products}`.slice(0, 200),
    html: teamHtml,
    text: `New quotation request ${reference}\n\n${quoteText(quote)}`,
    replyTo: quote.buyer.email,
    attachments: opts.attachments.length ? opts.attachments : undefined,
  });

  const buyerHtml = layout({
    title: `We have received your quotation request — ${reference}`,
    preheader: `Reference ${reference}. Our trading team will review your requirements.`,
    body: `${h(`Thank you, ${quote.buyer.fullName.split(" ")[0]}.`)}
${p("We have received your quotation request. Please keep this reference for any correspondence:")}${refBox(reference)}
${p("<strong>What happens next</strong>")}
<ol style="margin:0 0 18px;padding-left:20px;">
<li style="margin-bottom:6px;">Our team reviews your requirements against available supply and seasonality.</li>
<li style="margin-bottom:6px;">We reply in writing with availability, specifications and indicative commercial terms — or questions if anything needs clarifying.</li>
<li>Where appropriate, samples, final specifications and contract terms are agreed before shipment.</li>
</ol>
${p(`<span style="color:${C.muted};font-size:13px;">Submitting a request does not create a contract. Prices, availability, documentation and shipment details are confirmed by Axis Agro in writing.</span>`)}
${quoteSections(quote, files)}
${p(`Questions? Reply to this email or contact us at <a href="mailto:${SITE.email}" style="color:${C.botanical};">${SITE.email}</a>.`)}`,
  });

  const buyer = await send({
    to: [quote.buyer.email],
    subject: `Your quotation request ${reference} — Axis Agro International`,
    html: buyerHtml,
    text: `Thank you for your quotation request.\nReference: ${reference}\n\nOur team will review your requirements and reply in writing.\n\n${quoteText(quote)}\n\n${SITE.legalName} — ${SITE.email}`,
    replyTo: quoteRecipients()[0],
  });

  return { notified: team.ok, acknowledged: buyer.ok };
}

export async function sendContactEmails(opts: { reference: string; data: ContactData; review: boolean; score: number | null }) {
  const { reference, data } = opts;
  const teamHtml = layout({
    title: `New contact enquiry ${reference}`,
    preheader: `${data.topic} — ${data.name}`,
    body: `${h("New contact enquiry")}${refBox(reference)}
${opts.review ? `<div style="background:#fbeeea;border:1px solid #e9b8ad;color:#a33a2b;border-radius:8px;padding:10px 14px;margin:0 0 18px;font-size:13px;"><strong>Review flagged:</strong> low reCAPTCHA confidence (score ${opts.score ?? "n/a"}).</div>` : ""}
${section("Enquiry", [
  ["Topic", data.topic],
  ["Name", data.name],
  ["Company", data.company],
  ["Email", data.email],
  ["Phone", data.phone],
  ["Country", data.country],
  ["Message", data.message],
])}`,
  });
  const team = await send({
    to: contactRecipients(data.topic),
    subject: `${opts.review ? "[REVIEW] " : ""}Contact ${reference} — ${data.topic} — ${data.name}`.slice(0, 200),
    html: teamHtml,
    text: `Contact enquiry ${reference}\nTopic: ${data.topic}\nFrom: ${data.name} <${data.email}> ${data.phone}\nCompany: ${data.company}\nCountry: ${data.country}\n\n${data.message}`,
    replyTo: data.email,
  });

  const buyerHtml = layout({
    title: "We have received your message",
    preheader: `Reference ${reference}`,
    body: `${h(`Thank you, ${data.name.split(" ")[0]}.`)}
${p("Your message has reached the Axis Agro team. We aim to reply within one to two working days.")}
${refBox(reference)}
${section("Your message", [
  ["Topic", data.topic],
  ["Message", data.message],
])}
${p(`If you need to source a specific product, our <a href="${SITE.url}/get-a-quote" style="color:${C.botanical};">quotation form</a> captures every detail our team needs.`)}`,
  });
  const ack = await send({
    to: [data.email],
    subject: `We have received your message (${reference}) — Axis Agro International`,
    html: buyerHtml,
    text: `Thank you for contacting Axis Agro International.\nReference: ${reference}\n\nWe aim to reply within one to two working days.\n\n${SITE.email}`,
    replyTo: contactRecipients(data.topic)[0],
  });
  return { notified: team.ok, acknowledged: ack.ok };
}
