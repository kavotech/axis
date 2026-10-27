import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { SITE } from "@/data/site";
import { CookieSettingsButton } from "./CookieConsent";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo light />
            <p>{SITE.description}</p>
          </div>
          <div>
            <h3>Products</h3>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/origins">Our origins</Link></li>
              <li><Link href="/quality">Quality &amp; compliance</Link></li>
              <li><Link href="/sustainability">Sustainability</Link></li>
              <li><Link href="/insights">News &amp; insights</Link></li>
            </ul>
          </div>
          <div>
            <h3>Trade</h3>
            <ul>
              <li><Link href="/services">Import &amp; export</Link></li>
              <li><Link href="/industries">Industries we supply</Link></li>
              <li><Link href="/get-a-quote">Request a quote</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-contact-col">
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              </li>
              <li>
                <Icon name="pin" size={16} />
                <span>United Kingdom (registered office)<br />Sourcing partners in Uganda &amp; East Africa</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer-tagline">
          Fresh Ugandan produce. <span>Packed. Certified. Delivered worldwide.</span>
        </p>
        <div className="footer-bottom">
          <span>
            © {year} {SITE.legalName}. {SITE.registration}.
          </span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cookies">Cookies</Link>
            <CookieSettingsButton />
            <Link href="/sitemap.xml">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
