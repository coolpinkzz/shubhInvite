import {
  ThemeSectionHeader,
  type ThemeSectionHeaderProps,
} from "@/themes/shared/components";

export type SectionHeaderProps = Omit<
  ThemeSectionHeaderProps,
  "overline"
> & {
  overline?: string;
};

export function SectionHeader({
  overline = "The Venue",
  ...props
}: SectionHeaderProps) {
  return <ThemeSectionHeader overline={overline} {...props} />;
}
