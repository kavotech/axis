import { Suspense } from "react";
import { CatalogueBrowser } from "@/components/CatalogueBrowser";
import { CtaBand, JsonLd, PageTop } from "@/components/ui";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product Catalogue — Fresh Produce, Coffee, Cocoa & Commodities",
  description:
    "Axis Agro's catalogue of fresh fruits, vegetables, roots and tubers, herbs and spices, Uganda green coffee, cocoa, oilseeds, nuts and dried products for wholesale buyers.",
  path: "/products",
  image: "/images/tropical-mix.webp",
});

export default function ProductsPage() {
  return (
    <div className="accent-leaf">
      <PageTop
        variant="filled"
        title="Our products"
        image="/images/tropical-mix.webp"
        imageAlt="Assorted tropical fruits"
        under="#fff"
        crumbs={[{ name: "Products", href: "/products" }]}
        left={<p>Fresh produce and agricultural commodities sourced through trusted partners in Uganda and East Africa, for wholesale buyers in the UK and international markets.</p>}
        right={<p>Search the range or browse by category. Every product page links straight to a quotation with the product pre-selected.</p>}
      />
      <Suspense fallback={<div className="wrap section">Loading catalogue…</div>}>
        <CatalogueBrowser />
      </Suspense>
      <CtaBand href="/get-a-quote?product=other">&lsquo;Can&rsquo;t see what you need? Our partners can often source it&rsquo;</CtaBand>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Axis Agro product catalogue",
          itemListElement: PRODUCTS.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/products/${p.slug}`, name: p.name })),
        }}
      />
    </div>
  );
}
