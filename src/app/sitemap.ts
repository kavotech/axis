import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/data/categories";
import { INSIGHTS } from "@/data/content";
import { INFO_PAGES } from "@/data/pages";
import { LEADERS } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/products", 0.9, "weekly"),
    page("/get-a-quote", 0.9),
    ...CATEGORIES.map((c) => page(`/products/${c.slug}`, 0.8)),
    ...CATEGORIES.flatMap((c) => c.subcategories.map((sc) => page(`/products/${c.slug}/${sc.slug}`, 0.75))),
    ...INFO_PAGES.map((p) => page(p.path, 0.6)),
    page("/company/directors", 0.7),
    ...LEADERS.map((l) => page(`/company/directors/${l.slug}`, 0.5)),
    ...PRODUCTS.map((p) => page(`/products/${p.slug}`, 0.7)),
    page("/about", 0.7),
    page("/services", 0.7),
    page("/origins", 0.7),
    page("/quality", 0.6),
    page("/industries", 0.6),
    page("/sustainability", 0.5),
    page("/insights", 0.5, "weekly"),
    ...INSIGHTS.map((i) => page(`/insights/${i.slug}`, 0.5)),
    page("/contact", 0.6),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/cookies", 0.2, "yearly"),
  ];
}
