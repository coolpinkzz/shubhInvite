import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { christiansWeddingConfig } from "./christians-wedding/config";
import { christiansWeddingFontClassName } from "./christians-wedding/fonts";
import { christiansWeddingIntro } from "./christians-wedding/intro";
import { christiansWeddingMusic } from "./christians-wedding/music";
import { ChristiansWeddingTemplate } from "./christians-wedding/template";

/**
 * Christians Wedding design tokens.
 * Soft watercolor paper, charcoal typography, warm taupe accent.
 */
export const christiansWeddingTokens = {
  colors: {
    primary: "#2E2E2E",
    primaryForeground: "#FCF7F3",
    primaryContainer: "#B88C6A",
    primaryContainerForeground: "#FCF7F3",
    secondary: "#666666",
    secondaryForeground: "#FCF7F3",
    secondaryContainer: "#F5EBE3",
    accent: "#B88C6A",
    accentLight: "#D4B49A",
    accentMid: "#B88C6A",
    accentDark: "#8F6A4E",
    background: "#FCF7F3",
    surface: "#FFFCFA",
    surfaceLow: "#F5EBE3",
    text: "#2E2E2E",
    textMuted: "#666666",
    textSubtle: "#8A8A8A",
    border: "#E8D5C4",
    borderSubtle: "rgba(46, 46, 46, 0.08)",
    outline: "#B88C6A",
    outlineVariant: "#E8D5C4",
    petal: ["#FCF7F3", "#E8C4B0", "#B88C6A", "#D4B49A", "#6B7F5A"],
    eventAccent: ["#B88C6A", "#2E2E2E"],
  },
  gradients: {
    hero: "radial-gradient(ellipse 65% 55% at 50% 42%, rgba(232,196,176,0.38) 0%, rgba(248,220,200,0.18) 35%, #FCF7F3 70%)",
    button:
      "linear-gradient(135deg, #8F6A4E 0%, #B88C6A 50%, #D4B49A 100%)",
    card: "linear-gradient(180deg, rgba(255,252,250,0.9) 0%, rgba(245,235,227,0.75) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #B88C6A 50%, transparent 100%)",
  },
  shadows: {
    card: "0 8px 32px -12px rgba(46, 46, 46, 0.1)",
    hero: "0 20px 60px -16px rgba(184, 140, 106, 0.18)",
    button: "0 4px 20px -4px rgba(184, 140, 106, 0.35)",
  },
  radius: {
    card: "1rem",
    button: "9999px",
    input: "0.75rem",
  },
  fonts: {
    display: 'var(--font-great-vibes), "Great Vibes", cursive',
    headline: 'var(--font-lato), "Lato", system-ui, sans-serif',
    body: 'var(--font-lato), "Lato", system-ui, sans-serif',
    label: 'var(--font-lato), "Lato", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const christiansWeddingTheme = {
  id: "christians-wedding",
  name: "Christians Wedding",
  description:
    "Romantic watercolor Christian wedding invitation with soft florals and elegant script typography.",
  tokens: christiansWeddingTokens,
  config: christiansWeddingConfig,
  music: christiansWeddingMusic,
  intro: christiansWeddingIntro,
  fontClassName: christiansWeddingFontClassName,
  Template: ChristiansWeddingTemplate,
} satisfies ThemeDefinition;

export {
  christiansWeddingConfig,
  ChristiansWeddingTemplate,
  Hero,
  invitationData,
} from "./christians-wedding/index";

export type { ChristiansWeddingConfig } from "./christians-wedding/index";
