import Link from "next/link";
import { PageTop } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Notice",
  description: "How Axis Agro International Ltd collects, uses, stores and protects personal data submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageTop variant="plain" title="Privacy notice" left={<p style={{ margin: 0 }}>{"How we handle personal data submitted through this website."}</p>} crumbs={[{ name: "Privacy", href: "/privacy" }]} />
      <section className="section">
        <div className="prose">
          <p className="legal-flag">
            <strong>Draft for company review.</strong> This notice describes how the website currently processes data. It should be reviewed by Axis Agro International Ltd (and, where appropriate, a
            legal adviser) before being relied upon. Last updated 27 October 2026.
          </p>

          <h2>Who we are</h2>
          <p>
            {SITE.legalName} (&ldquo;Axis Agro&rdquo;, &ldquo;we&rdquo;) is the controller of personal data collected through this website. Contact: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>,{" "}
            {SITE.phone}. {SITE.registration}; registered office address available on request.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Quotation requests:</strong> name, company, business email, phone, website, country, delivery address, buyer type, product and trade requirements, commercial preferences and any
              files you upload.
            </li>
            <li>
              <strong>Contact messages:</strong> name, company, email, phone, country, topic and message.
            </li>
            <li>
              <strong>Technical data:</strong> your IP address, used briefly in memory for rate limiting and never stored by us, the reCAPTCHA risk score and standard server logs kept by our hosting
              provider.
            </li>
          </ul>

          <h2>Why we use it and our lawful basis</h2>
          <ul>
            <li>To respond to your enquiry and prepare quotations — steps taken at your request prior to entering a contract, and our legitimate interest in responding to business enquiries.</li>
            <li>To protect the website from spam and abuse — our legitimate interest in keeping our services secure.</li>
            <li>To keep records of commercial correspondence — our legitimate interests and legal obligations.</li>
          </ul>
          <p>We do not sell your data and we do not use it for automated decision-making. We will only send marketing if you separately ask us to.</p>

          <h2>Who we share it with</h2>
          <ul>
            <li>Vercel Inc. (website hosting)</li>
            <li>Resend (email delivery — enquiries, including any files you upload, are delivered to our team by email and held in our business mailbox)</li>
            <li>Google (reCAPTCHA spam protection — subject to Google&rsquo;s privacy policy)</li>
            <li>Logistics, inspection or sourcing partners, only where needed to prepare your quotation and with the minimum information necessary</li>
          </ul>
          <p>Some providers may process data outside the UK. Where they do, we rely on appropriate safeguards such as the UK International Data Transfer Addendum or adequacy regulations.</p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries that do not lead to a contract are kept for up to 24 months and then deleted. Records relating to contracts are kept for as long as required for legal, tax and accounting purposes
            (typically six years). <em>[Retention periods to be confirmed by the company.]</em>
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK data protection law you can ask to access, correct, delete or restrict use of your personal data, object to processing based on legitimate interests and request data portability. Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You can also complain to the Information Commissioner&rsquo;s Office (ico.org.uk).
          </p>

          <h2>Cookies</h2>
          <p>
            See our <Link href="/cookies">cookie policy</Link> for details of storage technologies used on this site.
          </p>
        </div>
      </section>
    </>
  );
}
