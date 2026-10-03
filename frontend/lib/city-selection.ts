export type CityItem = {
  name: string;
  state: string;
  isPopular?: boolean;
};

export const SUPPORTED_CITIES: CityItem[] = [
  { name: "Ahmedabad", state: "Gujarat", isPopular: true },
  { name: "Surat", state: "Gujarat", isPopular: true },
  { name: "Vadodara", state: "Gujarat", isPopular: true },
  { name: "Rajkot", state: "Gujarat", isPopular: true },
  { name: "Mumbai", state: "Maharashtra", isPopular: true },
];

export const DEFAULT_CITY = "Ahmedabad";
export const CITY_STORAGE_KEY = "roopsetu-selected-city";
export const CITY_CHANGE_EVENT = "roopsetu:city-changed";

export const getStoredCity = (): string => {
  if (typeof window === "undefined") {
    return DEFAULT_CITY;
  }

  try {
    const stored = window.localStorage.getItem(CITY_STORAGE_KEY);
    if (stored && stored.trim()) {
      return stored.trim();
    }
  } catch {}

  return DEFAULT_CITY;
};

export const setStoredCity = (city: string): void => {
  if (typeof window === "undefined" || !city?.trim()) {
    return;
  }

  const cleanCity = city.trim();

  try {
    window.localStorage.setItem(CITY_STORAGE_KEY, cleanCity);
    window.dispatchEvent(
      new CustomEvent(CITY_CHANGE_EVENT, { detail: { city: cleanCity } }),
    );
  } catch {}
};

/**
 * Normalizes reverse geocoding location string to nearest supported city
 * or extracts a clean primary locality.
 */
export const normalizeCityName = (rawLocation: string): string => {
  if (!rawLocation || typeof rawLocation !== "string") {
    return DEFAULT_CITY;
  }

  const lower = rawLocation.toLowerCase();

  if (lower.includes("ahmedabad") || lower.includes("amdavad")) {
    return "Ahmedabad";
  }
  if (lower.includes("surat")) {
    return "Surat";
  }
  if (lower.includes("vadodara") || lower.includes("baroda")) {
    return "Vadodara";
  }
  if (lower.includes("rajkot")) {
    return "Rajkot";
  }
  if (lower.includes("mumbai") || lower.includes("bombay")) {
    return "Mumbai";
  }

  // Fallback: take the first segment before comma
  const parts = rawLocation.split(",").map((p) => p.trim());
  const candidate = parts[0];
  if (candidate && candidate.length > 1 && candidate.length <= 30) {
    return candidate;
  }

  return DEFAULT_CITY;
};
