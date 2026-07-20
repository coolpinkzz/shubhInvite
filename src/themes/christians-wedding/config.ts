import { invitationData } from "./components/constants";

export const christiansWeddingConfig = {
  id: "christians-wedding",
  name: "Christians Wedding",
  couple: {
    bride: invitationData.bride,
    groom: invitationData.groom,
  },
  date: `${invitationData.day}, ${invitationData.date}`,
  countdownTarget: "December 15, 2026 13:00:00",
  location: `${invitationData.venue}, ${invitationData.address}`,
  brand: "Christians Wedding",
  scratchCard: {
    weddingDate: invitationData.date,
    revealThreshold: 0.55,
  },
  photoAlbum: [
    {
      src: "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: `${invitationData.bride} and ${invitationData.groom}`,
      caption: "Together forever",
    },
    {
      src: "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: `${invitationData.bride} and ${invitationData.groom} — a quiet moment`,
      caption: "A quiet moment",
    },
    {
      src: "https://images.unsplash.com/photo-1618566864264-fb013f791da4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: `${invitationData.bride} and ${invitationData.groom} — beginning forever`,
      caption: "Beginning forever",
    },
  ],
  coupleImage: {
    src: "https://images.unsplash.com/photo-1721401870202-8e2264ecced2?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: `${invitationData.bride} and ${invitationData.groom} illustration`,
  },
  invitation: invitationData,
} as const;

export type ChristiansWeddingConfig = typeof christiansWeddingConfig;
