import type { ThemeTokenOverrides, ThemeTokens } from "@/types/theme";

type CssVarMap = Record<string, string>;

/**
 * Maps semantic theme tokens to CSS custom properties for runtime injection.
 * Also overrides scoped semantic color aliases so Tailwind utilities
 * (bg-primary, text-accent, etc.) resolve to template values inside ThemeProvider.
 */
export function tokensToCssVars(tokens: ThemeTokens): CssVarMap {
  const { colors, gradients, shadows, radius, fonts } = tokens;

  return {
    "--theme-primary": colors.primary,
    "--theme-primary-foreground": colors.primaryForeground,
    "--theme-primary-container": colors.primaryContainer,
    "--theme-primary-container-foreground": colors.primaryContainerForeground,
    "--theme-secondary": colors.secondary,
    "--theme-secondary-foreground": colors.secondaryForeground,
    "--theme-secondary-container": colors.secondaryContainer,
    "--theme-accent": colors.accent,
    "--theme-accent-light": colors.accentLight,
    "--theme-accent-mid": colors.accentMid,
    "--theme-accent-dark": colors.accentDark,
    "--theme-background": colors.background,
    "--theme-surface": colors.surface,
    "--theme-surface-low": colors.surfaceLow,
    "--theme-text": colors.text,
    "--theme-text-muted": colors.textMuted,
    "--theme-text-subtle": colors.textSubtle,
    "--theme-border": colors.border,
    "--theme-border-subtle": colors.borderSubtle,
    "--theme-outline": colors.outline,
    "--theme-outline-variant": colors.outlineVariant,

    "--theme-gradient-hero": gradients.hero,
    "--theme-gradient-button": gradients.button,
    "--theme-gradient-card": gradients.card,
    "--theme-gradient-card-top-line": gradients.cardTopLine,

    "--theme-shadow-card": shadows.card,
    "--theme-shadow-hero": shadows.hero,
    "--theme-shadow-button": shadows.button,

    "--theme-radius-card": radius.card,
    "--theme-radius-button": radius.button,
    "--theme-radius-input": radius.input,

    "--theme-font-display": fonts.display,
    "--theme-font-headline": fonts.headline,
    "--theme-font-body": fonts.body,
    "--theme-font-label": fonts.label,

    "--color-primary": colors.primaryContainer,
    "--color-primary-foreground": colors.primaryForeground,
    "--color-accent": colors.accent,
    "--color-accent-light": colors.accentLight,
    "--color-background": colors.background,
    "--color-foreground": colors.text,
    "--color-muted": colors.textMuted,
    "--color-muted-foreground": colors.textMuted,
    "--color-border": colors.outlineVariant,
    "--color-card": colors.surface,
    "--color-card-foreground": colors.text,
    "--color-surface": colors.surface,

    "--font-display": fonts.display,
    "--font-body": fonts.body,
  };
}

export function mergeThemeTokens(
  base: ThemeTokens,
  overrides?: ThemeTokenOverrides,
): ThemeTokens {
  if (!overrides) return base;

  return {
    colors: { ...base.colors, ...overrides.colors } as ThemeTokens["colors"],
    gradients: { ...base.gradients, ...overrides.gradients },
    shadows: { ...base.shadows, ...overrides.shadows },
    radius: { ...base.radius, ...overrides.radius },
    fonts: { ...base.fonts, ...overrides.fonts },
  };
}
