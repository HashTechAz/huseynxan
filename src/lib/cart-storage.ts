import { CART_SCHEMA_VERSION, clampCartQuantity, createEmptyCart, isCartExpired } from "@/lib/cart-reducer";
import { getCurrentCartItem } from "@/lib/cart-products";
import type { CartState } from "@/types/cart";

export const CART_STORAGE_KEY = "useynkhan1792-cart";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function loadCart(storage: StorageLike, now = Date.now()): CartState {
  try {
    const raw = storage.getItem(CART_STORAGE_KEY);
    if (!raw) return createEmptyCart(now);

    const parsed: unknown = JSON.parse(raw);
    if (
      !isRecord(parsed) ||
      parsed.schemaVersion !== CART_SCHEMA_VERSION ||
      typeof parsed.updatedAt !== "number" ||
      isCartExpired(parsed.updatedAt, now) ||
      !Array.isArray(parsed.items)
    ) {
      storage.removeItem(CART_STORAGE_KEY);
      return createEmptyCart(now);
    }

    const items = parsed.items.flatMap((rawItem) => {
      if (!isRecord(rawItem) || typeof rawItem.productId !== "string") return [];
      const quantity = clampCartQuantity(
        typeof rawItem.quantity === "number" ? rawItem.quantity : 1,
      );
      const currentItem = getCurrentCartItem(rawItem.productId, quantity);
      return currentItem ? [currentItem] : [];
    });

    return {
      schemaVersion: CART_SCHEMA_VERSION,
      updatedAt: parsed.updatedAt,
      items,
    };
  } catch {
    storage.removeItem(CART_STORAGE_KEY);
    return createEmptyCart(now);
  }
}

export function saveCart(storage: StorageLike, state: CartState) {
  try {
    storage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be unavailable or full. The in-memory cart remains usable.
  }
}
