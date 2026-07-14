"use client";

import { motion } from "framer-motion";
import { Music2, Volume2, VolumeX } from "lucide-react";
import {
  forwardRef,
  useImperativeHandle,
  type ComponentRef,
} from "react";

import { cn } from "@/lib/utils";
import type { ThemeMusicConfig } from "@/types/theme";

import { useThemeMusic } from "../hooks/useThemeMusic";

export interface ThemeMusicControlHandle {
  play: () => void;
  pause: () => void;
}

export interface ThemeMusicControlProps {
  music: ThemeMusicConfig;
  /** Override config autoplay (e.g. start music when intro video begins). */
  autoplay?: boolean;
  className?: string;
}

export const ThemeMusicControl = forwardRef<
  ThemeMusicControlHandle,
  ThemeMusicControlProps
>(function ThemeMusicControl({ music, autoplay, className }, ref) {
  const { isPlaying, isReady, toggle, play, pause } = useThemeMusic({
    music,
    autoplay,
  });

  useImperativeHandle(ref, () => ({ play, pause }), [play, pause]);

  const label = isPlaying
    ? `Pause ${music.title ?? "background music"}`
    : `Play ${music.title ?? "background music"}`;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      disabled={!isReady}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
      className={cn(
        "fixed right-4 top-4 z-[60] flex size-11 items-center justify-center rounded-full",
        "border border-theme-outline/15 bg-surface/90 text-theme-primary shadow-[var(--theme-shadow-button)] backdrop-blur-md",
        "transition-transform hover:scale-105 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
    >
      {isPlaying ? (
        <Volume2 className="size-5" aria-hidden="true" />
      ) : (
        <VolumeX className="size-5" aria-hidden="true" />
      )}

      {!isPlaying && isReady ? (
        <span
          className="pointer-events-none absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-accent-foreground"
          aria-hidden="true"
        >
          <Music2 className="size-2.5" />
        </span>
      ) : null}
    </motion.button>
  );
});

export type ThemeMusicControlRef = ComponentRef<typeof ThemeMusicControl>;
