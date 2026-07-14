import { Flower2, Heart, Music, Sparkles } from "lucide-react";

import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

export const royalMaroonFloralEvents: WeddingEvent[] = [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "22 December 2026",
    time: "10:00 AM",
    venue: "The Royal Courtyard",
    address: "Jaipur, Rajasthan",
    description: "Join us to bless the couple.",
    icon: Flower2,
    accent: "accent",
    cardVariant: "invitation",
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    date: "27 July 2026",
    time: "7:00 PM",
    venue: "The Grand Palace Banquet",
    address: "Any City, ST",
    description:
      "Dance, dine, and celebrate the union of two families under the stars.",
    icon: Music,
    accent: "primary",
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    date: "28 July 2026",
    time: "8:00 AM",
    venue: "The Grand Palace Banquet",
    address: "Any City, ST",
    description:
      "Join us as we exchange vows and begin our journey of forever together.",
    icon: Heart,
    accent: "primary",
  },
  {
    id: "reception",
    title: "Reception",
    date: "28 July 2026",
    time: "7:00 PM",
    venue: "The Grand Palace Banquet",
    address: "Any City, ST",
    description:
      "An elegant evening of dinner, toasts, and celebration with our loved ones.",
    icon: Sparkles,
    accent: "accent",
  },
];
