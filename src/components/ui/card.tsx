import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  [
    "relative overflow-hidden rounded-xl",
    "transition-all duration-500 ease-luxury",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-card text-card-foreground",
          "border border-border/60",
          "shadow-soft",
        ],
        elevated: [
          "bg-card text-card-foreground",
          "shadow-elevated",
          "hover:shadow-luxury",
        ],
        bordered: [
          "bg-transparent",
          "border border-gold-400/40",
          "hover:border-gold-500/60",
        ],
        luxury: [
          "bg-gradient-to-br from-ivory-100 via-ivory-50 to-ivory-200",
          "border border-gold-300/30",
          "shadow-luxury",
        ],
        dark: [
          "bg-maroon-900 text-ivory-50",
          "border border-gold-500/20",
          "shadow-luxury",
        ],
        glass: [
          "bg-ivory-50/80 backdrop-blur-md",
          "border border-ivory-300/50",
          "shadow-soft",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-4 sm:p-5",
        md: "p-6 sm:p-8",
        lg: "p-8 sm:p-10",
        xl: "p-10 sm:p-12",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 active:translate-y-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive, className }))}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display text-heading-md font-medium tracking-tight text-charcoal-900",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-body-sm text-muted leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 pt-4", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
