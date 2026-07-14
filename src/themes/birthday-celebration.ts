import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { birthdayCelebrationConfig } from "./birthday-celebration/config";
import { birthdayCelebrationFontClassName } from "./birthday-celebration/fonts";
import { birthdayCelebrationIntro } from "./birthday-celebration/intro";
import { birthdayCelebrationMusic } from "./birthday-celebration/music";
import { BirthdayCelebrationTemplate } from "./birthday-celebration/template";

/**
 * Comic City birthday design tokens.
 * Night navy + Spidey red/blue — classic comic party energy, kid-friendly.
 */
export const birthdayCelebrationTokens = {
  colors: {
    primary: "#0B1220",
    primaryForeground: "#F4F1EC",
    primaryContainer: "#E0112B",
    primaryContainerForeground: "#F4F1EC",
    secondary: "#1B4FD8",
    secondaryForeground: "#F4F1EC",
    secondaryContainer: "#D6E2FF",
    accent: "#E0112B",
    accentLight: "#FF6B7A",
    accentMid: "#C40E26",
    accentDark: "#8F0A1C",
    background: "#F4F1EC",
    surface: "#FFFCFA",
    surfaceLow: "#E8E4DC",
    text: "#0B1220",
    textMuted: "#4A5568",
    textSubtle: "#718096",
    border: "#1B4FD8",
    borderSubtle: "rgba(27, 79, 216, 0.22)",
    outline: "#E0112B",
    outlineVariant: "#D6E2FF",
    petal: ["#E0112B", "#1B4FD8", "#F4F1EC", "#F5C542", "#FF6B7A"],
    eventAccent: ["#E0112B", "#1B4FD8"],
  },
  gradients: {
    hero: "linear-gradient(180deg, #061018 0%, #0B1220 42%, #121A2E 78%, #1A2240 100%)",
    button: "linear-gradient(135deg, #E0112B 0%, #C40E26 55%, #8F0A1C 100%)",
    card: "linear-gradient(180deg, rgba(255, 252, 250, 0.98) 0%, rgba(232, 228, 220, 0.92) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #E0112B 50%, transparent 100%)",
  },
  shadows: {
    card: "0 16px 40px -12px rgba(11, 18, 32, 0.22)",
    hero: "0 16px 48px -10px rgba(224, 17, 43, 0.35)",
    button: "0 4px 18px -4px rgba(224, 17, 43, 0.5)",
  },
  radius: {
    card: "0.75rem",
    button: "0.5rem",
    input: "0.5rem",
  },
  fonts: {
    display: 'var(--font-bangers), "Bangers", Impact, sans-serif',
    headline: 'var(--font-bangers), "Bangers", Impact, sans-serif',
    body: 'var(--font-exo-2), "Exo 2", system-ui, sans-serif',
    label: 'var(--font-exo-2), "Exo 2", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const birthdayCelebrationTheme = {
  id: "birthday-celebration",
  name: "Birthday Celebration",
  description:
    "Comic City Spider-Man birthday invite with mask wipe age reveal, photo panels, and party schedule.",
  tokens: birthdayCelebrationTokens,
  config: birthdayCelebrationConfig,
  music: birthdayCelebrationMusic,
  intro: birthdayCelebrationIntro,
  fontClassName: birthdayCelebrationFontClassName,
  Template: BirthdayCelebrationTemplate,
} satisfies ThemeDefinition;
