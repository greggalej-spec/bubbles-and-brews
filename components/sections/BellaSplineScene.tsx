"use client";

import { useEffect, useState } from "react";
import MotionWrapper from "@/components/ui/MotionWrapper";

/**
 * Bella video showcase — replaces the Spline 3D placeholder.
 * Uses dolly-out.mp4 — desktop autoplay, mobile shows static image.
 */
export default function BellaSplineScene() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
      aria-label="Bella in action"
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

        <MotionWrapper delay={0.25}>
          <div className="relative max-w-4xl mx-auto">

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="w-full object-cover"
              style={{ aspectRatio: "16/9" }}
              aria-label="Bella mobile prosecco bar in action"
            >
              <source src="/assets/bella-dolly.mp4" type="video/mp4" />
            </video>

            {/* Decorative corner lines */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-l border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
            <div className="absolute -top-3 -right-3 w-12 h-12 border-r border-t border-[var(--gold-mid)]/30" aria-hidden="true" />
            <div className="absolute -bottom-3 -left-3 w-12 h-12 border-l border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-r border-b border-[var(--gold-mid)]/30" aria-hidden="true" />
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
