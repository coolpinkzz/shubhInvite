import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import type { IncomingHttpHeaders } from "node:http";

import type { RSVPSubmission } from "@/features/rsvp/schemas/rsvp-form.schema";
import type { InviteSide } from "@/types/theme";

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

const INVITATION_LABEL: Record<InviteSide, string> = {
  bride: "Bride",
  groom: "Groom",
  "bride-wedding": "Bride Wedding",
};

const PARTY_SIZE_LABEL: Record<number, string> = {
  1: "I (Just me)",
  2: "2 Guests",
  3: "3 Guests",
  4: "4 Guests",
  5: "5+ Guests",
};

export async function appendRsvpToGoogleSheet(
  submission: RSVPSubmission,
  config: GoogleSheetsConfig,
): Promise<void> {
  const { response, eventLabels, side } = submission;
  const attending = response.attending === true;

  const payload = {
    secret: config.secret,
    sheetName: "RSVP-Details",
    row: {
      submittedAt: new Date().toISOString(),
      invitation: side ? INVITATION_LABEL[side] : "All",
      name: neutralizeFormula(response.name),
      attending: attending ? "Joyfully Accept" : "Regretfully Decline",
      guests: attending ? (PARTY_SIZE_LABEL[response.guests] ?? String(response.guests)) : "",
      events: attending ? eventLabels.map(neutralizeFormula).join(", ") : "",
      message: neutralizeFormula(response.message.trim()),
    },
  };

  const body = await postAppsScriptWebhook(
    config.webhookUrl,
    JSON.stringify(payload),
  );
  if (!isWebhookResponse(body) || !body.ok) {
    const reason = isWebhookResponse(body) ? body.error : "invalid response";
    throw new Error(`Google Sheets webhook rejected the RSVP: ${reason}`);
  }
}

interface RawResponse {
  status: number;
  headers: IncomingHttpHeaders;
  body: string;
}

/**
 * Apps Script answers the POST with a redirect. Following that redirect as
 * another POST is rejected with 401. The redirected URL must be fetched with GET.
 */
async function postAppsScriptWebhook(url: string, body: string): Promise<unknown> {
  let current = await requestOnce(url, { method: "POST", body });

  for (let hop = 0; hop < 5 && current.status >= 300 && current.status < 400; hop++) {
    const location = current.headers.location;
    const next = Array.isArray(location) ? location[0] : location;
    if (!next) break;
    current = await requestOnce(new URL(next, url).toString(), { method: "GET" });
  }

  if (current.status < 200 || current.status >= 300) {
    throw new Error(`Google Sheets webhook responded with ${current.status}`);
  }

  try {
    return JSON.parse(current.body) as unknown;
  } catch {
    return null;
  }
}

function requestOnce(
  url: string,
  init: { method: "GET" | "POST"; body?: string },
): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const transport = target.protocol === "http:" ? httpRequest : httpsRequest;
    const payload = init.body ?? "";
    const req = transport(
      target,
      {
        method: init.method,
        headers:
          init.method === "POST"
            ? {
                "Content-Type": "text/plain;charset=utf-8",
                "Content-Length": Buffer.byteLength(payload),
              }
            : undefined,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );

    req.setTimeout(REQUEST_TIMEOUT_MS, () => {
      req.destroy(new Error("Google Sheets webhook timed out"));
    });
    req.on("error", reject);
    if (init.method === "POST") req.write(payload);
    req.end();
  });
}
