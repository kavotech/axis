import type { IconName } from "@/components/Icon";

export type Service = { id: string; title: string; icon: IconName; summary: string; points: string[] };

export const SERVICES: Service[] = [
  {
    id: "uk-importing",
    title: "UK importing",
    icon: "warehouse",
    summary: "Importing fresh produce and commodities into the United Kingdom, coordinating clearance and onward delivery for wholesale buyers.",
    points: ["Import documentation and customs coordination", "Port and airport handling arranged with logistics partners", "Delivery coordination to buyer premises"],
  },
  {
    id: "procurement",
    title: "Global procurement & sourcing",
    icon: "sourcing",
    summary: "Buyer-specific procurement through trusted partners in Uganda and East Africa — matched to grade, volume and timing.",
    points: ["Supplier identification and vetting", "Sampling against buyer specification", "Seasonal supply planning"],
  },
  {
    id: "wholesale",
    title: "Wholesale supply",
    icon: "pallet",
    summary: "Wholesale volumes of fresh produce and ambient commodities for distributors, retailers, processors and foodservice.",
    points: ["Full and part-load programmes", "Consistent packing and labelling", "Recurring supply arrangements"],
  },
  {
    id: "sea-freight",
    title: "Sea freight & containers",
    icon: "ship",
    summary: "Containerised shipments — dry and reefer, FCL and LCL — coordinated with experienced freight forwarders.",
    points: ["20ft / 40ft dry, high-cube and reefer containers", "Temperature settings matched to product", "Shipment tracking to destination port"],
  },
  {
    id: "air-freight",
    title: "Air cargo",
    icon: "plane",
    summary: "Air freight for perishable, high-value and time-critical produce such as passion fruit, herbs and matooke.",
    points: ["Cool-chain from pack-house to airport", "Air waybill and phytosanitary coordination", "Consolidated or dedicated shipments"],
  },
  {
    id: "re-export",
    title: "Exports & re-exports",
    icon: "globe",
    summary: "Export coordination from East Africa to the UK, Europe, the Middle East and other markets, including re-export arrangements.",
    points: ["Destination-market requirements reviewed", "Commercial and transport documents prepared", "Multi-market buyer support"],
  },
  {
    id: "documentation",
    title: "Documentation & shipment coordination",
    icon: "document",
    summary: "Phytosanitary certificates, certificates of origin, packing lists, invoices and transport documents coordinated per shipment.",
    points: ["Document checklists per destination", "Pre-shipment inspection on request", "Single point of contact"],
  },
  {
    id: "packaging",
    title: "Custom packaging",
    icon: "box",
    summary: "Packing formats, carton sizes, labelling and private-label requirements agreed with producers and pack-houses.",
    points: ["Carton, bag and bulk formats", "Buyer labelling and marks", "Palletisation to destination standards"],
  },
  {
    id: "contracts",
    title: "Long-term supply arrangements",
    icon: "handshake",
    summary: "Seasonal and annual supply programmes for buyers who need planned volumes and dependable communication.",
    points: ["Programme planning with growers", "Agreed specifications and schedules", "Regular supply updates"],
  },
];

export type Industry = { id: string; title: string; icon: IconName; text: string; products: string[] };

export const INDUSTRIES: Industry[] = [
  { id: "wholesale-markets", title: "Wholesale produce markets", icon: "store", text: "Consistent, well-packed consignments for market traders and wholesale distributors.", products: ["Avocados", "Mangoes", "Matooke", "Sweet potatoes"] },
  { id: "importers", title: "Importers", icon: "ship", text: "Origin coordination and documentation for importers building East African supply lines.", products: ["Green coffee", "Cocoa", "Sesame", "Fresh fruit"] },
  { id: "distributors", title: "Distributors", icon: "truck", text: "Programmes sized to distribution schedules, with packing and labelling to suit onward delivery.", products: ["Pineapples", "Bananas", "Ginger", "Chillies"] },
  { id: "supermarkets", title: "Supermarkets & retail", icon: "cart", text: "Graded, retail-suitable fruit and vegetables, with specifications agreed before harvest.", products: ["Hass avocados", "MD2 pineapples", "Passion fruit", "French beans"] },
  { id: "foodservice", title: "Foodservice", icon: "cutlery", text: "Reliable supply for caterers and foodservice wholesalers, with flexible pack sizes.", products: ["Avocados", "Fresh herbs", "Chillies", "Plantain"] },
  { id: "hospitality", title: "Hospitality", icon: "users", text: "Specialty tropical fruit and ingredients for hotels, restaurants and event caterers via their suppliers.", products: ["Soursop", "Passion fruit", "Papaya", "Vanilla"] },
  { id: "manufacturing", title: "Food manufacturing", icon: "factory", text: "Ingredient-grade commodities with laboratory testing available against your specification.", products: ["Dried fruit", "Sesame", "Chia", "Turmeric"] },
  { id: "commodity", title: "Industrial commodity buyers", icon: "warehouse", text: "Bagged and bulk commodities for roasters, crushers, processors and trading houses.", products: ["Robusta coffee", "Cocoa beans", "Groundnuts", "Sunflower seed"] },
];

export const VALUES: { title: string; text: string; icon: IconName }[] = [
  { title: "Integrity", text: "Honest, transparent dealings with growers, partners and buyers — including being clear about what we cannot supply.", icon: "handshake" },
  { title: "Quality", text: "Specifications agreed up front and checked before shipment. Every consignment carries our name.", icon: "shield" },
  { title: "Partnership", text: "Long-term relationships with producers and customers rather than one-off transactions.", icon: "users" },
  { title: "Responsibility", text: "Sourcing that respects farming communities, reduces waste and keeps supply chains traceable.", icon: "leaf" },
];

export const PROCESS: { title: string; text: string; icon: IconName }[] = [
  { title: "Enquiry & specification", text: "We agree product, grade, volume, packaging, Incoterm and timing in writing.", icon: "document" },
  { title: "Sourcing & sampling", text: "Partners at origin source the product; samples are checked against the specification where appropriate.", icon: "sourcing" },
  { title: "Preparation & packing", text: "Produce is graded, packed and labelled to the agreed format at partner facilities.", icon: "box" },
  { title: "Inspection & documents", text: "Pre-shipment checks and the documents the destination requires are coordinated.", icon: "shield" },
  { title: "Shipment", text: "Air or sea freight is booked, tracked and communicated through to arrival.", icon: "ship" },
  { title: "Delivery & follow-up", text: "Arrival, clearance and delivery are coordinated, and feedback shapes the next shipment.", icon: "handshake" },
];

export type Insight = {
  slug: string;
  title: string;
  category: "Trade guide" | "Product guide" | "Logistics";
  excerpt: string;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  reviewed: string;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
};

export const INSIGHTS: Insight[] = [
  {
    slug: "robusta-screen-sizes-explained",
    title: "Robusta screen sizes explained: 18, 15 and 12",
    category: "Product guide",
    excerpt: "What screen numbers mean, why bean size matters to roasters, and how to specify a Ugandan Robusta lot.",
    image: "/images/green-coffee.webp",
    imageAlt: "Green coffee beans",
    readingMinutes: 4,
    reviewed: "2026-10-27",
    body: [
      {
        paragraphs: [
          "Green coffee is graded by passing beans through a stack of perforated screens. A screen number refers to the diameter of the holes in sixty-fourths of an inch, so a bean retained on a screen 18 sieve is at least 18/64\" (about 7.1mm) across.",
          "Larger, more uniform beans roast more evenly. That consistency is why bigger screens usually attract a premium, even though cup character is shaped by many other factors — processing, drying, storage and defects among them.",
        ],
      },
      {
        heading: "The three most traded Ugandan Robusta screens",
        paragraphs: ["Uganda's natural (dry-processed) Robusta is commonly offered in three screen grades:"],
        list: [
          "Screen 18 — the largest commercial screen; favoured for espresso blends and premium commercial roasting.",
          "Screen 15 — the workhorse grade, balancing quality and price for commercial roasting and blending.",
          "Screen 12 — smaller beans at an economical price point, widely used for soluble coffee and value blends.",
        ],
      },
      {
        heading: "What else to put in your specification",
        paragraphs: [
          "Screen size is only one parameter. A clear contract will also state maximum moisture (commonly around 12.5%), defect count or percentage, foreign matter, packing (typically 60kg jute bags, with or without hermetic liners) and whether pre-shipment samples are required.",
          "If you are unsure which screen suits your blend, request samples of more than one grade — it is the most reliable way to decide.",
        ],
      },
    ],
  },
  {
    slug: "choosing-incoterms-for-fresh-produce",
    title: "Choosing the right Incoterm for fresh produce",
    category: "Trade guide",
    excerpt: "How FOB, CIF, CPT, DAP and other Incoterms 2020 rules divide cost and risk — and what that means for perishable cargo.",
    image: "/images/port.webp",
    imageAlt: "Container ship docked beneath port cranes",
    readingMinutes: 5,
    reviewed: "2026-10-27",
    body: [
      {
        paragraphs: [
          "Incoterms® rules, published by the International Chamber of Commerce, define who pays for what and where risk passes from seller to buyer. They do not cover payment terms or title — those belong in the contract.",
          "For perishable produce the point where risk transfers matters: a delayed reefer or a missed connection can change the condition of fruit long before it arrives.",
        ],
      },
      {
        heading: "Sea-only rules",
        paragraphs: ["FOB, CFR and CIF apply to sea and inland waterway transport only. With CFR and CIF the seller pays freight to the destination port, but risk passes once goods are loaded on board at origin."],
      },
      {
        heading: "Any-mode rules",
        paragraphs: ["EXW, FCA, CPT, CIP, DAP, DPU and DDP can be used for air, road, rail or multimodal transport. For containerised and air-freighted produce, FCA, CPT and CIP are often a better fit than FOB/CFR/CIF because handover happens at a terminal rather than on board a vessel."],
      },
      {
        heading: "Practical tips",
        paragraphs: [],
        list: [
          "Agree who sets and monitors reefer temperature, and who bears the risk if it deviates.",
          "Check that your cargo insurance matches the Incoterm — CIF and CIP set different minimum cover.",
          "Name the place precisely (e.g. 'FCA Entebbe International Airport') to avoid disputes.",
        ],
      },
    ],
  },
  {
    slug: "air-freight-vs-reefer-for-tropical-fruit",
    title: "Air freight or reefer? Moving tropical fruit from East Africa",
    category: "Logistics",
    excerpt: "The trade-offs between speed, cost and shelf life when shipping avocados, pineapples, passion fruit and more.",
    image: "/images/plane-2.webp",
    imageAlt: "Aircraft at an airport stand at sunset",
    readingMinutes: 4,
    reviewed: "2026-10-27",
    body: [
      {
        paragraphs: [
          "East Africa is landlocked in places and a long voyage from Europe by sea, so the choice between air freight and reefer containers shapes both landed cost and the condition of the fruit on arrival.",
        ],
      },
      {
        heading: "When air freight makes sense",
        paragraphs: ["Highly perishable or high-value lines — passion fruit, papaya, soursop, fresh herbs, matooke — usually travel by air. Transit is measured in days, which protects quality but carries a much higher cost per kilogram."],
      },
      {
        heading: "When reefer containers make sense",
        paragraphs: ["Avocados harvested at the right dry-matter maturity, bananas harvested green, and pineapples can often travel by reefer, provided pre-cooling, temperature settings and transit time are planned carefully. Sea freight lowers cost per kilogram and suits larger, recurring programmes."],
      },
      {
        heading: "Questions to settle early",
        paragraphs: [],
        list: [
          "What maturity or ripeness stage do you need on arrival?",
          "What is the realistic door-to-door transit time, including inland legs?",
          "Who is responsible for temperature monitoring, and what records will you receive?",
        ],
      },
    ],
  },
  {
    slug: "documents-for-importing-plant-products",
    title: "Documents commonly required when importing plant products",
    category: "Trade guide",
    excerpt: "An overview of phytosanitary certificates, certificates of origin, packing lists and transport documents.",
    image: "/images/axis-fruit-cartons-stack.webp",
    imageAlt: "Stacked cartons of fresh produce",
    readingMinutes: 4,
    reviewed: "2026-10-27",
    body: [
      {
        paragraphs: [
          "Requirements differ by product, origin and destination, and they change over time. Always confirm current rules with the destination authority — for Great Britain, the official guidance published on GOV.UK — before shipping.",
        ],
      },
      {
        heading: "Documents most shipments need",
        paragraphs: [],
        list: [
          "Commercial invoice and packing list.",
          "Transport document — a bill of lading (sea) or air waybill (air).",
          "Phytosanitary certificate for regulated plants and plant products, issued by the exporting country's plant protection organisation.",
          "Certificate of origin where preferential tariff treatment or the buyer requires it.",
        ],
      },
      {
        heading: "Additional documents buyers may request",
        paragraphs: ["Quality or inspection certificates, fumigation certificates for certain bagged goods and wooden packaging, laboratory analyses (for example moisture, aflatoxin or pesticide residues), and scheme certificates where the producer holds them."],
      },
    ],
  },
];

export const insightBySlug = (slug: string) => INSIGHTS.find((i) => i.slug === slug);
