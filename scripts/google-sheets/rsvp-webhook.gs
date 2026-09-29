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
 * Each invitation (theme id) gets its own tab, created on the first RSVP.
 */

const HEADERS = ["Submitted At", "Guest Name", "Attending", "Guests", "Events", "Message"];
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
      sheet.appendRow([
        Utilities.formatDate(new Date(row.submittedAt), TIME_ZONE, "dd MMM yyyy, hh:mm a"),
        row.name,
        row.attending,
        row.guests,
        row.events,
        row.message,
      ]);
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
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#F7D9C4");
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(5, 260);
    sheet.setColumnWidth(6, 360);
  }

  return sheet;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
