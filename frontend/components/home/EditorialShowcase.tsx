"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll tracking across the 300svh pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active look based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest < 0.67) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  // Slide 2: Angled sweep up from bottom (-3.5deg tilt straightening to 0deg)
  const y2 = useTransform(scrollYProgress, [0.12, 0.46], ["100%", "0%"]);
  const rotate2 = useTransform(scrollYProgress, [0.12, 0.46], [-3.5, 0]);

  // Slide 3: Angled sweep up from bottom (-3.5deg tilt straightening to 0deg)
  const y3 = useTransform(scrollYProgress, [0.52, 0.86], ["100%", "0%"]);
  const rotate3 = useTransform(scrollYProgress, [0.52, 0.86], [-3.5, 0]);

  const currentLook = EDITORIAL_LOOKS[activeIndex];

  // Smooth scroll helper for thumbnail clicks
  const scrollToLook = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollDistance = rect.height - window.innerHeight;

    let targetRatio = 0.05;
    if (index === 1) targetRatio = 0.48;
    if (index === 2) targetRatio = 0.88;

    window.scrollTo({
      top: scrollTop + scrollDistance * targetRatio,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="editorial-showcase"
      aria-label="Editorial beauty showcase"
      className="relative h-[300svh] w-full"
    >
      {/* Sticky Viewport Container - Sticks to top while scrolling through 300svh */}
      <div
        className="sticky top-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-[#12050B]"
        style={{ height: "100svh" }}
      >
        {/* Layer 1: Base Look (Bridal) - Natural bright photo, no dark overlay */}
        <div
          className="absolute inset-0 z-10 h-full w-full overflow-hidden"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <Image
            src={EDITORIAL_LOOKS[0].image}
            alt={EDITORIAL_LOOKS[0].alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${EDITORIAL_LOOKS[0].position}`}
          />
        </div>

        {/* Layer 2: Mehendi Look - Angled slide sweep up on scroll */}
        <motion.div
          className="absolute -left-[5%] -top-[5%] z-20 h-[110%] w-[110%] origin-bottom-left overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.55)]"
          style={{
            position: "absolute",
            y: prefersReducedMotion ? (activeIndex >= 1 ? "0%" : "100%") : y2,
            rotate: prefersReducedMotion ? 0 : rotate2,
            willChange: "transform",
          }}
        >
          <Image
            src={EDITORIAL_LOOKS[1].image}
            alt={EDITORIAL_LOOKS[1].alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${EDITORIAL_LOOKS[1].position}`}
          />
        </motion.div>

        {/* Layer 3: Hair Look - Angled slide sweep up on scroll */}
        <motion.div
          className="absolute -left-[5%] -top-[5%] z-30 h-[110%] w-[110%] origin-bottom-left overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.55)]"
          style={{
            position: "absolute",
            y: prefersReducedMotion ? (activeIndex >= 2 ? "0%" : "100%") : y3,
            rotate: prefersReducedMotion ? 0 : rotate3,
            willChange: "transform",
          }}
        >
          <Image
            src={EDITORIAL_LOOKS[2].image}
            alt={EDITORIAL_LOOKS[2].alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${EDITORIAL_LOOKS[2].position}`}
          />
        </motion.div>

        {/* Bottom-Left Floating Champagne Gold Container (Template-Accurate) */}
        <div
          className="absolute bottom-6 left-6 z-40 w-auto max-w-[min(420px,calc(100vw-3rem))] rounded-md border border-[#D4AF37]/90 bg-[#F4CF83] px-4 py-3 shadow-[0_16px_40px_rgba(20,0,8,0.4)] sm:bottom-10 sm:left-10 sm:px-5 sm:py-3.5"
          style={{ backdropFilter: "blur(4px)" }}
        >
          {/* Header Title Row with Chevron */}
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="flex w-full items-center justify-between gap-6 text-left"
            aria-expanded={isExpanded}
            aria-label={`Toggle details for ${currentLook.title}`}
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

          {/* Dotted Horizontal Divider Line (Exact to template) */}
          <div className="my-2 border-b border-dashed border-[#5A001F]/40" />

          {/* Collapsible Details */}
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

        {/* Right-Corner Thumbnails Column (Syncs with scroll & clickable) */}
        <div
          className="absolute right-5 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:right-8 sm:gap-4"
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
                onClick={() => scrollToLook(idx)}
                className={`relative h-14 w-20 overflow-hidden rounded-md transition-all duration-300 sm:h-18 sm:w-28 ${
                  isActive
                    ? "scale-105 border-2 border-[#F4CF83] shadow-[0_0_22px_rgba(244,207,131,0.7)] ring-2 ring-[#F4CF83]/60"
                    : "border border-white/60 opacity-75 hover:scale-102 hover:border-white hover:opacity-100"
                }`}
              >
                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes="(max-width: 640px) 80px, 112px"
                    className={`object-cover ${look.position}`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
