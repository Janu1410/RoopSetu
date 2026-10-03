import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_CITY,
  SUPPORTED_CITIES,
  normalizeCityName,
} from "../../lib/city-selection.mjs";

test("supported cities contains key Gujarat and Mumbai metro hubs", () => {
  const cityNames = SUPPORTED_CITIES.map((c) => c.name);
  assert.ok(cityNames.includes("Ahmedabad"));
  assert.ok(cityNames.includes("Surat"));
  assert.ok(cityNames.includes("Vadodara"));
  assert.ok(cityNames.includes("Rajkot"));
  assert.ok(cityNames.includes("Mumbai"));
});

test("normalizeCityName correctly maps location variants", () => {
  assert.equal(
    normalizeCityName("Satellite, Ahmedabad, Gujarat"),
    "Ahmedabad",
  );
  assert.equal(normalizeCityName("Vesu, Surat, Gujarat"), "Surat");
  assert.equal(normalizeCityName("Alkapuri, Baroda"), "Vadodara");
  assert.equal(normalizeCityName("Bandra West, Mumbai"), "Mumbai");
  assert.equal(normalizeCityName("Kalawad Road, Rajkot"), "Rajkot");
});

test("normalizeCityName falls back safely for empty or invalid input", () => {
  assert.equal(normalizeCityName(""), DEFAULT_CITY);
  assert.equal(normalizeCityName(null), DEFAULT_CITY);
  assert.equal(normalizeCityName(undefined), DEFAULT_CITY);
});

test("normalizeCityName extracts primary locality if outside supported list", () => {
  assert.equal(
    normalizeCityName("Gandhinagar, Gujarat"),
    "Gandhinagar",
  );
});
