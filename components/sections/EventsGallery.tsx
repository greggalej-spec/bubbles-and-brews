"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PlaceholderAsset from "@/components/ui/PlaceholderAsset";
import MotionWrapper from "@/components/ui/MotionWrapper";

const GALLERY_ITEMS = [
  { id: 1, label: "Event Photography 1", aspectRatio: "4/5",  note: "Source: Instagram — event bar setup" },
  { id: 2, label: "Event Photography 2", aspectRatio: "16/9", note: "Source: Instagram — reception or party" },
  { id: 3, label: "Event Photography 3", aspectRatio: "1/1",  note: "Source: Instagram — close-up pour or detail" },
  { id: 4, label: "Event Photography 4", aspectRatio: "1/1",  note: "Source: Instagram — guests or celebration" },
  { id: 5, label: "Event Photography 5", aspectRatio: "16/9", note: "Source: Instagram — venue wide shot" },
  { id: 6, label: "Event Photography 6", aspectRatio: "4/5",  note: "Source: Instagram — product or lifestyle" },
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
              href="/events"
              className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--gold-deep)] hover:text-[var(--gold-accent)] transition-colors border-b border-[var(--gold-mid)]/50 hover:border-[var(--gold-accent)] pb-1"
            >
              See All Events
            </Link>
          </MotionWrapper>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--gold-mid)]/15">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden"
              style={{
                backgroundColor: "var(--cream-light)",
                gridColumn: item.aspectRatio === "16/9" ? "span 2" : undefined,
              }}
            >
              <PlaceholderAsset
                label={item.label}
                aspectRatio={item.aspectRatio}
                note={item.note}
                className="w-full transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(201,169,110,0.12)" }}
                aria-hidden="true"
              >
                <span className="text-[var(--gold-deep)] text-xs tracking-widest uppercase border border-[var(--gold-mid)] px-4 py-2">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <MotionWrapper delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="https://www.instagram.com/bubblesandbrewsco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[var(--muted)] hover:text-[var(--gold-deep)] transition-colors text-sm tracking-wide"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @bubblesandbrewsco for more moments
            </Link>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
