import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-[640px]",
      md: "max-w-[768px]",
      lg: "max-w-[1024px]",
      xl: "max-w-[1280px]",
      "2xl": "max-w-[1400px]",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  ),
);
Container.displayName = "Container";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-[var(--spacing-section-sm)]",
      md: "py-[var(--spacing-section-md)]",
      lg: "py-[var(--spacing-section-lg)]",
      xl: "py-[var(--spacing-section-xl)]",
    },
    background: {
      default: "bg-background",
      ivory: "bg-ivory-100",
      maroon: "bg-maroon-900 text-ivory-50",
      emerald: "bg-emerald-900 text-ivory-50",
      gradient: "bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200",
    },
  },
  defaultVariants: {
    spacing: "md",
    background: "default",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ spacing, background, className }))}
      {...props}
    />
  ),
);
Section.displayName = "Section";

export { Container, Section, containerVariants, sectionVariants };
