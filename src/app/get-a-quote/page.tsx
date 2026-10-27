import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { PageHero } from "@/components/ui";
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
    <>
      <PageHero
        eyebrow="Request a quotation"
        title="Tell us exactly what you need."
        intro="Configure one or several products with grades, volumes, packaging, shipping terms and documentation. Our trading team replies in writing — pricing and availability are always confirmed individually."
        image="/images/axis-export-bags.webp"
        imageAlt="Bags of produce prepared for export"
        crumbs={[{ name: "Get a quote", href: "/get-a-quote" }]}
        variant="short"
      />
      <section className="section section--cream" style={{ paddingTop: "clamp(40px, 6vw, 72px)" }}>
        <div className="container">
          <div className="grid grid-3" style={{ marginBottom: 40, gap: 20 }}>
            {[
              { icon: "document" as const, t: "1. We review", d: "Your requirements are checked against confirmed supply and seasonality." },
              { icon: "mail" as const, t: "2. We respond in writing", d: "Availability, specifications and indicative terms — or clarifying questions." },
              { icon: "handshake" as const, t: "3. Samples & contract", d: "Where appropriate, samples and final terms are agreed before shipment." },
            ].map((s) => (
              <div key={s.t} className="feature feature--row">
                <span className="icon-badge" style={{ width: 52, height: 52, background: "var(--white)" }}>
                  <Icon name={s.icon} size={24} />
                </span>
                <div>
                  <h3 style={{ fontSize: "1.15rem", margin: "4px 0" }}>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Suspense fallback={<div className="wizard-panel">Loading quotation form…</div>}>
            <QuoteWizard />
          </Suspense>
        </div>
      </section>
    </>
  );
}
