import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { METRICS } from "@/lib/constants";

/**
 * Metrics counter — deliberately dark section on an otherwise light page.
 * This creates editorial rhythm and makes the gold numbers pop.
 * Classic luxury technique: one dark chapter break in a cream-dominant layout.
 *
 * PLACEHOLDER values — update METRICS array in lib/constants.ts with real data.
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
            The numbers behind<br />
            <span className="italic text-gold-gradient">the pour.</span>
          </h2>
        </MotionWrapper>

        {/* Counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--gold-mid)]/8">
          {METRICS.map((metric, i) => (
            <MotionWrapper
              key={metric.label}
              delay={0.1 + i * 0.1}
              className="bg-[var(--black)] px-6 py-10 flex flex-col items-center gap-3 group transition-colors duration-500"
            >
              <div
                className="w-6 h-6 border border-[var(--gold-mid)]/30 rotate-45 group-hover:border-[var(--gold-mid)] transition-colors duration-500"
                aria-hidden="true"
              />
              <span
                className="font-display font-light text-[var(--gold-light)] text-center"
                style={{ fontSize: "var(--text-display)" }}
                aria-label={`${metric.value}${metric.suffix} ${metric.label}`}
              >
                <AnimatedCounter
                  target={metric.value}
                  suffix={metric.suffix}
                  duration={1800}
                />
              </span>
              <span className="text-xs tracking-widest uppercase text-[var(--muted-dark)] text-center">
                {metric.label}
              </span>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
