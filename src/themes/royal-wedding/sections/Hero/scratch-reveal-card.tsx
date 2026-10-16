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
  /** `plaque` is the wide gold scratch panel used under the sandalwood hero. */
  variant?: "classic" | "plaque";
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

function drawPlaqueScratchLayer(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const base = ctx.createLinearGradient(0, 0, 0, height);
  base.addColorStop(0, "#F6E7B2");
  base.addColorStop(0.22, "#E6C56A");
  base.addColorStop(0.5, "#D4AE45");
  base.addColorStop(0.78, "#C99A3A");
  base.addColorStop(1, "#E8D08A");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  const sheen = ctx.createLinearGradient(width * 0.28, 0, width * 0.7, 0);
  sheen.addColorStop(0, "rgba(255,255,255,0)");
  sheen.addColorStop(0.42, "rgba(255,255,255,0.42)");
  sheen.addColorStop(0.58, "rgba(255,255,255,0.05)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, width, height);

  const fontSize = Math.max(11, Math.min(15, width * 0.038));
  ctx.fillStyle = "#3A2A1A";
  ctx.font = `500 ${fontSize}px "Playfair Display", Georgia, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "2.4px";
  ctx.fillText("◆  SCRATCH TO REVEAL  ◆", width / 2, height / 2);
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

function DividerBloom() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 shrink-0" aria-hidden="true">
      <g fill="#E7B7C4">
        <ellipse cx="8" cy="3.2" rx="1.7" ry="2.6" />
        <ellipse cx="8" cy="12.8" rx="1.7" ry="2.6" />
        <ellipse cx="3.2" cy="8" rx="2.6" ry="1.7" />
        <ellipse cx="12.8" cy="8" rx="2.6" ry="1.7" />
      </g>
      <circle cx="8" cy="8" r="1.5" fill="#E4C56A" />
    </svg>
  );
}

function SoftPetal({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <svg viewBox="0 0 16 24" className={className} aria-hidden="true">
      <ellipse cx="8" cy="12" rx="4.5" ry="9" fill={color} />
    </svg>
  );
}

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 36"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 28c10-2 18-10 24-20" stroke="#C5D4B4" strokeWidth="1.1" />
      <ellipse
        cx="18"
        cy="20"
        rx="8"
        ry="3.4"
        fill="#D5E3C8"
        transform="rotate(-28 18 20)"
      />
      <ellipse
        cx="28"
        cy="14"
        rx="7"
        ry="3"
        fill="#E8C9D6"
        transform="rotate(18 28 14)"
      />
      <circle cx="34" cy="10" r="2.2" fill="#F3D7E0" />
    </svg>
  );
}

export function ScratchRevealCard({
  weddingDate,
  revealThreshold = 0.55,
  onRevealed,
  variant = "classic",
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
    if (variant === "plaque") {
      drawPlaqueScratchLayer(ctx, width, height);
      return;
    }
    drawGoldScratchLayer(ctx, width, height, colors);
  }, [colors, variant]);

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
    const fontsReady = document.fonts?.ready.then(() => initCanvas());
    const observer = new ResizeObserver(initCanvas);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      void fontsReady;
    };
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

  if (variant === "plaque") {
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

        <div className="relative mx-auto w-full max-w-sm py-2">
          <div className="mb-7 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#E6D0A4] sm:w-20" />
            <DividerBloom />
            <span className="h-px w-16 bg-[#E6D0A4] sm:w-20" />
          </div>

          <motion.div
            ref={cardRef}
            className="relative"
            animate={isRevealed ? { y: -4 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div
              ref={containerRef}
              className="relative mx-auto h-[6.35rem] w-full overflow-hidden rounded-[1.35rem] border border-[#C6A15A] bg-white"
              style={{
                boxShadow: "0 10px 28px -16px rgba(120, 84, 24, 0.45)",
              }}
            >
              <CelebrationBurst active={showCelebration && !reducedMotion} />

              <div className="absolute inset-0 flex items-center justify-center px-4">
                <motion.div
                  className="relative z-10 flex flex-col items-center gap-1.5 text-center"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={
                    isRevealed || isRevealing
                      ? { opacity: 1, scale: [0.92, 1.04, 1] }
                      : { opacity: 0, scale: 0.92 }
                  }
                  transition={{
                    duration: 0.75,
                    times: [0, 0.55, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <p className="font-theme-label text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8C6D1C]">
                    Save the Date
                  </p>
                  <p className="font-theme-headline text-xl leading-none text-theme-primary sm:text-2xl">
                    {weddingDate}
                  </p>
                </motion.div>
                <SparkleEffect
                  active={showCelebration && !reducedMotion}
                  count={12}
                />
              </div>

              {goldDust.map((particle) => (
                <span
                  key={particle.id}
                  className="scratch-gold-particle pointer-events-none absolute z-30 rounded-full bg-[#F6E7B2]"
                  style={{
                    left: particle.x,
                    top: particle.y,
                    width: particle.size,
                    height: particle.size,
                    transform: `rotate(${particle.rotation}deg)`,
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
          </motion.div>
        </div>
      </>
    );
  }

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
        className="relative mx-auto mb-8 w-full max-w-sm md:max-w-md lg:max-w-lg"
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
