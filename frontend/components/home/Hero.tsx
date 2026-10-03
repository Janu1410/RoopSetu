"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Playfair_Display } from "next/font/google";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  buildCategorySearchHref,
  buildServiceSearchHref,
} from "@/lib/home-search.mjs";
import MobileSearchModal from "./MobileSearchModal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const popularCategories = [
  { label: "Bridal Makeup", query: "bridal" },
  { label: "Mehendi", query: "mehendi" },
  { label: "Nails", query: "nails" },
  { label: "Hair & Draping", query: "hair-draping" },
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
  const locationRequestRef = useRef<AbortController | null>(null);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsMobileSearchOpen(false);
    router.push(buildServiceSearchHref({ service, location }));
  };

  const requestCurrentLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocation("Location unavailable");
      setLocationStatus("error");
      return;
    }

    locationRequestRef.current?.abort();
    const controller = new AbortController();
    locationRequestRef.current = controller;
    setLocationStatus("loading");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        if (controller.signal.aborted) return;

        try {
          const resolvedLocation = await reverseGeocode(
            coords.latitude,
            coords.longitude,
            controller.signal,
          );
          if (controller.signal.aborted) return;
          setLocation(resolvedLocation || "Current location");
          setLocationStatus("ready");
        } catch {
          if (controller.signal.aborted) return;
          setLocation("Current location");
          setLocationStatus("ready");
        }
      },
      () => {
        if (controller.signal.aborted) return;
        setLocation("Location unavailable");
        setLocationStatus("error");
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 10 * 60 * 1000,
      },
    );
  };

  useEffect(() => () => locationRequestRef.current?.abort(), []);

  const openCategory = (category: string) => {
    router.push(buildCategorySearchHref(category));
  };

  return (
    <section className="bg-[#5A001F] px-3 pb-3 sm:px-4 lg:px-5">
      <div className="grid overflow-hidden rounded-[10px] border border-[#D4AF37]/70 bg-[#5A001F] lg:min-h-[calc(100svh-112px)] lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden bg-[#32121E] sm:min-h-[500px] lg:min-h-[calc(100svh-112px)]">
          <Image
            src="/images/hero/desktop/her-30.jpg"
            alt="Bridal beauty look in a warmly lit studio"
            fill
            preload
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover object-[54%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#230914]/35 via-transparent to-[#230914]/10" />
          <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/85 sm:bottom-7 sm:left-7">
            <span className="h-px w-8 bg-[#E9C77B]" />
            RoopSetu · The bridge of beauty
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-12 text-center text-[#FFF8F3] sm:px-10 sm:py-14 lg:px-10 lg:py-10 xl:px-16">
          <p className="mb-3 inline-flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[#F3D9E0] sm:text-xs">
            <Sparkles
              className="h-3.5 w-3.5 text-[#D4AF37]"
              aria-hidden="true"
            />
            Hand-verified beauty professionals
          </p>

          <h1
            className={`${playfair.className} max-w-[12ch] text-[clamp(3.25rem,5.5vw,5.9rem)] leading-[0.92] tracking-[-0.045em] text-white [text-wrap:balance]`}
          >
            Book Your
            <em className="mt-1 block font-normal text-[#F6E7D1]">
              Perfect Beautician
            </em>
          </h1>

          <div className="relative mt-6 aspect-[2.05/1] w-full max-w-[430px] overflow-hidden rounded-[8px] border border-[#D4AF37]/80 bg-[#3D1C28] shadow-[0_18px_44px_rgba(20,0,8,0.22)] sm:mt-7">
            <Image
              src="/images/hero/desktop/mehndi-generated.jpg"
              alt="Bridal mehendi artistry"
              fill
              sizes="(max-width: 1023px) 80vw, 430px"
              className="object-cover object-center"
            />
          </div>

          <p className="mt-5 max-w-[510px] text-sm leading-6 text-[#F7E9EC]/90 sm:mt-6 sm:text-base sm:leading-7">
            Find bridal makeup, mehndi, skincare, and salon-at-home services
            near you with a quick and simple search.
          </p>

          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isMobileSearchOpen}
            className="premium-interactive mt-6 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[4px] bg-[#E4BE73] px-8 text-[0.76rem] font-bold uppercase tracking-[0.1em] text-[#4B071D] shadow-[0_12px_28px_rgba(20,0,8,0.2)] transition-colors hover:bg-[#F0D294] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#FFF8F3] sm:mt-7"
          >
            Find a Beautician
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[0.68rem] font-medium text-[#F2DCE2]/80">
            {popularCategories.map((category, index) => (
              <span
                key={category.query}
                className="inline-flex items-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => openCategory(category.query)}
                  className="transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4BE73]"
                >
                  {category.label}
                </button>
                {index < popularCategories.length - 1 ? (
                  <span aria-hidden="true" className="text-[#D4AF37]/70">
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </div>

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
    </section>
  );
}
