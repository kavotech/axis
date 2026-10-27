"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, openCookieSettings, readConsent, writeConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [manage, setManage] = useState(false);
  const [recaptcha, setRecaptcha] = useState(true);

  useEffect(() => {
    const existing = readConsent();
    // localStorage is only readable after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!existing) setVisible(true);
    else setRecaptcha(existing.recaptcha);
    const open = () => {
      setRecaptcha(readConsent()?.recaptcha ?? true);
      setManage(true);
      setVisible(true);
    };
    const sync = () => setVisible(false);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, open);
      window.removeEventListener(CONSENT_EVENT, sync);
    };
  }, []);

  if (!visible) return null;

  return (
    <section className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <h2 id="cookie-title">Cookies &amp; privacy</h2>
      <p>
        We do not use analytics or advertising cookies. Our enquiry forms use Google reCAPTCHA to block spam, which may set
        cookies when a form is submitted. <Link href="/cookies">Cookie policy</Link>
      </p>
      {manage ? (
        <div className="cookie__options">
          <div className="cookie__opt">
            <div>
              <strong>Essential</strong>
              <small>Remembers this choice. Always on.</small>
            </div>
            <input type="checkbox" checked disabled aria-label="Essential storage (always on)" />
          </div>
          <label className="cookie__opt">
            <div>
              <strong>Form spam protection</strong>
              <small>Google reCAPTCHA, loaded only when you submit a form.</small>
            </div>
            <input type="checkbox" checked={recaptcha} onChange={(e) => setRecaptcha(e.target.checked)} />
          </label>
        </div>
      ) : null}
      <div className="btn-row">
        {manage ? (
          <button type="button" className="btn btn--sm" onClick={() => writeConsent(recaptcha)}>
            Save choices
          </button>
        ) : (
          <>
            <button type="button" className="btn btn--sm" onClick={() => writeConsent(true)}>
              Accept
            </button>
            <button type="button" className="btn btn--sm btn--outline" onClick={() => writeConsent(false)}>
              Essential only
            </button>
            <button type="button" className="btn btn--sm btn--outline" onClick={() => setManage(true)}>
              Manage
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}
