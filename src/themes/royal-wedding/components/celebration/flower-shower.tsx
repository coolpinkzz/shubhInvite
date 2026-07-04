"use client";

import { useEffect, useRef } from "react";
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

const BURST_COUNT = 36;
const SHOWER_DURATION = 3500;
const TOTAL_DURATION = 5500;

export function FlowerShower({
  active,
  origin,
  duration = TOTAL_DURATION,
  onComplete,
}: FlowerShowerProps) {
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

  useEffect(() => {
    if (!active || !origin) return;

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

    particlesRef.current = [];
    startRef.current = performance.now();
    lastFrameRef.current = startRef.current;
    showerSpawnRef.current = 0;

    for (let i = 0; i < BURST_COUNT; i++) {
      particlesRef.current.push(
        createBurstParticle(origin, window.innerHeight - 40),
      );
    }

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const delta = Math.min(32, now - lastFrameRef.current);
      lastFrameRef.current = now;

      if (elapsed < SHOWER_DURATION) {
        showerSpawnRef.current += delta;
        while (showerSpawnRef.current > 80) {
          showerSpawnRef.current -= 80;
          particlesRef.current.push(
            createShowerParticle(window.innerWidth, window.innerHeight - 40),
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
        if (alive) drawFlowerParticle(ctx, particle);
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
    };
  }, [active, origin, duration]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden="true"
    />
  );
}
