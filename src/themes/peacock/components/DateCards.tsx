"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { MOTION } from "./constants";
import type { DateCardsProps } from "./types";

export function DateCards({ cards, dateIso, className }: DateCardsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("mx-auto w-full max-w-2xl", className)}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration,
        delay: 0.55,
        ease: MOTION.ease,
      }}
    >
      <time dateTime={dateIso} className="sr-only">
        {cards.map((card) => card.value).join(" · ")}
      </time>

      <ul
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
        aria-label="Wedding date, time, and venue"
      >
        {cards.map((card, index) => (
          <motion.li
            key={card.id}
            className={cn(
              "rounded-2xl border border-[#D4AF37]/35 bg-white/55 px-4 py-5 text-center",
              "shadow-[0_10px_36px_-18px_rgba(30,58,138,0.18)] backdrop-blur-md",
              "supports-[backdrop-filter]:bg-white/40",
            )}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: MOTION.duration,
              delay: 0.58 + index * MOTION.stagger,
              ease: MOTION.ease,
            }}
          >
            <p className="font-theme-label text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
              {card.label}
            </p>
            <p className="pk-card-value mt-2 font-theme-headline text-lg font-semibold text-[#1E3A8A] sm:text-xl">
              {card.value}
            </p>
            {card.subvalue ? (
              <p className="mt-1 font-theme-body text-xs text-[#475569] sm:text-sm">
                {card.subvalue}
              </p>
            ) : null}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
