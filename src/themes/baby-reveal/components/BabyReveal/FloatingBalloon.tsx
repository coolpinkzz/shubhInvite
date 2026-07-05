"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";
import type { RevealPhase } from "@/themes/baby-reveal/hooks/useRevealState";

import { BalloonString } from "./BalloonString";

const { colors, shadows, spacing, animation } = babyRevealDesignTokens;

interface FloatingBalloonProps {
  phase: RevealPhase;
  onTap: () => void;
  disabled: boolean;
  className?: string;
}

function getBalloonScale(phase: RevealPhase): number {
  switch (phase) {
    case "inflate":
      return 1.15;
    case "stretch":
      return 1.05;
    default:
      return 1;
  }
}

function getBalloonSquash(phase: RevealPhase): { scaleX: number; scaleY: number } {
  if (phase === "stretch") return { scaleX: 1.15, scaleY: 0.88 };
  if (phase === "shake") return { scaleX: 1.02, scaleY: 0.98 };
  return { scaleX: 1, scaleY: 1 };
}

export function FloatingBalloon({
  phase,
  onTap,
  disabled,
  className,
}: FloatingBalloonProps) {
  const isShaking = phase === "shake";
  const squash = getBalloonSquash(phase);
  const scale = getBalloonScale(phase);

  return (
    <div className={cn("relative flex flex-col items-center pb-12", className)}>
      <motion.button
        type="button"
        onClick={onTap}
        disabled={disabled}
        aria-label="Tap the balloon to reveal the baby's gender"
        className="relative cursor-pointer overflow-visible border-none bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-default"
        style={{
          width: spacing.balloonSize,
          height: spacing.balloonSize,
          minWidth: spacing.touchTarget,
          minHeight: spacing.touchTarget,
          outlineColor: colors.neutral.gold,
        }}
        animate={
          isShaking
            ? { x: [-4, 4, -4, 4, 0], y: [0, -2, 0, -2, 0] }
            : phase === "idle"
              ? { y: [0, -12, 0], rotate: [-2, 2, -2] }
              : { y: 0, rotate: 0, scale }
        }
        transition={
          isShaking
            ? { duration: 0.12, repeat: 5, ease: "easeInOut" }
            : phase === "idle"
              ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 300, damping: 12 }
        }
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ scaleX: squash.scaleX, scaleY: squash.scaleY }}
          transition={{ duration: animation.duration.stretch, ease: animation.easing.luxury }}
        >
          <svg
            viewBox="0 0 200 228"
            className="h-full w-full drop-shadow-lg"
            style={{ filter: `drop-shadow(${shadows.balloon})` }}
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="balloonGradient" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor={colors.pastel.cream} />
                <stop offset="35%" stopColor={colors.pastel.pinkLight} />
                <stop offset="70%" stopColor={colors.pastel.blueLight} />
                <stop offset="100%" stopColor={colors.pastel.blue} />
              </radialGradient>
              <radialGradient id="balloonShine" cx="30%" cy="25%" r="30%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
              <filter id="balloonGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse
              cx="100"
              cy="110"
              rx="75"
              ry="90"
              fill="url(#balloonGradient)"
              filter="url(#balloonGlow)"
            />
            <ellipse
              cx="75"
              cy="80"
              rx="25"
              ry="35"
              fill="url(#balloonShine)"
            />
            <path
              d="M100 200 Q95 215 100 225 Q105 215 100 200"
              fill={colors.pastel.accent}
            />
          </svg>
        </motion.div>

        {(phase === "shake" || phase === "inflate") && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-hidden="true"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.span
                key={index}
                className="absolute text-sm"
                style={{
                  left: `${20 + index * 12}%`,
                  top: `${10 + (index % 3) * 15}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                  y: [-10, -30],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: index * 0.15,
                }}
              >
                ✨
              </motion.span>
            ))}
          </motion.div>
        )}

        <BalloonString phase={phase} />
      </motion.button>

      <motion.div
        className="absolute bottom-1 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full opacity-20"
        style={{ backgroundColor: colors.neutral.text }}
        animate={
          phase === "idle"
            ? { scaleX: [1, 0.85, 1], opacity: [0.15, 0.25, 0.15] }
            : { scaleX: 0.5, opacity: 0 }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </div>
  );
}
