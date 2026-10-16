import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className }: GoldDividerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-[min(100%,12.5rem)] items-center gap-3",
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-[#C6A15A]" />
      <span className="font-theme-body text-[13px] leading-none text-[#C6A15A]">
        ✿
      </span>
      <span className="h-px flex-1 bg-[#C6A15A]" />
    </div>
  );
}
