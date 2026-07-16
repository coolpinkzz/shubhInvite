"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { spacing, animation } = babyRevealDesignTokens;

interface GaneshaEmblemProps {
  className?: string;
}

export function GaneshaEmblem({ className }: GaneshaEmblemProps) {
  return (
    <motion.div
      className={cn("relative mx-auto", className)}
      style={{
        width: spacing.ganeshaSize,
        height: spacing.ganeshaSize,
      }}
      initial={{ opacity: 0, y: -8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: animation.easing.luxury }}
    >
      <Image
        src="/themes/baby-reveal/lordganeshBlue.png"
        alt=""
        fill
        className="object-contain object-center mix-blend-screen"
        sizes="100px"
        priority
        aria-hidden="true"
      />
    </motion.div>
  );
}
