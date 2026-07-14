import Image from "next/image";

import goldenDivider from "@/assests/golden-divider.png";
import { cn } from "@/lib/utils";

export interface DecorativeBorderProps {
  className?: string;
}

export function DecorativeBorder({ className }: DecorativeBorderProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[220px] py-1.5 sm:max-w-[240px]",
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src={goldenDivider}
        alt=""
        width={240}
        height={24}
        className="mx-auto h-4 w-full object-contain sm:h-5"
      />
    </div>
  );
}
