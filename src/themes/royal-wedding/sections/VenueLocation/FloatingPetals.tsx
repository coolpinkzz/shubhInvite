"use client";

import {
  FallingPetals,
  type PetalFallOptions,
} from "@/themes/royal-wedding/components/falling-petals";

const DEFAULT_FLOATING_PETALS: PetalFallOptions = {
  count: 6,
  minSize: 6,
  maxSize: 14,
  minDuration: 12,
  maxDuration: 20,
  maxDelay: 6,
  peakOpacity: 0.8,
};

const SPREAD_WIDTH = 430;
const getSpreadWidth = () => SPREAD_WIDTH;

export interface FloatingPetalsProps {
  options?: Partial<PetalFallOptions>;
}

export function FloatingPetals({ options }: FloatingPetalsProps) {
  return (
    <FallingPetals
      options={{ ...DEFAULT_FLOATING_PETALS, ...options }}
      getSpreadWidth={getSpreadWidth}
      className="absolute"
    />
  );
}
