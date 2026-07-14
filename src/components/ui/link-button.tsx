import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { buttonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function LinkButton({ variant = "primary", size = "md", className, ...props }: LinkButtonProps) {
  return <Link className={buttonClassName({ variant, size, className })} {...props} />;
}
