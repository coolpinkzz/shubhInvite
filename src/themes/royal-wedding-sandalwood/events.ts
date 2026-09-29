import { defaultRSVPEvents } from "@/themes/royal-wedding/sections/RSVPSection";

export const SANDALWOOD_EVENT_IDS: readonly string[] = [
  "haldi",
  "wedding",
  "reception",
];

export const sandalwoodRSVPEvents = defaultRSVPEvents.filter((event) =>
  SANDALWOOD_EVENT_IDS.includes(event.id),
);
