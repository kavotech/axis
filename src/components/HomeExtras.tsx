import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PROCESS } from "@/data/content";
import { productBySlug } from "@/data/products";
import { Icon } from "./Icon";
import { LeadershipRow } from "./LeaderViews";
import { Band, CtaBand, CutoutGrid, Faq, Reveal } from "./ui";

const FEATURED = ["hass-avocado", "md2-pineapple", "passion-fruit", "lady-finger-banana", "kent-mango", "fresh-turmeric", "matooke", "vanilla"];
const COMMODITIES = ["robusta-screen-18", "robusta-screen-15", "bugisu-arabica", "cocoa-beans", "sesame-seeds", "groundnuts", "maize", "macadamia"];

export function HomeExtras() {
  const featured = FEATURED.map(productBySlug).filter((p): p is NonNullable<typeof p> => !!p);
  const commodities = COMMODITIES.map(productBySlug).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <>
      {/* Explore our product categories */}
      <section className="product-range" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <h2 className="section-title section-title--center">Explore our product categories</h2>
          <p className="center-text" style={{ marginBottom: 46 }}>
            Ten product families sourced through partners in Uganda and East Africa.
          </p>
          <div className="product-range__grid cat-grid">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 5) * 0.05}>
                <Link href={`/products/${c.slug}`} className="cutout">
                  <span className="cutout__img">
                    <Image src={c.image} alt={c.imageAlt} width={300} height={300} sizes="150px" />
                  </span>
                  <h3>{c.shortName}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Uganda */}
      <Band icon="pin" className="band--leaf" notch="both">
        &lsquo;Uganda: our sourcing origin&rsquo;
      </Band>
      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2 className="h-lg">Rooted in Uganda</h2>
            <p className="lead">Fertile soils, abundant rain and two growing seasons a year in much of the country.</p>
            <p>
              From the Lake Victoria basin to the slopes of Mount Elgon and the Rwenzori Mountains, Uganda grows coffee, cocoa, tropical fruit, spices, oilseeds and staples. Our Uganda operations team
              works with partners and growers to match that supply to buyers&rsquo; specifications.
            </p>
            <div className="btn-row">
              <Link href="/sourcing/uganda" className="btn">
                Sourcing in Uganda
              </Link>
              <Link href="/origins" className="btn btn--outline">
                Our origins
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="split__img">
              <Image src="/images/uganda-green.webp" alt="Green hills and farmland in Uganda" width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured seasonal produce */}
      <section className="product-range section--grey" style={{ padding: "90px 0" }}>
        <div className="wrap">
          <h2 className="section-title section-title--center">Featured seasonal produce</h2>
          <p className="center-text" style={{ marginBottom: 40 }}>
            Popular lines from our range. Harvest windows vary — see our <Link href="/resources/seasonality" className="text-accent">seasonality guide</Link> and confirm timing with us.
          </p>
          <CutoutGrid products={featured} />
        </div>
      </section>

      {/* Coffee & commodities */}
      <section className="section accent-earth">
        <div className="wrap split">
          <Reveal>
            <div className="split__img">
              <Image src="/images/axis-coffee-drying.webp" alt="Coffee being sorted on drying tables" width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-lg">Coffee &amp; agricultural commodities</h2>
            <p className="lead">Uganda is Africa&rsquo;s leading Robusta exporter and a source of washed and natural Arabica, cocoa, sesame and grains.</p>
            <p>Container-scale supply for roasters, processors and traders — specification, sampling and documentation coordinated through partner exporters.</p>
            <div className="btn-row">
              <Link href="/products/coffee" className="btn">
                Green coffee
              </Link>
              <Link href="/buyers/commodity-trading" className="btn btn--outline">
                Commodity trading
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="wrap" style={{ marginTop: 60 }}>
          <CutoutGrid products={commodities} />
        </div>
      </section>

      {/* Farm to market */}
      <Band icon="route" className="band--home" notch="both">
        &lsquo;From farm to international market&rsquo;
      </Band>
      <section className="section">
        <div className="wrap icon-boxes">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <div className="icon-box">
                <span className="icon-box__icon" style={{ background: "var(--grey-2)" }}>
                  <Icon name={p.icon} strokeWidth={2} />
                </span>
                <h3>
                  0{i + 1}. {p.title}
                </h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quality process */}
      <section className="section section--accent accent-leaf">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Our quality process</h2>
            <div className="cards">
              {[
                { icon: "document" as const, t: "Specification", d: "Grade, size, maturity, packing and documents agreed in writing.", href: "/quality/grading" },
                { icon: "shield" as const, t: "Inspection", d: "Checks at partner facilities before packing and loading.", href: "/quality/inspection" },
                { icon: "route" as const, t: "Traceability", d: "Consignments linked to partners, pack-houses and lots.", href: "/sourcing/traceability" },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <span className="card__icon">
                    <Icon name={c.icon} strokeWidth={2} />
                  </span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <Link href={c.href} className="btn btn--sm">
                    Learn more
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Air & sea */}
      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <div className="split__img">
              <Image src="/images/aircraft-loading.webp" alt="Cargo being loaded onto an aircraft" width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
            <h2 className="h-lg" style={{ marginTop: 26 }}>
              Air freight
            </h2>
            <p>Fast transit from Entebbe for fresh fruit, vegetables, herbs and specialty produce, with cool-chain coordination from pack-house to airport.</p>
            <Link href="/logistics/air-freight" className="read-more">
              Air freight
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="split__img">
              <Image src="/images/container-port.webp" alt="Container port with cranes" width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
            <h2 className="h-lg" style={{ marginTop: 26 }}>
              Sea freight
            </h2>
            <p>FCL and LCL via Mombasa in dry or reefer containers for coffee, cocoa, oilseeds, grains and durable fresh produce.</p>
            <Link href="/logistics/sea-freight" className="read-more">
              Sea freight
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Wholesale */}
      <Band icon="pallet" className="band--gold" notch="both" sub="By the carton, the pallet or the container — on one-off or recurring programmes" action={<Link href="/buyers/wholesale-supply" className="btn btn--on-dark">Wholesale supply</Link>}>
        &lsquo;International wholesale supply&rsquo;
      </Band>

      {/* Leadership */}
      <section className="section">
        <div className="wrap">
          <h2 className="section-title">Meet our leadership</h2>
          <p className="lead" style={{ marginBottom: 40 }}>
            Commercial operations in the UK, sourcing on the ground in Uganda.
          </p>
          <LeadershipRow />
        </div>
      </section>

      {/* Why work with us */}
      <section className="section section--grey">
        <div className="wrap">
          <h2 className="section-title section-title--center">Why work with Axis Agro</h2>
          <div className="icon-boxes" style={{ marginTop: 40 }}>
            {[
              { icon: "pin" as const, t: "UK point of contact", d: "Commercial terms and communication handled from the United Kingdom." },
              { icon: "sourcing" as const, t: "Knowledge at origin", d: "Sourcing led on the ground in Uganda." },
              { icon: "check" as const, t: "Honest availability", d: "Core range and sourcing enquiries clearly marked." },
            ].map((b) => (
              <div className="icon-box" key={b.t}>
                <span className="icon-box__icon">
                  <Icon name={b.icon} strokeWidth={2} />
                </span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link href="/company/why-axis-agro" className="btn">
              Why Axis Agro
            </Link>
          </div>
        </div>
      </section>

      {/* Packaging & specifications */}
      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="h-lg">Product packaging &amp; specifications</h2>
            <p className="lead">Every quotation states the grade, packing and documents agreed.</p>
            <Link href="/resources/product-specifications" className="btn">
              Specification guide
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="spec">
              <div className="spec__row">
                <dt>Fresh fruit</dt>
                <dd>4–10kg cartons, palletised; size or count band; maturity stage</dd>
              </div>
              <div className="spec__row">
                <dt>Green coffee</dt>
                <dd>60kg jute bags; Screen 18 / 15 / 12, AA, AB; moisture ≤ 12.5% typical</dd>
              </div>
              <div className="spec__row">
                <dt>Cocoa</dt>
                <dd>Jute or sisal bags; bean count, moisture and cut test to contract</dd>
              </div>
              <div className="spec__row">
                <dt>Oilseeds &amp; grains</dt>
                <dd>25–50kg PP bags or bulk; purity, moisture and aflatoxin as specified</dd>
              </div>
              <div className="spec__row">
                <dt>Dried products</dt>
                <dd>Lined cartons or bulk bags; moisture and additives agreed</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Buyer enquiry process */}
      <section className="section section--accent accent-forest">
        <div className="wrap">
          <h2 className="section-title section-title--center">Buyer enquiry process</h2>
          <div className="icon-boxes" style={{ marginTop: 40 }}>
            {[
              { icon: "document" as const, t: "1. Send your requirements", d: "Use the quotation form — product, volume, packaging, freight and documents." },
              { icon: "mail" as const, t: "2. Written response", d: "Availability, specifications and indicative terms, or clarifying questions." },
              { icon: "handshake" as const, t: "3. Agree & ship", d: "Samples where appropriate, then contract, preparation and shipment." },
            ].map((b) => (
              <div className="icon-box" key={b.t}>
                <span className="icon-box__icon">
                  <Icon name={b.icon} strokeWidth={2} />
                </span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Link href="/buyers/how-to-order" className="btn btn--on-dark">
              How to order
            </Link>
          </div>
        </div>
      </section>

      <Faq
        items={[
          { q: "What do 'Core range' and 'Sourcing enquiry' mean?", a: "Core range products come from our established range; sourcing enquiries are products we can try to source on request and are not held as regular stock. Both are confirmed per enquiry." },
          { q: "Do you supply buyers outside the UK?", a: "Yes. We supply UK wholesale buyers and coordinate exports to international buyers." },
          { q: "Can I order more than one product at once?", a: "Yes — the quotation form lets you configure several products in one enquiry, and compatible lines can be consolidated." },
          { q: "How do I contact your Uganda team?", a: "Email uganda@axisagro.co.uk for sourcing and supplier matters, or operations@axisagro.co.uk for logistics and documentation." },
        ]}
      />

      <CtaBand>&lsquo;Request a quote for your next shipment&rsquo;</CtaBand>
    </>
  );
}
