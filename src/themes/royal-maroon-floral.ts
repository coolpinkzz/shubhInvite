import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { royalMaroonFloralConfig } from "./royal-maroon-floral/config";
import { royalMaroonFloralFontClassName } from "./royal-maroon-floral/fonts";
import { RoyalMaroonFloralTemplate } from "./royal-maroon-floral/template";

/**
 * Royal Maroon Floral design tokens.
 * Deep maroon arched card on warm cream with gold accents.
 */
export const royalMaroonFloralTokens = {
  colors: {
    primary: "#5C0D2E",
    primaryForeground: "#F8F5EC",
    primaryContainer: "#7A173D",
    primaryContainerForeground: "#F0D48E",
    secondary: "#F3E5D0",
    secondaryForeground: "#5C0D2E",
    secondaryContainer: "#F7F1E6",
    accent: "#D9B25F",
    accentLight: "#F4D27A",
    accentMid: "#D8B15B",
    accentDark: "#C89B3C",
    background: "#F8F1E7",
    surface: "#F7F1E6",
    surfaceLow: "#F3E5D0",
    text: "#5C0D2E",
    textMuted: "#6B1234",
    textSubtle: "#7A173D",
    border: "#D9B25F",
    borderSubtle: "rgba(92, 13, 46, 0.08)",
    outline: "#C89B3C",
    outlineVariant: "#F0D48E",
    petal: ["#F8F5EC", "#F0D48E", "#5C0D2E", "#D9B25F", "#4C6B3C"],
    eventAccent: ["#D9B25F", "#5C0D2E"],
  },
  gradients: {
    hero: "linear-gradient(180deg, #F8F1E7 0%, #F3E5D0 100%)",
    button:
      "linear-gradient(135deg, #C89B3C 0%, #D9B25F 50%, #F4D27A 100%)",
    card:
      "linear-gradient(180deg, #7A173D 0%, #5C0D2E 45%, #5C0D2E 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #D9B25F 50%, transparent 100%)",
  },
  shadows: {
    card: "0 24px 64px -16px rgba(92, 13, 46, 0.35)",
    hero: "0 20px 60px -12px rgba(92, 13, 46, 0.2)",
    button: "0 4px 24px -4px rgba(217, 178, 95, 0.35)",
  },
  radius: {
    card: "9999px 9999px 1.5rem 1.5rem",
    button: "2.5rem",
    input: "1rem",
  },
  fonts: {
    display: 'var(--font-great-vibes), "Great Vibes", cursive',
    headline: 'var(--font-playfair), "Playfair Display", Georgia, serif',
    body: 'var(--font-eb-garamond), "EB Garamond", Georgia, serif',
    label: 'var(--font-montserrat), "Montserrat", system-ui, sans-serif',
  },
} satisfies ThemeTokens;

export const royalMaroonFloralTheme = {
  id: "royal-maroon-floral",
  name: "Royal Maroon Floral Invitation",
  description:
    "Luxurious traditional Indian wedding card with deep maroon arch, gold detailing, and floral accents.",
  tokens: royalMaroonFloralTokens,
  config: royalMaroonFloralConfig,
  fontClassName: royalMaroonFloralFontClassName,
  Template: RoyalMaroonFloralTemplate,
} satisfies ThemeDefinition;

export {
  royalMaroonFloralConfig,
  RoyalMaroonFloralTemplate,
  RoyalInvitation,
} from "./royal-maroon-floral/index";

export type { RoyalMaroonFloralConfig } from "./royal-maroon-floral/index";
