import { invitationData } from "./components/constants";

export const christiansWeddingVenue = {
  venueName: invitationData.venue,
  address: `${invitationData.address}`,
  eventName: "Holy Matrimony & Reception",
  date: `${invitationData.day}, ${invitationData.date}`,
  time: invitationData.time,
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573891234!2d-73.987!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMTMuMiJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${invitationData.venue}, ${invitationData.address}`,
  )}`,
} as const;
