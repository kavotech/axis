import { z } from "zod";
import {
  BUYER_TYPES,
  CONTRACT_DURATIONS,
  CURRENCIES,
  DOCUMENTS,
  FREIGHT_MODES,
  INCOTERMS,
  PACKAGING,
  PAYMENT_METHODS,
  PAYMENT_TERMS,
  QUANTITY_UNITS,
  SUPPLY_FREQUENCY,
  SUPPLY_TYPES,
} from "@/data/quote-options";

const text = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters`);
const required = (label: string, max = 200) => text(max).min(1, `${label} is required`);
const optional = (max = 500) => text(max).optional().default("");

const phone = z
  .string()
  .trim()
  .min(6, "Enter a phone number including country code")
  .max(30, "Phone number is too long")
  .regex(/^\+?[0-9 ()\-.]{6,30}$/, "Use digits, spaces and an optional leading +");

const website = z
  .string()
  .trim()
  .max(200)
  .optional()
  .default("")
  .refine((v) => !v || /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v), "Enter a valid website address");

const enumOf = <T extends readonly [string, ...string[]]>(values: T, label: string) =>
  z.enum(values, { error: () => `Select ${label}` });

export const quoteItemSchema = z
  .object({
    productSlug: required("Product", 80),
    productName: required("Product name", 120),
    kind: z.enum(["fruit", "vegetable", "spice", "coffee", "cocoa", "oilseed", "dried"]),
    variety: optional(120),
    grade: optional(120),
    gradeOther: optional(120),
    originPreference: optional(120),
    quantity: z.coerce
      .number({ error: "Enter a quantity" })
      .positive("Quantity must be greater than zero")
      .max(10_000_000, "Quantity looks too large"),
    unit: enumOf(QUANTITY_UNITS.map((u) => u.id) as unknown as readonly [string, ...string[]], "a unit"),
    packaging: enumOf(PACKAGING, "a packaging type"),
    packagingOther: optional(200),
    containerType: optional(40),
    calibre: optional(120),
    ripeness: optional(120),
    handling: optional(400),
    specifications: optional(1500),
  })
  .superRefine((v, ctx) => {
    if (v.productSlug === "other" && v.productName.length < 2)
      ctx.addIssue({ code: "custom", path: ["productName"], message: "Name the product you need" });
    if (v.kind === "coffee" && !v.grade) ctx.addIssue({ code: "custom", path: ["grade"], message: "Select a coffee grade" });
    if (v.grade.startsWith("Other") && !v.gradeOther)
      ctx.addIssue({ code: "custom", path: ["gradeOther"], message: "Describe the grade you require" });
    if (v.packaging === "Custom packaging" && !v.packagingOther)
      ctx.addIssue({ code: "custom", path: ["packagingOther"], message: "Describe the packaging you require" });
    if (v.unit === "containers" && !v.containerType)
      ctx.addIssue({ code: "custom", path: ["containerType"], message: "Select a container type" });
  });

export const buyerSchema = z
  .object({
    fullName: required("Full name", 120),
    company: required("Company name", 160),
    country: required("Country", 80),
    email: z.string().trim().max(200).pipe(z.email("Enter a valid business email")),
    phone,
    website,
    deliveryAddress: required("Delivery address", 500),
    buyerType: enumOf(BUYER_TYPES, "a buyer classification"),
    buyerTypeOther: optional(120),
  })
  .superRefine((v, ctx) => {
    if (v.buyerType === "Other" && !v.buyerTypeOther) ctx.addIssue({ code: "custom", path: ["buyerTypeOther"], message: "Describe your business type" });
  });

export const tradeSchema = z.object({
  originCountry: required("Origin country", 80),
  destinationCountry: required("Destination country", 80),
  deliveryCity: required("Delivery city", 120),
  loadingPort: optional(120),
  destinationPort: required("Destination port or airport", 120),
  freightMode: enumOf(FREIGHT_MODES, "a freight mode"),
  incoterm: enumOf(INCOTERMS.map((i) => i.code) as unknown as readonly [string, ...string[]], "an Incoterm"),
  shipmentDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose an expected shipment date")
    .refine((d) => {
      const t = Date.parse(d);
      return !Number.isNaN(t) && t >= Date.now() - 2 * 86_400_000 && t <= Date.now() + 3 * 365 * 86_400_000;
    }, "Choose a date between today and three years from now"),
  dateFlexible: z.boolean().default(false),
});

export const qualitySchema = z.object({
  documents: z.array(z.enum(DOCUMENTS.map((d) => d.id) as unknown as readonly [string, ...string[]])).max(20).default([]),
  additionalRequirements: optional(1500),
});

export const commercialSchema = z
  .object({
    currency: enumOf(CURRENCIES, "a currency"),
    targetPrice: optional(120),
    paymentMethod: enumOf(PAYMENT_METHODS, "a payment method"),
    paymentTerms: enumOf(PAYMENT_TERMS, "payment terms"),
    supplyType: enumOf(SUPPLY_TYPES, "a supply type"),
    frequency: optional(40),
    contractDuration: enumOf(CONTRACT_DURATIONS, "a contract duration"),
    conditions: optional(1500),
  })
  .superRefine((v, ctx) => {
    if (v.supplyType !== "One-off shipment" && !(SUPPLY_FREQUENCY as readonly string[]).includes(v.frequency))
      ctx.addIssue({ code: "custom", path: ["frequency"], message: "Select a supply frequency" });
  });

export const consentSchema = z.object({
  privacy: z.literal(true, { error: () => "Please confirm you have read the privacy notice" }),
  accuracy: z.literal(true, { error: () => "Please confirm the information is accurate" }),
});

export const quoteSchema = z.object({
  buyer: buyerSchema,
  items: z.array(quoteItemSchema).min(1, "Add at least one product").max(10, "Up to 10 products per enquiry"),
  trade: tradeSchema,
  quality: qualitySchema,
  commercial: commercialSchema,
  consent: consentSchema,
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteData = z.output<typeof quoteSchema>;
export type QuoteItem = z.output<typeof quoteItemSchema>;

export const contactSchema = z.object({
  name: required("Name", 120),
  company: optional(160),
  email: z.string().trim().max(200).pipe(z.email("Enter a valid email address")),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .default("")
    .refine((v) => !v || /^\+?[0-9 ()\-.]{6,30}$/.test(v), "Enter a valid phone number"),
  country: optional(80),
  topic: enumOf(
    ["General enquiry", "Product availability", "Supplier / sourcing partnership", "Logistics & documentation", "Media or other"] as const,
    "a topic",
  ),
  message: text(4000).min(10, "Please add a little more detail (at least 10 characters)"),
  privacy: z.literal(true, { error: () => "Please confirm you have read the privacy notice" }),
});

export type ContactData = z.output<typeof contactSchema>;
export const CONTACT_TOPICS = contactSchema.shape.topic.options;

/** Shared anti-spam envelope fields. */
export const envelopeSchema = z.object({
  recaptchaToken: z.string().max(4000).optional().default(""),
  /** Honeypot — must stay empty. */
  fax: z.string().max(200).optional().default(""),
  /** Client timestamp when the form was opened (ms). */
  startedAt: z.coerce.number().optional().default(0),
});

/** Flatten zod issues into a { "a.b.c": message } map for inline display. */
export function issuesToMap(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of error.issues) {
    const key = i.path.join(".");
    if (!out[key]) out[key] = i.message;
  }
  return out;
}
