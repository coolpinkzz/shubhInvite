"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { ThemeMusicConfig } from "@/types/theme";

const STORAGE_PREFIX = "shubhinvite-theme-music";

interface UseThemeMusicOptions {
  music: ThemeMusicConfig;
  /** Override config autoplay. When flipped to true later, playback starts. */
  autoplay?: boolean;
}

interface UseThemeMusicReturn {
  isPlaying: boolean;
  isReady: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
}

function getStorageKey(src: string) {
  return `${STORAGE_PREFIX}:${src}`;
}

function readStoredPreference(src: string): boolean | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = sessionStorage.getItem(getStorageKey(src));
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    return null;
  }

  return null;
}

function writeStoredPreference(src: string, isPlaying: boolean) {
  try {
    sessionStorage.setItem(getStorageKey(src), String(isPlaying));
  } catch {
    // Ignore storage failures (private browsing, etc.)
  }
}

export function useThemeMusic({
  music,
  autoplay: autoplayOverride,
}: UseThemeMusicOptions): UseThemeMusicReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const volume = music.volume ?? 0.35;
  const loop = music.loop ?? true;
  const autoplay = autoplayOverride ?? music.autoplay ?? true;

  useEffect(() => {
    const audio = new Audio(music.src);
    audio.loop = loop;
    audio.volume = volume;
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      if (!loop) setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [loop, music.src, volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    void audio
      .play()
      .then(() => {
        setIsPlaying(true);
        writeStoredPreference(music.src, true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [music.src]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    writeStoredPreference(music.src, false);
  }, [music.src]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  useEffect(() => {
    if (!autoplay) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const storedPreference = readStoredPreference(music.src);

    if (prefersReducedMotion || storedPreference === false) return;

    play();
  }, [autoplay, music.src, play]);

  return { isPlaying, isReady, toggle, play, pause };
}
