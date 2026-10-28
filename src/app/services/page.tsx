import Image from "next/image";
import Link from "next/link";
import { Cycle } from "@/components/Cycle";
import { Icon } from "@/components/Icon";
import { Band, CtaBand, PageTop, Reveal } from "@/components/ui";
import { CATEGORIES } from "@/data/categories";
import { PROCESS, SERVICES } from "@/data/content";
import { INCOTERMS } from "@/data/quote-options";
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
    <div className="accent-leaf">
      <PageTop
        variant="split"
        title="Import & Export"
        image="/images/pineapples.webp"
        imageAlt="Ripe pineapples stacked at market"
        under="var(--leaf)"
        crumbs={[{ name: "Services", href: "/services" }]}
        left={
          <p>
            We coordinate every link in the supply chain — sourcing at origin, packing, documentation, freight and delivery — so buyers have one accountable partner from the farm to their warehouse.
          </p>
        }
        visual={
          <Cycle
            center="One partner for every link in the chain."
            stages={[
              { icon: "sourcing", label: "Source" },
              { icon: "box", label: "Pack" },
              { icon: "ship", label: "Ship" },
              { icon: "warehouse", label: "Deliver" },
            ]}
          />
        }
      />

      <Band icon="route" className="band--leaf">
        &lsquo;Let us take care of the journey&rsquo;
      </Band>

      {/* Services split */}
      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2 className="h-lg">Our services</h2>
            <p className="lead">Use one service or combine them into a complete supply programme.</p>
            <ul className="ticks">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <span>
                    <strong>{s.title}</strong> — {s.summary}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/get-a-quote" className="btn">
              Request a quote
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="split__img">
              <Image src="/images/axis-export-bags.webp" alt="Bagged produce prepared for export" width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <Band icon="handshake" className="band--lime" notch="both" sub="One point of contact, from enquiry to delivery">
        &lsquo;Be part of a dependable supply line&rsquo;
      </Band>

      {/* Process */}
      <section className="section">
        <div className="wrap">
          <h2 className="h-lg">How a shipment comes together</h2>
          <div className="icon-boxes" style={{ marginTop: 40 }}>
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
        </div>
      </section>

      {/* Incoterms box on accent */}
      <section className="section section--accent">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Freight &amp; trade terms</h2>
            <div className="split split--top" style={{ gap: 30 }}>
              <p className="lead">We coordinate air cargo, sea freight (FCL/LCL, dry and reefer), road and multimodal shipments with experienced freight forwarders.</p>
              <p>Quotations can be prepared on the Incoterms® 2020 rule that suits your operation. Final terms, insurance and documentation are confirmed in the contract.</p>
            </div>
            <div className="cards">
              {INCOTERMS.slice(0, 9).map((t) => (
                <div className="card" key={t.code} style={{ alignItems: "stretch" }}>
                  <h3 style={{ textAlign: "left" }}>
                    {t.code} — {t.name}
                  </h3>
                  <p style={{ margin: 0 }}>{t.help}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Band icon="mango" className="band--leaf" notch="bottom">
        &lsquo;Let us show you what we supply&rsquo;
      </Band>

      {/* Product range circles */}
      <section className="section" style={{ paddingTop: 100 }}>
        <div className="wrap">
          <h2 className="section-title section-title--center">Our product range</h2>
          <p className="center-text" style={{ marginBottom: 40 }}>
            Fresh fruit, vegetables and roots, herbs and spices, green coffee, cocoa, oilseeds and dried products.
          </p>
          <div className="product-range__grid">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 0.06}>
                <Link href={`/products/${c.slug}`} className="cutout" style={{ ["--ring" as string]: i % 2 ? "var(--lime)" : "var(--gold)" }}>
                  <span className="cutout__img">
                    <Image src={c.image} alt="" width={300} height={300} sizes="150px" />
                  </span>
                  <h3>{c.name}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand>&lsquo;Let us be part of your supply chain&rsquo;</CtaBand>
    </div>
  );
}
