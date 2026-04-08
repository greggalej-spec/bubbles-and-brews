import type { Metadata } from "next";
import ContactCTA from "@/components/sections/ContactCTA";
import PortaBellaFeature from "@/components/sections/PortaBellaFeature";

export const metadata: Metadata = {
  title: "Porta-Bella | Bubbles & Brews Co.",
  description:
    "Porta-Bella brings prosecco on tap to your venue. A portable countertop keg system imported from Italy — new to the Caribbean market. Available for restaurant install or event rental.",
};

export default function PortaBellaPage() {
  return (
    <>
      <PortaBellaFeature />
      <ContactCTA />
    </>
  );
}
