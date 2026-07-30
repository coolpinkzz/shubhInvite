import { invitationData } from "./components/themeData";

export const peacockVenue = {
  venueName: invitationData.venue,
  address: invitationData.address,
  eventName: "Wedding Ceremony & Reception",
  date: `${invitationData.day}, ${invitationData.date}`,
  time: invitationData.time,
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.3!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${invitationData.venue}, ${invitationData.address}`,
  )}`,
} as const;
