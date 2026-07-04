import {
  defaultVenue,
  EventSchedule,
  RoyalWeddingHero,
  RSVPSection,
  VenueLocation,
} from "@/themes/royal-wedding";

export default function TemplatesPage() {
  return (
    <>
      <RoyalWeddingHero />
      <div className="royal-wedding">
        <EventSchedule />
        <VenueLocation {...defaultVenue} />
        <RSVPSection />
      </div>
    </>
  );
}
