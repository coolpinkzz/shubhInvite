"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

import { BackgroundIcons } from "./BackgroundIcons";
import { BackgroundTransition } from "./BackgroundTransition";
import { BabyNameScratchCard } from "./BabyNameScratchCard";
import { CountdownBadge } from "./CountdownBadge";
import { CTAButtons } from "./CTAButtons";
import { FloralPetals } from "./FloralPetals";
import { HeroIllustration } from "./HeroIllustration";
import { ParentsNames } from "./ParentsNames";

const { colors, spacing, typography, animation } = babyRevealDesignTokens;

export interface BabyRevealProps {
  babyName: string;
  scratchCard?: {
    hint?: string;
    revealThreshold?: number;
  };
  parents?: {
    mother: string;
    father: string;
  };
  parentsOverline?: string;
  title?: string;
  subtitle?: string;
  revealMessage?: string;
  countdownTarget?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  onReveal?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function BabyRevealHero({
  babyName,
  scratchCard,
  parents,
  parentsOverline,
  title = "One Little Secret...",
  subtitle = "Our greatest blessing has finally arrived.",
  revealMessage = "Our hearts are overflowing with joy.",
  countdownTarget,
  ctaPrimary = "View Invitation",
  ctaSecondary = "Celebrate With Us",
  onReveal,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: BabyRevealProps) {
  const [isNameRevealed, setIsNameRevealed] = useState(false);

  const handleRevealed = () => {
    setIsNameRevealed(true);
    onReveal?.();
  };

  return (
    <section
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden",
        className,
      )}
      style={{ padding: spacing.heroPadding }}
      aria-label="Baby name reveal"
    >
      <BackgroundTransition revealed={isNameRevealed} />
      <BackgroundIcons className="pointer-events-none absolute inset-0" />
      <FloralPetals
        enhanced={isNameRevealed}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      <div
        className="relative z-10 flex w-full max-w-md flex-col items-center"
        style={{ gap: spacing.sectionGap }}
      >
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: animation.easing.luxury }}
        >
          <motion.h1
            className="font-theme-display font-light tracking-tight"
            style={{
              fontSize: typography.title,
              color: colors.pastel.text,
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-2 font-theme-body"
            style={{
              fontSize: typography.subtitle,
              color: colors.pastel.textMuted,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.header>

        {parents ? (
          <ParentsNames
            mother={parents.mother}
            father={parents.father}
            overline={parentsOverline}
          />
        ) : null}

        {!isNameRevealed ? <HeroIllustration visible /> : null}

        <BabyNameScratchCard
          babyName={babyName}
          hint={scratchCard?.hint}
          revealThreshold={scratchCard?.revealThreshold}
          onRevealed={handleRevealed}
        />

        {isNameRevealed ? (
          <motion.div
            className="flex w-full flex-col items-center text-center"
            style={{ gap: spacing.sectionGap }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: animation.easing.luxury }}
          >
            <p
              className="font-theme-body"
              style={{
                fontSize: typography.body,
                color: colors.pastel.textMuted,
              }}
            >
              {revealMessage}
            </p>

            {countdownTarget ? (
              <CountdownBadge targetDate={countdownTarget} />
            ) : null}

            <CTAButtons
              primaryLabel={ctaPrimary}
              secondaryLabel={ctaSecondary}
              visible
              onPrimaryClick={onPrimaryClick}
              onSecondaryClick={onSecondaryClick}
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
