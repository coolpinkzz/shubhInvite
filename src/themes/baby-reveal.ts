import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { babyRevealConfig } from "./baby-reveal/config";
import { babyRevealFontClassName } from "./baby-reveal/fonts";
import { babyRevealMusic } from "./baby-reveal/music";
import { BabyRevealTemplate } from "./baby-reveal/template";

/**
 * Baby Gender Reveal design tokens.
 * Pastel blue & pink palette inspired by the reveal illustration.
 */
export const babyRevealTokens = {
  colors: {
    primary: "#4A4540",
    primaryForeground: "#FFF9F7",
    primaryContainer: "#E8887A",
    primaryContainerForeground: "#FFF9F7",
    secondary: "#A8D4F0",
    secondaryForeground: "#4A4540",
    secondaryContainer: "#FCE8EE",
    accent: "#F4B8C8",
    accentLight: "#FAD4DE",
    accentMid: "#E8A0B0",
    accentDark: "#D4889A",
    background: "#FDF0EE",
    surface: "#FFF9F7",
    surfaceLow: "#FCE8EE",
    text: "#4A4540",
    textMuted: "#8A7F78",
    textSubtle: "#A89E96",
    border: "#FAD4DE",
    borderSubtle: "rgba(244, 184, 200, 0.25)",
    outline: "#F4B8C8",
    outlineVariant: "#FCE8EE",
    petal: ["#FAD4DE", "#C5E4F7", "#F4B8C8", "#A8D4F0", "#E8887A"],
    eventAccent: ["#A8D4F0", "#F4B8C8"],
  },
  gradients: {
    hero: "linear-gradient(165deg, #FDF0EE 0%, #FCE8EE 40%, #E8F4FC 100%)",
    button:
      "linear-gradient(135deg, #E8887A 0%, #F4B8C8 50%, #A8D4F0 100%)",
    card: "linear-gradient(180deg, rgba(255, 249, 247, 0.95) 0%, rgba(252, 232, 238, 0.9) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #F4B8C8 50%, transparent 100%)",
  },
  shadows: {
    card: "0 20px 50px -14px rgba(232, 136, 122, 0.18)",
    hero: "0 16px 48px -10px rgba(244, 184, 200, 0.25)",
    button: "0 4px 20px -4px rgba(168, 212, 240, 0.4)",
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
  name: "Baby Name Reveal",
  description:
    "Premium baby name reveal with a scratch card experience and pastel celebration.",
  tokens: babyRevealTokens,
  config: babyRevealConfig,
  music: babyRevealMusic,
  fontClassName: babyRevealFontClassName,
  Template: BabyRevealTemplate,
} satisfies ThemeDefinition;
