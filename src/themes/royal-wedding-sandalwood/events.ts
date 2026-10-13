import { Flower2, Heart, Music, Palette, Sparkles } from "lucide-react";

import susriHaldi from "@/assests/susriHaldi.png";
import susriMehandi from "@/assests/susriMehandi .png";
import susriSangeet from "@/assests/SusriSangeet.png";
import susriWedding from "@/assests/susriWedding.png";
import type { RSVPEventOption } from "@/themes/royal-wedding/sections/RSVPSection";
import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule";
import type { InviteSide } from "@/types/theme";

const NAGESWAR_MAPS = "https://maps.app.goo.gl/YPnzPzP2BxqakaREA?g_st=ic";
const CASA_ROYAL_MAPS = "https://maps.app.goo.gl/CB1uLvrFRRtr4krQA?g_st=ic";

type SandalwoodEvent = WeddingEvent & { sides: readonly InviteSide[] };

export const sandalwoodEvents: SandalwoodEvent[] = [
  {
    id: "sangeet",
    sides: ["bride"],
    cardVariant: "invitation",
    invitationImage: susriSangeet,
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
    sides: ["bride"],
    cardVariant: "invitation",
    invitationImage: susriMehandi,
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
    sides: ["groom"],
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
    sides: ["bride"],
    cardVariant: "invitation",
    invitationImage: susriHaldi,
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
    mapsUrl: CASA_ROYAL_MAPS,
  },
  {
    id: "wedding",
    sides: ["bride", "bride-wedding"],
    cardVariant: "invitation",
    invitationImage: susriWedding,
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
    mapsUrl: CASA_ROYAL_MAPS,
  },
  {
    id: "reception",
    sides: ["groom"],
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

export const fullScheduleCopy = {
  scheduleTitle: "The Celebrations",
  scheduleSubtitle:
    "From Patia to Cuttack and Brahmapur, every gathering has a place for you.",
  rsvpSubtitle:
    "Your presence is the greatest gift. Let us know which celebrations you can join.",
  showWeddingVenue: true,
  venueSubtitle:
    "Susri Sangita and Manoranjan will be married here. Directions for every other celebration are on the cards above.",
} as const;

export const sideScheduleCopy: Record<
  InviteSide,
  {
    scheduleTitle: string;
    scheduleSubtitle: string;
    rsvpSubtitle: string;
    showWeddingVenue: boolean;
    venueSubtitle: string;
  }
> = {
  bride: {
    scheduleTitle: "The Celebrations",
    scheduleSubtitle:
      "From joyful melodies to cherished traditions, join us as we celebrate love, laughter, and the beginning of our forever.",
    rsvpSubtitle:
      "Your presence is the greatest gift. Let us know which celebrations you can join.",
    showWeddingVenue: false,
    venueSubtitle: "",
  },
  groom: {
    scheduleTitle: "The Celebrations",
    scheduleSubtitle: "Haldi and the reception, hosted by the groom's family.",
    rsvpSubtitle:
      "Your presence is the greatest gift. Let us know which celebrations you can join.",
    showWeddingVenue: false,
    venueSubtitle: "",
  },
  "bride-wedding": {
    scheduleTitle: "The Wedding",
    scheduleSubtitle:
      "The wedding, from the bride's family. Susri Sangita and Manoranjan begin their life together.",
    rsvpSubtitle:
      "Your presence is the greatest gift. Let us know if you can join the wedding.",
    showWeddingVenue: true,
    venueSubtitle: "Susri Sangita and Manoranjan will be married here.",
  },
};

export function sandalwoodCopyForSide(side?: InviteSide) {
  return side ? sideScheduleCopy[side] : fullScheduleCopy;
}

/** Plain RSVP options only, so a Server Component can pass them to the form. */
export function sandalwoodEventsForSide(side?: InviteSide) {
  if (!side) return sandalwoodEvents;
  return sandalwoodEvents.filter((event) => event.sides.includes(side));
}

export function sandalwoodRsvpEventsForSide(side?: InviteSide) {
  const eventIds = new Set(
    sandalwoodEventsForSide(side).map((event) => event.id),
  );

  return sandalwoodRSVPEvents.filter((event) => eventIds.has(event.id));
}
