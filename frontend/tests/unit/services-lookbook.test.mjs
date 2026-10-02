import assert from "node:assert/strict";
import test from "node:test";
import { getActiveServiceIndex, getScrollProgress } from "../../lib/services-lookbook.mjs";

test("scroll progress is clamped to the section's scroll range", () => {
  assert.equal(getScrollProgress(-25, 100), 0);
  assert.equal(getScrollProgress(0, 100), 0);
  assert.equal(getScrollProgress(25, 100), 0.25);
  assert.equal(getScrollProgress(125, 100), 1);
});

test("scroll progress safely handles an empty or invalid scroll range", () => {
  assert.equal(getScrollProgress(10, 0), 0);
  assert.equal(getScrollProgress(10, -1), 0);
  assert.equal(getScrollProgress(Number.NaN, 100), 0);
  assert.equal(getScrollProgress(10, Number.POSITIVE_INFINITY), 0);
});

test("the active service advances at equal progress intervals", () => {
  assert.equal(getActiveServiceIndex(0, 4), 0);
  assert.equal(getActiveServiceIndex(0.249, 4), 0);
  assert.equal(getActiveServiceIndex(0.25, 4), 1);
  assert.equal(getActiveServiceIndex(0.5, 4), 2);
  assert.equal(getActiveServiceIndex(0.75, 4), 3);
  assert.equal(getActiveServiceIndex(1, 4), 3);
});

test("active service selection clamps progress and handles invalid counts", () => {
  assert.equal(getActiveServiceIndex(-1, 4), 0);
  assert.equal(getActiveServiceIndex(2, 4), 3);
  assert.equal(getActiveServiceIndex(0.5, 0), 0);
  assert.equal(getActiveServiceIndex(0.5, -2), 0);
  assert.equal(getActiveServiceIndex(0.5, 2.5), 0);
  assert.equal(getActiveServiceIndex(Number.NaN, 4), 0);
});
