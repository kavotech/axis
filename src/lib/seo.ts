import type { Metadata } from "next";
import { SITE } from "@/data/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/axis-avocado-boxes.webp",
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: "en_GB",
      images: [{ url: image, width: 1600, height: 1067, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: SITE.shortName,
  url: SITE.url,
  logo: `${SITE.url}/brand/axis-logo.png`,
  email: SITE.email,
  telephone: SITE.phoneHref,
  description: SITE.description,
  slogan: SITE.tagline,
  foundingDate: SITE.founded,
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  areaServed: ["GB", "Europe", "Middle East", "International"],
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", email: SITE.email, telephone: SITE.phoneHref, availableLanguage: ["English"], areaServed: "Worldwide" },
  ],
};
