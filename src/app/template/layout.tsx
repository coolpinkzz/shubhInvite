import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Templates",
  description: "Wedding invitation templates",
};

export default function TemplateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
