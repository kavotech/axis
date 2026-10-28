import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { SITE } from "@/data/site";
import { CookieSettingsButton } from "./CookieConsent";
import { Icon } from "./Icon";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Company",
    links: [
      ["About Axis Agro", "/about"],
      ["Our Story", "/company/our-story"],
      ["Our Directors", "/company/directors"],
      ["Our Values", "/company/our-values"],
      ["Our Network", "/company/our-network"],
      ["Sustainability", "/sustainability"],
    ],
  },
  {
    title: "Import & Export Services",
    links: [
      ["Import & Export", "/services"],
      ["Wholesale Supply", "/buyers/wholesale-supply"],
      ["Air Freight", "/logistics/air-freight"],
      ["Sea Freight", "/logistics/sea-freight"],
      ["Cold Chain", "/logistics/cold-chain"],
      ["Quality & Compliance", "/quality"],
      ["Become a Supplier", "/sourcing/become-a-supplier"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["FAQ", "/resources/faq"],
      ["Product Specifications", "/resources/product-specifications"],
      ["Incoterms", "/resources/incoterms"],
      ["Shipping Guide", "/resources/shipping-guide"],
      ["Seasonality", "/resources/seasonality"],
      ["Insights", "/insights"],
      ["How to Order", "/buyers/how-to-order"],
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top footer-top--wide">
          <div>
            <h2>About Axis Agro</h2>
            <p>{SITE.description}</p>
            <div className="footer-social" style={{ marginTop: 14 }}>
              <a href={`mailto:${SITE.emails.general}`} aria-label="Email Axis Agro">
                <Icon name="mail" strokeWidth={4} />
              </a>
              <a href={`tel:${SITE.phoneHref}`} aria-label="Call Axis Agro">
                <Icon name="phone" strokeWidth={4} />
              </a>
              <Link href="/get-a-quote" aria-label="Request a quote">
                <Icon name="document" strokeWidth={4} />
              </Link>
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2>Products</h2>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`}>{c.shortName}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul className="footer-emails">
              <li>
                General enquiries
                <br />
                <a href={`mailto:${SITE.emails.general}`}>{SITE.emails.general}</a>
              </li>
              <li>
                Uganda operations &amp; sourcing
                <br />
                <a href={`mailto:${SITE.emails.uganda}`}>{SITE.emails.uganda}</a>
              </li>
              <li>
                Logistics &amp; operations
                <br />
                <a href={`mailto:${SITE.emails.operations}`}>{SITE.emails.operations}</a>
              </li>
              <li>
                Director — UK operations
                <br />
                <a href={`mailto:${SITE.emails.director}`}>{SITE.emails.director}</a>
              </li>
              <li>
                T: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          Copyright © {year} {SITE.legalName}. {SITE.registration}.
        </span>
        <nav aria-label="Legal">
          <Link href="/contact">Contact</Link>
          <Link href="/get-a-quote">Get a quote</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <CookieSettingsButton />
        </nav>
      </div>
    </footer>
  );
}
