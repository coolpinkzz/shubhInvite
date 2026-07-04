import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type Ref } from "react";
import { cn } from "@/lib/utils";

const dividerVariants = cva("flex items-center gap-4 w-full", {
  variants: {
    variant: {
      simple: "",
      ornament: "",
      dotted: "",
      gradient: "",
    },
    spacing: {
      sm: "my-4",
      md: "my-8",
      lg: "my-12",
      xl: "my-16",
    },
  },
  defaultVariants: {
    variant: "ornament",
    spacing: "md",
  },
});

export interface DividerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string;
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant, spacing, label, ...props }, ref) => {
    if (variant === "simple") {
      return (
        <hr
          ref={ref as Ref<HTMLHRElement>}
          className={cn(
            "border-0 h-px bg-border w-full",
            spacing === "sm" && "my-4",
            spacing === "md" && "my-8",
            spacing === "lg" && "my-12",
            spacing === "xl" && "my-16",
            className,
          )}
          role="separator"
          {...(props as HTMLAttributes<HTMLHRElement>)}
        />
      );
    }

    if (variant === "gradient") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(dividerVariants({ spacing, className }))}
          {...props}
        >
          <div className="ornament-line flex-1" aria-hidden="true" />
        </div>
      );
    }

    if (variant === "dotted") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(dividerVariants({ spacing, className }))}
          {...props}
        >
          <div className="flex-1 border-t border-dotted border-gold-400/50" aria-hidden="true" />
          <div className="ornament-dot shrink-0" aria-hidden="true" />
          <div className="flex-1 border-t border-dotted border-gold-400/50" aria-hidden="true" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(dividerVariants({ variant: "ornament", spacing, className }))}
        {...props}
      >
        <div className="ornament-line flex-1" aria-hidden="true" />
        {label ? (
          <span className="font-accent text-2xl text-gold-500 shrink-0 px-2" aria-hidden="true">
            {label}
          </span>
        ) : (
          <div className="ornament-dot shrink-0" aria-hidden="true" />
        )}
        <div className="ornament-line flex-1" aria-hidden="true" />
      </div>
    );
  },
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
