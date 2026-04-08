import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { BRAND } from "@/lib/constants";

/**
 * Contact CTA section — cream/champagne background, dark text.
 * Emotional high-point before the dark footer.
 */
export default function ContactCTA() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
      aria-labelledby="contact-cta-heading"
    >
      {/* Champagne gold radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,169,110,0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Corner rules */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l border-t border-[var(--gold-mid)]/25" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r border-t border-[var(--gold-mid)]/25" aria-hidden="true" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l border-b border-[var(--gold-mid)]/25" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r border-b border-[var(--gold-mid)]/25" aria-hidden="true" />

      <div className="container-brand relative z-10">
        <div className="max-w-[var(--content-mid)] mx-auto text-center">
          <MotionWrapper delay={0.1}>
            <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-6">
              Get in Touch
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <h2
              id="contact-cta-heading"
              className="font-display font-light text-[var(--charcoal)] leading-tight mb-6"
              style={{ fontSize: "var(--text-display)" }}
            >
              Let's make it<br />
              <span className="italic text-gold-gradient">unforgettable.</span>
            </h2>
          </MotionWrapper>

          <MotionWrapper delay={0.32}>
            <p className="text-[var(--charcoal-mid)] leading-relaxed mb-12 max-w-[480px] mx-auto">
              Whether you're planning a wedding, corporate event, intimate celebration, or looking
              to activate Porta-Bella at your venue — we'd love to hear from you.
            </p>
          </MotionWrapper>

          {/* Primary CTAs */}
          <MotionWrapper delay={0.42}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/contact"
                className="group px-10 py-4 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium relative overflow-hidden hover:bg-[var(--gold-deep)] transition-colors duration-300 w-full sm:w-auto text-center"
              >
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                  aria-hidden="true"
                />
                <span className="relative">Inquire Now</span>
              </Link>

              <Link
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-10 py-4 border border-[var(--brand-wa)]/40 text-[var(--brand-wa)] text-sm tracking-widest uppercase hover:bg-[var(--brand-wa)]/10 transition-all duration-300 w-full sm:w-auto"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 2.12.554 4.107 1.523 5.83L0 24l6.34-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.374 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.017-1.374l-.36-.213-3.764.888.927-3.672-.234-.377A9.796 9.796 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                </svg>
                Chat on WhatsApp
              </Link>
            </div>
          </MotionWrapper>

          {/* Divider */}
          <MotionWrapper delay={0.52}>
            <div className="flex items-center gap-4 mb-10 justify-center">
              <div className="divider-gold" />
              <span className="text-[var(--muted)] text-xs tracking-widest uppercase">or reach us directly</span>
              <div className="divider-gold" />
            </div>
          </MotionWrapper>

          {/* Direct contact */}
          <MotionWrapper delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-3 text-[var(--charcoal-mid)] hover:text-[var(--gold-deep)] transition-colors"
              >
                <Phone size={16} className="text-[var(--gold-mid)]" />
                <span className="text-sm tracking-wide">{BRAND.phone}</span>
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-3 text-[var(--charcoal-mid)] hover:text-[var(--gold-deep)] transition-colors"
              >
                <Mail size={16} className="text-[var(--gold-mid)]" />
                <span className="text-sm tracking-wide">{BRAND.email}</span>
              </a>
            </div>
          </MotionWrapper>

          {/* Trust signals */}
          <MotionWrapper delay={0.7}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
              {[
                "Trinidad's Premier Prosecco Experience",
                "Mobile · On Tap · Bottled",
                "Events · Venues · Private Functions",
              ].map((signal) => (
                <span
                  key={signal}
                  className="text-xs text-[var(--muted)] border-l border-[var(--gold-mid)]/20 pl-4 first:border-0 first:pl-0"
                >
                  {signal}
                </span>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
