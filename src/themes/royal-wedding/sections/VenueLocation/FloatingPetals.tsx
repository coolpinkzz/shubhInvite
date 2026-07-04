"use client";

import { useEffect, useState } from "react";

const PETAL_COLORS = ["#ffb3b5", "#ffdada", "#D4AF37", "#F7D9C4"] as const;
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

function createPetal(id: number, containerWidth: number): Petal {
  return {
    id,
    size: Math.random() * 8 + 6,
    left: Math.random() * containerWidth,
    duration: Math.random() * 8 + 12,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.3 + 0.15,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  };
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: PETAL_COUNT }, (_, i) => createPetal(i, 430)),
    );
  }, []);

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
