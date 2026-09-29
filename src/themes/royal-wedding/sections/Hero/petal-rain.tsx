"use client";

import {
  FallingPetals,
  type PetalFallOptions,
} from "@/themes/royal-wedding/components/falling-petals";

const DEFAULT_PETAL_RAIN: PetalFallOptions = {
  count: 15,
  minSize: 8,
  maxSize: 18,
  minDuration: 5,
  maxDuration: 10,
  maxDelay: 5,
  peakOpacity: 0.8,
};

const getViewportWidth = () => window.innerWidth;

export interface PetalRainProps {
  options?: Partial<PetalFallOptions>;
}

export function PetalRain({ options }: PetalRainProps) {
  return (
    <FallingPetals
      options={{ ...DEFAULT_PETAL_RAIN, ...options }}
      getSpreadWidth={getViewportWidth}
      className="fixed z-10"
    />
  );
}
