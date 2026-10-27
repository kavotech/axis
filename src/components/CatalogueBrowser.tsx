"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { GROUPS, type GroupId } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { Icon } from "./Icon";
import { ProductCard } from "./ui";

const normalise = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

export function CatalogueBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = (params.get("category") as GroupId | null) ?? "all";
  const [group, setGroup] = useState<GroupId | "all">(GROUPS.some((g) => g.id === initial) ? initial : "all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const q = useDeferredValue(query);

  const results = useMemo(() => {
    const terms = normalise(q).split(/\s+/).filter(Boolean);
    return PRODUCTS.filter((p) => {
      if (group !== "all" && p.group !== group) return false;
      if (!terms.length) return true;
      const hay = normalise([p.name, p.short, p.botanical ?? "", p.varieties.join(" "), p.origins.join(" "), p.grades.join(" "), p.group].join(" "));
      return terms.every((t) => hay.includes(t));
    });
  }, [group, q]);

  const counts = useMemo(() => Object.fromEntries(GROUPS.map((g) => [g.id, PRODUCTS.filter((p) => p.group === g.id).length])), []);

  const select = (g: GroupId | "all") => {
    setGroup(g);
    const sp = new URLSearchParams(params.toString());
    if (g === "all") sp.delete("category");
    else sp.set("category", g);
    router.replace(`/products${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  const grouped = group === "all" && !q ? GROUPS.map((g) => ({ g, items: results.filter((p) => p.group === g.id) })).filter((x) => x.items.length) : null;

  return (
    <>
      <div className="catalogue-bar">
        <div className="container catalogue-bar__inner">
          <label className="search">
            <span className="visually-hidden">Search products</span>
            <Icon name="search" size={18} />
            <input type="search" placeholder="Search products, varieties or origins" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <span className="muted" aria-live="polite" style={{ fontSize: "0.9rem" }}>
            {results.length} {results.length === 1 ? "product" : "products"}
          </span>
          <div className="tabs" role="toolbar" aria-label="Filter by category">
            <button type="button" className="tab" aria-pressed={group === "all"} onClick={() => select("all")}>
              <Icon name="globe" size={18} /> All <span className="tab__count">{PRODUCTS.length}</span>
            </button>
            {GROUPS.map((g) => (
              <button type="button" key={g.id} className="tab" aria-pressed={group === g.id} onClick={() => select(g.id)}>
                <Icon name={g.icon} size={18} /> {g.label} <span className="tab__count">{counts[g.id]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: "var(--section)" }}>
        {results.length === 0 ? (
          <div className="catalogue-empty">
            <h2 style={{ fontSize: "1.8rem" }}>No products match &ldquo;{query}&rdquo;</h2>
            <p className="muted">Our partners can often source products not listed here. Tell us what you need.</p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <button type="button" className="btn btn--outline" onClick={() => { setQuery(""); select("all"); }}>
                Clear filters
              </button>
              <a href="/get-a-quote?product=other" className="btn">
                Request another product
              </a>
            </div>
          </div>
        ) : grouped ? (
          grouped.map(({ g, items }) => (
            <section key={g.id} className="catalogue-group" aria-labelledby={`g-${g.id}`}>
              <div className="catalogue-group__head">
                <h2 id={`g-${g.id}`}>
                  <span className="icon-badge" style={{ width: 52, height: 52 }}>
                    <Icon name={g.icon} size={24} />
                  </span>
                  {g.label}
                </h2>
                <button type="button" className="link-arrow" style={{ background: "none", border: 0, cursor: "pointer" }} onClick={() => select(g.id)}>
                  Show only {g.label.toLowerCase()} <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="product-grid">
                {items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="product-grid">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
