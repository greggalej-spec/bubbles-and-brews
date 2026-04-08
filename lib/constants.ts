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
      "Vintage Italian carbonated wine cart, bespoke-branded and serving prosecco on tap. She arrives. The room transforms.",
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
      "The first portable prosecco tap system in the Caribbean. Imported from Italy, bespoke-branded, always fresh. Limited to 5 units.",
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
      "The world's lowest-sugar prosecco, from Peninsula Winery. Just 2.8g per bottle. Available in Brut and Rosé.",
    useCases: ["Inclusive celebrations", "Health-conscious hosts", "Bridal events", "Keto-friendly"],
    cta: "Order for Your Event",
    type: "bottle",
    image: "/assets/prosecco-extract-1.png",
    imageAlt: "Prosecco Zero — clear bottle with gold cap",
    imagePlaceholder: false,
  },
] as const;
