"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const ORBS = [
  { left: "8%", color: "#E0112B", delay: "0s", scale: 1 },
  { left: "22%", color: "#1B4FD8", delay: "0.6s", scale: 0.75 },
  { left: "74%", color: "#1B4FD8", delay: "0.3s", scale: 0.85 },
  { left: "88%", color: "#E0112B", delay: "1s", scale: 0.95 },
] as const;

interface FloatingBalloonsProps {
  className?: string;
}

/** Soft red/blue orbs with thin dangling web strands — comic atmosphere */
export function FloatingBalloons({ className }: FloatingBalloonsProps) {
  const { tokens } = useTheme();

  return (
    <div
      className={cn("pointer-events-none absolute inset-x-0 top-4 h-44", className)}
      aria-hidden="true"
    >
      {ORBS.map((orb) => (
        <div
          key={orb.left}
          className="birthday-balloon absolute top-0 flex flex-col items-center"
          style={{
            left: orb.left,
            animationDelay: orb.delay,
            transform: `scale(${orb.scale})`,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" fill={orb.color} opacity="0.8" />
            <circle cx="10" cy="10" r="4" fill="white" opacity="0.25" />
          </svg>
          <svg width="2" height="40" viewBox="0 0 2 40" className="mt-0.5">
            <path
              d="M1 0 C0 12 2 20 1 40"
              stroke={tokens.colors.primaryForeground}
              strokeOpacity="0.35"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
