import type { VenueLocationProps } from "@/themes/royal-wedding/sections/VenueLocation/types";

export const modernVenue: Omit<
  VenueLocationProps,
  "title" | "subtitle" | "className"
> = {
  venueName: "The Glasshouse",
  address: "Waterfield Road\nBandra West, Mumbai\nMaharashtra 400050",
  eventName: "Wedding Ceremony",
  date: "Saturday, 14 March 2027",
  time: "4:00 PM",
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.653456789!2d72.8263!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBandra%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsUrl: "https://www.google.com/maps/search/The+Glasshouse+Bandra+West+Mumbai",
};
