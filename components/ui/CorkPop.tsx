"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * One-time champagne cork-pop animation.
 * Plays after the hero text settles (~2.8s delay).
 * A cork shoots upward with spin, burst particles radiate outward,
 * then everything floats up and fades — like a bottle just opened.
 *
 * Position this inside a position:relative parent.
 * Respects prefers-reduced-motion — skipped entirely if reduced motion.
 */

interface Particle {
  id: number;
  angle: number;  // degrees
  dist: number;   // px from origin
  size: number;   // px
  color: "mid" | "light";
}

const PARTICLES: Particle[] = [
  { id: 0,  angle: -100, dist: 55, size: 5, color: "mid"   },
  { id: 1,  angle:  -75, dist: 70, size: 4, color: "light" },
  { id: 2,  angle:  -50, dist: 48, size: 6, color: "mid"   },
  { id: 3,  angle:  -25, dist: 62, size: 3, color: "light" },
  { id: 4,  angle:    0, dist: 58, size: 5, color: "mid"   },
  { id: 5,  angle:   25, dist: 44, size: 4, color: "light" },
  { id: 6,  angle:   50, dist: 68, size: 6, color: "mid"   },
  { id: 7,  angle:   75, dist: 50, size: 3, color: "light" },
  { id: 8,  angle:  -88, dist: 38, size: 5, color: "light" },
  { id: 9,  angle:   88, dist: 38, size: 4, color: "mid"   },
  { id: 10, angle: -130, dist: 42, size: 4, color: "light" },
  { id: 11, angle:  130, dist: 42, size: 5, color: "mid"   },
];

function polar(angleDeg: number, dist: number) {
  const r = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(r) * dist, y: Math.sin(r) * dist };
}

export default function CorkPop() {
  const [active, setActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const t = setTimeout(() => setActive(true), 2800);
    return () => clearTimeout(t);
  }, [shouldReduceMotion]);

  if (!active || shouldReduceMotion) return null;

  return (
    /* Origin point: bottom-right area of the hero */
    <div
      className="absolute pointer-events-none select-none"
      style={{ bottom: "22%", right: "14%", zIndex: 10 }}
      aria-hidden="true"
    >
      {/* Expanding ring flash — the "pop" moment */}
      <motion.div
        className="absolute rounded-full border border-[var(--gold-light)]"
        style={{ width: 32, height: 32, x: -16, y: -16 }}
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0, 0.8, 1] }}
      />

      {/* Secondary softer ring */}
      <motion.div
        className="absolute rounded-full border border-[var(--gold-mid)]"
        style={{ width: 20, height: 20, x: -10, y: -10 }}
        initial={{ scale: 0.3, opacity: 0.5 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 0.85, delay: 0.08, ease: [0.2, 0, 0.6, 1] }}
      />

      {/* Burst particles */}
      {PARTICLES.map((p) => {
        const { x, y } = polar(p.angle, p.dist);
        const half = p.size / 2;
        const bg = p.color === "mid"
          ? "var(--gold-mid)"
          : "var(--gold-light)";

        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              x: -half,
              y: -half,
              backgroundColor: bg,
            }}
            initial={{ x: -half, y: -half, opacity: 0, scale: 0 }}
            animate={{
              x: [x * 0.3 - half, x - half, x - half],
              y: [y * 0.3 - half, y - half, y - 28 - half],
              opacity: [0, 0.9, 0],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 1.3,
              delay: p.id * 0.018,
              ease: [0.2, 0.6, 0.4, 1],
            }}
          />
        );
      })}

      {/* Cork — elongated pill that shoots upward-left with spin */}
      <motion.div
        style={{
          position: "absolute",
          width: 7,
          height: 14,
          borderRadius: 4,
          backgroundColor: "var(--cream-dark)",
          border: "1.5px solid var(--gold-mid)",
          x: -3.5,
          y: -7,
        }}
        initial={{ x: -3.5, y: -7, rotate: -10, opacity: 1 }}
        animate={{
          x: [0, 55, 80],
          y: [0, -160, -260],
          rotate: [-10, 340, 720],
          opacity: [1, 0.9, 0],
        }}
        transition={{
          duration: 1.5,
          ease: [0.15, 0.9, 0.3, 0.7],
        }}
      />

      {/* Cork trail — tiny bubbles along the trajectory */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute rounded-full bg-[var(--gold-light)]"
          style={{ width: 3, height: 3, x: -1.5, y: -1.5, opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{
            x: [i * 14, i * 14 + 20, i * 14 + 30],
            y: [0, -(60 + i * 40), -(100 + i * 60)],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{ duration: 0.9, delay: 0.15 + i * 0.1 }}
        />
      ))}
    </div>
  );
}
