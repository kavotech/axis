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
  phone: "+44 7418 354137",
  phoneHref: "+447418354137",
  // The previous site states the registered office address is available on request.
  registeredOffice: "United Kingdom — registered office address available on request",
  registration: "Registered in England & Wales",
  founded: "2022",
  directors: [
    {
      name: "Oliver Amanya Alinaitwe",
      role: "Director — UK Operations & International Trade",
      bio: "Oversees UK operations and international trade partnerships: export and import coordination, logistics, documentation, compliance and relationships with wholesale buyers in the UK and abroad.",
    },
    {
      name: "Micah Bamutura",
      role: "Director — Sourcing & Field Operations",
      bio: "Leads sourcing and field operations in East Africa, working with growers, cooperatives and exporters, and overseeing quality checks and grading at origin.",
    },
  ],
  sourcingPartners: [
    { name: "Afrilia Agro Uganda Limited", url: "https://www.afriliaagro.com" },
    { name: "Triport Agro International Limited", url: "https://www.triportagro.com" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: { label: string; href: string; description?: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All products", href: "/products" },
      { label: "Fresh Fruits", href: "/products/fresh-fruits" },
      { label: "Vegetables & Roots", href: "/products/vegetables-roots" },
      { label: "Herbs & Spices", href: "/products/herbs-spices" },
      { label: "Coffee", href: "/products/coffee" },
      { label: "Cocoa", href: "/products/cocoa" },
      { label: "Oilseeds & Nuts", href: "/products/oilseeds-nuts" },
      { label: "Dried & Processed", href: "/products/dried-processed" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Import & Export", href: "/services" },
      { label: "Quality & Compliance", href: "/quality" },
      { label: "Industries We Supply", href: "/industries" },
    ],
  },
  {
    label: "About Axis Agro",
    href: "/about",
    children: [
      { label: "About us", href: "/about" },
      { label: "Our Origins", href: "/origins" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
