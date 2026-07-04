import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ColorSwatchProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  hex: string;
  className?: string;
}

function ColorSwatch({ name, hex, className, style, ...props }: ColorSwatchProps) {
  return (
    <div className="flex flex-col gap-2" {...props}>
      <div
        className={cn(
          "h-16 w-full rounded-lg border border-charcoal-900/10 shadow-soft",
          className,
        )}
        style={{ backgroundColor: hex, ...style }}
        role="img"
        aria-label={`${name} color swatch`}
      />
      <div>
        <p className="text-body-sm font-medium text-charcoal-900">{name}</p>
        <p className="text-caption text-muted font-mono uppercase">{hex}</p>
      </div>
    </div>
  );
}

export { ColorSwatch };
