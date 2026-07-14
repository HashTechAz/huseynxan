import assert from "node:assert/strict";
import test from "node:test";

import { getCurrentCartItem } from "../src/lib/cart-products";
import {
  CART_MAX_QUANTITY,
  CART_TTL_MS,
  calculateCartSubtotal,
  cartReducer,
  clampCartQuantity,
  createEmptyCart,
  isCartExpired,
} from "../src/lib/cart-reducer";
import { CART_STORAGE_KEY, loadCart } from "../src/lib/cart-storage";

class MemoryStorage {
  private value: string | null = null;
  removed = false;
  getItem() { return this.value; }
  setItem(_key: string, value: string) { this.value = value; }
  removeItem() { this.value = null; this.removed = true; }
}

function requireCartItem(slug: "baku-nights" | "caspian-wave") {
  const id = slug === "baku-nights" ? "ukh-product-001" : "ukh-product-003";
  const item = getCurrentCartItem(id, 1);
  assert.ok(item);
  return item;
}

test("eyni məhsul yenidən əlavə ediləndə quantity artır", () => {
  const item = requireCartItem("baku-nights");
  const once = cartReducer(createEmptyCart(0), { type: "add", item, quantity: 1, now: 1 });
  const twice = cartReducer(once, { type: "add", item, quantity: 2, now: 2 });
  assert.equal(twice.items[0]?.quantity, 3);
});

test("quantity dəyişir, limitlənir, məhsul silinir və səbət təmizlənir", () => {
  const item = requireCartItem("baku-nights");
  const added = cartReducer(createEmptyCart(0), { type: "add", item, quantity: 1, now: 1 });
  const changed = cartReducer(added, { type: "set-quantity", productId: item.productId, quantity: 50, now: 2 });
  assert.equal(changed.items[0]?.quantity, CART_MAX_QUANTITY);
  assert.equal(clampCartQuantity(0), 1);
  const removed = cartReducer(changed, { type: "remove", productId: item.productId, now: 3 });
  assert.equal(removed.items.length, 0);
  assert.deepEqual(cartReducer(added, { type: "clear", now: 4 }).items, []);
});

test("cart subtotal bütün sətirləri cari qiymətlə hesablayır", () => {
  const first = requireCartItem("baku-nights");
  const second = requireCartItem("caspian-wave");
  assert.equal(calculateCartSubtotal([{ ...first, quantity: 2 }, second]), 117);
});

test("7 gündən köhnə səbət expired sayılır", () => {
  const now = 1_800_000_000_000;
  assert.equal(isCartExpired(now - CART_TTL_MS, now), false);
  assert.equal(isCartExpired(now - CART_TTL_MS - 1, now), true);
});

test("malformed və expired localStorage təhlükəsiz təmizlənir", () => {
  const malformed = new MemoryStorage();
  malformed.setItem(CART_STORAGE_KEY, "{broken-json");
  assert.deepEqual(loadCart(malformed, 100).items, []);
  assert.equal(malformed.removed, true);

  const expired = new MemoryStorage();
  expired.setItem(CART_STORAGE_KEY, JSON.stringify({ schemaVersion: 1, updatedAt: 0, items: [] }));
  assert.deepEqual(loadCart(expired, CART_TTL_MS + 1).items, []);
  assert.equal(expired.removed, true);
});
