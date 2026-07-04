import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ElementType } from "react";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-display text-balance tracking-tight", {
  variants: {
    level: {
      displayXl: "text-[length:var(--text-display-xl)] leading-[1.1] font-light",
      displayLg: "text-[length:var(--text-display-lg)] leading-[1.12] font-light",
      displayMd: "text-[length:var(--text-display-md)] leading-[1.15] font-normal",
      displaySm: "text-[length:var(--text-display-sm)] leading-[1.2] font-normal",
      h1: "text-[length:var(--text-display-md)] leading-[1.15] font-normal",
      h2: "text-[length:var(--text-heading-lg)] leading-[1.25] font-medium",
      h3: "text-[length:var(--text-heading-md)] leading-[1.3] font-medium",
      h4: "text-[length:var(--text-heading-sm)] leading-[1.35] font-medium",
    },
    color: {
      default: "text-charcoal-900",
      muted: "text-charcoal-600",
      primary: "text-maroon-800",
      gold: "text-gold-gradient",
      ivory: "text-ivory-50",
      accent: "font-accent text-[length:var(--text-display-sm)] font-normal",
    },
  },
  defaultVariants: {
    level: "h2",
    color: "default",
  },
});

const headingElementMap = {
  displayXl: "h1",
  displayLg: "h1",
  displayMd: "h1",
  displaySm: "h2",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
} as const;

export interface HeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: ElementType;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", color, as, children, ...props }, ref) => {
    const Component = as ?? headingElementMap[level ?? "h2"];

    return (
      <Component
        ref={ref as never}
        className={cn(headingVariants({ level, color, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Heading.displayName = "Heading";

const textVariants = cva("font-body text-pretty", {
  variants: {
    size: {
      lg: "text-[length:var(--text-body-lg)] leading-relaxed",
      md: "text-[length:var(--text-body-md)] leading-normal",
      sm: "text-[length:var(--text-body-sm)] leading-normal",
      caption: "text-[length:var(--text-caption)] leading-normal",
      overline: "text-[length:var(--text-overline)] uppercase tracking-widest font-medium",
    },
    color: {
      default: "text-charcoal-900",
      muted: "text-muted",
      primary: "text-maroon-800",
      gold: "text-gold-600",
      ivory: "text-ivory-200",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, color, weight, as: Component = "p", ...props }, ref) => (
    <Component
      ref={ref as never}
      className={cn(textVariants({ size, color, weight, className }))}
      {...props}
    />
  ),
);
Text.displayName = "Text";

type AccentTextProps = HTMLAttributes<HTMLSpanElement>;

const AccentText = forwardRef<HTMLSpanElement, AccentTextProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-accent text-[length:var(--text-display-sm)] text-gold-600 leading-none",
        className,
      )}
      {...props}
    />
  ),
);
AccentText.displayName = "AccentText";

export { Heading, Text, AccentText, headingVariants, textVariants };
export type { AccentTextProps };
