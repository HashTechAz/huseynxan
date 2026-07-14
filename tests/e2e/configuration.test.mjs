import assert from "node:assert/strict";
import test from "node:test";

test("Playwright E2E dependency mövcud olduqda browser ssenariləri aktivləşdirilməlidir", { skip: "@playwright/test bu repository-də quraşdırılmayıb" }, () => {
  assert.fail("Skipped");
});
