"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface LottieIntroProps {
  /** Public path to a Lottie JSON file (e.g. /themes/.../loading.json). */
  src: string;
  /** Optional emblem shown on the tap overlay. */
  emblemSrc?: string;
  onComplete: () => void;
  /** Fired on user tap — unlocks music in the same gesture. */
  onStart?: () => void;
  /** Soft background for the splash. Defaults to baby-reveal cream blue. */
  background?: string;
  className?: string;
}

export function LottieIntro({
  src,
  emblemSrc,
  onComplete,
  onStart,
  background = "linear-gradient(165deg, #0B1A28 0%, #16324A 45%, #1E4A6B 100%)",
  className,
}: LottieIntroProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const hasStartedRef = useRef(false);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [awaitingTap, setAwaitingTap] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const finishIntro = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(onComplete, 450);
  }, [onComplete]);

  const notifyStart = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    onStart?.();
  }, [onStart]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load Lottie");
        return response.json() as Promise<object>;
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const openInvitation = useCallback(() => {
    if (hasStartedRef.current) return;

    setAwaitingTap(false);
    notifyStart();

    if (loadError || !animationData) {
      finishIntro();
      return;
    }

    setIsPlaying(true);
  }, [animationData, finishIntro, loadError, notifyStart]);

  // After tap, play Lottie from the start once mounted.
  useEffect(() => {
    if (!isPlaying || !animationData) return;
    lottieRef.current?.goToAndPlay(0, true);
  }, [animationData, isPlaying]);

  // Safety timeout once playback has started.
  useEffect(() => {
    if (!isPlaying) return;
    const timeoutId = window.setTimeout(() => {
      finishIntro();
    }, 5000);
    return () => window.clearTimeout(timeoutId);
  }, [finishIntro, isPlaying]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] flex flex-col items-center justify-center",
            className,
          )}
          style={{ background }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Open invitation"
        >
          {isPlaying && animationData ? (
            <motion.div
              className="relative h-[min(56vw,240px)] w-[min(56vw,240px)] sm:h-64 sm:w-64"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={false}
                autoplay
                className="h-full w-full"
                onComplete={finishIntro}
              />
            </motion.div>
          ) : null}

          {awaitingTap ? (
            <button
              type="button"
              onClick={openInvitation}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-4 px-6",
                "text-white",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8D4F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A28]",
              )}
            >
              {emblemSrc ? (
                <motion.div
                  className="relative mb-1 h-24 w-24 sm:h-28 sm:w-28"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                >
                  <Image
                    src={emblemSrc}
                    alt=""
                    fill
                    priority
                    sizes="112px"
                    className="object-contain mix-blend-screen"
                  />
                </motion.div>
              ) : null}

              <motion.span
                className="font-theme-body text-[11px] font-semibold uppercase tracking-[0.35em] text-[#A8D4F0]/80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                You&apos;re invited
              </motion.span>

              <motion.span
                className="font-theme-display text-4xl tracking-wide text-white sm:text-5xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Tap to open
              </motion.span>

              <motion.span
                className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-[#A8D4F0] to-transparent"
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
              />

              {!animationData && !loadError ? (
                <span className="sr-only">Loading animation</span>
              ) : null}
            </button>
          ) : null}

          {isPlaying ? (
            <motion.p
              className="pointer-events-none absolute bottom-[18%] font-theme-body text-xs font-medium tracking-[0.28em] uppercase text-[#A8D4F0]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              Preparing your blessing
            </motion.p>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
