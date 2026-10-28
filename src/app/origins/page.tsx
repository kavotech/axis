import Image from "next/image";
import Link from "next/link";
import { RouteMap } from "@/components/RouteMap";
import { Band, CtaBand, PageTop, Reveal } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Origins — Uganda & East African Sourcing",
  description: "Axis Agro sources fresh produce, coffee, cocoa, spices and oilseeds from Uganda — our primary origin — with complementary supply from Kenya and Tanzania.",
  path: "/origins",
  image: "/images/uganda-hills.webp",
});

const ORIGINS = [
  { name: "Uganda", tag: "Primary origin", color: "var(--gold)", products: "Coffee, cocoa, vanilla, pineapples, passion fruit, matooke, sesame, avocados and root crops." },
  { name: "Kenya", tag: "Complementary origin", color: "var(--lime)", products: "Avocados, mangoes, French beans, macadamia and fresh herbs." },
  { name: "Tanzania", tag: "Complementary origin", color: "var(--orange)", products: "Cashew, sesame, sunflower and spices." },
];

const REGIONS = [
  ["Mount Elgon (east)", "Bugisu Arabica coffee grown on volcanic slopes."],
  ["Rwenzori (west)", "Highland Arabica and mixed fruit production."],
  ["Central & Lake Victoria basin", "Robusta coffee, vanilla, pineapples, matooke and fresh produce."],
  ["Bundibugyo (west)", "Cocoa grown predominantly by smallholders."],
  ["Northern Uganda", "Sesame, sunflower, groundnuts and shea."],
];

export default function OriginsPage() {
  return (
    <div className="accent-leaf">
      <PageTop
        title="Our origins"
        image="/images/uganda-green.webp"
        imageAlt="Green hills and farmland in Uganda"
        under="var(--leaf)"
        crumbs={[{ name: "Our origins", href: "/origins" }]}
        left={<p className="lead">Uganda is our primary origin, with complementary supply from Kenya and Tanzania.</p>}
        right={
          <p>
            Close to the equator, with fertile soils and two rainy seasons, the region supports year-round production of fruit, coffee, cocoa and spices — and counter-seasonal supply for UK and European
            markets.
          </p>
        }
      />

      <Band icon="pin" className="band--leaf">
        &lsquo;Close to the equator, close to the harvest&rsquo;
      </Band>

      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="h-lg">Sourcing partners</h2>
            <p className="lead">We work with established partners in Uganda who support sourcing, aggregation and export preparation.</p>
            <p>Together with growers, cooperatives and pack-houses, they help us check quality at source and prepare produce to each buyer&rsquo;s specification.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead text-accent">Would you like to know more about our partners at origin?</p>
            <div className="btn-row" style={{ marginBottom: 18 }}>
              {SITE.sourcingPartners.map((p) => (
                <a key={p.name} href={p.url} className="btn btn--sm btn--outline" target="_blank" rel="noopener noreferrer">
                  {p.name}
                </a>
              ))}
            </div>
            <Link href="/contact" className="btn btn--sm">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="map-section">
        <div className="wrap">
          <h2 className="h-lg">Sourcing map</h2>
          <div className="map-grid">
            <ul className="legend">
              {ORIGINS.map((o) => (
                <li key={o.name} style={{ color: o.color }}>
                  <i /> <span style={{ color: "var(--ink)" }}>{o.name}</span>
                </li>
              ))}
            </ul>
            <RouteMap light />
          </div>
        </div>
      </section>

      <section className="section section--accent">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Countries &amp; regions</h2>
            <div className="cards">
              {ORIGINS.map((o) => (
                <div className="card" key={o.name}>
                  <h3>{o.name}</h3>
                  <p style={{ textAlign: "center", fontWeight: 800, color: o.color }}>{o.tag}</p>
                  <p>{o.products}</p>
                </div>
              ))}
            </div>
            <h3 className="h-sm text-accent" style={{ marginTop: 36 }}>
              Growing regions of Uganda
            </h3>
            <dl className="spec">
              {REGIONS.map(([k, v]) => (
                <div className="spec__row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="strip">
        <Image src="/images/uganda-road.webp" alt="Green hills and a winding road in Uganda" fill sizes="100vw" />
      </div>

      <CtaBand>&lsquo;Let&rsquo;s source from origin together&rsquo;</CtaBand>
    </div>
  );
}
