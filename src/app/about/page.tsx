import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { Band, PageTop, Reveal } from "@/components/ui";
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

const JOURNEY: { year: string; label: string; icon: IconName }[] = [
  { year: SITE.founded, label: "Axis Agro International founded in the United Kingdom", icon: "pin" },
  { year: "Origin", label: "Sourcing operations established with partners in Uganda", icon: "sourcing" },
  { year: "UK", label: "Wholesale supply to buyers across the United Kingdom", icon: "warehouse" },
  { year: "Global", label: "Exports to international buyers and new product lines", icon: "globe" },
];

export default function AboutPage() {
  return (
    <div className="accent-orange">
      <PageTop
        title="About Axis Agro"
        image="/images/axis-mango-crates.webp"
        imageAlt="Mangoes in crates ready for packing"
        crumbs={[{ name: "About us", href: "/about" }]}
        left={
          <>
            <p className="lead">
              {SITE.legalName} is registered in England &amp; Wales. We import, export and supply fresh produce and agricultural commodities wholesale, with a sourcing team and trusted partners in Uganda
              and East Africa.
            </p>
            <Link href="/contact" className="btn">
              Meet the directors
            </Link>
          </>
        }
        right={
          <p>
            We source coffee, fresh fruit, vegetables, spices, oilseeds and value-added products and supply wholesale buyers in the United Kingdom and international markets. From our UK base we manage
            buyer relationships, specifications, documentation and logistics coordination — so every consignment has one accountable partner from origin to delivery.
          </p>
        }
      />

      {/* Group / partners block */}
      <section className="section section--grey notch-bottom" style={{ ["--notch-color" as string]: "var(--grey-2)" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="icon-badge icon-badge--lg" style={{ background: "#fff", margin: "0 auto 14px" }}>
              <Icon name="handshake" size={60} strokeWidth={2} />
            </span>
            <h2 className="h-lg">Our sourcing network</h2>
            <p className="center-text">
              We work with established trade partners in Uganda alongside growers, cooperatives and pack-houses. Partners support sourcing, aggregation, grading and export preparation, so quality is
              checked at source before goods leave the region.
            </p>
            <Link href="/origins" className="btn btn--gold" style={{ marginTop: 10 }}>
              More about our origins
            </Link>
          </Reveal>
          <div className="circles__grid circles__grid--5" style={{ marginTop: 60 }}>
            {[
              { name: SITE.sourcingPartners[0].name, role: "Sourcing partner", where: "Uganda", icon: "sourcing" as IconName, href: SITE.sourcingPartners[0].url },
              { name: SITE.sourcingPartners[1].name, role: "Sourcing partner", where: "Uganda", icon: "leaf" as IconName, href: SITE.sourcingPartners[1].url },
              { name: "Axis Agro International", role: "Trading & sales", where: "United Kingdom", icon: "globe" as IconName, href: "/about" },
              { name: "Freight partners", role: "Air & sea logistics", where: "Entebbe · Mombasa", icon: "ship" as IconName, href: "/services" },
              { name: "Growers & pack-houses", role: "Production", where: "Uganda · Kenya · Tanzania", icon: "avocado" as IconName, href: "/origins" },
            ].map((o, i) => (
              <Reveal key={o.name} delay={i * 0.06}>
                <div className="circle-item">
                  <span className="circle-item__img" style={{ background: "#fff", border: `6px solid ${i === 2 ? "var(--forest)" : i % 2 ? "var(--lime)" : "var(--gold)"}` }}>
                    <Icon name={o.icon} strokeWidth={2} />
                  </span>
                  <h3 style={{ fontSize: 18 }}>{o.role}</h3>
                  <p style={{ fontWeight: 400, fontSize: 14 }}>
                    {o.name}
                    <br />
                    <span className="muted">{o.where}</span>
                  </p>
                  <a href={o.href} className="btn btn--sm" style={{ marginTop: 12 }} {...(o.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {o.href.startsWith("http") ? "Visit website" : "Read more"}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <div className="wrap">
          <div className="journey__track" style={{ ["--n" as string]: JOURNEY.length }}>
            {JOURNEY.map((j, i) => (
              <Reveal key={j.year} className="journey__step" delay={i * 0.08}>
                <span className="journey__dot">
                  <Icon name={j.icon} strokeWidth={2.4} />
                </span>
                <div className="journey__year">{j.year}</div>
                <p className="journey__label">{j.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Band icon="handshake" className="band--gold">
        &lsquo;Partnerships that last beyond a single shipment&rsquo;
      </Band>

      {/* Why */}
      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2 className="h-lg">Why we do what we do</h2>
            <p className="lead">We exist to give UK and international buyers a reliable, well-documented supply of quality produce — sourced responsibly from East Africa.</p>
            <p>
              Our mission is to create positive economic impact for the farming communities we work with while giving buyers dependable supply. Our vision is to be a trusted name in UK agricultural trade,
              recognised for integrity, product quality and the strength of our partnerships — from the farms of Uganda to wholesale markets around the world.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="split__quote" style={{ color: "var(--gold)" }}>&lsquo;{SITE.tagline}&rsquo;</p>
          </Reveal>
        </div>
      </section>

      {/* How — values */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <h2 className="h-lg">How we work</h2>
          <div className="circles__grid" style={{ marginTop: 40 }}>
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="circle-item circle-item--value">
                  <span className="circle-item__img">
                    <Icon name={v.icon} strokeWidth={2} />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Image strip band */}
      <section className="band band--lime" style={{ paddingBottom: 50 }}>
        <span className="band__icon">
          <Icon name="leaf" strokeWidth={2.4} />
        </span>
        <h2>&lsquo;From Ugandan farms to markets worldwide&rsquo;</h2>
        <p className="band__sub">Fresh produce, coffee and commodities, prepared for export</p>
      </section>
      <div className="strip">
        <Image src="/images/uganda-hills.webp" alt="Aerial view of green hills and farmland in East Africa" fill sizes="100vw" />
      </div>

      {/* Work with us */}
      <section className="section" style={{ padding: "110px 0 40px", textAlign: "center" }}>
        <h2 className="h-lg">&lsquo;Want to work with us?&rsquo;</h2>
      </section>
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="wrap wrap--narrow" style={{ position: "relative" }}>
          <div className="page-box page-box--marker" style={{ gridTemplateColumns: "1fr", padding: "0 0 0 60px" }}>
            <h2 className="h-lg" style={{ margin: 0, paddingTop: 2 }}>
              Working with Axis Agro
            </h2>
            <div>
              <p>
                We welcome enquiries from importers, wholesalers, retailers, processors and foodservice buyers — and from producers and processors in East Africa interested in supplying international
                markets.
              </p>
              <p>
                Would you like to know more? Email <a href={`mailto:${SITE.email}`} className="text-accent">{SITE.email}</a> or call{" "}
                <a href={`tel:${SITE.phoneHref}`} className="text-accent">{SITE.phone}</a>.
              </p>
              <div className="btn-row" style={{ marginTop: 20 }}>
                <Link href="/get-a-quote" className="btn btn--sm">
                  Request a quote
                </Link>
                <Link href="/contact" className="btn btn--sm">
                  Supplier enquiries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
