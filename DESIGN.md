# Design System — Bubbles & Brews Co.

## Product Context
- **What this is:** Luxury mobile prosecco bar and curated sparkling product brand
- **Who it's for:** Event planners, couples, corporate bookers, and venues in Trinidad & Tobago who want a premium bar experience — inclusive of non-drinkers via Prosecco Zero
- **Space/industry:** Premium event services + specialty beverage, Caribbean market
- **Project type:** Marketing site with booking conversion as primary goal
- **Brand voice:** Warm, celebratory, life of the party. Luxury with hints of novelty and humor. Knows it's fancy. Winks about it occasionally.

## Aesthetic Direction
- **Direction:** Art-Deco Warmth — editorial precision meets Caribbean light
- **Decoration level:** Intentional — subtle grain texture, concentric ring accents, rising bubble motifs that tell a story
- **Mood:** Arriving at a beautiful event where everything is already perfect. The room is warm. The glasses are full. You belong here.
- **Visual thesis:** Cormorant structure, champagne warmth, one wink per page.

## Typography

- **Display/Hero:** Cormorant Garamond — 300/400 weight, italic for emphasis moments. The font that says "we've been doing this for a while." Keep.
- **Body:** DM Sans — 300/400/500. Clean, legible, doesn't compete. Keep.
- **UI/Labels:** DM Sans — same as body, 400-500, uppercase + tracking for eyebrow labels
- **Data/Tables:** DM Sans with `tabular-nums` variant — consistent number width for MetricsCounter
- **Code:** N/A for this product
- **Loading:** Google Fonts CDN via `next/font/google` (already configured in layout.tsx)

### Type Scale
```
--text-hero:    clamp(3.5rem, 8vw, 7.5rem)   Hero headline (Cormorant, 300)
--text-display: clamp(2.5rem, 5vw, 5rem)     Section headings (Cormorant, 300)
--text-section: clamp(1.75rem, 3vw, 3rem)    Card/sub-section headings
--text-lead:    clamp(1.1rem, 1.5vw, 1.35rem) Lead body copy
--text-body:    1rem                          Standard body (DM Sans)
--text-small:   0.875rem                     Labels, captions, metadata
```

### Eyebrow Label Treatment
All eyebrow labels: `text-xs tracking-[0.3em] uppercase text-[var(--gold-deep)]`. This is a system-wide pattern — document it here so it's never inconsistently applied.

## Color

### Approach
Restrained gold palette + rosé blush secondary. Color is rare and intentional. When it appears, it means something.

### Tokens
```css
/* Surfaces */
--cream-light:  #FAF7F2   /* Primary section background (warm near-white) */
--cream:        #F5F0E8   /* Alternate section background */
--cream-dark:   #EDE4D3   /* Card panels, form inputs, borders */
--black:        #0E0D0B   /* Dark sections (MetricsCounter, Footer) */
--black-soft:   #141310   /* Dark section surfaces */

/* Text */
--charcoal:     #1A1816   /* Primary text on light surfaces */
--charcoal-mid: #3D3A35   /* Secondary text on light surfaces */
--muted:        #6A6460   /* Tertiary text — 4.5:1 on cream, min WCAG AA */
--muted-dark:   #8A8480   /* Text on dark sections — 4.5:1 on near-black */

/* Gold system (primary accent) */
--gold-light:   #E8D5A3   /* Decorative highlights, shimmer effects */
--gold-mid:     #C9A96E   /* Borders, icons, decorative lines */
--gold-deep:    #8A6520   /* Text accents, eyebrow labels — 4.6:1 on cream */
--gold-accent:  #7A5510   /* Hover states, deepest gold */

/* Rosé accent (secondary — use sparingly) */
--rose:         #D4848A   /* Rosé product accent, celebratory moments */
--rose-light:   #ECC5C8   /* Rose hover states, soft highlights */
--rose-dark:    #A85A60   /* Rose text accents (must pass contrast on cream) */

/* Utility */
--brand-wa:     #25D366   /* WhatsApp green — isolated to wa-specific UI only */
```

### Usage Rules
- Never use `--white` or `rgba(255,255,255,X)` as text color on light surfaces. Use `--charcoal`, `--charcoal-mid`, or `--muted`.
- `--brand-wa` appears only in WhatsApp-specific buttons and links. Not as a general accent.
- `--rose` appears primarily in the Prosecco Zero Rosé card and product spotlight. One or two other celebratory moments per page maximum.
- Gold gradient text: `background: linear-gradient(135deg, --gold-light, --gold-mid, --gold-deep)` — used for italic emphasis spans only.

### Dark Mode
Not in scope for launch. Dark sections (MetricsCounter, Footer) use `--black` + `--muted-dark` text. Ensure all dark-section text uses `--muted-dark` or lighter, never `--white`/60% which fails on light backgrounds if reused incorrectly.

## Spacing

- **Base unit:** 4px (Tailwind default)
- **Density:** Generous — this is a luxury product. Never crowd content.
- **Section gap:** `clamp(4rem, 10vw, 10rem)` via `--section-gap` and `.section-padding`
- **Container:** max-width 1400px, padding `clamp(1.5rem, 4vw, 4rem)` each side

### Rhythm Rules
- Section eyebrow → heading gap: `mb-4` (16px)
- Heading → body copy gap: `mb-6` to `mb-8` (24-32px)
- Body → CTA gap: `mb-10` to `mb-12` (40-48px)
- Between sections: `.section-padding` only — never add extra margin to sections

## Layout

- **Approach:** Grid-disciplined with one editorial break per page
- **Homepage section order:** Hero → Tagline → Offerings → Bella → Prosecco Spotlight → Events Gallery → Metrics → Contact CTA
- **Grid:** 12-column. 2-col at `md`, single at mobile. Use 2-col splits for feature sections.
- **Max content width:** `--content-max: 1400px`
- **Border radius:** None (flat, sharp edges reinforce the editorial/luxury aesthetic). Exception: circular elements (bubble rings, avatar) use `rounded-full`.

### Section Color Rhythm
Alternate sections to create visual rhythm without placeholders being obvious:
```
Hero            → cream gradient (radial gold wash)
Tagline         → cream (#F5F0E8)
Offerings       → cream (#F5F0E8)
BellaFeature    → cream-light split / full-bleed image
ProseccoSpotlight → cream-light (#FAF7F2)
EventsGallery   → cream (#F5F0E8) or dark (#0E0D0B)
MetricsCounter  → black (#0E0D0B)     ← dark break
ContactCTA      → charcoal (#1A1816)  ← transition
Footer          → black (#0E0D0B)
```

## Motion

- **Approach:** Intentional — animations that tell the story of champagne. Bubbles rise. Corks pop. Things enter with weight.
- **Principle:** One playful beat per section maximum. The rest is editorial entrance animation.

### Tokens
```
--ease-luxury:  cubic-bezier(0.16, 1, 0.3, 1)   All entrances (spring-like)
--ease-reveal:  cubic-bezier(0.25, 0.46, 0.45, 0.94)  Standard reveals
--duration-base: 0.6s
--duration-slow: 1.2s
```

### Motion Inventory
| Element | Animation | Duration | Notes |
|---------|-----------|----------|-------|
| Hero headline | y: 100%→0, opacity | 1.1s | Clip overflow |
| Section reveals | MotionWrapper: y+opacity | 0.9s | Staggered delay |
| BubbleField | CSS bubble-rise (infinite) | 12-18s | Very subtle, z:3 |
| CorkPop | One-time burst | 1.5s | 2.8s after load |
| ProseccoSpotlight bubbles | Framer loop | 3-4s | Repeating, 0.45 opacity |
| Bottle video | MP4 autoplay loop | — | Poster = PNG fallback |
| Nav scroll | Background fade | 0.7s | blur(12px) at y>60 |

### Reduced Motion
Always implement. Use `useReducedMotion()` in Framer components and `@media (prefers-reduced-motion: reduce)` in CSS. Skip all decorative animations; keep only functional transitions at <0.2s.

## Personality Moments

These are intentional departures from straight luxury. Use exactly one per page section — never more.

1. **Winking headline** — The Tagline section should include one line that winks. Example: *"The secret ingredient is none of your business."* Signals warmth without undercutting premium.
2. **CorkPop** — One-time animation on hero load. Already implemented.
3. **Bubble field** — Ambient, not intrusive. Already implemented.
4. **Rosé accent on hover** — Rosé card and spotlight get `--rose` on interactive moments.

Do not: make the mobile menu playful. Do not: add bounce animations to buttons. Do not: use `--rose` outside the rosé product context. Restraint is what makes the personality moments land.

## Known Issues (fix before launch)

| Priority | Issue | File | Fix |
|----------|-------|------|-----|
| CRITICAL | `/offerings` → 404 | `lib/constants.ts:45` | Create `app/offerings/page.tsx` or change href to `/#offerings` |
| CRITICAL | `/events` → 404 | `lib/constants.ts:47` | Create `app/events/page.tsx` or remove from nav until ready |
| CRITICAL | Contact form sends nowhere | `ContactForm.tsx:83` | Wire to Server Action or Resend |
| HIGH | White text on cream bg | `ContactForm.tsx:137,155,169,188` | Replace `var(--white)/60` with `var(--charcoal-mid)` or `var(--muted)` |
| HIGH | Date picker color-scheme | `ContactForm.tsx:298` | Remove `[color-scheme:dark]` |
| MEDIUM | Metrics placeholder visible | `MetricsCounter.tsx:51-53` | Remove before launch |
| MEDIUM | Bella "see every angle" empty | `BellaSplineScene.tsx` | Hide section until SPLINE_URL set |
| MEDIUM | Navbar wordmark inconsistency | `Navbar.tsx:43` | Decide: "B&B Co." or "Bubbles & Brews" |
| MEDIUM | WhatsApp green palette clash | Footer, ContactForm | Wrap in `--brand-wa`, soften button treatment |

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-08 | Cormorant Garamond + DM Sans confirmed | Strong luxury pairing, already integrated |
| 2026-04-08 | Flat/sharp border radius throughout | Editorial luxury aesthetic, no bubbly corners |
| 2026-04-08 | Added `--rose` secondary accent | Product-driven (Rosé is hero product), adds warmth to all-gold system |
| 2026-04-08 | Dark MetricsCounter = deliberate rhythm break | Editorial technique: one dark chapter in cream-dominant layout |
| 2026-04-08 | Section color alternation documented | Prevents sections from bleeding together at scroll speed |
| 2026-04-08 | `var(--white)/X` banned on light surfaces | Accessibility — white on cream fails WCAG contrast |
| 2026-04-08 | `--brand-wa` token for WhatsApp green | Isolates off-palette color to intentional, branded UI only |
| 2026-04-08 | One personality moment per section max | Warmth/humor through restraint — more effective than pervasive playfulness |
| 2026-04-08 | Design system created via /design-consultation | Full audit: 3 critical bugs, 4 high, 4 medium findings |
