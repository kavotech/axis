import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/data/categories";
import { productsInGroups } from "@/data/products";
import { Icon } from "./Icon";
import { Band, CtaPanel, FeatureCard, JsonLd, PageHero, ProductCard, Reveal, SectionHead, quoteHref } from "./ui";
import { SITE } from "@/data/site";

const COFFEE_SCREENS = [
  { screen: 18, mm: "7.14", label: "Screen 18", use: "Espresso & premium commercial blends", slug: "robusta-screen-18" },
  { screen: 15, mm: "5.95", label: "Screen 15", use: "Commercial roasting & blending", slug: "robusta-screen-15" },
  { screen: 12, mm: "4.76", label: "Screen 12", use: "Soluble & value blends", slug: "robusta-screen-12" },
];

function CoffeeExtras() {
  return (
    <>
      <section className="section section--forest">
        <div className="container">
          <SectionHead
            eyebrow="Robusta, sized"
            title="What the screen number means."
            lead="A screen number is the size of the sieve hole in 64ths of an inch. Beans retained on a larger screen are bigger and more uniform. Circles below are drawn to relative scale."
          />
          <div className="grid grid-3">
            {COFFEE_SCREENS.map((c, i) => (
              <Reveal key={c.screen} delay={i * 0.08}>
                <Link href={`/products/${c.slug}`} className="feature-card feature" style={{ textDecoration: "none", alignItems: "flex-start" }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r={(c.screen / 18) * 56} fill="rgb(216 189 131 / 0.14)" stroke="#d8bd83" strokeWidth="1.5" />
                    <text x="60" y="68" textAnchor="middle" fill="#fff" fontSize="26" fontFamily="var(--font-fraunces), serif">
                      {c.screen}
                    </text>
                  </svg>
                  <h3>{c.label}</h3>
                  <p>
                    ≈ {c.mm} mm · {c.use}
                  </p>
                  <span className="link-arrow">
                    View grade <Icon name="arrow" size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Green coffee sourcing</span>
            <h2>Quality requirements, written into the contract.</h2>
            <p className="lead">We work from your specification, not a generic grade sheet.</p>
            <dl className="spec" style={{ marginTop: 28 }}>
              <div className="spec__row">
                <dt>Grades</dt>
                <dd>Robusta Screen 18, 15, 12 · Arabica AA, AB, and other grades on request (e.g. A, PB, Drugar)</dd>
              </div>
              <div className="spec__row">
                <dt>Moisture</dt>
                <dd>Typically ≤ 12.5%, or as specified</dd>
              </div>
              <div className="spec__row">
                <dt>Defects</dt>
                <dd>Defect count, black/broken beans and foreign matter per contract</dd>
              </div>
              <div className="spec__row">
                <dt>Samples</dt>
                <dd>Pre-shipment and type samples arranged on request</dd>
              </div>
              <div className="spec__row">
                <dt>Packaging</dt>
                <dd>60kg jute bags; hermetic liners or bulk container liners on request</dd>
              </div>
              <div className="spec__row">
                <dt>Shipping</dt>
                <dd>FCL sea freight via Mombasa; LCL and sample shipments by arrangement</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="collage">
            <div className="frame collage__main">
              <Image src="/images/axis-sacks-warehouse.webp" alt="Bagged commodity stacked in a warehouse ready for export" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
            <div className="frame collage__inset">
              <Image src="/images/coffee-sack.webp" alt="Coffee beans in a hessian sack" fill sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
            <div className="collage__badge">
              <strong>Buyer-specific</strong>
              Grades and preparation agreed per contract
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function CocoaExtras() {
  return (
    <section className="section">
      <div className="container split">
        <Reveal>
          <span className="eyebrow">Grading &amp; specification</span>
          <h2>Cocoa prepared to an agreed standard.</h2>
          <p className="lead">Typical parameters buyers specify — final values are always set in the contract.</p>
          <dl className="spec" style={{ marginTop: 28 }}>
            <div className="spec__row">
              <dt>Moisture</dt>
              <dd>Commonly ≤ 7.5%</dd>
            </div>
            <div className="spec__row">
              <dt>Bean count</dt>
              <dd>Beans per 100g agreed (e.g. ≤ 100)</dd>
            </div>
            <div className="spec__row">
              <dt>Cut test</dt>
              <dd>Limits for slaty, mouldy, insect-damaged and germinated beans</dd>
            </div>
            <div className="spec__row">
              <dt>Foreign matter</dt>
              <dd>Maximum percentage agreed</dd>
            </div>
            <div className="spec__row">
              <dt>Packing</dt>
              <dd>Jute or sisal bags; liners on request</dd>
            </div>
            <div className="spec__row">
              <dt>Testing</dt>
              <dd>Third-party inspection and laboratory analysis on request</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="frame">
            <Image src="/images/cocoa-crate.webp" alt="Harvested cocoa pods of varied colours in a crate" fill sizes="(max-width: 900px) 90vw, 45vw" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CategoryView({ category }: { category: Category }) {
  const products = productsInGroups(category.groups);
  const firstProduct = products[0]?.slug;
  return (
    <>
      <PageHero
        title={category.title}
        intro={category.intro}
        image={category.image}
        imageAlt={category.imageAlt}
        eyebrow={category.eyebrow}
        crumbs={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
      >
        <div className="btn-row">
          <Link href={quoteHref(firstProduct)} className="btn btn--gold">
            Request a Quote <Icon name="arrow" size={18} />
          </Link>
          <a href="#range" className="btn btn--ghost">
            View the range
          </a>
        </div>
      </PageHero>

      <section className="section section--cream section--tight">
        <div className="container grid grid-3">
          {category.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <FeatureCard icon={h.icon} title={h.title} text={h.text} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="range">
        <div className="container">
          <SectionHead eyebrow={category.name} title={`The ${category.name.toLowerCase()} range`} lead="Select a product for specifications, packaging and logistics, or request a quote directly." />
          <div className="product-grid">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {category.slug === "coffee" ? <CoffeeExtras /> : null}
      {category.slug === "cocoa" ? <CocoaExtras /> : null}

      <Band icon={category.icon} variant="botanical">
        {category.slug === "coffee" ? (
          <>
            Uganda green coffee, <em>prepared to your grade.</em>
          </>
        ) : (
          <>
            Specification first. <em>Then we source.</em>
          </>
        )}
      </Band>

      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Logistics</span>
            <h2>Handling &amp; shipping considerations</h2>
            <ul className="prose" style={{ paddingLeft: "1.1em" }}>
              {category.logistics.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <div className="note" style={{ marginTop: 24 }}>
              <Icon name="info" size={20} />
              <span>Specifications, volumes, seasonal availability and documentation are confirmed in writing for every enquiry.</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="frame frame--wide">
              <Image src={category.slug === "coffee" || category.slug === "cocoa" || category.slug === "oilseeds-nuts" ? "/images/ship-1.webp" : "/images/axis-fruit-cartons-stack.webp"} alt="" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaPanel product={firstProduct} title={`Request a ${category.name.toLowerCase()} quotation.`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seoDescription,
          url: `${SITE.url}/products/${category.slug}`,
          hasPart: products.map((p) => ({ "@type": "Product", name: p.name, url: `${SITE.url}/products/${p.slug}` })),
        }}
      />
    </>
  );
}
