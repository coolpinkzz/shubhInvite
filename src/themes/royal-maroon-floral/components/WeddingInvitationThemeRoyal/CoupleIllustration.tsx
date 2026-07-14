import Image from "next/image";

import weddingCouple from "@/assests/wedding-couple.png";
import { cn } from "@/lib/utils";

export interface CoupleIllustrationProps {
  className?: string;
}

export function CoupleIllustration({ className }: CoupleIllustrationProps) {
  return (
    <div
      className={cn(
        "animate-fade-in animate-delay-500 mx-auto w-full max-w-[200px] py-1 sm:max-w-[240px]",
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src={weddingCouple}
        alt=""
        width={480}
        height={480}
        priority
        className="mx-auto h-auto w-full object-contain"
      />
    </div>
  );
}
