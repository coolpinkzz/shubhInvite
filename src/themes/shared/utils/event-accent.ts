import type { ThemeColorTokens } from "@/types/theme";

export type EventAccentVariant = "accent" | "primary";

export function resolveEventAccent(
  colors: ThemeColorTokens,
  variant: EventAccentVariant,
): string {
  return variant === "accent" ? colors.accent : colors.primaryContainer;
}
