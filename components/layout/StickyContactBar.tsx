"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function StickyContactBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 0.2;
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile bottom contact strip — cream bg, dark text */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-[var(--gold-mid)]/20 py-3 px-4"
            style={{ backgroundColor: "rgba(250,247,242,0.97)", backdropFilter: "blur(12px)" }}
            role="complementary"
            aria-label="Quick contact options"
          >
            <a
              href={`tel:${BRAND.phone}`}
              className="flex flex-col items-center gap-1 text-[var(--charcoal-mid)] hover:text-[var(--gold-deep)] transition-colors"
              aria-label="Call us"
            >
              <Phone size={18} />
              <span className="text-xs tracking-widest uppercase">Call</span>
            </a>

            <Link
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-[#22a852] hover:opacity-80 transition-opacity"
              aria-label="Chat on WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 2.12.554 4.107 1.523 5.83L0 24l6.34-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.374 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.017-1.374l-.36-.213-3.764.888.927-3.672-.234-.377A9.796 9.796 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
              </svg>
              <span className="text-xs tracking-widest uppercase">WhatsApp</span>
            </Link>

            <a
              href={`mailto:${BRAND.email}`}
              className="flex flex-col items-center gap-1 text-[var(--charcoal-mid)] hover:text-[var(--gold-deep)] transition-colors"
              aria-label="Email us"
            >
              <Mail size={18} />
              <span className="text-xs tracking-widest uppercase">Email</span>
            </a>

            <Link
              href="/contact"
              className="px-4 py-2 bg-[var(--charcoal)] text-[var(--cream-light)] text-xs tracking-widest uppercase font-medium hover:bg-[var(--gold-deep)] transition-colors"
            >
              Book
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop floating buttons */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex fixed bottom-8 right-8 z-50 flex-col items-end gap-3"
          >
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-[var(--charcoal)] text-[var(--cream-light)] text-xs tracking-widest uppercase font-medium hover:bg-[var(--gold-deep)] transition-all duration-300 shadow-lg shadow-[var(--charcoal)]/15"
            >
              Book Now
            </Link>
            <Link
              href={BRAND.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/25 hover:scale-110 transition-transform duration-300"
              aria-label="Chat on WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.374 0 0 5.373 0 12c0 2.12.554 4.107 1.523 5.83L0 24l6.34-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.374 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.017-1.374l-.36-.213-3.764.888.927-3.672-.234-.377A9.796 9.796 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
