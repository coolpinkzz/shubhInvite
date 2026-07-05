import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { buttonVariants } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { templates } from "@/lib/templates";
import { cn } from "@/lib/utils";

export default function TemplateIndexPage() {
  return (
    <main className="texture-noise min-h-dvh">
      <Section spacing="xl" background="gradient">
        <Container size="md">
          <div className="flex flex-col items-center gap-8 text-center">
            <Text size="overline" color="gold" className="tracking-[0.3em]">
              ShubhInvite
            </Text>
            <Heading level="displayMd" color="primary">
              Wedding Templates
            </Heading>
            <Text size="lg" color="muted" className="max-w-lg">
              Choose a template to preview a cinematic wedding invitation
              experience.
            </Text>
            <Divider variant="ornament" spacing="md" className="max-w-xs" />

            <ul className="grid w-full max-w-md gap-4">
              {templates.map((template) => (
                <li key={template.slug}>
                  <Link
                    href={`/template/${template.slug}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "flex h-auto w-full flex-col items-start gap-2 px-6 py-5 text-left",
                    )}
                  >
                    <span className="font-[family-name:var(--font-cormorant)] text-xl font-medium text-[var(--color-primary)]">
                      {template.name}
                    </span>
                    <span className="text-sm font-normal text-[var(--color-muted)]">
                      {template.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </main>
  );
}
