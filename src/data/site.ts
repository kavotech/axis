import type { IconName } from "@/components/Icon";

export type Leader = {
  slug: string;
  name: string;
  role: string;
  /** Short label used on cards. */
  short: string;
  email: string;
  summary: string;
  bio: string[];
  responsibilities: string[];
  expertise: string[];
  icon: IconName;
};

export const LEADERS: Leader[] = [
  {
    slug: "oliver-alinaitwe",
    name: "Oliver Amanya Alinaitwe",
    role: "Founder & Head of UK Operations — Axis Agro International Ltd",
    short: "Founder & Head of UK Operations",
    email: "oliver@axisagro.co.uk",
    summary: "Connects Axis Agro's sourcing operations in Uganda with buyers in the United Kingdom and international markets.",
    bio: [
      "Oliver founded Axis Agro International to give UK and international buyers a direct, accountable link to Ugandan produce. From the United Kingdom he leads the company's commercial operations — building relationships with importers, wholesalers, distributors and food businesses, and making sure each enquiry is matched to what partners in Uganda can genuinely supply.",
      "His work sits at the point where origin meets market: translating buyer specifications into sourcing requirements, agreeing commercial terms and Incoterms, and coordinating documentation, freight and delivery with logistics partners. He also leads the company's strategic partnerships and its digital presence, so that buyers can find, specify and request products easily.",
      "Oliver's focus is long-term trade relationships built on clear communication and honest information about availability, quality and timing.",
    ],
    responsibilities: [
      "UK business development",
      "International buyer relationships",
      "Strategic partnerships",
      "UK commercial operations",
      "Market expansion",
      "International trade coordination",
      "Digital business development",
    ],
    expertise: ["Buyer specifications and commercial terms", "Import and export coordination", "Trade documentation and compliance coordination", "Partnership development between the UK and Uganda"],
    icon: "globe",
  },
  {
    slug: "micah-bamutura",
    name: "Micah Bamutura",
    role: "Strategic Agricultural Sourcing & Uganda Operations",
    short: "Sourcing & Uganda Operations",
    email: "uganda@axisagro.co.uk",
    summary: "Leads Axis Agro's agricultural sourcing and operations on the ground in Uganda.",
    bio: [
      "Micah leads Axis Agro's sourcing and operations in Uganda. He works directly with producers, cooperatives, aggregators and exporters to identify supply that can meet buyers' specifications, and he maintains the day-to-day relationships that make reliable sourcing possible.",
      "His role is practical and hands-on: coordinating coffee and commodity procurement, checking quality and grading at origin, organising local export preparation, and liaising with suppliers and logistics providers so that consignments are packed, documented and moved on time.",
      "Micah's knowledge of Ugandan agricultural supply chains — from smallholder farms to export warehouses — is central to how Axis Agro confirms what can be supplied before it is promised to a buyer.",
    ],
    responsibilities: [
      "Uganda agricultural sourcing",
      "Producer and supplier relationships",
      "Coffee and commodity procurement",
      "Quality coordination",
      "Local export preparation",
      "Agricultural supply-chain operations",
      "Supplier and logistics coordination",
    ],
    expertise: ["Ugandan coffee and commodity supply chains", "Grading and quality checks at origin", "Supplier relationship management", "Export preparation and inland logistics"],
    icon: "sourcing",
  },
];

export const SITE = {
  name: "Axis Agro International Ltd",
  legalName: "Axis Agro International Limited",
  shortName: "Axis Agro",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.axisagro.co.uk").replace(/\/$/, ""),
  tagline: "Your Direct Link for Ugandan Fresh Produce in the UK Market.",
  secondaryTagline: "Fresh Ugandan Produce. Packed. Certified. Delivered Worldwide.",
  description:
    "Axis Agro International Ltd is a UK-based importer, exporter and wholesale supplier of fresh produce and agricultural commodities, sourcing through trusted partners in Uganda and East Africa for buyers in the UK and international markets.",
  email: "info@axisagro.co.uk",
  emails: {
    general: "info@axisagro.co.uk",
    uganda: "uganda@axisagro.co.uk",
    operations: "operations@axisagro.co.uk",
    director: "oliver@axisagro.co.uk",
  },
  phone: "+44 7418 354137",
  phoneHref: "+447418354137",
  // The previous site states the registered office address is available on request.
  registeredOffice: "United Kingdom — registered office address available on request",
  registration: "Registered in England & Wales",
  founded: "2022",
  /** Kept for existing components; see LEADERS for full profiles. */
  directors: LEADERS.map((l) => ({ name: l.name, role: l.short, bio: l.summary })),
  sourcingPartners: [
    { name: "Afrilia Agro Uganda Limited", url: "https://www.afriliaagro.com" },
    { name: "Triport Agro International Limited", url: "https://www.triportagro.com" },
  ],
} as const;

export const CONTACT_DIRECTORY: { title: string; email: string; text: string; icon: IconName }[] = [
  { title: "General enquiries", email: SITE.emails.general, text: "Product questions, quotations and anything else.", icon: "mail" },
  { title: "Uganda operations & sourcing", email: SITE.emails.uganda, text: "Suppliers, producers and sourcing in Uganda.", icon: "sourcing" },
  { title: "Logistics & international operations", email: SITE.emails.operations, text: "Shipments, documentation and freight.", icon: "ship" },
  { title: "Director — UK operations", email: SITE.emails.director, text: "Strategic partnerships and senior commercial matters.", icon: "handshake" },
];

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  /** Mega-menu: render children in columns. */
  wide?: boolean;
  children?: { label: string; href: string; description?: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Axis Agro", href: "/about" },
      { label: "Our Story", href: "/company/our-story" },
      { label: "Our Directors", href: "/company/directors" },
      { label: "Our Values", href: "/company/our-values" },
      { label: "Our Network", href: "/company/our-network" },
      { label: "Why Axis Agro", href: "/company/why-axis-agro" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    wide: true,
    children: [
      { label: "All products", href: "/products" },
      { label: "Fruits", href: "/products/fruits" },
      { label: "Vegetables", href: "/products/vegetables" },
      { label: "Roots & Tubers", href: "/products/roots-tubers" },
      { label: "Herbs & Spices", href: "/products/herbs-spices" },
      { label: "Coffee", href: "/products/coffee" },
      { label: "Cocoa", href: "/products/cocoa" },
      { label: "Oilseeds", href: "/products/oilseeds" },
      { label: "Grains & Pulses", href: "/products/grains-pulses" },
      { label: "Nuts", href: "/products/nuts" },
      { label: "Dried Products", href: "/products/dried-products" },
    ],
  },
  {
    label: "Sourcing",
    href: "/sourcing",
    children: [
      { label: "Sourcing overview", href: "/sourcing" },
      { label: "Uganda", href: "/sourcing/uganda" },
      { label: "Our Farmers", href: "/sourcing/our-farmers" },
      { label: "Traceability", href: "/sourcing/traceability" },
      { label: "Supplier Standards", href: "/sourcing/supplier-standards" },
      { label: "Become a Supplier", href: "/sourcing/become-a-supplier" },
      { label: "Our Origins", href: "/origins" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    wide: true,
    children: [
      { label: "Import & Export", href: "/services" },
      { label: "Wholesale Supply", href: "/buyers/wholesale-supply" },
      { label: "Importing to the UK", href: "/logistics/importing-to-uk" },
      { label: "Logistics overview", href: "/logistics" },
      { label: "Air Freight", href: "/logistics/air-freight" },
      { label: "Sea Freight", href: "/logistics/sea-freight" },
      { label: "Cold Chain", href: "/logistics/cold-chain" },
      { label: "Packaging", href: "/logistics/packaging" },
      { label: "Export Documentation", href: "/logistics/export-documentation" },
      { label: "Quality & Compliance", href: "/quality" },
      { label: "For Buyers", href: "/buyers" },
      { label: "Industries We Supply", href: "/industries" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Resources hub", href: "/resources" },
      { label: "FAQ", href: "/resources/faq" },
      { label: "Product Specifications", href: "/resources/product-specifications" },
      { label: "Incoterms", href: "/resources/incoterms" },
      { label: "Shipping Guide", href: "/resources/shipping-guide" },
      { label: "Seasonality", href: "/resources/seasonality" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    children: [
      { label: "Contact details", href: "/contact" },
      { label: "Get a Quote", href: "/get-a-quote" },
      { label: "How to Order", href: "/buyers/how-to-order" },
    ],
  },
];
