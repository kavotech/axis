import type { Category, CategorySlug } from "@/data/categories";
import { productsInGroups } from "@/data/products";
import { SITE } from "@/data/site";
import { CtaBand, CutoutGrid, JsonLd, PageTop } from "./ui";

export const CATEGORY_ACCENT: Record<CategorySlug, string> = {
  "fresh-fruits": "accent-leaf",
  "vegetables-roots": "accent-orange",
  "herbs-spices": "accent-orange",
  coffee: "accent-earth",
  cocoa: "accent-cocoa",
  "oilseeds-nuts": "accent-gold",
  "dried-processed": "accent-gold",
};

export function CategoryView({ category }: { category: Category }) {
  const products = productsInGroups(category.groups);
  return (
    <div className={CATEGORY_ACCENT[category.slug]}>
      <PageTop
        variant="filled"
        title={category.name}
        image={category.image}
        imageAlt={category.imageAlt}
        under="#fff"
        crumbs={[
          { name: "Products", href: "/products" },
          { name: category.name, href: `/products/${category.slug}` },
        ]}
        left={<p>{category.intro}</p>}
        right={
          <>
            <p>{category.logistics[0]}</p>
            <p>Please feel free to contact us — specifications, volumes and availability are confirmed for every enquiry.</p>
          </>
        }
      />

      <section className="product-range">
        <div className="wrap">
          <CutoutGrid products={products} />
        </div>
      </section>

      <CtaBand href={`/get-a-quote?product=${products[0]?.slug ?? ""}`}>
        &lsquo;Let&rsquo;s talk about your {category.name.toLowerCase()} requirements&rsquo;
      </CtaBand>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seoDescription,
          url: `${SITE.url}/products/${category.slug}`,
          hasPart: products.map((p) => ({ "@type": "Product", name: p.name, url: `${SITE.url}/products/${p.slug}` })),
        }}
      />
    </div>
  );
}
