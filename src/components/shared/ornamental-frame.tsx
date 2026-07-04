import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface OrnamentalFrameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "gold" | "maroon" | "subtle";
}

const frameVariants = {
  gold: "border-gold-400/50 before:border-gold-300/30 after:border-gold-300/30",
  maroon: "border-maroon-700/40 before:border-maroon-600/20 after:border-maroon-600/20",
  subtle: "border-ivory-300 before:border-ivory-200 after:border-ivory-200",
};

const OrnamentalFrame = forwardRef<HTMLDivElement, OrnamentalFrameProps>(
  ({ className, variant = "gold", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative border p-1",
        "before:absolute before:inset-2 before:border before:pointer-events-none",
        "after:absolute after:inset-4 after:border after:pointer-events-none",
        frameVariants[variant],
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  ),
);
OrnamentalFrame.displayName = "OrnamentalFrame";

export { OrnamentalFrame };
