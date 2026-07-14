import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type PriceProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  amount: number;
  currency?: "AZN";
  locale?: "az-AZ";
};

export function Price({
  amount,
  currency = "AZN",
  locale = "az-AZ",
  className,
  ...props
}: PriceProps) {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return (
    <span className={cn("font-medium tabular-nums", className)} {...props}>
      {formattedPrice}
    </span>
  );
}
