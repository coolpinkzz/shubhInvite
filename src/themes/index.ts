import type { ThemeDefinition, ThemeId } from "@/types/theme";

import { babyRevealTheme } from "./baby-reveal";
import { birthdayCelebrationTheme } from "./birthday-celebration";
import { christiansWeddingTheme } from "./christians-wedding";
import { modernWeddingTheme } from "./modern-wedding";
import { royalMaroonFloralTheme } from "./royal-maroon-floral";
import { royalWeddingTheme } from "./royal-wedding";

export const themes = {
  "baby-reveal": babyRevealTheme,
  "birthday-celebration": birthdayCelebrationTheme,
  "christians-wedding": christiansWeddingTheme,
  "royal-wedding": royalWeddingTheme,
  "modern-wedding": modernWeddingTheme,
  "royal-maroon-floral": royalMaroonFloralTheme,
} as const satisfies Record<string, ThemeDefinition>;

export type RegisteredThemeId = keyof typeof themes;

export const themeList = Object.values(themes);

export function getTheme(slug: ThemeId): ThemeDefinition | undefined {
  return themes[slug as RegisteredThemeId];
}

export function isRegisteredTheme(slug: string): slug is RegisteredThemeId {
  return slug in themes;
}

export { babyRevealTheme, babyRevealTokens } from "./baby-reveal";
export {
  birthdayCelebrationTheme,
  birthdayCelebrationTokens,
} from "./birthday-celebration";
export { royalWeddingTheme, royalWeddingTokens } from "./royal-wedding";
export { modernWeddingTheme, modernWeddingTokens } from "./modern-wedding";
export {
  royalMaroonFloralTheme,
  royalMaroonFloralTokens,
} from "./royal-maroon-floral";
export {
  christiansWeddingTheme,
  christiansWeddingTokens,
} from "./christians-wedding";
