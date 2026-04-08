import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyContactBar from "@/components/layout/StickyContactBar";
import BubbleField from "@/components/ui/BubbleField";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bubbles & Brews Co. | Trinidad's Premier Prosecco Experience",
  description:
    "Luxury mobile prosecco bar, curated sparkling products, and prosecco on tap — crafted for Trinidad's most celebrated moments.",
  keywords: [
    "prosecco bar Trinidad",
    "mobile bar Trinidad",
    "Bubbles and Brews",
    "prosecco zero Trinidad",
    "wedding bar Trinidad",
    "luxury event bar",
    "prosecco on tap",
  ],
  openGraph: {
    title: "Bubbles & Brews Co.",
    description: "Trinidad's most elevated prosecco experience.",
    type: "website",
    locale: "en_TT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <BubbleField />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyContactBar />
      </body>
    </html>
  );
}
