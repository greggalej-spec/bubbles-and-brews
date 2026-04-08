"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Loading screen — illustrated champagne glass starts tilted, fills with
 * bubbling gold liquid, then rotates upright as it completes. Plays once
 * per session (sessionStorage flag). Respects prefers-reduced-motion.
 */
export default function LoadingScreen() {
  const [visible, setVisible]     = useState(false);
  const [phase, setPhase]         = useState<"tilt" | "fill" | "straighten" | "done">("tilt");
  const shouldReduceMotion        = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem("bb-loaded")) return;
    sessionStorage.setItem("bb-loaded", "1");
    setVisible(true);

    // Phase timeline:
    // 0ms    → show glass at -20° tilt
    // 200ms  → start fill
    // 2000ms → glass full, begin straighten
    // 2700ms → upright, hold briefly
    // 3400ms → dismiss
    const t1 = setTimeout(() => setPhase("fill"),       200);
    const t2 = setTimeout(() => setPhase("straighten"), 2000);
    const t3 = setTimeout(() => setPhase("done"),       2700);
    const t4 = setTimeout(() => setVisible(false),      3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [shouldReduceMotion]);

  if (!visible) return null;

  const isFilling     = phase === "fill" || phase === "straighten" || phase === "done";
  const isStraightening = phase === "straighten" || phase === "done";

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 select-none pointer-events-none"
        style={{ backgroundColor: "var(--cream-light)" }}
        aria-hidden="true"
      >
        {/* Champagne glass — tilts then straightens */}
        <motion.div
          animate={{ rotate: isStraightening ? 0 : -20 }}
          transition={{
            rotate: {
              duration: isStraightening ? 0.7 : 0,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          style={{ transformOrigin: "center bottom" }}
        >
          <svg
            width="80"
            height="200"
            viewBox="0 0 80 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="bowlClip">
                {/* Flute bowl shape */}
                <path d="M 18 10 L 62 10 L 46 140 L 34 140 Z" />
              </clipPath>

              <linearGradient id="liquidGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%"   stopColor="#C9A96E" />
                <stop offset="55%"  stopColor="#D4848A" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E8D5A3" stopOpacity="0.7" />
              </linearGradient>

              {/* Shimmer sweep */}
              <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="white" stopOpacity="0" />
                <stop offset="48%"  stopColor="white" stopOpacity="0" />
                <stop offset="50%"  stopColor="white" stopOpacity="0.5" />
                <stop offset="52%"  stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* ── Liquid fill ────────────────────────────────────────── */}
            <motion.rect
              x="0"
              y="140"
              width="80"
              height="140"
              fill="url(#liquidGrad)"
              clipPath="url(#bowlClip)"
              animate={{ y: isFilling ? 10 : 140 }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
            />

            {/* Shimmer sweep across bowl */}
            {isFilling && (
              <motion.rect
                x="-80"
                y="10"
                width="160"
                height="130"
                fill="url(#shimmerGrad)"
                clipPath="url(#bowlClip)"
                animate={{ x: ["-80", "80", "80"] }}
                transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
              />
            )}

            {/* Rising bubbles */}
            {isFilling && [
              { cx: 34, delay: 0.4, dur: 1.1 },
              { cx: 40, delay: 0.8, dur: 1.4 },
              { cx: 46, delay: 0.3, dur: 1.0 },
              { cx: 37, delay: 1.0, dur: 1.2 },
              { cx: 44, delay: 0.6, dur: 1.5 },
            ].map((b, i) => (
              <motion.circle
                key={i}
                cx={b.cx}
                cy={140}
                r={1.5}
                fill="white"
                fillOpacity={0.8}
                clipPath="url(#bowlClip)"
                animate={{ cy: [140, 18], fillOpacity: [0, 0.8, 0] }}
                transition={{
                  duration: b.dur,
                  delay: b.delay,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 0.6,
                }}
              />
            ))}

            {/* ── Glass outline — bowl ───────────────────────────────── */}
            <path
              d="M 18 10 L 62 10 L 46 140 L 34 140 Z"
              stroke="#C9A96E"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Rim highlight */}
            <line x1="18" y1="10" x2="62" y2="10" stroke="#E8D5A3" strokeWidth="1" opacity="0.6" />

            {/* ── Stem ──────────────────────────────────────────────── */}
            <rect x="38" y="140" width="4" height="32" fill="#C9A96E" opacity="0.7" rx="1" />

            {/* ── Base ──────────────────────────────────────────────── */}
            <path
              d="M 22 172 Q 40 180 58 172"
              stroke="#C9A96E"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Brand name — fades in as glass fills */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isFilling ? 1 : 0, y: isFilling ? 0 : 8 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-display font-light text-[var(--charcoal)] tracking-[0.3em] text-sm uppercase"
        >
          Bubbles &amp; Brews Co.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isFilling ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-[var(--muted)] text-xs tracking-[0.2em] uppercase"
        >
          Trinidad &amp; Tobago
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
