import { Flower2, Heart, Music, Sparkles } from "lucide-react";

import haldiCanva from "@/assests/haldicanva.png";
import mehndiCanva from "@/assests/mehndicanva.png";
import sangeetCanva from "@/assests/sangeetcanva.png";
import weddingCanva from "@/assests/weddingcanva.png";
import receptionCanva from "@/assests/receptioncanva.png";

import type { WeddingEvent } from "./types";

export const weddingEvents: WeddingEvent[] = [
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "22 December 2026",
    time: "10:00 AM",
    venue: "The Royal Courtyard",
    address: "Jaipur, Rajasthan",
    description:
      "Join us as we celebrate the vibrant Haldi ceremony filled with love, laughter, and blessings.",
    icon: Flower2,
    accent: "accent",
    cardVariant: "invitation",
    invitationImage: haldiCanva,
  },
  {
    id: "mehandi",
    title: "Mehandi Ceremony",
    date: "23 December 2026",
    time: "10:00 AM",
    venue: "The Royal Courtyard",
    address: "Jaipur, Rajasthan",
    description:
      "Join us as we celebrate the vibrant Mehandi ceremony filled with love, laughter, and blessings.",
    icon: Flower2,
    accent: "accent",
    cardVariant: "invitation",
    invitationImage: mehndiCanva,
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    date: "23 December 2026",
    time: "7:00 PM",
    venue: "Grand Palace Banquet",
    address: "Jaipur, Rajasthan",
    description:
      "An evening of music, dance, and unforgettable memories with our loved ones.",
    icon: Music,
    accent: "primary",
    cardVariant: "invitation",
    invitationImage: sangeetCanva,
  },
  {
    id: "wedding",
    title: "Wedding Ceremony",
    date: "25 December 2026",
    time: "11:30 AM",
    venue: "Shree Palace",
    address: "Jaipur, Rajasthan",
    description:
      "Witness the sacred wedding rituals as we begin our forever together.",
    icon: Heart,
    accent: "primary",
    cardVariant: "invitation",
    invitationImage: weddingCanva,
  },
  {
    id: "reception",
    title: "Reception",
    date: "26 December 2026",
    time: "7:00 PM",
    venue: "Royal Celebration Hall",
    address: "Jaipur, Rajasthan",
    description:
      "Celebrate our new journey together with dinner, music, and joyful moments.",
    icon: Sparkles,
    accent: "accent",
    cardVariant: "invitation",
    invitationImage: receptionCanva,
  },
];
