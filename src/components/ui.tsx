import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Product } from "@/data/products";
import { SITE } from "@/data/site";
import { Icon, type IconName } from "./Icon";

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>{i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}</li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE.url}${c.href === "/" ? "" : c.href}` })),
        }}
      />
    </>
  );
}

export const quoteHref = (slug?: string) => (slug ? `/get-a-quote?product=${encodeURIComponent(slug)}` : "/get-a-quote");

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" }) {
  return (
    <Tag className={`reveal ${className}`} style={{ "--delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/**
 * Interior page opening: an image strip with a content box overlapping it.
 * - "marker": white box with a triangle marker on its left edge.
 * - "filled": accent-coloured box with a notch below it.
 * - "split": white text half + grey visual half.
 * - "plain": accent band without image (articles, legal).
 */
export function PageTop({
  variant = "marker",
  title,
  image,
  imageAlt = "",
  crumbs,
  left,
  right,
  columns,
  visual,
  under,
}: {
  variant?: "marker" | "filled" | "split" | "plain";
  title: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs: Crumb[];
  left?: ReactNode;
  right?: ReactNode;
  columns?: ReactNode[];
  visual?: ReactNode;
  /** Background colour of the area beneath the image strip. */
  under?: string;
}) {
  if (variant === "plain") {
    return (
      <section className="page-top page-top--plain">
        <div className="wrap">
          <div className="page-box">
            <Breadcrumbs items={crumbs} />
            <h1 className="h-xl">{title}</h1>
            {left ? <div className="page-box__col">{left}</div> : null}
          </div>
        </div>
      </section>
    );
  }
  const head = (
    <div className="page-box__head">
      <Breadcrumbs items={crumbs} />
      <h1>{title}</h1>
    </div>
  );
  return (
    <section className={`page-top${variant === "filled" ? " notch-bottom" : ""}`} style={under ? ({ "--under": under } as CSSProperties) : undefined}>
      {image ? (
        <div className="page-top__media">
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
        </div>
      ) : null}
      <div className="page-top__under" />
      <div className="wrap" style={{ position: "relative" }}>
        {variant === "split" ? (
          <div className="page-box page-box--split page-box--marker">
            <div className="page-box__text">
              {head}
              <div style={{ marginTop: 16 }}>{left}</div>
            </div>
            <div className="page-box__visual">{visual}</div>
          </div>
        ) : (
          <div className={`page-box${variant === "filled" ? " page-box--filled" : " page-box--marker"}${columns && columns.length === 3 ? " page-box--3" : ""}`}>
            {head}
            {columns ? (
              columns.map((c, i) => (
                <div className="page-box__col" key={i}>
                  {c}
                </div>
              ))
            ) : (
              <>
                <div className="page-box__col">{left}</div>
                <div className="page-box__col">{right}</div>
              </>
            )}
          </div>
        )}
      </div>
      {variant === "filled" ? null : <div className="page-top__after" />}
    </section>
  );
}

/** Full-width accent band with an icon, a quoted statement and a notch. */
export function Band({
  icon,
  children,
  sub,
  action,
  notch = "bottom",
  className = "",
  tall,
}: {
  icon?: IconName;
  children: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  notch?: "bottom" | "top" | "both" | "none";
  className?: string;
  tall?: boolean;
}) {
  const cls = ["band", tall && "band--tall", (notch === "bottom" || notch === "both") && "notch-bottom", (notch === "top" || notch === "both") && "notch-top", className].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      <div className="reveal">
        {icon ? (
          <span className="band__icon">
            <Icon name={icon} strokeWidth={2.4} />
          </span>
        ) : null}
        <h2>{children}</h2>
        {sub ? <p className="band__sub">{sub}</p> : null}
        {action}
      </div>
    </section>
  );
}

export type CircleItem = { href: string; icon: IconName; title: string; text: string };

export function Circles({ items, className = "" }: { items: CircleItem[]; className?: string }) {
  return (
    <section className={`circles ${className}`}>
      <div className="wrap">
        <div className="circles__grid">
          {items.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <Link href={c.href} className="circle-item">
                <span className="circle-item__img">
                  <Icon name={c.icon} strokeWidth={2} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CutoutGrid({ products, ring }: { products: Product[]; ring?: string }) {
  return (
    <div className="product-range__grid">
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 4) * 0.06}>
          <Link href={`/products/${p.slug}`} className="cutout" style={ring ? ({ "--ring": ring } as CSSProperties) : undefined}>
            <span className="cutout__img">
              <Image src={p.image} alt={p.imageAlt} width={300} height={300} sizes="150px" />
            </span>
            <h3>{p.name}</h3>
            <span className="cutout__meta">{p.origins.join(" · ")}</span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/** Closing statement band with a notch cut into its top edge and one pill button. */
export function CtaBand({ children = "'Let's discuss what we can source for you'", href = "/get-a-quote", label = "Request a quote" }: { children?: ReactNode; href?: string; label?: string }) {
  return (
    <Band notch="top" tall action={<Link href={href} className="btn btn--gold">{label}</Link>} className="band--cta">
      {children}
    </Band>
  );
}
