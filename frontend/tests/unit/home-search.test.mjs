import assert from "node:assert/strict";
import test from "node:test";
import {
  buildCategorySearchHref,
  buildServiceSearchHref,
} from "../../lib/home-search.mjs";

test("service search omits empty fields", () => {
  assert.equal(
    buildServiceSearchHref({ service: "  ", location: "Use current location" }),
    "/services",
  );
});

test("service search trims and encodes entered values", () => {
  assert.equal(
    buildServiceSearchHref({ service: "  Bridal Makeup ", location: "Surat" }),
    "/services?service=Bridal+Makeup&location=Surat",
  );
});

test("service search does not submit unresolved location prompts", () => {
  assert.equal(
    buildServiceSearchHref({
      service: "Mehendi",
      location: "Location unavailable",
    }),
    "/services?service=Mehendi",
  );
});

test("category search safely encodes category names", () => {
  assert.equal(
    buildCategorySearchHref("hair & draping"),
    "/services?category=hair%20%26%20draping",
  );
});
