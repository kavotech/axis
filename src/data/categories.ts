import type { IconName } from "@/components/Icon";

/** Catalogue groups — the filter tabs on /products. */
export type GroupId =
  | "fresh-fruits"
  | "vegetables"
  | "roots-tubers"
  | "herbs-spices"
  | "coffee"
  | "cocoa"
  | "oilseeds-nuts"
  | "dried-products";

export const GROUPS: { id: GroupId; label: string; icon: IconName }[] = [
  { id: "fresh-fruits", label: "Fresh Fruits", icon: "mango" },
  { id: "vegetables", label: "Vegetables", icon: "herb" },
  { id: "roots-tubers", label: "Roots & Tubers", icon: "tuber" },
  { id: "herbs-spices", label: "Herbs & Spices", icon: "chilli" },
  { id: "coffee", label: "Coffee", icon: "coffee" },
  { id: "cocoa", label: "Cocoa", icon: "cocoa" },
  { id: "oilseeds-nuts", label: "Oilseeds & Nuts", icon: "sesame" },
  { id: "dried-products", label: "Dried Products", icon: "sun" },
];

/** Quote form behaviour is driven by this type. */
export type QuoteKind = "fruit" | "vegetable" | "spice" | "coffee" | "cocoa" | "oilseed" | "dried";

export type CategorySlug =
  | "fresh-fruits"
  | "vegetables-roots"
  | "herbs-spices"
  | "coffee"
  | "cocoa"
  | "oilseeds-nuts"
  | "dried-processed";

export type Category = {
  slug: CategorySlug;
  name: string;
  eyebrow: string;
  title: string;
  intro: string;
  groups: GroupId[];
  icon: IconName;
  image: string;
  imageAlt: string;
  /** Short card copy used on the homepage and in menus. */
  summary: string;
  highlights: { title: string; text: string; icon: IconName }[];
  logistics: string[];
  seoTitle: string;
  seoDescription: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "fresh-fruits",
    name: "Fresh Fruits",
    eyebrow: "Fresh produce",
    title: "Tropical fruit, harvested for the journey.",
    intro:
      "Avocados, pineapples, mangoes, bananas and specialty tropical fruit sourced through partner farms and pack-houses in Uganda and East Africa — graded, packed and moved through temperature-managed air or sea freight to the buyer's specification.",
    groups: ["fresh-fruits"],
    icon: "mango",
    image: "/images/tropical-basket.webp",
    imageAlt: "Pineapple, mangoes, grapes and kiwi in a woven basket",
    summary: "Hass & Fuerte avocados, MD2 pineapples, mangoes, Cavendish bananas and passion fruit.",
    highlights: [
      { title: "Counter-season supply", text: "Equatorial growing conditions give East Africa harvest windows that complement European seasons.", icon: "calendar" },
      { title: "Graded to specification", text: "Size, count, maturity and packaging agreed per programme before harvest is committed.", icon: "scale" },
      { title: "Cold-chain coordination", text: "Pre-cooling, reefer or air freight planned around each fruit's handling requirements.", icon: "snow" },
    ],
    logistics: [
      "Air freight for highly perishable fruit such as passion fruit, papaya and soursop.",
      "Reefer containers (20ft / 40ft) for avocados, pineapples and bananas where transit allows.",
      "Phytosanitary certification and destination-specific documentation coordinated with each shipment.",
    ],
    seoTitle: "Fresh Fruit Importer & Exporter — Avocados, Pineapples, Mangoes",
    seoDescription:
      "Wholesale fresh fruit from Uganda and East Africa: Hass and Fuerte avocados, MD2 pineapples, Tommy Atkins and Keitt mangoes, Cavendish bananas, passion fruit and more.",
  },
  {
    slug: "vegetables-roots",
    name: "Vegetables & Roots",
    eyebrow: "Vegetables, roots & tubers",
    title: "Staples for diaspora, wholesale and foodservice markets.",
    intro:
      "Matooke, cooking plantain, sweet potatoes, cassava, yams and fresh vegetables for importers, wholesale markets and food businesses in the UK and beyond — sorted, packed and shipped on agreed schedules.",
    groups: ["vegetables", "roots-tubers"],
    icon: "tuber",
    image: "/images/sweetpotato.webp",
    imageAlt: "Pile of freshly harvested sweet potatoes",
    summary: "Matooke, plantain, sweet potatoes, cassava, yams and French beans.",
    highlights: [
      { title: "Familiar origin staples", text: "Ugandan matooke and root crops for established diaspora and specialist retail channels.", icon: "banana" },
      { title: "Durable handling", text: "Roots and tubers suit ventilated cartons, mesh bags and sea freight where the buyer's schedule allows.", icon: "box" },
      { title: "Mixed consolidation", text: "Combine produce lines into a single consignment where volumes and compatibility permit.", icon: "container" },
    ],
    logistics: [
      "Matooke and plantain are commonly air-freighted to protect shelf life.",
      "Roots and tubers can travel in ventilated or reefer containers depending on product and season.",
      "Packaging, labelling and pallet configuration matched to destination wholesale requirements.",
    ],
    seoTitle: "Matooke, Cassava, Sweet Potato & Yam Supplier — Vegetables & Roots",
    seoDescription:
      "Wholesale Ugandan matooke, cooking plantain, sweet potatoes, cassava, yams and French beans for UK and international importers, wholesalers and foodservice.",
  },
  {
    slug: "herbs-spices",
    name: "Herbs & Spices",
    eyebrow: "Herbs & spices",
    title: "Aromatic crops with a clear line back to origin.",
    intro:
      "Fresh and dried ginger, turmeric, bird's eye chillies, culinary herbs and cured vanilla from Uganda and East Africa — cleaned, dried or fresh-packed according to the buyer's specification and destination requirements.",
    groups: ["herbs-spices"],
    icon: "chilli",
    image: "/images/ginger-basket.webp",
    imageAlt: "Basket of fresh ginger roots at market",
    summary: "Ginger, turmeric, bird's eye chillies, fresh herbs and Ugandan vanilla.",
    highlights: [
      { title: "Fresh or dried", text: "Ginger, turmeric and chillies supplied fresh or dried, whole or sliced, per agreed specification.", icon: "ginger" },
      { title: "Residue & moisture testing", text: "Laboratory analysis arranged on request for destination-market compliance.", icon: "flask" },
      { title: "Vanilla from Uganda", text: "Cured vanilla beans graded by length, moisture and appearance.", icon: "herb" },
    ],
    logistics: [
      "Fresh herbs and fresh chillies typically travel by air in ventilated cartons.",
      "Dried spices are packed in lined bags or cartons for sea or air freight.",
      "Pesticide residue and microbiological testing can be arranged for buyer approval.",
    ],
    seoTitle: "Ginger, Turmeric, Chilli & Vanilla Supplier — Herbs & Spices",
    seoDescription:
      "Fresh and dried ginger, turmeric, bird's eye chillies, culinary herbs and Ugandan vanilla supplied to UK and international spice buyers.",
  },
  {
    slug: "coffee",
    name: "Coffee",
    eyebrow: "Green coffee trading",
    title: "Uganda green coffee, prepared to your grade.",
    intro:
      "Uganda is one of the world's leading Robusta producers and also grows washed and natural Arabica on the slopes of Mount Elgon and the Rwenzori Mountains. Axis Agro sources green coffee through trusted partners and prepares lots to the screen size, moisture and defect limits agreed with each buyer.",
    groups: ["coffee"],
    icon: "coffee",
    image: "/images/coffee-hills.webp",
    imageAlt: "Rows of coffee plants on a hillside with mountains in the distance",
    summary: "Robusta Screen 18, 15 & 12 and Arabica AA and AB green coffee.",
    highlights: [
      { title: "Screen-graded Robusta", text: "Screen 18, 15 and 12 natural Robusta — the commercial backbone of espresso and instant blends.", icon: "coffee" },
      { title: "Arabica grades", text: "Washed and natural Arabica graded AA, AB and other grades on request, subject to availability.", icon: "leaf" },
      { title: "Sample-led contracting", text: "Pre-shipment samples and cup evaluation can be arranged before contract terms are confirmed.", icon: "flask" },
    ],
    logistics: [
      "Standard export packing in 60kg jute bags, with GrainPro or similar hermetic liners on request.",
      "Typically shipped as FCL sea freight via the Port of Mombasa; LCL and sample shipments by arrangement.",
      "ICO marks, phytosanitary certificate, certificate of origin and quality certificate coordinated per lot.",
    ],
    seoTitle: "Uganda Green Coffee — Robusta Screen 18, 15, 12 & Arabica AA, AB",
    seoDescription:
      "Uganda green coffee for importers and roasters: natural Robusta Screen 18, 15 and 12, Arabica AA and AB, export packed in 60kg jute bags.",
  },
  {
    slug: "cocoa",
    name: "Cocoa",
    eyebrow: "Cocoa sourcing",
    title: "Fermented, sun-dried cocoa beans from Uganda.",
    intro:
      "Ugandan cocoa is grown largely by smallholders in the Bundibugyo, Mukono and western regions. We coordinate sourcing of fermented, dried beans and their preparation for export — bean count, moisture and cut-test quality agreed with the buyer.",
    groups: ["cocoa"],
    icon: "cocoa",
    image: "/images/cocoa-pods.webp",
    imageAlt: "Ripe cocoa pods hanging from a tree branch",
    summary: "Fermented and dried cocoa beans, bagged for export.",
    highlights: [
      { title: "Moisture control", text: "Beans dried to the moisture limit set in the contract — commonly 7.5% or below — before bagging.", icon: "sun" },
      { title: "Cut-test grading", text: "Fermentation, mould, slate and insect damage assessed by cut test against agreed limits.", icon: "scale" },
      { title: "Bagged export supply", text: "Packed in jute or sisal bags for containerised sea freight.", icon: "container" },
    ],
    logistics: [
      "Shipped in ventilated or lined dry containers to manage condensation risk.",
      "Fumigation and phytosanitary documentation coordinated where required by the destination.",
      "Third-party inspection and laboratory analysis can be arranged at the buyer's request.",
    ],
    seoTitle: "Uganda Cocoa Beans Supplier — Fermented & Dried, Bagged for Export",
    seoDescription:
      "Commercial supply of fermented, sun-dried Ugandan cocoa beans: bean count, moisture and cut-test specifications agreed per contract, bagged for export.",
  },
  {
    slug: "oilseeds-nuts",
    name: "Oilseeds & Nuts",
    eyebrow: "Oilseeds & nuts",
    title: "Cleaned, sorted and bagged commodity supply.",
    intro:
      "Sesame, groundnuts, sunflower seed, chia, macadamia and cashew from East African origins — cleaned and graded for food manufacturers, processors, packers and commodity traders.",
    groups: ["oilseeds-nuts"],
    icon: "sesame",
    image: "/images/peanuts-shell.webp",
    imageAlt: "Groundnuts in shell on a wooden table",
    summary: "Sesame, groundnuts, sunflower seed, chia, macadamia and cashew.",
    highlights: [
      { title: "Machine-cleaned", text: "Purity, admixture and moisture specified per contract and verified before loading.", icon: "check" },
      { title: "Aflatoxin awareness", text: "Groundnut and nut lots can be laboratory tested against destination aflatoxin limits.", icon: "flask" },
      { title: "Bulk or bagged", text: "25kg and 50kg PP or paper bags, or bulk-bag configurations for FCL shipments.", icon: "bag" },
    ],
    logistics: [
      "Generally shipped as FCL sea freight in 20ft or 40ft dry containers.",
      "Fumigation and phytosanitary certificates arranged according to destination rules.",
      "Pre-shipment inspection and laboratory analysis available at the buyer's request.",
    ],
    seoTitle: "Sesame, Groundnut, Sunflower & Macadamia Supplier — Oilseeds & Nuts",
    seoDescription:
      "East African sesame seeds, groundnuts, sunflower seed, chia, macadamia and cashew — cleaned, graded and bagged for export to UK and international buyers.",
  },
  {
    slug: "dried-processed",
    name: "Dried & Processed",
    eyebrow: "Value-added products",
    title: "Shelf-stable products with origin character.",
    intro:
      "Dried tropical fruit, banana chips, moringa and shea butter sourced from processors in Uganda and East Africa — suited to snack brands, ingredient buyers, health food companies and cosmetic manufacturers.",
    groups: ["dried-products"],
    icon: "sun",
    image: "/images/dried-fruit-mix.webp",
    imageAlt: "Assortment of dried tropical fruit pieces",
    summary: "Dried mango and pineapple, banana chips, moringa and shea butter.",
    highlights: [
      { title: "Long shelf life", text: "Suitable for sea freight and longer supply programmes than fresh produce.", icon: "box" },
      { title: "Private label ready", text: "Bulk or retail-ready packing discussed with each processor and buyer.", icon: "tag" },
      { title: "Processor vetting", text: "Processing standards and available documentation confirmed before contracting.", icon: "shield" },
    ],
    logistics: [
      "Typically shipped in dry containers; consolidation with other ambient lines is possible.",
      "Food-grade inner liners, cartons or drums depending on product.",
      "Processor certifications are confirmed case by case and are not assumed.",
    ],
    seoTitle: "Dried Mango, Pineapple, Banana Chips, Moringa & Shea — Dried & Processed",
    seoDescription:
      "Value-added agricultural products from Uganda and East Africa: dried mango and pineapple, banana chips, moringa leaf powder and shea butter for wholesale buyers.",
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryForGroup = (group: GroupId) => CATEGORIES.find((c) => c.groups.includes(group))!;
export const groupLabel = (group: GroupId) => GROUPS.find((g) => g.id === group)!.label;
