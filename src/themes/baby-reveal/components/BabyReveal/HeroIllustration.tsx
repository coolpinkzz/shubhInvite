"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { spacing, animation, colors } = babyRevealDesignTokens;

const ORBITING_FLOWERS = [
  { top: "4%", left: "8%", size: 28, delay: 0 },
  { top: "10%", right: "6%", size: 22, delay: 0.4 },
  { bottom: "12%", left: "4%", size: 24, delay: 0.8 },
  { bottom: "8%", right: "10%", size: 20, delay: 1.2 },
  { top: "42%", left: "-2%", size: 18, delay: 0.6 },
  { top: "38%", right: "-1%", size: 16, delay: 1 },
] as const;

function MiniFlower({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="7" rx="4" ry="6.5" fill={colors.pastel.blueLight} opacity={0.8} />
      <ellipse
        cx="7.5"
        cy="11"
        rx="4"
        ry="6.5"
        fill={colors.pastel.blueSoft}
        opacity={0.7}
        transform="rotate(-72 12 12)"
      />
      <ellipse
        cx="16.5"
        cy="11"
        rx="4"
        ry="6.5"
        fill={colors.pastel.blueSoft}
        opacity={0.7}
        transform="rotate(72 12 12)"
      />
      <circle cx="12" cy="12" r="3" fill={colors.pastel.blueDeep} opacity={0.75} />
    </svg>
  );
}

interface HeroIllustrationProps {
  visible: boolean;
  className?: string;
}

export function HeroIllustration({ visible, className }: HeroIllustrationProps) {
  const reducedMotion = useReducedMotion();

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
      {ORBITING_FLOWERS.map((flower, index) => (
        <motion.div
          key={index}
          className="pointer-events-none absolute"
          style={{
            top: "top" in flower ? flower.top : undefined,
            bottom: "bottom" in flower ? flower.bottom : undefined,
            left: "left" in flower ? flower.left : undefined,
            right: "right" in flower ? flower.right : undefined,
          }}
          animate={
            reducedMotion || !visible
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotate: [-4, 4, -4],
                  scale: [1, 1.06, 1],
                }
          }
          transition={{
            duration: 4 + index * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: flower.delay,
          }}
        >
          <MiniFlower size={flower.size} />
        </motion.div>
      ))}

      <div
        className="pointer-events-none absolute inset-[8%] rounded-full opacity-40"
        style={{
          background: `radial-gradient(circle, ${colors.pastel.blueLight} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

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
