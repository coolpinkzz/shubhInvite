"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION } from "./constants";
import type { CoupleIllustrationProps } from "./types";

export function CoupleIllustration({
  bride,
  groom,
  className,
}: CoupleIllustrationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.figure
      className={cn(
        "pointer-events-none relative z-20",
        "mx-auto w-[230px] sm:mx-0 sm:w-[280px] lg:w-[320px]",
        /* Overlap slightly outside the hero on desktop */
        "sm:-mb-6 sm:-translate-x-2 lg:-mb-10 lg:-translate-x-4",
        className,
      )}
      aria-label={`${bride} and ${groom} illustration`}
      initial={reducedMotion ? false : { opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: MOTION.duration,
        delay: 0.35,
        ease: MOTION.ease,
      }}
    >
      {/* Soft backdrop circle behind the couple */}
      <motion.div
        className={cn(
          "absolute left-1/2 top-[58%] z-0 -translate-x-1/2 -translate-y-1/2",
          "h-[115%] w-[115%] rounded-full",
          "bg-[radial-gradient(circle,rgba(255,248,242,0.95)_0%,rgba(248,220,200,0.55)_42%,rgba(232,196,176,0.22)_65%,transparent_78%)]",
          "blur-[2px]",
        )}
        aria-hidden="true"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 0.85, scale: 1 }
            : { opacity: [0.7, 0.95, 0.7], scale: [1, 1.04, 1] }
        }
        transition={
          reducedMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <Image
        src={ASSETS.couple}
        alt={`${bride} and ${groom} standing together`}
        width={640}
        height={960}
        priority
        sizes="(max-width: 640px) 230px, (max-width: 1024px) 280px, 320px"
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_18px_40px_rgba(46,46,46,0.12)]"
      />
    </motion.figure>
  );
}
