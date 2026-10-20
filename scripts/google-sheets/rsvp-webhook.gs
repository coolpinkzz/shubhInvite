/**
 * ShubhInvite — RSVP → Google Sheets webhook.
 *
 * Setup:
 *   1. Create a Google Sheet → Extensions → Apps Script. Paste this file and save.
 *   2. Project Settings → Script Properties → add `RSVP_SECRET` with a long random value.
 *   3. Deploy → New deployment → type "Web app".
 *        Execute as: Me   ·   Who has access: Anyone
 *   4. Copy the Web app URL into `.env.local`:
 *        GOOGLE_SHEETS_RSVP_WEBHOOK_URL=<web app url>
 *        GOOGLE_SHEETS_RSVP_SECRET=<same value as RSVP_SECRET>
 *
 * After editing this script, use Deploy → Manage deployments → Edit → New version,
 * otherwise the web app keeps running the old code.
 *
 * RSVPs are appended to the RSVP-Details tab, created on the first response.
 */

const HEADERS = [
  "Submitted At",
  "Invitation",
  "Guest Name",
  "Attending",
  "Guests",
  "Events",
  "Message",
];

const COLUMN_WIDTHS = {
  "Submitted At": 170,
  Invitation: 150,
  "Guest Name": 200,
  Attending: 170,
  Guests: 140,
  Events: 280,
  Message: 360,
};
const TIME_ZONE = "Asia/Kolkata";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("RSVP_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return json({ ok: false, error: "unauthorized" });
    }

    const row = payload.row;
    if (!row || typeof row.name !== "string" || !row.name) {
      return json({ ok: false, error: "invalid row" });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getOrCreateSheet(String(payload.sheetName || "RSVPs"));
      appendRsvpRow(sheet, row);
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet(name) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const safeName = name.replace(/[\[\]\*\?\/\\:]/g, "-").slice(0, 100);
  let sheet = spreadsheet.getSheetByName(safeName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(safeName);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    styleHeaderRow(sheet, HEADERS.length);
    HEADERS.forEach(function (header, index) {
      sheet.setColumnWidth(index + 1, COLUMN_WIDTHS[header] || 140);
    });
  }

  ensureHeaders(sheet, HEADERS);
  return sheet;
}

/** Writes each value under its header, so older tabs keep their column order. */
function appendRsvpRow(sheet, row) {
  const width = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0];
  const values = {
    "Submitted At": Utilities.formatDate(
      new Date(row.submittedAt),
      TIME_ZONE,
      "dd MMM yyyy, hh:mm a",
    ),
    Invitation: row.invitation || "",
    "Guest Name": row.name,
    Attending: row.attending,
    Guests: row.guests,
    Events: row.events,
    Message: row.message,
  };

  sheet.appendRow(
    headers.map(function (header) {
      return Object.prototype.hasOwnProperty.call(values, header) ? values[header] : "";
    }),
  );
}

/** Adds any column this version expects that an older tab does not have yet. */
function ensureHeaders(sheet, required) {
  const width = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0].filter(String);

  required.forEach(function (header) {
    if (headers.indexOf(header) !== -1) return;
    const column = sheet.getLastColumn() + 1;
    sheet.getRange(1, column).setValue(header);
    styleHeaderRow(sheet, column);
    sheet.setColumnWidth(column, COLUMN_WIDTHS[header] || 140);
    headers.push(header);
  });
}

function styleHeaderRow(sheet, columnCount) {
  sheet
    .getRange(1, 1, 1, columnCount)
    .setFontWeight("bold")
    .setBackground("#F7D9C4");
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
