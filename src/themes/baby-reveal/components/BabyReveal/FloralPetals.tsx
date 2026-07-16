"use client";

import { useEffect, useMemo, useState } from "react";

import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { petal: petalColors } = babyRevealDesignTokens;

const BASE_PETAL_COUNT = 32;
const CELEBRATION_PETAL_COUNT = 18;

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
  /** Hero uses a richer baseline petal shower. */
  dense?: boolean;
  className?: string;
}

function FlowerPetalSvg({
  size,
  color,
  opacity,
}: {
  size: number;
  color: string;
  opacity: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <ellipse cx="10" cy="6" rx="4" ry="6.5" fill={color} />
      <ellipse
        cx="6"
        cy="10"
        rx="4"
        ry="6.5"
        fill={color}
        transform="rotate(-72 10 10)"
      />
      <ellipse
        cx="14"
        cy="10"
        rx="4"
        ry="6.5"
        fill={color}
        transform="rotate(72 10 10)"
      />
      <circle cx="10" cy="10" r="2.5" fill="#FFFFFF" opacity={0.35} />
    </svg>
  );
}

export function FloralPetals({
  enhanced = false,
  dense = false,
  className,
}: FloralPetalsProps) {
  const reducedMotion = useReducedMotion();
  const [viewportWidth, setViewportWidth] = useState(390);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const petals = useMemo(() => {
    const baseCount = dense ? BASE_PETAL_COUNT : Math.floor(BASE_PETAL_COUNT * 0.55);
    const base = Array.from({ length: baseCount }, (_, index) =>
      createPetal(index, viewportWidth, petalColors),
    );

    if (!enhanced) return base;

    const celebration = Array.from({ length: CELEBRATION_PETAL_COUNT }, (_, index) =>
      createPetal(baseCount + index, viewportWidth, petalColors, {
        faster: true,
        brighter: true,
      }),
    );

    return [...base, ...celebration];
  }, [dense, enhanced, viewportWidth]);

  if (reducedMotion) return null;

  return (
    <div
      className={className}
      aria-hidden="true"
    >
      {petals.map((petal) =>
        petal.id % 4 === 0 ? (
          <div
            key={petal.id}
            className="baby-reveal-flower-petal absolute"
            style={{
              left: petal.left,
              animation: `baby-petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
            }}
          >
            <FlowerPetalSvg
              size={petal.size + 4}
              color={petal.color}
              opacity={petal.opacity}
            />
          </div>
        ) : (
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
        ),
      )}
    </div>
  );
}
