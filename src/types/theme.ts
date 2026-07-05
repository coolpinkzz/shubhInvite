import type { ComponentType } from "react";

export interface ThemeColorTokens {
  primary: string;
  primaryForeground: string;
  primaryContainer: string;
  primaryContainerForeground: string;
  secondary: string;
  secondaryForeground: string;
  secondaryContainer: string;
  accent: string;
  accentLight: string;
  accentMid: string;
  accentDark: string;
  background: string;
  surface: string;
  surfaceLow: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  border: string;
  borderSubtle: string;
  outline: string;
  outlineVariant: string;
  petal: readonly string[];
  eventAccent: readonly string[];
}

export interface ThemeGradientTokens {
  hero: string;
  button: string;
  card: string;
  cardTopLine: string;
}

export interface ThemeShadowTokens {
  card: string;
  hero: string;
  button: string;
}

export interface ThemeRadiusTokens {
  card: string;
  button: string;
  input: string;
}

export interface ThemeFontTokens {
  display: string;
  headline: string;
  body: string;
  label: string;
}

export interface ThemeTokens {
  colors: ThemeColorTokens;
  gradients: ThemeGradientTokens;
  shadows: ThemeShadowTokens;
  radius: ThemeRadiusTokens;
  fonts: ThemeFontTokens;
}

export interface WeddingThemeContentConfig {
  id: string;
  name: string;
  couple: {
    bride: string;
    groom: string;
  };
  date: string;
  countdownTarget: string;
  location: string;
  brand: string;
  scratchCard: {
    weddingDate: string;
    revealThreshold: number;
  };
  photoAlbum: readonly {
    src: string;
    alt: string;
    caption: string;
  }[];
  coupleImage: {
    src: string;
    alt: string;
  };
}

/** @deprecated Use WeddingThemeContentConfig */
export type ThemeContentConfig = WeddingThemeContentConfig;

export type BabyGender = "boy" | "girl";

export interface BabyRevealContentConfig {
  id: string;
  name: string;
  parents: {
    mother: string;
    father: string;
  };
  revealDate: string;
  countdownTarget?: string;
  location: string;
  brand: string;
  gender: BabyGender;
  copy: {
    title: string;
    subtitle: string;
    instruction: string;
    revealMessage: string;
    ctaPrimary: string;
    ctaSecondary: string;
    parentsOverline?: string;
  };
  photoAlbum: readonly {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export type AnyThemeContentConfig =
  | WeddingThemeContentConfig
  | BabyRevealContentConfig;

export function isBabyRevealConfig(
  config: AnyThemeContentConfig,
): config is BabyRevealContentConfig {
  return "gender" in config && "parents" in config;
}

export function isWeddingConfig(
  config: AnyThemeContentConfig,
): config is WeddingThemeContentConfig {
  return "couple" in config;
}

export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
  config: AnyThemeContentConfig;
  /** Combined next/font variable class names for this theme's fonts. */
  fontClassName: string;
  /** Full page composition rendered by the dynamic template route. */
  Template: ComponentType;
}

export type ThemeId = string;

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ThemeTokenOverrides = DeepPartial<ThemeTokens>;
