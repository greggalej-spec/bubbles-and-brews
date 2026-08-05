import MotionWrapper from "@/components/ui/MotionWrapper";
import { HIGHLIGHTS } from "@/lib/constants";

/**
 * Highlights — deliberately dark section on an otherwise light page.
 * This creates editorial rhythm and makes the gold text pop.
 * Classic luxury technique: one dark chapter break in a cream-dominant layout.
 * Renders qualitative proof points rather than numeric stats — no figures
 * to back up are asserted here.
 */
export default function MetricsCounter() {
  return (
    <section
      id="metrics"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--black)" }}
      aria-labelledby="metrics-heading"
    >
      {/* Vertical gold line accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-[var(--gold-mid)] to-transparent"
        aria-hidden="true"
      />

      {/* Subtle champagne radial — gives the dark section warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10">
        {/* Header */}
        <MotionWrapper delay={0.1} className="text-center mb-16">
          <p className="text-[var(--gold-mid)] text-xs tracking-[0.3em] uppercase mb-4">
            By the Numbers
          </p>
          <h2
            id="metrics-heading"
            className="font-display font-light text-[var(--white)]"
            style={{ fontSize: "var(--text-section)" }}
          >
            What sets us<br />
            <span className="italic text-gold-gradient">apart.</span>
          </h2>
        </MotionWrapper>

        {/* Highlight grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--gold-mid)]/8">
          {HIGHLIGHTS.map((highlight, i) => (
            <MotionWrapper
              key={highlight.label}
              delay={0.1 + i * 0.1}
              className="bg-[var(--black)] px-8 py-14 flex flex-col items-center gap-4 group transition-colors duration-200"
            >
              <div
                className="w-6 h-6 border border-[var(--gold-mid)]/30 rotate-45 group-hover:border-[var(--gold-mid)] transition-colors duration-200"
                aria-hidden="true"
              />
              <span
                className="font-display font-light text-[var(--gold-light)] text-center"
                style={{ fontSize: "var(--text-section)" }}
              >
                {highlight.label}
              </span>
              <span className="text-xs tracking-widest uppercase text-[var(--muted-dark)] text-center">
                {highlight.value}
              </span>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
