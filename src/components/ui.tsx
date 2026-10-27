import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { categoryForGroup, groupLabel } from "@/data/categories";
import type { Product } from "@/data/products";
import { SITE } from "@/data/site";
import { Icon, type IconName } from "./Icon";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output escaped so it cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
            </li>
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

export function PageHero({
  title,
  intro,
  image,
  imageAlt = "",
  crumbs,
  eyebrow,
  children,
  variant,
}: {
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs: Crumb[];
  eyebrow?: string;
  children?: ReactNode;
  variant?: "short" | "plain";
}) {
  const cls = ["page-hero", variant === "short" && "page-hero--short", (variant === "plain" || !image) && "page-hero--plain"].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      {image ? (
        <div className="page-hero__media">
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
        </div>
      ) : null}
      <div className="container page-hero__content hero-enter">
        <Breadcrumbs items={crumbs} />
        {eyebrow ? <span className="eyebrow eyebrow--light">{eyebrow}</span> : null}
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  action?: ReactNode;
}) {
  if (action) {
    return (
      <div className="section-head section-head--split reveal">
        <div>
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h2>{title}</h2>
          {lead ? <p className="lead">{lead}</p> : null}
        </div>
        {action}
      </div>
    );
  }
  return (
    <div className={`section-head reveal${center ? " section-head--center" : ""}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" | "article" }) {
  return (
    <Tag className={`reveal ${className}`} style={{ "--delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function quoteHref(slug?: string) {
  return slug ? `/get-a-quote?product=${encodeURIComponent(slug)}` : "/get-a-quote";
}

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} className="product-card__media" tabIndex={-1} aria-hidden="true">
        <Image src={product.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" priority={priority} />
        <span className="product-card__chip">
          <Icon name={product.icon} size={16} /> {groupLabel(product.group)}
        </span>
      </Link>
      <div className="product-card__body">
        <span className="product-card__meta">Origin: {product.origins.join(" · ")}</span>
        <h3>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p>{product.short}</p>
        <div className="product-card__actions">
          <Link href={`/products/${product.slug}`} className="link-arrow">
            Details <Icon name="arrow" size={16} />
          </Link>
          <Link href={quoteHref(product.slug)} className="btn btn--sm btn--outline" aria-label={`Request a quote for ${product.name}`}>
            Request quote
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CtaPanel({
  title = "Tell us what you need to source.",
  text = "Share your product, grade, volume, destination and timing. We will confirm what can be supplied and respond with next steps.",
  image = "/images/axis-avocado-boxes.webp",
  product,
}: {
  title?: string;
  text?: string;
  image?: string;
  product?: string;
}) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-panel reveal">
          <Image src={image} alt="" fill sizes="(max-width: 1320px) 100vw, 1320px" />
          <div>
            <span className="eyebrow eyebrow--light">Trade enquiries</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <Link href={quoteHref(product)} className="btn btn--gold">
              Request a Quote <Icon name="arrow" size={18} />
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Contact our team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Band({ icon = "leaf", children, lead, actions, variant }: { icon?: IconName; children: ReactNode; lead?: ReactNode; actions?: ReactNode; variant?: "botanical" | "cream" }) {
  return (
    <section className={`band${variant ? ` band--${variant}` : ""}`}>
      <div className="container reveal">
        <span className="band__icon">
          <Icon name={icon} size={44} strokeWidth={1.4} />
        </span>
        <p className="band__quote">{children}</p>
        {lead ? <p className="lead">{lead}</p> : null}
        {actions ? <div className="btn-row">{actions}</div> : null}
      </div>
    </section>
  );
}

export function FeatureCard({ icon, title, text, points }: { icon: IconName; title: string; text: string; points?: string[] }) {
  return (
    <div className="feature-card feature">
      <span className="icon-badge">
        <Icon name={icon} size={30} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {points?.length ? (
        <ul>
          {points.map((p) => (
            <li key={p}>
              <Icon name="check" size={14} strokeWidth={3} /> {p}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function categoryHrefForProduct(p: Product) {
  return `/products/${categoryForGroup(p.group).slug}`;
}
