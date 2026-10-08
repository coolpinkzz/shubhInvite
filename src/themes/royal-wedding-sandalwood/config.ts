import { royalWeddingConfig } from "@/themes/royal-wedding/config";

export const royalWeddingSandalwoodConfig = {
  ...royalWeddingConfig,
  id: "royal-wedding-sandalwood",
  name: "Susri Sangita & Manoranjan",
  couple: {
    bride: "Susri Sangita Parija",
    groom: "Manoranjan Patnaik",
  },
  date: "Friday, 11 December 2026",
  countdownTarget: "December 11, 2026 19:00:00",
  calendar: {
    startsAt: "2026-12-11T19:00:00+05:30",
    durationMinutes: 240,
  },
  location: "Casa Royal, Trisulia, Cuttack",
  brand: "Susri & Manoranjan",
  hashtag: "#SusriGotRinku'd",
  scratchCard: {
    weddingDate: "11 December 2026",
    revealThreshold: royalWeddingConfig.scratchCard.revealThreshold,
  },
} as const;
