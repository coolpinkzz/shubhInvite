import {
  ThemeFloralDivider,
  type ThemeFloralDividerProps,
} from "@/themes/shared/components";

export type FloralDividerProps = ThemeFloralDividerProps;

export function FloralDivider(props: FloralDividerProps) {
  return <ThemeFloralDivider variant="star" size="lg" {...props} />;
}
