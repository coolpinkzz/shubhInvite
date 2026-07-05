import { Baby, Cake, Gift, Sparkles } from "lucide-react";

import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

export const babyRevealEvents: WeddingEvent[] = [
  {
    id: "welcome",
    title: "Welcome & Blessings",
    date: "15 August 2026",
    time: "4:00 PM",
    venue: "The Garden Pavilion",
    address: "Jaipur, Rajasthan",
    description:
      "Arrive, settle in, and share warm wishes as we welcome our little one into the family.",
    icon: Gift,
    accent: "accent",
  },
  {
    id: "meet-baby",
    title: "Meet the Little One",
    date: "15 August 2026",
    time: "7:30 PM",
    venue: "The Cozy Nest Lounge",
    address: "Jaipur, Rajasthan",
    description:
      "Cuddle, click pictures, and shower our bundle of joy with all your love.",
    icon: Baby,
    accent: "primary",
  },
];
