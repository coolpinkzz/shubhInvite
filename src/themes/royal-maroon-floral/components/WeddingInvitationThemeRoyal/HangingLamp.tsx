import { useId } from "react";

import { cn } from "@/lib/utils";

export type HangingLampSize = "sm" | "lg";

export interface HangingLampProps {
  size?: HangingLampSize;
  delay?: number;
  className?: string;
}

const sizeMap: Record<HangingLampSize, { height: number; chain: number }> = {
  sm: { height: 36, chain: 10 },
  lg: { height: 48, chain: 14 },
};

/**
 * Placeholder hanging lamp — swap SVG for ornate lantern artwork later.
 */
export function HangingLamp({
  size = "lg",
  delay = 0,
  className,
}: HangingLampProps) {
  const gradientId = useId();
  const glowId = useId();
  const { height, chain } = sizeMap[size];
  const width = Math.round(height * 0.52);

  return (
    <div
      className={cn("rmf-lamp-float rmf-lamp-glow flex flex-col items-center", className)}
      style={{ animationDelay: `${delay}s`, width }}
      aria-hidden="true"
    >
      <div
        className="w-px bg-gradient-to-b from-[var(--theme-accent)]/40 to-[var(--theme-accent-light)]"
        style={{ height: chain }}
      />
      <svg
        width={width}
        height={height}
        viewBox="0 0 48 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gradientId} x1="24" y1="18" x2="24" y2="58">
            <stop stopColor="#F4D27A" />
            <stop offset="0.45" stopColor="#D9B25F" />
            <stop offset="1" stopColor="#A67C2E" />
          </linearGradient>
          <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FFF3C4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F4D27A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft inner light — contained to lantern body, not a CSS halo */}
        <ellipse
          cx="24"
          cy="38"
          rx="9"
          ry="14"
          fill={`url(#${glowId})`}
          opacity="0.7"
        />

        {/* Chain hook */}
        <path
          d="M24 4V16"
          stroke="#C89B3C"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="24" cy="4" r="1.5" fill="#D9B25F" />

        {/* Ornate cap */}
        <path
          d="M10 16H38L34 22H14L10 16Z"
          fill="#B8892E"
          stroke="#F4D27A"
          strokeWidth="0.5"
        />
        <path
          d="M14 22H34L32 26H16L14 22Z"
          fill="#C89B3C"
          stroke="#F4D27A"
          strokeWidth="0.4"
        />

        {/* Lantern body — traditional dome */}
        <path
          d="M14 26C14 26 11 54 24 58C37 54 34 26 34 26H14Z"
          fill={`url(#${gradientId})`}
          stroke="#F4D27A"
          strokeWidth="0.75"
        />

        {/* Vertical ribs */}
        <path
          d="M24 28V56"
          stroke="#F4D27A"
          strokeWidth="0.4"
          opacity="0.45"
        />
        <path
          d="M18 30C18 42 19 52 24 56"
          stroke="#F4D27A"
          strokeWidth="0.35"
          opacity="0.3"
        />
        <path
          d="M30 30C30 42 29 52 24 56"
          stroke="#F4D27A"
          strokeWidth="0.35"
          opacity="0.3"
        />

        {/* Base fringe */}
        <path
          d="M16 56C18 59 21 60 24 60C27 60 30 59 32 56"
          stroke="#D9B25F"
          strokeWidth="0.75"
          fill="none"
        />
        <ellipse cx="24" cy="58" rx="11" ry="2.5" fill="#A67C2E" opacity="0.85" />
      </svg>
    </div>
  );
}
