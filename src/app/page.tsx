import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Band, Circles, Reveal } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Axis Agro International Ltd — Fresh Produce Importer & Exporter, UK",
  description:
    "UK-based importer, exporter and wholesale supplier of Ugandan fresh produce, green coffee, cocoa, spices and oilseeds — packed, documented and delivered to buyers in the UK and worldwide.",
  path: "/",
  image: "/images/banana-plantation.webp",
});

export default function HomePage() {
  return (
    <div className="accent-forest">
      {/* 1 — Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Image src="/images/banana-plantation.webp" alt="Sunlit rows of a banana plantation in East Africa" fill priority sizes="100vw" />
        </div>
        <div className="hero__inner">
          <span className="hero__badge">
            <LogoMark className="" />
          </span>
          <h1 id="hero-title" className="hero__title">
            Axis Agro
          </h1>
          <p className="hero__sub">Premium Produce. Global Connections.</p>
          <Link href="/products" className="btn btn--lime">
            Explore our products
          </Link>
        </div>
      </section>

      {/* 2 — Intro + "go directly to" */}
      <section className="intro">
        <div className="wrap intro__grid">
          <Reveal>
            <h2 className="h-lg">Fresh produce importer and exporter</h2>
            <p className="lead">
              We are Axis Agro International Ltd — {SITE.tagline.charAt(0).toLowerCase() + SITE.tagline.slice(1)}
            </p>
            <p>
              Registered in England &amp; Wales, we import, export and supply fresh produce and agricultural commodities wholesale. We source through trusted partners in Uganda and East Africa and work
              with buyers in the United Kingdom and international markets — agreeing specifications up front and coordinating packing, documentation and freight through to delivery.
            </p>
          </Reveal>
          <Reveal className="intro__aside" delay={0.1}>
            <h2 className="h-lg">Go directly to</h2>
            <div className="btn-stack">
              <Link href="/products" className="btn">
                Our products
              </Link>
              <Link href="/get-a-quote" className="btn btn--outline">
                Request a quote
              </Link>
              <Link href="/about" className="btn btn--outline">
                About us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — Statement band */}
      <Band icon="sourcing" className="band--home">
        &lsquo;Fresh Ugandan produce. Packed. Certified. Delivered worldwide.&rsquo;
      </Band>

      {/* 4 — Icon circles */}
      <Circles
        items={[
          { href: "/products", icon: "mango", title: "Our products", text: "Discover the produce and commodities we supply" },
          { href: "/origins", icon: "pin", title: "Our origins", text: "Where and how we source in Uganda and East Africa" },
          { href: "/quality", icon: "shield", title: "Quality", text: "Inspection, traceability and export documents" },
          { href: "/get-a-quote", icon: "document", title: "Get a quote", text: "Tell us exactly what you need to source" },
        ]}
      />
    </div>
  );
}
