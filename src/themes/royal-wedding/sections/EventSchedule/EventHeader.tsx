import {
  ThemeSectionHeader,
  type ThemeSectionHeaderProps,
} from "@/themes/shared/components";

export type EventHeaderProps = Omit<ThemeSectionHeaderProps, "overline"> & {
  overline?: string;
};

export function EventHeader({
  overline = "The Celebrations",
  ...props
}: EventHeaderProps) {
  return <ThemeSectionHeader overline={overline} {...props} />;
}
