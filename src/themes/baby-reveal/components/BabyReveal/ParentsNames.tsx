"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors, typography, animation } = babyRevealDesignTokens;

interface ParentsNamesProps {
  mother: string;
  father: string;
  overline?: string;
  className?: string;
}

export function ParentsNames({
  mother,
  father,
  overline = "Proud Parents",
  className,
}: ParentsNamesProps) {
  return (
    <motion.div
      className={cn("text-center", className)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6, ease: animation.easing.luxury }}
    >
      <p
        className="font-theme-body font-medium tracking-[0.22em] uppercase"
        style={{
          fontSize: typography.instruction,
          color: colors.pastel.accent,
        }}
      >
        {overline}
      </p>

      <p
        className="mt-2 font-theme-display font-light tracking-tight"
        style={{
          fontSize: typography.title,
          color: colors.pastel.text,
        }}
      >
        {mother} & {father}
      </p>
    </motion.div>
  );
}
