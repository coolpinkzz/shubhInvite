import type { ThemeIntroConfig } from "@/types/theme";

/** Lottie splash — tap unlocks music, then plays the loading animation. */
export const babyRevealIntro = {
  lottieSrc: "/themes/baby-reveal/babyLoading.json",
  emblemSrc: "/themes/baby-reveal/lordganeshBlue.png",
  skipOnReducedMotion: true,
} satisfies ThemeIntroConfig;
