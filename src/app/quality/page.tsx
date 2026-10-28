import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Band, CtaBand, PageTop, Reveal } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Quality & Compliance — Inspection, Traceability & Export Documents",
  description:
    "How Axis Agro manages product inspection, traceability, phytosanitary certificates, certificates of origin, packing lists, shipping documents and buyer-specific testing.",
  path: "/quality",
  image: "/images/axis-avocado-boxes.webp",
});

const DOCS: { icon: IconName; title: string; text: string }[] = [
  { icon: "leaf", title: "Phytosanitary certificate", text: "Issued by the exporting country's plant protection organisation for regulated plant products, and coordinated with each shipment." },
  { icon: "globe", title: "Certificate of origin", text: "Arranged through the appropriate issuing body when required for customs or preferential tariff treatment." },
  { icon: "shield", title: "Quality certificate", text: "Inspection against the agreed specification, provided where applicable and agreed in the contract." },
  { icon: "document", title: "Invoice & packing list", text: "A commercial invoice and itemised packing list accompany every consignment." },
  { icon: "ship", title: "Shipping documents", text: "Bills of lading for sea freight and air waybills for air freight, coordinated with forwarders." },
  { icon: "flask", title: "Buyer-specific testing", text: "Laboratory analysis — moisture, aflatoxin, residues or microbiology — and third-party inspection on request." },
];

export default function QualityPage() {
  return (
    <div className="accent-leaf">
      <PageTop
        title="Quality & compliance"
        image="/images/axis-avocado-boxes.webp"
        imageAlt="Graded avocados packed in export cartons"
        under="var(--leaf)"
        crumbs={[{ name: "Quality & compliance", href: "/quality" }]}
        left={<p className="lead">Quality starts with a written specification agreed with you — and is evidenced by inspection, traceability and the right documents travelling with your goods.</p>}
        right={
          <p>
            Produce is graded and inspected at partner facilities before packing and loading. Consignments are linked back to the partner, pack-house or cooperative they came from, and destination-market
            requirements are reviewed for every enquiry.
          </p>
        }
      />

      <Band icon="shield" className="band--leaf">
        &lsquo;Specification first. Evidence before shipment.&rsquo;
      </Band>

      <section className="section section--grey">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Documents &amp; inspections</h2>
            <div className="split split--top" style={{ gap: 30 }}>
              <p className="lead">We coordinate the documents and checks your destination market and your own quality team require.</p>
              <p>
                We only provide scheme certificates that genuinely exist for the specific lot supplied. Where a buyer needs, for example, organic or a retailer standard, we confirm whether certified
                supply is available before quoting.
              </p>
            </div>
            <p className="text-accent" style={{ fontWeight: 800, marginTop: 10 }}>
              Request these documents with your quotation:
            </p>
            <div className="cards">
              {DOCS.map((d, i) => (
                <Reveal key={d.title} delay={(i % 3) * 0.06} className="card">
                  <span className="card__icon">
                    <Icon name={d.icon} strokeWidth={2} />
                  </span>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                  <Link href="/get-a-quote" className="btn btn--sm">
                    Request
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="note" style={{ marginTop: 26 }}>
              <Icon name="info" size={20} />
              <span>Axis Agro International Ltd does not itself claim any third-party certification on this website. Certificates are lot- and producer-specific.</span>
            </div>
          </div>
        </div>
      </section>

      <CtaBand>&lsquo;Have a technical specification? Send it with your request&rsquo;</CtaBand>
    </div>
  );
}
