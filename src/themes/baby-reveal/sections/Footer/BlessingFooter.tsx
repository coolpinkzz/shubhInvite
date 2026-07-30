"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ThemeFloralDivider } from "@/themes/shared/components";
import { FloralPetals } from "@/themes/baby-reveal/components/BabyReveal/FloralPetals";
import { babyRevealConfig } from "@/themes/baby-reveal/config";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors, animation } = babyRevealDesignTokens;

interface BlessingFooterProps {
  className?: string;
  overline?: string;
  title?: string;
  blessing?: string;
}

export function BlessingFooter({
  className,
  overline = "With Gratitude",
  title = "Thank You",
  blessing = "Your presence and blessings mean the world to us. We look forward to celebrating this precious day with you.",
}: BlessingFooterProps) {
  const reducedMotion = useReducedMotion();
  const { parents, revealDate, brand } = babyRevealConfig;

  return (
    <footer
      id="footer"
      className={cn(
        "relative overflow-hidden px-6 pb-24 pt-16 text-center sm:pb-28 sm:pt-20",
        className,
      )}
      style={{
        background:
          "linear-gradient(180deg, #F7FBFE 0%, #E8F4FC 48%, #D4E8F5 100%)",
      }}
      aria-label="Closing thank you"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(247,251,254,1) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <FloralPetals className="pointer-events-none absolute inset-0 overflow-hidden opacity-50" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-md flex-col items-center"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: animation.easing.luxury }}
      >
        <div className="relative mb-5 h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]">
          <Image
            src="/themes/baby-reveal/lordganeshBlue.png"
            alt=""
            fill
            sizes="72px"
            className="object-contain"
          />
        </div>

        <p
          className="font-theme-label text-[0.7rem] font-bold uppercase tracking-[0.24em]"
          style={{ color: colors.pastel.blueDeep }}
        >
          {overline}
        </p>

        <h2
          className="mt-3 font-theme-display text-5xl font-semibold leading-none sm:text-6xl"
          style={{ color: colors.pastel.text }}
        >
          {title}
        </h2>

        <ThemeFloralDivider size="sm" className="mx-auto mt-5 max-w-[220px]" />

        <p
          className="mt-5 max-w-sm font-theme-body text-base font-semibold leading-relaxed sm:text-[1.05rem]"
          style={{ color: colors.pastel.text }}
        >
          {blessing}
        </p>

        <p
          className="mt-8 font-theme-display text-3xl font-semibold leading-tight sm:text-4xl"
          style={{ color: colors.pastel.text }}
        >
          {parents.mother}{" "}
          <span
            className="mx-1 inline-block text-2xl sm:text-3xl"
            style={{ color: colors.pastel.blueDeep }}
          >
            &
          </span>{" "}
          {parents.father}
        </p>

        <p
          className="mt-3 font-theme-body text-sm font-bold uppercase tracking-[0.18em]"
          style={{ color: colors.pastel.blueDeep }}
        >
          for our little one
        </p>

        <p
          className="mt-5 font-theme-label text-[0.7rem] font-bold uppercase tracking-[0.18em]"
          style={{ color: colors.pastel.textMuted }}
        >
          {brand} · {revealDate}
        </p>
      </motion.div>
    </footer>
  );
}
