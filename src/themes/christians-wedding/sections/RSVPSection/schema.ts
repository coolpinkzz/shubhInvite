import { z } from "zod";

export const rsvpSchema = z
  .object({
    name: z.string().trim().min(1, "Please enter your full name"),
    guests: z.number().min(1).max(5),
    attending: z
      .boolean()
      .nullable()
      .refine((value) => value !== null, {
        message: "Please let us know if you'll be attending",
      }),
    events: z.array(z.string()),
    message: z.string().max(300, "Message must be 300 characters or less"),
  })
  .refine((data) => !data.attending || data.events.length > 0, {
    message: "Please select at least one event you'll attend",
    path: ["events"],
  });

export type RSVPSchemaValues = z.infer<typeof rsvpSchema>;
