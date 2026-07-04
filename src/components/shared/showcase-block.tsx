import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/typography";

interface ShowcaseBlockProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
}

function ShowcaseBlock({
  title,
  description,
  className,
  children,
  ...props
}: ShowcaseBlockProps) {
  return (
    <section className={cn("space-y-6", className)} {...props}>
      <div className="space-y-2">
        <Heading level="h3" color="primary">
          {title}
        </Heading>
        {description && (
          <p className="text-body-sm text-muted max-w-2xl">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export { ShowcaseBlock };
