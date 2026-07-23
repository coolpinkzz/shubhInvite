import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center rounded-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label="ShubhInvite home"
    >
      <Image
        src="/shubhInviteLogo.png"
        alt="ShubhInvite"
        width={220}
        height={88}
        priority={priority}
        className="h-10 w-auto object-contain transition-opacity duration-300 ease-luxury group-hover:opacity-90 sm:h-11"
      />
    </Link>
  );
}
