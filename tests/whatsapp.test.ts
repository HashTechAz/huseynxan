import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCartWhatsAppMessage,
  buildSingleProductWhatsAppMessage,
  calculateCartWhatsAppSummary,
  createWhatsAppUrl,
  normalizeWhatsAppPhone,
  type WhatsAppCartLine,
} from "../src/lib/whatsapp";

const cartLines: readonly WhatsAppCartLine[] = [
  { productId: "1", name: "Baku Nights", volume: "13 ml", quantity: 2, unitPrice: 39, currency: "AZN" },
  { productId: "2", name: "Caspian Wave", volume: "13 ml", quantity: 1, unitPrice: 39, currency: "AZN" },
];

test("telefon nömrəsini wa.me formatı üçün normallaşdırır", () => {
  assert.equal(normalizeWhatsAppPhone("+994 (50) 395-07-70"), "994503950770");
  assert.equal(normalizeWhatsAppPhone("00994 50 395 07 70"), "994503950770");
});

test("tək məhsul mesajını düzgün qurur", () => {
  const message = buildSingleProductWhatsAppMessage({
    productName: "Baku Nights",
    volume: "13 ml",
    quantity: 2,
    unitPrice: 39,
    currency: "AZN",
    deliveryCity: "Bakı",
  });
  assert.match(message, /Məhsul: Baku Nights/);
  assert.match(message, /Say: 2/);
  assert.match(message, /Məbləğ: 78 AZN/);
  assert.match(message, /Çatdırılma şəhəri: Bakı/);
});

test("çox məhsullu mesajı və şəhəri düzgün qurur", () => {
  const message = buildCartWhatsAppMessage(cartLines, "Sumqayıt");
  assert.ok(message);
  assert.match(message, /1\. Baku Nights — 13 ml × 2 — 78 AZN/);
  assert.match(message, /2\. Caspian Wave — 13 ml × 1 — 39 AZN/);
  assert.match(message, /Məhsulların sayı: 3/);
  assert.match(message, /Çatdırılma: Sumqayıt/);
});

test("ümumi məbləği builder daxilində yenidən hesablayır", () => {
  assert.deepEqual(calculateCartWhatsAppSummary(cartLines), {
    totalQuantity: 3,
    totalAmount: 117,
  });
  assert.match(buildCartWhatsAppMessage(cartLines, "Bakı") ?? "", /Ümumi məbləğ: 117 AZN/);
});

test("boş səbət üçün mesaj yaratmır", () => {
  assert.equal(buildCartWhatsAppMessage([], "Bakı"), undefined);
});

test("WhatsApp URL-ni düzgün encode edir", () => {
  const message = "Salam. Məhsul: Bakı & Xəzər";
  const url = createWhatsAppUrl(message, "+994 50 395 07 70");
  assert.equal(url, `https://wa.me/994503950770?text=${encodeURIComponent(message)}`);
});
