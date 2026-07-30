import { Flower2, UtensilsCrossed } from "lucide-react";

import type { BabyRevealEvent } from "./EventCard";

const VENUE = "Shalimar Garden";
const ADDRESS = "278, Shalimar Garden, Ext-1, Sahibabad, Ghaziabad, U.P-201005";
const GOOGLE_MAPS_URL = `https://maps.app.goo.gl/dcJws7qSx14yS7iQ9?g_st=ic`;

export const babyRevealEvents: BabyRevealEvent[] = [
  {
    id: "kuan-puja",
    title: "Namkaran",
    date: "12 August 2026",
    time: "10:00 AM",
    venue: VENUE,
    address: ADDRESS,
    description:
      "Join us for the naming ceremony as we seek blessings for our little one.",
    icon: Flower2,
    googleMapsUrl: GOOGLE_MAPS_URL,
  },
  {
    id: "dinner",
    title: "Dinner",
    date: "12 August 2026",
    time: "7:00 PM onwards",
    venue: "LA Deliche",
    address: "Ghaziabad, Uttar Pradesh",
    description:
      "Stay for a warm meal and celebrate together with love and laughter.",
    icon: UtensilsCrossed,
    googleMapsUrl: "https://maps.app.goo.gl/FhTpr7RqYN7yzbzD7",
  },
];
