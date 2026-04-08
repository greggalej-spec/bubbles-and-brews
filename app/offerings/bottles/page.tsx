import type { Metadata } from "next";
import ContactCTA from "@/components/sections/ContactCTA";
import BottlesFeature from "@/components/sections/BottlesFeature";

export const metadata: Metadata = {
  title: "Prosecco Zero | Bubbles & Brews Co.",
  description:
    "The world's lowest-sugar prosecco. Just 2.8g per bottle. Crafted from premium Glera grapes in Friuli Venezia Giulia, Italy. Available in Brut and Rosé — for inclusive, elegant celebrations.",
};

export default function BottlesPage() {
  return (
    <>
      <BottlesFeature />
      <ContactCTA />
    </>
  );
}
