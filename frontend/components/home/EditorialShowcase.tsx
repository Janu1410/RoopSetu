"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export type EditorialLook = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  position: string;
  href: string;
};

export const EDITORIAL_LOOKS: EditorialLook[] = [
  {
    id: "bridal",
    number: "01",
    title: "BRIDE HAIR & MAKEUP",
    description:
      "A considered bridal look, brought to life by verified artists who understand every detail of your day.",
    image: "/images/hero/desktop/her-30.jpg",
    alt: "Bride wearing traditional bridal makeup and an elegant hairstyle",
    position: "object-[52%_32%]",
    href: "/services?category=bridal",
  },
  {
    id: "mehendi",
    number: "02",
    title: "GOLDEN TOUCH & GLAMOUR",
    description:
      "Expressive henna artistry and soft luminous glam for intimate rituals and joyful celebrations.",
    image: "/images/hero/desktop/mehndi-generated.jpg",
    alt: "Intricate mehendi artistry created for a bridal celebration",
    position: "object-[center_65%]",
    href: "/services?category=mehendi",
  },
  {
    id: "hair",
    number: "03",
    title: "SIGNATURE HAIRSTYLES",
    description:
      "From soft, modern styling to timeless occasion hair, discover a celebratory look that feels like you.",
    image: "/images/hero/desktop/her-32.jpg",
    alt: "Traditional occasion hairstyle finished with floral accessories",
    position: "object-[center_28%]",
    href: "/services?category=hair-draping",
  },
];

export default function EditorialShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance looks every 5.5s unless hovered
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EDITORIAL_LOOKS.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const currentLook = EDITORIAL_LOOKS[activeIndex];

  return (
    <section
      id="editorial-showcase"
      aria-label="Editorial beauty showcase"
      className="relative w-full overflow-hidden bg-[#12050B]"
      style={{
        height: "100svh",
        minHeight: "560px",
        maxHeight: "1080px",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Framer-style Angled Slide Transition */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {EDITORIAL_LOOKS.map((look, idx) => {
          const isActive = idx === activeIndex;
          const isBelow = idx > activeIndex;

          return (
            <div
              key={look.id}
              className={`absolute inset-0 h-full w-full origin-bottom-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? "z-10 opacity-100 scale-100 rotate-0 translate-y-0"
                  : isBelow
                    ? "z-20 opacity-0 scale-105 -rotate-3 translate-y-full pointer-events-none"
                    : "z-0 opacity-40 scale-95 rotate-0 -translate-y-6 pointer-events-none"
              }`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                willChange: "transform, opacity",
              }}
            >
              <Image
                src={look.image}
                alt={look.alt}
                fill
                priority
                sizes="100vw"
                className={`object-cover ${look.position}`}
              />
              {/* Soft cinematic vignette overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />
            </div>
          );
        })}
      </div>

      {/* Bottom-Left Floating Container (Faithful to Framer Template Reference) */}
      <div
        className="absolute bottom-6 left-6 z-30 w-auto max-w-[min(400px,calc(100vw-3rem))] rounded-md border border-[#D4AF37]/80 bg-[#F4CF83] px-4 py-3 shadow-[0_16px_36px_rgba(20,0,8,0.45)] sm:bottom-10 sm:left-10 sm:px-5 sm:py-3.5"
        style={{ backdropFilter: "blur(4px)" }}
      >
        {/* Title row with chevron toggle */}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex w-full items-center justify-between gap-6 text-left"
          aria-expanded={isExpanded}
          aria-label={`Toggle description for ${currentLook.title}`}
        >
          <span className="font-sans text-xs font-black uppercase tracking-wider text-[#5A001F] sm:text-sm md:text-base">
            {currentLook.title}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#5A001F] transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Dotted horizontal divider (as in template) */}
        <div className="my-2 border-b border-dashed border-[#5A001F]/40" />

        {/* Expandable details */}
        {isExpanded ? (
          <div className="mt-2 pt-1 transition-all duration-200">
            <p className="text-xs font-medium leading-relaxed text-[#5A001F]/90 sm:text-[0.82rem]">
              {currentLook.description}
            </p>
            <Link
              href={currentLook.href}
              className="group mt-3 inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-widest text-[#5A001F] transition-colors hover:text-[#7A0D30]"
            >
              <span>Explore this look</span>
              <ArrowUpRight
                className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>

      {/* Right-Side Thumbnail Column (Hover / Click to switch look) */}
      <div
        className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 sm:right-8 sm:gap-4"
        role="tablist"
        aria-label="Editorial looks gallery"
      >
        {EDITORIAL_LOOKS.map((look, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={look.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`View ${look.title}`}
              onMouseEnter={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => {
                setActiveIndex(idx);
                setIsPaused(true);
              }}
              className={`relative h-14 w-20 overflow-hidden rounded-md transition-all duration-300 sm:h-18 sm:w-28 ${
                isActive
                  ? "scale-105 border-2 border-[#F4CF83] shadow-[0_0_20px_rgba(244,207,131,0.65)] ring-2 ring-[#F4CF83]/60"
                  : "border border-white/40 opacity-70 hover:scale-102 hover:border-white/80 hover:opacity-100"
              }`}
              style={{ position: "relative" }}
            >
              <Image
                src={look.image}
                alt={look.alt}
                fill
                sizes="(max-width: 640px) 80px, 112px"
                className={`object-cover ${look.position}`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
