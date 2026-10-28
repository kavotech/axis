import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageTop, Reveal } from "@/components/ui";
import { INSIGHTS } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "News & Insights — Produce Trade Guides",
  description: "Practical guides on Uganda coffee grades, Incoterms, freight choices and import documentation for fresh produce and agricultural commodity buyers.",
  path: "/insights",
  image: "/images/green-coffee.webp",
});

export default function InsightsPage() {
  return (
    <div className="accent-leaf">
      <PageTop
        title="News & insights"
        image="/images/green-coffee.webp"
        imageAlt="Green coffee beans"
        under="#fff"
        crumbs={[{ name: "Insights", href: "/insights" }]}
        left={<p className="lead">Practical guides for produce and commodity buyers.</p>}
        right={<p>Notes on grades, trade terms, freight and documentation. Company announcements will be published here when there is news to share.</p>}
      />
      <section className="section">
        <div className="wrap posts">
          {INSIGHTS.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.06}>
              <Link href={`/insights/${a.slug}`} className="post-card">
                <span className="post-card__img">
                  <Image src={a.image} alt={a.imageAlt} width={800} height={500} sizes="(max-width: 767px) 100vw, 33vw" />
                </span>
                <span className="post-card__body">
                  <span className="post-card__meta">
                    {a.category} · {a.readingMinutes} min read
                  </span>
                  <h3>{a.title}</h3>
                  <span className="muted">{a.excerpt}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
