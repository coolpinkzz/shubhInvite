"use client";

import { useCallback, useState } from "react";

export type RevealPhase =
  | "idle"
  | "inflate"
  | "shake"
  | "stretch"
  | "pop"
  | "celebrate"
  | "revealed";

const PHASE_SEQUENCE: RevealPhase[] = [
  "idle",
  "inflate",
  "shake",
  "stretch",
  "pop",
  "celebrate",
  "revealed",
];

const PHASE_DURATIONS_MS: Record<RevealPhase, number> = {
  idle: 0,
  inflate: 450,
  shake: 650,
  stretch: 400,
  pop: 350,
  celebrate: 6000,
  revealed: 0,
};

interface UseRevealStateOptions {
  onReveal?: () => void;
  reducedMotion?: boolean;
}

export function useRevealState({
  onReveal,
  reducedMotion = false,
}: UseRevealStateOptions = {}) {
  const [phase, setPhase] = useState<RevealPhase>("idle");
  const [isInteracting, setIsInteracting] = useState(false);

  const startReveal = useCallback(() => {
    if (isInteracting || phase !== "idle") return;

    setIsInteracting(true);

    if (reducedMotion) {
      setPhase("revealed");
      onReveal?.();
      return;
    }

    let currentIndex = 1;

    const advance = () => {
      const nextPhase = PHASE_SEQUENCE[currentIndex];
      if (!nextPhase) return;

      setPhase(nextPhase);

      if (nextPhase === "pop") {
        onReveal?.();
      }

      if (nextPhase === "revealed") return;

      const duration = PHASE_DURATIONS_MS[nextPhase];
      currentIndex += 1;

      if (nextPhase === "celebrate") {
        window.setTimeout(() => {
          setPhase("revealed");
        }, duration);
        return;
      }

      window.setTimeout(advance, duration);
    };

    setPhase("inflate");
    window.setTimeout(advance, PHASE_DURATIONS_MS.inflate);
  }, [isInteracting, onReveal, phase, reducedMotion]);

  const isRevealed = phase === "revealed" || phase === "celebrate";
  const showBalloon = phase !== "pop" && phase !== "celebrate" && phase !== "revealed";
  const showCelebration = phase === "celebrate" || phase === "revealed";
  const showRevealCard = phase === "celebrate" || phase === "revealed";

  return {
    phase,
    isInteracting,
    isRevealed,
    showBalloon,
    showCelebration,
    showRevealCard,
    startReveal,
  };
}
