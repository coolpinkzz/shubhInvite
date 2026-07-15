import type { BabyGender } from "@/types/theme";

/** Design tokens — soft sky-blue & cream for naming ceremony. */
export const babyRevealDesignTokens = {
  colors: {
    pastel: {
      peach: "#F7FBFE",
      peachMid: "#E8F4FC",
      peachDeep: "#D4E8F5",
      pink: "#A8D4F0",
      pinkLight: "#C5E4F7",
      pinkSoft: "#E8F4FC",
      blue: "#A8D4F0",
      blueLight: "#C5E4F7",
      blueSoft: "#E8F4FC",
      blueDeep: "#7BB8E0",
      coral: "#5B8FB9",
      cream: "#F7FBFE",
      text: "#3D4A56",
      textMuted: "#7A8794",
      accent: "#7BB8E0",
    },
    neutral: {
      ivory: "#F7FBFE",
      warmWhite: "#F0F7FC",
      softBeige: "#E8F4FC",
      lightCream: "#F7FBFE",
      sageGreen: "#B8D4C8",
      gold: "#7BB8E0",
      goldLight: "#C5E4F7",
      goldDark: "#5B8FB9",
      text: "#3D4A56",
      textMuted: "#7A8794",
    },
    boy: {
      skyBlue: "#A8D4F0",
      skyBlueLight: "#C5E4F7",
      navy: "#5B8FB9",
      navyLight: "#7BB8E0",
      white: "#FFFFFF",
      silver: "#D4E8F5",
      gradient:
        "linear-gradient(160deg, #C5E4F7 0%, #A8D4F0 45%, #FFFFFF 100%)",
      background:
        "linear-gradient(180deg, #E8F4FC 0%, #C5E4F7 35%, #F7FBFE 100%)",
    },
    girl: {
      blushPink: "#A8D4F0",
      blushPinkLight: "#C5E4F7",
      lavender: "#E8F4FC",
      lavenderLight: "#F0F7FC",
      roseGold: "#7BB8E0",
      white: "#FFFFFF",
      gradient:
        "linear-gradient(160deg, #C5E4F7 0%, #A8D4F0 45%, #E8F4FC 100%)",
      background:
        "linear-gradient(180deg, #F0F7FC 0%, #C5E4F7 35%, #E8F4FC 100%)",
    },
  },
  petal: [
    "#C5E4F7",
    "#E8F4FC",
    "#A8D4F0",
    "#D4E8F5",
    "#F7FBFE",
    "#7BB8E0",
    "#B8DCEF",
  ],
  spacing: {
    heroPadding: "clamp(1.25rem, 5vw, 2rem)",
    sectionGap: "clamp(0.75rem, 3vw, 1.25rem)",
    balloonSize: "clamp(120px, 36vw, 170px)",
    illustrationSize: "clamp(220px, 68vw, 340px)",
    footerIllustrationWidth: "clamp(240px, 80vw, 360px)",
    footerIllustrationHeight: "clamp(110px, 32vw, 160px)",
    cardPadding: "clamp(1.5rem, 5vw, 2.5rem)",
    touchTarget: "48px",
    ganeshaSize: "clamp(60px, 24vw, 200px)",
  },
  typography: {
    title: "clamp(1.75rem, 6vw, 2.5rem)",
    subtitle: "clamp(0.95rem, 3.5vw, 1.125rem)",
    reveal: "clamp(2rem, 8vw, 3rem)",
    instruction: "clamp(0.8rem, 3vw, 0.95rem)",
    body: "clamp(0.9rem, 3.2vw, 1.05rem)",
    brand: "clamp(0.7rem, 2.5vw, 0.8rem)",
  },
  shadows: {
    balloon: "0 16px 40px -10px rgba(123, 184, 224, 0.3)",
    balloonGlow: "0 0 50px rgba(168, 212, 240, 0.35)",
    card: "0 20px 50px -14px rgba(91, 143, 185, 0.16)",
    cardBorder: "0 0 0 1px rgba(168, 212, 240, 0.45)",
    illustration: "0 12px 36px -10px rgba(91, 143, 185, 0.18)",
  },
  radius: {
    card: "1.5rem",
    button: "9999px",
    badge: "9999px",
  },
  animation: {
    easing: {
      luxury: [0.16, 1, 0.3, 1] as const,
      spring: { type: "spring" as const, stiffness: 260, damping: 20 },
      bounce: { type: "spring" as const, stiffness: 400, damping: 15 },
    },
    duration: {
      inflate: 0.45,
      shake: 0.65,
      stretch: 0.4,
      pop: 0.35,
      celebration: 6,
      cardRise: 0.85,
      background: 1.2,
    },
  },
} as const;

export const celebrationEmojis = {
  shared: ["✨", "⭐", "☁️", "🎈", "💙"],
  boy: ["💙", "🧸", "👣", "🍼", "⭐", "✨", "🎈"],
  girl: ["🩷", "🌸", "🎀", "👣", "🍼", "⭐", "✨", "🎈"],
} as const;

export function getGenderTokens(gender: BabyGender) {
  return gender === "boy"
    ? babyRevealDesignTokens.colors.boy
    : babyRevealDesignTokens.colors.girl;
}

export function getRevealText(gender: BabyGender) {
  return gender === "boy" ? "It's a Boy!" : "It's a Girl!";
}

export function getRevealEmoji(gender: BabyGender) {
  return gender === "boy" ? "💙" : "🩷";
}
