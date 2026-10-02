import type { ThemeDefinition, ThemeTokens } from "@/types/theme";

import { royalWeddingTokens } from "./royal-wedding";
import { royalWeddingFontClassName } from "./royal-wedding/fonts";
import { royalWeddingIntro } from "./royal-wedding/intro";
import { royalWeddingMusic } from "./royal-wedding/music";
import { royalWeddingSandalwoodConfig } from "./royal-wedding-sandalwood/config";
import { RoyalWeddingSandalwoodTemplate } from "./royal-wedding-sandalwood/template";

/**
 * Royal Wedding Sandalwood design tokens.
 * Same maroon + gold identity as Royal Wedding on a light sandalwood peach,
 * with saturated petals that stay visible against it.
 */
export const royalWeddingSandalwoodTokens = {
  ...royalWeddingTokens,
  colors: {
    ...royalWeddingTokens.colors,
    secondaryContainer: "#D8A97C",
    accent: "#B8912A",
    accentLight: "#D9B458",
    accentMid: "#A8862F",
    accentDark: "#8C6D1C",
    background: "#FAE9D9",
    surface: "#FFF4EA",
    surfaceLow: "#F4DCC8",
    textMuted: "#5C4332",
    textSubtle: "#4E3535",
    border: "#B8912A",
    borderSubtle: "rgba(91, 6, 23, 0.14)",
    outline: "#7D6060",
    outlineVariant: "#C49E78",
    petal: ["#B0103A", "#E0245E", "#7A0F24", "#F29F05", "#FF5C8A"],
    eventAccent: ["#B8912A", "#7A1F2B"],
  },
  gradients: {
    hero: "linear-gradient(180deg, #FAE9D9 0%, #F3DCC6 100%)",
    button:
      "linear-gradient(135deg, #8C6D1C 0%, #B8912A 50%, #D9B458 100%)",
    card: "linear-gradient(180deg, rgba(255, 244, 234, 0.95) 0%, rgba(250, 233, 217, 1) 100%)",
    cardTopLine:
      "linear-gradient(90deg, transparent 0%, #B8912A 50%, transparent 100%)",
  },
  shadows: {
    card: "0 10px 40px -8px rgba(91, 6, 23, 0.22)",
    hero: "0 20px 60px -12px rgba(91, 6, 23, 0.28)",
    button: "0 4px 24px -4px rgba(140, 109, 28, 0.45)",
  },
} satisfies ThemeTokens;

export const royalWeddingSandalwoodTheme = {
  id: "royal-wedding-sandalwood",
  name: "Royal Wedding Sandalwood",
  description:
    "Royal maroon and gold wedding invitation on a light sandalwood peach with vivid falling petals.",
  tokens: royalWeddingSandalwoodTokens,
  config: royalWeddingSandalwoodConfig,
  music: royalWeddingMusic,
  intro: royalWeddingIntro,
  fontClassName: royalWeddingFontClassName,
  Template: RoyalWeddingSandalwoodTemplate,
} satisfies ThemeDefinition;
