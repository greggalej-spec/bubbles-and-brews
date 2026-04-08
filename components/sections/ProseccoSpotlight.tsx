"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
// Mini rising bubbles that appear around the bottle when section enters view
const BOTTLE_BUBBLES = [
  { id: 0, left: "18%",  delay: 0.2,  dur: 3.2, size: 6 },
  { id: 1, left: "28%",  delay: 0.8,  dur: 4.0, size: 4 },
  { id: 2, left: "38%",  delay: 0.0,  dur: 3.6, size: 7 },
  { id: 3, left: "50%",  delay: 1.1,  dur: 2.8, size: 5 },
  { id: 4, left: "62%",  delay: 0.5,  dur: 4.4, size: 4 },
  { id: 5, left: "74%",  delay: 1.6,  dur: 3.0, size: 6 },
  { id: 6, left: "22%",  delay: 2.0,  dur: 3.8, size: 5 },
  { id: 7, left: "45%",  delay: 1.4,  dur: 3.4, size: 4 },
  { id: 8, left: "68%",  delay: 0.7,  dur: 4.2, size: 7 },
];

export default function ProseccoSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();

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
              {/* Prosecco Zero Rosé — 3D render video */}
              {shouldReduceMotion ? (
                <Image
                  src="/assets/prosecco-extract-1.png"
                  alt="Prosecco Zero Rosé — blush bottle with black label and cherub graphic"
                  width={320}
                  height={480}
                  className="w-full object-contain drop-shadow-xl"
                  priority
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full object-contain drop-shadow-xl"
                  style={{ maxHeight: 480 }}
                  poster="/assets/prosecco-extract-1.png"
                >
                  <source src="/assets/bottle-dolly.mp4" type="video/mp4" />
                </video>
              )}

              {/* Decorative concentric rings — Nyetimber-inspired */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-[var(--gold-mid)]/20" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-full border border-[var(--gold-mid)]/35" aria-hidden="true" />

              {/* Bottle reveal bubbles — rise from below the bottle when section enters */}
              {!shouldReduceMotion && isInView && (
                <div className="absolute inset-x-0 bottom-0 h-[120%] overflow-visible pointer-events-none" aria-hidden="true">
                  {BOTTLE_BUBBLES.map((b) => (
                    <motion.div
                      key={b.id}
                      className="absolute rounded-full border border-[var(--gold-mid)]"
                      style={{
                        left: b.left,
                        bottom: "-10px",
                        width: b.size,
                        height: b.size,
                        opacity: 0,
                      }}
                      animate={{
                        y: [0, -180, -320],
                        opacity: [0, 0.45, 0],
                        scale: [0.6, 1, 0.7],
                      }}
                      transition={{
                        duration: b.dur,
                        delay: b.delay,
                        repeat: Infinity,
                        repeatDelay: 1.5,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              )}
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
                  className="px-7 py-3.5 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-wider font-medium hover:bg-[var(--gold-deep)] transition-colors duration-300"
                >
                  Order for Your Event
                </Link>
                <Link
                  href="/offerings/prosecco-zero"
                  className="px-7 py-3.5 border border-[var(--charcoal)]/20 text-[var(--charcoal-mid)] text-sm tracking-wider hover:border-[var(--gold-deep)] hover:text-[var(--gold-deep)] transition-all duration-300"
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
