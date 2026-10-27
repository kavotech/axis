import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { JsonLd, PageHero } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Speak to Our Trading Team",
  description: "Contact Axis Agro International Ltd by email, phone or our enquiry form about fresh produce, coffee, cocoa and commodity supply.",
  path: "/contact",
  image: "/images/axis-mango-cartons.webp",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your supply."
        intro="Questions about products, availability, logistics or partnerships — our UK team will point you in the right direction."
        image="/images/axis-mango-cartons.webp"
        imageAlt="Mangoes packed in export cartons"
        crumbs={[{ name: "Contact", href: "/contact" }]}
        variant="short"
      />
      <section className="section section--cream">
        <div className="container detail-layout detail-layout--contact">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <span className="eyebrow">Get in touch</span>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>Direct lines to our team</h2>
            <a href={`mailto:${SITE.email}`} className="contact-card">
              <span className="icon-badge">
                <Icon name="mail" size={26} />
              </span>
              <span>
                <strong>Email</strong>
                <span>{SITE.email}</span>
              </span>
            </a>
            <a href={`tel:${SITE.phoneHref}`} className="contact-card">
              <span className="icon-badge">
                <Icon name="phone" size={26} />
              </span>
              <span>
                <strong>Phone &amp; WhatsApp</strong>
                <span>{SITE.phone}</span>
              </span>
            </a>
            <div className="contact-card">
              <span className="icon-badge">
                <Icon name="pin" size={26} />
              </span>
              <span>
                <strong>Registered office</strong>
                <span>United Kingdom — address available on request.</span>
              </span>
            </div>
            <div className="contact-card">
              <span className="icon-badge">
                <Icon name="globe" size={26} />
              </span>
              <span>
                <strong>Sourcing</strong>
                <span>Partners in Uganda and East Africa</span>
              </span>
            </div>
            <Link href="/get-a-quote" className="contact-card" style={{ background: "var(--forest-900)", borderColor: "var(--forest-900)" }}>
              <span className="icon-badge icon-badge--gold">
                <Icon name="document" size={26} />
              </span>
              <span>
                <strong style={{ color: "var(--white)" }}>Need a price?</strong>
                <span style={{ color: "rgb(255 255 255 / 0.7)" }}>Use the quotation form →</span>
              </span>
            </Link>
          </div>
          <ContactForm />
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE.url}/contact`,
          mainEntity: { "@id": `${SITE.url}/#organization` },
        }}
      />
    </>
  );
}
