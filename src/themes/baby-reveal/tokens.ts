import type { BabyGender } from "@/types/theme";

/** Design tokens — pastel blue & pink palette inspired by the reveal illustration. */
export const babyRevealDesignTokens = {
  colors: {
    pastel: {
      peach: "#FDF0EE",
      peachMid: "#FCE4E0",
      peachDeep: "#F8D4CE",
      pink: "#F4B8C8",
      pinkLight: "#FAD4DE",
      pinkSoft: "#FCE8EE",
      blue: "#A8D4F0",
      blueLight: "#C5E4F7",
      blueSoft: "#E8F4FC",
      blueDeep: "#7BB8E0",
      coral: "#E8887A",
      cream: "#FFF9F7",
      text: "#4A4540",
      textMuted: "#8A7F78",
      accent: "#E8A0B0",
    },
    neutral: {
      ivory: "#FFF9F7",
      warmWhite: "#FDF5F3",
      softBeige: "#FCE8EE",
      lightCream: "#FDF0EE",
      sageGreen: "#B8D4C8",
      gold: "#E8A0B0",
      goldLight: "#FAD4DE",
      goldDark: "#D4889A",
      text: "#4A4540",
      textMuted: "#8A7F78",
    },
    boy: {
      skyBlue: "#A8D4F0",
      skyBlueLight: "#C5E4F7",
      navy: "#5B8FB9",
      navyLight: "#7BB8E0",
      white: "#FFFFFF",
      silver: "#D4E8F5",
      gradient: "linear-gradient(160deg, #C5E4F7 0%, #A8D4F0 45%, #FFFFFF 100%)",
      background:
        "linear-gradient(180deg, #E8F4FC 0%, #C5E4F7 35%, #FDF0EE 100%)",
    },
    girl: {
      blushPink: "#F4B8C8",
      blushPinkLight: "#FAD4DE",
      lavender: "#FCE8EE",
      lavenderLight: "#FFF0F4",
      roseGold: "#E8887A",
      white: "#FFFFFF",
      gradient:
        "linear-gradient(160deg, #FAD4DE 0%, #F4B8C8 45%, #FCE8EE 100%)",
      background:
        "linear-gradient(180deg, #FFF0F4 0%, #FAD4DE 35%, #FCE8EE 100%)",
    },
  },
  petal: [
    "#FAD4DE",
    "#FCE8EE",
    "#F4B8C8",
    "#C5E4F7",
    "#A8D4F0",
    "#E8887A",
    "#FFF0F4",
  ],
  spacing: {
    heroPadding: "clamp(1.25rem, 5vw, 2rem)",
    sectionGap: "clamp(0.75rem, 3vw, 1.25rem)",
    balloonSize: "clamp(120px, 36vw, 170px)",
    illustrationSize: "clamp(200px, 65vw, 320px)",
    footerIllustrationWidth: "clamp(240px, 80vw, 360px)",
    footerIllustrationHeight: "clamp(110px, 32vw, 160px)",
    cardPadding: "clamp(1.5rem, 5vw, 2.5rem)",
    touchTarget: "48px",
  },
  typography: {
    title: "clamp(1.75rem, 6vw, 2.5rem)",
    subtitle: "clamp(0.95rem, 3.5vw, 1.125rem)",
    reveal: "clamp(2rem, 8vw, 3rem)",
    instruction: "clamp(0.8rem, 3vw, 0.95rem)",
    body: "clamp(0.9rem, 3.2vw, 1.05rem)",
  },
  shadows: {
    balloon: "0 16px 40px -10px rgba(232, 160, 176, 0.35)",
    balloonGlow: "0 0 50px rgba(244, 184, 200, 0.4)",
    card: "0 20px 50px -14px rgba(232, 136, 122, 0.18)",
    cardBorder: "0 0 0 1px rgba(244, 184, 200, 0.5)",
    illustration: "0 12px 40px -8px rgba(232, 160, 176, 0.2)",
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
  shared: ["✨", "⭐", "☁️", "🎈", "🩷", "💙"],
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
