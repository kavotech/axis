"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/data/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
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

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };
  const active = (href: string, children?: { href: string }[]) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/")) || !!children?.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"));

  return (
    <>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="wrap site-header__inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.label} className="nav__item" data-open={open === item.label} onMouseEnter={() => enter(item.label)} onMouseLeave={leave}>
                  <button
                    type="button"
                    className="nav__link"
                    aria-expanded={open === item.label}
                    aria-current={active(item.href, item.children) ? "page" : undefined}
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    onFocus={() => enter(item.label)}
                  >
                    {item.label} <Icon name="chevron" strokeWidth={5} />
                  </button>
                  <div className={item.wide ? "dropdown dropdown--wide" : "dropdown"}>
                    {item.children.map((c) => (
                      <Link key={c.href + c.label} href={c.href} aria-current={pathname === c.href ? "page" : undefined} tabIndex={open === item.label ? 0 : -1} onBlur={leave}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={item.label} className="nav__item">
                  <Link href={item.href} className="nav__link" aria-current={active(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                </div>
              ),
            )}
            <Link href="/get-a-quote" className="btn btn--sm nav__quote">
              Request a quote
            </Link>
          </nav>
          <button type="button" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "close" : "menu"} size={28} strokeWidth={3} />
          </button>
        </div>
      </header>

      <nav id="mobile-nav" className="mobile-nav" data-open={menuOpen} aria-label="Mobile" inert={!menuOpen}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {NAV.map((item) =>
            item.children ? (
              <li key={item.label}>
                <details>
                  <summary>
                    {item.label} <Icon name="chevron" size={14} strokeWidth={4} />
                  </summary>
                  <ul>
                    {item.children.map((c) => (
                      <li key={c.href + c.label}>
                        <Link href={c.href}>{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ) : (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ),
          )}
        </ul>
        <div className="mobile-nav__cta">
          <Link href="/get-a-quote" className="btn btn--block">
            Request a quote
          </Link>
        </div>
      </nav>
    </>
  );
}
