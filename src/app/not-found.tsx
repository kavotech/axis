import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center", padding: "140px 0" }}>
      <div className="wrap wrap--narrow">
        <span className="icon-badge icon-badge--lg" style={{ margin: "0 auto 24px" }}>
          <Icon name="leaf" size={44} />
        </span>
        <p className="muted">404</p>
        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}>This page has gone out of season.</h1>
        <p className="lead">The page you are looking for may have moved. Try our catalogue or get in touch.</p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: 28 }}>
          <Link href="/" className="btn">
            Home
          </Link>
          <Link href="/products" className="btn btn--outline">
            Products
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
