"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import boyGirlTalkIllustration from "@/assests/boy-girl-talk.png";
import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { spacing, animation } = babyRevealDesignTokens;

interface HeroFooterIllustrationProps {
  className?: string;
}

export function HeroFooterIllustration({ className }: HeroFooterIllustrationProps) {
  return (
    <motion.div
      className={cn("relative mx-auto w-full", className)}
      style={{
        width: spacing.footerIllustrationWidth,
        height: spacing.footerIllustrationHeight,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: animation.easing.luxury }}
      aria-hidden="true"
    >
      <Image
        src={boyGirlTalkIllustration}
        alt=""
        fill
        className="object-contain object-center"
        sizes="(max-width: 430px) 80vw, 360px"
      />
    </motion.div>
  );
}
