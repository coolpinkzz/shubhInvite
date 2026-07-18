"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

import { BackgroundIcons } from "./BackgroundIcons";
import { BackgroundTransition } from "./BackgroundTransition";
import { BabyNameScratchCard } from "./BabyNameScratchCard";
import { Clouds } from "./Clouds";
import { CountdownBadge } from "./CountdownBadge";
import { CTAButtons } from "./CTAButtons";
import { FloralPetals } from "./FloralPetals";
import { FloatingStars } from "./FloatingStars";
import { GaneshaEmblem } from "./GaneshaEmblem";
import { HeroFloralDecor } from "./HeroFloralDecor";
import { HeroFlowerWreath } from "./HeroFlowerWreath";
import { HeroIllustration } from "./HeroIllustration";
import { ParentsNames } from "./ParentsNames";
import { ThemeFloralDivider } from "@/themes/shared/components";

const { colors, spacing, typography, animation } = babyRevealDesignTokens;

export interface BabyRevealProps {
  babyName: string;
  brand?: string;
  scratchCard?: {
    hint?: string;
    revealThreshold?: number;
  };
  parents?: {
    mother: string;
    father: string;
  };
  parentsOverline?: string;
  inviteLine?: string;
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
  brand = "Kuan Puja",
  scratchCard,
  parents,
  parentsOverline,
  inviteLine = "With the blessings of elders and family, we invite you to grace the",
  title = "Naming Ceremony",
  subtitle = "of our beloved son",
  revealMessage = "Your presence and blessings will add to the joy of this special day.",
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
      aria-label="Naming ceremony invitation"
    >
      <BackgroundTransition revealed={isNameRevealed} />
      <HeroFloralDecor />
      <BackgroundIcons className="pointer-events-none absolute inset-0 z-[2]" />
      <Clouds className="pointer-events-none absolute inset-0 z-[2]" />
      <FloatingStars
        count={8}
        className="pointer-events-none absolute inset-0 z-[2]"
      />
      <FloralPetals
        dense
        enhanced={isNameRevealed}
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
      />

      <div
        className="relative z-10 flex w-full max-w-md flex-col items-center"
        style={{ gap: spacing.sectionGap }}
      >
        <HeroFlowerWreath className="mt-10 sm:mt-12">
          <GaneshaEmblem />
        </HeroFlowerWreath>

        {/* <motion.p
          className="font-theme-body font-medium tracking-[0.28em] uppercase"
          style={{
            fontSize: typography.brand,
            color: colors.pastel.blueDeep,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {brand}
        </motion.p> */}

        {parents ? (
          <ParentsNames
            mother={parents.mother}
            father={parents.father}
            overline={parentsOverline}
          />
        ) : null}

        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.7,
            ease: animation.easing.luxury,
          }}
        >
          <motion.p
            className="mx-auto max-w-sm font-theme-body leading-relaxed"
            style={{
              fontSize: typography.body,
              color: colors.pastel.textMuted,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            {inviteLine}
          </motion.p>

          <motion.h1
            className="mt-3 font-theme-display font-light tracking-tight"
            style={{
              fontSize: typography.title,
              color: colors.pastel.text,
            }}
          >
            {title}
          </motion.h1>

          <ThemeFloralDivider size="sm" className="mx-auto mt-2 max-w-xs" />

          <motion.p
            className="mt-2 font-theme-body"
            style={{
              fontSize: typography.subtitle,
              color: colors.pastel.textMuted,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.header>

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
