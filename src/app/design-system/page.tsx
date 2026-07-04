import type { Metadata } from "next";
import Link from "next/link";
import { ColorSwatch } from "@/components/shared/color-swatch";
import { OrnamentalFrame } from "@/components/shared/ornamental-frame";
import { ShowcaseBlock } from "@/components/shared/showcase-block";
import { Stack } from "@/components/shared/stack";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Divider } from "@/components/ui/divider";
import { FormField, Input } from "@/components/ui/input";
import { AccentText, Heading, Text } from "@/components/ui/typography";
import { colors } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: "Design System",
  description: "ShubhInvite luxury wedding design system reference",
};

export default function DesignSystemPage() {
  return (
    <main className="texture-noise">
      {/* Hero */}
      <Section spacing="lg" background="gradient">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <Badge variant="gold" size="lg">
              Design System v1.0
            </Badge>
            <Heading level="displayMd" color="primary">
              ShubhInvite Design Language
            </Heading>
            <AccentText className="text-5xl block">Elegance</AccentText>
            <Text size="lg" color="muted" className="text-pretty">
              A cohesive visual system blending Apple&apos;s minimalism,
              Cartier&apos;s golden refinement, and the regal warmth of Indian
              wedding traditions.
            </Text>
            <Link
              href="/"
              className="inline-block text-body-sm text-maroon-800 hover:underline underline-offset-4"
            >
              ← Back to home
            </Link>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container size="lg">
          <Stack gap="xl">
            {/* Typography */}
            <ShowcaseBlock
              title="Typography"
              description="Cormorant Garamond for display, Inter for body, Pinyon Script for accent moments."
            >
              <div className="grid gap-8 p-6 sm:p-8 rounded-xl bg-ivory-100 border border-border">
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Display XL
                  </Text>
                  <Heading level="displayXl">Arjun & Priya</Heading>
                </div>
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Display Large
                  </Text>
                  <Heading level="displayLg">Save the Date</Heading>
                </div>
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Display Medium
                  </Text>
                  <Heading level="displayMd">Wedding Celebration</Heading>
                </div>
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Heading
                  </Text>
                  <Heading level="h2">Ceremony Details</Heading>
                </div>
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Body Large
                  </Text>
                  <Text size="lg" color="muted">
                    Join us for an evening of love, laughter, and lifelong
                    commitment as we celebrate the union of two souls.
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Accent Script
                  </Text>
                  <AccentText className="text-6xl">With Love</AccentText>
                </div>
                <div className="space-y-2">
                  <Text size="overline" color="muted">
                    Overline
                  </Text>
                  <Text size="overline" color="gold">
                    December 14, 2026 · Udaipur
                  </Text>
                </div>
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Colors */}
            <ShowcaseBlock
              title="Color Palette"
              description="Ivory foundations, royal maroon, Cartier gold, and emerald accents."
            >
              <div className="space-y-8">
                <div>
                  <Text size="overline" color="muted" className="mb-4 block">
                    Ivory & Cream
                  </Text>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <ColorSwatch name="Ivory 50" hex={colors.ivory[50]} />
                    <ColorSwatch name="Ivory 100" hex={colors.ivory[100]} />
                    <ColorSwatch name="Ivory 200" hex={colors.ivory[200]} />
                    <ColorSwatch name="Ivory 300" hex={colors.ivory[300]} />
                  </div>
                </div>
                <div>
                  <Text size="overline" color="muted" className="mb-4 block">
                    Royal Maroon
                  </Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <ColorSwatch name="Maroon 950" hex={colors.maroon[950]} />
                    <ColorSwatch name="Maroon 900" hex={colors.maroon[900]} />
                    <ColorSwatch name="Maroon 800" hex={colors.maroon[800]} />
                    <ColorSwatch name="Maroon 700" hex={colors.maroon[700]} />
                    <ColorSwatch name="Maroon 600" hex={colors.maroon[600]} />
                    <ColorSwatch name="Maroon 500" hex={colors.maroon[500]} />
                  </div>
                </div>
                <div>
                  <Text size="overline" color="muted" className="mb-4 block">
                    Cartier Gold
                  </Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <ColorSwatch name="Gold 200" hex={colors.gold[200]} />
                    <ColorSwatch name="Gold 300" hex={colors.gold[300]} />
                    <ColorSwatch name="Gold 400" hex={colors.gold[400]} />
                    <ColorSwatch name="Gold 500" hex={colors.gold[500]} />
                    <ColorSwatch name="Gold 600" hex={colors.gold[600]} />
                    <ColorSwatch name="Gold 700" hex={colors.gold[700]} />
                  </div>
                </div>
                <div>
                  <Text size="overline" color="muted" className="mb-4 block">
                    Emerald & Charcoal
                  </Text>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                    <ColorSwatch name="Emerald 900" hex={colors.emerald[900]} />
                    <ColorSwatch name="Emerald 800" hex={colors.emerald[800]} />
                    <ColorSwatch name="Emerald 700" hex={colors.emerald[700]} />
                    <ColorSwatch name="Emerald 600" hex={colors.emerald[600]} />
                    <ColorSwatch
                      name="Charcoal 900"
                      hex={colors.charcoal[900]}
                    />
                    <ColorSwatch
                      name="Charcoal 700"
                      hex={colors.charcoal[700]}
                    />
                    <ColorSwatch
                      name="Charcoal 600"
                      hex={colors.charcoal[600]}
                    />
                    <ColorSwatch name="Rose 200" hex={colors.rose[200]} />
                  </div>
                </div>
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Spacing */}
            <ShowcaseBlock
              title="Spacing"
              description="Generous section rhythm with fluid clamp-based spacing for mobile-first layouts."
            >
              <div className="space-y-4 p-6 sm:p-8 rounded-xl bg-ivory-100 border border-border">
                {(["sm", "md", "lg", "xl"] as const).map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <Text
                      size="sm"
                      className="w-8 shrink-0 font-mono text-muted"
                    >
                      {size}
                    </Text>
                    <div
                      className="h-8 bg-gold-300/60 rounded-sm border border-gold-400/30"
                      style={{
                        width: `var(--spacing-section-${size})`,
                        maxWidth: "100%",
                      }}
                    />
                    <Text
                      size="caption"
                      color="muted"
                      className="font-mono hidden sm:block"
                    >
                      --spacing-section-{size}
                    </Text>
                  </div>
                ))}
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Buttons */}
            <ShowcaseBlock
              title="Buttons"
              description="Refined interactions with subtle shadows and gold accents."
            >
              <div className="space-y-8 p-6 sm:p-8 rounded-xl bg-ivory-100 border border-border">
                <Stack direction="horizontal" gap="md" align="center">
                  <Button variant="primary">RSVP Now</Button>
                  <Button variant="gold">Accept Invitation</Button>
                  <Button variant="outline">View Details</Button>
                  <Button variant="ghost">Share</Button>
                  <Button variant="link">Learn More</Button>
                </Stack>
                <Stack direction="horizontal" gap="md" align="center">
                  <Button variant="primary" size="sm">
                    Small
                  </Button>
                  <Button variant="primary" size="md">
                    Medium
                  </Button>
                  <Button variant="primary" size="lg">
                    Large
                  </Button>
                  <Button variant="gold" size="xl">
                    Extra Large
                  </Button>
                </Stack>
                <Stack direction="horizontal" gap="md" align="center">
                  <Button variant="gold" isLoading>
                    Submitting
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                  <Button variant="primary" fullWidth className="max-w-xs">
                    Full Width
                  </Button>
                </Stack>
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Cards */}
            <ShowcaseBlock
              title="Cards"
              description="Layered surfaces from subtle borders to luxury gradients."
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>
                      Soft shadow with ivory border
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" color="muted">
                      Perfect for event details and guest information.
                    </Text>
                  </CardContent>
                </Card>

                <Card variant="elevated" interactive>
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Hover to lift</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" color="muted">
                      Interactive cards for clickable event modules.
                    </Text>
                  </CardContent>
                </Card>

                <Card variant="luxury">
                  <CardHeader>
                    <CardTitle>Luxury Card</CardTitle>
                    <CardDescription>Gradient with gold border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" color="muted">
                      Hero sections and premium content blocks.
                    </Text>
                  </CardContent>
                </Card>

                <Card variant="bordered">
                  <CardHeader>
                    <CardTitle>Bordered Card</CardTitle>
                    <CardDescription>Gold outline accent</CardDescription>
                  </CardHeader>
                </Card>

                <Card variant="dark">
                  <CardHeader>
                    <CardTitle className="text-ivory-50">Dark Card</CardTitle>
                    <CardDescription className="text-ivory-200/70">
                      Maroon background
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="gold" size="sm">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Glass Card</CardTitle>
                    <CardDescription>Frosted backdrop blur</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Badges & Dividers */}
            <ShowcaseBlock
              title="Badges & Dividers"
              description="Ornamental separators and status indicators."
            >
              <div className="space-y-8 p-6 sm:p-8 rounded-xl bg-ivory-100 border border-border">
                <Stack direction="horizontal" gap="md" align="center">
                  <Badge>Default</Badge>
                  <Badge variant="gold">Gold</Badge>
                  <Badge variant="maroon">Maroon</Badge>
                  <Badge variant="emerald">Emerald</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="dark">Dark</Badge>
                </Stack>
                <Divider variant="simple" />
                <Divider variant="ornament" label="✦" />
                <Divider variant="dotted" />
                <Divider variant="gradient" />
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Form Inputs */}
            <ShowcaseBlock
              title="Form Inputs"
              description="Accessible form primitives ready for React Hook Form integration."
            >
              <div className="max-w-md space-y-6 p-6 sm:p-8 rounded-xl bg-ivory-100 border border-border">
                <FormField
                  label="Guest Name"
                  htmlFor="guest-name"
                  hint="As it appears on your invitation"
                  required
                >
                  <Input
                    id="guest-name"
                    placeholder="Enter your full name"
                    variant="luxury"
                  />
                </FormField>
                <FormField
                  label="Email Address"
                  htmlFor="guest-email"
                  error="Please enter a valid email address"
                >
                  <Input
                    id="guest-email"
                    type="email"
                    placeholder="you@example.com"
                    error
                  />
                </FormField>
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Ornamental Frame */}
            <ShowcaseBlock
              title="Ornamental Frame"
              description="Royal double-border frames for invitation hero sections."
            >
              <div className="grid sm:grid-cols-3 gap-6">
                {(["gold", "maroon", "subtle"] as const).map((variant) => (
                  <OrnamentalFrame
                    key={variant}
                    variant={variant}
                    className="rounded-lg"
                  >
                    <div className="p-8 sm:p-10 text-center space-y-3 bg-ivory-50">
                      <AccentText className="text-4xl">
                        {variant === "gold"
                          ? "Gold"
                          : variant === "maroon"
                            ? "Maroon"
                            : "Subtle"}
                      </AccentText>
                      <Heading level="h4">{variant} frame</Heading>
                    </div>
                  </OrnamentalFrame>
                ))}
              </div>
            </ShowcaseBlock>

            <Divider variant="ornament" spacing="lg" />

            {/* Animations */}
            <ShowcaseBlock
              title="Animations"
              description="Subtle, performant motion. Respects prefers-reduced-motion."
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Fade In", className: "animate-fade-in" },
                  { label: "Fade In Up", className: "animate-fade-in-up" },
                  { label: "Fade In Down", className: "animate-fade-in-down" },
                  { label: "Scale In", className: "animate-scale-in" },
                  { label: "Reveal", className: "animate-reveal" },
                  { label: "Float", className: "animate-float" },
                ].map(({ label, className }) => (
                  <Card key={label} variant="bordered" padding="md">
                    <div
                      className={`flex items-center justify-center h-24 ${className}`}
                    >
                      <Text size="sm" weight="medium">
                        {label}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
              <Card variant="luxury" padding="lg" className="mt-6">
                <div className="text-center space-y-4">
                  <Heading
                    level="h3"
                    color="gold"
                    className="text-gold-gradient"
                  >
                    Gold Gradient Text
                  </Heading>
                  <Text size="sm" color="muted">
                    Use sparingly for names, dates, and ceremonial headings.
                  </Text>
                </div>
              </Card>
            </ShowcaseBlock>
          </Stack>
        </Container>
      </Section>

      {/* Dark section demo */}
      <Section spacing="lg" background="maroon">
        <Container size="md">
          <div className="text-center space-y-6 animate-fade-in-up">
            <Text
              size="overline"
              color="ivory"
              className="text-gold-400 tracking-[0.3em]"
            >
              Evening Reception
            </Text>
            <Heading level="displaySm" color="ivory">
              An evening of celebration
            </Heading>
            <AccentText className="text-5xl text-gold-400 block">
              Under the stars
            </AccentText>
            <Divider variant="ornament" spacing="md" />
            <Button variant="gold" size="lg">
              Reserve Your Seat
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
