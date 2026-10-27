"use client";

import { readConsent } from "./consent";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

// The site key is public by design; the env var allows it to be rotated without a code change.
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lep0wUtAAAAACeFsAAPhGjt6xcNyA5OYojAptei";

export class ConsentRequiredError extends Error {
  constructor() {
    super("Spam protection needs your permission to load.");
    this.name = "ConsentRequiredError";
  }
}

let loader: Promise<void> | null = null;

function load(): Promise<void> {
  if (loader) return loader;
  loader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return resolve();
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loader = null;
      reject(new Error("Could not load spam protection. Please check your connection and try again."));
    };
    document.head.appendChild(s);
  });
  return loader;
}

/** Load reCAPTCHA ahead of time if the visitor has already consented. */
export function preloadRecaptcha() {
  if (readConsent()?.recaptcha) load().catch(() => {});
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (!readConsent()?.recaptcha) throw new ConsentRequiredError();
  await load();
  const g = window.grecaptcha;
  if (!g) throw new Error("Spam protection is unavailable. Please try again.");
  await new Promise<void>((r) => g.ready(r));
  return g.execute(RECAPTCHA_SITE_KEY, { action });
}
