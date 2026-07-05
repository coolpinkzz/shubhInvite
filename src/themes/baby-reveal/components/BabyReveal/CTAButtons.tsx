"use client";

import { motion } from "framer-motion";

import type { BabyGender } from "@/types/theme";
import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors, radius, typography, animation } = babyRevealDesignTokens;

interface CTAButtonsProps {
  gender: BabyGender;
  primaryLabel: string;
  secondaryLabel: string;
  visible: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function CTAButtons({
  gender,
  primaryLabel,
  secondaryLabel,
  visible,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: CTAButtonsProps) {
  if (!visible) return null;

  const boyColors = babyRevealDesignTokens.colors.boy;
  const girlColors = babyRevealDesignTokens.colors.girl;

  const primaryGradient =
    gender === "boy"
      ? `linear-gradient(135deg, ${boyColors.navy} 0%, ${boyColors.skyBlue} 100%)`
      : `linear-gradient(135deg, ${girlColors.roseGold} 0%, ${girlColors.blushPink} 100%)`;

  return (
    <motion.div
      className={cn("flex w-full max-w-sm flex-col gap-3 sm:flex-row", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: animation.easing.luxury }}
    >
      <motion.button
        type="button"
        onClick={onPrimaryClick}
        className="min-h-12 flex-1 px-6 py-3 font-medium tracking-wide text-white transition-transform active:scale-[0.98]"
        style={{
          borderRadius: radius.button,
          background: primaryGradient,
          fontSize: typography.instruction,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {primaryLabel}
      </motion.button>

      <motion.button
        type="button"
        onClick={onSecondaryClick}
        className="min-h-12 flex-1 border-2 px-6 py-3 font-medium tracking-wide transition-transform active:scale-[0.98]"
        style={{
          borderRadius: radius.button,
          borderColor: colors.pastel.pink,
          color: colors.pastel.text,
          backgroundColor: `${colors.pastel.cream}CC`,
          fontSize: typography.instruction,
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {secondaryLabel}
      </motion.button>
    </motion.div>
  );
}
