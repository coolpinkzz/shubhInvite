"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SoftLightsProps {
  className?: string;
}

const LIGHTS = [
  {
    id: "light-tl",
    className:
      "left-[8%] top-[12%] h-[220px] w-[220px] bg-[radial-gradient(circle,rgba(232,196,176,0.45)_0%,transparent_70%)] sm:h-[300px] sm:w-[300px]",
    duration: 7,
  },
  {
    id: "light-tr",
    className:
      "right-[6%] top-[18%] h-[180px] w-[180px] bg-[radial-gradient(circle,rgba(200,212,184,0.35)_0%,transparent_70%)] sm:h-[260px] sm:w-[260px]",
    duration: 9,
  },
  {
    id: "light-br",
    className:
      "bottom-[22%] right-[10%] h-[200px] w-[200px] bg-[radial-gradient(circle,rgba(245,230,220,0.4)_0%,transparent_70%)] sm:h-[280px] sm:w-[280px]",
    duration: 6.5,
  },
] as const;

/** Breathing ambient light orbs — soft peach & sage glows. */
export function SoftLights({ className }: SoftLightsProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[4] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {LIGHTS.map((light) => (
        <motion.div
          key={light.id}
          className={cn("absolute rounded-full blur-2xl", light.className)}
          initial={false}
          animate={
            reducedMotion
              ? { opacity: 0.55, scale: 1 }
              : { opacity: [0.4, 0.75, 0.4], scale: [1, 1.12, 1] }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: light.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
