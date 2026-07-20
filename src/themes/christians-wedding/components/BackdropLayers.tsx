"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION } from "./constants";

interface BackdropLayersProps {
  className?: string;
}

/**
 * Layered watercolor backdrops — center wash, soft blobs, and ghost florals
 * behind the invitation copy (inspired by the print invitation).
 */
export function BackdropLayers({ className }: BackdropLayersProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[3] overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {/* Soft side watercolor blobs */}
      <div className="absolute -left-[10%] top-[30%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(200,180,160,0.22)_0%,transparent_70%)] blur-2xl sm:h-[360px] sm:w-[360px]" />
      <div className="absolute -right-[8%] top-[55%] h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(184,140,106,0.16)_0%,transparent_70%)] blur-2xl sm:h-[320px] sm:w-[320px]" />
      <div className="absolute bottom-[8%] left-[35%] h-[200px] w-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(232,210,190,0.25)_0%,transparent_70%)] blur-xl" />

      {/* Ghost floral silhouettes as soft backdrop accents */}
      <div className="absolute left-[-6%] top-[38%] h-[min(50vw,320px)] w-[min(42vw,260px)] opacity-[0.12] mix-blend-multiply">
        <Image
          src={ASSETS.floral}
          alt=""
          fill
          sizes="(max-width: 768px) 42vw, 260px"
          className="object-contain object-left-top"
          loading="lazy"
        />
      </div>
      <div className="absolute right-[-8%] top-[42%] h-[min(46vw,300px)] w-[min(38vw,240px)] origin-center scale-x-[-1] opacity-[0.1] mix-blend-multiply">
        <Image
          src={ASSETS.floral}
          alt=""
          fill
          sizes="(max-width: 768px) 38vw, 240px"
          className="object-contain object-left-top"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-[-4%] right-[-4%] h-[min(48vw,300px)] w-[min(40vw,250px)] origin-center -scale-x-100 -scale-y-100 opacity-[0.14] mix-blend-multiply">
        <Image
          src={ASSETS.floral}
          alt=""
          fill
          sizes="(max-width: 768px) 40vw, 250px"
          className="object-contain object-left-top"
          loading="lazy"
        />
      </div>

      {/* Frosted content stage — lifts typography off the wash */}
      <motion.div
        className={cn(
          "absolute left-1/2 top-[44%] h-[min(68vw,420px)] w-[min(88vw,520px)] -translate-x-1/2 -translate-y-1/2",
          "rounded-[2rem] bg-gradient-to-b from-white/35 via-white/18 to-transparent",
          "shadow-[0_20px_60px_-28px_rgba(184,140,106,0.18)]",
          "ring-1 ring-white/30 backdrop-blur-[1.5px]",
        )}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.1, ease: MOTION.ease }}
      />
    </div>
  );
}
