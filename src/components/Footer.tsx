import Link from "next/link";
import { INSIGHTS } from "@/data/content";
import { SITE } from "@/data/site";
import { CookieSettingsButton } from "./CookieConsent";
import { Icon } from "./Icon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <h2>About Axis Agro</h2>
            <p>{SITE.description}</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              {SITE.legalName}
              <br />
              United Kingdom (registered office)
              <br />
              Address available on request
            </p>
            <p>
              T: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
              <br />
              E: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
          <div>
            <div className="footer-block">
              <h2>Service</h2>
              <ul>
                <li><Link href="/get-a-quote">Request a quote</Link></li>
                <li><Link href="/contact">Contact our team</Link></li>
                <li><Link href="/terms">Terms of use</Link></li>
                <li><Link href="/privacy">Privacy statement</Link></li>
              </ul>
            </div>
            <div className="footer-block">
              <h2>Insights</h2>
              <ul>
                {INSIGHTS.slice(0, 2).map((i) => (
                  <li key={i.slug}>
                    <Link href={`/insights/${i.slug}`}>{i.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2>Get in touch</h2>
            <div className="footer-social">
              <a href={`mailto:${SITE.email}`} aria-label="Email Axis Agro">
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
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          Copyright © {year} {SITE.legalName}. {SITE.registration}.
        </span>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <CookieSettingsButton />
        </nav>
      </div>
    </footer>
  );
}
