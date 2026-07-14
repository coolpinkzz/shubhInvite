"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
  delay: `${(i % 7) * 0.45}s`,
  duration: `${7 + (i % 5)}s`,
  size: 6 + (i % 4) * 2,
  colorIndex: i % 5,
  rotate: i % 2 === 0 ? "0deg" : "25deg",
}));

interface ConfettiRainProps {
  className?: string;
  enhanced?: boolean;
}

export function ConfettiRain({ className, enhanced = false }: ConfettiRainProps) {
  const { tokens } = useTheme();
  const palette = tokens.colors.petal;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {CONFETTI.map((piece) => (
        <span
          key={piece.id}
          className="birthday-confetti"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.size * (piece.id % 3 === 0 ? 0.45 : 1.4),
            borderRadius: piece.id % 3 === 0 ? "9999px" : "2px",
            backgroundColor: palette[piece.colorIndex] ?? tokens.colors.accent,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            opacity: enhanced ? 0.9 : 0.55,
            transform: `rotate(${piece.rotate})`,
          }}
        />
      ))}
    </div>
  );
}
