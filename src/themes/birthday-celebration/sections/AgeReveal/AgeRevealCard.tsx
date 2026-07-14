"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useTheme } from "@/hooks/useTheme";
import { hexToRgba } from "@/themes/shared/utils/color";

const SPIDER_MASK_SRC = "/themes/birthday-celebration/spidermask.png";

interface AgeRevealCardProps {
  age: number;
  hint?: string;
  revealThreshold?: number;
  onRevealed?: () => void;
}

function triggerHaptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([25, 40, 25]);
  }
}

function getOrdinalSuffix(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function WebBurst({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30"
      aria-hidden="true"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="comic-web-burst-line"
          style={{
            transform: `translate(-50%, -100%) rotate(${i * 36}deg)`,
            animationDelay: `${i * 0.03}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AgeRevealCard({
  age,
  hint = "Swipe the mask to reveal how old!",
  revealThreshold = 0.5,
  onRevealed,
}: AgeRevealCardProps) {
  const { tokens } = useTheme();
  const { colors, shadows } = tokens;

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startProgressRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const wipePercent = Math.min(progress * 100, 100);

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
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (isRevealed) onRevealed?.();
  }, [isRevealed, onRevealed]);

  const completeReveal = useCallback(() => {
    if (isRevealed || isRevealing) return;
    setIsRevealing(true);
    setProgress(1);
    setShowBurst(true);
    triggerHaptic();
    window.setTimeout(
      () => {
        setIsRevealed(true);
        setIsRevealing(false);
        setShowBurst(false);
      },
      reducedMotion ? 0 : 650,
    );
  }, [isRevealed, isRevealing, reducedMotion]);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track || isRevealed || isRevealing) return;

      const rect = track.getBoundingClientRect();
      const delta = clientX - startXRef.current;
      const next = Math.min(
        1,
        Math.max(0, startProgressRef.current + delta / rect.width),
      );
      setProgress(next);
      if (next >= revealThreshold) completeReveal();
    },
    [completeReveal, isRevealed, isRevealing, revealThreshold],
  );

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isRevealed || isRevealing || reducedMotion) return;
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startProgressRef.current = progress;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    if (!isRevealed && progress >= revealThreshold) completeReveal();
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (isRevealed || isRevealing) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      completeReveal();
    }
  };

  const ageLabel = `${age}${getOrdinalSuffix(age)}`;
  const revealedShadow = `0 20px 50px -12px ${hexToRgba(colors.primaryContainer, 0.35)}, 0 0 36px -8px ${hexToRgba("#F5C542", 0.4)}`;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xs"
      animate={
        isRevealed
          ? { y: -6, boxShadow: revealedShadow }
          : { y: 0, boxShadow: shadows.card }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div
        className={`relative overflow-hidden border-2 px-5 py-4 transition-colors duration-500 ${
          isRevealed
            ? "border-accent ring-2 ring-[var(--web-gold)]/40"
            : "border-secondary/50"
        }`}
        style={{
          borderRadius: tokens.radius.card,
          background:
            "linear-gradient(165deg, #121A2E 0%, #0B1220 55%, #16121F 100%)",
        }}
      >
        <p className="mb-3 text-center font-theme-body text-xs tracking-wide text-primary-foreground/65">
          {hint}
        </p>

        <div
          ref={trackRef}
          role="button"
          tabIndex={isRevealed ? -1 : 0}
          aria-label={
            isRevealed
              ? `Age revealed: ${ageLabel} birthday`
              : "Swipe the mask to reveal birthday age. Press Enter or Space to reveal."
          }
          className={`relative mx-auto aspect-square w-full max-w-[220px] touch-none overflow-hidden border-2 border-white/15 bg-[#0B1220] outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:max-w-[240px] ${
            isRevealed || isRevealing ? "cursor-default" : "cursor-ew-resize"
          }`}
          style={{ borderRadius: tokens.radius.card }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onKeyDown={handleKeyDown}
        >
          <WebBurst active={showBurst && !reducedMotion} />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <motion.p
              className="relative z-10 font-theme-display text-6xl leading-none text-[var(--web-gold)] sm:text-7xl"
              style={{
                textShadow: `0 0 24px ${hexToRgba("#F5C542", 0.55)}, 0 2px 0 ${colors.primaryContainer}`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isRevealed || isRevealing || progress > 0.15
                  ? {
                      opacity: 1,
                      scale: isRevealed || isRevealing ? [0.85, 1.12, 1] : 1,
                    }
                  : { opacity: 0.15, scale: 0.9 }
              }
              transition={{
                duration: 0.7,
                times: [0, 0.55, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {ageLabel}
            </motion.p>
            <motion.p
              className="relative z-10 font-theme-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/80"
              initial={{ opacity: 0 }}
              animate={
                isRevealed || isRevealing ? { opacity: 1 } : { opacity: 0 }
              }
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              Birthday
            </motion.p>
          </div>

          {!isRevealed && !reducedMotion ? (
            <div
              className="absolute inset-0 z-20 bg-white transition-[clip-path] duration-75 ease-out"
              style={{
                clipPath: `inset(0 0 0 ${wipePercent}%)`,
              }}
              aria-hidden="true"
            >
              <Image
                src={SPIDER_MASK_SRC}
                alt=""
                fill
                priority
                sizes="240px"
                className="object-contain object-center p-1"
                draggable={false}
              />
              {wipePercent < 8 ? (
                <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm bg-black/55 px-2 py-0.5 font-theme-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  Swipe →
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        {!isRevealed ? (
          <div className="mt-3">
            <div className="h-1.5 overflow-hidden rounded-sm bg-white/10">
              <motion.div
                className="h-full rounded-sm"
                style={{
                  background:
                    "linear-gradient(90deg, #E0112B 0%, #1B4FD8 55%, #F5C542 100%)",
                }}
                animate={{ width: `${Math.min(progress * 100, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
