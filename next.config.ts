import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 2000],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Preserve links from the previous static site.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/sourcing", destination: "/origins", permanent: true },
      { source: "/sourcing.html", destination: "/origins", permanent: true },
      { source: "/export-import", destination: "/services", permanent: true },
      { source: "/export-import.html", destination: "/services", permanent: true },
      { source: "/products/avocados", destination: "/products/hass-avocado", permanent: true },
      { source: "/products/fruits", destination: "/products/fresh-fruits", permanent: true },
      { source: "/products/grains", destination: "/products/oilseeds-nuts", permanent: true },
      { source: "/products/other-produce", destination: "/products/herbs-spices", permanent: true },
      { source: "/products/:slug.html", destination: "/products/:slug", permanent: true },
      { source: "/quote", destination: "/get-a-quote", permanent: true },
    ];
  },
};

export default nextConfig;
