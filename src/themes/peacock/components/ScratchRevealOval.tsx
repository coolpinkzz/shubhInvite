"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { cn } from "@/lib/utils";

import { MOTION } from "./constants";
import type { ScratchRevealOvalProps } from "./types";

const BRUSH_RADIUS = 26;
const DEFAULT_THRESHOLD = 0.42;

function drawPeacockScratchLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#0B4F6C");
  base.addColorStop(0.35, "#0F766E");
  base.addColorStop(0.65, "#155E75");
  base.addColorStop(1, "#1E3A8A");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < Math.floor((width * height) / 28); i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 1.8 + 0.4;
    const tone = Math.random();
    ctx.fillStyle =
      tone > 0.72
        ? "rgba(212, 175, 55, 0.55)"
        : tone > 0.45
          ? "rgba(255, 255, 255, 0.28)"
          : "rgba(8, 40, 55, 0.45)";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  const vignette = ctx.createRadialGradient(
    width * 0.5,
    height * 0.45,
    Math.min(width, height) * 0.15,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.62,
  );
  vignette.addColorStop(0, "rgba(20, 184, 166, 0.12)");
  vignette.addColorStop(0.55, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(8, 30, 50, 0.35)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  const shimmer = ctx.createLinearGradient(0, 0, width, height);
  shimmer.addColorStop(0, "rgba(255,255,255,0)");
  shimmer.addColorStop(0.45, "rgba(255,255,255,0.14)");
  shimmer.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, width, height);
}

function getScratchProgress(ctx: CanvasRenderingContext2D): number {
  const { width, height } = ctx.canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  let transparent = 0;
  const total = width * height;

  for (let i = 3; i < pixels.length; i += 4) {
    if ((pixels[i] ?? 0) < 128) transparent++;
  }

  return transparent / total;
}

function eraseAt(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, BRUSH_RADIUS);
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(0.6, "rgba(0,0,0,0.55)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function ScratchRevealOval({
  date,
  dateIso,
  hint,
  overline,
  revealThreshold = DEFAULT_THRESHOLD,
  className,
  onRevealed,
}: ScratchRevealOvalProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const progressFrameRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const initCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    drawPeacockScratchLayer(ctx, width, height);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsRevealed(true);
      setShowHint(false);
      return;
    }

    initCanvas();
    const observer = new ResizeObserver(initCanvas);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [initCanvas, reducedMotion]);

  useEffect(() => {
    if (isRevealed) onRevealed?.();
  }, [isRevealed, onRevealed]);

  const triggerReveal = useCallback(() => {
    if (isRevealed || isRevealing) return;
    setIsRevealing(true);
    setShowHint(false);
    window.setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
    }, 480);
  }, [isRevealed, isRevealing]);

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx || isRevealed || isRevealing) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      setShowHint(false);

      const last = lastPointRef.current;
      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const steps = Math.max(1, Math.floor(dist / 3));
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          eraseAt(ctx, last.x + (x - last.x) * t, last.y + (y - last.y) * t);
        }
      } else {
        eraseAt(ctx, x, y);
      }

      lastPointRef.current = { x, y };

      progressFrameRef.current++;
      if (progressFrameRef.current % 3 === 0) {
        const next = getScratchProgress(ctx);
        if (next >= revealThreshold) triggerReveal();
      }
    },
    [isRevealed, isRevealing, revealThreshold, triggerReveal],
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (isRevealed || isRevealing) return;
    isScratchingRef.current = true;
    lastPointRef.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[50%] bg-[#FFFDF8]",
        "shadow-[inset_0_0_24px_rgba(15,118,110,0.14)] ring-1 ring-[#0F766E]/20",
        className,
      )}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={
            isRevealed || isRevealing
              ? { opacity: 1, scale: [0.92, 1.04, 1] }
              : { opacity: 0.08, scale: 0.92 }
          }
          transition={{ duration: 0.65, ease: MOTION.ease }}
        >
          <time
            dateTime={dateIso}
            className="pk-card-value max-w-[11rem] text-center text-xl leading-tight text-[#1E3A8A] sm:max-w-[13rem] sm:text-2xl md:text-[1.7rem]"
          >
            {date}
          </time>
        </motion.div>
      </div>

      {!reducedMotion && showHint && !isRevealed ? (
        <motion.p
          className="pointer-events-none absolute inset-x-3 top-1/2 z-30 -translate-y-1/2 text-center font-theme-body text-[0.7rem] italic leading-snug text-white/90 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="mb-1 block text-[0.55rem] text-[#D4AF37] sm:text-xs">
            ✦
          </span>
          {hint}
        </motion.p>
      ) : null}

      {!reducedMotion ? (
        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 z-20 touch-none rounded-[50%] transition-opacity duration-500",
            isRevealed || isRevealing
              ? "pointer-events-none opacity-0"
              : "cursor-pointer opacity-100",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          aria-label={hint}
          role="img"
        />
      ) : null}
    </div>
  );
}
