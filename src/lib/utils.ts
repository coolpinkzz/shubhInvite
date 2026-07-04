import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-body-sm",
        "text-body-md",
        "text-body-lg",
        "text-caption",
        "text-overline",
        "text-heading-sm",
        "text-heading-md",
        "text-heading-lg",
        "text-display-sm",
        "text-display-md",
        "text-display-lg",
        "text-display-xl",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
