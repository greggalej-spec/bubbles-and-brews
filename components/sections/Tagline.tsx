import MotionWrapper from "@/components/ui/MotionWrapper";

export default function Tagline() {
  return (
    <section
      id="tagline"
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
      aria-label="Brand statement"
    >
      {/* Gold radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(201,169,110,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative horizontal rule lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-mid)]/25 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-mid)]/25 to-transparent" aria-hidden="true" />

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

          {/* Main brand statement */}
          <MotionWrapper delay={0.2}>
            <blockquote
              className="font-display font-light italic text-[var(--charcoal)] leading-tight mb-8"
              style={{ fontSize: "var(--text-display)" }}
            >
              "Where every pour<br className="hidden sm:block" /> is an occasion."
            </blockquote>
          </MotionWrapper>

          <MotionWrapper delay={0.35}>
            <p className="text-[var(--charcoal-mid)] max-w-[440px] mx-auto leading-loose mb-14">
              From intimate garden gatherings to grand ballroom galas — Bubbles &amp; Brews Co.
              brings luxury, warmth, and effortless elegance to every moment worth celebrating.
            </p>
          </MotionWrapper>

          {/* Three value pillars */}
          <MotionWrapper delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-0">
              {[
                { label: "Mobile Bar", sub: "Bella arrives at your venue" },
                { label: "On Tap", sub: "Porta-Bella for venues" },
                { label: "Bottled", sub: "Prosecco Zero to take home" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 px-10 py-5 border-l border-[var(--gold-mid)]/20 first:border-0"
                >
                  <span className="font-display text-lg font-light text-[var(--charcoal)] tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-xs text-[var(--muted)] tracking-wide">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
