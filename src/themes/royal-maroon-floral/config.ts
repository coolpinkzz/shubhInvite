export const royalMaroonFloralConfig = {
  id: "royal-maroon-floral",
  name: "Royal Maroon Floral Invitation",
  couple: {
    bride: "Prerna Singh",
    groom: "Sumit Gupta",
  },
  date: "Sunday, 28 July 2026",
  countdownTarget: "July 28, 2026 08:00:00",
  location: "123 Anywhere St, Any City, ST 12345",
  brand: "Royal Maroon Floral",
  scratchCard: {
    weddingDate: "28 July 2026",
    revealThreshold: 0.55,
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      alt: "Wedding couple sharing a joyful embrace",
      caption: "Together forever",
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
      alt: "Indian bride in traditional wedding attire",
      caption: "A moment of grace",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      alt: "Couple walking hand in hand at their wedding",
      caption: "Walking into forever",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      alt: "Wedding couple during traditional ceremonies",
      caption: "Blessed with love",
    },
  ],
  coupleImage: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Wedding couple in traditional attire",
  },
  invitation: {
    familiesLine: "Together with their families",
    message:
      "cordially invite you to join the celebration of their joyous commitment on",
    ceremonyTime: "8:00 AM",
    dayOfWeek: "SUNDAY",
    month: "JULY",
    day: "28",
    year: "2026",
    venueName: "The Grand Palace Banquet",
    rsvpDeadline: "17th June",
    rsvpPhone: "+91 98765 43210",
  },
} as const;

export type RoyalMaroonFloralConfig = typeof royalMaroonFloralConfig;
