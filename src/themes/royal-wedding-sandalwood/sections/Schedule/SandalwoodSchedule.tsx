"use client";

import { EventSchedule } from "@/themes/royal-wedding/sections/EventSchedule";
import type { InviteSide } from "@/types/theme";

import {
  sandalwoodEventsForSide,
  sideScheduleCopy,
  fullScheduleCopy,
} from "../../events";

interface SandalwoodScheduleProps {
  side?: InviteSide;
}

export function SandalwoodSchedule({ side }: SandalwoodScheduleProps) {
  const events = sandalwoodEventsForSide(side);
  const copy = side ? sideScheduleCopy[side] : fullScheduleCopy;

  return (
    <EventSchedule
      events={events}
      title={copy.scheduleTitle}
      subtitle={copy.scheduleSubtitle}
    />
  );
}
