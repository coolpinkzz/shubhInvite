import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ThemeCardRadius = "2xl" | "3xl";
export type ThemeCardPadding = "default" | "loose";

export type ThemeCardProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  as?: T;
  radius?: ThemeCardRadius;
  padding?: ThemeCardPadding;
  borderClassName?: string;
  innerInsetClassName?: string;
  topInsetClassName?: string;
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const radiusClasses: Record<
  ThemeCardRadius,
  { outer: string; innerAfter: string }
> = {
  "2xl": { outer: "rounded-2xl", innerAfter: "after:rounded-xl" },
  "3xl": { outer: "rounded-3xl", innerAfter: "after:rounded-2xl" },
};

const paddingClasses: Record<ThemeCardPadding, string> = {
  default: "p-5",
  loose: "px-6 py-10",
};

export function themeCardClassName({
  radius = "3xl",
  padding = "default",
  borderClassName,
  innerInsetClassName,
  topInsetClassName,
  interactive = false,
  className,
}: Omit<ThemeCardProps, "children" | "as">) {
  const { outer, innerAfter } = radiusClasses[radius];

  return cn(
    "relative overflow-hidden border bg-surface",
    outer,
    paddingClasses[padding],
    "shadow-[var(--theme-shadow-card)]",
    borderClassName ?? "border-accent/25",
    topInsetClassName ?? "before:inset-x-5",
    "before:absolute before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-accent before:to-transparent",
    innerInsetClassName ?? "after:inset-2",
    "after:pointer-events-none after:absolute after:border after:border-primary/8",
    innerAfter,
    interactive &&
      "transition-shadow duration-300 group-active:shadow-[var(--theme-shadow-button)]",
    className,
  );
}

export function ThemeCard<T extends ElementType = "div">({
  children,
  className,
  as,
  radius = "3xl",
  padding = "default",
  borderClassName,
  innerInsetClassName,
  topInsetClassName,
  interactive = false,
  ...props
}: ThemeCardProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={themeCardClassName({
        radius,
        padding,
        borderClassName,
        innerInsetClassName,
        topInsetClassName,
        interactive,
        className,
      })}
      {...props}
    >
      {children}
    </Component>
  );
}
