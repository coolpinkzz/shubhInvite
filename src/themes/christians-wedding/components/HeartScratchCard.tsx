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

import { COLORS } from "./constants";

const BRUSH_RADIUS = 22;
const DEFAULT_THRESHOLD = 0.4;

interface HeartScratchCardProps {
  value: string;
  label: string;
  revealThreshold?: number;
  className?: string;
  valueClassName?: string;
  onRevealed?: () => void;
}

function drawHeartScratchLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, COLORS.accent);
  gradient.addColorStop(0.45, "#C9A288");
  gradient.addColorStop(1, "#8F6A4E");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  /* Soft highlight */
  const shimmer = ctx.createRadialGradient(
    width * 0.35,
    height * 0.28,
    2,
    width * 0.35,
    height * 0.28,
    width * 0.45,
  );
  shimmer.addColorStop(0, "rgba(255,255,255,0.35)");
  shimmer.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, width, height);

  /* Tiny heart watermark hint */
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.fillStyle = "#FFF8F2";
  ctx.font = `600 ${Math.floor(height * 0.28)}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("♥", width / 2, height / 2);
  ctx.restore();
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
  gradient.addColorStop(0.65, "rgba(0,0,0,0.55)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function HeartScratchCard({
  value,
  label,
  revealThreshold = DEFAULT_THRESHOLD,
  className,
  valueClassName,
  onRevealed,
}: HeartScratchCardProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const progressFrameRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

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
    drawHeartScratchLayer(ctx, width, height);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsRevealed(true);
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
    window.setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
    }, 420);
  }, [isRevealed, isRevealing]);

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx || isRevealed || isRevealing) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

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
      className={cn("relative flex flex-col items-center gap-1.5", className)}
    >
      <div
        ref={containerRef}
        className={cn(
          "cw-heart-scratch relative size-[5.5rem] sm:size-[7.5rem] md:size-32",
          "bg-[#FFF8F2] shadow-[0_8px_24px_-10px_rgba(46,46,46,0.3)]",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center px-1">
          <motion.span
            className={cn(
              "cw-date-value relative z-10 text-center leading-none tracking-[0.04em] text-[#1A1A1A]",
              "drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]",
              valueClassName,
            )}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={
              isRevealed || isRevealing
                ? { opacity: 1, scale: [0.88, 1.08, 1] }
                : { opacity: 0.15, scale: 0.88 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {value}
          </motion.span>
        </div>

        {!reducedMotion ? (
          <canvas
            ref={canvasRef}
            className={cn(
              "absolute inset-0 z-20 touch-none transition-opacity duration-500",
              isRevealed || isRevealing
                ? "pointer-events-none opacity-0"
                : "cursor-pointer opacity-100",
            )}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerUp}
            aria-label={`Scratch to reveal ${label}`}
            role="img"
          />
        ) : null}
      </div>

      <span className="font-theme-label text-[0.55rem] font-bold uppercase tracking-[0.18em] text-[#666666] sm:text-[0.6rem]">
        {label}
      </span>
    </div>
  );
}
