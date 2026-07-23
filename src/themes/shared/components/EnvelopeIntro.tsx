"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface EnvelopeIntroProps {
  /** When provided, plays after tap then reveals the invitation. */
  src?: string;
  /**
   * Closed-envelope still shown before tap.
   * Needed on iOS Safari, which often keeps `<video>` black until playback.
   */
  posterSrc?: string;
  /** Optional brand/emblem mark on the tap overlay. */
  emblemSrc?: string;
  onComplete: () => void;
  /** Fired when the user taps and playback begins (also used to unlock music). */
  onStart?: () => void;
  className?: string;
}

/** Media fragment that nudges Safari to decode and paint the first frame. */
function videoSrcWithFirstFrame(src: string) {
  if (src.includes("#")) return src;
  return `${src}#t=0.001`;
}

export function EnvelopeIntro({
  src,
  posterSrc,
  emblemSrc,
  onComplete,
  onStart,
  className,
}: EnvelopeIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);
  const [awaitingTap, setAwaitingTap] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const finishIntro = useCallback(() => {
    setIsVisible(false);
    window.setTimeout(onComplete, 500);
  }, [onComplete]);

  const notifyStart = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    onStart?.();
  }, [onStart]);

  // iOS Safari: force a tiny seek so a frame can paint if no poster is provided.
  useEffect(() => {
    if (!src || posterSrc) return;

    const video = videoRef.current;
    if (!video) return;

    const paintFirstFrame = () => {
      try {
        if (video.readyState >= 1 && video.currentTime < 0.05) {
          video.currentTime = 0.05;
        }
      } catch {
        // Ignore seek errors on unsupported browsers.
      }
    };

    video.addEventListener("loadedmetadata", paintFirstFrame);
    video.addEventListener("loadeddata", paintFirstFrame);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", paintFirstFrame);
      video.removeEventListener("loadeddata", paintFirstFrame);
    };
  }, [posterSrc, src]);

  const openInvitation = useCallback(async () => {
    if (hasStartedRef.current) return;

    setAwaitingTap(false);
    notifyStart();

    // Tap-only intro — no video; open straight into the invite.
    if (!src) {
      finishIntro();
      return;
    }

    const video = videoRef.current;
    if (!video) {
      finishIntro();
      return;
    }

    try {
      video.muted = true;
      video.currentTime = 0;
      await video.play();
    } catch {
      finishIntro();
    }
  }, [finishIntro, notifyStart, src]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center bg-[#050A12]",
            className,
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={!isVisible}
        >
          {src ? (
            <>
              <video
                ref={videoRef}
                src={videoSrcWithFirstFrame(src)}
                poster={posterSrc}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                muted
                preload="auto"
                onEnded={finishIntro}
              />
              {/*
                Keep a real <img> over the video while waiting.
                iOS Safari often paints <video> as black until play(), and can ignore poster=.
              */}
              {posterSrc && awaitingTap ? (
                // eslint-disable-next-line @next/next/no-img-element -- full-bleed poster; Next/Image not needed for static public asset
                <img
                  src={posterSrc}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-hidden="true"
                  fetchPriority="high"
                />
              ) : null}
            </>
          ) : (
            <div
              className="pointer-events-none absolute inset-0 comic-web-grid opacity-50"
              aria-hidden="true"
            />
          )}

          {awaitingTap ? (
            <button
              type="button"
              onClick={() => void openInvitation()}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-4 px-6",
                src
                  ? "bg-gradient-to-b from-black/40 via-black/25 to-black/45"
                  : "bg-gradient-to-b from-[#061018]/90 via-[#0B1220]/85 to-[#050A12]/95",
                "text-white",
                "transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent,#E0112B)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              )}
            >
              {emblemSrc ? (
                <motion.div
                  className="relative mb-2 h-24 w-24 sm:h-28 sm:w-28"
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
                className="font-theme-label text-[11px] font-semibold uppercase tracking-[0.35em] text-white/75"
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
                className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-[var(--theme-accent,#E0112B)] to-transparent"
                initial={{ opacity: 0, scaleX: 0.6 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                aria-hidden="true"
              />
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
