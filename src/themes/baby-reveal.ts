import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { babyRevealConfig } from "./baby-reveal/config";
import { babyRevealFontClassName } from "./baby-reveal/fonts";
import { babyRevealMusic } from "./baby-reveal/music";
import { BabyRevealTemplate } from "./baby-reveal/template";

/**
 * Naming Ceremony (Kuan Puja) design tokens.
 * Soft sky-blue & cream palette inspired by the boy naming illustration.
 */
export const babyRevealTokens = {
  colors: {
    primary: "#3D4A56",
    primaryForeground: "#F7FBFE",
    primaryContainer: "#7BB8E0",
    primaryContainerForeground: "#F7FBFE",
    secondary: "#A8D4F0",
    secondaryForeground: "#3D4A56",
    secondaryContainer: "#E8F4FC",
    accent: "#8EC8E8",
    accentLight: "#C5E4F7",
    accentMid: "#7BB8E0",
    accentDark: "#5B8FB9",
    background: "#F0F7FC",
    surface: "#F7FBFE",
    surfaceLow: "#E8F4FC",
    text: "#3D4A56",
    textMuted: "#7A8794",
    textSubtle: "#9AA6B2",
    border: "#C5E4F7",
    borderSubtle: "rgba(123, 184, 224, 0.28)",
    outline: "#A8D4F0",
    outlineVariant: "#E8F4FC",
    petal: ["#C5E4F7", "#E8F4FC", "#A8D4F0", "#D4E8F5", "#F7FBFE", "#7BB8E0"],
    eventAccent: ["#7BB8E0", "#A8D4F0"],
  },
  gradients: {
    hero: "linear-gradient(165deg, #F7FBFE 0%, #E8F4FC 40%, #D4E8F5 100%)",
    button:
      "linear-gradient(135deg, #7BB8E0 0%, #A8D4F0 50%, #C5E4F7 100%)",
    card: "linear-gradient(180deg, rgba(247, 251, 254, 0.96) 0%, rgba(232, 244, 252, 0.92) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #A8D4F0 50%, transparent 100%)",
  },
  shadows: {
    card: "0 20px 50px -14px rgba(91, 143, 185, 0.16)",
    hero: "0 16px 48px -10px rgba(123, 184, 224, 0.22)",
    button: "0 4px 20px -4px rgba(123, 184, 224, 0.4)",
  },
  radius: {
    card: "1.5rem",
    button: "9999px",
    input: "0.75rem",
  },
  fonts: {
    display: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
    headline: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif',
    body: 'var(--font-nunito), "Nunito", system-ui, sans-serif',
    label: 'var(--font-nunito), "Nunito", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const babyRevealTheme = {
  id: "baby-reveal",
  name: "Naming Ceremony",
  description:
    "Simple modern Kuan Puja / Namkaran invite with a scratch-to-reveal name card.",
  tokens: babyRevealTokens,
  config: babyRevealConfig,
  music: babyRevealMusic,
  fontClassName: babyRevealFontClassName,
  Template: BabyRevealTemplate,
} satisfies ThemeDefinition;
