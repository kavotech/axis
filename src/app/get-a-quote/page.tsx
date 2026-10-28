import { Suspense } from "react";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Band, PageTop } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote — International B2B Produce Quotation",
  description:
    "Request a quotation for fresh produce, Uganda green coffee, cocoa, spices and commodities. Configure products, volumes, packaging, Incoterms, documents and payment terms in one enquiry.",
  path: "/get-a-quote",
  image: "/images/axis-export-bags.webp",
});

export default function QuotePage() {
  return (
    <div className="accent-leaf">
      <PageTop
        title="Request a quote"
        image="/images/axis-export-bags.webp"
        imageAlt="Bags of produce prepared for export"
        under="var(--leaf)"
        crumbs={[{ name: "Get a quote", href: "/get-a-quote" }]}
        columns={[
          <p key="1">
            <strong>1. We review</strong>
            <br />
            Your requirements are checked against confirmed supply and seasonality.
          </p>,
          <p key="2">
            <strong>2. We respond in writing</strong>
            <br />
            Availability, specifications and indicative terms — or clarifying questions.
          </p>,
          <p key="3">
            <strong>3. Samples &amp; contract</strong>
            <br />
            Where appropriate, samples and final terms are agreed before shipment.
          </p>,
        ]}
      />
      <Band icon="document" className="band--leaf">
        &lsquo;Tell us exactly what you need&rsquo;
      </Band>
      <section className="section section--grey" style={{ paddingTop: 90 }}>
        <div className="wrap">
          <Suspense fallback={<div className="wizard-panel">Loading quotation form…</div>}>
            <QuoteWizard />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
