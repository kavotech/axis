import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { Band, JsonLd, PageTop } from "@/components/ui";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Speak to Our Trading Team",
  description: "Contact Axis Agro International Ltd by email, phone or our enquiry form about fresh produce, coffee, cocoa and commodity supply.",
  path: "/contact",
  image: "/images/axis-mango-cartons.webp",
});

const initials = (n: string) =>
  n
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("");

export default function ContactPage() {
  return (
    <div className="accent-orange">
      <PageTop
        title="Contact"
        image="/images/mango-pile.webp"
        imageAlt="Pile of ripe mangoes"
        under="var(--orange)"
        crumbs={[{ name: "Contact", href: "/contact" }]}
        columns={[
          <p key="a">
            {SITE.legalName}
            <br />
            United Kingdom (registered office)
            <br />
            Address available on request
          </p>,
          <p key="b">
            T <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            <br />
            E <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            WhatsApp {SITE.phone}
          </p>,
          <p key="c">
            {SITE.registration}
            <br />
            Sourcing partners in Uganda &amp; East Africa
          </p>,
        ]}
      />

      <Band icon="mail" className="band--home" sub="Send a message below, or use the quotation form for detailed requirements">
        &lsquo;Let&rsquo;s start the conversation&rsquo;
      </Band>

      <section style={{ paddingTop: 70 }}>
        <details className="acc-row" open>
          <summary className="wrap">Directors</summary>
          <div className="wrap acc-row__body">
            <div className="people">
              {SITE.directors.map((d) => (
                <div className="person" key={d.name}>
                  <div className="person__photo" aria-hidden="true">
                    {initials(d.name)}
                  </div>
                  <h3>{d.name}</h3>
                  <p className="muted">{d.role}</p>
                  <p>{d.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </details>
        <details className="acc-row" open>
          <summary className="wrap">Send us a message</summary>
          <div className="wrap acc-row__body">
            <ContactForm />
          </div>
        </details>
        <details className="acc-row">
          <summary className="wrap">Quotations &amp; product enquiries</summary>
          <div className="wrap acc-row__body">
            <p>For pricing and availability, our quotation form captures product, grade, volume, packaging, freight and documentation requirements in one enquiry.</p>
            <Link href="/get-a-quote" className="btn">
              Request a quote
            </Link>
          </div>
        </details>
        <details className="acc-row">
          <summary className="wrap">Suppliers &amp; sourcing partners</summary>
          <div className="wrap acc-row__body">
            <p>
              Producers, cooperatives and processors in East Africa interested in supplying international markets can write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with details of their
              products, volumes and certifications.
            </p>
          </div>
        </details>
        <details className="acc-row">
          <summary className="wrap">Logistics &amp; documentation</summary>
          <div className="wrap acc-row__body">
            <p>
              Questions about an existing shipment, documents or delivery? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your enquiry reference, or call {SITE.phone}.
            </p>
          </div>
        </details>
      </section>

      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${SITE.url}/contact`, mainEntity: { "@id": `${SITE.url}/#organization` } }} />
    </div>
  );
}
