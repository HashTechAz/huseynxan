import assert from "node:assert/strict";
import test from "node:test";

import { products } from "../src/data/products";
import { primaryNavigation, legalNavigation, orderNavigation } from "../src/data/navigation";
import { siteConfig } from "../src/lib/site";

test("production biznes konfiqurasiyası təsdiqlənmiş dəyərləri saxlayır", () => {
  assert.equal(siteConfig.whatsappNumber, "994503950770");
  assert.equal(siteConfig.whatsappDisplayNumber, "+994 50 395 07 70");
  assert.equal(siteConfig.deliveryArea, "Bakı və Sumqayıt");
  assert.equal(siteConfig.paymentMethod, "Çatdırılma zamanı nağd ödəniş");
  assert.equal(siteConfig.instagramUrl, null);
});

test("bütün əsas məhsul adları və slugs unikaldır", () => {
  assert.deepEqual(products.map(({ name }) => name), [
    "Baku Nights",
    "Black Town",
    "Caspian Wave",
    "King’s Town",
    "Four Scents of Baku Discovery Set",
  ]);
  assert.equal(new Set(products.map(({ slug }) => slug)).size, products.length);
  assert.ok(products.every((product) => product.status === "active"));
});

test("naviqasiya linkləri boş deyil və daxili route formatındadır", () => {
  const links = [...primaryNavigation, ...orderNavigation, ...legalNavigation];
  assert.ok(links.every(({ href }) => href.startsWith("/") && href.length > 0));
  assert.ok(links.every(({ href }) => !href.includes("#")));
});
