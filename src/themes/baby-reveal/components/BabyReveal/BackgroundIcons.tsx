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
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
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

function MiniBalloonIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 24 30" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="11" fill={color} opacity={0.7} />
      <path d="M12 23 Q10 26 12 28" stroke={color} strokeWidth="1" fill="none" opacity={0.5} />
    </svg>
  );
}

function QuestionBubble({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="28" height="22" rx="6" stroke={color} strokeWidth="1.2" fill="white" fillOpacity="0.5" />
      <text x="16" y="20" textAnchor="middle" fill={color} fontSize="14" fontWeight="500">?</text>
    </svg>
  );
}

const ICONS = [
  { type: "heart" as const, top: "12%", left: "6%", size: 28, color: colors.pastel.pink, delay: 0 },
  { type: "heart" as const, top: "22%", left: "10%", size: 18, color: colors.pastel.pinkLight, delay: 0.8 },
  { type: "sparkle" as const, top: "10%", right: "8%", size: 22, color: colors.pastel.blueLight, delay: 0.3 },
  { type: "sparkle" as const, top: "20%", right: "12%", size: 16, color: "#FFFFFF", delay: 1.2 },
  { type: "balloon" as const, top: "8%", left: "42%", size: 20, color: colors.pastel.blue, delay: 0.5 },
  { type: "balloon" as const, top: "6%", right: "28%", size: 16, color: colors.pastel.pink, delay: 1 },
  { type: "question" as const, top: "32%", left: "4%", size: 24, color: colors.pastel.blueDeep, delay: 0.6 },
  { type: "question" as const, top: "30%", right: "5%", size: 20, color: colors.pastel.pink, delay: 1.4 },
  { type: "heart" as const, bottom: "18%", left: "8%", size: 20, color: colors.pastel.pinkLight, delay: 0.4 },
  { type: "sparkle" as const, bottom: "22%", right: "10%", size: 18, color: colors.pastel.blueLight, delay: 0.9 },
  { type: "balloon" as const, bottom: "14%", right: "6%", size: 18, color: colors.pastel.blue, delay: 1.6 },
  { type: "sparkle" as const, bottom: "12%", left: "14%", size: 14, color: "#FFFFFF", delay: 1.1 },
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
            y: [0, -8, 0],
            opacity: [0.35, 0.65, 0.35],
            rotate: icon.type === "sparkle" ? [0, 15, 0] : [0, 5, 0],
          }}
          transition={{
            duration: 4 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: icon.delay,
          }}
        >
          {icon.type === "heart" && <HeartIcon color={icon.color} size={icon.size} />}
          {icon.type === "sparkle" && <SparkleIcon color={icon.color} size={icon.size} />}
          {icon.type === "balloon" && <MiniBalloonIcon color={icon.color} size={icon.size} />}
          {icon.type === "question" && <QuestionBubble color={icon.color} size={icon.size} />}
        </motion.div>
      ))}
    </div>
  );
}
