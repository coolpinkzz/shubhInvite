/**
 * Royal Wedding — customer details form.
 *
 * Usage:
 *   1. Open https://script.google.com → New project.
 *   2. Paste this file, save, select `createRoyalWeddingForm`, click Run.
 *   3. Approve permissions. The edit + share links are printed in the execution log.
 *
 * Fields map to `src/themes/royal-wedding` (config.ts, EventSchedule/events-data.ts,
 * VenueLocation/venue-data.ts, RSVPSection/events-data.ts).
 */

const FORM_TITLE = "Royal Wedding Invitation — Your Details";

const EVENTS = [
  { id: "haldi", title: "Haldi Ceremony" },
  { id: "mehandi", title: "Mehandi Ceremony" },
  { id: "sangeet", title: "Sangeet Night" },
  { id: "wedding", title: "Wedding Ceremony" },
  { id: "reception", title: "Reception" },
];

const INDIAN_PHONE = "^(\\+91[\\s-]?)?[6-9]\\d{9}$";

function createRoyalWeddingForm() {
  const form = FormApp.create(FORM_TITLE)
    .setDescription(
      "Thank you for choosing ShubhInvite 🙏\n" +
        "Please fill in the details below to create your Royal Wedding invitation. " +
        "It takes about 10 minutes. Fields marked * are required.",
    )
    .setCollectEmail(true)
    .setProgressBar(true)
    .setConfirmationMessage(
      "Thank you! 💐 We have received your details and will share the first preview of your invitation on WhatsApp soon.",
    );

  addContactSection(form);
  addCoupleSection(form);
  addWeddingDateSection(form);
  addVenueSection(form);

  const eventPages = EVENTS.map((event) => addEventSection(form, event));

  const photosPage = addPhotosSection(form);
  addRsvpSection(form);
  addMusicAndNotesSection(form);

  wireEventNavigation(eventPages, photosPage);

  const sheet = SpreadsheetApp.create(`${FORM_TITLE} (Responses)`);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log("Edit form:   " + form.getEditUrl());
  Logger.log("Share link:  " + form.getPublishedUrl());
  Logger.log("Responses:   " + sheet.getUrl());
}

function addContactSection(form) {
  form.addSectionHeaderItem().setTitle("Your Contact Details");

  form.addTextItem().setTitle("Your full name").setRequired(true);

  form
    .addTextItem()
    .setTitle("WhatsApp number")
    .setHelpText("We will share previews and the final link here.")
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .requireTextMatchesPattern(INDIAN_PHONE)
        .setHelpText("Enter a valid 10-digit Indian mobile number.")
        .build(),
    );

  form
    .addMultipleChoiceItem()
    .setTitle("You are filling this form as")
    .setChoiceValues(["Bride", "Groom", "Bride's family", "Groom's family", "Wedding planner"])
    .showOtherOption(true)
    .setRequired(true);
}

function addCoupleSection(form) {
  form
    .addPageBreakItem()
    .setTitle("The Couple 💑")
    .setHelpText("Shown in large gold letters at the top of your invitation.");

  form
    .addTextItem()
    .setTitle("Bride's name")
    .setHelpText("Exactly as it should appear, e.g. Isha Verma")
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Groom's name")
    .setHelpText("Exactly as it should appear, e.g. Mohit Singh")
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle("Whose name should come first?")
    .setChoiceValues(["Bride first (Isha & Mohit)", "Groom first (Mohit & Isha)"])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Invitation title / monogram")
    .setHelpText('A short title shown on the invitation, e.g. "Royal Union" or "#MoIsha". Leave blank to use "Royal Union".');
}

function addWeddingDateSection(form) {
  form
    .addPageBreakItem()
    .setTitle("Wedding Date 📅")
    .setHelpText("Used for the scratch-to-reveal date card and the live countdown.");

  form.addDateItem().setTitle("Wedding date").setRequired(true);

  form
    .addTimeItem()
    .setTitle("Muhurat / ceremony start time")
    .setHelpText("The countdown on the invitation ends at this time.")
    .setRequired(true);
}

function addVenueSection(form) {
  form
    .addPageBreakItem()
    .setTitle("Main Venue 📍")
    .setHelpText("Shown on the venue card with a Google Map and a Directions button.");

  form
    .addTextItem()
    .setTitle("Venue name")
    .setHelpText("e.g. Royal Palace Convention Center")
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("Full venue address")
    .setHelpText("Street, area, city, state, PIN code.")
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Google Maps link of the venue")
    .setHelpText("Open the venue in Google Maps → Share → Copy link, and paste it here.")
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .requireTextIsUrl()
        .setHelpText("Paste a valid link starting with https://")
        .build(),
    );
}

/** Returns the page breaks that start and continue this event, for navigation wiring. */
function addEventSection(form, event) {
  const gatePage = form
    .addPageBreakItem()
    .setTitle(event.title)
    .setHelpText("Each event gets its own illustrated card on the invitation.");

  const includeQuestion = form
    .addMultipleChoiceItem()
    .setTitle(`Should the invitation include the ${event.title}?`)
    .setRequired(true);

  const detailsPage = form.addPageBreakItem().setTitle(`${event.title} — Details`);

  form.addDateItem().setTitle(`${event.title} — date`).setRequired(true);
  form.addTimeItem().setTitle(`${event.title} — start time`).setRequired(true);
  form.addTextItem().setTitle(`${event.title} — venue name`).setRequired(true);
  form
    .addTextItem()
    .setTitle(`${event.title} — city / address`)
    .setHelpText("e.g. Jaipur, Rajasthan")
    .setRequired(true);
  form
    .addParagraphTextItem()
    .setTitle(`${event.title} — short message (optional)`)
    .setHelpText("One or two lines for guests. Leave blank and we will write a beautiful one for you.");
  form
    .addTextItem()
    .setTitle(`${event.title} — dress code (optional)`)
    .setHelpText("e.g. Yellow / Traditional / Pastel");

  return { gatePage, includeQuestion, detailsPage };
}

/** "Yes" opens the event's details page; "No" skips straight to the next event. */
function wireEventNavigation(eventPages, pageAfterEvents) {
  eventPages.forEach((page, index) => {
    const next = eventPages[index + 1];
    const skipTarget = next ? next.gatePage : pageAfterEvents;

    page.includeQuestion.setChoices([
      page.includeQuestion.createChoice("Yes", page.detailsPage),
      page.includeQuestion.createChoice("No", skipTarget),
    ]);
  });
}

function addPhotosSection(form) {
  const page = form
    .addPageBreakItem()
    .setTitle("Photos 📸")
    .setHelpText(
      "The invitation has a photo album slider with up to 4 photos.\n\n" +
        "Upload your photos to a Google Drive folder, set sharing to \"Anyone with the link can view\", and paste the link below. " +
        "Portrait photos in high quality work best.",
    );

  form
    .addTextItem()
    .setTitle("Google Drive folder link with your photos")
    .setHelpText("Leave blank if you want us to use elegant stock images instead.")
    .setValidation(
      FormApp.createTextValidation()
        .requireTextIsUrl()
        .setHelpText("Paste a valid link starting with https://")
        .build(),
    );

  form
    .addParagraphTextItem()
    .setTitle("Captions for the photos (optional)")
    .setHelpText('One caption per line, in the same order as the photos, e.g.\nTogether, forever\nA moment of grace');

  return page;
}

function addRsvpSection(form) {
  form
    .addPageBreakItem()
    .setTitle("RSVP 💌")
    .setHelpText("Guests will confirm attendance, number of guests and events directly on the invitation.");

  form
    .addDateItem()
    .setTitle("RSVP last date (optional)")
    .setHelpText("Guests will be asked to respond before this date.");

  form
    .addTextItem()
    .setTitle("Contact number for guests (optional)")
    .setHelpText("Shown to guests who want to call for help or directions.")
    .setValidation(
      FormApp.createTextValidation()
        .requireTextMatchesPattern(INDIAN_PHONE)
        .setHelpText("Enter a valid 10-digit Indian mobile number.")
        .build(),
    );
}

function addMusicAndNotesSection(form) {
  form.addPageBreakItem().setTitle("Music & Final Touches 🎶");

  const musicChoice = form
    .addMultipleChoiceItem()
    .setTitle("Background music")
    .setRequired(true);
  musicChoice.setChoices([
    musicChoice.createChoice("Use the default royal instrumental"),
    musicChoice.createChoice("I want a specific song"),
    musicChoice.createChoice("No music"),
  ]);

  form
    .addTextItem()
    .setTitle("Song name or YouTube link (if you chose a specific song)");

  form
    .addTextItem()
    .setTitle("Preferred invitation link name (optional)")
    .setHelpText("e.g. isha-weds-mohit → shubhinvite.com/isha-weds-mohit");

  form
    .addParagraphTextItem()
    .setTitle("Anything else we should know?")
    .setHelpText("Special requests, family names to mention, blessings, etc.");

  form
    .addCheckboxItem()
    .setTitle("Confirmation")
    .setChoiceValues(["I confirm that the names, dates and venue details above are correct."])
    .setRequired(true);
}
