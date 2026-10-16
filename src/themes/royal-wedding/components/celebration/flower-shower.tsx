"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useTheme } from "@/hooks/useTheme";
import {
  createBurstParticle,
  createShowerParticle,
  drawFlowerParticle,
  updateFlowerParticle,
} from "./flower-particle";
import type { CelebrationOrigin } from "./types";

interface FlowerShowerProps {
  active: boolean;
  origin: CelebrationOrigin | null;
  duration?: number;
  onComplete?: () => void;
}

const BURST_COUNT = 42;
const SHOWER_DURATION = 4200;
const TOTAL_DURATION = 7000;

export function FlowerShower({
  active,
  origin,
  duration = TOTAL_DURATION,
  onComplete,
}: FlowerShowerProps) {
  const { tokens } = useTheme();
  const accentRef = useRef({
    spark: tokens.colors.accent,
    glow: tokens.colors.accentLight,
  });
  accentRef.current = {
    spark: tokens.colors.accent,
    glow: tokens.colors.accentLight,
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef(
    [] as ReturnType<typeof createBurstParticle>[],
  );
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const showerSpawnRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [canPortal, setCanPortal] = useState(false);

  useEffect(() => {
    setCanPortal(true);
  }, []);

  useLayoutEffect(() => {
    if (!active || !canPortal) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const burstOrigin = origin ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.42,
    };
    const groundY = window.innerHeight - 28;

    particlesRef.current = [];
    startRef.current = performance.now();
    lastFrameRef.current = startRef.current;
    showerSpawnRef.current = 0;

    for (let i = 0; i < BURST_COUNT; i++) {
      particlesRef.current.push(createBurstParticle(burstOrigin, groundY));
    }

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const delta = Math.min(34, now - lastFrameRef.current);
      lastFrameRef.current = now;

      if (elapsed < SHOWER_DURATION) {
        showerSpawnRef.current += delta;
        while (showerSpawnRef.current > 48) {
          showerSpawnRef.current -= 48;
          particlesRef.current.push(
            createShowerParticle(window.innerWidth, groundY),
            createShowerParticle(window.innerWidth, groundY),
          );
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        const alive = updateFlowerParticle(
          particle,
          delta,
          now,
          Math.sin(now / 600) * 0.8 + 0.4,
        );
        if (alive) drawFlowerParticle(ctx, particle, accentRef.current);
        return alive;
      });

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        particlesRef.current = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onCompleteRef.current?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [active, canPortal, origin, duration]);

  if (!canPortal) return null;

  return createPortal(
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[80] h-[100dvh] w-screen ${
        active ? "" : "invisible"
      }`}
      aria-hidden="true"
    />,
    document.body,
  );
}
