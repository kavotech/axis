import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { RouteMap } from "@/components/RouteMap";
import { Band, CtaPanel, FeatureCard, ProductCard, Reveal, SectionHead } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";
import { INDUSTRIES, PROCESS, SERVICES } from "@/data/content";
import { PRODUCTS, productBySlug } from "@/data/products";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Axis Agro International Ltd — Fresh Produce Importer & Exporter, UK",
  description:
    "UK-based importer, exporter and wholesale supplier of Ugandan fresh produce, green coffee, cocoa, spices and oilseeds — packed, documented and delivered to buyers in the UK and worldwide.",
  path: "/",
  image: "/images/banana-plantation.webp",
});

const MARQUEE: { label: string; icon: IconName }[] = [
  { label: "Hass avocados", icon: "avocado" },
  { label: "MD2 pineapples", icon: "pineapple" },
  { label: "Mangoes", icon: "mango" },
  { label: "Cavendish bananas", icon: "banana" },
  { label: "Passion fruit", icon: "passion" },
  { label: "Robusta & Arabica", icon: "coffee" },
  { label: "Cocoa beans", icon: "cocoa" },
  { label: "Ginger & turmeric", icon: "ginger" },
  { label: "Bird's eye chillies", icon: "chilli" },
  { label: "Sesame", icon: "sesame" },
  { label: "Fresh herbs", icon: "herb" },
];

const TILE_LAYOUT = ["tile--lg", "tile--lg", "", "", "", "tile--lg", "tile--lg"];

export default function HomePage() {
  const fruits = ["hass-avocado", "md2-pineapple", "tommy-atkins-mango", "passion-fruit"].map((s) => productBySlug(s)!);
  const coffee = PRODUCTS.filter((p) => p.group === "coffee");

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Image src="/images/banana-plantation.webp" alt="Sunlit rows of a banana plantation" fill priority sizes="100vw" />
        </div>
        <div className="container hero__content">
          <div className="hero__grid">
            <div className="hero-enter">
              <span className="eyebrow eyebrow--light">UK importer · exporter · wholesaler</span>
              <h1 id="hero-title">
                Premium Produce. <em>Global Connections.</em>
              </h1>
              <p className="hero__lead">
                Connecting exceptional agricultural produce from trusted origins with wholesale buyers, distributors and international markets.
              </p>
              <div className="btn-row">
                <Link href="/products" className="btn btn--gold">
                  Explore Our Products <Icon name="arrow" size={18} />
                </Link>
                <Link href="/get-a-quote" className="btn btn--ghost">
                  Request a Quote
                </Link>
              </div>
            </div>
            <aside className="hero__aside hero-enter" aria-label="Company tagline">
              <strong>{SITE.tagline}</strong>
              {SITE.secondaryTagline}
            </aside>
          </div>
        </div>
        <span className="hero__scroll" aria-hidden="true">
          Scroll
        </span>
      </section>

      {/* ───────── Produce marquee ───────── */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span className="marquee__item" key={i}>
              <Icon name={m.icon} size={28} /> {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* ───────── Introduction ───────── */}
      <section className="section">
        <div className="container split">
          <Reveal className="collage">
            <div className="frame collage__main">
              <Image src="/images/axis-avocado-harvest.webp" alt="Avocado harvest being loaded into field crates in an orchard" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
            <div className="frame collage__inset">
              <Image src="/images/axis-fruit-cartons.webp" alt="Export cartons of fresh fruit stacked for shipment" fill sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
            <div className="collage__badge">
              <strong>UK &amp; Uganda</strong>
              UK-registered trading company with sourcing partners at origin
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Who we are</span>
            <h2>Your direct link for Ugandan produce in the UK market.</h2>
            <p className="lead">
              Axis Agro International Ltd is a UK-based importer, exporter and wholesale supplier of fresh produce and agricultural commodities.
            </p>
            <p className="muted">
              We source through trusted partners in Uganda and across East Africa and work with buyers in the United Kingdom and international markets — agreeing specifications up front, coordinating
              packing, documentation and freight, and keeping you informed until delivery.
            </p>
            <div className="facts facts--2">
              <div className="fact">
                <strong>UK</strong>
                <span>Registered in England &amp; Wales</span>
              </div>
              <div className="fact">
                <strong>Uganda</strong>
                <span>Primary sourcing origin</span>
              </div>
              <div className="fact">
                <strong>Air &amp; sea</strong>
                <span>Freight coordinated per product</span>
              </div>
              <div className="fact">
                <strong>{PRODUCTS.length}+</strong>
                <span>Products across 8 categories</span>
              </div>
            </div>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link href="/about" className="btn btn--outline">
                About Axis Agro
              </Link>
              <Link href="/services" className="link-arrow">
                Our services <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Featured categories ───────── */}
      <section className="section section--cream">
        <div className="container">
          <SectionHead
            eyebrow="Our produce"
            title="From orchard, farm and highland estate."
            lead="Seven product families, sourced through partners at origin and prepared to the specification you set."
            action={
              <Link href="/products" className="btn btn--outline">
                View full catalogue
              </Link>
            }
          />
          <div className="tiles">
            {CATEGORIES.map((c, i) => (
              <Link key={c.slug} href={`/products/${c.slug}`} className={`tile reveal ${TILE_LAYOUT[i] ?? ""}`} style={{ ["--delay" as string]: `${(i % 3) * 0.08}s` }}>
                <Image src={c.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
                <div className="tile__body">
                  <span className="tile__icon">
                    <Icon name={c.icon} size={26} />
                  </span>
                  <h3>{c.name}</h3>
                  <p>{c.summary}</p>
                  <span className="tile__more">
                    Explore <Icon name="arrow" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Band
        icon="sourcing"
        variant="botanical"
        lead="Fresh Ugandan produce — packed, certified where required, and delivered worldwide."
        actions={
          <>
            <Link href="/get-a-quote" className="btn btn--gold">
              Start a quotation
            </Link>
            <Link href="/origins" className="btn btn--ghost">
              Our origins
            </Link>
          </>
        }
      >
        Let&rsquo;s build a dependable supply line, <em>together.</em>
      </Band>

      {/* ───────── Origins ───────── */}
      <section className="section section--forest">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Sourcing origins</span>
            <h2>Rooted in Uganda. Connected to the world.</h2>
            <p className="lead">
              Uganda&rsquo;s equatorial climate, fertile volcanic soils and two rainy seasons support year-round production of fruit, coffee, cocoa and spices.
            </p>
            <p>
              Our sourcing team and partners work with growers, cooperatives and pack-houses in Uganda, with complementary supply from Kenya and Tanzania. Produce moves by air from Entebbe or by
              road to Mombasa for sea freight.
            </p>
            <ul className="chip-list" style={{ margin: "24px 0 32px" }}>
              <li>Uganda — primary origin</li>
              <li>Kenya</li>
              <li>Tanzania</li>
            </ul>
            <Link href="/origins" className="link-arrow">
              Explore our origins <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <RouteMap compact />
          </Reveal>
        </div>
      </section>

      {/* ───────── Fresh fruit showcase ───────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Fresh fruit"
            title="Tropical fruit with a clear specification."
            lead="Count, calibre, maturity and packing are agreed before harvest, then managed through the cold chain to your door."
            action={
              <Link href="/products/fresh-fruits" className="btn btn--outline">
                All fresh fruit
              </Link>
            }
          />
          <div className="product-grid">
            {fruits.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Coffee & commodities ───────── */}
      <section className="section section--sand">
        <div className="container split split--reverse">
          <Reveal className="collage">
            <div className="frame collage__main">
              <Image src="/images/axis-coffee-drying.webp" alt="Coffee being sorted on drying tables" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
            <div className="frame collage__inset">
              <Image src="/images/green-coffee.webp" alt="Green coffee beans" fill sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Coffee &amp; commodities</span>
            <h2>Green coffee, cocoa and oilseeds, bagged for export.</h2>
            <p className="lead">Uganda is Africa&rsquo;s leading Robusta exporter and a growing source of Arabica, cocoa, sesame and spices.</p>
            <dl className="spec" style={{ margin: "28px 0" }}>
              {coffee.map((p) => (
                <div className="spec__row" key={p.slug} style={{ gridTemplateColumns: "1fr auto" }}>
                  <dt style={{ textTransform: "none", letterSpacing: 0, fontSize: "1rem", color: "var(--forest-900)" }}>
                    <Link href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                      {p.name.replace("Uganda ", "")}
                    </Link>
                  </dt>
                  <dd>
                    <Link href={`/get-a-quote?product=${p.slug}`} className="link-arrow">
                      Quote <Icon name="arrow" size={14} />
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="btn-row">
              <Link href="/products/coffee" className="btn">
                Coffee trading
              </Link>
              <Link href="/products/cocoa" className="btn btn--outline">
                Cocoa
              </Link>
              <Link href="/products/oilseeds-nuts" className="btn btn--outline">
                Oilseeds &amp; nuts
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Supply chain ───────── */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="International supply chain" title="Six steps from origin to your warehouse." lead="One point of contact coordinating every stage — so you always know where your consignment stands." />
          <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.title} className="step" delay={(i % 3) * 0.08}>
                <span className="step__num">0{i + 1}</span>
                <span className="icon-badge">
                  <Icon name={s.icon} size={28} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Quality ───────── */}
      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <div className="frame frame--wide">
              <Image src="/images/axis-avocado-boxes.webp" alt="Graded avocados packed in export cartons" fill sizes="(max-width: 900px) 90vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Quality assurance</span>
            <h2>Specifications agreed. Checks before shipment.</h2>
            <p className="lead">Quality starts with a clear, written specification and ends with the right paperwork travelling with your goods.</p>
            <div className="grid grid-2" style={{ margin: "28px 0 32px", gap: 22 }}>
              {(
                [
                  ["scale", "Grading to specification"],
                  ["shield", "Pre-shipment inspection"],
                  ["route", "Traceability to origin"],
                  ["document", "Phytosanitary & origin documents"],
                ] as [IconName, string][]
              ).map(([icon, label]) => (
                <div className="feature feature--row" key={label} style={{ alignItems: "center" }}>
                  <span className="icon-badge" style={{ width: 52, height: 52 }}>
                    <Icon name={icon} size={24} />
                  </span>
                  <strong style={{ color: "var(--forest-900)" }}>{label}</strong>
                </div>
              ))}
            </div>
            <Link href="/quality" className="link-arrow">
              Quality &amp; compliance <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── Services ───────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Import & export services"
            title="Trading support from procurement to delivery."
            action={
              <Link href="/services" className="btn btn--outline">
                All services
              </Link>
            }
          />
          <div className="grid grid-3">
            {SERVICES.slice(0, 6).map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.08}>
                <FeatureCard icon={s.icon} title={s.title} text={s.summary} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Industries ───────── */}
      <section className="section section--forest">
        <div className="container">
          <SectionHead eyebrow="Industries we supply" title="Built around the way trade buyers work." lead="From wholesale market traders to food manufacturers and commodity buyers." />
          <div className="grid grid-4">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.id} delay={(i % 4) * 0.06}>
                <Link href={`/industries#${ind.id}`} className="feature" style={{ textDecoration: "none" }}>
                  <span className="icon-badge icon-badge--dark">
                    <Icon name={ind.icon} size={28} />
                  </span>
                  <h3 style={{ fontSize: "1.25rem" }}>{ind.title}</h3>
                  <p>{ind.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
