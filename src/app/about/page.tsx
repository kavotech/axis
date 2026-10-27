import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Band, CtaPanel, FeatureCard, PageHero, Reveal, SectionHead } from "@/components/ui";
import { VALUES } from "@/data/content";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — UK Fresh Produce Importer & Agricultural Trading Partner",
  description:
    "Axis Agro International Ltd is a UK-registered importer, exporter and wholesale supplier connecting produce from trusted Ugandan and East African origins with buyers in the UK and international markets.",
  path: "/about",
  image: "/images/axis-avocado-harvest.webp",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Axis Agro"
        title="A British trading company with roots at origin."
        intro="We connect agricultural produce from trusted Ugandan and East African sources with wholesale buyers, distributors and importers in the UK and around the world."
        image="/images/axis-avocado-harvest.webp"
        imageAlt="Avocado harvest in an orchard being loaded into crates"
        crumbs={[{ name: "About us", href: "/about" }]}
      />

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Company overview</span>
            <h2>Bridging exceptional produce and demanding markets.</h2>
            <p className="lead">
              {SITE.legalName} is registered in England &amp; Wales and specialises in the import, export and wholesale supply of fresh produce and agricultural commodities.
            </p>
            <p className="muted">
              We source coffee, fresh fruit, vegetables, spices, oilseeds and value-added products through trusted partners in Uganda and East Africa. From our UK base we manage buyer relationships,
              specifications, documentation and logistics coordination — supplying wholesale customers in the United Kingdom and exporting to international buyers.
            </p>
            <p className="muted">
              Our approach is straightforward: agree the specification in writing, source from partners we know, check before shipping, and communicate clearly until the consignment is delivered.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="collage">
            <div className="frame collage__main">
              <Image src="/images/axis-pineapple-plant.webp" alt="Pineapple growing on the plant" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
            <div className="frame collage__inset">
              <Image src="/images/axis-mango-cartons.webp" alt="Mangoes packed in export cartons" fill sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
            <div className="collage__badge">
              <strong>Since {SITE.founded}</strong>
              Trading agricultural produce between East Africa and the UK
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--forest">
        <div className="container grid grid-2" style={{ gap: "clamp(32px, 6vw, 96px)" }}>
          <Reveal>
            <span className="icon-badge icon-badge--dark icon-badge--lg" style={{ marginBottom: 24 }}>
              <Icon name="sourcing" size={44} />
            </span>
            <span className="eyebrow">Our mission</span>
            <h2>Reliable, high-quality supply — sourced responsibly.</h2>
            <p className="lead">
              To provide UK and international businesses with dependable supply of quality agricultural produce, sourced ethically from East Africa, while creating positive economic impact for the
              farming communities we work with.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="icon-badge icon-badge--dark icon-badge--lg" style={{ marginBottom: 24 }}>
              <Icon name="globe" size={44} />
            </span>
            <span className="eyebrow">Our vision</span>
            <h2>A trusted name in UK agricultural trade.</h2>
            <p className="lead">
              To be recognised for integrity, product quality and the strength of our partnerships — from the farms of Uganda to wholesale markets around the world.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="What guides us" title="Our values" />
          <div className="grid grid-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <FeatureCard icon={v.icon} title={v.title} text={v.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Band icon="handshake" variant="botanical">
        Partnerships that last <em>beyond a single shipment.</em>
      </Band>

      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <div className="frame frame--wide">
              <Image src="/images/axis-fruit-cartons-stack.webp" alt="Cartons of fresh produce stacked for distribution" fill sizes="(max-width: 900px) 90vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">UK operations</span>
            <h2>Managed from the United Kingdom.</h2>
            <p className="lead">Our UK operation is the single point of contact for buyers.</p>
            <ul className="prose" style={{ paddingLeft: "1.1em" }}>
              <li>Buyer relationships, enquiries and specifications</li>
              <li>Commercial terms, contracts and Incoterms</li>
              <li>Import documentation and customs coordination with logistics partners</li>
              <li>Shipment tracking and communication through to delivery</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split split--reverse">
          <Reveal>
            <div className="frame frame--wide">
              <Image src="/images/axis-coffee-drying.webp" alt="Workers sorting coffee on raised drying tables" fill sizes="(max-width: 900px) 90vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Sourcing relationships</span>
            <h2>Working with partners at origin.</h2>
            <p className="lead">We work with established trade partners in Uganda, alongside growers, cooperatives and pack-houses.</p>
            <ul className="chip-list" style={{ margin: "8px 0 24px" }}>
              {SITE.sourcingPartners.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
            <p className="muted">Partners support sourcing, aggregation, grading and export preparation, so that quality is checked at source before goods leave the region.</p>
            <Link href="/origins" className="link-arrow">
              Our origins <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <SectionHead eyebrow="Capabilities" title="International trading, end to end." />
          <div className="grid grid-3">
            <Reveal>
              <FeatureCard icon="globe" title="International trading" text="Supply to UK wholesale buyers and export to importers in Europe, the Middle East and other markets." />
            </Reveal>
            <Reveal delay={0.08}>
              <FeatureCard icon="shield" title="Quality commitment" text="Specifications agreed in writing, checks at origin and inspection or laboratory testing arranged on request." />
            </Reveal>
            <Reveal delay={0.16}>
              <FeatureCard icon="calendar" title="Reliable supply" text="Programme planning with partners to match buyer schedules, and clear communication when conditions change." />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Leadership" title="The directors" />
          <div className="grid grid-2">
            {SITE.directors.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <div className="feature-card feature feature--row">
                  <span className="icon-badge icon-badge--gold icon-badge--lg" aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem" }}>
                    {d.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <h3>{d.name}</h3>
                    <p className="product-card__meta" style={{ marginBottom: 10 }}>
                      {d.role}
                    </p>
                    <p>{d.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel title="Interested in partnering with Axis Agro?" text="Whether you need a reliable supply line or want to explore export opportunities, we welcome the conversation." />
    </>
  );
}
