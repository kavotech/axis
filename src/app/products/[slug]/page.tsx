import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/CategoryView";
import { ProductView } from "@/components/ProductView";
import { CATEGORIES, categoryBySlug } from "@/data/categories";
import { PRODUCTS, productBySlug } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return [...CATEGORIES.map((c) => ({ slug: c.slug })), ...PRODUCTS.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (category) return pageMetadata({ title: category.seoTitle, description: category.seoDescription, path: `/products/${slug}`, image: category.image });
  const product = productBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: `${product.name} — Wholesale Supply from ${product.origins[0]}`,
    description: `${product.short} Grades, origin, packaging and logistics for wholesale and import buyers. Request a quote from Axis Agro International.`.slice(0, 300),
    path: `/products/${slug}`,
    image: product.image,
  });
}

export default async function ProductOrCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (category) return <CategoryView category={category} />;
  const product = productBySlug(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
