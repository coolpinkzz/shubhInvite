import type { VenueLocationProps } from "@/themes/royal-wedding/sections/VenueLocation";

export const weddingVenue: Omit<
  VenueLocationProps,
  "title" | "subtitle" | "className" | "petals"
> = {
  venueName: "Casa Royal",
  address: "Trisulia, Cuttack",
  eventName: "Wedding Ceremony",
  date: "Friday, 11 December 2026",
  time: "7:00 PM onwards",
  embedUrl:
    "https://www.google.com/maps?q=Casa+Royal,+Trisulia,+Cuttack&output=embed",
  googleMapsUrl: "https://maps.app.goo.gl/CB1uLvrFRRtr4krQA?g_st=ic",
};
