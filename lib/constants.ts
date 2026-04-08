/* ─── Brand constants ────────────────────────────────────────────────── */

export const BRAND = {
  name: "Bubbles & Brews Co.",
  tagline: "Pour the Moment",
  subTagline: "Trinidad's most elevated prosecco experience",
  phone: "+1 (868) 680-9826",
  phoneRaw: "18686809826",
  email: "bubblesandbrewsco@gmail.com",
  instagram: "https://www.instagram.com/bubblesandbrewsco",
  whatsapp: "https://wa.me/18686809826",
  location: "Trinidad & Tobago",
} as const;

/* ─── Placeholder metrics (replace with real data when available) ─────── */
export const METRICS = [
  {
    label: "Bottles Served",
    value: 1200,
    suffix: "+",
    /* PLACEHOLDER: Replace with actual cumulative bottles sold/served */
  },
  {
    label: "Glasses Poured",
    value: 18500,
    suffix: "+",
    /* PLACEHOLDER: Replace with actual glasses poured count */
  },
  {
    label: "Events Hosted",
    value: 85,
    suffix: "+",
    /* PLACEHOLDER: Replace with actual event count */
  },
  {
    label: "Venues Activated",
    value: 12,
    suffix: "+",
    /* PLACEHOLDER: Replace with actual activated venue count */
  },
];

/* ─── Navigation links ───────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: "Offerings", href: "/#offerings" },
  { label: "Contact", href: "/contact" },
];

export const OFFERING_LINKS = [
  { label: "Bella", href: "/offerings/bella", desc: "Mobile prosecco bar" },
  { label: "Porta-Bella", href: "/offerings/porta-bella", desc: "Countertop tap system" },
  { label: "Bottles", href: "/offerings/bottles", desc: "Prosecco Zero collection" },
];

/* ─── Offerings data ─────────────────────────────────────────────────── */
export const OFFERINGS = [
  {
    id: "bella",
    name: "Bella",
    pitch: "She arrives. The room notices.",
    description:
      "An imported Italian carbonated wine cart — Bella is a fully curated, visually stunning luxury mobile prosecco bar that becomes the centrepiece of your event. Vintage-styled, bespoke-branded, and serving prosecco on tap. She transforms any occasion into an experience people remember.",
    useCases: ["Weddings", "Corporate activations", "Brand events", "Luxury parties"],
    cta: "Book Bella for Your Event",
    type: "experience",
    video: "/assets/champagne-glass.mp4",
    videoPoster: "/assets/prosecco-extract-1.png",
    imagePlaceholder: false,
  },
  {
    id: "porta-bella",
    name: "Porta-Bella",
    pitch: "Prosecco on tap. Wherever you are.",
    description:
      "A portable countertop prosecco tap system, imported from Italy and bespokely branded — new to the Caribbean market. Uses the same 20-litre pressurised keg as Bella (equivalent to 27+ bottles), always sealed and temperature-controlled. Available for permanent restaurant install or event rental. Limited to 5 units.",
    useCases: ["Restaurants & bars", "Hotels", "Recurring venues", "Corporate offices"],
    cta: "Activate Porta-Bella at Your Venue",
    type: "product",
    video: "/assets/dolly-clean-2.mp4",
    videoPoster: "/assets/prosecco-extract-1.png",
    imagePlaceholder: false,
  },
  {
    id: "bottles",
    name: "Prosecco Zero",
    pitch: "All the flavor. Zero the guilt.",
    description:
      "From Peninsula Winery — the world's lowest-sugar prosecco. Just 2.8g per bottle versus 25g+ in standard prosecco. Crafted from premium Glera grapes in Italy's Friuli Venezia Giulia region using a novel fermentation approach. Available in Brut (floral, fresh, crisp) and Rosé (strawberries, red berries, lively and silky).",
    useCases: ["Inclusive celebrations", "Health-conscious hosts", "Bridal events", "Keto-friendly"],
    cta: "Order for Your Event",
    type: "bottle",
    image: "/assets/prosecco-extract-1.png",
    imageAlt: "Prosecco Zero — clear bottle with gold cap",
    imagePlaceholder: false,
  },
] as const;
