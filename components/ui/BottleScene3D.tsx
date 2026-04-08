"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PlaceholderAsset from "./PlaceholderAsset";

interface BottleScene3DProps {
  /**
   * Pass a Spline scene URL once the 3D model is ready:
   *   import Spline from "@splinetool/react-spline";
   *   <Spline scene={splineUrl} />
   *
   * Or pass a glTF/GLB file path to load via Three.js / React Three Fiber.
   *
   * Currently renders an animated 2D placeholder with float + scroll-driven rotation.
   */
  splineUrl?: string;
  className?: string;
}

/**
 * 3D Bottle Scene — scroll-driven rotation + float animation.
 *
 * ── Current state: SCAFFOLD ──────────────────────────────────────────────
 * Renders a premium animated placeholder.
 * The float loop (y oscillation) and scroll-driven rotation are fully wired.
 * Once a 3D asset is ready, drop it in here.
 *
 * ── Option A: Spline (recommended — easiest) ─────────────────────────────
 *   1. Design bottle in Spline (spline.design) or export from Gemini/Blender
 *   2. Publish scene to Spline Cloud, get URL
 *   3. npm install @splinetool/react-spline
 *   4. Replace placeholder with:
 *      import Spline from "@splinetool/react-spline";
 *      <Spline scene="https://prod.spline.design/YOUR-SCENE-ID/scene.splinecode" />
 *
 * ── Option B: React Three Fiber (for full control) ───────────────────────
 *   1. npm install three @react-three/fiber @react-three/drei
 *   2. Load GLB file from Gemini/Blender export
 *   3. Wrap in <Canvas> with useGLTF hook
 *   4. Attach scroll progress to rotation.y via useFrame
 *
 * ── Option C: Lottie (for 2D animated illustration) ──────────────────────
 *   1. Create bottle animation in After Effects or Lottie editor
 *   2. Export as .lottie / .json
 *   3. npm install @lottiefiles/react-lottie-player
 *   4. <Player src="/assets/bottle-animation.lottie" autoplay loop />
 */
export default function BottleScene3D({ splineUrl, className }: BottleScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /* Scroll-driven rotation: bottle rotates 0→30deg as section scrolls through */
  const rotateY = useTransform(scrollYProgress, [0, 1], ["-15deg", "15deg"]);
  /* Parallax lift */
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  if (splineUrl) {
    /* ── FUTURE: Spline embed ──────────────────────────────────────── */
    return (
      <motion.div ref={containerRef} style={{ y, rotateY }} className={className}>
        {/*
         * Replace this comment with:
         * import Spline from "@splinetool/react-spline";
         * <Spline scene={splineUrl} className="w-full h-full" />
         */}
        <div className="w-full h-full flex items-center justify-center text-[var(--muted)] text-sm">
          Spline scene: {splineUrl}
        </div>
      </motion.div>
    );
  }

  /* ── Placeholder: animated 2D bottle proxy ───────────────────────────── */
  return (
    <motion.div
      ref={containerRef}
      style={{ y, perspective: "800px" }}
      className={className}
    >
      {/* Float loop */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateY }}
        className="w-full h-full"
      >
        <PlaceholderAsset
          label="3D Bottle Model"
          note="Drop Spline URL or GLB asset here. See BottleScene3D.tsx for integration options."
          aspectRatio="2/3"
          className="w-full h-full"
        />
      </motion.div>

      {/* Subtle shadow — gives the float animation depth */}
      <motion.div
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.15, 0.08, 0.15] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="mx-auto mt-4 w-1/2 h-3 rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(26,24,22,0.25) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
