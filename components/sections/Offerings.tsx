"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { OFFERINGS } from "@/lib/constants";

const typeLabel: Record<string, string> = {
  bottle:     "Bottle",
  experience: "Experience",
  product:    "On Tap",
};

export default function Offerings() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

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

      {/* Showcase rows — full section width, alternating layout */}
      {OFFERINGS.map((offering, i) => (
        <ShowcaseRow key={offering.id} offering={offering} index={i} inView={isInView} />
      ))}

      {/* Bottom spacing */}
      <div style={{ height: "var(--section-gap)" }} />
    </section>
  );
}

function ShowcaseRow({
  offering,
  index,
  inView,
}: {
  offering: (typeof OFFERINGS)[number];
  index: number;
  inView: boolean;
}) {
  const isReversed = index % 2 !== 0;
  const isRose = offering.id === "bottles";
  const textBg = index % 2 === 0 ? "var(--cream-light)" : "var(--cream)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.15 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} border-t border-[var(--gold-mid)]/20`}
      style={{ minHeight: "480px" }}
    >
      {/* Visual half — fills its side edge to edge */}
      <div
        className="relative w-full md:w-1/2 overflow-hidden"
        style={{
          minHeight: "320px",
          backgroundColor: isRose
            ? "color-mix(in srgb, var(--rose-light) 12%, var(--cream))"
            : "var(--cream-dark)",
        }}
      >
        {"video" in offering && offering.video ? (
          <>
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
            {/* Subtle cinematic gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${isReversed ? "to right" : "to left"}, rgba(14,13,11,0.18) 0%, transparent 50%)`,
              }}
              aria-hidden="true"
            />
          </>
        ) : "image" in offering && offering.image ? (
          <Image
            src={offering.image as string}
            alt={(offering as { imageAlt?: string; name: string }).imageAlt ?? offering.name}
            fill
            className="object-contain p-10 md:p-16"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </div>

      {/* Text half */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center gap-6 p-10 md:p-16 lg:p-20"
        style={{ backgroundColor: textBg }}
      >
        {/* Type badge */}
        <span className="text-xs tracking-[0.2em] uppercase text-[var(--gold-deep)] border border-[var(--gold-mid)]/40 px-4 py-2 w-fit">
          {typeLabel[offering.type]}
        </span>

        {/* Name */}
        <h3
          className="font-display font-light text-[var(--charcoal)] leading-tight"
          style={{ fontSize: "var(--text-section)" }}
        >
          {offering.name}
        </h3>

        {/* Pitch */}
        <p className="text-[var(--gold-deep)] text-base italic font-display leading-relaxed">
          {offering.pitch}
        </p>

        {/* Use cases */}
        <div className="flex flex-wrap gap-2">
          {offering.useCases.map((uc) => (
            <span
              key={uc}
              className="text-xs text-[var(--muted)] border border-[var(--charcoal)]/10 px-3 py-1.5"
            >
              {uc}
            </span>
          ))}
        </div>

        {/* CTA */}
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
      </div>
    </motion.article>
  );
}
