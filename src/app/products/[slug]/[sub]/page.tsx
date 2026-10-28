import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubcategoryView } from "@/components/CategoryView";
import { CATEGORIES, categoryBySlug } from "@/data/categories";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string; sub: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return CATEGORIES.flatMap((c) => c.subcategories.map((s) => ({ slug: c.slug, sub: s.slug })));
}

const find = (p: Params) => {
  const category = categoryBySlug(p.slug);
  const sub = category?.subcategories.find((s) => s.slug === p.sub);
  return category && sub ? { category, sub } : null;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const f = find(await params);
  if (!f) return {};
  return pageMetadata({
    title: `${f.sub.name} — ${f.category.name} from Uganda`,
    description: `${f.sub.intro} Specifications, packaging, logistics and quotations from Axis Agro International.`,
    path: `/products/${f.category.slug}/${f.sub.slug}`,
    image: f.sub.image,
  });
}

export default async function SubcategoryPage({ params }: { params: Promise<Params> }) {
  const f = find(await params);
  if (!f) notFound();
  return <SubcategoryView category={f.category} sub={f.sub} />;
}
