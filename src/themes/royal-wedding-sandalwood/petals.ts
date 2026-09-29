import type { PetalFallOptions } from "@/themes/royal-wedding/components/falling-petals";

export const heroPetals = {
  count: 28,
  minSize: 12,
  maxSize: 24,
  minDuration: 6,
  maxDuration: 12,
  peakOpacity: 1,
  shadow: true,
} satisfies Partial<PetalFallOptions>;

export const venuePetals = {
  count: 12,
  minSize: 10,
  maxSize: 18,
  peakOpacity: 0.95,
  shadow: true,
} satisfies Partial<PetalFallOptions>;
