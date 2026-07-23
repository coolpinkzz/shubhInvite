import { Check, Star } from "lucide-react";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  "AI Generated",
  "Instant Sharing",
  "RSVP Tracking",
  "Beautiful Templates",
] as const;

interface TrustRowProps {
  className?: string;
}

export function TrustRow({ className }: TrustRowProps) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div
          className="flex items-center gap-0.5 text-gold-500"
          aria-label="5 out of 5 stars"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="size-3.5 fill-current"
              aria-hidden="true"
            />
          ))}
        </div>
        <Text size="sm" className="font-medium text-maroon-900/70">
          Loved by Event Planners · 10,000+ Invitations Created
        </Text>
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-2.5" role="list">
        {TRUST_ITEMS.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-1.5 font-body text-caption text-maroon-900/75 sm:text-body-sm"
          >
            <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-maroon-800/10 text-maroon-800">
              <Check className="size-2.5 stroke-[3]" aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
