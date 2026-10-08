import { Flower2, Heart, Music, Palette, Sparkles } from "lucide-react";

import type { RSVPEventOption } from "@/themes/royal-wedding/sections/RSVPSection";
import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule";

const NAGESWAR_MAPS = "https://maps.app.goo.gl/YPnzPzP2BxqakaREA?g_st=ic";

export const sandalwoodEvents: WeddingEvent[] = [
  {
    id: "sangeet",
    title: "Sangeet",
    hostedBy: "Hosted by the Bride",
    date: "Wednesday, 9 December 2026",
    time: "7:00 PM onwards",
    venue: "Community Hall, Nageswar Residency",
    address: "Patia",
    description:
      "An evening of music, dance, and celebration as the bride's family welcomes you.",
    icon: Music,
    accent: "primary",
    mapsUrl: NAGESWAR_MAPS,
  },
  {
    id: "mehendi",
    title: "Mehendi",
    hostedBy: "Hosted by the Bride",
    date: "Thursday, 10 December 2026",
    time: "4:00 PM onwards",
    venue: "Community Hall, Nageswar Residency",
    address: "Patia",
    description:
      "Mehendi, colour, and laughter with the bride's family before the wedding day.",
    icon: Palette,
    accent: "accent",
    mapsUrl: NAGESWAR_MAPS,
  },
  {
    id: "haldi-groom",
    title: "Haldi",
    hostedBy: "Hosted by the Groom",
    date: "Friday, 11 December 2026",
    time: "9:00 AM onwards",
    venue: "Raja Rani Enclave",
    address: "Gosaninuagan, Brahmapur",
    description:
      "A morning of turmeric, blessings, and joy for the groom with the Patnaik family.",
    icon: Flower2,
    accent: "accent",
    mapsUrl: "https://maps.app.goo.gl/mwgGZHMAGCqiQMQ59?g_st=ic",
  },
  {
    id: "haldi-bride",
    title: "Haldi",
    hostedBy: "Hosted by the Bride",
    date: "Friday, 11 December 2026",
    time: "10:00 AM onwards",
    venue: "Casa Royal",
    address: "Trisulia, Cuttack",
    description:
      "A morning of turmeric, blessings, and joy for the bride with the Parija family.",
    icon: Flower2,
    accent: "primary",
    mapsUrl: "https://share.google/9aDcHuCXpp4E1xE0O",
  },
  {
    id: "wedding",
    title: "Wedding",
    hostedBy: "Hosted by Both Families",
    date: "Friday, 11 December 2026",
    time: "7:00 PM onwards",
    venue: "Casa Royal",
    address: "Trisulia, Cuttack",
    description:
      "With the blessings of both families, Susri Sangita and Manoranjan begin their life together.",
    icon: Heart,
    accent: "primary",
    mapsUrl: "https://maps.app.goo.gl/CB1uLvrFRRtr4krQA?g_st=ic",
  },
  {
    id: "reception",
    title: "Reception",
    hostedBy: "Hosted by the Groom",
    date: "Sunday, 13 December 2026",
    time: "7:00 PM onwards",
    venue: "Golden Palace",
    address: "Gosaninuagan, Brahmapur",
    description:
      "Dinner, music, and blessings as the groom's family welcomes you to celebrate the newlyweds.",
    icon: Sparkles,
    accent: "accent",
    mapsUrl: "https://maps.app.goo.gl/UoChgqpQFEuEu2fK9?g_st=iw",
  },
];

export const sandalwoodRSVPEvents: RSVPEventOption[] = [
  { id: "sangeet", label: "Sangeet", emoji: "🎵" },
  { id: "mehendi", label: "Mehendi", emoji: "🌿" },
  { id: "haldi-bride", label: "Haldi · Bride", emoji: "🌼" },
  { id: "haldi-groom", label: "Haldi · Groom", emoji: "🌼" },
  { id: "wedding", label: "Wedding", emoji: "❤️" },
  { id: "reception", label: "Reception", emoji: "✨" },
];
