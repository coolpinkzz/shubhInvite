import { invitationData } from "./components/themeData";

export const peacockConfig = {
  id: "peacock",
  name: "Peacock Theme",
  couple: {
    bride: invitationData.bride,
    groom: invitationData.groom,
  },
  date: `${invitationData.day}, ${invitationData.date}`,
  countdownTarget: "November 21, 2026 18:30:00",
  location: `${invitationData.venue}, ${invitationData.address}`,
  brand: "Peacock Theme",
  scratchCard: {
    weddingDate: invitationData.date,
    revealThreshold: 0.55,
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
      alt: `${invitationData.bride} and ${invitationData.groom}`,
      caption: "A promise sealed in tradition",
    },
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
      alt: `${invitationData.bride} and ${invitationData.groom} — celebration`,
      caption: "Colors of celebration",
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
      alt: `${invitationData.bride} and ${invitationData.groom} — forever begins`,
      caption: "Where forever begins",
    },
  ],
  coupleImage: {
    src: "/themes/peacock/peacock-feather.png",
    alt: `${invitationData.bride} and ${invitationData.groom} peacock motif`,
  },
  invitation: invitationData,
} as const;

export type PeacockConfig = typeof peacockConfig;
