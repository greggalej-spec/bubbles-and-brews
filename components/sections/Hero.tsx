"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BRAND } from "@/lib/constants";

/**
 * Hero section — champagne/cream gradient, dark editorial text.
 * Light-first palette: cream → warm white → champagne glow.
 *
 * ASSET PLACEHOLDER: Full-bleed hero video or image
 *   - Intended: Autoplay looping event reel with warm champagne grade
 *   - Source: Client-supplied or @bubblesandbrewsco Instagram reels
 *   - Fallback: CSS champagne cream gradient (active now)
 *   - Replace: Swap gradient <div> for <video autoPlay muted loop playsInline>
 *              Then add a soft cream overlay to keep text readable
 */
export default function Hero() {
  const scrollToContent = () => {
    document.getElementById("tagline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Champagne cream gradient background ───────────────────────────
          REPLACE THIS BLOCK with a <video> element once hero reel is ready.
          Wrap the video in a div with overflow-hidden and add a cream overlay
          at 30-40% opacity to keep the dark text legible.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 35%, rgba(201,169,110,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 50% 70% at 15% 80%, rgba(201,169,110,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 20%, rgba(232,213,163,0.12) 0%, transparent 50%),
            linear-gradient(160deg, #FAF7F2 0%, #F5F0E8 40%, #EDE4D3 100%)
          `,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Hero content ─────────────────────────────────────────────── */}
      <div className="relative z-10 container-brand text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--gold-deep)] text-xs md:text-sm tracking-[0.25em] uppercase mb-8 font-body"
        >
          Trinidad &amp; Tobago
        </motion.p>

        {/* Main headline — dark charcoal on cream */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light leading-[0.9] tracking-[-0.01em] text-[var(--charcoal)]"
            style={{ fontSize: "var(--text-hero)" }}
          >
            <span className="block">Pour</span>
            <span className="block text-gold-gradient italic">the Moment.</span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--charcoal-mid)] max-w-lg mx-auto mb-12 leading-relaxed"
          style={{ fontSize: "var(--text-lead)" }}
        >
          {BRAND.subTagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group px-8 py-4 min-h-[44px] bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium relative overflow-hidden transition-all duration-500 hover:bg-[var(--gold-deep)]"
          >
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
              aria-hidden="true"
            />
            <span className="relative">Book Bella</span>
          </Link>
          <Link
            href="/offerings"
            className="px-8 py-4 min-h-[44px] border border-[var(--charcoal)]/25 text-[var(--charcoal-mid)] text-sm tracking-widest uppercase hover:border-[var(--gold-deep)] hover:text-[var(--gold-deep)] transition-all duration-400"
          >
            Explore Offerings
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)] hover:text-[var(--gold-deep)] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>

      {/* Corner accents — champagne gold on cream */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
    </section>
  );
}
