"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { BRAND } from "@/lib/constants";

type FormState = "idle" | "submitting" | "success" | "error";

const OFFERINGS_OPTIONS = [
  "Book Bella (Mobile Bar)",
  "Porta-Bella (Venue Installation)",
  "Prosecco Zero",
  "Prosecco Zero Rosé",
  "General Inquiry",
  "Distribution / Wholesale",
];

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Brand Activation",
  "Private Party",
  "Restaurant / Bar",
  "Home Function",
  "Other",
];

/**
 * Contact & booking form.
 * ACTION NOTE: This form currently does client-side validation only.
 * Wire up to a form handler before going live:
 *   - Option A: Next.js Server Action (recommended)
 *   - Option B: Formspree / Resend API route
 *   - Option C: WhatsApp deep-link fallback (already included below)
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    offering: "",
    date: "",
    guests: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const next: Partial<typeof form> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.phone.trim() && !form.email.trim())
      next.phone = "Please provide a phone number or email";
    if (!form.offering) next.offering = "Please select an offering";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    /*
     * REPLACE THIS with your actual form submission logic:
     *
     * const res = await fetch("/api/contact", {
     *   method: "POST",
     *   body: JSON.stringify(form),
     *   headers: { "Content-Type": "application/json" },
     * });
     * if (res.ok) setStatus("success"); else setStatus("error");
     *
     * For now, simulating success after 1 second.
     */
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  const field =
    "w-full bg-[var(--cream-dark)] border border-[var(--gold-mid)]/25 text-[var(--charcoal)] placeholder-[var(--muted)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold-deep)] transition-colors duration-300";

  if (status === "success") {
    return (
      <section className="section-padding flex items-center justify-center min-h-[60vh]" style={{ backgroundColor: "var(--cream-light)" }}>
        <MotionWrapper className="text-center max-w-md mx-auto px-6">
          <CheckCircle size={48} className="text-[var(--gold-mid)] mx-auto mb-6" />
          <h2 className="font-display text-3xl font-light text-[var(--charcoal)] mb-4">
            We'll be in touch.
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-8">
            Thank you for reaching out. We typically respond within 24 hours.
            For urgent inquiries, reach us directly on WhatsApp.
          </p>
          <Link
            href={BRAND.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#25D366]/40 text-[#25D366] text-sm tracking-widest uppercase hover:bg-[#25D366]/10 transition-all"
          >
            Continue on WhatsApp
          </Link>
        </MotionWrapper>
      </section>
    );
  }

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--cream-light)" }} aria-labelledby="contact-heading">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div>
            <MotionWrapper delay={0.1}>
              <p className="text-[var(--gold-mid)] text-xs tracking-[0.3em] uppercase mb-4">
                Bookings &amp; Inquiries
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <h1
                id="contact-heading"
                className="font-display font-light text-[var(--charcoal)] leading-tight mb-8"
                style={{ fontSize: "var(--text-display)" }}
              >
                Let's create<br />
                <span className="italic text-gold-gradient">something special.</span>
              </h1>
            </MotionWrapper>
            <MotionWrapper delay={0.32}>
              <p className="text-[var(--charcoal-mid)] leading-relaxed mb-12">
                Whether you're planning a wedding, activating Porta-Bella at your venue, or
                interested in our Prosecco Zero range — we'd love to hear from you.
              </p>
            </MotionWrapper>

            {/* Direct contact */}
            <MotionWrapper delay={0.42}>
              <div className="flex flex-col gap-5">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-[var(--gold-mid)]/30 flex items-center justify-center group-hover:border-[var(--gold-mid)] transition-colors">
                    <Phone size={14} className="text-[var(--gold-mid)]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-0.5">Call us</p>
                    <p className="text-sm text-[var(--charcoal-mid)] group-hover:text-[var(--gold-deep)] transition-colors">
                      {BRAND.phone}
                    </p>
                  </div>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-[var(--gold-mid)]/30 flex items-center justify-center group-hover:border-[var(--gold-mid)] transition-colors">
                    <Mail size={14} className="text-[var(--gold-mid)]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-0.5">Email</p>
                    <p className="text-sm text-[var(--charcoal-mid)] group-hover:text-[var(--gold-deep)] transition-colors">
                      {BRAND.email}
                    </p>
                  </div>
                </a>
                <Link
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-[#25D366]/30 flex items-center justify-center group-hover:border-[#25D366] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 2.12.554 4.107 1.523 5.83L0 24l6.34-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.374 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.017-1.374l-.36-.213-3.764.888.927-3.672-.234-.377A9.796 9.796 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-0.5">WhatsApp</p>
                    <p className="text-sm text-[var(--charcoal-mid)] group-hover:text-[var(--gold-deep)] transition-colors">
                      Chat with us directly
                    </p>
                  </div>
                </Link>
              </div>
            </MotionWrapper>
          </div>

          {/* Right: Form */}
          <MotionWrapper delay={0.2} direction="left">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  className={field}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+1 (868) ..."
                    className={field}
                    aria-invalid={!!errors.phone}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className={field}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-400 text-xs -mt-3">{errors.phone}</p>}

              {/* Offering */}
              <div>
                <label htmlFor="offering" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                  I'm interested in *
                </label>
                <select
                  id="offering"
                  value={form.offering}
                  onChange={(e) => setForm((f) => ({ ...f, offering: e.target.value }))}
                  className={`${field} appearance-none cursor-pointer`}
                  aria-required="true"
                  aria-invalid={!!errors.offering}
                >
                  <option value="">Select an offering…</option>
                  {OFFERINGS_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                {errors.offering && <p className="text-red-400 text-xs mt-1">{errors.offering}</p>}
              </div>

              {/* Event type + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="eventType" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    value={form.eventType}
                    onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                    className={`${field} appearance-none cursor-pointer`}
                  >
                    <option value="">Select…</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                    Approximate Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className={field}
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                  Approximate Guest Count
                </label>
                <input
                  id="guests"
                  type="number"
                  min="1"
                  value={form.guests}
                  onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                  placeholder="e.g. 80"
                  className={field}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase text-[var(--muted)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us a bit about your event or inquiry…"
                  className={`${field} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 min-h-[44px] bg-[var(--gold-mid)] text-[var(--black)] text-sm tracking-widest uppercase font-medium overflow-hidden hover:bg-[var(--gold-light)] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
                  aria-hidden="true"
                />
                <span className="relative flex items-center gap-2">
                  {status === "submitting" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Inquiry
                      <Send size={14} />
                    </>
                  )}
                </span>
              </button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again or{" "}
                  <Link href={BRAND.whatsapp} target="_blank" className="underline">contact us on WhatsApp</Link>.
                </p>
              )}

              <p className="text-[var(--muted)] text-xs text-center mt-2">
                We typically respond within 24 hours. For urgent inquiries,{" "}
                <Link href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
                  WhatsApp us directly
                </Link>.
              </p>
            </form>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
