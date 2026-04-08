"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { BRAND } from "@/lib/constants";

const STAT_CELLS = [
  { value: "1,200+", label: "Bottles Served" },
  { value: "85+",    label: "Events Hosted" },
  { value: "18,500+", label: "Glasses Poured" },
];

export default function EventsGallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      id="events"
      className="section-padding"
      style={{ backgroundColor: "var(--cream)" }}
      aria-labelledby="gallery-heading"
    >
      <div className="container-brand">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <MotionWrapper delay={0.1}>
              <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-4">
                Moments We've Made
              </p>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <h2
                id="gallery-heading"
                className="font-display font-light text-[var(--charcoal)] leading-tight"
                style={{ fontSize: "var(--text-display)" }}
              >
                Events that<br />
                <span className="italic text-gold-gradient">leave a mark.</span>
              </h2>
            </MotionWrapper>
          </div>
          <MotionWrapper delay={0.3} direction="left">
            <Link
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--gold-deep)] hover:text-[var(--gold-accent)] transition-colors border-b border-[var(--gold-mid)]/50 hover:border-[var(--gold-accent)] pb-1"
            >
              See More on Instagram
            </Link>
          </MotionWrapper>
        </div>

        {/* Editorial grid — real assets + typographic cells */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--gold-mid)]/15">

          {/* Cell 1: Prosecco Zero Rosé (black label) — tall portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden"
            style={{ backgroundColor: "var(--cream-dark)", aspectRatio: "4/5" }}
          >
            <Image
              src="/assets/prosecco-zero-rose.png"
              alt="Prosecco Zero Rosé — blush bottle"
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to top, rgba(212,132,138,0.15), transparent)" }}
              aria-hidden="true"
            />
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs tracking-widest uppercase text-[var(--rose)] border border-[var(--rose)]/40 px-3 py-1.5 bg-[var(--cream-light)]/90">
                Prosecco Zero Rosé
              </span>
            </div>
          </motion.div>

          {/* Cell 1b: Second rosé portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden md:hidden"
            style={{ backgroundColor: "color-mix(in srgb, var(--rose-light) 12%, var(--cream-dark))", aspectRatio: "4/5" }}
          >
            <Image
              src="/assets/prosecco-zero-brut.png"
              alt="Prosecco Rosé — blush bottle"
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              sizes="50vw"
            />
          </motion.div>

          {/* Cell 2: Bottle video — wide landscape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden col-span-1 md:col-span-2"
            style={{ backgroundColor: "var(--cream-dark)", aspectRatio: "16/9" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
              poster="/assets/prosecco-zero-rose.png"
            >
              <source src="/assets/slow-dolly-2.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%)" }}
              aria-hidden="true"
            />
            {/* Label */}
            <div className="absolute bottom-4 left-4">
              <span className="text-xs tracking-widest uppercase text-[var(--gold-mid)] border border-[var(--gold-mid)]/30 px-3 py-1.5 bg-[var(--black)]/60 backdrop-blur-sm">
                Prosecco Zero
              </span>
            </div>
          </motion.div>

          {/* Stat cells */}
          {STAT_CELLS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden flex flex-col items-center justify-center gap-2 py-12 px-6"
              style={{ backgroundColor: "var(--cream-light)", aspectRatio: "1/1" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
              <span
                className="font-display font-light text-[var(--gold-deep)] relative"
                style={{ fontSize: "var(--text-section)" }}
              >
                {stat.value}
              </span>
              <span className="text-xs tracking-widest uppercase text-[var(--muted)] text-center relative">
                {stat.label}
              </span>
            </motion.div>
          ))}

          {/* Dark brut bottle portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.30, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden hidden md:block"
            style={{ backgroundColor: "var(--charcoal)", aspectRatio: "1/1" }}
          >
            <Image
              src="/assets/prosecco-extract-2.png"
              alt="Prosecco Brut — dark bottle"
              fill
              className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
              sizes="33vw"
            />
          </motion.div>

          {/* Instagram CTA cell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.33, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden flex flex-col items-center justify-center gap-5 py-12 px-8"
            style={{ backgroundColor: "var(--charcoal)", aspectRatio: "1/1" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold-mid)" className="relative opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <p className="font-display italic text-[var(--white)] text-center relative" style={{ fontSize: "var(--text-lead)" }}>
              "See our moments"
            </p>
            <Link
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-xs tracking-widest uppercase text-[var(--gold-mid)] border border-[var(--gold-mid)]/30 px-5 py-2.5 hover:bg-[var(--gold-mid)]/10 transition-colors duration-300"
            >
              @bubblesandbrewsco
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
