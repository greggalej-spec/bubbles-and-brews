"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND, NAV_LINKS, OFFERING_LINKS } from "@/lib/constants";
import { cn } from "@/lib/cn";

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [offeringsOpen, setOfferingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOfferingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const textColor   = scrolled ? "text-[var(--charcoal-mid)]" : "text-[var(--white)]/90";
  const hoverColor  = scrolled ? "hover:text-[var(--gold-deep)]" : "hover:text-[var(--gold-light)]";
  const brandColor  = scrolled ? "text-[var(--charcoal)]" : "text-[var(--white)]";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
          scrolled ? "border-b border-[var(--gold-mid)]/15" : "bg-transparent"
        )}
        style={scrolled ? { backgroundColor: "rgba(250,247,242,0.96)", backdropFilter: "blur(12px)" } : {}}
      >
        <div className="container-brand flex items-center justify-between h-16 md:h-20">
          {/* Logo + Wordmark */}
          <Link
            href="/"
            className={cn("flex items-center gap-3 transition-colors duration-300 group", brandColor)}
            aria-label="Bubbles & Brews Co. — Home"
          >
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 border border-[var(--gold-mid)]/30">
              <Image
                src="/assets/bella-event.jpg"
                alt="Bubbles & Brews Co."
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
            <span className={cn("font-display text-xl md:text-2xl font-light tracking-[0.08em] transition-colors duration-300", hoverColor)}>
              B&amp;B Co.
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">

            {/* Offerings dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={cn(
                  "flex items-center gap-1.5 text-sm tracking-widest uppercase transition-colors duration-300",
                  textColor, hoverColor
                )}
                onClick={() => setOfferingsOpen(!offeringsOpen)}
                aria-expanded={offeringsOpen}
                aria-haspopup="true"
              >
                Offerings
                <ChevronDown
                  size={13}
                  className={cn("transition-transform duration-300", offeringsOpen ? "rotate-180" : "")}
                />
              </button>

              <AnimatePresence>
                {offeringsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-4 w-56 border border-[var(--gold-mid)]/20 overflow-hidden shadow-lg"
                    style={{ backgroundColor: "var(--cream-light)" }}
                  >
                    <div className="h-px bg-[var(--gold-mid)]/30" />
                    {OFFERING_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOfferingsOpen(false)}
                        className="flex flex-col gap-0.5 px-5 py-4 border-b border-[var(--gold-mid)]/10 last:border-0 hover:bg-[var(--cream)] transition-colors duration-200"
                      >
                        <span className="text-sm text-[var(--charcoal)] tracking-wide font-medium">{link.label}</span>
                        <span className="text-xs text-[var(--muted)]">{link.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Regular links */}
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm tracking-widest uppercase transition-colors duration-300",
                  textColor, hoverColor
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className={cn(
                "ml-2 btn text-xs py-3 px-6",
                scrolled
                  ? "btn-dark"
                  : "btn-outline-light"
              )}
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className={cn("md:hidden transition-colors p-2", textColor, hoverColor)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 overflow-y-auto py-24"
            style={{ backgroundColor: "var(--cream-light)" }}
            data-testid="mobile-menu"
          >
            {/* Logo in mobile menu */}
            <div className="absolute top-8 left-6 flex items-center gap-3">
              <div className="w-20 h-20 rounded-full overflow-hidden border border-[var(--gold-mid)]/30">
                <Image src="/assets/bella-event.jpg" alt="" width={80} height={80} className="object-cover" aria-hidden="true" />
              </div>
              <span className="font-display text-xl font-light tracking-[0.08em] text-[var(--charcoal)]">B&amp;B Co.</span>
            </div>
            <button
              className="absolute top-6 right-6 text-[var(--charcoal)] hover:text-[var(--gold-deep)] transition-colors p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            {/* Offerings section */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-deep)]">Offerings</span>
              {OFFERING_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-2xl font-light tracking-wider text-[var(--charcoal)] hover:text-[var(--gold-deep)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-[var(--gold-mid)]/30" />

            {/* Other links */}
            {[{ label: "Home", href: "/" }, ...NAV_LINKS.slice(1)].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl font-light tracking-wider text-[var(--charcoal)] hover:text-[var(--gold-deep)] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4"
            >
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn btn-dark text-xl font-display font-light tracking-wider"
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
