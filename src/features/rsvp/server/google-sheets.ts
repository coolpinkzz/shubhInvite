import type { RSVPSubmission } from "@/features/rsvp/schemas/rsvp-form.schema";

const REQUEST_TIMEOUT_MS = 10_000;

export interface GoogleSheetsConfig {
  webhookUrl: string;
  secret: string;
}

export function getGoogleSheetsConfig(): GoogleSheetsConfig | null {
  const webhookUrl = process.env.GOOGLE_SHEETS_RSVP_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_RSVP_SECRET;
  if (!webhookUrl || !secret) return null;
  return { webhookUrl, secret };
}

/** Sheets runs cells starting with these characters as formulas. */
function neutralizeFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

interface WebhookResponse {
  ok: boolean;
  error?: string;
}

function isWebhookResponse(value: unknown): value is WebhookResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    typeof value.ok === "boolean"
  );
}

export async function appendRsvpToGoogleSheet(
  submission: RSVPSubmission,
  config: GoogleSheetsConfig,
): Promise<void> {
  const { invitationId, response, eventLabels } = submission;

  const payload = {
    secret: config.secret,
    sheetName: invitationId,
    row: {
      submittedAt: new Date().toISOString(),
      name: neutralizeFormula(response.name),
      attending: response.attending ? "Yes" : "No",
      guests: response.attending ? response.guests : 0,
      events: eventLabels.map(neutralizeFormula).join(", "),
      message: neutralizeFormula(response.message.trim()),
    },
  };

  const res = await fetch(config.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Google Sheets webhook responded with ${res.status}`);
  }

  const body: unknown = await res.json().catch(() => null);
  if (!isWebhookResponse(body) || !body.ok) {
    const reason = isWebhookResponse(body) ? body.error : "invalid response";
    throw new Error(`Google Sheets webhook rejected the RSVP: ${reason}`);
  }
}
