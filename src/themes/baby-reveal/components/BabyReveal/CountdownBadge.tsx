"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors, radius, typography } = babyRevealDesignTokens;

interface CountdownBadgeProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownBadge({ targetDate, className }: CountdownBadgeProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calculateTimeLeft(targetDate),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 border px-4 py-2",
        className,
      )}
      style={{
        borderRadius: radius.badge,
        borderColor: `${colors.pastel.pink}60`,
        backgroundColor: `${colors.pastel.cream}CC`,
        fontSize: typography.instruction,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: babyRevealDesignTokens.animation.easing.luxury }}
    >
      <span className="font-medium tracking-wide" style={{ color: colors.pastel.blueDeep }}>
        {timeLeft.days}d
      </span>
      <span style={{ color: colors.pastel.textMuted }}>·</span>
      <span style={{ color: colors.pastel.textMuted }}>
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </motion.div>
  );
}
