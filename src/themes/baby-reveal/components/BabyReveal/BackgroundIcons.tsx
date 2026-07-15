"use client";

import { motion } from "framer-motion";

import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors } = babyRevealDesignTokens;

interface BackgroundIconsProps {
  className?: string;
}

function HeartIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={color}
        opacity={0.7}
      />
    </svg>
  );
}

function MiniBalloonIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 24 32" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="11" fill={color} opacity={0.75} />
      <path
        d="M12 22.5 Q10.5 26 12 29"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        opacity={0.55}
      />
      <ellipse cx="9" cy="8" rx="2.5" ry="3.5" fill="#FFFFFF" opacity={0.35} />
    </svg>
  );
}

function SparkleIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"
        fill={color}
        opacity={0.6}
      />
      <path
        d="M19 14l0.8 2.8L22.5 17.5l-2.7 0.7L19 21l-0.8-2.8L15.5 17.5l2.7-0.7L19 14z"
        fill={color}
        opacity={0.4}
      />
    </svg>
  );
}

function StarIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5l2.4 6.2 6.6.5-5 4.4 1.5 6.4L12 16.5 6.5 20l1.5-6.4-5-4.4 6.6-.5L12 2.5z"
        fill={color}
        opacity={0.65}
      />
    </svg>
  );
}

function CloudIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size * 1.4} height={size} viewBox="0 0 36 24" fill="none" aria-hidden="true">
      <path
        d="M10 18h16a6 6 0 0 0 0-12 7.5 7.5 0 0 0-14.2 2.2A5 5 0 0 0 10 18z"
        fill={color}
        opacity={0.45}
      />
    </svg>
  );
}

function LotusIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 26c-4-3-7-7-7-11 0-3 2-5 4-5 1.5 0 2.5 1 3 2.5C17.5 11 18.5 10 20 10c2 0 4 2 4 5 0 4-3 8-8 11z"
        stroke={color}
        strokeWidth="1.2"
        fill="none"
        opacity={0.7}
      />
      <path
        d="M16 24c-2.5-2-4.5-4.5-4.5-7.5 0-1.8 1.2-3 2.5-3 .9 0 1.6.7 2 1.6.4-.9 1.1-1.6 2-1.6 1.3 0 2.5 1.2 2.5 3 0 3-2 5.5-4.5 7.5z"
        stroke={color}
        strokeWidth="1"
        fill="none"
        opacity={0.45}
      />
    </svg>
  );
}

const ICONS = [
  { type: "heart" as const, top: "8%", left: "5%", size: 26, color: colors.pastel.blue, delay: 0 },
  { type: "balloon" as const, top: "6%", left: "18%", size: 22, color: colors.pastel.blueLight, delay: 0.4 },
  { type: "sparkle" as const, top: "10%", right: "8%", size: 20, color: colors.pastel.blueDeep, delay: 0.2 },
  { type: "balloon" as const, top: "5%", right: "22%", size: 18, color: colors.pastel.blue, delay: 0.9 },
  { type: "heart" as const, top: "16%", right: "5%", size: 20, color: colors.pastel.blueLight, delay: 1.1 },
  { type: "star" as const, top: "18%", left: "8%", size: 16, color: "#FFFFFF", delay: 0.6 },
  { type: "lotus" as const, top: "24%", left: "3%", size: 22, color: colors.pastel.blueDeep, delay: 0.7 },
  { type: "cloud" as const, top: "28%", right: "6%", size: 24, color: colors.pastel.blueSoft, delay: 1.3 },
  { type: "balloon" as const, top: "34%", left: "6%", size: 20, color: colors.pastel.blueDeep, delay: 0.5 },
  { type: "heart" as const, top: "38%", right: "4%", size: 18, color: colors.pastel.blue, delay: 1.5 },
  { type: "sparkle" as const, top: "44%", left: "4%", size: 16, color: colors.pastel.blueLight, delay: 0.8 },
  { type: "star" as const, top: "48%", right: "9%", size: 14, color: colors.pastel.blueDeep, delay: 1.7 },
  { type: "balloon" as const, top: "52%", left: "10%", size: 16, color: colors.pastel.blueLight, delay: 1.2 },
  { type: "heart" as const, bottom: "28%", left: "5%", size: 22, color: colors.pastel.blue, delay: 0.3 },
  { type: "cloud" as const, bottom: "24%", right: "8%", size: 26, color: "#FFFFFF", delay: 1 },
  { type: "balloon" as const, bottom: "18%", right: "4%", size: 24, color: colors.pastel.blueDeep, delay: 0.65 },
  { type: "sparkle" as const, bottom: "16%", left: "12%", size: 18, color: colors.pastel.blueLight, delay: 1.4 },
  { type: "heart" as const, bottom: "12%", right: "16%", size: 16, color: colors.pastel.blue, delay: 1.8 },
  { type: "star" as const, bottom: "10%", left: "24%", size: 14, color: "#FFFFFF", delay: 0.45 },
  { type: "lotus" as const, bottom: "20%", left: "3%", size: 20, color: colors.pastel.blueDeep, delay: 1.6 },
  { type: "balloon" as const, bottom: "8%", right: "28%", size: 18, color: colors.pastel.blueLight, delay: 0.95 },
  { type: "heart" as const, top: "60%", right: "12%", size: 14, color: colors.pastel.blueLight, delay: 2 },
] as const;

export function BackgroundIcons({ className }: BackgroundIconsProps) {
  return (
    <div className={className} aria-hidden="true">
      {ICONS.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: "top" in icon ? icon.top : undefined,
            bottom: "bottom" in icon ? icon.bottom : undefined,
            left: "left" in icon ? icon.left : undefined,
            right: "right" in icon ? icon.right : undefined,
          }}
          animate={{
            y: [0, icon.type === "balloon" ? -12 : -7, 0],
            opacity: [0.3, 0.7, 0.3],
            rotate:
              icon.type === "sparkle" || icon.type === "star"
                ? [0, 14, 0]
                : icon.type === "balloon"
                  ? [-3, 3, -3]
                  : [0, 5, 0],
          }}
          transition={{
            duration: 4.5 + index * 0.18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: icon.delay,
          }}
        >
          {icon.type === "heart" && <HeartIcon color={icon.color} size={icon.size} />}
          {icon.type === "balloon" && (
            <MiniBalloonIcon color={icon.color} size={icon.size} />
          )}
          {icon.type === "sparkle" && (
            <SparkleIcon color={icon.color} size={icon.size} />
          )}
          {icon.type === "star" && <StarIcon color={icon.color} size={icon.size} />}
          {icon.type === "cloud" && <CloudIcon color={icon.color} size={icon.size} />}
          {icon.type === "lotus" && <LotusIcon color={icon.color} size={icon.size} />}
        </motion.div>
      ))}
    </div>
  );
}
