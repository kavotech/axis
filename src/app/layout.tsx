import type { Metadata, Viewport } from "next";
import { Figtree, Nunito_Sans } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { ToastProvider } from "@/components/Toast";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", weight: ["500", "600", "800", "900"], display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", weight: ["400", "600", "700", "800"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Axis Agro International Ltd — Fresh Produce Importer & Exporter, UK",
    template: "%s | Axis Agro International",
  },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${figtree.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JavaScript runs. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ToastProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CookieConsent />
        </ToastProvider>
        <RevealObserver />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
