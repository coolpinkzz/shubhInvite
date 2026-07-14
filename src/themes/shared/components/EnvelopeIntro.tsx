"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface EnvelopeIntroProps {
  src: string;
  onComplete: () => void;
  /** Fired when the user taps and playback begins (also used to unlock music). */
  onStart?: () => void;
  className?: string;
}

export function EnvelopeIntro({
  src,
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

  const openInvitation = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasStartedRef.current) return;

    setAwaitingTap(false);
    notifyStart();

    try {
      video.muted = true;
      await video.play();
    } catch {
      // If playback still fails, skip straight into the invitation.
      finishIntro();
    }
  }, [finishIntro, notifyStart]);

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
            "fixed inset-0 z-[100] flex items-center justify-center bg-black",
            className,
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden={!isVisible}
        >
          <video
            ref={videoRef}
            src={src}
            className="h-full w-full object-cover"
            playsInline
            muted
            preload="auto"
            onEnded={finishIntro}
          />

          {awaitingTap ? (
            <button
              type="button"
              onClick={() => void openInvitation()}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-4",
                "bg-gradient-to-b from-black/55 via-black/40 to-black/60",
                "text-white backdrop-blur-[1px]",
                "transition-colors hover:from-black/60 hover:via-black/45 hover:to-black/65",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent,#D4AF37)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              )}
            >
              <motion.span
                className="font-theme-label text-[11px] uppercase tracking-[0.35em] text-white/75"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                You&apos;re invited
              </motion.span>

              <motion.span
                className="font-theme-headline text-3xl tracking-wide text-white sm:text-4xl"
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
                className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-[var(--theme-accent,#D4AF37)] to-transparent"
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
