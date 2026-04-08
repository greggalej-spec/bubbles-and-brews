import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Bookings | Bubbles & Brews Co.",
  description:
    "Book Bella, inquire about Porta-Bella venue activation, or ask about our Prosecco Zero product range. We're based in Trinidad & Tobago.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactForm />
    </div>
  );
}
