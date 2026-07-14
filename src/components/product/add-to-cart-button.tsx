"use client";

import { ShoppingBag } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import type { CartLineInput } from "@/types/cart";

type AddToCartButtonProps = Omit<ButtonProps, "onClick"> & {
  productId: string;
  quantity?: number;
  onAdd?: (line: CartLineInput) => void;
};

export function AddToCartButton({ productId, quantity = 1, onAdd, children = "Səbətə əlavə et", ...props }: AddToCartButtonProps) {
  const cart = useCart();
  const handleAdd = () => {
    const line = { productId, quantity };
    cart.addItem(line);
    onAdd?.(line);
  };

  return (
    <Button data-product-id={productId} onClick={handleAdd} {...props}>
      <ShoppingBag aria-hidden="true" size={16} />
      {children}
    </Button>
  );
}
