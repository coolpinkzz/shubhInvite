"use server";

import {
  rsvpSubmissionSchema,
  type RSVPSubmissionInput,
} from "@/features/rsvp/schemas/rsvp-form.schema";
import {
  appendRsvpToGoogleSheet,
  getGoogleSheetsConfig,
} from "@/features/rsvp/server/google-sheets";

export type SubmitRsvpResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR =
  "We couldn't send your RSVP right now. Please try again in a moment.";

export async function submitRsvp(
  input: RSVPSubmissionInput,
): Promise<SubmitRsvpResult> {
  const parsed = rsvpSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and try again." };
  }

  const config = getGoogleSheetsConfig();
  if (!config) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[rsvp] GOOGLE_SHEETS_RSVP_WEBHOOK_URL / GOOGLE_SHEETS_RSVP_SECRET not set; RSVP not saved.",
        parsed.data,
      );
      return { ok: true };
    }
    console.error("[rsvp] Google Sheets is not configured.");
    return { ok: false, error: GENERIC_ERROR };
  }

  try {
    await appendRsvpToGoogleSheet(parsed.data, config);
    return { ok: true };
  } catch (error) {
    console.error("[rsvp] Failed to save RSVP to Google Sheets", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
