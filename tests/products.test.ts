import assert from "node:assert/strict";
import test from "node:test";

import { products } from "../src/data/products";
import { filterProducts, formatPrice, getProductBySlug, getRelatedProducts, sortProducts } from "../src/lib/products";

test("formatPrice AZN qiymətini lokal formatda göstərir", () => {
  const formatted = formatPrice(39);
  assert.match(formatted, /39/);
  assert.match(formatted, /₼/);
});

test("filterProducts kataloqu biznes filtrlərinə görə daraldır", () => {
  assert.deepEqual(filterProducts(products, { seasons: ["summer"] }).map(({ slug }) => slug), ["caspian-wave"]);
  assert.deepEqual(filterProducts(products, { categories: ["discovery-sets"] }).map(({ slug }) => slug), ["four-scents-of-baku"]);
  assert.deepEqual(filterProducts(products, { query: "sənaye" }).map(({ slug }) => slug), ["black-town"]);
});

test("sortProducts qiymətə və ada görə sıralayır, giriş massivini dəyişmir", () => {
  const source = [...products].reverse();
  const snapshot = source.map(({ id }) => id);
  assert.equal(sortProducts(source, "price-descending")[0]?.slug, "four-scents-of-baku");
  assert.equal(sortProducts(source, "name")[0]?.name, "Baku Nights");
  assert.deepEqual(source.map(({ id }) => id), snapshot);
});

test("getProductBySlug mövcud məhsulu qaytarır və naməlum slug üçün undefined verir", () => {
  assert.equal(getProductBySlug("baku-nights")?.name, "Baku Nights");
  assert.equal(getProductBySlug("olmayan-mehsul"), undefined);
});

test("related products cari məhsulu çıxarır və limiti qoruyur", () => {
  const product = getProductBySlug("kings-town");
  assert.ok(product);
  const related = getRelatedProducts(product, 2);
  assert.equal(related.length, 2);
  assert.ok(related.every((candidate) => candidate.id !== product.id));
  assert.ok(related.some((candidate) => candidate.fragranceFamilies.includes("woody")));
});
