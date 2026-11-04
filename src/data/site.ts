import type { IconName } from "@/components/Icon";

export type Leader = {
  slug: string;
  name: string;
  role: string;
  /** Short label used on cards. */
  short: string;
  email: string;
  summary: string;
  /** Biography paragraphs. Any occurrence of `highlight` is rendered in bold. */
  bio: string[];
  highlight?: string;
  quote?: string;
  /** Key facts for the "At a glance" panel. */
  facts: [string, string][];
  /** Heading for the main list (defaults to "Areas of responsibility"). */
  listTitle?: string;
  responsibilities: string[];
  /** Heading for the second list (defaults to "Areas of expertise"). */
  list2Title?: string;
  expertise: string[];
  values: { title: string; text: string; icon: IconName }[];
  /** Transparent cut-out photo (hero) and square head-and-shoulders crop (cards). */
  photo?: string;
  photoSquare?: string;
  icon: IconName;
};

export const LEADERS: Leader[] = [
  {
    slug: "oliver-alinaitwe",
    name: "Oliver Amanya Alinaitwe",
    role: "Founder | Axis Agro International Ltd",
    short: "Founder",
    email: "oliver@axisagro.co.uk",
    summary:
      "A young British-born entrepreneur and the Founder of Axis Agro International Ltd, driven by a passion for international trade, agriculture and connecting African businesses with global markets.",
    bio: [
      "Oliver Amanya Alinaitwe is a young British-born entrepreneur and the Founder of Axis Agro International Ltd, driven by a passion for international trade, agriculture and connecting African businesses with global markets.",
      "Born in the United Kingdom, Oliver developed his interest in agriculture and international business after moving to Uganda as a teenager. During his time in the country, he recognised the enormous potential of Uganda's agricultural sector, from its fertile land and favourable climate to the quality and variety of fresh produce grown by local farmers.",
      "Coming from a family with a strong background in exports and international trade, Oliver was exposed to the industry from a young age. This experience, combined with his own entrepreneurial ambitions, inspired him to establish Axis Agro International Ltd, a UK-based company focused on connecting Uganda's agricultural products with buyers across the United Kingdom and international markets.",
      "Oliver strongly believes that Uganda has far more to offer the world than many people realise. With growing demand in the UK for fresh, high-quality agricultural products, he saw an opportunity to build a business that not only supplies British markets but also creates valuable opportunities for Ugandan farmers, producers and exporters.",
      "Through Axis Agro International Ltd, his vision is to strengthen trade relationships between Uganda and the United Kingdom, making Ugandan agricultural products more accessible, competitive and recognised in international markets.",
      "Despite his young age, Oliver is committed to building a company founded on reliability, quality, transparency and long-term partnerships. He believes that age should never limit ambition and that the next generation of entrepreneurs has an important role to play in shaping the future of international trade.",
    ],
    highlight: "Uganda has far more to offer the world than many people realise",
    quote:
      "Having been born in the UK and experienced life in Uganda, I've been fortunate enough to see the opportunities on both sides. Uganda has incredible agricultural potential, and I believe its products deserve a much stronger presence in the British market. Axis Agro is my way of helping make that happen.",
    facts: [
      ["Role", "Founder"],
      ["Company", "Axis Agro International Ltd"],
      ["Born", "United Kingdom"],
      ["Uganda", "Moved there as a teenager"],
      ["Background", "Family background in exports and international trade"],
    ],
    listTitle: "His vision",
    responsibilities: [
      "Strengthen trade relationships between Uganda and the United Kingdom",
      "Make Ugandan agricultural products more accessible, competitive and recognised",
      "Supply British markets with fresh, high-quality agricultural products",
      "Create valuable opportunities for Ugandan farmers, producers and exporters",
    ],
    list2Title: "What drives him",
    expertise: [
      "International trade and agriculture",
      "Connecting African businesses with global markets",
      "The belief that age should never limit ambition",
    ],
    values: [
      { title: "Reliability", text: "A company buyers can depend on.", icon: "clock" },
      { title: "Quality", text: "Fresh, high-quality agricultural products.", icon: "shield" },
      { title: "Transparency", text: "Open, honest dealings on both sides of the trade.", icon: "route" },
      { title: "Long-term partnerships", text: "Relationships built to last with buyers and producers.", icon: "handshake" },
    ],
    photo: "/images/leaders/oliver-alinaitwe.webp",
    photoSquare: "/images/leaders/oliver-alinaitwe-square.webp",
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
    highlight: "from smallholder farms to export warehouses",
    facts: [
      ["Role", "Strategic Agricultural Sourcing & Uganda Operations"],
      ["Company", "Axis Agro International Ltd"],
      ["Based in", "Uganda"],
      ["Contact", "uganda@axisagro.co.uk"],
    ],
    values: [
      { title: "Sourcing", text: "Matching producers and partners to each buyer's specification.", icon: "sourcing" },
      { title: "Quality", text: "Grading and quality checks at origin.", icon: "shield" },
      { title: "Relationships", text: "Day-to-day contact with producers, cooperatives and exporters.", icon: "handshake" },
      { title: "Export preparation", text: "Packing, documents and inland logistics on time.", icon: "box" },
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
    photo: "/images/leaders/micah-bamutura.webp",
    photoSquare: "/images/leaders/micah-bamutura-square.webp",
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
  { title: "Founder", email: SITE.emails.director, text: "Strategic partnerships and senior commercial matters.", icon: "handshake" },
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
