import type { IconName } from "@/components/Icon";

/** Quote form behaviour is driven by this type. */
export type QuoteKind = "fruit" | "vegetable" | "spice" | "coffee" | "cocoa" | "oilseed" | "dried";

export type CategorySlug =
  | "fruits"
  | "vegetables"
  | "roots-tubers"
  | "herbs-spices"
  | "coffee"
  | "cocoa"
  | "oilseeds"
  | "grains-pulses"
  | "nuts"
  | "dried-products";

/** Kept for compatibility: a catalogue group is a category. */
export type GroupId = CategorySlug;

export type Subcategory = { slug: string; name: string; intro: string; image: string; imageAlt: string; icon: IconName };

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  eyebrow: string;
  title: string;
  intro: string;
  icon: IconName;
  image: string;
  imageAlt: string;
  accent: string;
  summary: string;
  subcategories: Subcategory[];
  highlights: { title: string; text: string; icon: IconName }[];
  logistics: string[];
  /** Shown on product pages in this category unless a product overrides it. */
  applications: string[];
  quality: string[];
  grading: string[];
  transport: string[];
  enquiries: string[];
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
};

const CONFIRM = "Specifications, volumes and seasonal availability are confirmed in writing for every enquiry.";

export const CATEGORIES: Category[] = [
  {
    slug: "fruits",
    name: "Fresh Fruits",
    shortName: "Fruits",
    eyebrow: "Fresh produce",
    title: "Tropical and citrus fruit from Uganda and East Africa",
    intro:
      "Avocados, pineapples, mangoes, bananas, passion fruit, citrus and specialty tropical fruit — graded, packed and moved through temperature-managed air or sea freight to each buyer's specification.",
    icon: "mango",
    image: "/images/tropical-basket.webp",
    imageAlt: "Pineapple, mangoes and other tropical fruit in a woven basket",
    accent: "accent-leaf",
    summary: "Avocados, pineapples, mangoes, bananas, passion fruit, citrus and tropical specialties.",
    subcategories: [
      { slug: "avocados", name: "Avocados", intro: "Hass, Fuerte and local green-skinned avocados, graded by count and dry-matter maturity.", image: "/images/avocado-pile.webp", imageAlt: "Pile of ripe green avocados", icon: "avocado" },
      { slug: "pineapples", name: "Pineapples", intro: "MD2, Smooth Cayenne and Ugandan Sugarloaf pineapples for fresh retail and processing.", image: "/images/pineapples.webp", imageAlt: "Ripe golden pineapples", icon: "pineapple" },
      { slug: "mangoes", name: "Mangoes", intro: "Tommy Atkins, Keitt, Kent, Apple and local Ugandan varieties across the East African seasons.", image: "/images/mango-pile.webp", imageAlt: "Pile of ripe mangoes", icon: "mango" },
      { slug: "bananas", name: "Bananas", intro: "Cavendish, Lady Finger (sweet 'sukali ndiizi') and other dessert bananas.", image: "/images/banana-bunch.webp", imageAlt: "Bunch of green bananas on the plant", icon: "banana" },
      { slug: "passion-fruit", name: "Passion Fruit", intro: "Purple, yellow and sweet passion fruit from the Ugandan highlands.", image: "/images/passion.webp", imageAlt: "Halved purple passion fruit", icon: "passion" },
      { slug: "citrus", name: "Citrus", intro: "Lemons, limes, oranges, mandarins and grapefruit — sourcing enquiries welcome.", image: "/images/oranges.webp", imageAlt: "Ripe oranges on the tree", icon: "sun" },
      { slug: "tropical", name: "Tropical Specialties", intro: "Papaya, soursop, jackfruit, guava, watermelon, tree tomato and cape gooseberry.", image: "/images/papaya-sliced.webp", imageAlt: "Halved papaya", icon: "papaya" },
    ],
    highlights: [
      { title: "Counter-season supply", text: "Equatorial growing conditions give harvest windows that complement European seasons.", icon: "calendar" },
      { title: "Graded to specification", text: "Size, count, maturity and packaging agreed per programme before harvest.", icon: "scale" },
      { title: "Cold-chain coordination", text: "Pre-cooling, reefer or air freight planned around each fruit's handling needs.", icon: "snow" },
    ],
    logistics: [
      "Air freight for highly perishable fruit such as passion fruit, papaya and soursop.",
      "Reefer containers for avocados, pineapples, bananas and citrus where transit allows.",
      "Phytosanitary certification and destination documentation coordinated with each shipment.",
    ],
    applications: ["Supermarket and greengrocer retail", "Wholesale produce markets", "Foodservice and catering", "Fresh-cut and juice processing", "Specialist and diaspora retail"],
    quality: ["Harvest maturity checked before picking (e.g. dry matter, Brix or colour stage)", "Free from visible damage, decay and pests", "Uniform size or count within each carton", "Cold-chain records kept where reefer or cool storage is used"],
    grading: ["Sorted by size or count band at the pack-house", "Class I / Class II separation where buyers specify", "Defective and over-ripe fruit removed before packing"],
    transport: ["Air freight: 1–3 days door to door for most UK and EU destinations", "Sea freight: reefer containers via Mombasa, longer transit but lower cost per kg", "Temperature set per fruit — e.g. bananas warmer than avocados — and confirmed with the forwarder"],
    enquiries: ["Weekly air-freight programme of mixed tropical fruit", "Seasonal reefer programme for avocados or pineapples", "Trial shipment of a specialty fruit for diaspora retail", "Fruit for juice or fresh-cut processing"],
    faqs: [
      { q: "Can you supply fresh fruit all year?", a: "Some lines are available for much of the year thanks to Uganda's two rainy seasons; others are seasonal. We confirm realistic windows for each enquiry." },
      { q: "Do you ship by air or sea?", a: "Both. Highly perishable fruit usually travels by air; hardier fruit can travel in reefer containers when timing allows." },
      { q: "What documents come with fresh fruit?", a: "Typically a phytosanitary certificate, commercial invoice, packing list and air waybill or bill of lading. Destination-specific documents are confirmed per order." },
    ],
    seoTitle: "Fresh Fruit Supplier — Avocados, Pineapples, Mangoes, Bananas & Citrus",
    seoDescription: "Wholesale fresh fruit from Uganda and East Africa: avocados, MD2 pineapples, mangoes, Cavendish bananas, passion fruit, citrus and tropical specialties for UK and international buyers.",
  },
  {
    slug: "vegetables",
    name: "Fresh Vegetables",
    shortName: "Vegetables",
    eyebrow: "Fresh vegetables",
    title: "Chillies, beans, greens and fruiting vegetables",
    intro: "Fresh chillies and peppers, French beans and peas, tomatoes, eggplant, okra, squash and leafy greens grown in Uganda's mild highland and lowland zones.",
    icon: "herb",
    image: "/images/bell-peppers.webp",
    imageAlt: "Colourful bell peppers at a market",
    accent: "accent-orange",
    summary: "Chillies, peppers, beans, peas, tomatoes, eggplant, okra, squash and leafy greens.",
    subcategories: [
      { slug: "chillies-peppers", name: "Chillies & Peppers", intro: "Bird's eye, Scotch bonnet, red and green chillies, sweet and bell peppers.", image: "/images/chillies.webp", imageAlt: "Red chillies", icon: "chilli" },
      { slug: "beans-peas", name: "Beans & Peas", intro: "French and fine beans, snow peas and sugar snap peas for air-freighted retail programmes.", image: "/images/french-beans.webp", imageAlt: "Fresh French beans", icon: "herb" },
      { slug: "fruiting-vegetables", name: "Fruiting Vegetables", intro: "Tomatoes, eggplant, okra, cucumber, courgettes, pumpkin and butternut squash.", image: "/images/tomatoes.webp", imageAlt: "Ripe tomatoes", icon: "sun" },
      { slug: "leafy-greens", name: "Leafy Greens", intro: "Cabbage, kale, spinach, amaranth and sukuma wiki for specialist markets.", image: "/images/kale.webp", imageAlt: "Fresh kale leaves", icon: "leaf" },
    ],
    highlights: [
      { title: "Air-freight programmes", text: "Fine beans, peas, chillies and okra travel by air in ventilated cartons.", icon: "plane" },
      { title: "Diaspora staples", text: "African eggplant, okra, amaranth and sukuma wiki for specialist retail.", icon: "store" },
      { title: "Residue awareness", text: "Pesticide residue testing arranged on request against destination limits.", icon: "flask" },
    ],
    logistics: ["Most fresh vegetables travel by air in ventilated cartons.", "Hardier lines such as pumpkin and cabbage can travel in reefer containers.", "Phytosanitary certificates and destination checks coordinated per shipment."],
    applications: ["Ethnic and specialist retail", "Wholesale markets", "Restaurants and caterers", "Food manufacturing (sauces, ready meals)"],
    quality: ["Fresh, firm and free from decay", "Colour and size uniform within a pack", "Trimmed and cleaned to the agreed standard", "Residue testing available on request"],
    grading: ["Graded by length, diameter or weight band", "Off-grade and damaged produce removed", "Bunching or loose packing as specified"],
    transport: ["Air freight is standard for most fresh vegetables", "Cool-chain from pack-house to airport to protect shelf life", "Sea freight only for durable lines and longer shelf-life produce"],
    enquiries: ["Weekly mixed vegetables for an African grocery wholesaler", "Fine beans for a retail packer", "Fresh chillies for a sauce manufacturer"],
    faqs: [
      { q: "Which vegetables are regular lines?", a: "French beans and chillies are long-established East African export crops. Many other vegetables are offered as sourcing enquiries and confirmed case by case." },
      { q: "Can vegetables be mixed in one shipment?", a: "Yes, compatible lines can be consolidated on one air waybill where volumes and handling requirements allow." },
    ],
    seoTitle: "Fresh Vegetables from Uganda — Chillies, Beans, Okra, Eggplant & Greens",
    seoDescription: "Ugandan fresh vegetables for UK and international buyers: chillies, peppers, French beans, peas, tomatoes, eggplant, okra, squash and leafy greens.",
  },
  {
    slug: "roots-tubers",
    name: "Roots, Tubers & Traditional Produce",
    shortName: "Roots & Tubers",
    eyebrow: "Roots & tubers",
    title: "Matooke, cassava, sweet potatoes and traditional staples",
    intro: "Ugandan staples for diaspora markets, wholesalers and food businesses — matooke and plantain, cassava, sweet potatoes, yams, cocoyams, taro and Irish potatoes.",
    icon: "tuber",
    image: "/images/sweetpotato.webp",
    imageAlt: "Pile of sweet potatoes",
    accent: "accent-orange",
    summary: "Matooke, plantain, cassava, sweet potatoes, yams, cocoyams, taro and potatoes.",
    subcategories: [
      { slug: "cooking-bananas", name: "Matooke & Plantains", intro: "East African highland cooking bananas and plantains.", image: "/images/plantain-box.webp", imageAlt: "Green cooking bananas in a carton", icon: "banana" },
      { slug: "cassava", name: "Cassava", intro: "Fresh, waxed and dried cassava, and cassava flour.", image: "/images/cassava.webp", imageAlt: "Freshly harvested cassava roots", icon: "tuber" },
      { slug: "sweet-potatoes", name: "Sweet Potatoes", intro: "Orange-, white- and purple-fleshed sweet potatoes.", image: "/images/sweetpotato.webp", imageAlt: "Sweet potatoes", icon: "tuber" },
      { slug: "yams-potatoes", name: "Yams, Cocoyams & Potatoes", intro: "Yams, cocoyams, taro and Irish potatoes.", image: "/images/yam.webp", imageAlt: "Fresh yams", icon: "tuber" },
    ],
    highlights: [
      { title: "Familiar staples", text: "Produce Ugandan and East African communities know and ask for by name.", icon: "users" },
      { title: "Robust handling", text: "Many roots and tubers suit ventilated cartons, mesh bags and sea freight.", icon: "box" },
      { title: "Fresh or processed", text: "Some lines are also available dried or milled into flour.", icon: "sun" },
    ],
    logistics: ["Matooke and plantain are commonly air-freighted to protect freshness.", "Roots and tubers can travel in ventilated or reefer containers.", "Packaging and labelling matched to destination wholesale requirements."],
    applications: ["Diaspora and specialist grocery", "Wholesale markets", "Restaurants serving African and Caribbean cuisine", "Food processors and flour millers"],
    quality: ["Sound, clean produce free from rot and pest damage", "Cured where appropriate to extend storage life", "Size bands agreed with the buyer"],
    grading: ["Sorted by size or weight", "Damaged and diseased roots removed", "Soil brushed off; washing only where specified"],
    transport: ["Air freight for fresh matooke and plantain", "Sea freight possible for cured roots and dried products", "Ventilation and humidity control to limit sprouting and rot"],
    enquiries: ["Weekly matooke for an East African grocery", "Cassava flour for a food manufacturer", "Orange-fleshed sweet potatoes for a wholesaler"],
    faqs: [
      { q: "How is fresh cassava kept fresh?", a: "Fresh cassava deteriorates within days of harvest, so it is usually waxed, air-freighted quickly, or supplied dried or as flour instead." },
      { q: "Do you supply matooke all year?", a: "Matooke is grown year-round in Uganda; volumes and quality vary with season and are confirmed per enquiry." },
    ],
    seoTitle: "Matooke, Cassava, Sweet Potato & Yam Supplier — Roots & Tubers",
    seoDescription: "Ugandan roots, tubers and traditional produce: matooke, plantain, cassava, sweet potatoes, yams, cocoyams, taro and potatoes for UK and international buyers.",
  },
  {
    slug: "herbs-spices",
    name: "Herbs, Spices & Aromatics",
    shortName: "Herbs & Spices",
    eyebrow: "Herbs & spices",
    title: "Ginger, turmeric, chillies, vanilla and fresh herbs",
    intro: "Fresh and dried ginger and turmeric, bird's eye chillies, culinary herbs, lemongrass, cardamom and Ugandan vanilla — fresh-packed, dried or milled to specification.",
    icon: "chilli",
    image: "/images/ginger-basket.webp",
    imageAlt: "Basket of fresh ginger",
    accent: "accent-orange",
    summary: "Ginger, turmeric, chillies, vanilla, cardamom, lemongrass and culinary herbs.",
    subcategories: [
      { slug: "ginger-turmeric", name: "Ginger & Turmeric", intro: "Fresh, dried and powdered ginger and turmeric.", image: "/images/ginger.webp", imageAlt: "Fresh ginger roots", icon: "ginger" },
      { slug: "chilli-products", name: "Chillies & Chilli Products", intro: "African bird's eye chillies, chilli flakes and chilli powder.", image: "/images/chillies.webp", imageAlt: "Red chillies", icon: "chilli" },
      { slug: "fresh-herbs", name: "Fresh Herbs", intro: "Basil, mint, rosemary, thyme, coriander, parsley and lemongrass.", image: "/images/basil.webp", imageAlt: "Fresh basil leaves", icon: "herb" },
      { slug: "vanilla-cardamom", name: "Vanilla & Cardamom", intro: "Cured Ugandan vanilla beans, vanilla extract and cardamom.", image: "/images/axis-vanilla.webp", imageAlt: "Bundles of cured vanilla beans", icon: "herb" },
    ],
    highlights: [
      { title: "Fresh, dried or milled", text: "Whole, sliced or powdered formats to the buyer's specification.", icon: "ginger" },
      { title: "Laboratory testing", text: "Moisture, residues, aflatoxin and microbiology tested on request.", icon: "flask" },
      { title: "Ugandan vanilla", text: "Cured beans graded by length, moisture and appearance.", icon: "herb" },
    ],
    logistics: ["Fresh herbs and fresh chillies travel by air.", "Dried spices are packed in lined bags or cartons for sea or air freight.", "Residue and microbiological testing can be arranged before shipment."],
    applications: ["Spice processors and blenders", "Food and beverage manufacturers", "Foodservice and restaurants", "Health and wellness brands"],
    quality: ["Moisture within agreed limits for dried products", "Free from foreign matter and mould", "Colour and aroma typical of the product", "Residue and microbiology results available on request"],
    grading: ["Fresh: graded by size and condition", "Dried: cleaned, sorted and sieved", "Powders: mesh size agreed with the buyer"],
    transport: ["Air freight for fresh herbs, chillies and fresh rhizomes", "Sea freight for dried and milled products", "Moisture-proof packaging to protect dried spices"],
    enquiries: ["Dried ginger slices for a spice blender", "Fresh turmeric for specialist retail", "Gourmet vanilla beans for a bakery supplier"],
    faqs: [
      { q: "Can you supply organic spices?", a: "Only where a producer's organic certification is confirmed for the specific lot. We never describe product as organic without that certificate." },
      { q: "What mesh size are powders?", a: "Mesh size depends on the processor and your application; we agree it as part of the specification." },
    ],
    seoTitle: "Ginger, Turmeric, Chilli, Vanilla & Fresh Herbs — Herbs & Spices Supplier",
    seoDescription: "Ugandan ginger, turmeric, bird's eye chillies, vanilla, cardamom, lemongrass and culinary herbs — fresh, dried and powdered — for UK and international spice buyers.",
  },
  {
    slug: "coffee",
    name: "Green Coffee",
    shortName: "Coffee",
    eyebrow: "Green coffee trading",
    title: "Uganda Robusta and Arabica green coffee",
    intro:
      "Uganda is Africa's leading Robusta exporter and also grows washed and natural Arabica on Mount Elgon and the Rwenzori Mountains. We source green coffee through partner exporters and prepare lots to the screen size, moisture and defect limits agreed with each buyer.",
    icon: "coffee",
    image: "/images/coffee-hills.webp",
    imageAlt: "Coffee growing on a hillside",
    accent: "accent-earth",
    summary: "Robusta Screen 18, 15, 12 and FAQ; washed and natural Arabica including AA, AB, Wugar and Drugar.",
    subcategories: [
      { slug: "robusta", name: "Robusta", intro: "Screen 18, 15, 12, FAQ, natural and washed Robusta.", image: "/images/green-coffee.webp", imageAlt: "Green coffee beans", icon: "coffee" },
      { slug: "arabica", name: "Arabica", intro: "Bugisu, Wugar, Drugar and screen-graded Arabica.", image: "/images/coffee-cherries.webp", imageAlt: "Coffee cherries on the branch", icon: "leaf" },
    ],
    highlights: [
      { title: "Screen-graded Robusta", text: "Screen 18, 15 and 12 — the backbone of espresso and soluble blends.", icon: "coffee" },
      { title: "Washed & natural Arabica", text: "Bugisu (Mt Elgon), Wugar and Drugar, with screen grades on request.", icon: "leaf" },
      { title: "Sample-led contracting", text: "Pre-shipment and type samples before terms are confirmed.", icon: "flask" },
    ],
    logistics: ["Standard packing in 60kg jute bags; hermetic liners on request.", "FCL sea freight via the Port of Mombasa; LCL and samples by arrangement.", "ICO marks, phytosanitary certificate, certificate of origin and quality certificate per lot."],
    applications: ["Commercial and specialty roasters", "Soluble coffee manufacturers", "Green coffee importers and traders", "Private-label coffee brands"],
    quality: ["Moisture typically ≤ 12.5% unless otherwise agreed", "Defect count and foreign matter per contract", "Cup profile confirmed by sample where specified", "Clean, odour-free bagging and storage"],
    grading: ["Screen sizes measured in 64ths of an inch", "Hand and machine sorting to remove defects", "Grade confirmed against type or pre-shipment samples"],
    transport: ["FCL 20ft containers typically hold around 300–320 bags of 60kg (confirm with your forwarder)", "Container liners or desiccants to manage condensation", "Typical sea transit to the UK via Suez: several weeks"],
    enquiries: ["Monthly FCL of Robusta Screen 15 for a roaster", "Arabica AA samples for specialty cupping", "Soluble-grade Robusta for an instant coffee plant"],
    faqs: [
      { q: "What does Screen 18 mean?", a: "Beans retained on a sieve with holes 18/64 of an inch across (about 7.1mm). Larger numbers mean larger beans." },
      { q: "What are Wugar and Drugar?", a: "Wugar is washed Ugandan Arabica; Drugar is dry-processed (natural) Ugandan Arabica — both established Ugandan trade names." },
      { q: "Can I get samples before contracting?", a: "Yes — type samples and pre-shipment samples can usually be arranged for serious enquiries." },
    ],
    seoTitle: "Uganda Green Coffee — Robusta Screen 18, 15, 12, FAQ & Arabica AA, AB, Wugar, Drugar",
    seoDescription: "Uganda green coffee for importers and roasters: Robusta Screen 18, 15, 12 and FAQ, washed Robusta, Arabica AA, AB, Bugisu, Wugar and Drugar, bagged for export.",
  },
  {
    slug: "cocoa",
    name: "Cocoa",
    shortName: "Cocoa",
    eyebrow: "Cocoa sourcing",
    title: "Fermented, dried and graded Ugandan cocoa",
    intro: "Ugandan cocoa is grown mainly by smallholders in Bundibugyo and other western and central districts. We coordinate sourcing, grading and bagging of fermented, dried beans for export.",
    icon: "cocoa",
    image: "/images/cocoa-pods.webp",
    imageAlt: "Cocoa pods on the tree",
    accent: "accent-cocoa",
    summary: "Fermented and dried cocoa beans, graded export lots and bulk sourcing.",
    subcategories: [],
    highlights: [
      { title: "Moisture control", text: "Beans dried to the contract limit — commonly 7.5% or below.", icon: "sun" },
      { title: "Cut-test grading", text: "Fermentation, mould, slate and insect damage assessed by cut test.", icon: "scale" },
      { title: "Bagged export supply", text: "Jute or sisal bags for containerised sea freight.", icon: "container" },
    ],
    logistics: ["Ventilated or lined dry containers to manage condensation.", "Fumigation and phytosanitary documents where required.", "Third-party inspection and laboratory analysis on request."],
    applications: ["Chocolate makers and bean-to-bar producers", "Cocoa processors and grinders", "Commodity traders"],
    quality: ["Moisture commonly ≤ 7.5%", "Bean count per 100g agreed", "Cut-test limits for slaty, mouldy and insect-damaged beans", "Free from smoke taint and foreign odours"],
    grading: ["Cleaned and sorted to remove flat, broken and foreign material", "Bean count measured on samples", "Graded lots bulked and bagged by quality"],
    transport: ["Sea freight in 20ft or 40ft dry containers", "Container liners, kraft paper and desiccants to limit condensation", "Fumigation where required by destination"],
    enquiries: ["Container of graded fermented beans for a grinder", "Small specialty lots for bean-to-bar makers", "Regular bulk supply for a trading house"],
    faqs: [
      { q: "Do you export raw (wet) cocoa?", a: "Wet beans cannot be exported; they are fermented and dried in Uganda first. Enquiries for unfermented material are assessed case by case." },
      { q: "Is the cocoa certified?", a: "Only where the producer group's certificate covers the lot. We confirm this before quoting." },
    ],
    seoTitle: "Uganda Cocoa Beans — Fermented, Dried & Graded Export Cocoa",
    seoDescription: "Fermented, sun-dried and graded Ugandan cocoa beans for chocolate makers, processors and traders — bean count, moisture and cut-test agreed per contract.",
  },
  {
    slug: "oilseeds",
    name: "Oilseeds",
    shortName: "Oilseeds",
    eyebrow: "Oilseeds",
    title: "Sesame, sunflower, groundnuts, soybeans and chia",
    intro: "Cleaned and graded oilseeds from northern and eastern Uganda for crushers, bakeries, confectioners and commodity traders.",
    icon: "sesame",
    image: "/images/axis-sesame-hand.webp",
    imageAlt: "Handful of white sesame seeds",
    accent: "accent-gold",
    summary: "White, brown and mixed sesame, sunflower seed, groundnuts, soybeans and chia.",
    subcategories: [
      { slug: "sesame", name: "Sesame", intro: "Natural white, brown and mixed sesame.", image: "/images/axis-sesame-hand.webp", imageAlt: "White sesame seeds", icon: "sesame" },
      { slug: "other-oilseeds", name: "Sunflower, Groundnuts & Soy", intro: "Sunflower seed, groundnuts, soybeans and chia.", image: "/images/sunflower-seeds.webp", imageAlt: "Sunflower seeds", icon: "sun" },
    ],
    highlights: [
      { title: "Machine-cleaned", text: "Purity, admixture and moisture specified and verified before loading.", icon: "check" },
      { title: "Aflatoxin awareness", text: "Groundnut lots tested against destination limits on request.", icon: "flask" },
      { title: "Bulk or bagged", text: "25kg and 50kg bags, or bulk-bag configurations for FCL.", icon: "bag" },
    ],
    logistics: ["FCL sea freight in 20ft or 40ft dry containers.", "Fumigation and phytosanitary certificates per destination rules.", "Pre-shipment inspection on request."],
    applications: ["Oil crushers", "Bakeries and tahini producers", "Confectionery and snack manufacturers", "Animal feed (by-products)", "Commodity traders"],
    quality: ["Purity and admixture to contract", "Moisture and oil content tested", "Aflatoxin tested where relevant", "Free from live insects"],
    grading: ["Cleaned by machine to the agreed purity", "Colour sorting where specified", "Sampled and tested before bagging"],
    transport: ["Dry containers with liners for bulk", "Fumigation as required", "Typical lead time several weeks from contract to loading"],
    enquiries: ["Container of white sesame 99.95% purity", "Groundnut kernels for a snack maker", "Sunflower seed for an oil mill"],
    faqs: [
      { q: "What purity can you supply sesame at?", a: "Commonly 98% to 99.95% depending on cleaning; we confirm achievable purity per lot." },
      { q: "Are groundnuts tested for aflatoxin?", a: "Yes, on request, against the limits of your destination market." },
    ],
    seoTitle: "Sesame, Sunflower, Groundnut, Soybean & Chia Supplier — Ugandan Oilseeds",
    seoDescription: "Ugandan white, brown and mixed sesame, sunflower seed, groundnuts, soybeans and chia — cleaned, tested and bagged for export.",
  },
  {
    slug: "grains-pulses",
    name: "Grains & Pulses",
    shortName: "Grains & Pulses",
    eyebrow: "Grains & pulses",
    title: "Maize, sorghum, millet, rice and pulses",
    intro: "Staple grains and pulses grown across Uganda — supplied cleaned, dried and bagged for food manufacturers, millers, feed producers and traders.",
    icon: "bag",
    image: "/images/maize.webp",
    imageAlt: "Pile of dried maize cobs",
    accent: "accent-gold",
    summary: "Maize, sorghum, millet, finger millet, rice, dried beans, green grams, cowpeas and pigeon peas.",
    subcategories: [
      { slug: "grains", name: "Grains", intro: "Maize, sorghum, millet, finger millet and rice.", image: "/images/sorghum.webp", imageAlt: "Ripe sorghum in the field", icon: "bag" },
      { slug: "pulses", name: "Pulses", intro: "Dried beans, green grams, cowpeas and pigeon peas.", image: "/images/dried-beans.webp", imageAlt: "Assorted dried beans", icon: "nut" },
    ],
    highlights: [
      { title: "Dried to standard", text: "Moisture reduced to safe storage levels before bagging.", icon: "sun" },
      { title: "Cleaned and sorted", text: "Foreign matter, broken and discoloured grains removed.", icon: "check" },
      { title: "Tested lots", text: "Moisture and aflatoxin testing on request.", icon: "flask" },
    ],
    logistics: ["Sea freight in dry containers, bagged or in liner bags.", "Regional road freight within East Africa where relevant.", "Fumigation and phytosanitary certificates as required."],
    applications: ["Flour millers and bakeries", "Breweries (sorghum)", "Animal feed producers", "Food manufacturers", "Commodity traders"],
    quality: ["Moisture typically 12–13.5% depending on grain", "Foreign matter and broken grains within contract limits", "Aflatoxin tested where relevant", "Free from live insects"],
    grading: ["Graded by size and colour", "Machine-cleaned and sieved", "Sampled before bagging"],
    transport: ["Bagged in 25–50kg PP bags or in bulk liners", "Dry containers with fumigation where required", "Storage in clean, dry, ventilated warehouses before loading"],
    enquiries: ["Container of white maize for a miller", "Red sorghum for a brewer", "Green grams for a pulse packer"],
    faqs: [
      { q: "Which grains are regular lines?", a: "Maize, sorghum, millet and pulses were part of our earlier range; others such as rice are sourcing enquiries confirmed case by case." },
      { q: "Can you supply flour instead of grain?", a: "Some flours, such as cassava and sweet potato flour, are listed under dried products; milled grain flours are sourcing enquiries." },
    ],
    seoTitle: "Maize, Sorghum, Millet, Rice & Pulses — Ugandan Grains Supplier",
    seoDescription: "Ugandan maize, sorghum, millet, finger millet, rice, dried beans, green grams, cowpeas and pigeon peas — cleaned, dried and bagged.",
  },
  {
    slug: "nuts",
    name: "Nuts & Natural Ingredients",
    shortName: "Nuts",
    eyebrow: "Nuts & natural ingredients",
    title: "Macadamia, cashew, shea and seeds",
    intro: "Macadamia nuts and kernels, cashew, shea nuts and butter and pumpkin seeds for snack, ingredient and cosmetic manufacturers.",
    icon: "nut",
    image: "/images/macadamia.webp",
    imageAlt: "Shelled macadamia kernels",
    accent: "accent-gold",
    summary: "Macadamia, cashew, shea nuts, shea butter and pumpkin seeds.",
    subcategories: [],
    highlights: [
      { title: "Kernel grading", text: "Style and size grades confirmed against samples.", icon: "scale" },
      { title: "Protective packing", text: "Vacuum-packed and nitrogen-flushed kernels where specified.", icon: "box" },
      { title: "Natural ingredients", text: "Shea nuts and butter for cosmetic and food uses.", icon: "drop" },
    ],
    logistics: ["Sea freight in dry containers; small kernel lots by air.", "Vacuum packs or cartons protect kernels from moisture and oxidation.", "Phytosanitary and quality documents per destination."],
    applications: ["Snack and confectionery brands", "Bakeries", "Cosmetic and skincare manufacturers", "Health food retailers"],
    quality: ["Moisture within kernel specification", "Free from mould and rancidity", "Aflatoxin tested on request"],
    grading: ["Graded by style (wholes, halves, pieces) and size", "Colour sorting", "Samples supplied for approval"],
    transport: ["Dry containers; protect from heat and humidity", "Vacuum-packed cartons for kernels", "Drums for shea butter"],
    enquiries: ["Macadamia kernels style 1 for a snack brand", "Unrefined shea butter for a cosmetic maker", "Pumpkin seeds for a bakery"],
    faqs: [{ q: "Is shea butter refined?", a: "Both unrefined and refined grades can be sourced; we confirm specifications with each processor." }],
    seoTitle: "Macadamia, Cashew, Shea & Pumpkin Seeds — Nuts & Natural Ingredients",
    seoDescription: "Macadamia nuts and kernels, cashew, shea nuts, shea butter and pumpkin seeds from East Africa for snack, ingredient and cosmetic manufacturers.",
  },
  {
    slug: "dried-products",
    name: "Dried & Processed Produce",
    shortName: "Dried Products",
    eyebrow: "Value-added produce",
    title: "Dried fruit, flours, purées and processed produce",
    intro: "Dried tropical fruit, banana, cassava and sweet potato flours, dried spices, moringa, fruit purées and concentrates from processors in Uganda and East Africa.",
    icon: "sun",
    image: "/images/dried-fruit-mix.webp",
    imageAlt: "Assorted dried tropical fruit",
    accent: "accent-gold",
    summary: "Dried fruit, flours, dried spices, moringa, purées, concentrates and dehydrated vegetables.",
    subcategories: [
      { slug: "dried-fruit", name: "Dried Fruit", intro: "Dried pineapple, mango, banana, jackfruit and papaya.", image: "/images/dried-fruit-mix.webp", imageAlt: "Dried tropical fruit", icon: "sun" },
      { slug: "flours", name: "Flours", intro: "Banana, cassava and sweet potato flour.", image: "/images/flour.webp", imageAlt: "Flour on a wooden table", icon: "bag" },
      { slug: "purees-concentrates", name: "Purées & Concentrates", intro: "Tropical fruit purées and juice concentrates.", image: "/images/fruit-juices.webp", imageAlt: "Bottles of fruit juice", icon: "drop" },
      { slug: "other-processed", name: "Other Processed Produce", intro: "Moringa, dehydrated vegetables and banana chips.", image: "/images/moringa.webp", imageAlt: "Moringa leaves", icon: "leaf" },
    ],
    highlights: [
      { title: "Long shelf life", text: "Suited to sea freight and longer supply programmes.", icon: "box" },
      { title: "Private label ready", text: "Bulk or retail-ready packing agreed with processors.", icon: "tag" },
      { title: "Processor vetting", text: "Processing standards and documents confirmed before contracting.", icon: "shield" },
    ],
    logistics: ["Dry containers; consolidation with other ambient lines possible.", "Food-grade liners, cartons, drums or aseptic bags depending on product.", "Processor certifications confirmed case by case."],
    applications: ["Snack brands", "Bakeries and cereal makers", "Juice and beverage manufacturers", "Gluten-free and health food producers", "Supplement brands"],
    quality: ["Moisture or Brix within specification", "Free from foreign matter", "Microbiological testing on request", "Additive-free options where specified"],
    grading: ["Sorted by cut size and colour", "Flours sieved to an agreed mesh", "Batch coding for traceability"],
    transport: ["Ambient sea freight for most dried products", "Frozen or aseptic logistics for purées depending on format", "Moisture-proof packaging"],
    enquiries: ["Dried mango slices with no added sugar", "Cassava flour for a gluten-free bakery", "Passion fruit purée for a beverage brand"],
    faqs: [
      { q: "Are dried fruits sugar-free?", a: "Many processors offer no-added-sugar options; we confirm this per product and lot." },
      { q: "Do you supply aseptic purées?", a: "Purées and concentrates are sourcing enquiries — format (aseptic, frozen) depends on the processor." },
    ],
    seoTitle: "Dried Fruit, Flours, Purées & Processed Produce from Uganda",
    seoDescription: "Dried pineapple, mango, banana and jackfruit, banana and cassava flours, dried spices, moringa, fruit purées and concentrates from East African processors.",
  },
];

export { CONFIRM };
export const GROUPS = CATEGORIES.map((c) => ({ id: c.slug, label: c.shortName, icon: c.icon }));
export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryForGroup = (group: CategorySlug) => CATEGORIES.find((c) => c.slug === group)!;
export const groupLabel = (group: CategorySlug) => categoryForGroup(group).shortName;
export const subcategoryOf = (cat: CategorySlug, sub?: string) => (sub ? categoryForGroup(cat).subcategories.find((s) => s.slug === sub) : undefined);
