import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-body font-medium tracking-wider uppercase",
    "rounded-full transition-colors duration-300",
  ],
  {
    variants: {
      variant: {
        default: "bg-ivory-200 text-charcoal-800 border border-border",
        gold: "bg-gold-200/60 text-gold-700 border border-gold-400/30",
        maroon: "bg-maroon-800/10 text-maroon-800 border border-maroon-800/20",
        emerald: "bg-emerald-800/10 text-emerald-800 border border-emerald-700/20",
        outline: "bg-transparent text-charcoal-700 border border-charcoal-900/20",
        dark: "bg-charcoal-900 text-ivory-50 border border-charcoal-800",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[length:var(--text-overline)]",
        md: "px-3 py-1 text-[length:var(--text-caption)]",
        lg: "px-4 py-1.5 text-[length:var(--text-body-sm)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
