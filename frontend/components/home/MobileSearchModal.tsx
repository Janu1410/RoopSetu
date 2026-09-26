"use client";

import { FormEvent, useEffect } from "react";

type MobileSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  setService: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  locationStatus: "idle" | "loading" | "ready" | "error";
  requestCurrentLocation: () => void;
  handleSearchSubmit: (e: FormEvent<HTMLFormElement>) => void;
  popularSearches: string[];
};

export default function MobileSearchModal({
  isOpen,
  onClose,
  service,
  setService,
  location,
  setLocation,
  locationStatus,
  requestCurrentLocation,
  handleSearchSubmit,
  popularSearches,
}: MobileSearchModalProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end bg-black/35 backdrop-blur-[2px] lg:hidden">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close search form"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search beautician services"
        className="relative max-h-[82vh] w-full rounded-t-[28px] bg-white shadow-[0_-24px_60px_rgba(90,0,31,0.18)]"
      >
        <div className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-[#E4CDD4]" />

        <div className="px-4 pb-5 pt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[#AA7B8A]">
                Search
              </p>
              <h2 className="mt-1 text-[1.6rem] font-semibold text-[#3B2732]">
                Find beauty services
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EBD8DD] text-[#8A1238]"
              aria-label="Close search form"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4.5 w-4.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form className="mt-5 space-y-3" onSubmit={handleSearchSubmit}>
            <label className="flex min-h-[58px] items-center gap-3 rounded-[18px] border border-[#EBDADF] bg-[#FFFDFC] px-4">
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
                placeholder="Search service, stylist or salon"
                className="w-full border-none bg-transparent text-[0.98rem] text-[#334155] placeholder:text-[#A08B95] focus:outline-none"
              />
            </label>

            <label className="flex min-h-[58px] items-center gap-3 rounded-[18px] border border-[#EBDADF] bg-[#FFFDFC] px-4">
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
                className="w-full border-none bg-transparent text-[0.98rem] font-medium text-[#334155] focus:outline-none"
              />
              <button
                type="button"
                onClick={requestCurrentLocation}
                className="shrink-0 text-sm font-semibold text-[#8A1238] transition hover:text-[#730F30]"
              >
                Use
              </button>
            </label>

            <div className="pt-2">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-[#AA7B8A]">
                Popular Searches
              </p>
              <div className="mt-3 space-y-1">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    className="flex w-full items-center gap-3 rounded-[16px] px-1 py-3 text-left text-sm text-[#5A4451] transition hover:bg-[#FFF5F8]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4.5 w-4.5 shrink-0 text-[#8A1238]"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-[18px] bg-[#8A1238] px-5 py-4 text-base font-semibold text-white transition hover:bg-[#730F30]"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
