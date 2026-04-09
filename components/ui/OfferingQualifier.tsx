"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { BRAND } from "@/lib/constants";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type EventType =
  | "Wedding"
  | "Corporate event"
  | "Private party / celebration"
  | "Restaurant or recurring venue"
  | "Something else";

type GuestCount = "Under 50" | "50–150" | "150–300" | "300+";

type Timing =
  | "Within the next month"
  | "1–3 months away"
  | "3+ months away"
  | "Just exploring";

type Recommendation = "Bella" | "Porta-Bella";

interface Answers {
  eventType: EventType | null;
  guestCount: GuestCount | null;
  timing: Timing | null;
}

interface FullAnswers {
  eventType: EventType;
  guestCount: GuestCount;
  timing: Timing;
}

/* ─── Recommendation logic ───────────────────────────────────────────────── */

function getRecommendation(answers: Pick<Answers, "eventType">): Recommendation {
  if (answers.eventType === "Restaurant or recurring venue") return "Porta-Bella";
  return "Bella";
}

/* ─── WhatsApp URL builder ───────────────────────────────────────────────── */

const EVENT_DISPLAY: Record<EventType, string> = {
  "Wedding": "a wedding",
  "Corporate event": "a corporate event",
  "Private party / celebration": "a private celebration",
  "Restaurant or recurring venue": "a venue activation",
  "Something else": "a custom event",
};

function buildWhatsAppURL(answers: FullAnswers, recommendation: Recommendation): string {
  const { eventType, guestCount, timing } = answers;
  const eventDisplay = EVENT_DISPLAY[eventType];
  const isExploring = timing === "Just exploring";
  const isLargeScale = guestCount === "300+" && recommendation === "Bella";

  let text: string;
  if (isExploring) {
    text = `Hi! I'm exploring options for a future ${eventDisplay} for ${guestCount} guests and I'm interested in ${recommendation}. Can you share more details?`;
  } else if (isLargeScale) {
    text = `Hi! I'm planning ${eventDisplay} for ${guestCount} guests in [${timing}] and I'm interested in ${recommendation}. Happy to discuss logistics.`;
  } else {
    text = `Hi! I'm planning ${eventDisplay} for ${guestCount} guests in [${timing}] and I'm interested in ${recommendation}. Can you share more details?`;
  }

  const params = new URLSearchParams({ text });
  return `${BRAND.whatsapp}?${params.toString()}`;
}

/* ─── Prosecco Zero add-on note ──────────────────────────────────────────── */

function shouldShowAddOn(answers: Pick<Answers, "eventType" | "guestCount">): boolean {
  return (
    answers.eventType !== "Restaurant or recurring venue" &&
    (answers.guestCount === "Under 50" || answers.eventType === "Private party / celebration")
  );
}

/* ─── Slide animation variants ───────────────────────────────────────────── */

const slideVariants = {
  enterRight: { opacity: 0, x: 40 },
  enterLeft:  { opacity: 0, x: -40 },
  center:     { opacity: 1, x: 0 },
  exitRight:  { opacity: 0, x: 40 },
  exitLeft:   { opacity: 0, x: -40 },
};

/* ─── Step indicator ─────────────────────────────────────────────────────── */

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-px transition-[flex,background-color,opacity] duration-300"
          style={{
            flex: i < step ? 2 : 1,
            backgroundColor: i < step ? "var(--gold-deep)" : "var(--gold-mid)",
            opacity: i < step ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Option button ──────────────────────────────────────────────────────── */

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-4 border transition-colors min-h-[44px] text-sm tracking-wide"
      style={{
        transitionDuration: "0.25s",
        transitionTimingFunction: "var(--ease-luxury)",
        borderColor: selected ? "var(--gold-deep)" : "rgba(var(--gold-mid-rgb, 201,169,110),0.3)",
        backgroundColor: selected ? "rgba(201,169,110,0.08)" : "transparent",
        color: selected ? "var(--gold-deep)" : "var(--charcoal-mid)",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Recommendation screen ──────────────────────────────────────────────── */

function RecommendationScreen({
  answers,
  onReset,
  onClose,
}: {
  answers: FullAnswers;
  onReset: () => void;
  onClose: () => void;
}) {
  const recommendation = getRecommendation(answers);
  const whatsappURL = buildWhatsAppURL(answers, recommendation);
  const showAddOn = shouldShowAddOn(answers);
  const isExploring = answers.timing === "Just exploring";
  const isLargeScale = answers.guestCount === "300+" && recommendation === "Bella";

  const taglines: Record<Recommendation, string> = {
    "Bella": "She arrives. The room notices.",
    "Porta-Bella": "Prosecco on tap. Wherever you are.",
  };

  const descriptions: Record<Recommendation, string> = {
    "Bella": "A vintage Italian carbonated wine cart, bespoke-branded and serving prosecco on tap.",
    "Porta-Bella": "The first portable prosecco tap system in the Caribbean. Imported from Italy, bespoke-branded, always fresh.",
  };

  function handleWhatsApp() {
    if (typeof gtag !== "undefined") {
      gtag("event", "qualifier_whatsapp_clicked", { offering: recommendation });
    }
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  }

  return (
    <motion.div
      key="recommendation"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Champagne sparkle animation */}
      <ChampagneSparkle />

      <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-3">
        Your perfect match
      </p>

      {/* Recommendation card */}
      <div
        className="border border-[var(--gold-mid)]/30 p-6 mb-6"
        style={{ backgroundColor: "rgba(201,169,110,0.04)" }}
      >
        <h3
          className="font-display font-light text-[var(--charcoal)] mb-1"
          style={{ fontSize: "var(--text-section)" }}
        >
          {recommendation}
        </h3>
        <p className="font-display italic text-[var(--gold-deep)] text-sm mb-3">
          {taglines[recommendation]}
        </p>
        <p className="text-[var(--charcoal-mid)] text-sm leading-relaxed">
          {descriptions[recommendation]}
        </p>

        {isLargeScale && (
          <p className="text-[var(--muted)] text-xs mt-3 pt-3 border-t border-[var(--gold-mid)]/20">
            For 300+ guests we typically recommend discussing setup and logistics — our team will walk you through it.
          </p>
        )}
      </div>

      {/* Add-on note */}
      {showAddOn && (
        <p className="text-[var(--muted)] text-xs mb-6 italic">
          Great for inclusive events — add Prosecco Zero for non-drinking guests.
        </p>
      )}

      {/* Primary CTA */}
      <button
        onClick={handleWhatsApp}
        className="w-full flex items-center justify-center gap-3 px-6 min-h-[48px] mb-3 text-sm tracking-wide transition-opacity hover:opacity-80"
        style={{ backgroundColor: "var(--brand-wa)", color: "var(--white)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.374 0 0 5.373 0 12c0 2.12.554 4.107 1.523 5.83L0 24l6.34-1.498A11.956 11.956 0 0012 24c6.627 0 12-5.374 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 01-5.017-1.374l-.36-.213-3.764.888.927-3.672-.234-.377A9.796 9.796 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
        </svg>
        {isExploring ? "Start the conversation →" : "Chat with us on WhatsApp →"}
      </button>

      {/* Secondary link */}
      <div className="flex items-center justify-between">
        <a
          href="/#offerings"
          onClick={onClose}
          className="text-xs tracking-wide text-[var(--gold-deep)] hover:text-[var(--gold-accent)] transition-colors underline underline-offset-2 min-h-[44px] flex items-center"
        >
          See all offerings
        </a>
        <button
          onClick={onReset}
          className="text-xs tracking-wide text-[var(--muted)] hover:text-[var(--charcoal-mid)] transition-colors min-h-[44px] flex items-center"
        >
          Start over
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Champagne sparkle (reduced-motion aware) ───────────────────────────── */

function ChampagneSparkle() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) return null;

  return (
    <motion.div
      className="flex justify-center mb-6"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="relative w-8 h-8">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <motion.span
            key={deg}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: "var(--gold-mid)",
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
            }}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((deg * Math.PI) / 180) * 14,
              y: Math.sin((deg * Math.PI) / 180) * 14,
            }}
            transition={{ duration: 0.8, delay: 0.1 + deg / 2000, ease: "easeOut" }}
          />
        ))}
        {/* Champagne glass SVG — no emoji */}
        <svg
          className="absolute inset-0 m-auto"
          width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="var(--gold-mid)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 22h8M12 22v-7M6 2l2 9h8l2-9H6zM9 11s1 3 3 3 3-3 3-3" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

interface OfferingQualifierProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OfferingQualifier({ isOpen, onClose }: OfferingQualifierProps) {
  const [step, setStep] = useState(0); // 0=event, 1=guests, 2=timing, 3=result
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [answers, setAnswers] = useState<Answers>({
    eventType: null,
    guestCount: null,
    timing: null,
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Track trigger element for focus return
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Gtag event
      if (typeof gtag !== "undefined") {
        gtag("event", "qualifier_opened");
      }
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  // Focus first element when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstFocusableRef.current?.focus(), 50);
    }
  }, [isOpen, step]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function advance() {
    setDirection("forward");
    setStep((s) => s + 1);
  }

  function back() {
    setDirection("back");
    setStep((s) => s - 1);
  }

  function reset() {
    setAnswers({ eventType: null, guestCount: null, timing: null });
    setStep(0);
    setDirection("forward");
  }

  function selectEventType(value: EventType) {
    setAnswers((a) => ({ ...a, eventType: value }));
    advance();
  }

  function selectGuestCount(value: GuestCount) {
    setAnswers((a) => ({ ...a, guestCount: value }));
    advance();
  }

  function selectTiming(value: Timing) {
    setAnswers((a) => ({ ...a, timing: value }));
    // Gtag — recommendation shown
    const rec = getRecommendation({ eventType: answers.eventType });
    if (typeof gtag !== "undefined") {
      gtag("event", "recommendation_shown", { offering: rec });
    }
    advance();
  }

  const enterVariant = direction === "forward" ? "enterRight" : "enterLeft";
  const exitVariant  = direction === "forward" ? "exitLeft"  : "exitRight";

  const steps = [
    {
      question: "What kind of event?",
      options: [
        "Wedding",
        "Corporate event",
        "Private party / celebration",
        "Restaurant or recurring venue",
        "Something else",
      ] as EventType[],
      key: "eventType" as const,
      onSelect: selectEventType,
    },
    {
      question: "How many guests?",
      options: ["Under 50", "50–150", "150–300", "300+"] as GuestCount[],
      key: "guestCount" as const,
      onSelect: selectGuestCount,
    },
    {
      question: "When's the event?",
      options: [
        "Within the next month",
        "1–3 months away",
        "3+ months away",
        "Just exploring",
      ] as Timing[],
      key: "timing" as const,
      onSelect: selectTiming,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: "rgba(14,13,11,0.65)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Find your perfect offering"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-md pointer-events-auto border border-[var(--gold-mid)]/30"
              style={{ backgroundColor: "var(--cream-light)" }}
            >
              {/* Close button */}
              <button
                ref={firstFocusableRef}
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[var(--muted)] hover:text-[var(--charcoal)] transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="p-8 pt-10">
                {step < 3 ? (
                  <>
                    <StepIndicator step={step + 1} total={3} />

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={step}
                        variants={slideVariants}
                        initial={enterVariant}
                        animate="center"
                        exit={exitVariant}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h2
                          className="font-display font-light text-[var(--charcoal)] mb-6"
                          style={{ fontSize: "var(--text-section)" }}
                        >
                          {steps[step].question}
                        </h2>

                        <div className="flex flex-col gap-2">
                          {steps[step].options.map((option) => (
                            <OptionButton
                              key={option}
                              label={option}
                              selected={answers[steps[step].key] === option}
                              onClick={() => steps[step].onSelect(option as never)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Back button */}
                    {step > 0 && (
                      <button
                        onClick={back}
                        className="flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--charcoal-mid)] transition-colors mt-6 min-h-[44px]"
                      >
                        <ArrowLeft size={12} />
                        Back
                      </button>
                    )}
                  </>
                ) : (
                  <RecommendationScreen
                    answers={answers as FullAnswers}
                    onReset={reset}
                    onClose={onClose}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
