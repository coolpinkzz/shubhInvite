"use client";

import { useCallback, useRef } from "react";

export type RevealSoundId =
  | "inflate"
  | "pop"
  | "cheer"
  | "chime"
  | "lullaby";

interface UseRevealSoundOptions {
  enabled?: boolean;
}

/**
 * Optional audio support for the reveal sequence.
 * Disabled by default — pass `enabled: true` to activate.
 */
export function useRevealSound({ enabled = false }: UseRevealSoundOptions = {}) {
  const audioRefs = useRef<Partial<Record<RevealSoundId, HTMLAudioElement>>>({});

  const play = useCallback(
    (soundId: RevealSoundId) => {
      if (!enabled) return;

      const existing = audioRefs.current[soundId];
      if (existing) {
        existing.currentTime = 0;
        void existing.play().catch(() => undefined);
        return;
      }

      // Sound assets can be wired here when available.
      // const audio = new Audio(`/themes/baby-reveal/sounds/${soundId}.mp3`);
      // audioRefs.current[soundId] = audio;
      // void audio.play().catch(() => undefined);
    },
    [enabled],
  );

  return { play };
}
