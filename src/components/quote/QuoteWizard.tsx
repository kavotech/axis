"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { GROUPS, type QuoteKind } from "@/data/categories";
import { COUNTRIES } from "@/data/countries";
import { PRODUCTS, productBySlug } from "@/data/products";
import {
  BUYER_TYPES,
  COFFEE_GRADES,
  CONTAINERS,
  CONTRACT_DURATIONS,
  CURRENCIES,
  DOCUMENTS,
  FREIGHT_MODES,
  INCOTERMS,
  KIND_RULES,
  PACKAGING,
  PAYMENT_METHODS,
  PAYMENT_TERMS,
  QUANTITY_UNITS,
  RIPENESS,
  SUPPLY_FREQUENCY,
  SUPPLY_TYPES,
  UPLOAD_RULES,
} from "@/data/quote-options";
import { SITE } from "@/data/site";
import { writeConsent } from "@/lib/consent";
import { ConsentRequiredError, getRecaptchaToken, preloadRecaptcha } from "@/lib/recaptcha-client";
import { buyerSchema, commercialSchema, consentSchema, qualitySchema, quoteItemSchema, quoteSchema, tradeSchema } from "@/lib/schemas";
import { Icon, type IconName } from "../Icon";
import { useToast } from "../Toast";

// ─── Types & defaults ────────────────────────────────────────────────────────

type Item = {
  key: string;
  productSlug: string;
  productName: string;
  kind: QuoteKind;
  variety: string;
  grade: string;
  gradeOther: string;
  originPreference: string;
  quantity: string;
  unit: string;
  packaging: string;
  packagingOther: string;
  containerType: string;
  calibre: string;
  ripeness: string;
  handling: string;
  specifications: string;
};

type Form = {
  buyer: { fullName: string; company: string; country: string; email: string; phone: string; website: string; deliveryAddress: string; buyerType: string; buyerTypeOther: string };
  items: Item[];
  trade: { originCountry: string; destinationCountry: string; deliveryCity: string; loadingPort: string; destinationPort: string; freightMode: string; incoterm: string; shipmentDate: string; dateFlexible: boolean };
  quality: { documents: string[]; additionalRequirements: string };
  commercial: { currency: string; targetPrice: string; paymentMethod: string; paymentTerms: string; supplyType: string; frequency: string; contractDuration: string; conditions: string };
  consent: { privacy: boolean; accuracy: boolean };
};

const STEPS: { id: string; title: string; icon: IconName; blurb: string }[] = [
  { id: "buyer", title: "Buyer details", icon: "users", blurb: "Who we are quoting for and where the goods are going." },
  { id: "products", title: "Products", icon: "avocado", blurb: "Add each product and configure variety, grade and specification." },
  { id: "volume", title: "Volume & packaging", icon: "pallet", blurb: "Quantities and packing formats. Only options relevant to each product are shown." },
  { id: "trade", title: "Trade & shipment", icon: "ship", blurb: "Route, freight mode, Incoterm and timing." },
  { id: "quality", title: "Quality & documents", icon: "shield", blurb: "Documents and inspections you need with the shipment." },
  { id: "commercial", title: "Commercial terms", icon: "currency", blurb: "Currency, price expectations, payment and supply pattern." },
  { id: "files", title: "Supporting files", icon: "upload", blurb: "Optional specifications, packaging instructions or tender documents." },
  { id: "review", title: "Review & submit", icon: "check", blurb: "Check everything before sending your enquiry." },
];

const ITEM_STEP2 = ["productSlug", "productName", "kind", "variety", "grade", "gradeOther", "originPreference", "calibre", "ripeness", "handling", "specifications"];
const ITEM_STEP3 = ["quantity", "unit", "packaging", "packagingOther", "containerType"];

const LOADING_PORTS = ["Entebbe International Airport (EBB)", "Port of Mombasa", "Port of Dar es Salaam", "Jomo Kenyatta International Airport (NBO)"];
const DEST_PORTS = ["London Heathrow (LHR)", "London Gateway", "Felixstowe", "Southampton", "Tilbury", "Manchester Airport (MAN)", "Rotterdam", "Antwerp", "Amsterdam Schiphol (AMS)", "Jebel Ali", "Dubai International (DXB)", "Hamad Port", "Doha Hamad International (DOH)"];

const COFFEE_GRADE_BY_SLUG: Record<string, (typeof COFFEE_GRADES)[number]> = {
  "robusta-screen-18": "Robusta Screen 18",
  "robusta-screen-15": "Robusta Screen 15",
  "robusta-screen-12": "Robusta Screen 12",
  "arabica-aa": "Arabica AA / AAA",
  "arabica-ab": "Arabica AB",
};

const uid = () =>Math.random().toString(36).slice(2, 9);

function newItem(slug?: string): Item {
  const p = slug ? productBySlug(slug) : undefined;
  const kind: QuoteKind = p?.kind ?? "fruit";
  const rules = KIND_RULES[kind];
  const coffeeGrade = (p && COFFEE_GRADE_BY_SLUG[p.slug]) ?? "";
  return {
    key: uid(),
    productSlug: slug === "other" ? "other" : (p?.slug ?? ""),
    productName: p?.name ?? "",
    kind,
    variety: p?.varieties.length === 1 ? p.varieties[0] : "",
    grade: coffeeGrade,
    gradeOther: "",
    originPreference: p?.origins.length === 1 ? p.origins[0] : "",
    quantity: "",
    unit: ["coffee", "cocoa", "oilseed"].includes(kind) ? "t" : "cartons",
    packaging: rules.packaging[0],
    packagingOther: "",
    containerType: "",
    calibre: "",
    ripeness: "",
    handling: "",
    specifications: "",
  };
}

const EMPTY: Form = {
  buyer: { fullName: "", company: "", country: "United Kingdom", email: "", phone: "", website: "", deliveryAddress: "", buyerType: "", buyerTypeOther: "" },
  items: [],
  trade: { originCountry: "Uganda", destinationCountry: "United Kingdom", deliveryCity: "", loadingPort: "", destinationPort: "", freightMode: "", incoterm: "", shipmentDate: "", dateFlexible: false },
  quality: { documents: ["invoice", "packing"], additionalRequirements: "" },
  commercial: { currency: "GBP", targetPrice: "", paymentMethod: "", paymentTerms: "", supplyType: "", frequency: "", contractDuration: "", conditions: "" },
  consent: { privacy: false, accuracy: false },
};

const DRAFT_KEY = "axis-quote-draft-v1";

// ─── Validation ──────────────────────────────────────────────────────────────

type Errors = Record<string, string>;

function collect(prefix: string, result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }, filter?: (field: string) => boolean): Errors {
  const out: Errors = {};
  if (result.success || !result.error) return out;
  for (const i of result.error.issues) {
    const field = String(i.path[0] ?? "");
    if (filter && !filter(field)) continue;
    const key = [prefix, ...i.path.map(String)].filter(Boolean).join(".");
    if (!out[key]) out[key] = i.message;
  }
  return out;
}

function validateStep(step: number, f: Form, files: File[]): Errors {
  switch (step) {
    case 0:
      return withCrossChecks(collect("buyer", buyerSchema.safeParse(f.buyer)), f, "buyer");
    case 1: {
      if (!f.items.length) return { items: "Add at least one product to continue" };
      const e: Errors = {};
      f.items.forEach((it, i) => {
        // Fill step-3 fields with valid placeholders so item-level refinements run.
        const probe = { ...it, quantity: 1, unit: "kg", packaging: "5kg cartons", packagingOther: "", containerType: "" };
        Object.assign(e, collect(`items.${i}`, quoteItemSchema.safeParse(probe), (fld) => ITEM_STEP2.includes(fld)));
      });
      return e;
    }
    case 2: {
      const e: Errors = {};
      f.items.forEach((it, i) => Object.assign(e, collect(`items.${i}`, quoteItemSchema.safeParse(it), (fld) => ITEM_STEP3.includes(fld))));
      return e;
    }
    case 3:
      return collect("trade", tradeSchema.safeParse(f.trade));
    case 4:
      return collect("quality", qualitySchema.safeParse(f.quality));
    case 5:
      return withCrossChecks(collect("commercial", commercialSchema.safeParse(f.commercial)), f, "commercial");
    case 6:
      return validateFiles(files);
    case 7:
      return collect("consent", consentSchema.safeParse(f.consent));
    default:
      return {};
  }
}

function validateFiles(files: File[]): Errors {
  const exts = UPLOAD_RULES.accept.split(",").map((e) => e.replace(".", ""));
  if (files.length > UPLOAD_RULES.maxFiles) return { files: `Upload up to ${UPLOAD_RULES.maxFiles} files` };
  if (files.reduce((n, f) => n + f.size, 0) > UPLOAD_RULES.maxTotalBytes) return { files: "Files must total 4MB or less" };
  const bad = files.find((f) => !exts.includes((f.name.split(".").pop() || "").toLowerCase()));
  if (bad) return { files: `“${bad.name}” is not an accepted file type` };
  return {};
}

function stepForKey(key: string) {
  if (key.startsWith("buyer")) return 0;
  if (key.startsWith("items")) {
    const field = key.split(".")[2];
    return ITEM_STEP3.includes(field) ? 2 : 1;
  }
  if (key.startsWith("trade")) return 3;
  if (key.startsWith("quality")) return 4;
  if (key.startsWith("commercial")) return 5;
  if (key.startsWith("files")) return 6;
  return 7;
}

// ─── Small field components ─────────────────────────────────────────────────

function Field({ id, label, error, required, optional, hint, children, className = "", tip }: { id: string; label: string; error?: string; required?: boolean; optional?: boolean; hint?: string; children: ReactNode; className?: string; tip?: string }) {
  return (
    <div className={`field ${className}`}>
      <label htmlFor={id}>
        {label}
        {required ? <span className="field__req" aria-hidden="true">*</span> : null}
        {optional ? <span className="field__opt">(optional)</span> : null}
        {tip ? <Tip text={tip} /> : null}
      </label>
      {children}
      {hint && !error ? (
        <span className="field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="field__error" id={`${id}-error`} role="alert">
          <Icon name="info" size={14} /> {error}
        </span>
      ) : null}
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <span className="tip">
      <button type="button" className="tip__btn" aria-label={text}>
        <Icon name="info" size={16} />
      </button>
      <span className="tip__bubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}

const aria = (id: string, error?: string, hint?: boolean) => ({
  id,
  name: id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

// ─── Main component ──────────────────────────────────────────────────────────

export function QuoteWizard() {
  const params = useSearchParams();
  const toast = useToast();
  const [form, setForm] = useState<Form>(EMPTY);
  const [files, setFiles] = useState<File[]>([]);
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [needsConsent, setNeedsConsent] = useState(false);
  const [done, setDone] = useState<{ reference: string; acknowledged: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const startedAt = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);
  const hpRef = useRef<HTMLInputElement>(null);

  // Restore draft and apply ?product= preselection.
  useEffect(() => {
    let base: Form = EMPTY;
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) base = { ...EMPTY, ...JSON.parse(raw), consent: EMPTY.consent };
    } catch {
      /* ignore */
    }
    const slug = params.get("product");
    if (slug && (slug === "other" || productBySlug(slug))) {
      if (!base.items.some((i) => i.productSlug === slug)) base = { ...base, items: [...base.items, newItem(slug)] };
    } else if (!base.items.length) {
      base = { ...base, items: [newItem()] };
    }
    // Browser storage and the URL are only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm(base);
    startedAt.current = Date.now();
    hydrated.current = true;
    preloadRecaptcha();
  }, [params]);

  useEffect(() => {
    if (!hydrated.current || done) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, consent: EMPTY.consent }));
    } catch {
      /* ignore */
    }
  }, [form, done]);

  const setSection = <K extends keyof Form>(k: K, patch: Partial<Form[K]>) => setForm((f) => ({ ...f, [k]: { ...(f[k] as object), ...patch } }));
  const setItem = (idx: number, patch: Partial<Item>) => setForm((f) => ({ ...f, items: f.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) }));
  const clearError = (key: string) => errors[key] && setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== key)));

  const chooseProduct = (idx: number, slug: string) => {
    const fresh = newItem(slug);
    setItem(idx, { ...fresh, key: form.items[idx].key, productName: slug === "other" ? "" : fresh.productName });
    setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith(`items.${idx}.`))));
  };

  const scrollTop = () => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goTo = (s: number) => {
    setStep(s);
    setServerError("");
    requestAnimationFrame(scrollTop);
  };

  const next = () => {
    const e = validateStep(step, form, files);
    setErrors(e);
    if (Object.keys(e).length) {
      toast("Please complete the highlighted fields.", "error");
      requestAnimationFrame(() => (document.querySelector("[aria-invalid='true']") as HTMLElement | null)?.focus());
      return;
    }
    const n = Math.min(step + 1, STEPS.length - 1);
    setMaxStep((m) => Math.max(m, n));
    goTo(n);
  };

  const submit = async () => {
    const e = validateStep(7, form, files);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const full = quoteSchema.safeParse(form);
    if (!full.success) {
      const map = collect("", full);
      setErrors(map);
      goTo(stepForKey(Object.keys(map)[0]));
      toast("Some details need attention before submitting.", "error");
      return;
    }
    setSubmitting(true);
    setServerError("");
    setNeedsConsent(false);
    try {
      const token = await getRecaptchaToken("quote");
      const fd = new FormData();
      fd.set("data", JSON.stringify(form));
      fd.set("recaptchaToken", token);
      fd.set("fax", hpRef.current?.value ?? "");
      fd.set("startedAt", String(startedAt.current));
      files.forEach((f) => fd.append("files", f));
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({ ok: false, error: "Unexpected response from server." }));
      if (!res.ok || !json.ok) {
        if (json.fields && Object.keys(json.fields).length) {
          setErrors(json.fields);
          goTo(stepForKey(Object.keys(json.fields)[0]));
        }
        throw new Error(json.error || "Submission failed. Please try again.");
      }
      setDone({ reference: json.reference, acknowledged: !!json.acknowledged });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      toast("Quotation request received.", "success");
      requestAnimationFrame(scrollTop);
    } catch (err) {
      if (err instanceof ConsentRequiredError) {
        setNeedsConsent(true);
      } else {
        const msg = err instanceof Error ? err.message : "Submission failed. Please try again.";
        setServerError(msg);
        toast(msg, "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const progress = done ? 100 : Math.round((step / (STEPS.length - 1)) * 100);

  const productOptions = useMemo(() => GROUPS.map((g) => ({ g, items: PRODUCTS.filter((p) => p.group === g.id) })), []);

  // ─── Success ────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="wizard-panel success-card" ref={panelRef} aria-live="polite">
        <span className="icon-badge icon-badge--gold icon-badge--lg">
          <Icon name="check" size={44} strokeWidth={2.4} />
        </span>
        <h2>Thank you — your request has been received.</h2>
        <p className="lead" style={{ maxWidth: 560, margin: "0 auto 8px" }}>
          Our trading team will review your requirements and respond in writing with availability, specifications and next steps.
        </p>
        <p className="muted" style={{ marginBottom: 4 }}>Your enquiry reference</p>
        <div className="reference">{done.reference}</div>
        <p className="muted" style={{ maxWidth: 560, margin: "0 auto 28px" }}>
          {done.acknowledged
            ? `A confirmation with a full summary has been sent to ${form.buyer.email}.`
            : `Please keep this reference. If you do not receive a confirmation email, contact ${SITE.email}.`}
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/products" className="btn">
            Continue browsing
          </Link>
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => {
              setForm({ ...EMPTY, buyer: form.buyer, items: [newItem()] });
              setFiles([]);
              setDone(null);
              setStep(1);
              setMaxStep(1);
              startedAt.current = Date.now();
            }}
          >
            Start another request
          </button>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k];
  const s = STEPS[step];

  return (
    <div className="wizard">
      {/* ─── Stepper ─── */}
      <nav className="stepper" aria-label="Quotation steps">
        <div className="stepper__label">
          Step {step + 1} of {STEPS.length}
        </div>
        <div className="stepper__progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Form progress">
          <span style={{ width: `${Math.max(progress, 4)}%` }} />
        </div>
        <ol>
          {STEPS.map((st, i) => (
            <li key={st.id}>
              <button type="button" data-state={i === step ? "current" : i < step || i <= maxStep ? "done" : "todo"} disabled={i > maxStep} onClick={() => goTo(i)} aria-current={i === step ? "step" : undefined}>
                <span className="stepper__dot">{i < step || (i <= maxStep && i !== step) ? <Icon name="check" size={14} strokeWidth={3} /> : i + 1}</span>
                <span className="stepper__name">{st.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="stepper__help">
          Prefer email? Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Your progress is saved in this browser tab.
        </div>
      </nav>

      {/* ─── Panel ─── */}
      <div className="wizard-panel" ref={panelRef} style={{ scrollMarginTop: "calc(var(--header-h) + 24px)" }}>
        <div className="wizard-panel__head">
          <span className="icon-badge">
            <Icon name={s.icon} size={28} />
          </span>
          <div>
            <h2>{s.title}</h2>
            <p>{s.blurb}</p>
          </div>
        </div>

        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (step === STEPS.length - 1) submit();
            else next();
          }}
        >
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="fax">Fax</label>
            <input id="fax" name="fax" ref={hpRef} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Step 1 — Buyer */}
          {step === 0 && (
            <div className="form-grid">
              <Field id="buyer.fullName" label="Full name" required error={err("buyer.fullName")}>
                <input className="input" autoComplete="name" value={form.buyer.fullName} onChange={(e) => (setSection("buyer", { fullName: e.target.value }), clearError("buyer.fullName"))} {...aria("buyer.fullName", err("buyer.fullName"))} />
              </Field>
              <Field id="buyer.company" label="Company name" required error={err("buyer.company")}>
                <input className="input" autoComplete="organization" value={form.buyer.company} onChange={(e) => (setSection("buyer", { company: e.target.value }), clearError("buyer.company"))} {...aria("buyer.company", err("buyer.company"))} />
              </Field>
              <Field id="buyer.email" label="Business email" required error={err("buyer.email")}>
                <input className="input" type="email" autoComplete="email" inputMode="email" value={form.buyer.email} onChange={(e) => (setSection("buyer", { email: e.target.value }), clearError("buyer.email"))} {...aria("buyer.email", err("buyer.email"))} />
              </Field>
              <Field id="buyer.phone" label="Phone number" required error={err("buyer.phone")} hint="Include country code, e.g. +44 20 7946 0000">
                <input className="input" type="tel" autoComplete="tel" inputMode="tel" value={form.buyer.phone} onChange={(e) => (setSection("buyer", { phone: e.target.value }), clearError("buyer.phone"))} {...aria("buyer.phone", err("buyer.phone"), true)} />
              </Field>
              <Field id="buyer.country" label="Country" required error={err("buyer.country")}>
                <select className="select" autoComplete="country-name" value={form.buyer.country} onChange={(e) => (setSection("buyer", { country: e.target.value }), clearError("buyer.country"))} {...aria("buyer.country", err("buyer.country"))}>
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field id="buyer.website" label="Company website" optional error={err("buyer.website")}>
                <input className="input" type="url" inputMode="url" placeholder="www.example.com" autoComplete="url" value={form.buyer.website} onChange={(e) => (setSection("buyer", { website: e.target.value }), clearError("buyer.website"))} {...aria("buyer.website", err("buyer.website"))} />
              </Field>
              <Field id="buyer.deliveryAddress" label="Delivery address" required error={err("buyer.deliveryAddress")} className="span-2">
                <textarea className="textarea" rows={3} autoComplete="street-address" value={form.buyer.deliveryAddress} onChange={(e) => (setSection("buyer", { deliveryAddress: e.target.value }), clearError("buyer.deliveryAddress"))} {...aria("buyer.deliveryAddress", err("buyer.deliveryAddress"))} />
              </Field>
              <fieldset className="field span-2" style={{ border: 0, padding: 0, margin: 0 }} aria-describedby={err("buyer.buyerType") ? "buyer.buyerType-error" : undefined}>
                <legend className="field__label" style={{ marginBottom: 10 }}>
                  Buyer classification <span className="field__req">*</span>
                </legend>
                <div className="choice-grid">
                  {BUYER_TYPES.map((t) => (
                    <label className="choice" key={t}>
                      <input type="radio" name="buyerType" value={t} checked={form.buyer.buyerType === t} onChange={() => (setSection("buyer", { buyerType: t }), clearError("buyer.buyerType"))} />
                      {t}
                    </label>
                  ))}
                </div>
                {err("buyer.buyerType") ? (
                  <span className="field__error" id="buyer.buyerType-error" role="alert">
                    <Icon name="info" size={14} /> {err("buyer.buyerType")}
                  </span>
                ) : null}
              </fieldset>
              {form.buyer.buyerType === "Other" && (
                <Field id="buyer.buyerTypeOther" label="Describe your business" required error={err("buyer.buyerTypeOther")} className="span-2">
                  <input className="input" value={form.buyer.buyerTypeOther} onChange={(e) => (setSection("buyer", { buyerTypeOther: e.target.value }), clearError("buyer.buyerTypeOther"))} {...aria("buyer.buyerTypeOther", err("buyer.buyerTypeOther"))} />
                </Field>
              )}
            </div>
          )}

          {/* Step 2 — Products */}
          {step === 1 && (
            <div>
              {err("items") ? (
                <div className="alert alert--error" role="alert" style={{ marginBottom: 16 }}>
                  <Icon name="info" size={18} /> {err("items")}
                </div>
              ) : null}
              {form.items.map((it, i) => {
                const p = productBySlug(it.productSlug);
                const k = (f: string) => `items.${i}.${f}`;
                return (
                  <div className="item-card" key={it.key}>
                    <div className="item-card__head">
                      <div className="item-card__title">
                        <span className="icon-badge" style={{ width: 40, height: 40 }}>
                          <Icon name={p?.icon ?? "box"} size={20} />
                        </span>
                        <span>
                          Product {i + 1}
                          {it.productName ? ` — ${it.productName}` : ""}
                        </span>
                      </div>
                      {form.items.length > 1 ? (
                        <button type="button" className="icon-btn" onClick={() => setForm((f) => ({ ...f, items: f.items.filter((_, j) => j !== i) }))}>
                          <Icon name="trash" size={16} /> Remove
                        </button>
                      ) : null}
                    </div>
                    <div className="item-card__body form-grid">
                      <Field id={k("productSlug")} label="Product" required error={err(k("productSlug"))} className={it.productSlug === "other" ? "" : "span-2"}>
                        <select className="select" value={it.productSlug} onChange={(e) => chooseProduct(i, e.target.value)} {...aria(k("productSlug"), err(k("productSlug")))}>
                          <option value="">Select a product</option>
                          {productOptions.map(({ g, items }) => (
                            <optgroup key={g.id} label={g.label}>
                              {items.map((pp) => (
                                <option key={pp.slug} value={pp.slug}>
                                  {pp.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="other">Other product (please specify)</option>
                        </select>
                      </Field>
                      {it.productSlug === "other" && (
                        <>
                          <Field id={k("productName")} label="Product name" required error={err(k("productName"))}>
                            <input className="input" value={it.productName} onChange={(e) => (setItem(i, { productName: e.target.value }), clearError(k("productName")))} {...aria(k("productName"), err(k("productName")))} />
                          </Field>
                          <Field id={k("kind")} label="Product type" required>
                            <select className="select" value={it.kind} onChange={(e) => {
                              const kind = e.target.value as QuoteKind;
                              setItem(i, { kind, packaging: KIND_RULES[kind].packaging[0], unit: KIND_RULES[kind].units.includes(it.unit as never) ? it.unit : KIND_RULES[kind].units[0], containerType: "", grade: "" });
                            }} {...aria(k("kind"))}>
                              <option value="fruit">Fresh fruit</option>
                              <option value="vegetable">Vegetable / root crop</option>
                              <option value="spice">Herb or spice</option>
                              <option value="coffee">Coffee</option>
                              <option value="cocoa">Cocoa</option>
                              <option value="oilseed">Oilseed / nut / grain</option>
                              <option value="dried">Dried or processed</option>
                            </select>
                          </Field>
                        </>
                      )}

                      {it.productSlug ? (
                        <>
                          {it.kind === "coffee" ? (
                            <Field id={k("grade")} label="Coffee grade" required error={err(k("grade"))} tip="Robusta screen numbers refer to bean size in 64ths of an inch. Arabica AA is the largest Arabica screen grade.">
                              <select className="select" value={it.grade} onChange={(e) => (setItem(i, { grade: e.target.value }), clearError(k("grade")))} {...aria(k("grade"), err(k("grade")))}>
                                <option value="">Select grade</option>
                                {COFFEE_GRADES.map((g) => (
                                  <option key={g}>{g}</option>
                                ))}
                              </select>
                            </Field>
                          ) : (
                            <Field id={k("grade")} label="Grade or class" optional>
                              <input className="input" list={`grades-${it.key}`} placeholder="e.g. Class I" value={it.grade} onChange={(e) => setItem(i, { grade: e.target.value })} {...aria(k("grade"))} />
                              <datalist id={`grades-${it.key}`}>{p?.grades.map((g) => <option key={g} value={g} />)}</datalist>
                            </Field>
                          )}
                          {it.grade.startsWith("Other") && (
                            <Field id={k("gradeOther")} label="Grade required" required error={err(k("gradeOther"))}>
                              <input className="input" value={it.gradeOther} onChange={(e) => (setItem(i, { gradeOther: e.target.value }), clearError(k("gradeOther")))} {...aria(k("gradeOther"), err(k("gradeOther")))} />
                            </Field>
                          )}
                          <Field id={k("variety")} label={it.kind === "coffee" ? "Process / type" : "Variety"} optional>
                            {p && p.varieties.length > 1 ? (
                              <select className="select" value={it.variety} onChange={(e) => setItem(i, { variety: e.target.value })} {...aria(k("variety"))}>
                                <option value="">No preference</option>
                                {p.varieties.map((v) => (
                                  <option key={v}>{v}</option>
                                ))}
                              </select>
                            ) : (
                              <input className="input" value={it.variety} onChange={(e) => setItem(i, { variety: e.target.value })} {...aria(k("variety"))} />
                            )}
                          </Field>
                          <Field id={k("originPreference")} label="Origin preference" optional>
                            <select className="select" value={it.originPreference} onChange={(e) => setItem(i, { originPreference: e.target.value })} {...aria(k("originPreference"))}>
                              <option value="">No preference</option>
                              {(p?.origins ?? ["Uganda", "Kenya", "Tanzania"]).map((o) => (
                                <option key={o}>{o}</option>
                              ))}
                            </select>
                          </Field>

                          {it.kind === "fruit" || it.kind === "vegetable" ? (
                            <>
                              <Field id={k("calibre")} label="Size / calibre" optional hint="e.g. count 16–20 per 4kg, or weight band">
                                <input className="input" value={it.calibre} onChange={(e) => setItem(i, { calibre: e.target.value })} {...aria(k("calibre"), undefined, true)} />
                              </Field>
                              <Field id={k("ripeness")} label="Maturity / ripeness" optional>
                                <select className="select" value={it.ripeness} onChange={(e) => setItem(i, { ripeness: e.target.value })} {...aria(k("ripeness"))}>
                                  <option value="">Select</option>
                                  {RIPENESS.map((r) => (
                                    <option key={r}>{r}</option>
                                  ))}
                                </select>
                              </Field>
                              <Field id={k("handling")} label="Handling requirements" optional className="span-2" hint="e.g. temperature range, pre-cooling, ethylene sensitivity, labelling">
                                <input className="input" value={it.handling} onChange={(e) => setItem(i, { handling: e.target.value })} {...aria(k("handling"), undefined, true)} />
                              </Field>
                            </>
                          ) : null}

                          <Field id={k("specifications")} label="Product specifications" optional className="span-2" hint={it.kind === "coffee" ? "e.g. moisture ≤ 12.5%, defect count, cup profile, sample requirements" : it.kind === "cocoa" ? "e.g. bean count, moisture, cut-test limits" : "Anything else we should know: quality parameters, certifications needed, residues, etc."}>
                            <textarea className="textarea" rows={3} value={it.specifications} onChange={(e) => setItem(i, { specifications: e.target.value })} {...aria(k("specifications"), undefined, true)} />
                          </Field>
                        </>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              {form.items.length < 10 ? (
                <button type="button" className="add-item" onClick={() => setForm((f) => ({ ...f, items: [...f.items, newItem()] }))}>
                  <Icon name="plus" size={18} strokeWidth={2.5} /> Add another product
                </button>
              ) : null}
            </div>
          )}

          {/* Step 3 — Volume & packaging */}
          {step === 2 && (
            <div>
              {form.items.map((it, i) => {
                const rules = KIND_RULES[it.kind];
                const k = (f: string) => `items.${i}.${f}`;
                const p = productBySlug(it.productSlug);
                return (
                  <div className="item-card" key={it.key}>
                    <div className="item-card__head">
                      <div className="item-card__title">
                        <span className="icon-badge" style={{ width: 40, height: 40 }}>
                          <Icon name={p?.icon ?? "box"} size={20} />
                        </span>
                        <span>{it.productName || `Product ${i + 1}`}</span>
                      </div>
                    </div>
                    <div className="item-card__body form-grid">
                      <Field id={k("quantity")} label="Quantity" required error={err(k("quantity"))}>
                        <input className="input" type="number" inputMode="decimal" min="0" step="any" value={it.quantity} onChange={(e) => (setItem(i, { quantity: e.target.value }), clearError(k("quantity")))} {...aria(k("quantity"), err(k("quantity")))} />
                      </Field>
                      <Field id={k("unit")} label="Unit" required error={err(k("unit"))}>
                        <select className="select" value={it.unit} onChange={(e) => (setItem(i, { unit: e.target.value, containerType: e.target.value === "containers" ? it.containerType : "" }), clearError(k("unit")))} {...aria(k("unit"), err(k("unit")))}>
                          {QUANTITY_UNITS.filter((u) => rules.units.includes(u.id)).map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      {it.unit === "containers" && (
                        <Field id={k("containerType")} label="Container type" required error={err(k("containerType"))} className="span-2" tip={rules.perishable ? "Reefer (refrigerated) containers maintain a set temperature for fresh produce." : "Dry containers suit bagged and ambient commodities. High-cube adds roughly 30cm of height."}>
                          <div className="choice-grid">
                            {CONTAINERS.filter((c) => rules.containers.includes(c.id)).map((c) => (
                              <label className="choice" key={c.id}>
                                <input type="radio" name={k("containerType")} checked={it.containerType === c.label} onChange={() => (setItem(i, { containerType: c.label }), clearError(k("containerType")))} />
                                <span>
                                  {c.label}
                                  <small>{c.reefer ? "Temperature-controlled" : "Ambient"}</small>
                                </span>
                              </label>
                            ))}
                          </div>
                        </Field>
                      )}
                      <Field id={k("packaging")} label="Packaging" required error={err(k("packaging"))} className="span-2">
                        <div className="choice-grid">
                          {PACKAGING.filter((pk) => rules.packaging.includes(pk)).map((pk) => (
                            <label className="choice" key={pk}>
                              <input type="radio" name={k("packaging")} checked={it.packaging === pk} onChange={() => (setItem(i, { packaging: pk }), clearError(k("packaging")))} />
                              {pk}
                            </label>
                          ))}
                        </div>
                      </Field>
                      {it.packaging === "Custom packaging" && (
                        <Field id={k("packagingOther")} label="Describe the packaging" required error={err(k("packagingOther"))} className="span-2">
                          <input className="input" value={it.packagingOther} onChange={(e) => (setItem(i, { packagingOther: e.target.value }), clearError(k("packagingOther")))} {...aria(k("packagingOther"), err(k("packagingOther")))} />
                        </Field>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 4 — Trade */}
          {step === 3 && (
            <div>
              <div className="form-grid">
                <Field id="trade.originCountry" label="Origin country" required error={err("trade.originCountry")}>
                  <select className="select" value={form.trade.originCountry} onChange={(e) => (setSection("trade", { originCountry: e.target.value }), clearError("trade.originCountry"))} {...aria("trade.originCountry", err("trade.originCountry"))}>
                    <option>Uganda</option>
                    <option>Kenya</option>
                    <option>Tanzania</option>
                    <option>No preference — best available</option>
                  </select>
                </Field>
                <Field id="trade.destinationCountry" label="Destination country" required error={err("trade.destinationCountry")}>
                  <select className="select" value={form.trade.destinationCountry} onChange={(e) => (setSection("trade", { destinationCountry: e.target.value }), clearError("trade.destinationCountry"))} {...aria("trade.destinationCountry", err("trade.destinationCountry"))}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field id="trade.deliveryCity" label="Delivery city" required error={err("trade.deliveryCity")}>
                  <input className="input" autoComplete="address-level2" value={form.trade.deliveryCity} onChange={(e) => (setSection("trade", { deliveryCity: e.target.value }), clearError("trade.deliveryCity"))} {...aria("trade.deliveryCity", err("trade.deliveryCity"))} />
                </Field>
                <Field id="trade.shipmentDate" label="Expected shipment date" required error={err("trade.shipmentDate")}>
                  <input className="input" type="date" min={new Date().toISOString().slice(0, 10)} value={form.trade.shipmentDate} onChange={(e) => (setSection("trade", { shipmentDate: e.target.value }), clearError("trade.shipmentDate"))} {...aria("trade.shipmentDate", err("trade.shipmentDate"))} />
                  <label className="check" style={{ fontSize: "0.85rem" }}>
                    <input type="checkbox" checked={form.trade.dateFlexible} onChange={(e) => setSection("trade", { dateFlexible: e.target.checked })} />
                    My dates are flexible
                  </label>
                </Field>
                <Field id="trade.loadingPort" label="Loading port or airport" optional hint="Leave blank if you would like us to advise">
                  <input className="input" list="loading-ports" value={form.trade.loadingPort} onChange={(e) => setSection("trade", { loadingPort: e.target.value })} {...aria("trade.loadingPort", undefined, true)} />
                  <datalist id="loading-ports">{LOADING_PORTS.map((l) => <option key={l} value={l} />)}</datalist>
                </Field>
                <Field id="trade.destinationPort" label="Destination port or airport" required error={err("trade.destinationPort")}>
                  <input className="input" list="dest-ports" value={form.trade.destinationPort} onChange={(e) => (setSection("trade", { destinationPort: e.target.value }), clearError("trade.destinationPort"))} {...aria("trade.destinationPort", err("trade.destinationPort"))} />
                  <datalist id="dest-ports">{DEST_PORTS.map((l) => <option key={l} value={l} />)}</datalist>
                </Field>
              </div>

              <div className="wizard-section">
                <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="wizard-section__title">
                    Freight mode <span className="field__req">*</span>
                  </legend>
                  <div className="choice-grid">
                    {FREIGHT_MODES.map((m) => (
                      <label className="choice" key={m}>
                        <input type="radio" name="freightMode" checked={form.trade.freightMode === m} onChange={() => (setSection("trade", { freightMode: m }), clearError("trade.freightMode"))} />
                        <Icon name={m.startsWith("Air") ? "plane" : m.startsWith("Sea") ? "ship" : m.startsWith("Road") ? "truck" : "route"} size={20} />
                        {m}
                      </label>
                    ))}
                  </div>
                  {err("trade.freightMode") ? (
                    <span className="field__error" role="alert">
                      <Icon name="info" size={14} /> {err("trade.freightMode")}
                    </span>
                  ) : null}
                </fieldset>
              </div>

              <div className="wizard-section">
                <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="wizard-section__title">
                    Incoterm <span className="field__req">*</span>
                  </legend>
                  <div className="choice-grid">
                    {INCOTERMS.map((t) => (
                      <label className="choice" key={t.code} title={t.help}>
                        <input type="radio" name="incoterm" checked={form.trade.incoterm === t.code} onChange={() => (setSection("trade", { incoterm: t.code }), clearError("trade.incoterm"))} />
                        <span>
                          <strong>{t.code}</strong> — {t.name}
                          <small>{t.help}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                  {err("trade.incoterm") ? (
                    <span className="field__error" role="alert">
                      <Icon name="info" size={14} /> {err("trade.incoterm")}
                    </span>
                  ) : null}
                  <p className="field__hint" style={{ marginTop: 10 }}>
                    Incoterms® 2020 rules. FOB, CFR and CIF apply to sea freight only. Unsure? Choose the closest and add a note — we will advise.
                  </p>
                </fieldset>
              </div>
            </div>
          )}

          {/* Step 5 — Quality & documents */}
          {step === 4 && (
            <div>
              <div className="alert alert--info" style={{ marginBottom: 22 }}>
                <Icon name="info" size={18} />
                <span>Select what you need. We will confirm in writing which documents and certifications can be provided for your products and origin — nothing is promised until confirmed.</span>
              </div>
              <div className="choice-grid">
                {DOCUMENTS.map((d) => (
                  <label className="choice" key={d.id}>
                    <input
                      type="checkbox"
                      checked={form.quality.documents.includes(d.id)}
                      onChange={(e) => setSection("quality", { documents: e.target.checked ? [...form.quality.documents, d.id] : form.quality.documents.filter((x) => x !== d.id) })}
                    />
                    <span>
                      {d.label}
                      <small>{d.help}</small>
                    </span>
                  </label>
                ))}
              </div>
              <Field id="quality.additionalRequirements" label="Additional buyer requirements" optional className="wizard-section" error={err("quality.additionalRequirements")}>
                <textarea className="textarea" rows={4} placeholder="e.g. destination-market rules, MRL limits, inspection company, labelling" value={form.quality.additionalRequirements} onChange={(e) => setSection("quality", { additionalRequirements: e.target.value })} {...aria("quality.additionalRequirements", err("quality.additionalRequirements"))} />
              </Field>
            </div>
          )}

          {/* Step 6 — Commercial */}
          {step === 5 && (
            <div className="form-grid">
              <Field id="commercial.currency" label="Preferred currency" required error={err("commercial.currency")}>
                <select className="select" value={form.commercial.currency} onChange={(e) => setSection("commercial", { currency: e.target.value })} {...aria("commercial.currency", err("commercial.currency"))}>
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field id="commercial.targetPrice" label="Target price" optional hint="e.g. 2.40 per kg FCA, or 18.00 per carton">
                <input className="input" value={form.commercial.targetPrice} onChange={(e) => setSection("commercial", { targetPrice: e.target.value })} {...aria("commercial.targetPrice", undefined, true)} />
              </Field>
              <Field id="commercial.paymentMethod" label="Preferred payment method" required error={err("commercial.paymentMethod")} tip="A Letter of Credit is a bank undertaking to pay against compliant documents. D/P releases documents on payment; D/A on acceptance of a bill of exchange.">
                <select className="select" value={form.commercial.paymentMethod} onChange={(e) => (setSection("commercial", { paymentMethod: e.target.value }), clearError("commercial.paymentMethod"))} {...aria("commercial.paymentMethod", err("commercial.paymentMethod"))}>
                  <option value="">Select</option>
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field id="commercial.paymentTerms" label="Commercial payment terms" required error={err("commercial.paymentTerms")}>
                <select className="select" value={form.commercial.paymentTerms} onChange={(e) => (setSection("commercial", { paymentTerms: e.target.value }), clearError("commercial.paymentTerms"))} {...aria("commercial.paymentTerms", err("commercial.paymentTerms"))}>
                  <option value="">Select</option>
                  {PAYMENT_TERMS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field id="commercial.supplyType" label="Supply requirement" required error={err("commercial.supplyType")}>
                <select className="select" value={form.commercial.supplyType} onChange={(e) => (setSection("commercial", { supplyType: e.target.value, frequency: e.target.value === "One-off shipment" ? "" : form.commercial.frequency }), clearError("commercial.supplyType"))} {...aria("commercial.supplyType", err("commercial.supplyType"))}>
                  <option value="">Select</option>
                  {SUPPLY_TYPES.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              {form.commercial.supplyType && form.commercial.supplyType !== "One-off shipment" ? (
                <Field id="commercial.frequency" label="Supply frequency" required error={err("commercial.frequency")}>
                  <select className="select" value={form.commercial.frequency} onChange={(e) => (setSection("commercial", { frequency: e.target.value }), clearError("commercial.frequency"))} {...aria("commercial.frequency", err("commercial.frequency"))}>
                    <option value="">Select</option>
                    {SUPPLY_FREQUENCY.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </Field>
              ) : null}
              <Field id="commercial.contractDuration" label="Contract duration" required error={err("commercial.contractDuration")}>
                <select className="select" value={form.commercial.contractDuration} onChange={(e) => (setSection("commercial", { contractDuration: e.target.value }), clearError("commercial.contractDuration"))} {...aria("commercial.contractDuration", err("commercial.contractDuration"))}>
                  <option value="">Select</option>
                  {CONTRACT_DURATIONS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field id="commercial.conditions" label="Additional conditions" optional className="span-2">
                <textarea className="textarea" rows={4} value={form.commercial.conditions} onChange={(e) => setSection("commercial", { conditions: e.target.value })} {...aria("commercial.conditions")} />
              </Field>
            </div>
          )}

          {/* Step 7 — Files */}
          {step === 6 && (
            <div>
              <label
                className="dropzone"
                data-active={dragging}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const next = [...files, ...Array.from(e.dataTransfer.files)].slice(0, UPLOAD_RULES.maxFiles);
                  setFiles(next);
                  setErrors(validateFiles(next));
                }}
              >
                <Icon name="upload" size={36} />
                <strong style={{ display: "block", color: "var(--forest-900)" }}>Drop files here or click to browse</strong>
                <span className="muted" style={{ fontSize: "0.88rem" }}>
                  {UPLOAD_RULES.mimeLabel} · up to {UPLOAD_RULES.maxFiles} files · 4MB total
                </span>
                <input
                  type="file"
                  className="visually-hidden"
                  multiple
                  accept={UPLOAD_RULES.accept}
                  onChange={(e) => {
                    const next = [...files, ...Array.from(e.target.files ?? [])].slice(0, UPLOAD_RULES.maxFiles);
                    setFiles(next);
                    setErrors(validateFiles(next));
                    e.target.value = "";
                  }}
                />
              </label>
              {err("files") ? (
                <p className="field__error" role="alert" style={{ marginTop: 10 }}>
                  <Icon name="info" size={14} /> {err("files")}
                </p>
              ) : null}
              {files.length ? (
                <ul className="file-list">
                  {files.map((f, i) => (
                    <li key={f.name + i}>
                      <span>
                        <Icon name="document" size={16} style={{ display: "inline", marginRight: 8, verticalAlign: "-3px" }} />
                        {f.name} <span className="muted">({Math.max(1, Math.round(f.size / 1024))} KB)</span>
                      </span>
                      <button type="button" className="icon-btn" onClick={() => {
                        const next = files.filter((_, j) => j !== i);
                        setFiles(next);
                        setErrors(validateFiles(next));
                      }}>
                        <Icon name="trash" size={14} /> Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted" style={{ marginTop: 14, fontSize: "0.9rem" }}>
                  No files added. This step is optional.
                </p>
              )}
              <div className="note" style={{ marginTop: 22 }}>
                <Icon name="shield" size={20} />
                <span>Files are checked on our server, stored privately and only accessible to the Axis Agro team handling your enquiry.</span>
              </div>
            </div>
          )}

          {/* Step 8 — Review */}
          {step === 7 && <Review form={form} files={files} goTo={goTo} errors={errors} setConsent={(patch) => (setSection("consent", patch), setErrors({}))} />}

          {serverError ? (
            <div className="alert alert--error" role="alert" style={{ marginTop: 24 }}>
              <Icon name="info" size={18} />
              <span>
                {serverError} If the problem continues, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </span>
            </div>
          ) : null}
          {needsConsent ? (
            <div className="alert alert--info" role="alert" style={{ marginTop: 24, flexWrap: "wrap" }}>
              <Icon name="shield" size={18} />
              <span style={{ flex: 1, minWidth: 220 }}>To submit online we need to load Google reCAPTCHA spam protection, which may set cookies. You can also email us instead.</span>
              <button
                type="button"
                className="btn btn--sm"
                onClick={() => {
                  writeConsent(true);
                  submit();
                }}
              >
                Allow &amp; submit
              </button>
            </div>
          ) : null}

          <div className="wizard-nav">
            {step > 0 ? (
              <button type="button" className="btn btn--outline" onClick={() => goTo(step - 1)}>
                Back
              </button>
            ) : (
              <span />
            )}
            <div className="wizard-nav__right">
              {step === STEPS.length - 1 ? (
                <button type="submit" className="btn btn--gold" disabled={submitting} aria-busy={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner" aria-hidden="true" /> Submitting…
                    </>
                  ) : (
                    <>
                      Submit quotation request <Icon name="arrow" size={18} />
                    </>
                  )}
                </button>
              ) : (
                <button type="submit" className="btn">
                  {step === 6 && !files.length ? "Skip & continue" : "Continue"} <Icon name="arrow" size={18} />
                </button>
              )}
            </div>
          </div>
          <p className="field__hint" style={{ marginTop: 16 }}>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </form>
      </div>
    </div>
  );
}

// ─── Review step ─────────────────────────────────────────────────────────────

function Review({ form, files, goTo, errors, setConsent }: { form: Form; files: File[]; goTo: (s: number) => void; errors: Errors; setConsent: (p: Partial<Form["consent"]>) => void }) {
  const b = form.buyer;
  const t = form.trade;
  const c = form.commercial;
  const unit = (u: string) => QUANTITY_UNITS.find((x) => x.id === u)?.label ?? u;
  return (
    <div>
      <ReviewBlock goTo={goTo}
        title="Buyer"
        step={0}
        rows={[
          ["Name", b.fullName],
          ["Company", b.company],
          ["Classification", b.buyerType === "Other" ? `Other — ${b.buyerTypeOther}` : b.buyerType],
          ["Email", b.email],
          ["Phone", b.phone],
          ["Country", b.country],
          ["Website", b.website],
          ["Delivery address", b.deliveryAddress],
        ]}
      />
      <section className="review-block">
        <div className="review-block__head">
          <h3>Products ({form.items.length})</h3>
          <span style={{ display: "flex", gap: 4 }}>
            <button type="button" className="icon-btn" style={{ color: "var(--botanical)" }} onClick={() => goTo(1)}>
              <Icon name="edit" size={14} /> Products
            </button>
            <button type="button" className="icon-btn" style={{ color: "var(--botanical)" }} onClick={() => goTo(2)}>
              <Icon name="edit" size={14} /> Volumes
            </button>
          </span>
        </div>
        {form.items.map((it, i) => (
          <div className="review-item" key={it.key}>
            <strong style={{ color: "var(--forest-900)" }}>
              {i + 1}. {it.productName}
            </strong>
            <div className="muted" style={{ fontSize: "0.92rem", marginTop: 4 }}>
              {[
                it.grade && (it.grade.startsWith("Other") ? `Grade: ${it.gradeOther}` : `Grade: ${it.grade}`),
                it.variety && `Variety: ${it.variety}`,
                it.originPreference && `Origin: ${it.originPreference}`,
                `${Number(it.quantity).toLocaleString("en-GB")} × ${unit(it.unit)}${it.containerType ? ` (${it.containerType})` : ""}`,
                it.packaging === "Custom packaging" ? `Packaging: ${it.packagingOther}` : it.packaging,
                it.calibre && `Calibre: ${it.calibre}`,
                it.ripeness && `Ripeness: ${it.ripeness}`,
                it.handling && `Handling: ${it.handling}`,
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
            {it.specifications ? <div style={{ fontSize: "0.9rem", marginTop: 6, whiteSpace: "pre-wrap" }}>{it.specifications}</div> : null}
          </div>
        ))}
      </section>
      <ReviewBlock goTo={goTo}
        title="Trade & shipment"
        step={3}
        rows={[
          ["Route", `${t.originCountry} → ${t.destinationCountry}`],
          ["Delivery city", t.deliveryCity],
          ["Loading port / airport", t.loadingPort || "To be advised"],
          ["Destination port / airport", t.destinationPort],
          ["Freight mode", t.freightMode],
          ["Incoterm", t.incoterm ? `${t.incoterm} — ${INCOTERMS.find((x) => x.code === t.incoterm)?.name}` : ""],
          ["Shipment date", t.shipmentDate ? `${new Date(t.shipmentDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}${t.dateFlexible ? " (flexible)" : ""}` : ""],
        ]}
      />
      <ReviewBlock goTo={goTo}
        title="Quality & documents"
        step={4}
        rows={[
          ["Requested", form.quality.documents.map((d) => DOCUMENTS.find((x) => x.id === d)?.label).join(", ") || "None selected"],
          ["Additional requirements", form.quality.additionalRequirements],
        ]}
      />
      <ReviewBlock goTo={goTo}
        title="Commercial"
        step={5}
        rows={[
          ["Currency", c.currency],
          ["Target price", c.targetPrice],
          ["Payment method", c.paymentMethod],
          ["Payment terms", c.paymentTerms],
          ["Supply", c.supplyType + (c.frequency ? ` — ${c.frequency}` : "")],
          ["Contract duration", c.contractDuration],
          ["Additional conditions", c.conditions],
        ]}
      />
      <ReviewBlock goTo={goTo} title="Files" step={6} rows={[["Uploaded", files.length ? files.map((f) => f.name).join(", ") : "None"]]} />

      <div className="wizard-section" style={{ display: "grid", gap: 14 }}>
        <label className="check">
          <input type="checkbox" checked={form.consent.privacy} onChange={(e) => setConsent({ privacy: e.target.checked })} aria-invalid={errors["consent.privacy"] ? true : undefined} />
          <span>
            I have read the{" "}
            <Link href="/privacy" target="_blank">
              privacy notice
            </Link>{" "}
            and agree that Axis Agro may store and use these details to respond to this enquiry. <span className="field__req">*</span>
          </span>
        </label>
        {errors["consent.privacy"] ? (
          <span className="field__error" role="alert">
            <Icon name="info" size={14} /> {errors["consent.privacy"]}
          </span>
        ) : null}
        <label className="check">
          <input type="checkbox" checked={form.consent.accuracy} onChange={(e) => setConsent({ accuracy: e.target.checked })} aria-invalid={errors["consent.accuracy"] ? true : undefined} />
          <span>
            I confirm the information is accurate and understand that a quotation request is not a binding order. <span className="field__req">*</span>
          </span>
        </label>
        {errors["consent.accuracy"] ? (
          <span className="field__error" role="alert">
            <Icon name="info" size={14} /> {errors["consent.accuracy"]}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ReviewBlock({ title, step, rows, goTo }: { title: string; step: number; rows: [string, ReactNode][]; goTo: (s: number) => void }) {
  return (
    <section className="review-block">
      <div className="review-block__head">
        <h3>{title}</h3>
        <button type="button" className="icon-btn" style={{ color: "var(--botanical)" }} onClick={() => goTo(step)}>
          <Icon name="edit" size={14} /> Edit
        </button>
      </div>
      <dl>
        {rows
          .filter(([, v]) => v !== "" && v !== undefined && v !== null)
          .map(([k, v]) => (
            <FragmentRow key={k} k={k} v={v} />
          ))}
      </dl>
    </section>
  );
}

function FragmentRow({ k, v }: { k: string; v: ReactNode }) {
  return (
    <>
      <dt>{k}</dt>
      <dd>{v}</dd>
    </>
  );
}

/**
 * Zod skips refinements while other fields on the object are invalid, so dependent
 * fields are also checked here to show every error on a step in one pass.
 */
function withCrossChecks(e: Errors, f: Form, section: "buyer" | "commercial"): Errors {
  const out = { ...e };
  if (section === "buyer" && f.buyer.buyerType === "Other" && !f.buyer.buyerTypeOther.trim() && !("buyer.buyerType" in out)) out["buyer.buyerTypeOther"] ??= "Describe your business type";
  if (section === "commercial" && f.commercial.supplyType && f.commercial.supplyType !== "One-off shipment" && !f.commercial.frequency) out["commercial.frequency"] ??= "Select a supply frequency";
  return out;
}
