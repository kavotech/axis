"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV, SITE } from "@/data/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close menus on navigation (adjusting state during render, per React guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.body.dataset.menuOpen = String(menuOpen);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  const isActive = (href: string, children?: { href: string }[]) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/")) || !!children?.some((c) => pathname === c.href);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span className="topbar__tag">{SITE.tagline}</span>
          <div className="topbar__contact">
            <a href={`tel:${SITE.phoneHref}`}>
              <Icon name="phone" size={14} /> {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`}>
              <Icon name="mail" size={14} /> {SITE.email}
            </a>
          </div>
        </div>
      </div>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="container site-header__inner">
          <Logo />
          <nav className="nav" aria-label="Main" ref={navRef}>
            {NAV.map((item) => (
              <div
                key={item.label}
                className="nav__item"
                data-open={open === item.label}
                onMouseEnter={() => enter(item.label)}
                onMouseLeave={leave}
              >
                <button
                  type="button"
                  className="nav__link"
                  aria-expanded={open === item.label}
                  aria-controls={`menu-${item.label}`}
                  aria-current={isActive(item.href, item.children) ? "page" : undefined}
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                >
                  {item.label} <Icon name="chevron" size={14} strokeWidth={3} />
                </button>
                <div
                  id={`menu-${item.label}`}
                  className={`dropdown${(item.children?.length ?? 0) > 4 ? " dropdown--wide" : ""}`}
                  onFocus={() => enter(item.label)}
                >
                  {item.children?.map((c) => (
                    <Link key={c.href + c.label} href={c.href} tabIndex={open === item.label ? 0 : -1}>
                      <strong>{c.label}</strong>
                      {c.description ? <span>{c.description}</span> : null}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/contact" className="nav__link" aria-current={pathname === "/contact" ? "page" : undefined}>
              Contact
            </Link>
          </nav>
          <div className="header-actions">
            <Link href="/get-a-quote" className="btn btn--sm">
              Request a Quote
            </Link>
            <button type="button" className="menu-toggle" aria-label="Open menu" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(true)}>
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav" className="mobile-nav" data-open={menuOpen} role="dialog" aria-modal="true" aria-label="Menu" inert={!menuOpen}>
        <div className="mobile-nav__head">
          <Logo light />
          <button type="button" className="mobile-nav__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="mobile-nav__body">
          <Link href="/" className="mobile-nav__single">
            Home
          </Link>
          {NAV.map((item) => (
            <details key={item.label}>
              <summary>
                {item.label} <Icon name="chevron" size={20} />
              </summary>
              <ul>
                {item.children?.map((c) => (
                  <li key={c.href + c.label}>
                    <Link href={c.href}>{c.label}</Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <Link href="/contact" className="mobile-nav__single">
            Contact
          </Link>
        </div>
        <div className="mobile-nav__foot">
          <Link href="/get-a-quote" className="btn btn--gold btn--block">
            Request a Quote <Icon name="arrow" size={18} />
          </Link>
          <a href={`tel:${SITE.phoneHref}`}>
            <Icon name="phone" size={16} /> {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`}>
            <Icon name="mail" size={16} /> {SITE.email}
          </a>
        </div>
      </div>
    </>
  );
}
