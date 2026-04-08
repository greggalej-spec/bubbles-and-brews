"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import PlaceholderAsset from "@/components/ui/PlaceholderAsset";
import { OFFERINGS } from "@/lib/constants";

const typeLabel: Record<string, string> = {
  bottle:     "Product",
  experience: "Experience",
  product:    "Equipment",
};

export default function Offerings() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id="offerings"
      className="section-padding relative"
      style={{ backgroundColor: "var(--cream)" }}
      aria-labelledby="offerings-heading"
    >
      <div className="container-brand">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
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

        {/* Offerings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--gold-mid)]/15">
          {OFFERINGS.map((offering, i) => (
            <OfferingCard key={offering.id} offering={offering} index={i} inView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferingCard({
  offering,
  index,
  inView,
}: {
  offering: (typeof OFFERINGS)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--cream-light)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cream)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cream-light)";
      }}
    >
      {/* Hover gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-[var(--gold-mid)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        aria-hidden="true"
      />

      {/* Type badge */}
      <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--gold-deep)] border border-[var(--gold-mid)]/40 px-3 py-1 w-fit">
        {typeLabel[offering.type]}
      </span>

      {/* Visual placeholder
          REPLACE: Swap <PlaceholderAsset> with <Image> once assets are received. */}
      <PlaceholderAsset
        label={`${offering.name} — Visual`}
        aspectRatio={offering.type === "bottle" ? "3/4" : "16/9"}
        note="Awaiting client-supplied or Instagram-derived image"
        className="w-full"
      />

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3
          className="font-display font-light text-[var(--charcoal)] leading-tight"
          style={{ fontSize: "var(--text-section)" }}
        >
          {offering.name}
        </h3>
        <p className="text-[var(--gold-deep)] text-sm italic font-display">
          {offering.pitch}
        </p>
        <p className="text-[var(--charcoal-mid)] text-sm leading-relaxed line-clamp-3">
          {offering.description}
        </p>
      </div>

      {/* Use cases */}
      <div className="flex flex-wrap gap-2">
        {offering.useCases.map((uc) => (
          <span
            key={uc}
            className="text-[10px] tracking-wide uppercase text-[var(--muted)] border border-[var(--charcoal)]/10 px-2.5 py-1"
          >
            {uc}
          </span>
        ))}
      </div>

      {/* CTA link */}
      <Link
        href={`/offerings/${offering.id}`}
        className="mt-auto inline-flex items-center gap-2 text-sm tracking-wide text-[var(--gold-deep)] hover:text-[var(--gold-accent)] transition-colors group/link"
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
