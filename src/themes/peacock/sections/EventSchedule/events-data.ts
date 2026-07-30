import { Flower2, Heart, Music, Sparkles } from "lucide-react";

import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

import { invitationData } from "../../components/themeData";

export const peacockEvents: WeddingEvent[] = [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "19 November 2026",
    time: "10:00 AM",
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "A morning of turmeric blessings, laughter, and golden light as we begin the festivities.",
    icon: Flower2,
    accent: "accent",
  },
  {
    id: "mehendi",
    title: "Mehendi Ceremony",
    date: "20 November 2026",
    time: "4:00 PM",
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "Intricate henna, soft music, and cherished company as love is painted into every motif.",
    icon: Flower2,
    accent: "accent",
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    date: "20 November 2026",
    time: "7:30 PM",
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "An evening of melody, dance, and celebration beneath peacock-blue skies.",
    icon: Music,
    accent: "primary",
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    date: invitationData.date,
    time: "11:00 AM",
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "Witness our sacred vows as two souls unite with the blessings of family and tradition.",
    icon: Heart,
    accent: "primary",
  },
  {
    id: "reception",
    title: "Reception",
    date: invitationData.date,
    time: invitationData.time,
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "Join us for an elegant evening of dinner, music, and joyful celebration.",
    icon: Sparkles,
    accent: "accent",
  },
];
