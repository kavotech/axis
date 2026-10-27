"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COUNTRIES } from "@/data/countries";
import { SITE } from "@/data/site";
import { writeConsent } from "@/lib/consent";
import { ConsentRequiredError, getRecaptchaToken, preloadRecaptcha } from "@/lib/recaptcha-client";
import { CONTACT_TOPICS, contactSchema } from "@/lib/schemas";
import { Icon } from "./Icon";
import { useToast } from "./Toast";

const EMPTY = { name: "", company: "", email: "", phone: "", country: "", topic: "General enquiry", message: "", privacy: false };

export function ContactForm() {
  const toast = useToast();
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const [needsConsent, setNeedsConsent] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const startedAt = useRef(0);
  const hp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    preloadRecaptcha();
  }, []);

  const set = (k: keyof typeof EMPTY, val: string | boolean) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async () => {
    const parsed = contactSchema.safeParse(v);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      for (const i of parsed.error.issues) map[String(i.path[0])] ??= i.message;
      setErrors(map);
      requestAnimationFrame(() => (document.querySelector("#contact-form [aria-invalid='true']") as HTMLElement | null)?.focus());
      return;
    }
    setBusy(true);
    setServerError("");
    setNeedsConsent(false);
    try {
      const recaptchaToken = await getRecaptchaToken("contact");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, recaptchaToken, fax: hp.current?.value ?? "", startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({ ok: false, error: "Unexpected response from server." }));
      if (!res.ok || !json.ok) {
        if (json.fields) setErrors(json.fields);
        throw new Error(json.error || "Your message could not be sent.");
      }
      setDone(json.reference);
      toast("Message sent. Thank you.", "success");
    } catch (err) {
      if (err instanceof ConsentRequiredError) setNeedsConsent(true);
      else {
        const msg = err instanceof Error ? err.message : "Your message could not be sent.";
        setServerError(msg);
        toast(msg, "error");
      }
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="wizard-panel success-card" aria-live="polite">
        <span className="icon-badge icon-badge--gold icon-badge--lg">
          <Icon name="check" size={44} strokeWidth={2.4} />
        </span>
        <h2>Thank you, {v.name.split(" ")[0]}.</h2>
        <p className="lead">Your message has reached our team. We aim to reply within one to two working days.</p>
        <div className="reference">{done}</div>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/products" className="btn">
            Browse products
          </Link>
          <Link href="/get-a-quote" className="btn btn--outline">
            Request a quote
          </Link>
        </div>
      </div>
    );
  }

  const a = (k: string) => ({ id: `c-${k}`, name: k, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `c-${k}-error` : undefined });

  return (
    <form
      id="contact-form"
      className="wizard-panel"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2 style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}>Send us a message</h2>
      <p className="muted" style={{ marginBottom: 28 }}>
        For detailed product pricing, the <Link href="/get-a-quote">quotation form</Link> captures everything our team needs.
      </p>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="c-fax">Fax</label>
        <input id="c-fax" ref={hp} tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="c-name">
            Full name <span className="field__req">*</span>
          </label>
          <input className="input" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...a("name")} />
          <FieldError errors={errors} k="name" />
        </div>
        <div className="field">
          <label htmlFor="c-company">
            Company <span className="field__opt">(optional)</span>
          </label>
          <input className="input" autoComplete="organization" value={v.company} onChange={(e) => set("company", e.target.value)} {...a("company")} />
        </div>
        <div className="field">
          <label htmlFor="c-email">
            Email <span className="field__req">*</span>
          </label>
          <input className="input" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...a("email")} />
          <FieldError errors={errors} k="email" />
        </div>
        <div className="field">
          <label htmlFor="c-phone">
            Phone <span className="field__opt">(optional)</span>
          </label>
          <input className="input" type="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} {...a("phone")} />
          <FieldError errors={errors} k="phone" />
        </div>
        <div className="field">
          <label htmlFor="c-country">
            Country <span className="field__opt">(optional)</span>
          </label>
          <select className="select" value={v.country} onChange={(e) => set("country", e.target.value)} {...a("country")}>
            <option value="">Select country</option>
            {COUNTRIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-topic">
            Topic <span className="field__req">*</span>
          </label>
          <select className="select" value={v.topic} onChange={(e) => set("topic", e.target.value)} {...a("topic")}>
            {CONTACT_TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field span-2">
          <label htmlFor="c-message">
            Message <span className="field__req">*</span>
          </label>
          <textarea className="textarea" rows={6} value={v.message} onChange={(e) => set("message", e.target.value)} {...a("message")} />
          <FieldError errors={errors} k="message" />
        </div>
        <div className="field span-2">
          <label className="check" style={{ fontWeight: 400 }}>
            <input type="checkbox" checked={v.privacy} onChange={(e) => set("privacy", e.target.checked)} aria-invalid={errors.privacy ? true : undefined} />
            <span>
              I have read the <Link href="/privacy">privacy notice</Link> and agree that Axis Agro may use these details to respond to my message. <span className="field__req">*</span>
            </span>
          </label>
          <FieldError errors={errors} k="privacy" />
        </div>
      </div>
      {serverError ? (
        <div className="alert alert--error" role="alert" style={{ marginTop: 20 }}>
          <Icon name="info" size={18} />
          <span>
            {serverError} You can also email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </span>
        </div>
      ) : null}
      {needsConsent ? (
        <div className="alert alert--info" role="alert" style={{ marginTop: 20, flexWrap: "wrap" }}>
          <Icon name="shield" size={18} />
          <span style={{ flex: 1, minWidth: 220 }}>Sending online requires Google reCAPTCHA spam protection, which may set cookies.</span>
          <button
            type="button"
            className="btn btn--sm"
            onClick={() => {
              writeConsent(true);
              submit();
            }}
          >
            Allow &amp; send
          </button>
        </div>
      ) : null}
      <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <p className="field__hint" style={{ margin: 0, maxWidth: 380 }}>
          Protected by reCAPTCHA. Google{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
            Terms
          </a>{" "}
          apply.
        </p>
        <button type="submit" className="btn" disabled={busy} aria-busy={busy}>
          {busy ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Icon name="arrow" size={18} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({ errors, k }: { errors: Record<string, string>; k: string }) {
  return errors[k] ? (
    <span className="field__error" id={`c-${k}-error`} role="alert">
      <Icon name="info" size={14} /> {errors[k]}
    </span>
  ) : null;
}
