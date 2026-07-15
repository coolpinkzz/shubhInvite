"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { spacing, animation } = babyRevealDesignTokens;

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
      <div className="relative h-full w-full">
        <Image
          src="/themes/baby-reveal/boynamingceremony.png"
          alt="Baby boy in a festive cradle for the naming ceremony"
          fill
          className="object-contain object-center mix-blend-screen"
          sizes="(max-width: 430px) 70vw, 340px"
          priority
        />
      </div>
    </motion.div>
  );
}
