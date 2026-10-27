import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CtaPanel, PageHero, Reveal } from "@/components/ui";
import { INSIGHTS } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "News & Insights — Produce Trade Guides",
  description: "Practical guides on Uganda coffee grades, Incoterms, freight choices and import documentation for fresh produce and agricultural commodity buyers.",
  path: "/insights",
  image: "/images/green-coffee.webp",
});

export default function InsightsPage() {
  const [lead, ...rest] = INSIGHTS;
  return (
    <>
      <PageHero
        eyebrow="News & insights"
        title="Guides for produce and commodity buyers."
        intro="Practical, evergreen notes on grades, trade terms, freight and documentation. Company announcements will be published here when there is news to share."
        crumbs={[{ name: "Insights", href: "/insights" }]}
        variant="plain"
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <Link href={`/insights/${lead.slug}`} className="article-card split" style={{ alignItems: "center", marginBottom: "clamp(48px, 7vw, 96px)" }}>
              <div className="article-card__media" style={{ marginBottom: 0 }}>
                <Image src={lead.image} alt={lead.imageAlt} width={1200} height={825} sizes="(max-width: 900px) 100vw, 55vw" priority />
              </div>
              <div>
                <div className="article-card__meta">
                  <span>{lead.category}</span>
                  <span>{lead.readingMinutes} min read</span>
                </div>
                <h2>{lead.title}</h2>
                <p className="lead">{lead.excerpt}</p>
                <span className="link-arrow">
                  Read the guide <Icon name="arrow" size={16} />
                </span>
              </div>
            </Link>
          </Reveal>
          <div className="grid grid-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <Link href={`/insights/${a.slug}`} className="article-card">
                  <div className="article-card__media">
                    <Image src={a.image} alt={a.imageAlt} width={800} height={550} sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="article-card__meta">
                    <span>{a.category}</span>
                    <span>{a.readingMinutes} min read</span>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaPanel />
    </>
  );
}
