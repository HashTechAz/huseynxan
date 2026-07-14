import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type DividerProps = HTMLAttributes<HTMLDivElement> & {
  ornament?: boolean;
};

export function Divider({ ornament = false, className, ...props }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full items-center", className)}
      {...props}
    >
      <span className="h-px flex-1 bg-border" />
      {ornament ? <span className="mx-4 size-1.5 rotate-45 border border-antique-gold" /> : null}
      {ornament ? <span className="h-px flex-1 bg-border" /> : null}
    </div>
  );
}
