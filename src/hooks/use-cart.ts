"use client";

import { useContext } from "react";

import { CartContext } from "@/providers/cart-provider";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart yalnız CartProvider daxilində istifadə edilə bilər.");
  return context;
}
