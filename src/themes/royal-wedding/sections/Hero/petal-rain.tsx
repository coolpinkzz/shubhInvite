"use client";

import { useEffect, useState } from "react";

import { useTheme } from "@/hooks/useTheme";

const PETAL_COUNT = 15;

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
): Petal {
  return {
    id,
    size: Math.random() * 10 + 8,
    left: Math.random() * viewportWidth,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)] ?? colors[0],
  };
}

export function PetalRain() {
  const { tokens } = useTheme();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    setPetals(
      Array.from({ length: PETAL_COUNT }, (_, index) =>
        createPetal(index, width, tokens.colors.petal),
      ),
    );
  }, [tokens.colors.petal]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
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
