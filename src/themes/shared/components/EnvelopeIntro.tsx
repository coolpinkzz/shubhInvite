"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface EnvelopeIntroProps {
  src: string;
  onComplete: () => void;
  /** Fired when the intro video actually starts playing. */
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
  const [needsInteraction, setNeedsInteraction] = useState(false);
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

  const attemptPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = true;
      await video.play();
      setNeedsInteraction(false);
      notifyStart();
    } catch {
      setNeedsInteraction(true);
    }
  }, [notifyStart]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    void attemptPlayback();
  }, [attemptPlayback]);

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
            onClick={needsInteraction ? () => void attemptPlayback() : undefined}
          />

          {needsInteraction ? (
            <button
              type="button"
              onClick={() => void attemptPlayback()}
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-3",
                "bg-black/35 text-white backdrop-blur-[2px]",
                "font-theme-body text-lg tracking-wide",
                "transition-opacity hover:bg-black/45",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
              )}
            >
              <span className="text-sm uppercase tracking-[0.3em] text-white/80">
                You&apos;re invited
              </span>
              <span className="font-theme-headline text-2xl">Tap to open</span>
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
