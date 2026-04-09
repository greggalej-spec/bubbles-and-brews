"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

const SPECS = [
  { label: "Keg Volume", value: "20 Litres" },
  { label: "Equivalent", value: "27+ Bottles" },
  { label: "Origin", value: "Italy" },
  { label: "Units Available", value: "5 Only" },
  { label: "Format", value: "Pressurised & Sealed" },
  { label: "Branding", value: "Bespoke" },
];

export default function PortaBellaFeature() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: "var(--cream)" }}
      aria-labelledby="porta-bella-heading"
    >
      <div className="container-brand">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[var(--gold-deep)] text-xs tracking-[0.3em] uppercase mb-4">
            New to Market · Caribbean Exclusive
          </p>
          <h1
            id="porta-bella-heading"
            className="font-display font-light text-[var(--charcoal)] leading-tight mb-6"
            style={{ fontSize: "var(--text-display)" }}
          >
            Porta-Bella
            <br />
            <span className="italic text-gold-gradient">Prosecco on tap.</span>
          </h1>
          <p
            className="text-[var(--charcoal-mid)] max-w-xl leading-relaxed"
            style={{ fontSize: "var(--text-lead)" }}
          >
            The first portable countertop prosecco tap system in the Caribbean.
            Imported from Italy, bespokely branded, and available for permanent
            venue installation or event rental.
          </p>
        </motion.div>

        {/* Split: visual + specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden w-full"
            style={{ aspectRatio: "4/5", backgroundColor: "var(--cream-dark)" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="w-full h-full object-cover"
              aria-label="Porta-Bella countertop prosecco tap unit"
            >
              <source src="/assets/dolly-clean-1.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Specs + content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            {/* The pitch */}
            <div className="flex flex-col gap-4">
              <p className="font-display italic text-[var(--gold-deep)] text-xl">
                "Your guests have never seen anything like it."
              </p>
              <p className="text-[var(--charcoal-mid)] leading-relaxed">
                Porta-Bella uses the same 20-litre pressurised keg as our Bella cart —
                equivalent to over 27 bottles of prosecco, always fresh, always perfectly
                poured. Each unit is bespokely branded and sealed for maximum shelf life.
              </p>
              <p className="text-[var(--charcoal-mid)] leading-relaxed">
                Limited to just 5 units. Currently available for permanent restaurant
                or bar installation, and as a premium rental for corporate and private events.
              </p>
            </div>

            {/* Spec grid */}
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--gold-deep)] mb-6">
                Product Specifications
              </p>
              <div className="grid grid-cols-2 gap-px bg-[var(--gold-mid)]/15">
                {SPECS.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-[var(--cream-light)] p-5 flex flex-col gap-1"
                  >
                    <span className="text-xs tracking-wider uppercase text-[var(--muted)]">
                      {spec.label}
                    </span>
                    <span className="font-display text-[var(--charcoal)] text-lg">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scarcity note */}
            <div className="border-l-2 border-[var(--gold-mid)] pl-5">
              <p className="text-sm text-[var(--charcoal-mid)] leading-relaxed">
                <span className="font-medium text-[var(--charcoal)]">Only 5 units exist.</span>{" "}
                Once venues are activated, availability closes. Inquire early to secure
                your installation or recurring rental slot.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[var(--charcoal)] text-[var(--cream-light)] text-sm tracking-widest uppercase font-medium hover:bg-[var(--gold-deep)] transition-colors duration-300 text-center"
              >
                Activate at My Venue
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-[var(--charcoal)]/25 text-[var(--charcoal-mid)] text-sm tracking-widest uppercase hover:border-[var(--gold-deep)] hover:text-[var(--gold-deep)] transition-[border-color,color] duration-200 text-center"
              >
                Rent for an Event
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
