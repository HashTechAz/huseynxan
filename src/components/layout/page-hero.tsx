import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HeritagePattern } from "@/components/shared/heritage-pattern";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import type { BreadcrumbItem } from "@/types/navigation";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: readonly BreadcrumbItem[];
  tone?: "light" | "dark";
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  tone = "light",
  children,
}: PageHeroProps) {
  const isDark = tone === "dark";

  return (
    <section className={cn("relative isolate overflow-hidden py-20 sm:py-28 lg:py-36", isDark ? "bg-dark-section text-dark-foreground" : "bg-surface text-foreground")}>
      <HeritagePattern className="absolute top-8 right-[-5rem] -z-10 w-[32rem] opacity-[0.1]" />
      <Container>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className="mt-12 max-w-4xl">
          {eyebrow ? <p className="text-eyebrow text-antique-gold">{eyebrow}</p> : null}
          <h1 className="text-display-lg mt-6 text-balance">{title}</h1>
          {description ? (
            <div className={cn("mt-7 max-w-2xl text-base leading-8 sm:text-lg", isDark ? "text-stone" : "text-muted-foreground")}>{description}</div>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
