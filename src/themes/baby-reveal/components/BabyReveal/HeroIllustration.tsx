"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import boyOrGirlIllustration from "@/assests/boyorgirl.png";
import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { spacing, shadows, animation } = babyRevealDesignTokens;

interface HeroIllustrationProps {
  visible: boolean;
  className?: string;
}

export function HeroIllustration({ visible, className }: HeroIllustrationProps) {
  return (
    <motion.div
      className={cn("relative mx-auto", className)}
      style={{
        width: spacing.illustrationSize,
        height: spacing.illustrationSize,
      }}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={
        visible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: -20, scale: 0.9 }
      }
      transition={{ duration: 0.7, ease: animation.easing.luxury }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl"
        style={{ boxShadow: shadows.illustration }}
      >
        <Image
          src={boyOrGirlIllustration}
          alt="Expectant couple at a gender reveal celebration"
          fill
          className="object-cover object-center"
          sizes="(max-width: 430px) 65vw, 320px"
          priority
        />
      </div>
    </motion.div>
  );
}
