"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import itsABoyIllustration from "@/assests/itsaboy.png";
import itsAGirlIllustration from "@/assests/itsagirl.png";
import type { BabyGender } from "@/types/theme";
import { cn } from "@/lib/utils";
import {
  babyRevealDesignTokens,
  getRevealText,
} from "@/themes/baby-reveal/tokens";

const { colors, shadows, radius, spacing, typography, animation } =
  babyRevealDesignTokens;

interface RevealCardProps {
  gender: BabyGender;
  message: string;
  visible: boolean;
  className?: string;
}

export function RevealCard({
  gender,
  message,
  visible,
  className,
}: RevealCardProps) {
  const boyColors = babyRevealDesignTokens.colors.boy;
  const girlColors = babyRevealDesignTokens.colors.girl;
  const revealColor = gender === "boy" ? boyColors.navy : girlColors.roseGold;

  if (!visible) return null;

  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-2xs text-center", className)}
      style={{
        padding: spacing.cardPadding,
        borderRadius: radius.card,
        background: `linear-gradient(180deg, ${colors.pastel.cream} 0%, ${colors.pastel.pinkSoft} 100%)`,
        boxShadow: `${shadows.card}, ${shadows.cardBorder}`,
      }}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        ...animation.easing.bounce,
        delay: 0.2,
      }}
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.pastel.pink}, transparent)`,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto mb-3"
        style={{
          width: "clamp(120px, 35vw, 160px)",
          height: "clamp(120px, 35vw, 160px)",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...animation.easing.spring, delay: 0.5 }}
      >
        {gender === "boy" ? (
          <Image
            src={itsABoyIllustration}
            alt="It's a boy"
            fill
            className="object-contain"
            sizes="(max-width: 430px) 35vw, 160px"
          />
        ) : (
          <Image
            src={itsAGirlIllustration}
            alt="It's a girl"
            fill
            className="object-contain"
            sizes="(max-width: 430px) 35vw, 160px"
          />
        )}
      </motion.div>

      <motion.h2
        className="font-theme-display font-light tracking-tight"
        style={{
          fontSize: typography.reveal,
          color: revealColor,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.5,
          ease: animation.easing.luxury,
        }}
      >
        {getRevealText(gender)}
      </motion.h2>

      <motion.p
        className="mt-3 font-theme-body"
        style={{
          fontSize: typography.body,
          color: colors.pastel.textMuted,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {message}
      </motion.p>

      <motion.div
        className="mt-4 flex justify-center gap-3 opacity-40"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
      >
        <span>🌸</span>
        <span>✨</span>
        <span>🌸</span>
      </motion.div>
    </motion.div>
  );
}
