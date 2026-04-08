"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

/**
 * Scroll-triggered reveal wrapper.
 * Wraps any content with a luxurious fade + translate-in on scroll entry.
 */
export default function MotionWrapper({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const offsets = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none:  { y: 0, x: 0 },
  };

  const initial = { opacity: 0, ...offsets[direction] };
  const animate = isInView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1], /* luxury ease */
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
