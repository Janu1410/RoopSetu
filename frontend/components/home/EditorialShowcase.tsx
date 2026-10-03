"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";

export type EditorialLook = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  href: string;
};

export const EDITORIAL_LOOKS: EditorialLook[] = [
  {
    id: "bridal",
    number: "01",
    title: "BRIDE HAIR & MAKEUP",
    eyebrow: "The Wedding Edit",
    description:
      "A considered bridal look, brought to life by artists who understand every detail of your day.",
    image: "/images/hero/desktop/her-30.jpg",
    alt: "Bride wearing traditional bridal makeup and an elegant hairstyle",
    href: "/services?category=bridal",
  },
  {
    id: "mehendi",
    number: "02",
    title: "GOLDEN TOUCH & GLAMOUR",
    eyebrow: "The Celebration Edit",
    description:
      "Expressive henna artistry and soft luminous glam for intimate rituals and joyful gatherings.",
    image: "/images/hero/desktop/mehndi-generated.jpg",
    alt: "Intricate mehendi artistry created for a bridal celebration",
    href: "/services?category=mehendi",
  },
  {
    id: "hair",
    number: "03",
    title: "SIGNATURE HAIRSTYLES",
    eyebrow: "The Finishing Touch",
    description:
      "From soft, modern styling to timeless occasion hair, discover a celebratory look that feels like you.",
    image: "/images/hero/desktop/her-32.jpg",
    alt: "Traditional occasion hairstyle finished with floral accessories",
    href: "/services?category=hair-draping",
  },
];

export default function EditorialShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Auto-advance every 5.5 seconds unless user hovers
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EDITORIAL_LOOKS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const currentLook = EDITORIAL_LOOKS[activeIndex];

  return (
    <section
      id="editorial-showcase"
      aria-label="Editorial beauty showcase"
      className="relative h-screen min-h-[580px] w-full overflow-hidden bg-[#14080D]"
      style={{ height: "100svh", minHeight: "580px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Full-Viewport Background Images (Bulletproof CSS transition with angled sweep) */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        {EDITORIAL_LOOKS.map((look, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={look.id}
              className={`absolute inset-0 h-full w-full origin-bottom-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive
                  ? "z-10 opacity-100 scale-100 rotate-0 translate-y-0"
                  : "z-0 opacity-0 scale-105 -rotate-2 translate-y-6 pointer-events-none"
              }`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
              <Image
                src={look.image}
                alt={look.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Filmic dark vignette overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/35" />
            </div>
          );
        })}
      </div>

      {/* Top Floating Editorial Badge */}
      <div className="pointer-events-none absolute left-6 top-6 z-20 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/90 sm:left-12 sm:top-10">
        <Sparkles className="h-3.5 w-3.5 text-[#F4CF83]" aria-hidden="true" />
        <span>RoopSetu · The Beauty Edit</span>
        <span className="mx-1 h-3 w-px bg-white/30" />
        <span className="text-[#F4CF83]">
          {currentLook.number} / 0{EDITORIAL_LOOKS.length}
        </span>
      </div>

      {/* Bottom Left Floating Card (Styled after template reference) */}
      <div className="absolute bottom-6 left-6 z-30 w-[calc(100%-3rem)] max-w-[390px] rounded-lg border border-[#D4AF37]/90 bg-[#F4CF83] p-4 shadow-[0_20px_45px_rgba(20,0,8,0.45)] sm:bottom-12 sm:left-12 sm:p-5">
        {/* Card Header with Title and Chevron */}
        <button
          type="button"
          className="flex w-full items-center justify-between text-left"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <span className="font-sans text-[0.92rem] font-black uppercase tracking-wider text-[#5A001F] sm:text-base">
            {currentLook.title}
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#5A001F] transition-transform duration-250 ${
              isExpanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        {/* Dotted Divider Line (Matching template) */}
        <div className="my-2.5 border-b border-dashed border-[#5A001F]/35" />

        {/* Collapsible Content */}
        {isExpanded ? (
          <div className="overflow-hidden transition-all duration-200">
            <p className="text-xs font-medium leading-relaxed text-[#5A001F]/85 sm:text-[0.82rem]">
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

      {/* Right Corner Thumbnails Stack (Hover to switch, matching template) */}
      <div
        className="absolute right-5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 sm:right-10 sm:gap-4"
        role="tablist"
        aria-label="Editorial look thumbnails"
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
              className={`relative h-14 w-20 overflow-hidden rounded-md transition-all duration-300 sm:h-18 sm:w-28 sm:rounded-lg ${
                isActive
                  ? "scale-105 border-2 border-[#F4CF83] shadow-[0_6px_24px_rgba(244,207,131,0.55)] ring-2 ring-[#F4CF83]/50"
                  : "border border-white/30 opacity-60 hover:scale-102 hover:border-white/70 hover:opacity-100"
              }`}
              style={{ position: "relative" }}
            >
              <Image
                src={look.image}
                alt={look.alt}
                fill
                sizes="(max-width: 640px) 80px, 120px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
