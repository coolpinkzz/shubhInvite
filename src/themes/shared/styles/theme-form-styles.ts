import { cn } from "@/lib/utils";

export function themeFormLabelClass(className?: string) {
  return cn(
    "block font-theme-label text-[10px] font-semibold uppercase tracking-[0.14em] text-muted",
    className,
  );
}

export function themeFormLegendClass(className?: string) {
  return cn("mb-3 block", themeFormLabelClass(), className);
}

export function themeFormControlClass({
  error,
  className,
}: {
  error?: string;
  className?: string;
} = {}) {
  return cn(
    "w-full rounded-2xl border border-accent/25 bg-white/60 px-4 py-3.5",
    "font-theme-body text-[15px] text-foreground",
    "placeholder:text-theme-subtle/50",
    "shadow-[inset_0_1px_2px_var(--theme-border-subtle)]",
    "transition-all duration-300",
    "focus:border-accent focus:bg-white focus:outline-none",
    "focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--theme-accent)_20%,transparent),0_4px_16px_color-mix(in_srgb,var(--theme-accent)_12%,transparent)]",
    error && "border-primary/50 focus:border-primary",
    className,
  );
}

export function themeFormErrorClass(className?: string) {
  return cn("font-theme-body text-sm text-primary", className);
}

export function themeSelectorOptionClass(
  isSelected: boolean,
  className?: string,
) {
  return cn(
    "border transition-all duration-300",
    isSelected
      ? "border-accent bg-theme-secondary-container/50 shadow-[var(--theme-shadow-button)]"
      : "border-accent/20 bg-white/50 hover:border-accent/40",
    className,
  );
}
