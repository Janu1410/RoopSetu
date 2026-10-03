import assert from "node:assert/strict";
import test from "node:test";
import { buildServiceEntries } from "../../lib/service-showcase.mjs";

const categories = [
  {
    id: "nail-art",
    label: "Nail Art",
    href: "/beauty-categories/nail-art",
    tagline: "Nail inspiration.",
    items: [{ image: "/images/nails/nai-10.jpg", alt: "Nail art" }],
  },
  {
    id: "makeup",
    label: "Makeup",
    href: "/beauty-categories/makeup",
    tagline: "Makeup ideas.",
    heroDescription: "Makeup looks for every occasion.",
    items: [{ image: "/images/makeup/mak-20.jpg", alt: "Smokey eye makeup", objectPosition: "center 20%" }],
  },
  {
    id: "bridal",
    label: "Bridal & Festive",
    href: "/beauty-categories/bridal",
    tagline: "Bridal ideas.",
    items: [{ image: "/images/hero/desktop/her-30.jpg", alt: "Bridal look" }],
  },
  {
    id: "empty",
    label: "Empty category",
    href: "/beauty-categories/empty",
    items: [],
  },
];

test("service entries follow the chosen order and keep the category details", () => {
  const services = buildServiceEntries(categories, ["bridal", "makeup", "bridal"]);

  assert.deepEqual(services.map((service) => service.id), ["bridal", "makeup", "nail-art"]);
  assert.equal(services[0].title, "Bridal & Festive");
  assert.equal(services[0].description, "Bridal ideas.");
  assert.equal(services[0].href, "/beauty-categories/bridal");
  assert.equal(services[1].description, "Makeup looks for every occasion.");
  assert.equal(services[1].objectPosition, "center 20%");
  assert.equal(services[2].description, "Nail inspiration.");
});

test("service entries skip categories without a usable image or destination", () => {
  const invalidCategories = [
    { id: "missing-image", label: "Missing image", href: "/missing-image", items: [] },
    { id: "missing-link", label: "Missing link", items: [{ image: "/look.jpg", alt: "A look" }] },
    { id: "missing-alt", label: "Missing alt", href: "/missing-alt", items: [{ image: "/look.jpg" }] },
  ];

  assert.deepEqual(buildServiceEntries(invalidCategories), []);
  assert.deepEqual(buildServiceEntries([]), []);
  assert.deepEqual(buildServiceEntries(null), []);
});
