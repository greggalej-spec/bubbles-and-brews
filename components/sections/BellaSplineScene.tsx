"use client";

import { useReducedMotion } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";

/**
 * Bella — 3D Spline showcase section.
 *
 * TO ACTIVATE:
 *   1. Get a GLB of the Bella bar (Meshy.ai image-to-3D, Sketchfab, or Blender)
 *   2. Import into Spline → add idle rotation + mouse-hover tilt
 *   3. Share → Publish → copy the scene URL
 *   4. Set SPLINE_URL below to that URL
 *   5. Run: npm install @splinetool/react-spline
 *   6. Uncomment the Spline import and swap the placeholder div
 *
 * FREE PLAN NOTE:
 *   Spline adds a watermark (~28px) at the bottom-right of the canvas.
 *   The clipPath wrapper below crops it out cleanly.
 */

// ── Paste your Spline URL here when ready ──────────────────────────────────
const SPLINE_URL = "";
// ──────────────────────────────────────────────────────────────────────────

// import Spline from "@splinetool/react-spline";   ← uncomment after npm install

export default function BellaSplineScene() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
      aria-label="Bella 3D showcase"
    >
      {/* Gold radial wash */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10">
        <MotionWrapper delay={0.1} className="text-center mb-12">
          <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-4">
            In Her Element
          </p>
          <h2
            className="font-display font-light text-[var(--charcoal)] leading-tight"
            style={{ fontSize: "var(--text-display)" }}
          >
            See Bella from<br />
            <span className="italic text-gold-gradient">every angle.</span>
          </h2>
        </MotionWrapper>

        {/* 3D Scene slot */}
        <MotionWrapper delay={0.25}>
          <div className="relative max-w-3xl mx-auto">
            {SPLINE_URL && !shouldReduceMotion ? (
              /* ── ACTIVE: Spline scene ───────────────────────────────── */
              <div
                className="w-full rounded-sm overflow-hidden"
                style={{
                  aspectRatio: "16/9",
                  /* Crops the Spline watermark off the bottom */
                  clipPath: "inset(0 0 32px 0)",
                }}
              >
                {/*
                 * Uncomment after: npm install @splinetool/react-spline
                 * <Spline scene={SPLINE_URL} />
                 */}
              </div>
            ) : (
              /* ── PLACEHOLDER: shown until SPLINE_URL is set ─────────── */
              <div
                className="asset-placeholder w-full rounded-sm"
                style={{ aspectRatio: "16/9" }}
              >
                <div className="flex flex-col items-center gap-3 p-8 text-center">
                  <div className="w-12 h-12 rounded-full border border-[var(--gold-mid)]/40 flex items-center justify-center">
                    <span className="text-[var(--gold-mid)] text-xl" aria-hidden="true">✦</span>
                  </div>
                  <p className="text-[var(--muted)] text-sm">
                    3D Bella bar experience coming soon
                  </p>
                  <p className="text-[var(--muted-light)] text-xs max-w-xs">
                    Paste a Spline scene URL into <code className="text-[var(--gold-mid)]">BellaSplineScene.tsx</code> to activate
                  </p>
                </div>
              </div>
            )}

            {/* Decorative corner lines */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-r border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-l border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
          </div>
        </MotionWrapper>

        {/* Caption */}
        <MotionWrapper delay={0.4} className="text-center mt-8">
          <p className="text-[var(--muted)] text-sm">
            Interact with Bella — rotate, explore, fall in love.
          </p>
        </MotionWrapper>
      </div>
    </section>
  );
}
