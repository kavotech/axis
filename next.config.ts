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
      { source: "/sourcing.html", destination: "/sourcing", permanent: true },
      { source: "/export-import", destination: "/services", permanent: true },
      { source: "/export-import.html", destination: "/services", permanent: true },
      { source: "/products/avocados", destination: "/products/fruits/avocados", permanent: true },
      { source: "/products/fresh-fruits", destination: "/products/fruits", permanent: true },
      { source: "/products/vegetables-roots", destination: "/products/roots-tubers", permanent: true },
      { source: "/products/oilseeds-nuts", destination: "/products/oilseeds", permanent: true },
      { source: "/products/dried-processed", destination: "/products/dried-products", permanent: true },
      { source: "/products/grains", destination: "/products/grains-pulses", permanent: true },
      { source: "/products/other-produce", destination: "/products/herbs-spices", permanent: true },
      { source: "/products/:slug.html", destination: "/products/:slug", permanent: true },
      { source: "/quote", destination: "/get-a-quote", permanent: true },
      { source: "/buyers/request-a-quote", destination: "/get-a-quote", permanent: true },
      { source: "/resources/insights", destination: "/insights", permanent: true },
      { source: "/resources/insights/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/company", destination: "/about", permanent: false },
    ];
  },
};

export default nextConfig;
