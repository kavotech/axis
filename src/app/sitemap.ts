import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { INSIGHTS } from "@/data/content";
import { INFO_PAGES } from "@/data/pages";
import { PRODUCTS } from "@/data/products";
import { LEADERS, SITE } from "@/data/site";

/**
 * When each group of pages last changed meaningfully. Search engines only trust
 * <lastmod> if it is accurate, so update the matching date when editing content
 * instead of stamping every page with the build time.
 */
const UPDATED = {
  catalogue: "2026-10-28",
  company: "2026-10-28",
  directors: "2026-11-04",
  insights: "2026-10-27",
  legal: "2026-10-28",
};

type Freq = "weekly" | "monthly" | "yearly";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified: string, changeFrequency: Freq = "monthly", image?: string | (string | undefined)[]) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    images: [image]
      .flat()
      .filter((i): i is string => Boolean(i))
      .map((i) => `${SITE.url}${i}`),
  });
  const { catalogue, company, directors, insights, legal } = UPDATED;
  return [
    page("", 1, company, "weekly"),
    page("/products", 0.9, catalogue, "weekly"),
    page("/get-a-quote", 0.9, company),
    ...CATEGORIES.map((c) => page(`/products/${c.slug}`, 0.8, catalogue, "monthly", c.image)),
    ...CATEGORIES.flatMap((c) => c.subcategories.map((sc) => page(`/products/${c.slug}/${sc.slug}`, 0.75, catalogue))),
    ...PRODUCTS.map((p) => page(`/products/${p.slug}`, 0.7, catalogue, "monthly", p.image)),
    ...INFO_PAGES.map((p) => page(p.path, 0.6, company, "monthly", p.image)),
    page("/company/directors", 0.7, directors, "monthly", LEADERS.map((l) => l.photo)),
    ...LEADERS.map((l) => page(`/company/directors/${l.slug}`, 0.6, directors, "monthly", l.photo)),
    page("/about", 0.7, company),
    page("/services", 0.7, company),
    page("/origins", 0.7, company),
    page("/quality", 0.6, company),
    page("/industries", 0.6, company),
    page("/sustainability", 0.5, company),
    page("/insights", 0.5, insights, "weekly"),
    ...INSIGHTS.map((i) => page(`/insights/${i.slug}`, 0.5, insights, "monthly", i.image)),
    page("/contact", 0.6, company),
    page("/privacy", 0.2, legal, "yearly"),
    page("/terms", 0.2, legal, "yearly"),
    page("/cookies", 0.2, legal, "yearly"),
  ];
}
