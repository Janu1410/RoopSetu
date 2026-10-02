const LOCATION_PLACEHOLDERS = new Set([
  "Use current location",
  "Current location",
  "Location unavailable",
]);

export function buildServiceSearchHref({ service, location }) {
  const params = new URLSearchParams();
  const trimmedService = service.trim();
  const trimmedLocation = location.trim();

  if (trimmedService) params.set("service", trimmedService);
  if (trimmedLocation && !LOCATION_PLACEHOLDERS.has(trimmedLocation)) {
    params.set("location", trimmedLocation);
  }

  const query = params.toString();
  return query ? `/services?${query}` : "/services";
}

export function buildCategorySearchHref(category) {
  return `/services?category=${encodeURIComponent(category)}`;
}
