import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/cn";

type SectionTone = "default" | "surface" | "dark";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  tone?: SectionTone;
  spacing?: "sm" | "md" | "lg";
} & Omit<ComponentPropsWithoutRef<T>, "as">;

const tones: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  dark: "bg-dark-section text-dark-foreground",
};

const spacing = {
  sm: "py-12 sm:py-16",
  md: "py-20 sm:py-28",
  lg: "py-28 sm:py-36 lg:py-44",
};

export function Section<T extends ElementType = "section">({
  as,
  tone = "default",
  spacing: sectionSpacing = "md",
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";
  return <Component className={cn(tones[tone], spacing[sectionSpacing], className)} {...props} />;
}
