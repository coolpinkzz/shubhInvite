import { z } from "zod";

import { rsvpSchema } from "@/features/rsvp/schemas/rsvp-form.schema";

function isContactNumber(value: string) {
  const compact = value.replace(/[\s-]/g, "");
  if (!/^\+?\d+$/.test(compact)) return false;
  const digits = compact.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

/** Light guest-details form. Contact number is required for this invitation. */
export const guestDetailsSchema = rsvpSchema.refine(
  (data) => isContactNumber(data.phone),
  {
    message: "Please enter a valid contact number",
    path: ["phone"],
  },
);

export type GuestDetailsInput = z.input<typeof guestDetailsSchema>;
export type GuestDetailsValues = z.output<typeof guestDetailsSchema>;
