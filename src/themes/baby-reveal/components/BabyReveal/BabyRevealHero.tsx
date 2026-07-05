"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import type { BabyGender } from "@/types/theme";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";
import { useRevealSound } from "@/themes/baby-reveal/hooks/useRevealSound";
import { useRevealState } from "@/themes/baby-reveal/hooks/useRevealState";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

import { BackgroundIcons } from "./BackgroundIcons";
import { BackgroundTransition } from "./BackgroundTransition";
import { BalloonParticles } from "./BalloonParticles";
import { Celebration } from "./Celebration";
import { CountdownBadge } from "./CountdownBadge";
import { CTAButtons } from "./CTAButtons";
import { FloralPetals } from "./FloralPetals";
import { FloatingBalloon } from "./FloatingBalloon";
import { HeroFooterIllustration } from "./HeroFooterIllustration";
import { HeroIllustration } from "./HeroIllustration";
import { ParentsNames } from "./ParentsNames";
import { RevealCard } from "./RevealCard";

const { colors, spacing, typography, animation } = babyRevealDesignTokens;

export interface BabyRevealProps {
  gender: BabyGender;
  parents?: {
    mother: string;
    father: string;
  };
  parentsOverline?: string;
  title?: string;
  subtitle?: string;
  instruction?: string;
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
  gender,
  parents,
  parentsOverline,
  title = "One Little Secret...",
  subtitle = "Our greatest adventure is about to begin.",
  instruction = "Tap the balloon to reveal",
  revealMessage = "Our hearts are overflowing with joy.",
  countdownTarget,
  ctaPrimary = "View Invitation",
  ctaSecondary = "Celebrate With Us",
  onReveal,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: BabyRevealProps) {
  const reducedMotion = useReducedMotion();
  const { play } = useRevealSound({ enabled: false });

  const {
    phase,
    isInteracting,
    isRevealed,
    showBalloon,
    showRevealCard,
    startReveal,
  } = useRevealState({ onReveal, reducedMotion });

  const handleTap = () => {
    if (isInteracting) return;
    play("inflate");
    startReveal();
  };

  useEffect(() => {
    if (phase === "pop") {
      play("pop");
    }
    if (phase === "celebrate") {
      play("cheer");
    }
  }, [phase, play]);

  const showIdleIllustration = !isInteracting && phase === "idle";
  const showActiveCelebration = phase === "celebrate";

  return (
    <section
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden",
        className,
      )}
      style={{ padding: spacing.heroPadding }}
      aria-label="Baby gender reveal"
    >
      <BackgroundTransition gender={gender} revealed={isRevealed} />
      <BackgroundIcons className="pointer-events-none absolute inset-0" />
      <FloralPetals
        enhanced={showActiveCelebration}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      />

      <BalloonParticles active={phase === "pop"} />
      <Celebration active={showActiveCelebration} gender={gender} />

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

        {countdownTarget && !isRevealed && (
          <CountdownBadge targetDate={countdownTarget} />
        )}

        {showIdleIllustration ? <HeroIllustration visible /> : null}

        {showBalloon ? (
          <div className="relative flex min-h-[180px] items-center justify-center">
            <FloatingBalloon
              phase={phase}
              onTap={handleTap}
              disabled={isInteracting}
            />
          </div>
        ) : null}

        {!isRevealed && (
          <motion.p
            className="text-center font-medium tracking-widest uppercase"
            style={{
              fontSize: typography.instruction,
              color: colors.pastel.accent,
              letterSpacing: "0.15em",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {instruction}
          </motion.p>
        )}

        <RevealCard
          gender={gender}
          message={revealMessage}
          visible={showRevealCard}
        />

        <CTAButtons
          gender={gender}
          primaryLabel={ctaPrimary}
          secondaryLabel={ctaSecondary}
          visible={isRevealed}
          onPrimaryClick={onPrimaryClick}
          onSecondaryClick={onSecondaryClick}
        />

        {/* <HeroFooterIllustration className="mt-2" /> */}
      </div>
    </section>
  );
}
