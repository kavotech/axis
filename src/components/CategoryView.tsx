import Image from "next/image";
import Link from "next/link";
import type { Category, Subcategory } from "@/data/categories";
import { productsIn } from "@/data/products";
import { SITE } from "@/data/site";
import { Icon } from "./Icon";
import { Band, CtaBand, CutoutGrid, Faq, JsonLd, PageTop, Reveal } from "./ui";

export const CATEGORY_ACCENT = (slug: string) => {
  const map: Record<string, string> = {
    fruits: "accent-leaf",
    vegetables: "accent-orange",
    "roots-tubers": "accent-orange",
    "herbs-spices": "accent-orange",
    coffee: "accent-earth",
    cocoa: "accent-cocoa",
    oilseeds: "accent-gold",
    "grains-pulses": "accent-gold",
    nuts: "accent-gold",
    "dried-products": "accent-gold",
  };
  return map[slug] ?? "accent-leaf";
};

function QualityBlock({ category }: { category: Category }) {
  return (
    <section className="section section--grey">
      <div className="wrap">
        <div className="cards-box page-box--marker">
          <h2 className="section-title">Quality, packaging &amp; logistics</h2>
          <div className="info-grid">
            <div>
              <h3 className="text-accent">Quality considerations</h3>
              <ul className="ticks">
                {category.quality.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-accent">Sorting &amp; grading</h3>
              <ul className="ticks">
                {category.grading.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-accent">Shipping</h3>
              <ul className="ticks">
                {category.logistics.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-accent">Typical buyer enquiries</h3>
              <ul className="ticks">
                {category.enquiries.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights({ category }: { category: Category }) {
  return (
    <section className="section">
      <div className="wrap icon-boxes">
        {category.highlights.map((h, i) => (
          <Reveal key={h.title} delay={i * 0.06}>
            <div className="icon-box">
              <span className="icon-box__icon" style={{ background: "var(--grey-2)" }}>
                <Icon name={h.icon} strokeWidth={2} />
              </span>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CategoryView({ category }: { category: Category }) {
  const all = productsIn(category.slug);
  const subs = category.subcategories.map((s) => ({ s, items: productsIn(category.slug, s.slug) })).filter((x) => x.items.length);
  return (
    <div className={CATEGORY_ACCENT(category.slug)}>
      <PageTop
        variant="filled"
        title={category.name}
        image={category.image}
        imageAlt={category.imageAlt}
        under="#fff"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
        left={<p>{category.intro}</p>}
        right={
          <>
            <p>{category.logistics[0]}</p>
            <p>
              Products marked <strong>Core range</strong> come from our established range; <strong>Sourcing enquiry</strong> items are sourced on request and are not held as regular stock.
            </p>
          </>
        }
      />

      <section className="product-range">
        <div className="wrap">
          {subs.length ? (
            subs.map(({ s, items }) => (
              <div key={s.slug} style={{ marginBottom: 80 }}>
                <div className="sub-head">
                  <div>
                    <h2 className="h-lg">{s.name}</h2>
                    <p>{s.intro}</p>
                  </div>
                  <Link href={`/products/${category.slug}/${s.slug}`} className="read-more">
                    View {s.name.toLowerCase()}
                  </Link>
                </div>
                <CutoutGrid products={items} />
              </div>
            ))
          ) : (
            <CutoutGrid products={all} />
          )}
        </div>
      </section>

      <Band icon={category.icon} className="band--leaf">
        &lsquo;{category.summary}&rsquo;
      </Band>
      <Highlights category={category} />
      <QualityBlock category={category} />
      <Faq items={category.faqs} />
      <CtaBand href={`/get-a-quote?product=${all[0]?.slug ?? ""}`}>&lsquo;Let&rsquo;s talk about your {category.shortName.toLowerCase()} requirements&rsquo;</CtaBand>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seoDescription,
          url: `${SITE.url}/products/${category.slug}`,
          hasPart: all.map((p) => ({ "@type": "Product", name: p.name, url: `${SITE.url}/products/${p.slug}` })),
        }}
      />
    </div>
  );
}

export function SubcategoryView({ category, sub }: { category: Category; sub: Subcategory }) {
  const items = productsIn(category.slug, sub.slug);
  const siblings = category.subcategories.filter((s) => s.slug !== sub.slug);
  return (
    <div className={CATEGORY_ACCENT(category.slug)}>
      <PageTop
        variant="filled"
        title={sub.name}
        image={sub.image}
        imageAlt={sub.imageAlt}
        under="#fff"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: sub.name, href: `/products/${category.slug}/${sub.slug}` },
        ]}
        left={<p>{sub.intro}</p>}
        right={<p>{category.intro}</p>}
      />
      <section className="product-range">
        <div className="wrap">
          <CutoutGrid products={items} />
        </div>
      </section>
      <Band icon={sub.icon} className="band--leaf">
        &lsquo;{sub.name}, prepared to your specification&rsquo;
      </Band>
      <QualityBlock category={category} />
      {siblings.length ? (
        <section className="section">
          <div className="wrap">
            <h2 className="section-title section-title--center">More {category.shortName.toLowerCase()}</h2>
            <div className="product-range__grid">
              {siblings.map((s) => (
                <Link key={s.slug} href={`/products/${category.slug}/${s.slug}`} className="cutout">
                  <span className="cutout__img">
                    <Image src={s.image} alt={s.imageAlt} width={300} height={300} sizes="150px" />
                  </span>
                  <h3>{s.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Faq items={category.faqs} />
      <CtaBand href={`/get-a-quote?product=${items[0]?.slug ?? ""}`}>&lsquo;Request a quote for {sub.name.toLowerCase()}&rsquo;</CtaBand>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: sub.name,
          url: `${SITE.url}/products/${category.slug}/${sub.slug}`,
          hasPart: items.map((p) => ({ "@type": "Product", name: p.name, url: `${SITE.url}/products/${p.slug}` })),
        }}
      />
    </div>
  );
}
