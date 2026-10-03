"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Crosshair, MapPin, Search, X } from "lucide-react";
import {
  SUPPORTED_CITIES,
  normalizeCityName,
  type CityItem,
} from "@/lib/city-selection.mjs";

type CitySelectorProps = {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  className?: string;
  variant?: "desktop" | "mobile-compact" | "mobile-card";
};

export default function CitySelector({
  selectedCity,
  onSelectCity,
  className = "",
  variant = "desktop",
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setDetectError(null);
    }
  }, [isOpen]);

  const handleSelect = (cityName: string) => {
    onSelectCity(cityName);
    setIsOpen(false);
  };

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setDetectError("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetecting(true);
    setDetectError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const params = new URLSearchParams({
            lat: coords.latitude.toString(),
            lon: coords.longitude.toString(),
          });
          const response = await fetch(`/api/location/reverse?${params.toString()}`, {
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error("Failed to reverse geocode");
          }

          const data = (await response.json()) as { location?: string };
          const resolved = normalizeCityName(data.location || "");
          handleSelect(resolved);
        } catch {
          setDetectError("Unable to detect city automatically. Please select below.");
        } finally {
          setIsDetecting(false);
        }
      },
      () => {
        setIsDetecting(false);
        setDetectError("Location access denied. Please choose a city below.");
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10 * 60 * 1000,
      },
    );
  };

  const filteredCities = SUPPORTED_CITIES.filter((city: CityItem) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  const isCustomCity =
    searchQuery.trim().length > 1 &&
    !SUPPORTED_CITIES.some(
      (c) => c.name.toLowerCase() === searchQuery.trim().toLowerCase(),
    );

  // Variant: Mobile Card (Inside Drawer Menu)
  if (variant === "mobile-card") {
    return (
      <div className={`rounded-2xl border border-[#E7D3D6] bg-white p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8A1238]">
            <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Your Selected City</span>
          </div>
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="inline-flex items-center gap-1 text-[0.7rem] font-bold text-[#5A001F] hover:text-[#8A1238] disabled:opacity-60"
          >
            <Crosshair className={`h-3 w-3 ${isDetecting ? "animate-spin" : ""}`} />
            <span>{isDetecting ? "Detecting..." : "Auto Detect"}</span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {SUPPORTED_CITIES.map((city) => {
            const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
            return (
              <button
                key={city.name}
                type="button"
                onClick={() => handleSelect(city.name)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#5A001F] text-white shadow-xs"
                    : "border border-[#EBDADF] bg-[#FFF8F3] text-[#5A001F] hover:bg-[#F9ECEF]"
                }`}
              >
                <span>{city.name}</span>
                {isSelected ? <Check className="h-3 w-3 text-[#D4AF37]" /> : null}
              </button>
            );
          })}
        </div>

        {detectError ? (
          <p className="mt-2 text-[0.7rem] text-[#8A1238]">{detectError}</p>
        ) : null}
      </div>
    );
  }

  // Variant: Mobile Compact (Small trigger button in Mobile Top Bar)
  if (variant === "mobile-compact") {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="premium-interactive inline-flex items-center gap-1 rounded-full border border-[#D4AF37]/80 bg-white/90 px-2 py-1 text-[0.68rem] font-bold text-[#5A001F] shadow-2xs hover:bg-white"
          aria-label={`Current city: ${selectedCity}. Tap to change city.`}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
        >
          <MapPin className="h-3 w-3 text-[#8A1238] shrink-0" aria-hidden="true" />
          <span className="max-w-[70px] truncate sm:max-w-[90px]">{selectedCity}</span>
          <ChevronDown
            className={`h-2.5 w-2.5 text-[#8A1238]/70 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen ? (
          <div
            role="dialog"
            aria-label="Select City"
            className="fixed inset-x-3 top-16 z-[75] max-w-[340px] mx-auto rounded-2xl border border-[#D4AF37]/80 bg-[#FFF8F3] p-4 shadow-[0_20px_50px_rgba(33,4,15,0.28)]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#8A1238]/15">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A1238]">
                  Select City
                </p>
                <p className="text-xs text-[#6C5662]">Verified beauticians near you</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#E7D3D6] bg-white text-[#8A1238]"
                aria-label="Close city selector"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={isDetecting}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/60 bg-white px-3 py-2 text-xs font-bold text-[#5A001F] transition hover:bg-[#FDF2F4] hover:border-[#8A1238] disabled:opacity-60"
            >
              <Crosshair className={`h-3.5 w-3.5 text-[#8A1238] ${isDetecting ? "animate-spin" : ""}`} />
              <span>{isDetecting ? "Detecting location..." : "Use Current Location (GPS)"}</span>
            </button>

            {detectError ? (
              <p className="mt-2 text-[0.7rem] text-[#8A1238]">{detectError}</p>
            ) : null}

            <div className="mt-3 space-y-1 max-h-52 overflow-y-auto">
              {SUPPORTED_CITIES.map((city) => {
                const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
                return (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelect(city.name)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? "bg-[#5A001F] text-white"
                        : "text-[#2D2230] hover:bg-[#F9ECEF]"
                    }`}
                  >
                    <span>{city.name}, {city.state}</span>
                    {isSelected ? <Check className="h-3.5 w-3.5 text-[#D4AF37]" /> : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // Variant: Desktop Dropdown (Navbar right section)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="premium-interactive inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/80 bg-white/80 px-2.5 py-1 text-[0.72rem] font-bold text-[#5A001F] shadow-2xs transition-all hover:bg-white hover:border-[#8A1238] xl:px-3.5 xl:py-1.5 xl:text-[0.78rem]"
        aria-label={`Current city: ${selectedCity}. Click to change city.`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <MapPin className="h-3.5 w-3.5 text-[#8A1238] shrink-0" aria-hidden="true" />
        <span className="max-w-[100px] truncate xl:max-w-[120px]">{selectedCity}</span>
        <ChevronDown
          className={`h-3 w-3 text-[#8A1238]/70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-label="Select City"
          className="absolute right-0 top-full mt-2.5 w-72 rounded-2xl border border-[#D4AF37]/75 bg-[#FFF8F3] p-3.5 shadow-[0_20px_50px_rgba(33,4,15,0.22)] z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-2.5 border-b border-[#8A1238]/15">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#8A1238]">
                City Directory
              </p>
              <h3 className="text-xs font-semibold text-[#2D2230]">
                Find Verified Artists In
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#8A1238] hover:bg-[#F9ECEF]"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* GPS Auto Detect Button */}
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/60 bg-white px-3 py-2 text-xs font-bold text-[#5A001F] shadow-2xs transition hover:bg-[#FDF2F4] hover:border-[#8A1238] disabled:opacity-60"
          >
            <Crosshair className={`h-3.5 w-3.5 text-[#8A1238] ${isDetecting ? "animate-spin" : ""}`} />
            <span>{isDetecting ? "Detecting location..." : "Use Current Location (GPS)"}</span>
          </button>

          {detectError ? (
            <p className="mt-1.5 text-[0.7rem] text-[#8A1238] leading-tight">{detectError}</p>
          ) : null}

          {/* Search Filter */}
          <div className="relative mt-2.5">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8A1238]/60" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or area..."
              className="w-full rounded-lg border border-[#E7D3D6] bg-white py-1.5 pl-8 pr-3 text-xs text-[#2D2230] placeholder:text-[#9B6A79] outline-none focus:border-[#8A1238]"
            />
          </div>

          {/* City List */}
          <div className="mt-2.5 max-h-48 overflow-y-auto space-y-1">
            {filteredCities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => handleSelect(city.name)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? "bg-[#5A001F] text-white"
                      : "text-[#2D2230] hover:bg-[#F9ECEF]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{city.name}</span>
                    <span className={`text-[0.68rem] ${isSelected ? "text-[#E5C16C]" : "text-[#8C7A84]"}`}>
                      ({city.state})
                    </span>
                  </span>
                  {isSelected ? <Check className="h-3.5 w-3.5 text-[#D4AF37]" /> : null}
                </button>
              );
            })}

            {isCustomCity ? (
              <button
                type="button"
                onClick={() => handleSelect(searchQuery.trim())}
                className="flex w-full items-center justify-between rounded-xl border border-dashed border-[#8A1238]/40 px-3 py-2 text-xs font-semibold text-[#8A1238] hover:bg-[#F9ECEF]"
              >
                <span>Select &quot;{searchQuery.trim()}&quot;</span>
                <Check className="h-3.5 w-3.5" />
              </button>
            ) : null}

            {filteredCities.length === 0 && !isCustomCity ? (
              <p className="py-3 text-center text-xs text-[#8C7A84]">
                No matching city found
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
