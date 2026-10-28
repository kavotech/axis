import Image from "next/image";
import Link from "next/link";
import { categoryForGroup } from "@/data/categories";
import { relatedProducts, type Product } from "@/data/products";
import { SITE } from "@/data/site";
import { CATEGORY_ACCENT } from "./CategoryView";
import { Icon } from "./Icon";
import { Band, CtaBand, CutoutGrid, JsonLd, PageTop, Reveal, quoteHref } from "./ui";

export function ProductView({ product }: { product: Product }) {
  const category = categoryForGroup(product.group);
  const related = relatedProducts(product);
  return (
    <div className={CATEGORY_ACCENT[category.slug]}>
      <PageTop
        title={product.name}
        image={product.image}
        imageAlt={product.imageAlt}
        crumbs={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
          { name: product.name, href: `/products/${product.slug}` },
        ]}
        left={
          <>
            <p className="lead">{product.short}</p>
            <p>{product.description[0]}</p>
            <Link href={quoteHref(product.slug)} className="btn">
              Request a quote
            </Link>
          </>
        }
        right={
          <>
            {product.description.slice(1).map((d) => (
              <p key={d.slice(0, 20)}>{d}</p>
            ))}
            {product.botanical ? (
              <p className="muted">
                Botanical name: <em>{product.botanical}</em>
              </p>
            ) : null}
          </>
        }
      />

      <Band icon={product.icon} className="band--leaf">
        &lsquo;{product.origins.join(", ")} origin — prepared to your specification&rsquo;
      </Band>

      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="section-title">Specifications</h2>
            <dl className="spec">
              <div className="spec__row">
                <dt>Varieties / forms</dt>
                <dd>{product.varieties.join(", ")}</dd>
              </div>
              <div className="spec__row">
                <dt>Grades</dt>
                <dd>{product.grades.join(" · ")}</dd>
              </div>
              <div className="spec__row">
                <dt>Origins</dt>
                <dd>{product.origins.join(", ")}</dd>
              </div>
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
          <Reveal delay={0.1}>
            <div className="split__img">
              <Image src={product.image} alt={product.imageAlt} width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--grey">
        <div className="wrap">
          <div className="cards-box">
            <h2 className="section-title">Packaging &amp; logistics</h2>
            <p className="lead">Packing formats and shipping options are agreed with each buyer before an order is confirmed.</p>
            <div className="cards">
              <div className="card">
                <span className="card__icon">
                  <Icon name="box" strokeWidth={2} />
                </span>
                <h3>Packaging</h3>
                <ul className="ticks">
                  {product.packaging.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <span className="card__icon">
                  <Icon name="ship" strokeWidth={2} />
                </span>
                <h3>Logistics</h3>
                <ul className="ticks">
                  {product.logistics.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <span className="card__icon">
                  <Icon name="document" strokeWidth={2} />
                </span>
                <h3>Your quotation</h3>
                <p>{product.confirm ?? "Specifications, volumes and availability are confirmed in writing for each enquiry."}</p>
                <Link href={quoteHref(product.slug)} className="btn btn--sm">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="product-range" style={{ paddingTop: 80 }}>
          <div className="wrap">
            <h2 className="section-title section-title--center">Related products</h2>
            <CutoutGrid products={related} />
          </div>
        </section>
      ) : null}

      <CtaBand href={quoteHref(product.slug)}>&lsquo;Let&rsquo;s discuss your {product.name.toLowerCase()} order&rsquo;</CtaBand>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description.join(" "),
          image: `${SITE.url}${product.image}`,
          url: `${SITE.url}/products/${product.slug}`,
          category: category.name,
          brand: { "@type": "Brand", name: SITE.shortName },
          countryOfOrigin: product.origins.map((o) => ({ "@type": "Country", name: o })),
        }}
      />
    </div>
  );
}
