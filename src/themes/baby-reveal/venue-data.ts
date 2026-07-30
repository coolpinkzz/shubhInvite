import type { VenueLocationProps } from "@/themes/royal-wedding/sections/VenueLocation/types";

const ADDRESS =
  "278, Shalimar Garden, Ext-1, Sahibabad, Ghaziabad, U.P-201005";

export const babyRevealVenue: Omit<
  VenueLocationProps,
  "title" | "subtitle" | "className"
> = {
  venueName: "Shalimar Garden",
  address: ADDRESS,
  eventName: "Naming Ceremony · Kuan Puja",
  date: "Wednesday, 12 August 2026",
  time: "11:00 AM",
  embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
};
