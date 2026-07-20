import { Cormorant_Garamond, Great_Vibes, Lato } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const christiansWeddingFontClassName = [
  greatVibes.variable,
  cormorantGaramond.variable,
  lato.variable,
].join(" ");
