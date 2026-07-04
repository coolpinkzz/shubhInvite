import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Heading, Text, AccentText } from "@/components/ui/typography";
import { buttonVariants } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="texture-noise">
      <Section spacing="xl" background="gradient">
        <Container size="md">
          <div className="flex flex-col items-center text-center gap-8 animate-fade-in-up">
            <Text size="overline" color="gold" className="tracking-[0.3em]">
              ShubhInvite
            </Text>
            <Heading level="displayLg" color="primary" className="text-balance">
              Where tradition meets timeless elegance
            </Heading>
            <AccentText className="text-4xl sm:text-5xl">
              शुभ विवाह
            </AccentText>
            <Text size="lg" color="muted" className="max-w-lg text-pretty">
              A luxury design system for digital wedding invitations — inspired
              by Apple&apos;s restraint, Cartier&apos;s gold, and the grandeur
              of Indian royal weddings.
            </Text>
            <Divider variant="ornament" spacing="md" className="max-w-xs" />
            <Link
              href="/design-system"
              className={cn(buttonVariants({ variant: "gold", size: "lg" }))}
            >
              Explore Design System
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
