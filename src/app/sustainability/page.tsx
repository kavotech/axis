import Image from "next/image";
import { Icon, type IconName } from "@/components/Icon";
import { Band, CtaPanel, FeatureCard, PageHero, Reveal, SectionHead } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sustainability — Responsible Sourcing & Supply-Chain Transparency",
  description:
    "How Axis Agro approaches responsible sourcing, supply-chain transparency, waste reduction and long-term agricultural partnerships in Uganda and East Africa.",
  path: "/sustainability",
  image: "/images/farmer-field.webp",
});

const COMMITMENTS: { icon: IconName; title: string; text: string }[] = [
  { icon: "handshake", title: "Responsible sourcing", text: "We work with partners we know, agree fair commercial terms and favour long-term relationships that let growers plan." },
  { icon: "route", title: "Supply-chain transparency", text: "We share origin information for each consignment and are open with buyers about what can and cannot be verified." },
  { icon: "recycle", title: "Waste reduction", text: "Accurate specifications, planned harvests and the right freight mode reduce rejections, spoilage and avoidable air miles." },
  { icon: "users", title: "Agricultural partnerships", text: "Steady demand and clear quality feedback help partner farms and cooperatives improve and grow." },
  { icon: "box", title: "Packaging choices", text: "We discuss right-sized and recyclable packaging options with buyers and pack-houses where practical." },
  { icon: "calendar", title: "Programme planning", text: "Seasonal programmes matched to realistic yields avoid over-promising and last-minute substitutions." },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Trade that works for growers and buyers."
        intro="Responsible sourcing for us is practical: dependable relationships, honest information and less waste across the supply chain."
        image="/images/farmer-field.webp"
        imageAlt="A farmer tending crops in a green field"
        crumbs={[{ name: "Sustainability", href: "/sustainability" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our commitments" title="Six practical commitments" />
          <div className="grid grid-3">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.06}>
                <FeatureCard icon={c.icon} title={c.title} text={c.text} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Band icon="leaf" variant="botanical">
        Fewer rejections. Less spoilage. <em>Better partnerships.</em>
      </Band>

      <section className="section section--cream">
        <div className="container split">
          <Reveal>
            <div className="frame">
              <Image src="/images/farmer-basket.webp" alt="A grower in a field carrying a harvest basket" fill sizes="(max-width: 900px) 90vw, 45vw" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Honest by design</span>
            <h2>No unverified environmental claims.</h2>
            <p className="lead">We do not publish carbon figures, impact statistics or sustainability labels that we cannot evidence.</p>
            <p className="muted">
              Where a buyer needs certified sustainable supply — for example organic or a recognised sustainability scheme — we confirm whether genuinely certified product is available from a partner
              before quoting. Our aim is to improve year on year and report progress only when it can be substantiated.
            </p>
            <div className="note" style={{ marginTop: 24 }}>
              <Icon name="info" size={20} />
              <span>Questions about sourcing practices for a specific product? Ask us — we will tell you what we know and how we know it.</span>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaPanel image="/images/coffee-blossom.webp" title="Talk to us about responsible supply." />
    </>
  );
}
