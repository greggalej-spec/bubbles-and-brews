"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BottleScene3D from "@/components/ui/BottleScene3D";
import MotionWrapper from "@/components/ui/MotionWrapper";

/**
 * Prosecco Zero product spotlight — 3D scroll animation slot.
 *
 * 3D BOTTLE ANIMATION:
 *   - Currently: animated placeholder with float + scroll-driven rotation
 *   - Replace: Pass a splineUrl prop to <BottleScene3D> once the Spline model
 *     is ready (see BottleScene3D.tsx for all integration options)
 *   - Gemini-generated model: export as GLB → upload to Spline → get URL
 *
 * LIGHT PALETTE: warm white bg, charcoal text, gold accents.
 */
export default function ProseccoSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream-light)" }}
      aria-labelledby="prosecco-heading"
    >
      {/* Subtle champagne radial wash */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[80vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── 3D Bottle column ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            <div className="relative max-w-[320px] mx-auto">
              {/*
               * ── 3D BOTTLE SCENE ─────────────────────────────────────
               * Pass splineUrl once model is ready:
               * <BottleScene3D splineUrl="https://prod.spline.design/..." className="w-full" />
               */}
              <BottleScene3D className="w-full" />

              {/* Decorative concentric rings — Nyetimber-inspired */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-[var(--gold-mid)]/20" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full border border-[var(--gold-mid)]/35" aria-hidden="true" />
            </div>
          </motion.div>

          {/* ── Content column ────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            <MotionWrapper delay={0.2}>
              <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase">
                Featured Product
              </p>
            </MotionWrapper>

            <MotionWrapper delay={0.3}>
              <h2
                id="prosecco-heading"
                className="font-display font-light text-[var(--charcoal)] leading-tight"
                style={{ fontSize: "var(--text-display)" }}
              >
                All the elegance.<br />
                <span className="italic text-gold-gradient">None of the compromise.</span>
              </h2>
            </MotionWrapper>

            <MotionWrapper delay={0.4}>
              <p className="text-[var(--charcoal-mid)] leading-relaxed">
                Prosecco Zero delivers the complete celebration experience without the alcohol —
                perfectly crisp, beautifully effervescent, and indistinguishable in elegance. The
                premium choice for the mindfully conscious and the style-driven alike.
              </p>
            </MotionWrapper>

            {/* Stats row */}
            <MotionWrapper delay={0.5}>
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-[var(--gold-mid)]/20 my-2">
                {[
                  { value: "0%", label: "Alcohol" },
                  { value: "100%", label: "Sparkling" },
                  { value: "T&T", label: "Exclusive" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-display text-2xl font-light text-[var(--gold-deep)]">
                      {stat.value}
                    </span>
                    <span className="text-xs tracking-widest uppercase text-[var(--muted)]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.6}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-7 py-3.5 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium hover:bg-[var(--gold-deep)] transition-colors duration-300"
                >
                  Order for Your Event
                </Link>
                <Link
                  href="/offerings/prosecco-zero"
                  className="px-7 py-3.5 border border-[var(--charcoal)]/20 text-[var(--charcoal-mid)] text-sm tracking-widest uppercase hover:border-[var(--gold-deep)] hover:text-[var(--gold-deep)] transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
