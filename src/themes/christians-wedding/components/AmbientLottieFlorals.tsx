"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS } from "./constants";

interface AmbientLottieFloralsProps {
  className?: string;
}

const PLACEMENTS = [
  {
    id: "bloom-center",
    className:
      "left-1/2 top-[38%] h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.28]",
  },
  {
    id: "bloom-left",
    className:
      "left-[-8%] top-[55%] h-[min(48vw,280px)] w-[min(48vw,280px)] opacity-[0.22] -rotate-12",
  },
  {
    id: "bloom-right",
    className:
      "right-[-6%] top-[48%] h-[min(44vw,260px)] w-[min(44vw,260px)] opacity-[0.2] rotate-12 scale-x-[-1]",
  },
] as const;

/**
 * Soft looping Lottie floral blooms behind the invitation content.
 */
export function AmbientLottieFlorals({ className }: AmbientLottieFloralsProps) {
  const reducedMotion = useReducedMotion();
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(ASSETS.lottieFloral)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load floral Lottie");
        return response.json();
      })
      .then((data: object) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        /* Ambient only — fail silently */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (reducedMotion || !animationData) return null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[5] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {PLACEMENTS.map((placement) => (
        <div
          key={placement.id}
          className={cn("absolute mix-blend-multiply", placement.className)}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="size-full"
          />
        </div>
      ))}
    </div>
  );
}
