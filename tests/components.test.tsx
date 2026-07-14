import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CartPageContent } from "../src/components/cart/cart-page-content";
import { ProductCard } from "../src/components/product/product-card";
import { CartContext, type CartContextValue } from "../src/providers/cart-provider";
import { getProductBySlug } from "../src/lib/products";

const emptyCart: CartContextValue = {
  items: [], isHydrated: true, totalQuantity: 0, subtotal: 0,
  addItem: () => undefined, setQuantity: () => undefined,
  removeItem: () => undefined, clearCart: () => undefined,
};

test("ProductCard əsas məhsul məlumatlarını göstərir", () => {
  const product = getProductBySlug("baku-nights");
  assert.ok(product);
  const html = renderToStaticMarkup(createElement(ProductCard, { product }));
  assert.match(html, /Baku Nights/);
  assert.match(html, /13 ml/);
  assert.match(html, /39/);
  assert.match(html, /Stokda/);
  assert.match(html, /href="\/products\/baku-nights"/);
});

test("boş səbət empty state göstərir və WhatsApp checkout təqdim etmir", () => {
  const html = renderToStaticMarkup(
    createElement(CartContext.Provider, { value: emptyCart }, createElement(CartPageContent)),
  );
  assert.match(html, /Səbətiniz boşdur/);
  assert.doesNotMatch(html, /WhatsApp ilə sifarişi tamamla/);
});
