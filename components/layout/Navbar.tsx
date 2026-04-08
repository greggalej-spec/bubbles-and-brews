"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          scrolled
            ? "border-b border-[var(--gold-mid)]/15"
            : "bg-transparent"
        )}
        style={scrolled ? { backgroundColor: "rgba(250,247,242,0.96)", backdropFilter: "blur(12px)" } : {}}
      >
        <div className="container-brand flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-light tracking-[0.08em] text-[var(--charcoal)] hover:text-[var(--gold-deep)] transition-colors duration-300"
            aria-label="Bubbles & Brews Co. — Home"
          >
            B&amp;B Co.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase text-[var(--charcoal-mid)] hover:text-[var(--gold-deep)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-6 py-2 border border-[var(--charcoal)]/25 text-[var(--charcoal)] text-sm tracking-widest uppercase hover:bg-[var(--charcoal)] hover:text-[var(--cream-light)] hover:border-[var(--charcoal)] transition-all duration-300"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[var(--charcoal)] hover:text-[var(--gold-deep)] transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu — cream bg with dark text */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ backgroundColor: "var(--cream-light)" }}
            data-testid="mobile-menu"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl font-light tracking-wider text-[var(--charcoal)] hover:text-[var(--gold-deep)] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 border border-[var(--charcoal)]/25 text-[var(--charcoal)] font-display text-2xl font-light tracking-wider hover:bg-[var(--charcoal)] hover:text-[var(--cream-light)] transition-all duration-300"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
