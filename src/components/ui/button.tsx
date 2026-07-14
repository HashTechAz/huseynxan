import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "border-foreground bg-foreground text-background hover:bg-dark-section",
  secondary: "border-antique-gold bg-antique-gold text-dark-section hover:bg-kraft hover:border-kraft",
  outline: "border-border bg-transparent text-foreground hover:border-foreground",
  ghost: "border-transparent bg-transparent text-foreground hover:bg-stone/25",
  whatsapp: "border-caspian bg-caspian text-surface hover:bg-dark-section hover:border-dark-section",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-4 text-[0.6875rem]",
  md: "min-h-11 px-6 text-xs",
  lg: "min-h-13 px-8 text-xs",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 border font-semibold tracking-[0.14em] uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45",
    variants[variant],
    sizes[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
});
