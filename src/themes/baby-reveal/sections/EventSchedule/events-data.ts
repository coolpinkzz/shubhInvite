import { Baby, Flower2, Gift, UtensilsCrossed } from "lucide-react";

import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

export const babyRevealEvents: WeddingEvent[] = [
  {
    id: "welcome",
    title: "Welcome & Blessings",
    date: "12 August 2026",
    time: "10:00 AM",
    venue: "The Garden Pavilion",
    address: "Jaipur, Rajasthan",
    description:
      "Arrive with warm wishes as we gather to celebrate this sacred beginning.",
    icon: Gift,
    accent: "accent",
  },
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
    id: "meet-baby",
    title: "Meet the Little One",
    date: "12 August 2026",
    time: "12:30 PM",
    venue: "The Garden Pavilion",
    address: "Jaipur, Rajasthan",
    description:
      "Share smiles, blessings, and precious first moments with the family.",
    icon: Baby,
    accent: "accent",
  },
  {
    id: "lunch",
    title: "Family Lunch",
    date: "12 August 2026",
    time: "1:30 PM",
    venue: "The Garden Pavilion",
    address: "Jaipur, Rajasthan",
    description:
      "Stay for a warm meal and celebrate together with love and laughter.",
    icon: UtensilsCrossed,
    accent: "primary",
  },
];
