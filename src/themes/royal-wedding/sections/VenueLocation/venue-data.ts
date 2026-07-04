import type { VenueLocationProps } from "./types";

export const defaultVenue: Omit<
  VenueLocationProps,
  "title" | "subtitle" | "className"
> = {
  venueName: "Royal Palace Convention Center",
  address: "123 Wedding Avenue\nJaipur, Rajasthan\nIndia",
  eventName: "Wedding Ceremony",
  date: "Friday, 25 December 2026",
  time: "11:30 AM",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.947474839887!2d75.7872709!3d26.9124336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5b65e2fa4cf%3A0x4b9e3c3dfe3c3e3e!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsUrl:
    "https://www.google.com/maps/search/Royal+Palace+Convention+Center+Jaipur",
};
