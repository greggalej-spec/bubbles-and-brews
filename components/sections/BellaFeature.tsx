"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PlaceholderAsset from "@/components/ui/PlaceholderAsset";
import MotionWrapper from "@/components/ui/MotionWrapper";

/**
 * Bella Feature — split-screen, cream left panel / image right.
 * Light palette with champagne gold accents and dark charcoal text.
 *
 * ASSET: Bella bar lifestyle photography
 *   Source: @bubblesandbrewsco Instagram / client hi-res
 *   REPLACE: <PlaceholderAsset> → <Image fill className="object-cover">
 */
export default function BellaFeature() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

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
        <div className="px-8 md:px-16 lg:px-20 py-20 max-w-[560px]">
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
              {[
                "Prosecco on tap — always fresh, always elegant",
                "Vintage mobile bar aesthetic",
                "Full-service setup and breakdown",
                "Personalised for your event theme",
              ].map((point) => (
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
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium relative overflow-hidden hover:bg-[var(--gold-deep)] transition-colors duration-300"
            >
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                aria-hidden="true"
              />
              <span className="relative">Book Bella for Your Event</span>
            </Link>
          </MotionWrapper>
        </div>
      </div>

      {/* ── Right: Image panel with parallax ─────────────────────────── */}
      <div className="relative overflow-hidden min-h-[60vw] sm:min-h-[50vh] lg:min-h-0">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-[-10%] w-[120%] h-[120%]"
        >
          <PlaceholderAsset
            label="Bella — Event Photography"
            note="Hi-res lifestyle photo: Bella as room centrepiece. Source: Instagram / client-supplied."
            aspectRatio="auto"
            className="w-full h-full"
          />
        </motion.div>

        {/* Left edge gradient — blends into cream panel */}
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none lg:block hidden"
          style={{ background: "linear-gradient(to right, var(--cream-light), transparent)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
