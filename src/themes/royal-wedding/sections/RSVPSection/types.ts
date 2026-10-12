export interface RSVPFormData {
  name: string;
  guests: number;
  attending: boolean | null;
  events: string[];
  message: string;
}

export interface RSVPEventOption {
  id: string;
  label: string;
  emoji: string;
}

export interface RSVPSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  events?: RSVPEventOption[];
  /** Places the guest count under "Will you attend?" instead of above it. */
  guestsAfterAttendance?: boolean;
  onSubmit?: (data: RSVPFormData) => Promise<void>;
}
