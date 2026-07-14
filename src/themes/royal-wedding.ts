import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { royalWeddingConfig } from "./royal-wedding/config";
import { royalWeddingFontClassName } from "./royal-wedding/fonts";
import { royalWeddingIntro } from "./royal-wedding/intro";
import { royalWeddingMusic } from "./royal-wedding/music";
import { RoyalWeddingTemplate } from "./royal-wedding/template";

/**
 * Royal Wedding design tokens.
 * Values match the current on-screen template (hardcoded hex + --rw-* usage).
 */
export const royalWeddingTokens = {
  colors: {
    primary: "#5B0617",
    primaryForeground: "#FFFFFF",
    primaryContainer: "#7A1F2B",
    primaryContainerForeground: "#FF8B92",
    secondary: "#705A4A",
    secondaryForeground: "#FFFFFF",
    secondaryContainer: "#F7D9C4",
    accent: "#D4AF37",
    accentLight: "#E8C872",
    accentMid: "#C9A962",
    accentDark: "#B8943F",
    background: "#FEF9EF",
    surface: "#FAF5EB",
    surfaceLow: "#F8F3E9",
    text: "#1D1C16",
    textMuted: "#705A4A",
    textSubtle: "#564242",
    border: "#D4AF37",
    borderSubtle: "rgba(122, 31, 43, 0.08)",
    outline: "#897172",
    outlineVariant: "#DCC0C0",
    petal: ["#FFB3B5", "#FFDADA", "#7A1F2B", "#D4AF37", "#F7D9C4"],
    eventAccent: ["#D4AF37", "#7A1F2B"],
  },
  gradients: {
    hero: "linear-gradient(180deg, #FEF9EF 0%, #FAF5EB 100%)",
    button:
      "linear-gradient(135deg, #B8943F 0%, #D4AF37 50%, #C9A962 100%)",
    card: "linear-gradient(180deg, rgba(250, 245, 235, 0.95) 0%, rgba(254, 249, 239, 1) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #D4AF37 50%, transparent 100%)",
  },
  shadows: {
    card: "0 8px 40px -8px rgba(91, 6, 23, 0.12)",
    hero: "0 20px 60px -12px rgba(122, 31, 43, 0.15)",
    button: "0 4px 24px -4px rgba(212, 175, 55, 0.35)",
  },
  radius: {
    card: "1.5rem",
    button: "2.5rem 2.5rem 0.75rem 0.75rem",
    input: "1rem",
  },
  fonts: {
    display: 'var(--font-great-vibes), "Great Vibes", cursive',
    headline: 'var(--font-playfair), "Playfair Display", Georgia, serif',
    body: 'var(--font-eb-garamond), "EB Garamond", Georgia, serif',
    label: 'var(--font-montserrat), "Montserrat", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const royalWeddingTheme = {
  id: "royal-wedding",
  name: "Royal Wedding",
  description:
    "Traditional Indian wedding invitation with royal maroon, gold, and ivory elegance.",
  tokens: royalWeddingTokens,
  config: royalWeddingConfig,
  music: royalWeddingMusic,
  intro: royalWeddingIntro,
  fontClassName: royalWeddingFontClassName,
  Template: RoyalWeddingTemplate,
} satisfies ThemeDefinition;

export {
  royalWeddingConfig,
  RoyalWeddingHero,
  EventSchedule,
  weddingEvents,
  VenueLocation,
  defaultVenue,
  RSVPSection,
  defaultRSVPEvents,
} from "./royal-wedding/index";

export type {
  WeddingEvent,
  VenueLocationProps,
  RSVPFormData,
  RSVPSectionProps,
} from "./royal-wedding/index";
