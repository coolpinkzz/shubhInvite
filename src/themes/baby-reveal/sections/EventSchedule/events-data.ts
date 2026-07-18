import { Flower2, UtensilsCrossed } from "lucide-react";

import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

export const babyRevealEvents: WeddingEvent[] = [
  {
    id: "kuan-puja",
    title: "Kuan Puja · Namkaran",
    date: "12 August 2026",
    time: "11:00 AM",
    venue: "The Garden Pavilion",
    address: "Jaipur, Rajasthan",
    description:
      "Join us for the naming ceremony as we seek blessings for our little one.",
    icon: Flower2,
    accent: "primary",
  },
  {
    id: "dinner",
    title: "Dinner",
    date: "12 August 2026",
    time: "7:00 PM",
    venue: "The Garden Pavilion",
    address: "Jaipur, Rajasthan",
    description:
      "Stay for a warm meal and celebrate together with love and laughter.",
    icon: UtensilsCrossed,
    accent: "accent",
  },
];
