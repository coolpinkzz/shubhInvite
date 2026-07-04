import type { Metadata } from "next";
import {
  EB_Garamond,
  Great_Vibes,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import "@/themes/royal-wedding/royal-wedding.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Templates",
  description: "Wedding invitation templates",
};

export default function TemplatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${playfair.variable} ${ebGaramond.variable} ${greatVibes.variable} ${montserrat.variable}`}
    >
      {children}
    </div>
  );
}
