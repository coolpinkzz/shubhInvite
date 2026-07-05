"use client";

import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useTheme } from "@/hooks/useTheme";
import {
  CelebrationBurst,
  FlowerShower,
  SparkleEffect,
  type CelebrationOrigin,
} from "@/themes/royal-wedding/components/celebration";
import { hexToRgba } from "@/themes/shared/utils/color";
import type { ThemeColorTokens } from "@/types/theme";

interface ScratchRevealCardProps {
  weddingDate: string;
  revealThreshold?: number;
  onRevealed?: () => void;
}

interface GoldDust {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

const BRUSH_RADIUS = 22;

function drawGoldScratchLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  colors: ThemeColorTokens,
) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.accentLight);
  gradient.addColorStop(0.35, colors.accent);
  gradient.addColorStop(0.65, colors.accentMid);
  gradient.addColorStop(1, colors.accentDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = colors.primaryContainer;
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 36) {
    for (let y = 0; y < height; y += 36) {
      drawFloralMotif(ctx, x + 18, y + 18, 10);
    }
  }

  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 6; i++) {
    const cx = (width / 6) * i + width / 12;
    const cy = height / 2;
    drawFloralMotif(ctx, cx, cy, 22);
  }

  ctx.restore();

  const shimmer = ctx.createLinearGradient(0, 0, width, 0);
  shimmer.addColorStop(0, "rgba(255,255,255,0)");
  shimmer.addColorStop(0.5, "rgba(255,255,255,0.18)");
  shimmer.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, width, height);
}

function drawFloralMotif(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
) {
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.ellipse(px, py, radius * 0.55, radius * 0.35, angle, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.2, 0, Math.PI * 2);
  ctx.stroke();
}

function getScratchProgress(ctx: CanvasRenderingContext2D): number {
  const { width, height } = ctx.canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  let transparent = 0;
  const total = width * height;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] < 128) transparent++;
  }

  return transparent / total;
}

function FloralCorner({
  className,
  accent,
  primary,
}: {
  className?: string;
  accent: string;
  primary: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 44C4 44 8 28 20 20C32 12 44 8 44 8"
        stroke={accent}
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      <path
        d="M8 40C12 32 18 26 28 22"
        stroke={primary}
        strokeWidth="0.8"
        strokeOpacity="0.25"
      />
      <circle cx="10" cy="38" r="2.5" fill={accent} fillOpacity="0.5" />
      <circle cx="22" cy="26" r="1.5" fill={accent} fillOpacity="0.35" />
    </svg>
  );
}

function triggerCelebrationHaptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([25, 40, 25]);
  }
}

export function ScratchRevealCard({
  weddingDate,
  revealThreshold = 0.55,
  onRevealed,
}: ScratchRevealCardProps) {
  const { tokens } = useTheme();
  const { colors, shadows } = tokens;

  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const particleIdRef = useRef(0);
  const progressFrameRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [burstOrigin, setBurstOrigin] = useState<CelebrationOrigin | null>(
    null,
  );
  const [goldDust, setGoldDust] = useState<GoldDust[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const initCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    drawGoldScratchLayer(ctx, width, height, colors);
  }, [colors]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsRevealed(true);
      setProgress(1);
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

  const spawnGoldDust = useCallback((x: number, y: number) => {
    const batch: GoldDust[] = Array.from({ length: 3 }, () => ({
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 16,
      y: y + (Math.random() - 0.5) * 16,
      size: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
    }));
    setGoldDust((prev) => [...prev.slice(-30), ...batch]);
  }, []);

  const startCelebration = useCallback(() => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      setBurstOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.6,
      });
    }
    setShowFlowers(true);
    setIsCelebrating(true);
    triggerCelebrationHaptic();
  }, []);

  const triggerReveal = useCallback(() => {
    if (isRevealed || isRevealing) return;
    setIsRevealing(true);
    startCelebration();
    window.setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
      setProgress(1);
    }, 600);
  }, [isRevealed, isRevealing, startCelebration]);

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
        const steps = Math.max(1, Math.floor(dist / 4));
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          eraseAt(ctx, last.x + (x - last.x) * t, last.y + (y - last.y) * t);
        }
      } else {
        eraseAt(ctx, x, y);
      }

      lastPointRef.current = { x, y };
      spawnGoldDust(x, y);

      progressFrameRef.current++;
      if (progressFrameRef.current % 4 === 0) {
        const next = getScratchProgress(ctx);
        setProgress(next);
        if (next >= revealThreshold) triggerReveal();
      }
    },
    [isRevealed, isRevealing, revealThreshold, spawnGoldDust, triggerReveal],
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
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    if (goldDust.length === 0) return;
    const timer = window.setTimeout(() => setGoldDust([]), 400);
    return () => window.clearTimeout(timer);
  }, [goldDust]);

  const showCelebration = isCelebrating || isRevealed;
  const revealedShadow = `0 20px 50px -12px ${hexToRgba(colors.primaryContainer, 0.22)}, 0 0 40px -8px ${hexToRgba(colors.accent, 0.35)}`;
  const defaultShadow = shadows.card;

  return (
    <>
      <FlowerShower
        active={showFlowers && !reducedMotion}
        origin={burstOrigin}
        onComplete={() => {
          setShowFlowers(false);
          setIsCelebrating(false);
        }}
      />

      <motion.div
        ref={cardRef}
        className="relative mx-auto mb-8 w-full max-w-sm"
        animate={
          isRevealed
            ? {
                y: -6,
                boxShadow: revealedShadow,
              }
            : {
                y: 0,
                boxShadow: defaultShadow,
              }
        }
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div
          className={`relative overflow-hidden rounded-xl border bg-surface px-4 py-3 transition-colors duration-700 ${
            isRevealed
              ? "border-accent/70 ring-2 ring-accent/25"
              : "border-accent/40"
          }`}
        >
          {isRevealed && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.2] }}
              transition={{ duration: 1.2 }}
              style={{
                background: `radial-gradient(ellipse at 50% 60%, ${hexToRgba(colors.accent, 0.25)} 0%, transparent 65%)`,
              }}
              aria-hidden="true"
            />
          )}

          <FloralCorner
            className="pointer-events-none absolute left-1 top-1 z-10 h-7 w-7"
            accent={colors.accent}
            primary={colors.primaryContainer}
          />
          <FloralCorner
            className="pointer-events-none absolute right-1 top-1 z-10 h-7 w-7 -scale-x-100"
            accent={colors.accent}
            primary={colors.primaryContainer}
          />
          <FloralCorner
            className="pointer-events-none absolute bottom-1 left-1 z-10 h-7 w-7 -scale-y-100"
            accent={colors.accent}
            primary={colors.primaryContainer}
          />
          <FloralCorner
            className="pointer-events-none absolute bottom-1 right-1 z-10 h-7 w-7 -scale-100"
            accent={colors.accent}
            primary={colors.primaryContainer}
          />

          <div className="relative border border-accent/25 px-3 py-3">
            <p className="mb-2 text-center font-theme-body text-xs tracking-wide text-muted">
              Scratch to Reveal Our Wedding Date ✨
            </p>

            <div
              ref={containerRef}
              className="relative mx-auto h-14 w-full overflow-hidden rounded-lg border border-accent/30 bg-surface shadow-inner"
            >
              <CelebrationBurst active={showCelebration && !reducedMotion} />

              <div className="absolute inset-0 flex items-center justify-center px-3">
                {(isRevealed || isRevealing) && (
                  <motion.div
                    className="pointer-events-none absolute inset-2 rounded-md"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: [0, 0.6, 0.35],
                      scale: [0.85, 1.15, 1],
                    }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: `radial-gradient(circle, ${hexToRgba(colors.accent, 0.35)} 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                )}

                <motion.p
                  className="relative z-10 text-center font-theme-headline text-lg leading-none text-primary sm:text-xl"
                  style={{ fontWeight: 600 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isRevealed || isRevealing
                      ? { opacity: 1, scale: [0.9, 1.05, 1] }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    duration: 0.75,
                    times: [0, 0.55, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {weddingDate}
                </motion.p>

                <SparkleEffect
                  active={showCelebration && !reducedMotion}
                  count={12}
                />
              </div>

              {goldDust.map((p) => (
                <span
                  key={p.id}
                  className="scratch-gold-particle pointer-events-none absolute z-30 rounded-full bg-accent"
                  style={{
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    transform: `rotate(${p.rotation}deg)`,
                  }}
                />
              ))}

              <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-20 touch-none transition-opacity duration-700 ${
                  isRevealed || isRevealing
                    ? "pointer-events-none opacity-0"
                    : "cursor-crosshair opacity-100"
                } ${isRevealing ? "scratch-layer-fade" : ""}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                aria-label="Scratch to reveal wedding date"
                role="img"
              />
            </div>

            {!isRevealed && (
              <div className="mt-2">
                <div className="h-1.5 overflow-hidden rounded-full bg-accent/15">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--theme-accent-mid)] via-accent to-[var(--theme-accent-light)]"
                    animate={{ width: `${Math.min(progress * 100, 100)}%` }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

function eraseAt(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, BRUSH_RADIUS);
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(0.65, "rgba(0,0,0,0.6)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
