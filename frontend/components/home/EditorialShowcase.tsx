"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

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
    title: "BLUSH BEAUTY & BALANCE",
    eyebrow: "The Finishing Touch",
    description:
      "From soft, modern styling to timeless occasion hair, discover a celebratory look that feels like you.",
    image: "/images/hair/hai-22.jpg",
    alt: "Traditional occasion hairstyle finished with floral accessories",
    href: "/services?category=hair-draping",
  },
];

export default function EditorialShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Pinned scroll-driven transition across 300vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active slide dynamically based on scroll position (no hover required)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) {
      setActiveIdx(0);
    } else if (latest < 0.68) {
      setActiveIdx(1);
    } else {
      setActiveIdx(2);
    }
  });

  // Layer 0 (Look 1) Subtle depth scale
  const scale0 = useTransform(scrollYProgress, [0, 0.45], [1, 0.95]);

  // Layer 1 (Look 2) Angled sweep tilt from -3.8deg to 0deg
  const y1 = useTransform(scrollYProgress, [0.18, 0.48], ["115%", "0%"]);
  const rotate1 = useTransform(scrollYProgress, [0.18, 0.48], [-3.8, 0]);
  const scale1 = useTransform(scrollYProgress, [0.5, 0.82], [1, 0.95]);

  // Layer 2 (Look 3) Angled sweep tilt from -3.8deg to 0deg over Look 2
  const y2 = useTransform(scrollYProgress, [0.52, 0.82], ["115%", "0%"]);
  const rotate2 = useTransform(scrollYProgress, [0.52, 0.82], [-3.8, 0]);

  // Smooth click navigation to target slide's scroll position
  const scrollToSlide = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollRange = containerRef.current.scrollHeight - window.innerHeight;
    const targetProgress = idx === 0 ? 0.05 : idx === 1 ? 0.45 : 0.85;
    window.scrollTo({
      top: containerTop + scrollRange * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      aria-label="Editorial beauty showcase"
      className="relative h-[300vh] w-full bg-[#FFF8F3]"
    >
      {/* Sticky 100vh Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden p-3 sm:p-5 lg:p-6 flex flex-col justify-center items-center bg-[#FFF8F3]">
        {/* Rounded Image Stage Frame matching Template */}
        <div className="relative h-[calc(100vh-24px)] sm:h-[calc(100vh-40px)] w-full max-w-[1540px] overflow-hidden rounded-xl sm:rounded-2xl bg-[#14080D] shadow-[0_16px_48px_rgba(45,13,26,0.12)]">
          {/* Layer 0: Look 1 (Base Layer) */}
          <div className="absolute inset-0 z-10 overflow-hidden">
            <motion.div
              style={{ scale: scale0 }}
              className="relative h-full w-full"
            >
              <Image
                src={EDITORIAL_LOOKS[0].image}
                alt={EDITORIAL_LOOKS[0].alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1540px"
                className="object-cover"
                style={{ objectPosition: "center 22%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </motion.div>
          </div>

          {/* Layer 1: Look 2 (Angled Sweep Scroll Reveal) */}
          <motion.div
            style={{ y: y1, rotate: rotate1 }}
            className="absolute inset-0 z-20 origin-bottom-left overflow-hidden shadow-[0_-15px_40px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              style={{ scale: scale1 }}
              className="relative h-full w-full"
            >
              <Image
                src={EDITORIAL_LOOKS[1].image}
                alt={EDITORIAL_LOOKS[1].alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1540px"
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </motion.div>
          </motion.div>

          {/* Layer 2: Look 3 (Angled Sweep Scroll Reveal) */}
          <motion.div
            style={{ y: y2, rotate: rotate2 }}
            className="absolute inset-0 z-30 origin-bottom-left overflow-hidden shadow-[0_-15px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="relative h-full w-full">
              <Image
                src={EDITORIAL_LOOKS[2].image}
                alt={EDITORIAL_LOOKS[2].alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1540px"
                className="object-cover"
                style={{ objectPosition: "center 30%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            </div>
          </motion.div>

          {/* Top Floating Badge */}
          <div className="absolute top-5 left-5 sm:top-7 sm:left-8 z-40">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-black/45 backdrop-blur-md border border-white/20 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#FFF8F3] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F4CF83]" />
              ROOPSETU · THE BEAUTY EDIT | 0{activeIdx + 1} / 03
            </span>
          </div>

          {/* Bottom-Left Yellow Banner (Matching Template Exactly) */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-40 pointer-events-auto">
            <div className="w-[280px] sm:w-[340px] rounded-[4px] bg-[#F4CF83] px-5 py-3 sm:px-6 sm:py-3.5 shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[0.92rem] sm:text-base font-black uppercase tracking-wider text-[#8A1238] select-none">
                  {EDITORIAL_LOOKS[activeIdx].title}
                </span>
                <ChevronDown className="h-4 w-4 text-[#8A1238] shrink-0" aria-hidden="true" />
              </div>
              <div className="mt-2 border-b border-dotted border-[#8A1238]/60" />
            </div>
          </div>

          {/* Right Corner Thumbnails Stack (Scroll-linked, matching Template) */}
          <div
            className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 sm:gap-3.5"
            role="tablist"
            aria-label="Editorial look thumbnails"
          >
            {EDITORIAL_LOOKS.map((look, idx) => {
              const isActive = idx === activeIdx;

              return (
                <button
                  key={look.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Scroll to ${look.title}`}
                  onClick={() => scrollToSlide(idx)}
                  className={`relative h-15 w-22 sm:h-18 sm:w-28 overflow-hidden rounded-[6px] transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "scale-105 border-2 border-[#F4CF83] shadow-[0_4px_18px_rgba(244,207,131,0.55)] opacity-100 ring-2 ring-[#F4CF83]/40"
                      : "border border-white/30 opacity-60 hover:opacity-90"
                  }`}
                  style={{ position: "relative" }}
                >
                  <Image
                    src={look.image}
                    alt={look.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
