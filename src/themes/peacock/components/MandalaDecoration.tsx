"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION } from "./constants";
import type { MandalaDecorationProps } from "./types";

const SIZE_MAP = {
  sm: "h-16 w-16 sm:h-20 sm:w-20",
  md: "h-24 w-24 sm:h-28 sm:w-28",
  lg: "h-32 w-32 sm:h-40 sm:w-40",
} as const;

export function MandalaDecoration({
  className,
  size = "md",
}: MandalaDecorationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute left-1/2 top-[8%] z-[5] -translate-x-1/2",
        SIZE_MAP[size],
        className,
      )}
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={
        reducedMotion
          ? { opacity: 0.45, scale: 1, rotate: 0 }
          : { opacity: 0.45, scale: 1, rotate: 360 }
      }
      transition={
        reducedMotion
          ? { duration: MOTION.duration }
          : {
              opacity: { duration: MOTION.duration, delay: 0.2 },
              scale: { duration: MOTION.duration, delay: 0.2 },
              rotate: { duration: 120, repeat: Infinity, ease: "linear" },
            }
      }
    >
      <img
        src={ASSETS.mandala}
        alt=""
        width={160}
        height={160}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}
