"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BRAND } from "@/lib/constants";
import CorkPop from "@/components/ui/CorkPop";

/**
 * Hero — full-bleed video background (hero-camera.mp4).
 * On reduced motion: champagne cream gradient fallback.
 * Mobile: autoPlay muted loop playsInline — same video, no JS needed.
 */
export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  // Skip autoplay video on mobile — iOS Safari GPU memory crash
  const [isMobile, setIsMobile] = useState(true); // default true (SSR-safe: no flash)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  const scrollToContent = () => {
    document.getElementById("metrics")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Video background (desktop only) ──────────────────────────── */}
      {!shouldReduceMotion && !isMobile && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/prosecco-extract-1.png"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/assets/hero-camera.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── Gradient fallback — mobile + reduced motion ───────────────── */}
      {(shouldReduceMotion || isMobile) && (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 35%, rgba(201,169,110,0.22) 0%, transparent 65%),
              radial-gradient(ellipse 50% 70% at 15% 80%, rgba(201,169,110,0.10) 0%, transparent 55%),
              linear-gradient(160deg, #1A1816 0%, #2A2520 40%, #0E0D0B 100%)
            `,
          }}
        />
      )}

      {/* ── Overlays ─────────────────────────────────────────────────── */}
      {/* Dark vignette to keep text legible over video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom,
              rgba(14,13,11,0.55) 0%,
              rgba(14,13,11,0.35) 40%,
              rgba(14,13,11,0.55) 100%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Champagne glow — warms the centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,169,110,0.12) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect fill='%23C9A96E' width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* ── Hero content ─────────────────────────────────────────────── */}
      <div className="relative z-10 container-brand text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.25em" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--gold-light)] text-xs md:text-sm tracking-[0.25em] uppercase mb-8 font-body"
        >
          Trinidad &amp; Tobago
        </motion.p>

        {/* Main headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light leading-[0.9] tracking-[-0.01em] text-[var(--white)]"
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
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="text-[var(--white)]/70 max-w-lg mx-auto mb-12 leading-relaxed"
          style={{ fontSize: "var(--text-lead)" }}
        >
          {BRAND.subTagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="btn btn-primary group relative overflow-hidden">
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
              aria-hidden="true"
            />
            <span className="relative">Book Bella</span>
          </Link>
          <Link href="/#offerings" className="btn btn-outline-light">
            Explore Offerings
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--white)]/50 hover:text-[var(--gold-light)] transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[var(--gold-mid)]/30" aria-hidden="true" />

      {/* Cork pop — plays once after hero text settles */}
      <CorkPop />
    </section>
  );
}
