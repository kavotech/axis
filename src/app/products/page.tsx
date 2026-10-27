import { Suspense } from "react";
import { CatalogueBrowser } from "@/components/CatalogueBrowser";
import { CtaPanel, JsonLd, PageHero } from "@/components/ui";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product Catalogue — Fresh Produce, Coffee, Cocoa & Commodities",
  description:
    "Search Axis Agro's catalogue of fresh fruits, vegetables, roots and tubers, herbs and spices, Uganda green coffee, cocoa, oilseeds, nuts and dried products for wholesale buyers.",
  path: "/products",
  image: "/images/tropical-mix.webp",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our product catalogue"
        intro="Fresh produce and agricultural commodities sourced through trusted partners in Uganda and East Africa. Search, filter by category and request a quote on any line."
        image="/images/tropical-mix.webp"
        imageAlt="Assorted tropical fruits including papaya, pineapple, citrus and avocado"
        crumbs={[{ name: "Products", href: "/products" }]}
        eyebrow="Products"
        variant="short"
      />
      <Suspense fallback={<div className="container section">Loading catalogue…</div>}>
        <CatalogueBrowser />
      </Suspense>
      <CtaPanel title="Can't see the product you need?" text="Our sourcing partners can often supply lines that are not listed. Tell us the product, specification and volume and we will check availability." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Axis Agro product catalogue",
          itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/products/${p.slug}`, name: p.name })),
        }}
      />
    </>
  );
}
