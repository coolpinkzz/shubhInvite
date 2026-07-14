import { Bangers, Exo_2 } from "next/font/google";

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: "400",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo-2",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const birthdayCelebrationFontClassName = [
  bangers.variable,
  exo2.variable,
].join(" ");
