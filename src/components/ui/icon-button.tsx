import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "size-9", md: "size-11", lg: "size-13" };

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center border border-border bg-transparent text-foreground transition-colors hover:border-foreground disabled:pointer-events-none disabled:opacity-45",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
