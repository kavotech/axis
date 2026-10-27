import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CtaPanel, PageHero, Reveal, SectionHead } from "@/components/ui";
import { INDUSTRIES } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Supply — Wholesale, Retail, Foodservice & Manufacturing",
  description:
    "Axis Agro supplies wholesale produce markets, importers, distributors, supermarkets, foodservice, hospitality, food manufacturers and industrial commodity buyers.",
  path: "/industries",
  image: "/images/market-tropical.webp",
});

const IMAGES: Record<string, string> = {
  "wholesale-markets": "/images/market-tropical.webp",
  importers: "/images/ship-2.webp",
  distributors: "/images/warehouse-2.webp",
  supermarkets: "/images/axis-avocado-boxes.webp",
  foodservice: "/images/veg-box.webp",
  hospitality: "/images/tropical-basket.webp",
  manufacturing: "/images/dried-fruit-mix.webp",
  commodity: "/images/axis-sacks-warehouse.webp",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries we supply"
        title="Supply shaped around your business."
        intro="Different buyers need different things: pack sizes, delivery rhythms, documentation and specifications. We start from how you operate."
        image="/images/market-tropical.webp"
        imageAlt="Market stall displaying fresh tropical fruit"
        crumbs={[{ name: "Industries", href: "/industries" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Who we work with" title="Eight buyer types, one consistent standard." />
          <div style={{ display: "grid", gap: "clamp(48px, 7vw, 96px)" }}>
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.id} id={ind.id} className={`split${i % 2 ? " split--reverse" : ""}`}>
                <Reveal>
                  <div className="frame frame--wide">
                    <Image src={IMAGES[ind.id]} alt="" fill sizes="(max-width: 900px) 90vw, 50vw" />
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <span className="icon-badge" style={{ marginBottom: 18 }}>
                    <Icon name={ind.icon} size={30} />
                  </span>
                  <span className="eyebrow" style={{ display: "flex" }}>
                    0{i + 1}
                  </span>
                  <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>{ind.title}</h2>
                  <p className="lead">{ind.text}</p>
                  <p className="product-card__meta" style={{ margin: "20px 0 10px" }}>
                    Frequently requested
                  </p>
                  <ul className="chip-list" style={{ marginBottom: 24 }}>
                    {ind.products.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <Link href="/get-a-quote" className="link-arrow">
                    Request a quote <Icon name="arrow" size={16} />
                  </Link>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
