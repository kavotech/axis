import Link from "next/link";
import { PageHero } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website Terms of Use",
  description: "Terms governing use of the Axis Agro International Ltd website, product information and quotation requests.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Website terms of use" intro="Please read these terms before using this website." crumbs={[{ name: "Terms", href: "/terms" }]} variant="plain" />
      <section className="section">
        <div className="container container--narrow prose">
          <p className="legal-flag">
            <strong>Draft for company review.</strong> These terms cover use of the website only. They are not terms of sale. They should be reviewed by Axis Agro International Ltd and a legal adviser
            before being relied upon. Last updated 27 October 2026.
          </p>

          <h2>About these terms</h2>
          <p>
            This website is operated by {SITE.legalName}, {SITE.registration}. By using the site you accept these terms. Contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Product information</h2>
          <p>
            Product descriptions, specifications, origins, packaging and logistics information are provided for general guidance. Availability, grades, specifications, documentation and seasonality vary
            and are confirmed in writing for each enquiry. Nothing on this website is an offer to sell.
          </p>

          <h2>Quotation requests</h2>
          <p>
            Submitting a quotation request or contact form does not create a contract or oblige either party to trade. Any supply is subject to a separate written agreement or confirmed order on terms
            agreed between the parties, including price, Incoterms, payment terms and specifications.
          </p>

          <h2>Your use of the website</h2>
          <ul>
            <li>Provide accurate information and only upload files you are entitled to share.</li>
            <li>Do not attempt to interfere with the website, its security or other users.</li>
            <li>Do not submit unlawful, harmful or misleading content.</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            The website design, text and original illustrations belong to Axis Agro or its licensors. Some photographs are used under the Unsplash licence. You may view and print pages for your own
            business use.
          </p>

          <h2>Liability</h2>
          <p>
            We take care to keep information accurate but do not guarantee it is complete or current. To the extent permitted by law we exclude liability for loss arising from reliance on website content.
            Nothing in these terms limits liability that cannot be limited by law.
          </p>

          <h2>Links</h2>
          <p>Links to third-party websites are provided for convenience; we are not responsible for their content.</p>

          <h2>Governing law</h2>
          <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction.</p>

          <p>
            See also our <Link href="/privacy">privacy notice</Link> and <Link href="/cookies">cookie policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
