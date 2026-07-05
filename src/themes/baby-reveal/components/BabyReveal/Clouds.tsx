"use client";

import { motion } from "framer-motion";

import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors } = babyRevealDesignTokens;

interface CloudsProps {
  className?: string;
}

export function Clouds({ className }: CloudsProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 120 40"
        className="absolute left-[8%] top-[12%] h-8 w-20 opacity-40"
        animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="30" cy="28" rx="22" ry="12" fill={colors.neutral.warmWhite} />
        <ellipse cx="50" cy="22" rx="18" ry="14" fill={colors.neutral.warmWhite} />
        <ellipse cx="72" cy="28" rx="20" ry="11" fill={colors.neutral.warmWhite} />
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 35"
        className="absolute right-[10%] top-[18%] h-7 w-16 opacity-30"
        animate={{ x: [0, -6, 0], y: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <ellipse cx="25" cy="24" rx="18" ry="10" fill={colors.neutral.softBeige} />
        <ellipse cx="42" cy="19" rx="14" ry="11" fill={colors.neutral.softBeige} />
        <ellipse cx="58" cy="24" rx="16" ry="9" fill={colors.neutral.softBeige} />
      </motion.svg>
    </div>
  );
}
