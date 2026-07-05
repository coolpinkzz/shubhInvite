import type { LabelHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  themeFormErrorClass,
  themeFormLabelClass,
} from "@/themes/shared/styles/theme-form-styles";

export interface ThemeFormLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function ThemeFormLabel({
  children,
  className,
  ...props
}: ThemeFormLabelProps) {
  return (
    <label className={themeFormLabelClass(className)} {...props}>
      {children}
    </label>
  );
}

export interface ThemeFormLegendProps {
  children: ReactNode;
  className?: string;
}

export function ThemeFormLegend({ children, className }: ThemeFormLegendProps) {
  return (
    <legend className={cn("mb-3 block", themeFormLabelClass(), className)}>
      {children}
    </legend>
  );
}

export interface ThemeFormErrorProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function ThemeFormError({ children, id, className }: ThemeFormErrorProps) {
  return (
    <p id={id} role="alert" className={themeFormErrorClass(className)}>
      {children}
    </p>
  );
}

export {
  themeFormControlClass,
  themeFormErrorClass,
  themeFormLabelClass,
  themeFormLegendClass,
  themeSelectorOptionClass,
} from "@/themes/shared/styles/theme-form-styles";
