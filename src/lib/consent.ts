"use client";

/**
 * Cookie / third-party consent. The site sets no analytics or advertising cookies.
 * The only optional third party is Google reCAPTCHA, which is loaded on form pages
 * when a visitor submits a form and protection consent has been given.
 */
export type Consent = { v: 1; recaptcha: boolean; decidedAt: string };

const KEY = "axis-consent";
export const CONSENT_EVENT = "axis-consent-change";
export const OPEN_SETTINGS_EVENT = "axis-open-cookie-settings";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    return parsed?.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function writeConsent(recaptcha: boolean) {
  const value: Consent = { v: 1, recaptcha, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable — the choice still applies for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
