import Hero from "@/components/sections/Hero";
import Tagline from "@/components/sections/Tagline";
import Offerings from "@/components/sections/Offerings";
import BellaFeature from "@/components/sections/BellaFeature";
import ProseccoSpotlight from "@/components/sections/ProseccoSpotlight";
import EventsGallery from "@/components/sections/EventsGallery";
import MetricsCounter from "@/components/sections/MetricsCounter";
import ContactCTA from "@/components/sections/ContactCTA";

/**
 * Homepage — Direction 1: "The Golden Hour"
 * Editorial luxury. Premium spacing. Intentional motion.
 *
 * Section order:
 *  1. Hero           — immediate visual impact + primary CTAs
 *  2. Tagline        — brand positioning statement
 *  3. Offerings      — full product/service overview grid
 *  4. Bella Feature  — cinematic split-screen for the star offering
 *  5. Prosecco Zero  — product spotlight with floating visual
 *  6. Events Gallery — social proof + atmosphere
 *  7. Metrics        — credibility counter block
 *  8. Contact CTA    — conversion finish line
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Tagline />
      <Offerings />
      <BellaFeature />
      <ProseccoSpotlight />
      <EventsGallery />
      <MetricsCounter />
      <ContactCTA />
    </>
  );
}
