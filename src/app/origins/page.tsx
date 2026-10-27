import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { RouteMap } from "@/components/RouteMap";
import { Band, CtaPanel, PageHero, Reveal, SectionHead } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Origins — Uganda & East African Sourcing",
  description:
    "Axis Agro sources fresh produce, coffee, cocoa, spices and oilseeds from Uganda — our primary origin — with complementary supply from Kenya and Tanzania.",
  path: "/origins",
  image: "/images/uganda-hills.webp",
});

const ORIGINS = [
  {
    name: "Uganda",
    tag: "Primary origin",
    image: "/images/uganda-green.webp",
    alt: "Green hills and farmland in Uganda",
    text: "Equatorial climate, fertile soils and two rainy seasons. Our main source of Robusta and Arabica coffee, cocoa, vanilla, sesame, chia, matooke, pineapples, passion fruit, avocados and root crops.",
    products: ["Coffee", "Cocoa", "Vanilla", "Pineapples", "Passion fruit", "Matooke", "Sesame"],
  },
  {
    name: "Kenya",
    tag: "Complementary origin",
    image: "/images/coffee-hills.webp",
    alt: "Coffee growing on terraced hillsides",
    text: "Highland production of avocados, mangoes, French beans, macadamia and fresh herbs, with established export pack-house infrastructure and the Port of Mombasa.",
    products: ["Avocados", "Mangoes", "French beans", "Macadamia", "Herbs"],
  },
  {
    name: "Tanzania",
    tag: "Complementary origin",
    image: "/images/sunflower-field.webp",
    alt: "Field of sunflowers under a blue sky",
    text: "Cashew from the south, sesame and sunflower from the central corridor, plus spices — with access to the Port of Dar es Salaam.",
    products: ["Cashew", "Sesame", "Sunflower", "Spices"],
  },
];

const REGIONS = [
  { name: "Mount Elgon (east)", text: "Bugisu Arabica coffee grown on volcanic slopes." },
  { name: "Rwenzori (west)", text: "Highland Arabica and mixed fruit production." },
  { name: "Central & Lake Victoria basin", text: "Robusta coffee, vanilla, pineapples, matooke and fresh produce." },
  { name: "Bundibugyo (west)", text: "Cocoa grown predominantly by smallholders." },
  { name: "Northern Uganda", text: "Sesame, sunflower, groundnuts and shea." },
];

export default function OriginsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our origins"
        title="Uganda first. East Africa alongside."
        intro="Sourcing close to the equator gives access to multiple harvests a year and counter-seasonal supply for UK and European markets."
        image="/images/uganda-hills.webp"
        imageAlt="Aerial view of green hills and valleys in East Africa"
        crumbs={[{ name: "Our origins", href: "/origins" }]}
      />

      <section className="section section--forest">
        <div className="container">
          <SectionHead
            eyebrow="Supply-chain map"
            title="From Uganda to the UK, Europe and the Gulf."
            lead="Perishable produce typically flies from Entebbe; bagged commodities travel by road along the Northern Corridor to Mombasa for sea freight. Routes shown are indicative."
          />
          <Reveal>
            <RouteMap />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Sourcing countries" title="Where our produce comes from" />
          <div className="grid grid-3">
            {ORIGINS.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.08}>
                <article className="origin-card">
                  <div className="origin-card__media">
                    <Image src={o.image} alt={o.alt} width={800} height={500} sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="origin-card__body">
                    <span className="origin-card__tag">{o.tag}</span>
                    <h3 style={{ marginTop: 8 }}>{o.name}</h3>
                    <p className="muted">{o.text}</p>
                    <ul className="chip-list">
                      {o.products.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Band icon="pin" variant="botanical">
        Close to the equator, <em>close to the harvest.</em>
      </Band>

      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Growing regions of Uganda</span>
            <h2>Distinct regions, distinct crops.</h2>
            <dl className="spec" style={{ marginTop: 28 }}>
              {REGIONS.map((r) => (
                <div className="spec__row" key={r.name}>
                  <dt>{r.name}</dt>
                  <dd>{r.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="collage">
            <div className="frame collage__main">
              <Image src="/images/axis-limes-market.webp" alt="Fresh produce being unloaded at a market in Uganda" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
            <div className="frame collage__inset">
              <Image src="/images/axis-vanilla-bundles.webp" alt="Bundles of cured vanilla beans" fill sizes="(max-width: 900px) 45vw, 22vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Sourcing partners</span>
            <h2>Trusted partners on the ground.</h2>
            <p className="lead">We work with established partners in Uganda who support sourcing, aggregation and export preparation.</p>
            <div className="grid" style={{ gap: 14, marginTop: 24 }}>
              {SITE.sourcingPartners.map((p) => (
                <a key={p.name} href={p.url} className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="icon-badge" style={{ width: 52, height: 52 }}>
                    <Icon name="handshake" size={24} />
                  </span>
                  <span>
                    <strong>{p.name}</strong>
                    <span>{p.url.replace(/^https?:\/\//, "")} ↗</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">How we source</span>
            <ol className="prose" style={{ paddingLeft: "1.2em" }}>
              <li>Identify producers and processors with the right capacity and quality for each product.</li>
              <li>Sample and assess against the buyer&rsquo;s specification.</li>
              <li>Grade, clean, sort and pack at partner facilities.</li>
              <li>Arrange pre-shipment checks and the documents the destination requires.</li>
              <li>Ship by air or sea and track through to arrival.</li>
            </ol>
            <Link href="/quality" className="link-arrow">
              Quality &amp; compliance <Icon name="arrow" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaPanel image="/images/uganda-road.webp" />
    </>
  );
}
