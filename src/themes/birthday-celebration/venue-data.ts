import type { VenueLocationProps } from "@/themes/royal-wedding/sections/VenueLocation/types";

export const birthdayCelebrationVenue: Omit<
  VenueLocationProps,
  "title" | "subtitle" | "className"
> = {
  venueName: "Sunset Garden Lawn",
  address: "Carter Road, Bandra West\nMumbai, Maharashtra\nIndia 400050",
  eventName: "Aanya's Web Party",
  date: "Saturday, 22 August 2026",
  time: "4:00 PM",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8!2d72.819!3d19.055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8c0c0c0c0c1%3A0x1!2sCarter%20Road%20Bandra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsUrl:
    "https://www.google.com/maps/search/Carter+Road+Bandra+West+Mumbai",
};
