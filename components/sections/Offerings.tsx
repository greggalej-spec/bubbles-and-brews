"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { OFFERINGS } from "@/lib/constants";
import OfferingQualifier from "@/components/ui/OfferingQualifier";

const typeLabel: Record<string, string> = {
  bottle:     "Bottle",
  experience: "Experience",
  product:    "On Tap",
};

export default function Offerings() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [qualifierOpen, setQualifierOpen] = useState(false);

  const hero = OFFERINGS[0];
  const secondaries = OFFERINGS.slice(1);

  return (
    <section
      ref={ref}
      id="offerings"
      className="relative"
      style={{ backgroundColor: "var(--cream-light)" }}
      aria-labelledby="offerings-heading"
    >
      {/* Section header */}
      <div
        className="container-brand"
        style={{
          paddingTop: "var(--section-gap)",
          paddingBottom: "clamp(3rem, 6vw, 6rem)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-4">
            The Collection
          </p>
          <h2
            id="offerings-heading"
            className="font-display font-light text-[var(--charcoal)] leading-tight"
            style={{ fontSize: "var(--text-display)" }}
          >
            Curated for every<br />
            <span className="italic text-gold-gradient">occasion.</span>
          </h2>
        </motion.div>
      </div>

      {/* Gallery — asymmetric: Bella hero left, secondaries stacked right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row border border-[var(--gold-mid)]/20 md:border-0 md:border-t mx-10 lg:mx-0"
      >
        {/* Hero — Bella (65% width on desktop) */}
        <HeroCard offering={hero} inView={isInView} />

        {/* Secondaries stacked (35% width on desktop) */}
        <div className="w-full md:w-[35%] flex flex-col divide-y divide-[var(--gold-mid)]/20 border-t md:border-t-0 md:border-l border-[var(--gold-mid)]/20">
          {secondaries.map((offering, i) => (
            <SecondaryCard key={offering.id} offering={offering} index={i} inView={isInView} />
          ))}
        </div>
      </motion.div>

      {/* Qualifier trigger */}
      <div
        className="flex justify-center"
        style={{ paddingTop: "2rem", paddingBottom: "var(--section-gap)" }}
      >
        <button
          onClick={() => setQualifierOpen(true)}
          className="font-display italic text-[var(--gold-deep)] text-sm hover:text-[var(--gold-accent)] transition-colors min-h-[44px] px-4"
        >
          Not sure which is right for you? →
        </button>
      </div>

      <OfferingQualifier isOpen={qualifierOpen} onClose={() => setQualifierOpen(false)} />
    </section>
  );
}

function HeroCard({
  offering,
  inView,
}: {
  offering: (typeof OFFERINGS)[number];
  inView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 1.02 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full md:w-[65%] overflow-hidden"
      style={{ minHeight: "clamp(420px, 60vh, 680px)" }}
    >
      {/* Cinematic video fill */}
      {"video" in offering && offering.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={(offering as { videoPoster?: string }).videoPoster}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={offering.video as string} type="video/mp4" />
        </video>
      )}

      {/* Dark gradient overlay — heavier on left where text lives */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(14,13,11,0.72) 0%, rgba(14,13,11,0.45) 50%, rgba(14,13,11,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Text content — overlaid on dark */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ padding: "clamp(2rem, 4vw, 4rem)" }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-light)] border border-[var(--gold-light)]/40 px-4 py-2 w-fit mb-8">
          {typeLabel[offering.type]}
        </span>

        <h3
          className="font-display font-light text-[var(--cream-light)] leading-tight mb-4"
          style={{ fontSize: "var(--text-display)" }}
        >
          {offering.name}
        </h3>

        <p className="text-[var(--gold-light)] text-base italic font-display leading-relaxed mb-10">
          {offering.pitch}
        </p>

        <Link
          href={`/offerings/${offering.id}`}
          className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--cream-light)] hover:text-[var(--gold-light)] transition-colors group/link min-h-[44px] w-fit"
        >
          <span>{offering.cta}</span>
          <ArrowRight
            size={14}
            className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>
    </motion.article>
  );
}

function SecondaryCard({
  offering,
  index,
  inView,
}: {
  offering: (typeof OFFERINGS)[number];
  index: number;
  inView: boolean;
}) {
  const isRose = offering.id === "bottles";

  return (
    <motion.article
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.4 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex-1 flex flex-col justify-center gap-6"
      style={{ padding: "clamp(3rem, 5vw, 3.5rem) clamp(2rem, 4vw, 3rem)" }}
      style={{
        backgroundColor: isRose
          ? "color-mix(in srgb, var(--rose-light) 8%, var(--cream-light))"
          : "var(--cream-light)",
      }}
    >
      <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-deep)] border border-[var(--gold-mid)]/40 px-4 py-2 w-fit">
        {typeLabel[offering.type]}
      </span>

      <h3
        className="font-display font-light text-[var(--charcoal)] leading-tight"
        style={{ fontSize: "var(--text-section)" }}
      >
        {offering.name}
      </h3>

      <p className="text-[var(--gold-deep)] text-base italic font-display leading-relaxed">
        {offering.pitch}
      </p>

      <Link
        href={`/offerings/${offering.id}`}
        className="inline-flex items-center gap-2 text-sm tracking-wide text-[var(--gold-deep)] hover:text-[var(--gold-accent)] transition-colors group/link min-h-[44px] w-fit"
      >
        <span>{offering.cta}</span>
        <ArrowRight
          size={14}
          className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300"
        />
      </Link>
    </motion.article>
  );
}
