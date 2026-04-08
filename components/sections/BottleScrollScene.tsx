"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * Scroll-scrubbed bottle rotation section.
 *
 * Desktop: 250vh sticky section — video.currentTime advances with scroll.
 * Mobile: same video plays as autoPlay loop (iOS Safari doesn't support
 *         reliable seeking via currentTime on touch devices).
 * Reduced motion: static PNG fallback.
 *
 * VIDEO: /public/assets/slow-dolly-1.mp4 — 360° camera orbit.
 */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function BottleScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Desktop-only: scrub video with scroll
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;
    return scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = v * video.duration;
    });
  }, [scrollYProgress, shouldReduceMotion, isMobile]);

  // Fade text layers with scroll (desktop only — mobile uses static positions)
  const eyebrowOpacity  = useTransform(scrollYProgress, [0, 0.12, 0.35, 0.5],  [0, 1, 1, 0]);
  const headingOpacity  = useTransform(scrollYProgress, [0.05, 0.18, 0.38, 0.52], [0, 1, 1, 0]);
  const subOpacity      = useTransform(scrollYProgress, [0.12, 0.25, 0.42, 0.55], [0, 1, 1, 0]);
  const ctaOpacity      = useTransform(scrollYProgress, [0.55, 0.68, 0.88, 1],   [0, 1, 1, 0]);
  const ctaHeadOpacity  = useTransform(scrollYProgress, [0.52, 0.65, 0.88, 1],   [0, 1, 1, 0]);
  const overlayOpacity  = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.72, 0.55, 0.55, 0.72]);

  // ── Reduced motion: static image ─────────────────────────────────────
  if (shouldReduceMotion) {
    return (
      <section aria-label="Prosecco Zero bottle showcase">
        <div className="relative flex items-center justify-center py-24" style={{ backgroundColor: "var(--black)" }}>
          <Image
            src="/assets/prosecco-zero-rose.png"
            alt="Prosecco Zero Rosé bottle"
            width={320}
            height={480}
            className="object-contain"
          />
        </div>
      </section>
    );
  }

  // ── Mobile: autoplay loop ────────────────────────────────────────────
  if (isMobile) {
    return (
      <section
        aria-label="Prosecco Zero bottle showcase"
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--black)" }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/prosecco-zero-rose.png"
          className="w-full h-[60vw] min-h-[320px] object-cover"
          aria-hidden="true"
        >
          <source src="/assets/slow-dolly-1.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(14,13,11,0.55)" }} aria-hidden="true" />

        {/* Mobile content */}
        <div className="relative z-10 px-6 py-16 text-center" style={{ backgroundColor: "var(--black)" }}>
          <p className="text-[var(--gold-mid)] text-xs tracking-[0.3em] uppercase mb-6">The Product</p>
          <h2
            className="font-display font-light text-[var(--white)] leading-tight mb-6"
            style={{ fontSize: "var(--text-display)" }}
          >
            <span className="block">All the elegance.</span>
            <span className="block italic text-gold-gradient">None of the compromise.</span>
          </h2>
          <p className="text-[var(--muted-dark)] max-w-sm mx-auto leading-relaxed mb-10">
            Prosecco Zero — just 2.8g sugar per bottle. Premium Glera grapes from Friuli Venezia Giulia, Italy.
            Perfectly crisp, beautifully effervescent.
          </p>
          <div className="flex flex-col gap-4 items-center">
            <a
              href="/contact"
              className="btn btn-primary"
            >
              Order for Your Event
            </a>
            <a
              href="/#offerings"
              className="btn btn-outline-light"
            >
              See All Products
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: scroll-scrubbed scene ──────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "250vh" }}
      aria-label="Prosecco Zero bottle showcase"
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "var(--black)" }}>

        {/* Bottle video — paused, scrubbed by scroll */}
        <video
          ref={videoRef}
          src="/assets/slow-dolly-1.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />

        {/* Dark overlay — keeps text readable */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "var(--black)", opacity: overlayOpacity }}
          aria-hidden="true"
        />

        {/* Champagne radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* Phase 1: Intro text (0–50% scroll) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <motion.p
            style={{ opacity: eyebrowOpacity }}
            className="text-[var(--gold-mid)] text-xs tracking-[0.3em] uppercase mb-6"
          >
            The Product
          </motion.p>

          <motion.h2
            style={{ opacity: headingOpacity, fontSize: "var(--text-display)" }}
            className="font-display font-light text-[var(--white)] leading-tight mb-6"
          >
            <span className="block">All the elegance.</span>
            <span className="block italic text-gold-gradient">None of the compromise.</span>
          </motion.h2>

          <motion.p
            style={{ opacity: subOpacity }}
            className="text-[var(--muted-dark)] max-w-md leading-relaxed"
          >
            Prosecco Zero — 2.8g sugar per bottle, versus 25g+ in standard prosecco.
            Premium Glera grapes from Friuli Venezia Giulia, Italy.
          </motion.p>
        </div>

        {/* Phase 2: CTA (55–100% scroll) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <motion.p
            style={{ opacity: ctaHeadOpacity, fontSize: "var(--text-section)" }}
            className="font-display font-light italic text-[var(--white)] mb-8"
          >
            Ready to pour?
          </motion.p>

          <motion.div
            style={{ opacity: ctaOpacity }}
            className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
          >
            <a
              href="/contact"
              className="btn btn-primary"
            >
              Order for Your Event
            </a>
            <a
              href="/#offerings"
              className="btn btn-outline-light"
            >
              See All Products
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted-dark)] pointer-events-none"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll to reveal</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-[var(--gold-mid)] origin-left"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
