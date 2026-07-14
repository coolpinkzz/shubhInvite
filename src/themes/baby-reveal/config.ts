export const babyRevealConfig = {
  id: "baby-reveal",
  name: "Baby Name Reveal",
  parents: {
    mother: "Ananya Sharma",
    father: "Rahul Sharma",
  },
  babyName: "Aaradhya",
  revealDate: "Saturday, 15 Aug 2026",
  countdownTarget: "August 15, 2026 18:00:00",
  location: "The Garden Pavilion, Jaipur",
  brand: "Little Secret",
  scratchCard: {
    hint: "Scratch to Reveal Our Baby's Name ✨",
    revealThreshold: 0.55,
  },
  copy: {
    title: "One Little Secret...",
    subtitle: "Our greatest blessing has finally arrived.",
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
