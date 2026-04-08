"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const VARIANTS = [
  {
    id: "brut",
    name: "Prosecco Zero Brut",
    tagline: "Crisp. Floral. Celebrated.",
    tasting: "Wisteria, acacia, and white fruit aromas. Fresh and harmonious on the palate.",
    abv: "11.5%",
    sugar: "2.8g / bottle",
    image: "/assets/prosecco-extract-1.png",
    imageAlt: "Prosecco Zero DOC Brut — gold cap bottle with ZERO label",
  },
  {
    id: "rose",
    name: "Prosecco Zero Rosé",
    tagline: "Blush. Berries. Beautiful.",
    tasting: "Strawberries and red berries. Intense and persistent, lively and silky.",
    abv: "11.5%",
    sugar: "2.8g / bottle",
    image: "/assets/prosecco-extract-1.png",
    imageAlt: "Prosecco Zero Rosé — gold cap bottle",
  },
];

export default function BottlesFeature() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
      aria-labelledby="bottles-heading"
    >
      <div className="container-brand">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-4">
            Peninsula Winery · Friuli Venezia Giulia, Italy
          </p>
          <h1
            id="bottles-heading"
            className="font-display font-light text-[var(--charcoal)] leading-tight mb-6"
            style={{ fontSize: "var(--text-display)" }}
          >
            Prosecco Zero
            <br />
            <span className="italic text-gold-gradient">All the flavor. Zero the guilt.</span>
          </h1>
          <p
            className="text-[var(--charcoal-mid)] max-w-2xl leading-relaxed"
            style={{ fontSize: "var(--text-lead)" }}
          >
            The world's lowest-sugar prosecco. Just 2.8 grams per bottle —
            versus 25g+ in standard prosecco. Crafted from premium Glera grapes
            using a novel fermentation approach that preserves full enjoyment
            without compromise.
          </p>
        </motion.div>

        {/* Sugar stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-px mb-20"
        >
          <div className="bg-[var(--charcoal)] px-8 py-5 flex flex-col gap-1">
            <span className="font-display text-[var(--gold-light)] text-3xl">2.8g</span>
            <span className="text-xs tracking-wider uppercase text-[var(--white)]/60">
              Sugar per bottle
            </span>
          </div>
          <div className="bg-[var(--cream-light)] border border-[var(--gold-mid)]/20 px-8 py-5 flex flex-col gap-1">
            <span className="font-display text-[var(--charcoal)] text-3xl line-through opacity-40">25g+</span>
            <span className="text-xs tracking-wider uppercase text-[var(--muted)]">
              Standard prosecco
            </span>
          </div>
        </motion.div>

        {/* Product variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--gold-mid)]/15">
          {VARIANTS.map((variant, i) => (
            <motion.article
              key={variant.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[var(--cream-light)] p-8 md:p-10 flex flex-col gap-6"
              style={
                variant.id === "rose"
                  ? { backgroundColor: "color-mix(in srgb, var(--rose-light) 8%, var(--cream-light))" }
                  : {}
              }
            >
              {/* Visual */}
              {variant.image ? (
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={variant.image}
                    alt={(variant as { imageAlt?: string; name: string }).imageAlt ?? variant.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : null}

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h2
                  className="font-display font-light text-[var(--charcoal)] leading-tight"
                  style={{ fontSize: "var(--text-section)" }}
                >
                  {variant.name}
                </h2>
                <p className="text-[var(--gold-deep)] text-sm italic font-display">
                  {variant.tagline}
                </p>
                <p className="text-[var(--charcoal-mid)] text-sm leading-relaxed">
                  {variant.tasting}
                </p>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6 border-t border-[var(--gold-mid)]/20 pt-5">
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-wider uppercase text-[var(--muted)]">ABV</span>
                  <span className="font-display text-[var(--charcoal)]">{variant.abv}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-wider uppercase text-[var(--muted)]">Sugar</span>
                  <span className="font-display text-[var(--charcoal)]">{variant.sugar}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-wider uppercase text-[var(--muted)]">Origin</span>
                  <span className="font-display text-[var(--charcoal)]">Italy</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col sm:flex-row gap-4 items-start"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium hover:bg-[var(--gold-deep)] transition-colors duration-300"
          >
            Order for Your Event
          </Link>
          <Link
            href="/#offerings"
            className="px-8 py-4 border border-[var(--charcoal)]/25 text-[var(--charcoal-mid)] text-sm tracking-widest uppercase hover:border-[var(--gold-deep)] hover:text-[var(--gold-deep)] transition-all duration-300"
          >
            Back to All Offerings
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
