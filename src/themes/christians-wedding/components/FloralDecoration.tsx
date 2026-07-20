"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, FLORAL_LAYOUT, MOTION } from "./constants";
import type { FloralDecorationProps } from "./types";

export function FloralDecoration({
  position,
  className,
  delay = 0,
}: FloralDecorationProps) {
  const reducedMotion = useReducedMotion();
  const layout = FLORAL_LAYOUT[position];

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-10",
        layout.wrapper,
        layout.opacity,
        className,
      )}
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: MOTION.duration,
        delay,
        ease: MOTION.ease,
      }}
    >
      <div className={cn("relative size-full", layout.image)}>
        <Image
          src={ASSETS.floral}
          alt=""
          fill
          sizes={layout.sizes}
          className={cn("object-contain", layout.object)}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
