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
  { label: "Bella", href: "/offerings/bella" },
  /* Events page not yet built — restore when /events page is created:
     { label: "Events", href: "/events" }, */
  { label: "Contact", href: "/contact" },
];

/* ─── Offerings data ─────────────────────────────────────────────────── */
export const OFFERINGS = [
  {
    id: "prosecco-zero",
    name: "Prosecco Zero",
    pitch: "All the sparkle. Zero compromise.",
    description:
      "Prosecco Zero delivers the full celebration experience without the alcohol — perfectly crisp, beautifully effervescent, and indistinguishable in elegance. The premium choice for the mindfully sober and the style-conscious alike.",
    useCases: ["Inclusive celebrations", "Daytime events", "Wellness gatherings"],
    cta: "Order for Your Event",
    type: "bottle",
    /*
     * ASSET PLACEHOLDER: Product cutout bottle image
     * Source: Client-supplied or distributor media
     * Style: Clean product shot on white/gold background with macro bubbles
     * Status: Awaiting client asset delivery
     */
    imagePlaceholder: true,
  },
  {
    id: "prosecco-zero-rose",
    name: "Prosecco Zero Rosé",
    pitch: "Blush. Bubbles. Beautiful.",
    description:
      "A blush-toned elegance in the zero-alcohol experience. Delicate, romantic, and visually stunning in the glass — the perfect pour for bridal events, intimate celebrations, and those who want their glass to match the moment.",
    useCases: ["Bridal showers", "Intimate dinners", "Photography-ready events"],
    cta: "Inquire About Availability",
    type: "bottle",
    image: "/assets/prosecco-zero-rose.png",
    imageAlt: "Prosecco Zero Rosé — blush bottle with black label and cherub graphic",
    imagePlaceholder: false,
  },
  {
    id: "bella",
    name: "Bella",
    pitch: "She arrives. The room notices.",
    description:
      "Bella is a luxury vintage mobile prosecco bar — a fully curated, visually stunning service unit that becomes the centrepiece of your event. Designed for upscale weddings, brand activations, and premium private functions. She serves on tap. She makes memories.",
    useCases: ["Weddings", "Corporate events", "Brand activations", "Luxury parties"],
    cta: "Book Bella for Your Event",
    type: "experience",
    /*
     * ASSET PLACEHOLDER: Bella bar in-situ event photography
     * Source: @bubblesandbrewsco Instagram / Client-supplied
     * Style: Warm editorial lifestyle — Bella as room centrepiece
     * Status: Instagram-derivable, confirm hi-res versions with client
     */
    imagePlaceholder: true,
  },
  {
    id: "porta-bella",
    name: "Porta-Bella",
    pitch: "Prosecco on tap. Wherever you need it.",
    description:
      "A countertop prosecco tap system for permanent or temporary venue installation. Offer guests something they've never seen before — prosecco, always fresh, always perfectly poured, directly from tap. Available for restaurants, bars, and home functions.",
    useCases: ["Restaurants & bars", "Hotels", "Home bar installations", "Recurring venues"],
    cta: "Activate Porta-Bella at Your Venue",
    type: "product",
    /*
     * ASSET PLACEHOLDER: Porta-Bella countertop product photo
     * Source: Client-supplied
     * Style: Clean product shot in bar/restaurant setting
     * Status: Awaiting client asset delivery
     */
    imagePlaceholder: true,
  },
];
