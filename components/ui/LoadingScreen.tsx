"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Loading screen — animated champagne flute fills with gold liquid.
 * Plays once per session (sessionStorage flag), then fades out.
 * Reduced-motion: skips entirely.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [fillStart, setFillStart] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem("bb-loaded")) return;
    sessionStorage.setItem("bb-loaded", "1");
    setVisible(true);
    // Start fill animation after small delay
    const t1 = setTimeout(() => setFillStart(true), 200);
    // Dismiss
    const t2 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [shouldReduceMotion]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 select-none pointer-events-none"
        style={{ backgroundColor: "var(--cream-light)" }}
        aria-hidden="true"
      >
        {/* Champagne flute SVG */}
        <div style={{ transform: "rotate(-15deg)", transformOrigin: "center" }}>
          <svg
            width="90"
            height="200"
            viewBox="0 0 90 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Clip to the bowl shape for liquid fill */}
              <clipPath id="bowlClip">
                <path d="M 22 12 L 68 12 L 52 148 L 38 148 Z" />
              </clipPath>

              {/* Liquid gradient — gold at bottom, rose at top as it fills */}
              <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#C9A96E" />
                <stop offset="60%" stopColor="#D4848A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E8D5A3" stopOpacity="0.6" />
              </linearGradient>

              {/* Shimmer gradient — sweeps left to right */}
              <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="45%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.55" />
                <stop offset="55%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ── Liquid fill (clips to bowl, animated height) ─────────── */}
            <motion.rect
              x="0"
              y={fillStart ? 12 : 148}
              width="90"
              height="148"
              fill="url(#liquidGrad)"
              clipPath="url(#bowlClip)"
              animate={{ y: fillStart ? 12 : 148 }}
              transition={{ duration: 2.0, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            />

            {/* ── Shimmer sweeps across the bowl ───────────────────────── */}
            {fillStart && (
              <motion.rect
                x="-90"
                y="12"
                width="180"
                height="136"
                fill="url(#shimmerGrad)"
                clipPath="url(#bowlClip)"
                animate={{ x: ["-90", "90", "90"] }}
                transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
              />
            )}

            {/* ── Rising bubbles inside glass ───────────────────────────── */}
            {fillStart && [
              { cx: 38, delay: 0.5, dur: 1.2 },
              { cx: 45, delay: 0.9, dur: 1.5 },
              { cx: 52, delay: 0.3, dur: 1.0 },
              { cx: 42, delay: 1.1, dur: 1.3 },
              { cx: 49, delay: 0.7, dur: 1.6 },
            ].map((b, i) => (
              <motion.circle
                key={i}
                cx={b.cx}
                cy={148}
                r={1.5}
                fill="white"
                fillOpacity={0.7}
                clipPath="url(#bowlClip)"
                animate={{ cy: [148, 20], fillOpacity: [0, 0.7, 0] }}
                transition={{ duration: b.dur, delay: b.delay, ease: "easeOut", repeat: Infinity, repeatDelay: 0.8 }}
              />
            ))}

            {/* ── Glass outline — bowl ─────────────────────────────────── */}
            <path
              d="M 22 12 L 68 12 L 52 148 L 38 148 Z"
              stroke="#C9A96E"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Rim highlight */}
            <line x1="22" y1="12" x2="68" y2="12" stroke="#E8D5A3" strokeWidth="1" opacity="0.6" />

            {/* ── Stem ────────────────────────────────────────────────── */}
            <rect x="43" y="148" width="4" height="30" fill="#C9A96E" opacity="0.7" rx="1" />

            {/* ── Base ─────────────────────────────────────────────────── */}
            <path
              d="M 28 178 Q 45 185 62 178"
              stroke="#C9A96E"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Brand name */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: fillStart ? 1 : 0, y: fillStart ? 0 : 8 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-display font-light text-[var(--charcoal)] tracking-[0.3em] text-sm uppercase"
        >
          Bubbles &amp; Brews Co.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: fillStart ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-[var(--muted)] text-xs tracking-[0.2em] uppercase"
        >
          Trinidad &amp; Tobago
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
