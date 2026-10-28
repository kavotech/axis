import Link from "next/link";
import { Tabs } from "@/components/Tabs";
import { Band, PageTop } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sustainability — Responsible Sourcing & Supply-Chain Transparency",
  description:
    "How Axis Agro approaches responsible sourcing, supply-chain transparency, waste reduction and long-term agricultural partnerships in Uganda and East Africa.",
  path: "/sustainability",
  image: "/images/farmer-field.webp",
});

export default function SustainabilityPage() {
  return (
    <div className="accent-leaf">
      <PageTop
        title="Sustainability"
        image="/images/coffee-blossom.webp"
        imageAlt="Coffee plants in flower on a hillside"
        under="var(--lime)"
        crumbs={[{ name: "Sustainability", href: "/sustainability" }]}
        left={<p className="lead">For us, responsible sourcing is practical: dependable relationships, honest information and less waste across the supply chain.</p>}
        right={
          <>
            <p>We do not publish carbon figures, impact statistics or sustainability labels that we cannot evidence. We aim to improve year on year and report progress only when it can be substantiated.</p>
            <Link href="/contact" className="btn">
              Ask about a product
            </Link>
          </>
        }
      />

      <Band icon="leaf" className="band--lime">
        &lsquo;Fewer rejections. Less spoilage. Better partnerships.&rsquo;
      </Band>

      <section className="section" style={{ paddingTop: 100 }}>
        <div className="wrap">
          <Tabs
            items={[
              { title: "Responsible sourcing", image: "/images/farmer-field.webp", imageAlt: "A farmer tending crops", text: "We work with partners we know, agree fair commercial terms and favour long-term relationships that let growers plan their production with confidence." },
              { title: "Transparency", image: "/images/axis-coffee-drying.webp", imageAlt: "Coffee sorting on drying tables", text: "We share origin information for each consignment and are open with buyers about what can and cannot be verified for a specific lot." },
              { title: "Waste reduction", image: "/images/axis-fruit-cartons.webp", imageAlt: "Export cartons of fruit", text: "Accurate specifications, planned harvests and the right freight mode reduce rejections, spoilage and avoidable air miles." },
              { title: "Partnerships", image: "/images/farmer-basket.webp", imageAlt: "A grower carrying a harvest basket", text: "Steady demand and clear quality feedback help partner farms and cooperatives improve and grow." },
              { title: "Packaging", image: "/images/axis-fruit-cartons-stack.webp", imageAlt: "Stacked produce cartons", text: "We discuss right-sized and recyclable packaging options with buyers and pack-houses where practical." },
            ]}
          />
        </div>
      </section>

      <section className="section section--grey" style={{ textAlign: "center" }}>
        <div className="wrap wrap--narrow">
          <h2 className="h-lg">Our commitment</h2>
          <p className="center-text">
            Where a buyer needs certified sustainable supply — for example organic or a recognised scheme — we confirm whether genuinely certified product is available from a partner before quoting.
            Questions about sourcing practices for a specific product? Ask us and we will tell you what we know and how we know it.
          </p>
          <Link href="/contact" className="btn" style={{ marginTop: 10 }}>
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
