export const birthdayCelebrationConfig = {
  id: "birthday-celebration",
  name: "Birthday Celebration",
  celebrant: {
    firstName: "Aanya",
    fullName: "Aanya Mehra",
  },
  age: 5,
  parents: {
    mother: "Priya Mehra",
    father: "Arjun Mehra",
  },
  date: "Saturday, 22 Aug 2026",
  countdownTarget: "August 22, 2026 16:00:00",
  location: "Sunset Garden Lawn, Mumbai",
  brand: "Web Party",
  ageReveal: {
    hint: "Swipe the mask to reveal how old!",
    revealThreshold: 0.5,
  },
  copy: {
    title: "You're Invited!",
    subtitle: "Suit up for cake, webs, laughter & hero-level fun.",
    revealMessage: "Five years of web-slinging wonder — let's celebrate!",
    ctaPrimary: "See the Moments",
    ctaSecondary: "Mission Briefing",
    footerMessage:
      "With love and heroic joy, we invite you to celebrate our little web-slinger's special day. Your presence will make it unforgettable.",
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1588247562151-dc7367119ddd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Child blowing birthday candles",
      caption: "Candle wishes",
    },
    {
      src: "https://images.unsplash.com/photo-1610674632272-2d3e9a345453?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Colorful birthday balloons",
      caption: "Balloon sky",
    },
    {
      src: "https://images.unsplash.com/photo-1600022823656-7868164f5eaf?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Birthday party celebration",
      caption: "Party vibes",
    },
    {
      src: "https://images.unsplash.com/photo-1774641373770-a4c33a2651ab?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Birthday cake with sprinkles",
      caption: "Sweet slices",
    },
  ],
} as const;
