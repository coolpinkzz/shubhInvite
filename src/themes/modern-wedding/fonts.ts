import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-modern",
  display: "swap",
});

export const modernWeddingFontClassName = [
  fraunces.variable,
  inter.variable,
].join(" ");
