import Link from "next/link";
import { categoryForGroup, groupLabel } from "@/data/categories";
import { relatedProducts, type Product } from "@/data/products";
import { SITE } from "@/data/site";
import { Icon } from "./Icon";
import { CtaPanel, JsonLd, PageHero, ProductCard, Reveal, SectionHead, quoteHref } from "./ui";

export function ProductView({ product }: { product: Product }) {
  const category = categoryForGroup(product.group);
  const related = relatedProducts(product);
  const rows: { label: string; values: string[] }[] = [
    { label: "Varieties / forms", values: product.varieties },
    { label: "Grades & specs", values: product.grades },
    { label: "Origins", values: product.origins },
    { label: "Packaging", values: product.packaging },
  ];

  return (
    <>
      <PageHero
        title={product.name}
        intro={product.short}
        image={product.image}
        imageAlt={product.imageAlt}
        eyebrow={groupLabel(product.group)}
        crumbs={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
      >
        <div className="btn-row">
          <Link href={quoteHref(product.slug)} className="btn btn--gold">
            Request a Quote <Icon name="arrow" size={18} />
          </Link>
          <Link href={`/products/${category.slug}`} className="btn btn--ghost">
            All {category.name.toLowerCase()}
          </Link>
        </div>
      </PageHero>

      <section className="section">
        <div className="container detail-layout">
          <div>
            <Reveal>
              <span className="eyebrow">Product overview</span>
              <h2>{product.name} at a glance</h2>
              {product.botanical ? (
                <p className="product-card__meta" style={{ marginBottom: 20 }}>
                  Botanical name: <em style={{ textTransform: "none", letterSpacing: 0 }}>{product.botanical}</em>
                </p>
              ) : null}
              <div className="prose">
                {product.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h3 style={{ marginTop: 48 }}>Specifications</h3>
              <dl className="spec">
                {rows.map((r) => (
                  <div className="spec__row" key={r.label}>
                    <dt>{r.label}</dt>
                    <dd>
                      <ul>
                        {r.values.map((v) => (
                          <li className="pill" key={v}>
                            {v}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
                <div className="spec__row">
                  <dt>Origin details</dt>
                  <dd>{product.originNote}</dd>
                </div>
                {product.season ? (
                  <div className="spec__row">
                    <dt>Seasonality</dt>
                    <dd>{product.season}</dd>
                  </div>
                ) : null}
              </dl>
            </Reveal>

            <Reveal>
              <h3 style={{ marginTop: 48 }}>Logistics considerations</h3>
              <div className="grid grid-2" style={{ gap: 16 }}>
                {product.logistics.map((l) => (
                  <div className="feature feature--row" key={l} style={{ alignItems: "center" }}>
                    <span className="icon-badge" style={{ width: 48, height: 48 }}>
                      <Icon name={/air/i.test(l) ? "plane" : /reefer|cool|cold|chill/i.test(l) ? "snow" : /sea|fcl|container/i.test(l) ? "ship" : "route"} size={22} />
                    </span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {product.confirm ? (
              <div className="note" style={{ marginTop: 40 }}>
                <Icon name="info" size={20} />
                <span>
                  <strong>Buyer confirmation required.</strong> {product.confirm}
                </span>
              </div>
            ) : null}
          </div>

          <aside className="sticky-panel" aria-label="Request a quote">
            <span className="icon-badge icon-badge--dark icon-badge--lg" style={{ marginBottom: 20 }}>
              <Icon name={product.icon} size={44} />
            </span>
            <h3>Request a {product.name} quotation</h3>
            <p>Tell us the variety, grade, volume, packaging, destination and timing. Your selection will be pre-filled in the form.</p>
            <Link href={quoteHref(product.slug)} className="btn btn--gold btn--block" style={{ marginTop: 8 }}>
              Request a Quote <Icon name="arrow" size={18} />
            </Link>
            <div style={{ marginTop: 24, display: "grid", gap: 10, fontSize: "0.92rem" }}>
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`} style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none" }}>
                <Icon name="mail" size={16} /> {SITE.email}
              </a>
              <a href={`tel:${SITE.phoneHref}`} style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none" }}>
                <Icon name="phone" size={16} /> {SITE.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionHead eyebrow="Related products" title="You may also be sourcing" />
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CtaPanel product={product.slug} image="/images/port.webp" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description.join(" "),
          image: `${SITE.url}${product.image}`,
          url: `${SITE.url}/products/${product.slug}`,
          category: groupLabel(product.group),
          brand: { "@type": "Brand", name: SITE.shortName },
          countryOfOrigin: product.origins.map((o) => ({ "@type": "Country", name: o })),
          additionalProperty: [
            ...(product.botanical ? [{ "@type": "PropertyValue", name: "Botanical name", value: product.botanical }] : []),
            { "@type": "PropertyValue", name: "Packaging", value: product.packaging.join(", ") },
          ],
        }}
      />
    </>
  );
}
