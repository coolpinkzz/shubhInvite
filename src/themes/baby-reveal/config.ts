export const babyRevealConfig = {
  id: "baby-reveal",
  name: "Naming Ceremony",
  parents: {
    mother: "Priya",
    father: "Vaibhav",
  },
  babyName: "Viaan",
  revealDate: "Wednesday, 12 Aug 2026",
  countdownTarget: "August 12, 2026 11:00:00",
  location: "The Garden Pavilion, Jaipur",
  brand: "Kuan Puja",
  scratchCard: {
    hint: "Scratch to Reveal the Name",
    revealThreshold: 0.55,
  },
  copy: {
    inviteLine:
      "With the blessings of elders and family, we invite you to grace the",
    title: "Naming Ceremony",
    subtitle: "of our beloved son",
    revealMessage:
      "Your presence and blessings will add to the joy of this special day.",
    ctaPrimary: "View Invitation",
    ctaSecondary: "Celebrate With Us",
    parentsOverline: "Proud Parents",
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      alt: "Family celebration moments",
      caption: "Cherished beginnings",
    },
    {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      alt: "Family celebration moments",
      caption: "Cherished beginnings",
    },
    {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      alt: "Family celebration moments",
      caption: "Cherished beginnings",
    },
  ],
} as const;
