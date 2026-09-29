import { z } from "zod";

export const rsvpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Please enter your full name")
      .max(100, "Name must be 100 characters or less"),
    guests: z.number().int().min(1).max(5),
    attending: z
      .boolean()
      .nullable()
      .refine((value) => value !== null, {
        message: "Please let us know if you'll be attending",
      }),
    events: z.array(z.string().max(50)).max(10),
    message: z
      .string()
      .max(300, "Message must be 300 characters or less"),
  })
  .refine(
    (data) => !data.attending || data.events.length > 0,
    {
      message: "Please select at least one event you'll attend",
      path: ["events"],
    },
  );

export type RSVPSchemaValues = z.infer<typeof rsvpSchema>;

export const rsvpSubmissionSchema = z.object({
  invitationId: z.string().trim().min(1).max(100),
  response: rsvpSchema,
  /** Human-readable labels for `response.events`, shown in the sheet. */
  eventLabels: z.array(z.string().max(100)).max(10),
});

export type RSVPSubmissionInput = z.input<typeof rsvpSubmissionSchema>;
export type RSVPSubmission = z.output<typeof rsvpSubmissionSchema>;
