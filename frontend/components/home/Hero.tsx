"use client";

import { FormEvent, useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import HeroDesktopShell from "./HeroDesktopShell";
import MobileSearchModal from "./MobileSearchModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const chips = [
  { icon: "🔥", label: "Bridal Makeup", query: "bridal" },
  { icon: "🌿", label: "Mehndi Artist", query: "mehendi" },
  { icon: "💅", label: "Nail Extensions", query: "nails" },
  { icon: "✨", label: "Hair & Draping", query: "hair-draping" },
];

const popularSearches = [
  "Bridal Makeup",
  "Haircut",
  "Mehndi Artist",
  "Nail Extensions",
  "Party Makeup",
  "Facial",
];

const reverseGeocode = async (
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
) => {
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
  });
  const response = await fetch(`/api/location/reverse?${params.toString()}`, {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to resolve location");
  }

  const data = (await response.json()) as { location?: string };
  return data.location || "";
};

export default function Hero() {
  const router = useRouter();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [service, setService] = useState("");
  const [location, setLocation] = useState("Use current location");
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMobileSearchOpen(false);

    const params = new URLSearchParams();
    if (service.trim()) {
      params.set("service", service.trim());
    }
    if (
      location &&
      location !== "Use current location" &&
      location !== "Current location" &&
      location !== "Location unavailable"
    ) {
      params.set("location", location.trim());
    }

    const query = params.toString();
    router.push(query ? `/services?${query}` : "/services");
  };

  const requestCurrentLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocation("Location unavailable");
      setLocationStatus("error");
      return;
    }

    setLocationStatus("loading");

    const abortController = new AbortController();

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const resolvedLocation = await reverseGeocode(
            coords.latitude,
            coords.longitude,
            abortController.signal,
          );

          setLocation(resolvedLocation || "Current location");
          setLocationStatus("ready");
        } catch {
          setLocation("Current location");
          setLocationStatus("ready");
        }
      },
      () => {
        setLocation("Use current location");
        setLocationStatus("error");
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10 * 60 * 1000,
      },
    );
  };

  useEffect(() => {
    if (!isMobileSearchOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileSearchOpen]);

  return (
    <>
      <section className="relative flex-1 overflow-hidden bg-gradient-to-br from-[#4A0019] via-[#64102D] to-[#7C1437] pb-10 pt-6 text-white sm:pb-12 sm:pt-7 lg:bg-none lg:bg-[#FFF8F3] lg:pb-8 lg:pt-5 lg:text-[#2D2230]">
        <div className="pointer-events-none absolute inset-0 hidden lg:block bg-gradient-to-r from-[#fff9f6] via-[#fffaf8] to-[#fff0f4]" />
        <div className="pointer-events-none absolute -top-24 right-[-140px] h-72 w-72 rounded-full bg-[#7B183C]/35 blur-3xl lg:hidden" />
        <div className="pointer-events-none absolute bottom-[-160px] left-[-120px] h-72 w-72 rounded-full bg-[#5A001F]/45 blur-3xl lg:hidden" />

        <div className="relative mx-auto w-full max-w-7xl px-0 lg:px-8">
          <div className="px-5 py-6 sm:px-6 sm:py-8 lg:hidden">
            <h1
              className={`${playfair.className} text-[2.45rem] leading-[0.96] text-white sm:text-[3rem]`}
            >
              Book Your{" "}
              <span className="relative inline-block">
                Perfect Beautician
                <span className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full bg-[#E7A8B8]" />
              </span>
            </h1>

            <div className="mt-7">
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(true)}
                className="w-full bg-transparent text-left"
                aria-haspopup="dialog"
                aria-expanded={isMobileSearchOpen}
              >
                <div className="flex min-h-[54px] items-center rounded-[16px] border border-[#F0DCE1] bg-white px-4 text-[#334155]">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4.5 w-4.5 shrink-0 text-[#F08EA4]"
                    >
                      <path
                        d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="truncate text-[0.9rem] font-medium text-[#3B2732]">
                      Search service, stylist or salon
                    </p>
                  </div>

                  <div className="mx-3 h-6 w-px shrink-0 bg-[#E9D7DC]" />

                  <div className="flex min-w-0 flex-[0.92] items-center gap-2.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4.5 w-4.5 shrink-0 text-[#C44D74]"
                    >
                      <path
                        d="M12 21s7-5.74 7-11a7 7 0 1 0-14 0c0 5.26 7 11 7 11Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="truncate text-[0.86rem] font-medium text-[#6F5661]">
                      {locationStatus === "loading"
                        ? "Finding location"
                        : location}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <HeroDesktopShell
            title={
              <>
                Book Your{" "}
                <span className="relative inline-block">
                  Perfect Beautician
                  <span className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full bg-[#D45B80]" />
                </span>
              </>
            }
            description={
              <p>
                Find bridal makeup, mehndi, skincare, and salon-at-home services
                near you with a quick and simple search.
              </p>
            }
          >
            <form
              className="border border-[#F0E0DE] bg-white p-2.5 shadow-[0_14px_40px_-28px_rgba(90,0,31,0.45)]"
              onSubmit={handleSearchSubmit}
            >
              <div className="flex flex-col gap-3 lg:flex-row">
                <label className="flex min-h-[58px] items-center gap-3 border border-[#F2E6E6] bg-white px-4 lg:flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5 text-[#F08EA4]"
                  >
                    <path
                      d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                    placeholder="Service (e.g., Mehndi)"
                    className="w-full border-none bg-transparent text-[0.95rem] font-medium text-[#334155] placeholder:text-[#94A3B8] focus:outline-none"
                  />
                </label>

                <label className="flex min-h-[58px] items-center gap-3 border border-[#F2E6E6] bg-white px-4 lg:flex-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5 text-[#F08EA4]"
                  >
                    <path
                      d="M12 21s7-5.74 7-11a7 7 0 1 0-14 0c0 5.26 7 11 7 11Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    value={
                      locationStatus === "loading"
                        ? "Finding your location..."
                        : location
                    }
                    onChange={(event) => setLocation(event.target.value)}
                    className="w-full border-none bg-transparent text-[0.95rem] font-semibold text-[#1E293B] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={requestCurrentLocation}
                    className="shrink-0 text-sm font-semibold text-[#8A1238] transition hover:text-[#730F30]"
                  >
                    Use
                  </button>
                </label>

                <button
                  type="submit"
                  className="min-h-[58px] bg-[#8A1238] px-6 text-base font-semibold text-white transition-colors hover:bg-[#730F30] lg:min-w-[132px] lg:text-lg"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => router.push(`/services?category=${chip.query}`)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#EDD6DA] bg-white px-3.5 py-1.5 text-sm font-medium text-[#475569] hover:border-[#8A1238] hover:text-[#8A1238] hover:bg-[#FFF9FB] transition-all cursor-pointer shadow-xs"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </HeroDesktopShell>
        </div>
      </section>

      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        service={service}
        setService={setService}
        location={location}
        setLocation={setLocation}
        locationStatus={locationStatus}
        requestCurrentLocation={requestCurrentLocation}
        handleSearchSubmit={handleSearchSubmit}
        popularSearches={popularSearches}
      />
    </>
  );
}
