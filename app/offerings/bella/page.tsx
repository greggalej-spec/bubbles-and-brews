import type { Metadata } from "next";
import BellaFeature from "@/components/sections/BellaFeature";
import BellaSplineScene from "@/components/sections/BellaSplineScene";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Bella | Bubbles & Brews Co.",
  description:
    "Bella is Trinidad's most elegant mobile prosecco bar — a vintage-styled centrepiece that transforms any event. Book her for weddings, corporate events, and luxury functions.",
};

export default function BellaPage() {
  return (
    <>
      <BellaFeature />
      <BellaSplineScene />
      <ContactCTA />
    </>
  );
}
