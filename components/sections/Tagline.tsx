import MotionWrapper from "@/components/ui/MotionWrapper";

export default function Tagline() {
  return (
    <section
      id="tagline"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream-light)" }}
      aria-label="Brand statement"
    >
      {/* Faint gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container-brand relative z-10">
        <div className="max-w-[var(--content-mid)] mx-auto text-center">
          <MotionWrapper delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="divider-gold" />
              <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase font-body">
                Est. Trinidad &amp; Tobago
              </p>
              <div className="divider-gold" />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.25}>
            <blockquote
              className="font-display font-light italic text-[var(--charcoal)] leading-tight"
              style={{ fontSize: "var(--text-section)" }}
            >
              "Where every pour is an occasion."
            </blockquote>
          </MotionWrapper>

          <MotionWrapper delay={0.4}>
            <p className="mt-8 text-[var(--charcoal-mid)] max-w-[520px] mx-auto leading-relaxed">
              From intimate garden gatherings to grand ballroom galas — Bubbles &amp; Brews Co.
              brings luxury, warmth, and effortless elegance to every moment worth celebrating.
            </p>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
