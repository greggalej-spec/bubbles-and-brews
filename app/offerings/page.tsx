import { redirect } from "next/navigation";

// Offerings live on the homepage — anchor-scroll to the section
export default function OfferingsPage() {
  redirect("/#offerings");
}
