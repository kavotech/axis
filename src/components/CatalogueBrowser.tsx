"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useMemo, useState } from "react";
import { GROUPS, type GroupId } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { CutoutGrid } from "./ui";

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
      const hay = normalise([p.name, p.short, p.botanical ?? "", p.varieties.join(" "), p.origins.join(" "), p.grades.join(" ")].join(" "));
      return terms.every((t) => hay.includes(t));
    });
  }, [group, q]);

  const select = (g: GroupId | "all") => {
    setGroup(g);
    const sp = new URLSearchParams(params.toString());
    if (g === "all") sp.delete("category");
    else sp.set("category", g);
    router.replace(`/products${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  const sections = group === "all" && !q ? GROUPS.map((g) => ({ g, items: results.filter((p) => p.group === g.id) })) : [{ g: null, items: results }];

  return (
    <section className="product-range" style={{ paddingTop: 100 }}>
      <div className="wrap">
        <div className="tabs__list" role="toolbar" aria-label="Filter by category">
          <button type="button" className="tabs__btn" aria-pressed={group === "all"} onClick={() => select("all")}>
            All
          </button>
          {GROUPS.map((g) => (
            <button type="button" key={g.id} className="tabs__btn" aria-pressed={group === g.id} onClick={() => select(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        <div style={{ maxWidth: 420, margin: "0 auto 50px" }}>
          <label className="field">
            <span className="visually-hidden">Search products</span>
            <input className="input" type="search" placeholder="Search products, varieties or origins" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <p className="field__hint" aria-live="polite" style={{ textAlign: "center", marginTop: 8 }}>
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
        </div>
        {results.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <h2 className="h-lg">No products match &ldquo;{query}&rdquo;</h2>
            <p>Our partners can often source products that are not listed.</p>
            <Link href="/get-a-quote?product=other" className="btn">
              Request another product
            </Link>
          </div>
        ) : (
          sections.map(({ g, items }) => (
            <div key={g?.id ?? "results"} style={{ marginBottom: 70 }}>
              {g ? <h2 className="section-title section-title--center">{g.label}</h2> : null}
              <CutoutGrid products={items} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
