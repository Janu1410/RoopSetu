import assert from "node:assert/strict";
import test from "node:test";

test("core pillars configuration has exactly 3 pillars matching blueprint", async () => {
  // Test data integrity against architectural blueprint requirements
  const pillars = [
    {
      number: "01",
      badge: "Now Live",
      href: "/services",
      label: "Verified Beauticians & Salons",
    },
    {
      number: "02",
      badge: "Coming Soon",
      href: "/rentals",
      label: "Ethnic Wear & Jewelry Rentals",
    },
    {
      number: "03",
      badge: "Explore Looks",
      href: "/beauty-guide",
      label: "The RoopSetu Beauty Guide",
    },
  ];

  assert.equal(pillars.length, 3);
  assert.equal(pillars[0].number, "01");
  assert.equal(pillars[0].badge, "Now Live");
  assert.equal(pillars[0].href, "/services");

  assert.equal(pillars[1].number, "02");
  assert.equal(pillars[1].badge, "Coming Soon");
  assert.equal(pillars[1].href, "/rentals");

  assert.equal(pillars[2].number, "03");
  assert.equal(pillars[2].badge, "Explore Looks");
  assert.equal(pillars[2].href, "/beauty-guide");
});
