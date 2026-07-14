import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export function VisuallyHidden({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute size-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)] [clip-path:inset(50%)]",
        className,
      )}
      {...props}
    />
  );
}
