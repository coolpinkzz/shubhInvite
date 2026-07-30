"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { MOTION } from "./constants";
import type { HeroButtonsProps } from "./types";

export function HeroButtons({
  rsvpLabel,
  viewInvitationLabel,
  rsvpHref = "#rsvp",
  viewHref = "#events",
  className,
}: HeroButtonsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "mt-8 flex w-full flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4",
        className,
      )}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration,
        delay: 0.72,
        ease: MOTION.ease,
      }}
    >
      <a
        href={rsvpHref}
        className={cn(
          "inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-full px-8 py-3",
          "bg-[#1E3A8A] font-theme-label text-sm font-semibold uppercase tracking-[0.18em] text-[#FFFDF8]",
          "shadow-[0_8px_28px_-8px_rgba(30,58,138,0.45)]",
          "transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#1E293B]",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]",
          "sm:w-auto",
        )}
      >
        {rsvpLabel}
      </a>

      <a
        href={viewHref}
        className={cn(
          "inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-full px-8 py-3",
          "border border-[#D4AF37]/70 bg-transparent font-theme-label text-sm font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]",
          "transition-colors duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37]/15",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E3A8A]",
          "sm:w-auto",
        )}
      >
        {viewInvitationLabel}
      </a>
    </motion.div>
  );
}
