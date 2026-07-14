import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "gold" | "caspian";
};

const tones = {
  neutral: "border-border text-muted-foreground",
  gold: "border-antique-gold/60 text-antique-gold",
  caspian: "border-caspian/60 text-caspian",
};

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center border px-3 text-[0.625rem] font-semibold tracking-[0.18em] uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
