import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";
import { Band, CtaPanel, FeatureCard, PageHero, Reveal, SectionHead } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality & Compliance — Inspection, Traceability & Export Documents",
  description:
    "How Axis Agro manages product inspection, traceability, phytosanitary certificates, certificates of origin, packing lists, shipping documents and buyer-specific testing.",
  path: "/quality",
  image: "/images/axis-avocado-boxes.webp",
});

const PILLARS: { icon: IconName; title: string; text: string }[] = [
  { icon: "scale", title: "Product inspection", text: "Grading and visual inspection against the agreed specification at partner facilities before packing and loading." },
  { icon: "route", title: "Traceability", text: "Consignments are linked back to the partner, pack-house or cooperative they came from, so origin information is available to buyers." },
  { icon: "leaf", title: "Phytosanitary documentation", text: "Phytosanitary certificates for regulated plant products are issued by the exporting country's plant protection organisation and coordinated with each shipment." },
  { icon: "shield", title: "Quality certificates", text: "Quality or inspection certificates are provided where applicable and where agreed in the contract." },
  { icon: "globe", title: "Certificates of Origin", text: "Arranged through the appropriate issuing body when required for customs or preferential tariff treatment." },
  { icon: "document", title: "Packing lists & invoices", text: "Itemised packing lists and commercial invoices accompany every consignment." },
  { icon: "ship", title: "Shipping documentation", text: "Bills of lading for sea freight and air waybills for air freight, coordinated with freight forwarders." },
  { icon: "flask", title: "Buyer-specific testing", text: "Laboratory analysis (e.g. moisture, aflatoxin, pesticide residues, microbiology) and third-party inspection arranged on request." },
  { icon: "pin", title: "Destination market requirements", text: "Requirements are reviewed for each destination; buyers remain responsible for confirming current import rules in their market." },
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & compliance"
        title="Quality you can check. Paperwork you can rely on."
        intro="Quality is defined by the specification you agree with us — and evidenced by inspection, traceability and the right documents travelling with your goods."
        image="/images/axis-avocado-boxes.webp"
        imageAlt="Graded avocados packed into export cartons"
        crumbs={[{ name: "Quality & compliance", href: "/quality" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="Nine areas we manage on every enquiry" />
          <div className="grid grid-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 0.06}>
                <FeatureCard icon={p.icon} title={p.title} text={p.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Band icon="shield">
        Specification first. <em>Evidence before shipment.</em>
      </Band>

      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Certifications</span>
            <h2>What we will — and will not — claim.</h2>
            <p className="lead">We only provide scheme certificates that genuinely exist for the specific lot being supplied.</p>
            <p className="muted">
              Some producers and pack-houses we work with may hold food-safety or sustainability certifications. Where a buyer requires a specific scheme — for example organic or a retailer standard —
              we confirm whether certified supply is available before quoting, and the certificate is provided by the certified producer or processor.
            </p>
            <div className="note" style={{ marginTop: 24 }}>
              <Icon name="info" size={20} />
              <span>Axis Agro International Ltd does not itself claim any third-party certification on this website. Certificates are always lot- and producer-specific.</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="frame">
              <Image src="/images/axis-seed-sack.webp" alt="Inspecting a sample of produce from an open sack" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaPanel title="Have a technical specification?" text="Upload your product specification or procurement requirements with your quotation request and we will review it against available supply." />
    </>
  );
}
