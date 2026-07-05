"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/hooks/useTheme";

const PETAL_COUNT = 6;

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
  containerWidth: number,
  colors: readonly string[],
): Petal {
  return {
    id,
    size: Math.random() * 8 + 6,
    left: Math.random() * containerWidth,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.3 + 0.15,
    color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
  };
}

export function FloatingPetals() {
  const { tokens } = useTheme();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: PETAL_COUNT }, (_, index) =>
        createPetal(index, 430, tokens.colors.petal),
      ),
    );
  }, [tokens.colors.petal]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
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
            opacity: petal.opacity,
            backgroundColor: petal.color,
            animation: `rw-petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
