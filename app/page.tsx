import Hero from "@/components/sections/Hero";
import MetricsCounter from "@/components/sections/MetricsCounter";
import Tagline from "@/components/sections/Tagline";
import Offerings from "@/components/sections/Offerings";
import BellaFeature from "@/components/sections/BellaFeature";
import BottleScrollScene from "@/components/sections/BottleScrollScene";
import EventsGallery from "@/components/sections/EventsGallery";
import ContactCTA from "@/components/sections/ContactCTA";

/**
 * Homepage — "The Golden Hour"
 * Story arc: Invitation → Proof → Belief → Collection → Star → Product → World → Action
 *
 * Section order:
 *  1. Hero           — cinematic entrance, the invitation
 *  2. MetricsCounter — immediate proof, credibility
 *  3. Tagline        — brand belief statement
 *  4. Offerings      — the full collection: Bella, Porta-Bella, Bottles
 *  5. Bella Feature  — cinematic deep-dive on the star offering
 *  6. Bottle Scroll  — Prosecco Zero product reveal with scroll scrub
 *  7. Events Gallery — the world they've created, social proof
 *  8. Contact CTA    — the invitation to join
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsCounter />
      <Tagline />
      <Offerings />
      <BellaFeature />
      <BottleScrollScene />
      <EventsGallery />
      <ContactCTA />
    </>
  );
}
