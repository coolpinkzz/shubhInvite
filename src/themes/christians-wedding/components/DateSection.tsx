"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { MOTION } from "./constants";
import { HeartScratchCard } from "./HeartScratchCard";
import type { DateSectionProps } from "./types";

export function DateSection({
  dayOfMonth,
  month,
  year,
  dateIso,
  revealThreshold = 0.4,
}: DateSectionProps) {
  const reducedMotion = useReducedMotion();
  const readableDate = `${dayOfMonth} ${month} ${year}`;

  return (
    <motion.div
      className={cn("mx-auto w-full max-w-md px-3 py-5 sm:px-6 sm:py-6")}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration,
        delay: 0.45,
        ease: MOTION.ease,
      }}
    >
      <p className="mb-3 text-center font-theme-label text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#B88C6A] sm:text-[0.65rem]">
        Scratch the hearts to reveal
      </p>

      <time
        dateTime={dateIso}
        className="flex items-end justify-center gap-3 sm:gap-4"
        aria-label={readableDate}
      >
        <HeartScratchCard
          value={dayOfMonth}
          label="Day"
          revealThreshold={revealThreshold}
          valueClassName="text-[1.85rem] sm:text-[2.35rem] md:text-[2.6rem]"
        />
        <HeartScratchCard
          value={month}
          label="Month"
          revealThreshold={revealThreshold}
          valueClassName="text-[1.15rem] sm:text-[1.35rem] md:text-[1.45rem] tracking-[0.08em]"
        />
        <HeartScratchCard
          value={year}
          label="Year"
          revealThreshold={revealThreshold}
          valueClassName="text-[1.25rem] sm:text-[1.5rem] md:text-[1.65rem] tracking-[0.06em]"
        />
      </time>
    </motion.div>
  );
}
