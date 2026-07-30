"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION, PEACOCK_LAYOUT } from "./constants";
import type { PeacockDecorationProps } from "./types";

export function PeacockDecoration({
  position,
  className,
  delay = 0,
}: PeacockDecorationProps) {
  const reducedMotion = useReducedMotion();
  const layout = PEACOCK_LAYOUT[position];
  const src =
    position === "bottom-left" ? ASSETS.peacockLeft : ASSETS.peacockRight;

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute z-10",
        layout.wrapper,
        layout.opacity,
        className,
      )}
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration + 0.15,
        delay,
        ease: MOTION.ease,
      }}
    >
      <motion.div
        className={cn("relative h-full w-full", layout.image)}
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -6, 0], rotate: [0, position === "bottom-left" ? -1.5 : 1.5, 0] }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: MOTION.featherFloat,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + 0.4,
              }
        }
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={layout.sizes}
          className={cn(layout.object, "pk-peacock-blend")}
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
}
