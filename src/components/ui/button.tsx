import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-body text-body-sm font-medium tracking-wide",
    "rounded-md transition-all duration-300 ease-luxury",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-maroon-800 text-primary-foreground",
          "hover:bg-maroon-700 active:bg-maroon-900",
          "shadow-soft hover:shadow-elevated",
        ],
        gold: [
          "bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600",
          "text-charcoal-900 font-semibold",
          "hover:from-gold-500 hover:via-gold-400 hover:to-gold-500",
          "shadow-gold hover:shadow-elevated",
        ],
        outline: [
          "border border-charcoal-900/20 bg-transparent text-charcoal-900",
          "hover:border-gold-500 hover:text-maroon-800",
          "active:bg-ivory-200",
        ],
        ghost: [
          "bg-transparent text-charcoal-700",
          "hover:bg-ivory-200 hover:text-charcoal-900",
          "active:bg-ivory-300",
        ],
        link: [
          "bg-transparent text-maroon-800 underline-offset-4",
          "hover:underline hover:text-maroon-700",
          "p-0 h-auto",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "shadow-soft",
        ],
      },
      size: {
        sm: "h-9 px-4 text-caption",
        md: "h-11 px-6 text-body-sm",
        lg: "h-12 px-8 text-body-md",
        xl: "h-14 px-10 text-body-lg",
        icon: "h-11 w-11",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">Loading</span>
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
