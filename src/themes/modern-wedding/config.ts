export const modernWeddingConfig = {
  id: "modern-wedding",
  name: "Modern Wedding",
  couple: {
    bride: "Priya Mehta",
    groom: "Arjun Kapoor",
  },
  date: "Saturday, 14 Mar 2027",
  countdownTarget: "March 14, 2027 00:00:00",
  location: "The Glasshouse, Bandra West, Mumbai",
  brand: "Modern Union",
  scratchCard: {
    weddingDate: "14 March 2027",
    revealThreshold: 0.55,
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      alt: "Couple laughing together outdoors",
      caption: "Our beginning",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      alt: "Bride and groom walking hand in hand",
      caption: "Side by side",
    },
    {
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
      alt: "Elegant bridal portrait",
      caption: "A quiet moment",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      alt: "Wedding rings on a minimal table setting",
      caption: "Forever starts here",
    },
  ],
  coupleImage: {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    alt: "Priya and Arjun sharing a joyful moment",
  },
} as const;
