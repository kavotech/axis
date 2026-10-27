import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Band, CtaPanel, FeatureCard, PageHero, Reveal, SectionHead } from "@/components/ui";
import { PROCESS, SERVICES } from "@/data/content";
import { CONTAINERS, INCOTERMS } from "@/data/quote-options";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Import & Export Services — Procurement, Freight & Documentation",
  description:
    "UK importing, global procurement, wholesale supply, sea freight, air cargo, re-export coordination, containerised trading and logistics documentation from Axis Agro International.",
  path: "/services",
  image: "/images/port.webp",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Import & export services"
        title="From procurement at origin to delivery at destination."
        intro="We coordinate sourcing, packing, documentation and freight so that buyers have one accountable partner for every consignment."
        image="/images/port.webp"
        imageAlt="Container ship docked beneath gantry cranes"
        crumbs={[{ name: "Services", href: "/services" }]}
      >
        <div className="btn-row">
          <Link href="/get-a-quote" className="btn btn--gold">
            Request a Quote <Icon name="arrow" size={18} />
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Trade services" lead="Each service can be used on its own or combined into a complete supply programme." />
          <div className="grid grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06}>
                <div id={s.id} style={{ height: "100%" }}>
                  <FeatureCard icon={s.icon} title={s.title} text={s.summary} points={s.points} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container">
          <SectionHead eyebrow="How a shipment comes together" title="Our process" />
          <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.title} className="step" delay={(i % 3) * 0.08}>
                <span className="step__num">0{i + 1}</span>
                <span className="icon-badge icon-badge--dark">
                  <Icon name={s.icon} size={28} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Freight options</span>
            <h2>Air, sea, road or multimodal.</h2>
            <p className="lead">The right mode depends on the product&rsquo;s shelf life, value, volume and your timeline.</p>
            <div className="grid grid-2" style={{ gap: 18, marginTop: 24 }}>
              <div className="feature">
                <span className="icon-badge">
                  <Icon name="plane" size={28} />
                </span>
                <h3>Air cargo</h3>
                <p>Days in transit for perishable and high-value lines. Air waybill and cool-chain coordination.</p>
              </div>
              <div className="feature">
                <span className="icon-badge">
                  <Icon name="ship" size={28} />
                </span>
                <h3>Sea freight</h3>
                <p>FCL and LCL, dry and reefer. Lower cost per kilogram for durable produce and commodities.</p>
              </div>
            </div>
            <h3 style={{ marginTop: 36 }}>Container types</h3>
            <ul className="chip-list">
              {CONTAINERS.map((c) => (
                <li key={c.id}>{c.label}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="collage">
            <div className="frame collage__main">
              <Image src="/images/axis-export-bags.webp" alt="Export bags of produce ready for loading" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
            <div className="frame collage__inset">
              <Image src="/images/plane-1.webp" alt="Aircraft being loaded at an airport stand" fill sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <Band icon="container" variant="botanical">
        One partner. <em>Every document, every milestone.</em>
      </Band>

      <section className="section section--cream">
        <div className="container">
          <SectionHead eyebrow="Commercial terms" title="Supported Incoterms® 2020 rules" lead="We quote on the Incoterm that suits your operation. Final terms are confirmed in the contract." />
          <dl className="grid grid-2" style={{ gap: "0 40px", borderTop: "1px solid var(--line)", margin: 0 }}>
            {INCOTERMS.map((t) => (
              <div key={t.code} className="spec__row" style={{ gridTemplateColumns: "80px 1fr" }}>
                <dt style={{ fontSize: "1.1rem", letterSpacing: "0.06em", color: "var(--forest-900)" }}>{t.code}</dt>
                <dd>
                  <strong>{t.name}</strong>
                  <br />
                  <span className="muted" style={{ fontSize: "0.93rem" }}>
                    {t.help}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaPanel image="/images/ship-2.webp" />
    </>
  );
}
