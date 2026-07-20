"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { COLORS } from "./constants";

const PETAL_COUNT = 22;

const PETAL_PALETTE = [
  "#E8C4B0",
  "#D4B49A",
  "#B88C6A",
  "#C8D4B8",
  "#F5E6DC",
  "#E8D5C4",
] as const;

interface Petal {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
  sway: number;
  kind: "flower" | "leaf" | "dot";
}

function createPetal(id: number, width: number): Petal {
  const kinds: Petal["kind"][] = ["flower", "leaf", "dot"];
  return {
    id,
    size: Math.random() * 10 + 8,
    left: Math.random() * width,
    duration: Math.random() * 8 + 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.28 + 0.18,
    color: PETAL_PALETTE[Math.floor(Math.random() * PETAL_PALETTE.length)]!,
    sway: Math.random() * 40 - 20,
    kind: kinds[id % 3]!,
  };
}

function FlowerSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <ellipse cx="10" cy="5.5" rx="3.5" ry="5.5" fill={color} />
      <ellipse
        cx="10"
        cy="5.5"
        rx="3.5"
        ry="5.5"
        fill={color}
        transform="rotate(72 10 10)"
      />
      <ellipse
        cx="10"
        cy="5.5"
        rx="3.5"
        ry="5.5"
        fill={color}
        transform="rotate(144 10 10)"
      />
      <ellipse
        cx="10"
        cy="5.5"
        rx="3.5"
        ry="5.5"
        fill={color}
        transform="rotate(216 10 10)"
      />
      <ellipse
        cx="10"
        cy="5.5"
        rx="3.5"
        ry="5.5"
        fill={color}
        transform="rotate(288 10 10)"
      />
      <circle cx="10" cy="10" r="2.2" fill="#FFF8F2" opacity={0.55} />
    </svg>
  );
}

function LeafSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 16 22" fill="none" aria-hidden>
      <ellipse cx="8" cy="11" rx="5" ry="10" fill={color} />
      <path
        d="M8 2.5v17"
        stroke={COLORS.accent}
        strokeWidth="0.6"
        opacity={0.35}
      />
    </svg>
  );
}

interface FloatingPetalsProps {
  className?: string;
}

/** Soft falling florals — CSS-driven for smooth infinite loops. */
export function FloatingPetals({ className }: FloatingPetalsProps) {
  const reducedMotion = useReducedMotion();
  const [width, setWidth] = useState(390);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const petals = useMemo(
    () => Array.from({ length: PETAL_COUNT }, (_, i) => createPetal(i, width)),
    [width],
  );

  if (reducedMotion) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[6] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="cw-petal absolute top-[-40px]"
          style={{
            left: petal.left,
            opacity: petal.opacity,
            ["--cw-sway" as string]: `${petal.sway}px`,
            animation: `cw-petal-fall ${petal.duration}s linear ${petal.delay}s infinite`,
          }}
        >
          {petal.kind === "flower" ? (
            <FlowerSvg size={petal.size + 4} color={petal.color} />
          ) : petal.kind === "leaf" ? (
            <LeafSvg size={petal.size} color={petal.color} />
          ) : (
            <span
              className="block rounded-full"
              style={{
                width: petal.size * 0.7,
                height: petal.size * 0.7,
                backgroundColor: petal.color,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
