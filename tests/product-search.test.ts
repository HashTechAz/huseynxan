import assert from "node:assert/strict";
import test from "node:test";

import { searchProducts, type SearchableProduct } from "../src/lib/product-search";

const catalog = [
  {
    name: "Baku Nights",
    subtitle: "Şəhər işıqları sükuta qarışanda",
    shortDescription: "Dərin, isti və sirli xarakterli axşam ətri.",
    fragranceFamilies: ["oriental", "woody", "spicy"],
  },
  {
    name: "Caspian Wave",
    subtitle: "Üfüqə açılan təmiz nəfəs",
    shortDescription: "Təmiz, azad və enerjili gündəlik xarakter.",
    fragranceFamilies: ["aquatic", "fresh", "citrus"],
  },
] as const satisfies readonly SearchableProduct[];

test("boş sorğuda bütün məhsulları qaytarır", () => {
  assert.deepEqual(searchProducts(catalog, "  "), catalog);
});

test("məhsul adında böyük-kiçik hərfə həssas olmadan axtarır", () => {
  assert.deepEqual(searchProducts(catalog, "BAKU").map(({ name }) => name), ["Baku Nights"]);
});

test("subtitle və qısa təsvir daxilində axtarır", () => {
  assert.equal(searchProducts(catalog, "üfüq").length, 1);
  assert.equal(searchProducts(catalog, "enerjili").length, 1);
});

test("qoxu ailəsi və çoxsözlü sorğu üzrə axtarır", () => {
  assert.deepEqual(searchProducts(catalog, "baku woody").map(({ name }) => name), ["Baku Nights"]);
  assert.deepEqual(searchProducts(catalog, "aquatic").map(({ name }) => name), ["Caspian Wave"]);
});

test("uyğunluq olmadıqda boş nəticə qaytarır", () => {
  assert.deepEqual(searchProducts(catalog, "leather"), []);
});
