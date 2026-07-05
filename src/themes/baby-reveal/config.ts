export const babyRevealConfig = {
  id: "baby-reveal",
  name: "Baby Gender Reveal",
  parents: {
    mother: "Ananya Sharma",
    father: "Rahul Sharma",
  },
  revealDate: "Saturday, 15 Aug 2026",
  countdownTarget: "August 15, 2026 18:00:00",
  location: "The Garden Pavilion, Jaipur",
  brand: "Little Secret",
  gender: "girl" as const,
  copy: {
    title: "One Little Secret...",
    subtitle: "Our greatest blessing has finally arrived.",
    instruction: "Tap the balloon to reveal",
    revealMessage: "Our hearts are overflowing with joy.",
    ctaPrimary: "View Invitation",
    ctaSecondary: "Celebrate With Us",
    parentsOverline: "Proud Parents",
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      alt: "Expectant couple holding hands outdoors",
      caption: "Two hearts, one dream",
    },
    {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      alt: "Expectant couple holding hands outdoors",
      caption: "Two hearts, one dream",
    },
    {
      src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
      alt: "Expectant couple holding hands outdoors",
      caption: "Two hearts, one dream",
    },
  ],
} as const;
