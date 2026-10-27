import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CtaPanel, JsonLd, PageHero } from "@/components/ui";
import { INSIGHTS, insightBySlug } from "@/data/content";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => INSIGHTS.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const a = insightBySlug((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, image: a.image, type: "article" });
}

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const a = insightBySlug((await params).slug);
  if (!a) notFound();
  const more = INSIGHTS.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={a.category}
        title={a.title}
        intro={a.excerpt}
        crumbs={[
          { name: "Insights", href: "/insights" },
          { name: a.title, href: `/insights/${a.slug}` },
        ]}
        variant="plain"
      />
      <article className="section">
        <div className="container container--narrow">
          <div className="article-card__meta" style={{ marginBottom: 28 }}>
            <span>{a.readingMinutes} min read</span>
            <span>Last reviewed {fmt(a.reviewed)}</span>
          </div>
          <div className="frame frame--wide" style={{ marginBottom: 48 }}>
            <Image src={a.image} alt={a.imageAlt} fill sizes="(max-width: 920px) 100vw, 920px" priority />
          </div>
          <div className="prose">
            {a.body.map((b, i) => (
              <section key={i}>
                {b.heading ? <h2>{b.heading}</h2> : null}
                {b.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)}>{p}</p>
                ))}
                {b.list ? (
                  <ul>
                    {b.list.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
            <p className="note" style={{ marginTop: 40 }}>
              <Icon name="info" size={20} />
              <span>This guide is general information, not legal or customs advice. Always confirm current requirements with the relevant authority or your customs adviser.</span>
            </p>
          </div>
          <div className="btn-row" style={{ marginTop: 40 }}>
            <Link href="/insights" className="btn btn--outline">
              All insights
            </Link>
            <Link href="/get-a-quote" className="btn">
              Request a quote
            </Link>
          </div>
        </div>
      </article>

      <section className="section section--cream">
        <div className="container">
          <h2 style={{ marginBottom: 32 }}>More guides</h2>
          <div className="grid grid-3">
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="article-card">
                <div className="article-card__media">
                  <Image src={m.image} alt={m.imageAlt} width={800} height={550} sizes="(max-width: 640px) 100vw, 33vw" />
                </div>
                <div className="article-card__meta">
                  <span>{m.category}</span>
                </div>
                <h3>{m.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaPanel />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          image: `${SITE.url}${a.image}`,
          dateModified: a.reviewed,
          datePublished: a.reviewed,
          mainEntityOfPage: `${SITE.url}/insights/${a.slug}`,
          author: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
          publisher: { "@id": `${SITE.url}/#organization` },
        }}
      />
    </>
  );
}
