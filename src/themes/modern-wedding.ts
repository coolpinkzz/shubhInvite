import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { modernWeddingConfig } from "./modern-wedding/config";
import { modernWeddingFontClassName } from "./modern-wedding/fonts";
import { modernWeddingMusic } from "./modern-wedding/music";
import { ModernWeddingTemplate } from "./modern-wedding/template";

/**
 * Modern Wedding design tokens.
 * Cool neutrals with sage accent — proves token swap without section rewrites.
 */
export const modernWeddingTokens = {
  colors: {
    primary: "#1C1C1E",
    primaryForeground: "#FFFFFF",
    primaryContainer: "#3A3A3C",
    primaryContainerForeground: "#E5E5EA",
    secondary: "#636366",
    secondaryForeground: "#FFFFFF",
    secondaryContainer: "#F2F2F7",
    accent: "#6B9080",
    accentLight: "#A4C3B2",
    accentMid: "#84A98C",
    accentDark: "#52796F",
    background: "#F9F9FB",
    surface: "#FFFFFF",
    surfaceLow: "#F2F2F7",
    text: "#1C1C1E",
    textMuted: "#8E8E93",
    textSubtle: "#636366",
    border: "#C7C7CC",
    borderSubtle: "rgba(28, 28, 30, 0.08)",
    outline: "#AEAEB2",
    outlineVariant: "#D1D1D6",
    petal: ["#E8D5D5", "#B8CDB8", "#6B9080", "#C7C7CC", "#F2F2F7"],
    eventAccent: ["#6B9080", "#1C1C1E"],
  },
  gradients: {
    hero: "linear-gradient(180deg, #F9F9FB 0%, #FFFFFF 100%)",
    button:
      "linear-gradient(135deg, #52796F 0%, #6B9080 50%, #84A98C 100%)",
    card: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 249, 251, 1) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #6B9080 50%, transparent 100%)",
  },
  shadows: {
    card: "0 8px 40px -8px rgba(28, 28, 30, 0.08)",
    hero: "0 20px 60px -12px rgba(28, 28, 30, 0.1)",
    button: "0 4px 24px -4px rgba(107, 144, 128, 0.35)",
  },
  radius: {
    card: "0.75rem",
    button: "9999px",
    input: "0.5rem",
  },
  fonts: {
    display: 'var(--font-fraunces), "Fraunces", Georgia, serif',
    headline: 'var(--font-fraunces), "Fraunces", Georgia, serif',
    body: 'var(--font-inter-modern), "Inter", system-ui, sans-serif',
    label: 'var(--font-inter-modern), "Inter", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const modernWeddingTheme = {
  id: "modern-wedding",
  name: "Modern Wedding",
  description:
    "Contemporary minimalist invitation with cool neutrals and sage accents.",
  tokens: modernWeddingTokens,
  config: modernWeddingConfig,
  music: modernWeddingMusic,
  fontClassName: modernWeddingFontClassName,
  Template: ModernWeddingTemplate,
} satisfies ThemeDefinition;
