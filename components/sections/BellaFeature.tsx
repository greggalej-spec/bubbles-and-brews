"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";

const BELLA_FEATURES = [
  "Prosecco on tap — always fresh, always elegant",
  "Vintage mobile bar aesthetic",
  "Full-service setup and breakdown",
  "Personalised for your event theme",
];

export default function BellaFeature() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section
      ref={sectionRef}
      id="bella"
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
      aria-labelledby="bella-heading"
    >
      {/* ── Left: Text panel ─────────────────────────────────────────── */}
      <div
        className="flex items-center relative z-10"
        style={{ backgroundColor: "var(--cream-light)" }}
      >
        <div className="px-10 md:px-16 lg:px-24 py-24 max-w-[580px]">
          <MotionWrapper delay={0.1}>
            <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-6">
              The Experience
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <h2
              id="bella-heading"
              className="font-display font-light text-[var(--charcoal)] leading-[1.05] mb-6"
              style={{ fontSize: "var(--text-display)" }}
            >
              She arrives.<br />
              <span className="italic text-gold-gradient">The room notices.</span>
            </h2>
          </MotionWrapper>

          <MotionWrapper delay={0.32}>
            <p className="text-[var(--charcoal-mid)] leading-relaxed mb-4">
              Bella is more than a mobile prosecco bar. She is a statement — a fully curated,
              vintage-styled service unit that transforms the feel of any event from the moment
              she arrives.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.42}>
            <p className="text-[var(--charcoal-mid)] leading-relaxed mb-10">
              Designed for weddings, corporate events, brand activations, and premium private
              functions across Trinidad &amp; Tobago. Bella serves on tap. Bella makes memories.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.52}>
            <ul className="flex flex-col gap-3 mb-10" aria-label="Bella features">
              {BELLA_FEATURES.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[var(--charcoal-mid)]">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--gold-mid)] flex-shrink-0"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </MotionWrapper>

          <MotionWrapper delay={0.62}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn btn-dark">
                Book Bella for Your Event
              </Link>
              <Link href="/offerings/bella" className="btn btn-outline-dark">
                Learn More
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* ── Right: Video panel ───────────────────────────────────────── */}
      <div
        className="relative overflow-hidden min-h-[60vw] sm:min-h-[50vh] lg:min-h-0 flex items-center justify-center"
        style={{ backgroundColor: "var(--black)" }}
      >
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          aria-hidden="true"
        >
          <source src="/assets/animate-frames.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — ensures text remains readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(14,13,11,0.55)" }}
          aria-hidden="true"
        />

        {/* Champagne radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 60% 40%, rgba(201,169,110,0.10) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-14 h-14 border-l border-t border-[var(--gold-mid)]/25" aria-hidden="true" />
        <div className="absolute top-8 right-8 w-14 h-14 border-r border-t border-[var(--gold-mid)]/25" aria-hidden="true" />
        <div className="absolute bottom-8 left-8 w-14 h-14 border-l border-b border-[var(--gold-mid)]/25" aria-hidden="true" />
        <div className="absolute bottom-8 right-8 w-14 h-14 border-r border-b border-[var(--gold-mid)]/25" aria-hidden="true" />

        {/* Horizontal gold lines */}
        <div className="absolute top-1/3 inset-x-8 h-px bg-gradient-to-r from-transparent via-[var(--gold-mid)]/20 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-1/3 inset-x-8 h-px bg-gradient-to-r from-transparent via-[var(--gold-mid)]/20 to-transparent" aria-hidden="true" />

        {/* Editorial content */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 flex flex-col items-center text-center px-12 py-16 gap-8"
        >
          {/* Large decorative "BELLA" */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-[var(--gold-mid)]/30 uppercase"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            aria-hidden="true"
          >
            BELLA
          </motion.p>

          {/* Centre diamond */}
          <div className="w-3 h-3 rotate-45 border border-[var(--gold-mid)]/50" aria-hidden="true" />

          {/* Tagline */}
          <MotionWrapper delay={0.3}>
            <p
              className="font-display font-light italic text-[var(--white)] leading-snug"
              style={{ fontSize: "var(--text-section)" }}
            >
              "She arrives.<br />The room changes."
            </p>
          </MotionWrapper>

          {/* Spec pills */}
          <MotionWrapper delay={0.45}>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {["On Tap", "Vintage Styled", "Full Service", "Trinidad & Tobago"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs tracking-[0.2em] uppercase text-[var(--gold-mid)] border border-[var(--gold-mid)]/30 px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </MotionWrapper>

          {/* Stat */}
          <MotionWrapper delay={0.6}>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl font-light text-[var(--gold-light)]">85+</span>
                <span className="text-xs text-[var(--muted-dark)] tracking-widest uppercase">Events</span>
              </div>
              <div className="w-px h-10 bg-[var(--gold-mid)]/20" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl font-light text-[var(--gold-light)]">12+</span>
                <span className="text-xs text-[var(--muted-dark)] tracking-widest uppercase">Venues</span>
              </div>
              <div className="w-px h-10 bg-[var(--gold-mid)]/20" aria-hidden="true" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl font-light text-[var(--gold-light)]">1</span>
                <span className="text-xs text-[var(--muted-dark)] tracking-widest uppercase">Bella</span>
              </div>
            </div>
          </MotionWrapper>
        </motion.div>

        {/* Left edge gradient — blends into cream panel */}
        <div
          className="absolute inset-y-0 left-0 w-20 pointer-events-none lg:block hidden"
          style={{ background: "linear-gradient(to right, var(--cream-light), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
