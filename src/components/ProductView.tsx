import Image from "next/image";
import Link from "next/link";
import { categoryForGroup, subcategoryOf } from "@/data/categories";
import { relatedProducts, type Product } from "@/data/products";
import { SITE } from "@/data/site";
import { CATEGORY_ACCENT } from "./CategoryView";
import { Icon } from "./Icon";
import { Band, CtaBand, CutoutGrid, Faq, JsonLd, PageTop, Reveal, StatusBadge, quoteHref } from "./ui";

export function ProductView({ product }: { product: Product }) {
  const category = categoryForGroup(product.group);
  const sub = subcategoryOf(product.group, product.sub);
  const related = relatedProducts(product);
  const heroImage = product.image ?? sub?.image ?? category.image;
  const crumbs = [
    { name: "Products", href: "/products" },
    { name: category.name, href: `/products/${category.slug}` },
    ...(sub ? [{ name: sub.name, href: `/products/${category.slug}/${sub.slug}` }] : []),
    { name: product.name, href: `/products/${product.slug}` },
  ];
  const faqs = [
    ...(product.faqs ?? []),
    {
      q: `Is ${product.name.toLowerCase()} available now?`,
      a:
        product.status === "core"
          ? `${product.name} is part of our established range. Availability depends on season and partner capacity, so volumes and timing are confirmed in writing for each enquiry.`
          : `${product.name} is offered as a sourcing enquiry. We assess availability, quality and logistics with partners for each request; it is not held as regular stock.`,
    },
    { q: "What information should I include in a quote request?", a: "Variety or grade, quantity and unit, packaging, destination, preferred Incoterm and shipping window, plus any documents or tests you need." },
    ...category.faqs.slice(0, 2),
  ];

  return (
    <div className={CATEGORY_ACCENT(category.slug)}>
      <PageTop
        title={product.name}
        image={heroImage}
        imageAlt={product.image ? product.imageAlt : sub?.imageAlt ?? category.imageAlt}
        crumbs={crumbs}
        left={
          <>
            <StatusBadge status={product.status} />
            <p className="lead" style={{ marginTop: 10 }}>
              {product.short}
            </p>
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
            <p className="muted">{product.confirm}</p>
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
              <div className="spec__row">
                <dt>Supply status</dt>
                <dd>{product.status === "core" ? "Core range — confirmed per enquiry" : "Sourcing enquiry — not held as regular stock"}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.1}>
            {product.image ? (
              <div className="split__img">
                <Image src={product.image} alt={product.imageAlt} width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
              </div>
            ) : (
              <div className="split__img cutout__icon" style={{ aspectRatio: "4 / 3" }}>
                <Icon name={product.icon} strokeWidth={1.6} />
              </div>
            )}
            <h3 className="h-sm text-accent" style={{ marginTop: 26 }}>
              Applications
            </h3>
            <ul className="ticks">
              {(product.applications ?? category.applications).map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--grey">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Quality, packaging &amp; logistics</h2>
            <div className="cards">
              <div className="card" style={{ alignItems: "stretch" }}>
                <span className="card__icon" style={{ alignSelf: "center" }}>
                  <Icon name="shield" strokeWidth={2} />
                </span>
                <h3>Quality &amp; grading</h3>
                <ul className="ticks">
                  {[...category.quality.slice(0, 2), ...category.grading.slice(0, 2)].map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ alignItems: "stretch" }}>
                <span className="card__icon" style={{ alignSelf: "center" }}>
                  <Icon name="box" strokeWidth={2} />
                </span>
                <h3>Packaging</h3>
                <ul className="ticks">
                  {product.packaging.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ alignItems: "stretch" }}>
                <span className="card__icon" style={{ alignSelf: "center" }}>
                  <Icon name="ship" strokeWidth={2} />
                </span>
                <h3>Transport</h3>
                <ul className="ticks">
                  {[...product.logistics, ...category.transport.slice(0, 1)].map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="h-sm text-accent" style={{ marginTop: 34 }}>
              Typical buyer enquiries
            </h3>
            <ul className="ticks">
              {category.enquiries.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="btn-row" style={{ marginTop: 20 }}>
              <Link href={quoteHref(product.slug)} className="btn btn--sm">
                Request a quote
              </Link>
              <a href={`mailto:${SITE.emails.general}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`} className="btn btn--sm btn--outline">
                Email {SITE.emails.general}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqs} title={`${product.name}: common questions`} />

      {related.length ? (
        <section className="product-range" style={{ paddingTop: 40 }}>
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
          ...(product.image ? { image: `${SITE.url}${product.image}` } : {}),
          url: `${SITE.url}/products/${product.slug}`,
          category: category.name,
          brand: { "@type": "Brand", name: SITE.shortName },
          countryOfOrigin: product.origins.map((o) => ({ "@type": "Country", name: o })),
        }}
      />
    </div>
  );
}
