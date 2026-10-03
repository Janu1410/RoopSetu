export function buildServiceEntries(categories, priorityIds = []) {
  if (!Array.isArray(categories) || categories.length === 0) return [];

  const seenIds = new Set();
  const rankedCategories = priorityIds.flatMap((id) => {
    if (seenIds.has(id)) return [];
    seenIds.add(id);
    const match = categories.find((category) => category.id === id);
    return match ? [match] : [];
  });
  const remainingCategories = categories.filter(
    (category) => !priorityIds.includes(category.id),
  );

  return [...rankedCategories, ...remainingCategories].flatMap((category) => {
    const leadLook = category.items?.[0];
    if (!leadLook?.image || !leadLook.alt || !category.href || !category.label) {
      return [];
    }

    return [{
      id: category.id,
      title: category.label,
      href: category.href,
      description: category.heroDescription || category.tagline || "Explore this beauty collection.",
      image: leadLook.image,
      alt: leadLook.alt,
      objectPosition: leadLook.objectPosition || "center",
    }];
  });
}
