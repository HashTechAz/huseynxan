import type { CartItem, CartState } from "@/types/cart";

export const CART_SCHEMA_VERSION = 1;
export const CART_MAX_QUANTITY = 20;
export const CART_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type CartAction =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; item: CartItem; quantity: number; now: number }
  | { type: "set-quantity"; productId: string; quantity: number; now: number }
  | { type: "remove"; productId: string; now: number }
  | { type: "clear"; now: number };

export function clampCartQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(CART_MAX_QUANTITY, Math.max(1, Math.floor(quantity)));
}

export function createEmptyCart(now = Date.now()): CartState {
  return { schemaVersion: CART_SCHEMA_VERSION, updatedAt: now, items: [] };
}

export function isCartExpired(updatedAt: number, now = Date.now()) {
  return !Number.isFinite(updatedAt) || updatedAt > now + 5 * 60 * 1000 || now - updatedAt > CART_TTL_MS;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const existing = state.items.find((item) => item.productId === action.item.productId);
      const items = existing
        ? state.items.map((item) =>
            item.productId === action.item.productId
              ? { ...action.item, quantity: clampCartQuantity(item.quantity + action.quantity) }
              : item,
          )
        : [...state.items, { ...action.item, quantity: clampCartQuantity(action.quantity) }];
      return { schemaVersion: CART_SCHEMA_VERSION, updatedAt: action.now, items };
    }
    case "set-quantity":
      return {
        schemaVersion: CART_SCHEMA_VERSION,
        updatedAt: action.now,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: clampCartQuantity(action.quantity) }
            : item,
        ),
      };
    case "remove":
      return {
        schemaVersion: CART_SCHEMA_VERSION,
        updatedAt: action.now,
        items: state.items.filter((item) => item.productId !== action.productId),
      };
    case "clear":
      return createEmptyCart(action.now);
  }
}
