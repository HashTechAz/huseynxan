import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
      {...props}
    >
      {eyebrow ? <p className="text-eyebrow mb-5 text-antique-gold">{eyebrow}</p> : null}
      <h2 className="text-heading-lg text-balance">{title}</h2>
      {description ? (
        <div className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </div>
      ) : null}
    </div>
  );
}
