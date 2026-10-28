import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { Icon } from "./Icon";
import { LeadershipRow } from "./LeaderViews";
import { Band, CtaBand, Faq, Reveal } from "./ui";

export function AboutExtras() {
  return (
    <>
      <Band icon="globe" className="band--home" notch="both">
        &lsquo;Our UK operations and our Uganda sourcing network&rsquo;
      </Band>
      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="h-lg">Our UK operations</h2>
            <p className="lead">The United Kingdom is our commercial base and the single point of contact for buyers.</p>
            <ul className="ticks">
              <li>Buyer relationships, specifications and quotations</li>
              <li>Commercial terms, contracts and Incoterms</li>
              <li>Import documentation and customs coordination with agents</li>
              <li>Shipment tracking and delivery coordination</li>
            </ul>
            <p>
              General enquiries: <a href={`mailto:${SITE.emails.general}`} className="text-accent">{SITE.emails.general}</a>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-lg">Our Uganda sourcing network</h2>
            <p className="lead">On the ground in Uganda, our operations lead works with partners, growers and processors.</p>
            <ul className="ticks">
              <li>Supplier identification and relationship management</li>
              <li>Coffee and commodity procurement</li>
              <li>Quality coordination and grading at origin</li>
              <li>Export preparation and inland logistics</li>
            </ul>
            <p>
              Uganda operations: <a href={`mailto:${SITE.emails.uganda}`} className="text-accent">{SITE.emails.uganda}</a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--grey">
        <div className="wrap">
          <h2 className="section-title">Meet our leadership</h2>
          <div style={{ marginTop: 30 }}>
            <LeadershipRow />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h-lg">Our business approach</h2>
          <div className="icon-boxes" style={{ marginTop: 36 }}>
            {[
              { icon: "document" as const, t: "Specification first", d: "We start from your requirements and confirm feasibility before quoting." },
              { icon: "check" as const, t: "Honest availability", d: "Core range and sourcing enquiries clearly distinguished." },
              { icon: "calendar" as const, t: "Planned supply", d: "Recurring programmes rather than one-off trades wherever possible." },
            ].map((b) => (
              <div className="icon-box" key={b.t}>
                <span className="icon-box__icon" style={{ background: "var(--grey-2)" }}>
                  <Icon name={b.icon} strokeWidth={2} />
                </span>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Our supply-chain responsibilities</h2>
            <div className="cards">
              {[
                { icon: "sourcing" as const, t: "At origin", d: "Sourcing, supplier checks, grading, packing and export preparation through partners." },
                { icon: "ship" as const, t: "In transit", d: "Freight booking, documents, cold-chain coordination and shipment updates." },
                { icon: "warehouse" as const, t: "On arrival", d: "Coordination with customs agents, delivery and feedback." },
              ].map((c) => (
                <div className="card" key={c.t}>
                  <span className="card__icon">
                    <Icon name={c.icon} strokeWidth={2} />
                  </span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2 className="h-lg">How we work with buyers</h2>
            <p>
              Every relationship starts with a written specification. We confirm what can be supplied, arrange samples where appropriate, agree terms, and keep you informed from preparation to delivery. After
              each shipment, your feedback shapes the next one.
            </p>
            <Link href="/buyers/how-to-order" className="btn">
              How to order
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-lg">International market focus</h2>
            <p>
              Our core market is the United Kingdom. We also coordinate exports for buyers in Europe, the Middle East and other markets, reviewing destination requirements for every enquiry.
            </p>
            <Link href="/industries" className="btn btn--outline">
              Industries we supply
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export function ServiceExtras() {
  return (
    <>
      <section className="section section--grey">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="h-lg">Commercial considerations</h2>
            <ul className="ticks">
              <li>Prices depend on product, grade, volume, season, Incoterm and freight costs at the time of shipment.</li>
              <li>Payment terms are agreed per contract — for example bank transfer, letters of credit or documentary collection.</li>
              <li>Recurring programmes allow better planning with growers and freight partners.</li>
              <li>Insurance should match the Incoterm and the value of the cargo.</li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-lg">Buyer requirements we capture</h2>
            <ul className="ticks">
              <li>Product, variety, grade and specification</li>
              <li>Quantity, unit and packaging</li>
              <li>Destination, freight mode and Incoterm</li>
              <li>Documents, inspections and laboratory tests</li>
              <li>Timing, frequency and contract duration</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <div className="split__img">
              <Image src="/images/produce-cartons.webp" alt="Cartons of fresh fruit" width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-lg">Packaging options &amp; documentation</h2>
            <p>Cartons, jute and PP bags, bulk bags and palletised loads — matched to each product and destination. Every shipment travels with the commercial, transport and plant-health documents it needs.</p>
            <div className="btn-row">
              <Link href="/logistics/packaging" className="btn btn--sm">
                Packaging
              </Link>
              <Link href="/logistics/export-documentation" className="btn btn--sm btn--outline">
                Documentation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq
        items={[
          { q: "Can you handle both the export and the UK import?", a: "We coordinate both ends with freight forwarders and customs agents, and keep you informed throughout." },
          { q: "Do you offer consolidated shipments?", a: "Yes — compatible products can often be consolidated on one air waybill or in one container." },
          { q: "Who do I contact about a live shipment?", a: `Email ${SITE.emails.operations} with your enquiry reference.` },
        ]}
        title="Common questions"
      />

      <section className="circles" style={{ padding: "70px 0 80px" }}>
        <div className="wrap">
          <h2 className="section-title section-title--center">Related services</h2>
          <div className="circles__grid" style={{ marginTop: 30 }}>
            {[
              { href: "/logistics/air-freight", icon: "plane" as const, t: "Air freight" },
              { href: "/logistics/sea-freight", icon: "ship" as const, t: "Sea freight" },
              { href: "/logistics/cold-chain", icon: "snow" as const, t: "Cold chain" },
              { href: "/logistics/importing-to-uk", icon: "warehouse" as const, t: "Importing to the UK" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="circle-item">
                <span className="circle-item__img">
                  <Icon name={c.icon} strokeWidth={2} />
                </span>
                <h3>{c.t}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export { CtaBand };
