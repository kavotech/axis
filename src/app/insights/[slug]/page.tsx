import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { CtaBand, JsonLd, PageTop } from "@/components/ui";
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
  return (
    <div className="accent-leaf">
      <PageTop
        variant="plain"
        title={a.title}
        crumbs={[
          { name: "Insights", href: "/insights" },
          { name: a.title, href: `/insights/${a.slug}` },
        ]}
        left={
          <p style={{ margin: 0 }}>
            {a.category} · {a.readingMinutes} min read · Last reviewed {fmt(a.reviewed)}
          </p>
        }
      />
      <article className="section">
        <div className="prose">
          <div className="split__img" style={{ aspectRatio: "16 / 9", marginBottom: 36 }}>
            <Image src={a.image} alt={a.imageAlt} width={1200} height={675} sizes="(max-width: 860px) 100vw, 820px" priority />
          </div>
          <p className="lead">{a.excerpt}</p>
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
          <div className="note" style={{ marginTop: 36 }}>
            <Icon name="info" size={20} />
            <span>This guide is general information, not legal or customs advice. Always confirm current requirements with the relevant authority or your customs adviser.</span>
          </div>
          <div className="btn-row" style={{ marginTop: 30 }}>
            <Link href="/insights" className="btn btn--outline">
              All insights
            </Link>
            <Link href="/get-a-quote" className="btn">
              Request a quote
            </Link>
          </div>
        </div>
      </article>
      <CtaBand />
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
    </div>
  );
}
