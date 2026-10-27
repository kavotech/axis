import type { QuoteKind } from "./categories";

export const BUYER_TYPES = [
  "Importer",
  "Distributor",
  "Wholesaler",
  "Retailer",
  "Supermarket",
  "Food processor",
  "Procurement agent",
  "Foodservice provider",
  "Other",
] as const;

export const QUANTITY_UNITS = [
  { id: "kg", label: "Kilograms (kg)" },
  { id: "t", label: "Metric tonnes (MT)" },
  { id: "cartons", label: "Cartons" },
  { id: "pallets", label: "Pallets" },
  { id: "bags", label: "Bags" },
  { id: "containers", label: "Containers" },
] as const;
export type QuantityUnit = (typeof QUANTITY_UNITS)[number]["id"];

export const PACKAGING = [
  "5kg cartons",
  "10kg cartons",
  "60kg bags",
  "Bulk bags",
  "Palletised cartons",
  "Loose-loaded containers",
  "Custom packaging",
] as const;

export const CONTAINERS = [
  { id: "20dv", label: "20ft dry", reefer: false },
  { id: "40dv", label: "40ft dry", reefer: false },
  { id: "40hc", label: "40ft high-cube", reefer: false },
  { id: "20rf", label: "20ft reefer", reefer: true },
  { id: "40rf", label: "40ft reefer", reefer: true },
] as const;

/** Which units, packaging and containers make sense for each product type. */
export const KIND_RULES: Record<
  QuoteKind,
  { units: QuantityUnit[]; packaging: (typeof PACKAGING)[number][]; containers: string[]; perishable: boolean }
> = {
  fruit: {
    units: ["kg", "t", "cartons", "pallets", "containers"],
    packaging: ["5kg cartons", "10kg cartons", "Palletised cartons", "Custom packaging"],
    containers: ["20rf", "40rf"],
    perishable: true,
  },
  vegetable: {
    units: ["kg", "t", "cartons", "pallets", "bags", "containers"],
    packaging: ["5kg cartons", "10kg cartons", "Palletised cartons", "Bulk bags", "Custom packaging"],
    containers: ["20rf", "40rf", "20dv", "40dv"],
    perishable: true,
  },
  spice: {
    units: ["kg", "t", "cartons", "pallets", "bags", "containers"],
    packaging: ["5kg cartons", "10kg cartons", "Palletised cartons", "Bulk bags", "Custom packaging"],
    containers: ["20dv", "40dv", "40hc", "20rf", "40rf"],
    perishable: false,
  },
  coffee: {
    units: ["kg", "t", "bags", "containers"],
    packaging: ["60kg bags", "Bulk bags", "Custom packaging"],
    containers: ["20dv", "40dv", "40hc"],
    perishable: false,
  },
  cocoa: {
    units: ["kg", "t", "bags", "containers"],
    packaging: ["60kg bags", "Bulk bags", "Custom packaging"],
    containers: ["20dv", "40dv", "40hc"],
    perishable: false,
  },
  oilseed: {
    units: ["kg", "t", "bags", "containers"],
    packaging: ["60kg bags", "Bulk bags", "Loose-loaded containers", "Custom packaging"],
    containers: ["20dv", "40dv", "40hc"],
    perishable: false,
  },
  dried: {
    units: ["kg", "t", "cartons", "pallets", "bags", "containers"],
    packaging: ["5kg cartons", "10kg cartons", "Palletised cartons", "Bulk bags", "Custom packaging"],
    containers: ["20dv", "40dv", "40hc"],
    perishable: false,
  },
};

export const COFFEE_GRADES = [
  "Robusta Screen 18",
  "Robusta Screen 15",
  "Robusta Screen 12",
  "Arabica AA / AAA",
  "Arabica AB",
  "Other (please specify)",
] as const;

export const RIPENESS = [
  "Mature green (for ripening at destination)",
  "Pre-conditioned",
  "Ready to eat",
  "As per buyer specification",
] as const;

export const FREIGHT_MODES = ["Air Freight", "Sea Freight", "Road Freight", "Multimodal"] as const;

export const INCOTERMS = [
  { code: "EXW", name: "Ex Works", help: "Goods are made available at the seller's premises. The buyer arranges and pays for all transport, export and import clearance." },
  { code: "FCA", name: "Free Carrier", help: "Seller hands export-cleared goods to the buyer's nominated carrier at an agreed place. Risk passes on handover." },
  { code: "FOB", name: "Free On Board", help: "Sea freight only. Seller loads export-cleared goods on board the buyer's vessel at the named port of shipment." },
  { code: "CFR", name: "Cost and Freight", help: "Sea freight only. Seller pays freight to the destination port; risk passes once goods are on board at origin." },
  { code: "CIF", name: "Cost, Insurance and Freight", help: "As CFR, plus the seller buys minimum cargo insurance for the buyer's benefit." },
  { code: "CPT", name: "Carriage Paid To", help: "Any mode. Seller pays carriage to the named destination; risk passes when goods are handed to the first carrier." },
  { code: "CIP", name: "Carriage and Insurance Paid To", help: "As CPT, plus the seller buys comprehensive (Institute Cargo Clauses A) insurance." },
  { code: "DAP", name: "Delivered at Place", help: "Seller delivers to the named place, ready for unloading. Buyer handles import clearance and duties." },
  { code: "DPU", name: "Delivered at Place Unloaded", help: "Seller delivers and unloads at the named place. Buyer handles import clearance and duties." },
  { code: "DDP", name: "Delivered Duty Paid", help: "Seller delivers cleared for import with duties paid. The maximum obligation for the seller." },
] as const;

export const DOCUMENTS = [
  { id: "phyto", label: "Phytosanitary Certificate", help: "Issued by the exporting country's plant protection authority for plant products." },
  { id: "coo", label: "Certificate of Origin", help: "Confirms the country in which goods were produced; may be needed for preferential tariffs." },
  { id: "quality", label: "Quality Inspection Certificate", help: "Inspection against the agreed specification before shipment." },
  { id: "fumigation", label: "Fumigation Certificate", help: "Required by some destinations for bagged commodities and wooden packaging." },
  { id: "invoice", label: "Commercial Invoice", help: "Standard trade document for every shipment." },
  { id: "packing", label: "Packing List", help: "Itemised list of packages, weights and marks." },
  { id: "bl", label: "Bill of Lading", help: "Sea freight transport document and document of title." },
  { id: "awb", label: "Air Waybill", help: "Air freight transport document." },
  { id: "third-party", label: "Third-party inspection", help: "Independent inspection (e.g. by an inspection company nominated by the buyer)." },
  { id: "lab", label: "Laboratory analysis", help: "e.g. moisture, aflatoxin, pesticide residues or microbiology." },
  { id: "product-cert", label: "Product-specific certification", help: "e.g. organic or other scheme certificates — available only where the producer holds them." },
  { id: "other", label: "Additional buyer requirements", help: "Describe any other documentary requirement." },
] as const;
export type DocumentId = (typeof DOCUMENTS)[number]["id"];

export const CURRENCIES = ["GBP", "USD", "EUR", "AED", "QAR"] as const;

export const PAYMENT_METHODS = [
  "Bank transfer (T/T)",
  "Letter of Credit (L/C)",
  "Documentary collection (D/P)",
  "Documentary collection (D/A)",
  "To be discussed",
] as const;

export const PAYMENT_TERMS = [
  "Advance payment",
  "Deposit with balance against documents",
  "Cash against documents",
  "Net 30 days",
  "Net 60 days",
  "To be discussed",
] as const;

export const SUPPLY_TYPES = ["One-off shipment", "Recurring supply", "Trial order, then recurring"] as const;
export const SUPPLY_FREQUENCY = ["Weekly", "Fortnightly", "Monthly", "Quarterly", "Seasonal programme"] as const;
export const CONTRACT_DURATIONS = ["Single shipment", "3 months", "6 months", "12 months", "More than 12 months", "To be discussed"] as const;

export const UPLOAD_RULES = {
  maxFiles: 3,
  maxTotalBytes: 4 * 1024 * 1024, // Vercel functions accept ~4.5MB request bodies
  accept: ".pdf,.png,.jpg,.jpeg,.docx,.xlsx,.csv",
  mimeLabel: "PDF, JPG, PNG, DOCX, XLSX or CSV",
} as const;
