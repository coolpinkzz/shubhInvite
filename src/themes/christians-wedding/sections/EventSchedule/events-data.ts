import { Church, Heart, Sparkles } from "lucide-react";

import { ASSET_BASE, invitationData } from "../../components/constants";

import type { WeddingEvent } from "./types";

export const christiansWeddingEvents: WeddingEvent[] = [
  {
    id: "rehearsal",
    title: "Rehearsal Dinner",
    date: "14 June 2023",
    time: "7:00 PM",
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "Join our families for an intimate evening of prayer, laughter, and warm welcome before the big day.",
    icon: Sparkles,
    cardVariant: "invitation",
    invitationImage: `${ASSET_BASE}/rehearsal_dinner_invitation.jpg`,
  },
  {
    id: "reception",
    title: "Wedding Reception",
    date: invitationData.date,
    time: "6:00 PM",
    venue: invitationData.venue,
    address: invitationData.address,
    description:
      "Celebrate with us over dinner, dancing, and joyful fellowship as we start this new chapter together.",
    icon: Heart,
    cardVariant: "invitation",
    invitationImage: `${ASSET_BASE}/wedding_reception_invitation.png`,
  },
];
