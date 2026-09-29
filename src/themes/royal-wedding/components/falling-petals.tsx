"use client";

import { useEffect, useState, type CSSProperties } from "react";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export interface PetalFallOptions {
  count: number;
  minSize: number;
  maxSize: number;
  minDuration: number;
  maxDuration: number;
  maxDelay: number;
  /** Opacity while falling. The `rw-petal-fall` keyframes fade to half of this near the bottom. */
  peakOpacity: number;
  /** Adds a soft drop shadow so petals separate from mid-tone backgrounds. */
  shadow?: boolean;
}

interface Petal {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
}

interface FallingPetalsProps {
  options: PetalFallOptions;
  /** Horizontal spread in px, read on mount. */
  getSpreadWidth: () => number;
  className?: string;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type PetalMotion = Pick<
  PetalFallOptions,
  "minSize" | "maxSize" | "minDuration" | "maxDuration" | "maxDelay"
>;

function createPetal(
  id: number,
  spreadWidth: number,
  colors: readonly string[],
  motion: PetalMotion,
): Petal {
  return {
    id,
    size: randomBetween(motion.minSize, motion.maxSize),
    left: Math.random() * spreadWidth,
    duration: randomBetween(motion.minDuration, motion.maxDuration),
    delay: Math.random() * motion.maxDelay,
    color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
  };
}

export function FallingPetals({
  options,
  getSpreadWidth,
  className,
}: FallingPetalsProps) {
  const { tokens } = useTheme();
  const [petals, setPetals] = useState<Petal[]>([]);
  const { count, minSize, maxSize, minDuration, maxDuration, maxDelay } =
    options;

  useEffect(() => {
    const spreadWidth = getSpreadWidth();
    const motion = { minSize, maxSize, minDuration, maxDuration, maxDelay };

    setPetals(
      Array.from({ length: count }, (_, index) =>
        createPetal(index, spreadWidth, tokens.colors.petal, motion),
      ),
    );
    // getSpreadWidth is read once on mount by design.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    tokens.colors.petal,
    count,
    minSize,
    maxSize,
    minDuration,
    maxDuration,
    maxDelay,
  ]);

  const petalVars = {
    "--petal-peak-opacity": options.peakOpacity,
    "--petal-tail-opacity": options.peakOpacity / 2,
  } as CSSProperties;

  return (
    <div
      className={cn("pointer-events-none inset-0 overflow-hidden", className)}
      style={petalVars}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            width: petal.size,
            height: petal.size,
            left: petal.left,
            backgroundColor: petal.color,
            boxShadow: options.shadow
              ? "0 2px 6px rgba(0, 0, 0, 0.25)"
              : undefined,
            animation: `rw-petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
