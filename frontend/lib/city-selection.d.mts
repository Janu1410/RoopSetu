export type CityItem = {
  name: string;
  state: string;
  isPopular?: boolean;
};

export declare const SUPPORTED_CITIES: CityItem[];
export declare const DEFAULT_CITY: string;
export declare const CITY_STORAGE_KEY: string;
export declare const CITY_CHANGE_EVENT: string;

export declare function getStoredCity(): string;
export declare function setStoredCity(city: string): void;
export declare function normalizeCityName(rawLocation: string): string;
