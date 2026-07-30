"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION } from "./constants";
import type { FloatingFeathersProps } from "./types";

const FEATHER_SLOTS = [
  {
    className: "left-[6%] top-[18%] w-10 sm:w-14 -rotate-[18deg]",
    delay: 0.2,
    duration: 11,
  },
  {
    className: "right-[8%] top-[22%] w-9 sm:w-12 rotate-[14deg]",
    delay: 0.45,
    duration: 13,
  },
  {
    className: "left-[12%] top-[58%] w-8 sm:w-11 rotate-[8deg]",
    delay: 0.7,
    duration: 12,
  },
  {
    className: "right-[10%] top-[52%] w-10 sm:w-12 -rotate-[10deg]",
    delay: 0.35,
    duration: 14,
  },
  {
    className: "left-[48%] top-[12%] w-7 sm:w-9 rotate-[4deg]",
    delay: 0.55,
    duration: 10,
  },
] as const;

export function FloatingFeathers({
  className,
  count = 4,
}: FloatingFeathersProps) {
  const reducedMotion = useReducedMotion();
  const feathers = FEATHER_SLOTS.slice(0, Math.min(count, FEATHER_SLOTS.length));

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[6] overflow-hidden", className)}
      aria-hidden="true"
    >
      {feathers.map((feather, index) => (
        <motion.div
          key={`feather-${index}`}
          className={cn("absolute opacity-35 sm:opacity-45", feather.className)}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={
            reducedMotion
              ? { opacity: 0.35, y: 0, rotate: 0 }
              : {
                  opacity: [0.28, 0.45, 0.28],
                  y: [0, -10, 0],
                  rotate: [-3, 3, -3],
                }
          }
          transition={
            reducedMotion
              ? { duration: MOTION.duration, delay: feather.delay }
              : {
                  opacity: {
                    duration: feather.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: feather.delay,
                  },
                  y: {
                    duration: feather.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: feather.delay,
                  },
                  rotate: {
                    duration: feather.duration * 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: feather.delay,
                  },
                }
          }
        >
          <Image
            src={ASSETS.peacockFeather}
            alt=""
            width={120}
            height={120}
            className="h-auto w-full object-contain drop-shadow-sm"
            loading="lazy"
            sizes="56px"
          />
        </motion.div>
      ))}
    </div>
  );
}
