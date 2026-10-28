import { CookieSettingsButton } from "@/components/CookieConsent";
import { PageTop } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "The cookies and browser storage used on the Axis Agro International website and how to control them.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <PageTop variant="plain" title="Cookie policy" left={<p style={{ margin: 0 }}>{"We keep cookies to a minimum."}</p>} crumbs={[{ name: "Cookies", href: "/cookies" }]} />
      <section className="section">
        <div className="prose">
          <p className="legal-flag">
            <strong>Draft for company review.</strong> Last updated 27 October 2026.
          </p>
          <h2>What we use</h2>
          <ul>
            <li>
              <strong>Your cookie choice</strong> — stored in your browser&rsquo;s local storage so we do not ask again. Essential.
            </li>
            <li>
              <strong>Quotation draft</strong> — the quotation form saves your progress in session storage in this browser tab only, so a refresh does not lose your work. Cleared when the tab closes or the
              request is submitted. Essential to the service you requested.
            </li>
            <li>
              <strong>Google reCAPTCHA</strong> — loaded only when you submit a form and only with your permission. Google may set cookies to assess whether the submission is from a person.
            </li>
          </ul>
          <p>We do not use analytics, advertising or social-media tracking cookies.</p>
          <h2>Change your choice</h2>
          <p>
            <CookieSettingsButton />
          </p>
        </div>
      </section>
    </>
  );
}
