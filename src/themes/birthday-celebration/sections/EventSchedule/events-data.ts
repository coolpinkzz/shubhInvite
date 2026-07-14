import { Cake, Gift, Music, Sparkles } from "lucide-react";

import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

export const birthdayCelebrationEvents: WeddingEvent[] = [
  {
    id: "welcome",
    title: "HQ Check-In",
    date: "22 August 2026",
    time: "4:00 PM",
    venue: "Sunset Garden Lawn",
    address: "Bandra West, Mumbai",
    description:
      "Arrive, grab a prop, and snap heroic photos as we open the Web Party.",
    icon: Sparkles,
    accent: "accent",
  },

  {
    id: "cake",
    title: "Cake Ambush",
    date: "22 August 2026",
    time: "5:30 PM",
    venue: "Main Stage",
    address: "Bandra West, Mumbai",
    description:
      "Sing along as Aanya blows out her candles and makes a heroic wish.",
    icon: Cake,
    accent: "accent",
  },
];
