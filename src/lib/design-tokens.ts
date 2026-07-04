/**
 * ShubhInvite Design System Tokens
 * Luxury wedding aesthetic: Apple restraint × Cartier gold × Indian royal warmth
 */

export const colors = {
  ivory: {
    50: "#fdfbf7",
    100: "#faf7f2",
    200: "#f5f0e8",
    300: "#ebe3d5",
  },
  maroon: {
    950: "#2a0a0a",
    900: "#3d1212",
    800: "#5c1a1a",
    700: "#722f37",
    600: "#8b3a42",
    500: "#a64d56",
  },
  gold: {
    200: "#f0e6c8",
    300: "#e8d5a3",
    400: "#d4af37",
    500: "#c9a962",
    600: "#b8943f",
    700: "#9a7b32",
  },
  emerald: {
    900: "#0f2e24",
    800: "#1b4d3e",
    700: "#2d6a4f",
    600: "#3d8b6e",
  },
  charcoal: {
    950: "#0d0d0d",
    900: "#1a1a1a",
    800: "#2c2c2c",
    700: "#404040",
    600: "#6b6b6b",
    500: "#8a8a8a",
    400: "#a3a3a3",
  },
  rose: {
    100: "#faf0f1",
    200: "#f5e1e4",
    300: "#e8c4ca",
  },
} as const;

export const semanticColors = {
  background: colors.ivory[50],
  foreground: colors.charcoal[900],
  muted: colors.charcoal[600],
  mutedForeground: colors.charcoal[500],
  border: colors.ivory[300],
  ring: colors.gold[500],
  primary: colors.maroon[800],
  primaryForeground: colors.ivory[50],
  accent: colors.gold[500],
  accentForeground: colors.charcoal[900],
  card: colors.ivory[100],
  cardForeground: colors.charcoal[900],
  destructive: "#b91c1c",
  destructiveForeground: colors.ivory[50],
} as const;

export const typography = {
  fontFamily: {
    display: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
    body: "var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif",
    accent: "var(--font-pinyon), 'Pinyon Script', cursive",
  },
  fontSize: {
    displayXl: "clamp(3rem, 6vw + 1rem, 5.5rem)",
    displayLg: "clamp(2.25rem, 4vw + 1rem, 4rem)",
    displayMd: "clamp(1.875rem, 3vw + 0.5rem, 3rem)",
    displaySm: "clamp(1.5rem, 2vw + 0.5rem, 2.25rem)",
    headingLg: "clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)",
    headingMd: "clamp(1.125rem, 1vw + 0.5rem, 1.375rem)",
    headingSm: "clamp(1rem, 0.5vw + 0.875rem, 1.125rem)",
    bodyLg: "clamp(1.0625rem, 0.5vw + 0.9rem, 1.1875rem)",
    bodyMd: "1rem",
    bodySm: "0.875rem",
    caption: "0.75rem",
    overline: "0.6875rem",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  lineHeight: {
    tight: 1.15,
    snug: 1.3,
    normal: 1.6,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: "-0.02em",
    normal: "0.01em",
    wide: "0.05em",
    wider: "0.1em",
    widest: "0.2em",
  },
} as const;

export const spacing = {
  section: {
    sm: "clamp(3rem, 8vw, 5rem)",
    md: "clamp(4rem, 10vw, 7rem)",
    lg: "clamp(6rem, 12vw, 10rem)",
    xl: "clamp(8rem, 15vw, 14rem)",
  },
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1400px",
  },
} as const;

export const radius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const shadows = {
  soft: "0 2px 20px -4px rgb(26 26 26 / 0.06)",
  elevated: "0 8px 40px -8px rgb(26 26 26 / 0.1)",
  luxury: "0 20px 60px -12px rgb(92 26 26 / 0.15)",
  gold: "0 4px 24px -4px rgb(201 169 98 / 0.35)",
} as const;

export const animation = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "800ms",
  },
  easing: {
    luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    reveal: "cubic-bezier(0.16, 1, 0.3, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  classes: {
    fadeIn: "animate-fade-in",
    fadeInUp: "animate-fade-in-up",
    fadeInDown: "animate-fade-in-down",
    shimmer: "animate-shimmer",
    float: "animate-float",
    reveal: "animate-reveal",
    scaleIn: "animate-scale-in",
  },
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type ColorScale = keyof typeof colors;
export type SemanticColor = keyof typeof semanticColors;
export type TypographySize = keyof typeof typography.fontSize;
export type SectionSpacing = keyof typeof spacing.section;
