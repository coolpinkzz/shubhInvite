import { Cormorant_Garamond, Nunito } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const babyRevealFontClassName = [
  cormorant.variable,
  nunito.variable,
].join(" ");
