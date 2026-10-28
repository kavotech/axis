import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Band, CtaBand, PageTop, Reveal } from "@/components/ui";
import { INDUSTRIES } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries We Supply — Wholesale, Retail, Foodservice & Manufacturing",
  description: "Axis Agro supplies wholesale produce markets, importers, distributors, supermarkets, foodservice, hospitality, food manufacturers and industrial commodity buyers.",
  path: "/industries",
  image: "/images/market-tropical.webp",
});

export default function IndustriesPage() {
  return (
    <div className="accent-gold">
      <PageTop
        title="Industries we supply"
        image="/images/market-tropical.webp"
        imageAlt="Market stall displaying fresh tropical fruit"
        under="var(--gold)"
        crumbs={[{ name: "Industries", href: "/industries" }]}
        left={<p className="lead">Different buyers need different things: pack sizes, delivery rhythms, documents and specifications.</p>}
        right={<p>We start from how your business operates — whether you run a wholesale market stall, a distribution network, a factory or a trading desk.</p>}
      />

      <Band icon="users" className="band--gold">
        &lsquo;Supply shaped around your business&rsquo;
      </Band>

      <section className="section" style={{ paddingTop: 110 }}>
        <div className="wrap">
          <h2 className="h-lg">Who we work with</h2>
          <div className="circles__grid" style={{ marginTop: 40, rowGap: 60 }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.id} delay={(i % 4) * 0.06}>
                <div className="circle-item circle-item--value" id={ind.id}>
                  <span className="circle-item__img">
                    <Icon name={ind.icon} strokeWidth={2} />
                  </span>
                  <h3>{ind.title}</h3>
                  <p>{ind.text}</p>
                  <p style={{ fontWeight: 400, fontSize: 14 }} className="muted">
                    {ind.products.join(" · ")}
                  </p>
                  <Link href="/get-a-quote" className="read-more" style={{ marginTop: 10 }}>
                    Request a quote
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand>&lsquo;Tell us how you buy — we will fit around it&rsquo;</CtaBand>
    </div>
  );
}
