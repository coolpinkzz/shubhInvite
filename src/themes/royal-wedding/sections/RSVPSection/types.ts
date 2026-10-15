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
  /** Hides the guest count until the guest accepts, then shows it under attendance. */
  guestsAfterAttendance?: boolean;
  onSubmit?: (data: RSVPFormData) => Promise<void>;
}
