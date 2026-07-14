"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from "react";

import { cartReducer, createEmptyCart } from "@/lib/cart-reducer";
import { getCurrentCartItem } from "@/lib/cart-products";
import { loadCart, saveCart } from "@/lib/cart-storage";
import type { CartItem, CartLineInput } from "@/types/cart";

export type CartContextValue = Readonly<{
  items: readonly CartItem[];
  isHydrated: boolean;
  totalQuantity: number;
  subtotal: number;
  addItem: (line: CartLineInput) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}>;

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => createEmptyCart(0));
  const [isHydrated, setIsHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      dispatch({ type: "hydrate", state: loadCart(window.localStorage) });
      setIsHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isHydrated) saveCart(window.localStorage, state);
  }, [isHydrated, state]);

  useEffect(() => {
    if (!announcement) return;
    const timer = window.setTimeout(() => setAnnouncement(""), 2600);
    return () => window.clearTimeout(timer);
  }, [announcement]);

  const addItem = useCallback((line: CartLineInput) => {
    const item = getCurrentCartItem(line.productId, line.quantity);
    if (!item) return;
    dispatch({ type: "add", item, quantity: line.quantity, now: Date.now() });
    setAnnouncement(`${item.name} səbətə əlavə edildi.`);
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "set-quantity", productId, quantity, now: Date.now() });
    const item = state.items.find((candidate) => candidate.productId === productId);
    if (item) setAnnouncement(`${item.name} məhsulunun sayı ${quantity} olaraq dəyişdirildi.`);
  }, [state.items]);

  const removeItem = useCallback((productId: string) => {
    const item = state.items.find((candidate) => candidate.productId === productId);
    dispatch({ type: "remove", productId, now: Date.now() });
    if (item) setAnnouncement(`${item.name} səbətdən silindi.`);
  }, [state.items]);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear", now: Date.now() });
    setAnnouncement("Səbət təmizləndi.");
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    items: state.items,
    isHydrated,
    totalQuantity: state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }), [addItem, clearCart, isHydrated, removeItem, setQuantity, state.items]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-4 bottom-20 z-[70] flex justify-center sm:bottom-6">
        {announcement ? (
          <p role="status" className="bg-dark-section px-5 py-3 text-sm text-dark-foreground shadow-[0_8px_30px_rgb(23_20_17/0.2)]">
            {announcement}
          </p>
        ) : null}
      </div>
    </CartContext.Provider>
  );
}
