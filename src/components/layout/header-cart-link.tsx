"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/cn";

export function HeaderCartLink() {
  const { isHydrated, totalQuantity } = useCart();
  const count = isHydrated ? totalQuantity : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Səbət, ${count} məhsul`}
      className="relative inline-flex size-11 items-center justify-center text-foreground transition-colors hover:text-antique-gold"
    >
      <ShoppingBag aria-hidden="true" size={19} strokeWidth={1.6} />
      <span
        className={cn(
          "absolute top-1.5 right-0 flex min-w-4.5 items-center justify-center bg-antique-gold px-1 text-[0.5625rem] leading-4 font-bold text-dark-section tabular-nums",
          count > 99 && "text-[0.5rem]",
        )}
        aria-hidden="true"
      >
        {count > 99 ? "99+" : count}
      </span>
    </Link>
  );
}
