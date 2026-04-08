"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * Scroll-scrubbed bottle rotation section.
 *
 * The section is 250vh tall. The video is sticky and fills the viewport.
 * As the user scrolls, video.currentTime advances from 0 → duration,
 * giving a full rotation reveal.
 *
 * VIDEO: /public/assets/bottle-rotate.mp4 — 360° camera orbit of the bottle.
 * FALLBACK: Static PNG for prefers-reduced-motion.
 */

export default function BottleScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Scrub the video with scroll
  useEffect(() => {
    if (shouldReduceMotion) return;
    return scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = v * video.duration;
    });
  }, [scrollYProgress, shouldReduceMotion]);

  // Fade text layers with scroll
  const eyebrowOpacity  = useTransform(scrollYProgress, [0, 0.12, 0.35, 0.5],  [0, 1, 1, 0]);
  const headingOpacity  = useTransform(scrollYProgress, [0.05, 0.18, 0.38, 0.52], [0, 1, 1, 0]);
  const subOpacity      = useTransform(scrollYProgress, [0.12, 0.25, 0.42, 0.55], [0, 1, 1, 0]);
  const ctaOpacity      = useTransform(scrollYProgress, [0.55, 0.68, 0.88, 1],   [0, 1, 1, 0]);
  const ctaHeadOpacity  = useTransform(scrollYProgress, [0.52, 0.65, 0.88, 1],   [0, 1, 1, 0]);

  // Overlay dims as video brightens
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.72, 0.55, 0.55, 0.72]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: shouldReduceMotion ? "auto" : "250vh" }}
      aria-label="Prosecco Zero bottle showcase"
    >
      {/* ── Reduced motion: static image ─────────────────────────────── */}
      {shouldReduceMotion && (
        <div className="relative flex items-center justify-center py-24" style={{ backgroundColor: "var(--black)" }}>
          <Image
            src="/assets/prosecco-zero-rose.png"
            alt="Prosecco Zero Rosé bottle"
            width={320}
            height={480}
            className="object-contain"
          />
        </div>
      )}

      {/* ── Scroll scene ─────────────────────────────────────────────── */}
      {!shouldReduceMotion && (
        <div className="sticky top-0 h-screen overflow-hidden" style={{ backgroundColor: "var(--black)" }}>

          {/* Bottle video — paused, scrubbed by scroll */}
          <video
            ref={videoRef}
            src="/assets/bottle-rotate.mp4"
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

          {/* Champagne radial glow — warms the scene */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {/* ── Phase 1: Intro text (0–50% scroll) ───────────────────── */}
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
              Prosecco Zero — perfectly crisp, beautifully effervescent,
              indistinguishable in elegance.
            </motion.p>
          </div>

          {/* ── Phase 2: CTA (55–100% scroll) ────────────────────────── */}
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
                className="px-8 py-4 bg-[var(--gold-deep)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium hover:bg-[var(--gold-accent)] transition-colors duration-300"
              >
                Order for Your Event
              </a>
              <a
                href="/#offerings"
                className="px-8 py-4 border border-[var(--white)]/25 text-[var(--white)] text-sm tracking-widest uppercase hover:border-[var(--gold-mid)] hover:text-[var(--gold-light)] transition-all duration-300"
              >
                See All Products
              </a>
            </motion.div>
          </div>

          {/* Scroll hint — fades out after first 15% scroll */}
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

          {/* Progress bar — gold line across bottom */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-[var(--gold-mid)] origin-left"
            style={{ scaleX: scrollYProgress }}
            aria-hidden="true"
          />
        </div>
      )}
    </section>
  );
}
