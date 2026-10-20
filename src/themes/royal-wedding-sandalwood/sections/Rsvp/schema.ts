import { z } from "zod";

import { rsvpSchema } from "@/features/rsvp/schemas/rsvp-form.schema";

/** Guest details for this invitation. Contact number is not collected. */
export const guestDetailsSchema = rsvpSchema;

export type GuestDetailsInput = z.input<typeof guestDetailsSchema>;
export type GuestDetailsValues = z.output<typeof guestDetailsSchema>;
