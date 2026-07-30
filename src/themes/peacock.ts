import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { peacockConfig } from "./peacock/config";
import { peacockFontClassName } from "./peacock/fonts";
import { peacockIntro } from "./peacock/intro";
import { peacockMusic } from "./peacock/music";
import { PeacockTemplate } from "./peacock/template";

/**
 * Peacock Theme design tokens.
 * Ivory paper, royal blue typography, peacock green & gold accents.
 */
export const peacockTokens = {
  colors: {
    primary: "#1E3A8A",
    primaryForeground: "#FFFDF8",
    primaryContainer: "#0F766E",
    primaryContainerForeground: "#FFFDF8",
    secondary: "#0F766E",
    secondaryForeground: "#FFFDF8",
    secondaryContainer: "#F5E6C8",
    accent: "#D4AF37",
    accentLight: "#E8C96A",
    accentMid: "#D4AF37",
    accentDark: "#B8860B",
    background: "#FFFDF8",
    surface: "#FFFEFA",
    surfaceLow: "#F8F5EC",
    text: "#1E293B",
    textMuted: "#475569",
    textSubtle: "#64748B",
    border: "#E8D9A8",
    borderSubtle: "rgba(30, 58, 138, 0.08)",
    outline: "#D4AF37",
    outlineVariant: "#E8D9A8",
    petal: ["#FFFDF8", "#F5E6C8", "#D4AF37", "#14B8A6", "#0F766E", "#1E3A8A"],
    eventAccent: ["#D4AF37", "#1E3A8A", "#0F766E"],
  },
  gradients: {
    hero: "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(212,175,55,0.14) 0%, rgba(245,230,200,0.1) 32%, #FFFDF8 68%)",
    button: "linear-gradient(135deg, #1E3A8A 0%, #0F766E 55%, #D4AF37 100%)",
    card: "linear-gradient(180deg, rgba(255,253,248,0.92) 0%, rgba(248,245,236,0.78) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
  },
  shadows: {
    card: "0 10px 36px -18px rgba(30, 58, 138, 0.18)",
    hero: "0 20px 60px -16px rgba(212, 175, 55, 0.16)",
    button: "0 8px 28px -8px rgba(30, 58, 138, 0.45)",
  },
  radius: {
    card: "1rem",
    button: "9999px",
    input: "0.75rem",
  },
  fonts: {
    display: 'var(--font-great-vibes), "Great Vibes", cursive',
    headline: 'var(--font-cinzel), "Cinzel", Georgia, serif',
    body: 'var(--font-lato), "Lato", system-ui, sans-serif',
    label: 'var(--font-lato), "Lato", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const peacockTheme = {
  id: "peacock",
  name: "Peacock Theme",
  description:
    "Luxurious Indian wedding invitation with royal peacock motifs, ivory watercolor, and gold accents.",
  tokens: peacockTokens,
  config: peacockConfig,
  music: peacockMusic,
  intro: peacockIntro,
  fontClassName: peacockFontClassName,
  Template: PeacockTemplate,
} satisfies ThemeDefinition;

export {
  peacockConfig,
  PeacockTemplate,
  Hero,
  invitationData,
} from "./peacock/index";

export type { PeacockConfig } from "./peacock/index";
