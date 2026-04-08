"use client";

/**
 * Ambient champagne bubble field — thin gold ring circles rising continuously.
 * Very subtle (2–5% opacity) — adds life without competing with content.
 * Bubbles are border-only (no fill) so they're nearly invisible on cream
 * but catch the eye gently on the dark MetricsCounter section.
 *
 * Deterministic positions avoid hydration mismatch.
 * Disabled automatically via CSS prefers-reduced-motion rule.
 */

interface Bubble {
  id: number;
  left: number;   // %
  size: number;   // px
  dur: number;    // animation-duration s
  del: number;    // animation-delay s (negative = mid-cycle start)
  wobble: number; // horizontal drift px
  opacity: number;
}

const BUBBLES: Bubble[] = [
  { id:  0, left:  6, size:  5, dur: 12, del: -2.1,  wobble:  8,  opacity: 0.035 },
  { id:  1, left: 14, size:  9, dur: 18, del: -5.4,  wobble: -7,  opacity: 0.025 },
  { id:  2, left: 21, size:  4, dur: 10, del: -1.0,  wobble:  6,  opacity: 0.040 },
  { id:  3, left: 29, size: 12, dur: 22, del: -8.3,  wobble: -10, opacity: 0.020 },
  { id:  4, left: 37, size:  6, dur: 14, del: -3.7,  wobble:  7,  opacity: 0.030 },
  { id:  5, left: 44, size:  8, dur: 16, del: -7.2,  wobble: -5,  opacity: 0.028 },
  { id:  6, left: 52, size:  4, dur: 11, del: -0.6,  wobble:  9,  opacity: 0.038 },
  { id:  7, left: 60, size: 10, dur: 20, del: -4.8,  wobble: -8,  opacity: 0.022 },
  { id:  8, left: 68, size:  5, dur: 13, del: -2.9,  wobble:  6,  opacity: 0.033 },
  { id:  9, left: 75, size:  7, dur: 17, del: -6.5,  wobble: -9,  opacity: 0.027 },
  { id: 10, left: 83, size: 11, dur: 21, del: -1.4,  wobble:  5,  opacity: 0.024 },
  { id: 11, left: 90, size:  4, dur:  9, del: -3.1,  wobble: -6,  opacity: 0.042 },
  { id: 12, left: 10, size:  7, dur: 15, del: -9.0,  wobble:  8,  opacity: 0.030 },
  { id: 13, left: 26, size:  5, dur: 19, del: -5.7,  wobble: -5,  opacity: 0.035 },
  { id: 14, left: 47, size: 13, dur: 24, del: -11.2, wobble:  6,  opacity: 0.018 },
  { id: 15, left: 64, size:  6, dur: 11, del: -4.4,  wobble: -8,  opacity: 0.032 },
  { id: 16, left: 79, size:  9, dur: 16, del: -7.8,  wobble:  5,  opacity: 0.026 },
  { id: 17, left:  2, size:  4, dur: 14, del: -1.7,  wobble: -7,  opacity: 0.040 },
  { id: 18, left: 34, size:  8, dur: 20, del: -9.6,  wobble:  7,  opacity: 0.028 },
  { id: 19, left: 56, size:  5, dur: 12, del: -3.3,  wobble: -5,  opacity: 0.035 },
  { id: 20, left: 71, size: 11, dur: 18, del: -6.9,  wobble:  9,  opacity: 0.023 },
  { id: 21, left: 88, size:  7, dur: 22, del: -0.8,  wobble: -6,  opacity: 0.029 },
  { id: 22, left: 18, size:  4, dur: 10, del: -4.5,  wobble:  5,  opacity: 0.038 },
  { id: 23, left: 42, size:  9, dur: 15, del: -8.2,  wobble: -9,  opacity: 0.025 },
];

export default function BubbleField() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden bubble-field-container"
      aria-hidden="true"
      style={{ zIndex: 3 }}
    >
      {BUBBLES.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bubble-rise"
          style={{
            left: `${b.left}%`,
            bottom: 0,
            width: b.size,
            height: b.size,
            border: `1px solid var(--gold-mid)`,
            opacity: b.opacity,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.del}s`,
            "--bubble-wobble": `${b.wobble}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
