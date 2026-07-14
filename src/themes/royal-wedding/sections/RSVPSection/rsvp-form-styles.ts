import { cn } from "@/lib/utils";

/** Dark royal RSVP card — deep maroon with gold accents */
export const rsvpCardClassName = cn(
  "bg-[linear-gradient(180deg,var(--theme-primary)_0%,var(--theme-primary)_55%,var(--theme-primary-container)_100%)]",
  "border-accent/55",
  "shadow-[0_16px_48px_-12px_rgba(91,6,23,0.45),0_0_0_1px_rgba(212,175,55,0.18)]",
  "before:via-accent",
  "after:border-accent/30",
);

export function rsvpLabelClass(className?: string) {
  return cn(
    "block font-theme-label text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--theme-accent-light)]",
    className,
  );
}

export function rsvpControlClass({
  error,
  className,
}: {
  error?: string;
  className?: string;
} = {}) {
  return cn(
    "w-full rounded-2xl border border-accent/40 bg-surface px-4 py-3.5",
    "font-theme-body text-[15px] text-foreground",
    "placeholder:text-theme-subtle/55",
    "shadow-[inset_0_1px_2px_rgba(91,6,23,0.1)]",
    "transition-all duration-300",
    "focus:border-accent focus:bg-surface focus:outline-none",
    "focus:shadow-[0_0_0_3px_rgba(212,175,55,0.3),0_4px_16px_rgba(212,175,55,0.2)]",
    error && "border-[var(--theme-accent-light)] focus:border-[var(--theme-accent-light)]",
    className,
  );
}

export function rsvpSelectorOptionClass(
  isSelected: boolean,
  className?: string,
) {
  return cn(
    "rounded-2xl border transition-all duration-300",
    isSelected
      ? "border-accent bg-accent/25 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.5)]"
      : "border-accent/30 bg-white/10 hover:border-accent/50 hover:bg-white/15",
    className,
  );
}

export function rsvpErrorClass(className?: string) {
  return cn(
    "font-theme-body text-sm text-[var(--theme-accent-light)]",
    className,
  );
}
