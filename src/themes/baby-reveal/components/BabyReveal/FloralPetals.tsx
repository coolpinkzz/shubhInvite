"use client";

import { useEffect, useMemo, useState } from "react";

import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { petal: petalColors } = babyRevealDesignTokens;

const BASE_PETAL_COUNT = 14;
const CELEBRATION_PETAL_COUNT = 10;

interface Petal {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

function createPetal(
  id: number,
  viewportWidth: number,
  colors: readonly string[],
  options?: { faster?: boolean; brighter?: boolean },
): Petal {
  const faster = options?.faster ?? false;
  const brighter = options?.brighter ?? false;

  return {
    id,
    size: Math.random() * 9 + 7,
    left: Math.random() * viewportWidth,
    duration: faster ? Math.random() * 4 + 4 : Math.random() * 6 + 7,
    delay: Math.random() * (faster ? 2 : 5),
    opacity: brighter
      ? Math.random() * 0.35 + 0.45
      : Math.random() * 0.3 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
  };
}

interface FloralPetalsProps {
  /** Increases petal density during celebration. */
  enhanced?: boolean;
  className?: string;
}

export function FloralPetals({ enhanced = false, className }: FloralPetalsProps) {
  const reducedMotion = useReducedMotion();
  const [viewportWidth, setViewportWidth] = useState(390);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const petals = useMemo(() => {
    const base = Array.from({ length: BASE_PETAL_COUNT }, (_, index) =>
      createPetal(index, viewportWidth, petalColors),
    );

    if (!enhanced) return base;

    const celebration = Array.from({ length: CELEBRATION_PETAL_COUNT }, (_, index) =>
      createPetal(BASE_PETAL_COUNT + index, viewportWidth, petalColors, {
        faster: true,
        brighter: true,
      }),
    );

    return [...base, ...celebration];
  }, [enhanced, viewportWidth]);

  if (reducedMotion) return null;

  return (
    <div
      className={className}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal baby-reveal-petal"
          style={{
            width: petal.size,
            height: petal.size,
            left: petal.left,
            opacity: petal.opacity,
            backgroundColor: petal.color,
            animation: `baby-petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
