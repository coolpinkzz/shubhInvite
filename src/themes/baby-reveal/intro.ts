import type { ThemeIntroConfig } from "@/types/theme";

/** Envelope video intro — tap unlocks music, then plays the open animation. */
export const babyRevealIntro = {
  src: "/themes/baby-reveal/intro.mp4",
  posterSrc: "/themes/baby-reveal/intro-poster.jpg",
  skipOnReducedMotion: true,
} satisfies ThemeIntroConfig;
