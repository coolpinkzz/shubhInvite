import Image from "next/image";

import ivorySideflower from "@/assests/ivorySideflower.png";
import { cn } from "@/lib/utils";

export type FloralCornerPosition = "bottom-left" | "bottom-right";

export interface FloralCornerProps {
  position: FloralCornerPosition;
  className?: string;
}

const sizeClasses = "h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28";

/** Anchor to maroon card bottom corners — half overlaps onto cream below */
const positionClasses: Record<FloralCornerPosition, string> = {
  "bottom-left":
    "bottom-[80px] left-0 translate-y-1/2 -translate-x-[18%] sm:-translate-x-[15%]",
  "bottom-right":
    "bottom-[80px] right-[70px] translate-y-1/2 translate-x-[18%] sm:translate-x-[15%]",
};

const transformClasses: Record<FloralCornerPosition, string> = {
  "bottom-left": "origin-bottom-left scale-y-[-1]",
  "bottom-right": "origin-bottom-right scale-x-[-1] scale-y-[-1]",
};

export function FloralCorner({ position, className }: FloralCornerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-40",
        sizeClasses,
        positionClasses[position],
        className,
      )}
      aria-hidden="true"
    >
      <div className={cn("size-full", transformClasses[position])}>
        <Image
          src={ivorySideflower}
          alt=""
          width={220}
          height={220}
          className="size-full object-contain"
        />
      </div>
    </div>
  );
}
