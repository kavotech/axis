# Axis Agro International Ltd — website

Next.js 16 (App Router, TypeScript) site for Axis Agro International Ltd, deployed on Vercel from `main`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Structure

| Path | Purpose |
| --- | --- |
| `src/data/` | All content: site details, categories, products, services, insights, quote options |
| `src/components/` | Layout, UI primitives, icons, catalogue, quote wizard, contact form |
| `src/app/` | Routes (`/products/[slug]` serves both category and product pages) |
| `src/app/api/quote`, `src/app/api/contact` | Server routes: validation, reCAPTCHA, rate limiting, email |
| `src/lib/server/` | Server-only helpers (Resend, reCAPTCHA, security) |
| `public/images/` | Optimised WebP photography (company photos + Unsplash-licensed images) |

To add a product, append it to `src/data/products.ts`; its page, catalogue card, sitemap entry and quote-form option are generated automatically.

## Environment variables

Set in Vercel → Project → Settings → Environment Variables (see `.env.example`). Never commit real values.

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | client | reCAPTCHA v3 site key |
| `RECAPTCHA_SECRET_KEY` | server | reCAPTCHA v3 secret (rotated) |
| `RECAPTCHA_MIN_SCORE` | server | optional, default `0.5`; 0.3–0.5 is accepted but flagged for review |
| `RESEND_API_KEY` | server | Resend API key |
| `EMAIL_FROM_ADDRESS` | server | sender on a Resend-verified domain (falls back to `SENDER_EMAIL`) |
| `QUOTE_NOTIFICATION_EMAIL` | server | comma-separated (falls back to `ADMIN_EMAIL_1`, then info@axisagro.co.uk) |
| `CONTACT_NOTIFICATION_EMAIL` | server | comma-separated (falls back to the quote recipients) |

Enquiries are delivered by email only — there is no database. The team receives a full summary (with any uploaded files attached) and the buyer receives an acknowledgement with their reference. If Resend is not configured or rejects the send, the visitor sees an error asking them to email info@axisagro.co.uk; nothing is silently lost.

## Reference material

`olympicfruit/` and `olympicfruit-full/` are local design-reference mirrors. They are git-ignored and excluded from Vercel uploads — do not commit them.
