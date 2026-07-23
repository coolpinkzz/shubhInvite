export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "/template" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const AUTH_LINKS = {
  login: { label: "Login", href: "#login" },
  getStarted: { label: "Get Started", href: "/template" },
} as const;

export const HERO_CTAS = {
  primary: { label: "Start Free", href: "/template" },
  secondary: { label: "Watch Demo", href: "#demo" },
} as const;
