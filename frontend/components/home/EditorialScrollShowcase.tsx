"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
    alt: "Bride wearing traditional bridal makeup and an elegant veil",
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

export default function EditorialScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const isTransitioning = useRef(false);

  // Smooth, locked step-by-step scroll interaction
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      // Only capture when this section is prominently in the viewport
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;
      if (!inView) return;

      if (isTransitioning.current) {
        e.preventDefault();
        return;
      }

      // Scroll Down gesture
      if (e.deltaY > 16) {
        if (slideIndex < EDITORIAL_LOOKS.length - 1) {
          e.preventDefault();
          // Align section cleanly in view if slightly offset
          if (Math.abs(rect.top) > 10) {
            section.scrollIntoView({ behavior: "smooth" });
          }
          isTransitioning.current = true;
          setSlideIndex((prev) => prev + 1);
          setTimeout(() => {
            isTransitioning.current = false;
          }, 700);
        } else {
          // All 3 images have been viewed: let natural scroll proceed to next section
        }
      }
      // Scroll Up gesture
      else if (e.deltaY < -16) {
        if (slideIndex > 0) {
          e.preventDefault();
          if (Math.abs(rect.top) > 10) {
            section.scrollIntoView({ behavior: "smooth" });
          }
          isTransitioning.current = true;
          setSlideIndex((prev) => prev - 1);
          setTimeout(() => {
            isTransitioning.current = false;
          }, 700);
        } else {
          // At first slide: let natural scroll proceed to previous section
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (isTransitioning.current) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // positive = scroll down

      if (deltaY > 45) {
        // Swiping up -> next slide
        if (slideIndex < EDITORIAL_LOOKS.length - 1) {
          if (e.cancelable) e.preventDefault();
          touchStartY = currentY;
          isTransitioning.current = true;
          setSlideIndex((prev) => prev + 1);
          setTimeout(() => {
            isTransitioning.current = false;
          }, 700);
        }
      } else if (deltaY < -45) {
        // Swiping down -> prev slide
        if (slideIndex > 0) {
          if (e.cancelable) e.preventDefault();
          touchStartY = currentY;
          isTransitioning.current = true;
          setSlideIndex((prev) => prev - 1);
          setTimeout(() => {
            isTransitioning.current = false;
          }, 700);
        }
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    section.addEventListener("touchstart", handleTouchStart, { passive: true });
    section.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      section.removeEventListener("wheel", handleWheel);
      section.removeEventListener("touchstart", handleTouchStart);
      section.removeEventListener("touchmove", handleTouchMove);
    };
  }, [slideIndex]);

  const goToSlide = (idx: number) => {
    if (isTransitioning.current || idx === slideIndex) return;
    isTransitioning.current = true;
    setSlideIndex(idx);
    setTimeout(() => {
      isTransitioning.current = false;
    }, 700);
  };

  const currentLook = EDITORIAL_LOOKS[slideIndex];

  return (
    <section
      ref={sectionRef}
      id="editorial-showcase"
      aria-label="Editorial beauty showcase"
      className="relative h-[100svh] min-h-[580px] w-full overflow-hidden bg-[#FFF8F3] p-2 sm:p-4 lg:p-5 flex flex-col justify-center items-center select-none"
    >
      {/* Rounded Image Stage Frame matching Template */}
      <div className="relative h-[calc(100vh-16px)] sm:h-[calc(100vh-32px)] w-full max-w-[1560px] overflow-hidden rounded-xl sm:rounded-2xl bg-[#0F070B] shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
        {/* Layer 0: Look 1 (Base Layer - Big image is dark/monochrome) */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <motion.div
            animate={{ scale: slideIndex > 0 ? 0.96 : 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={EDITORIAL_LOOKS[0].image}
              alt={EDITORIAL_LOOKS[0].alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1560px"
              className="object-cover grayscale contrast-125 brightness-[0.78]"
              style={{ objectPosition: "center 22%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </div>

        {/* Layer 1: Look 2 (Angled Sweep Scroll Reveal) */}
        <motion.div
          animate={{
            y: slideIndex >= 1 ? "0%" : "115%",
            rotate: slideIndex >= 1 ? 0 : -3.8,
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-20 origin-bottom-left overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.65)]"
        >
          <motion.div
            animate={{ scale: slideIndex >= 2 ? 0.96 : 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={EDITORIAL_LOOKS[1].image}
              alt={EDITORIAL_LOOKS[1].alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1560px"
              className="object-cover grayscale contrast-125 brightness-[0.78]"
              style={{ objectPosition: "center 40%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </motion.div>

        {/* Layer 2: Look 3 (Angled Sweep Scroll Reveal) */}
        <motion.div
          animate={{
            y: slideIndex >= 2 ? "0%" : "115%",
            rotate: slideIndex >= 2 ? 0 : -3.8,
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-30 origin-bottom-left overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.65)]"
        >
          <div className="relative h-full w-full">
            <Image
              src={EDITORIAL_LOOKS[2].image}
              alt={EDITORIAL_LOOKS[2].alt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1560px"
              className="object-cover grayscale contrast-125 brightness-[0.78]"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        </motion.div>

        {/* Top Floating Badge */}
        <div className="absolute top-5 left-5 sm:top-7 sm:left-8 z-40">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-black/50 backdrop-blur-md border border-white/20 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#FFF8F3] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F4CF83]" />
            ROOPSETU · THE BEAUTY EDIT | 0{slideIndex + 1} / 03
          </span>
        </div>

        {/* Bottom-Left Yellow Banner (Matching Template Exactly) */}
        <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-40 pointer-events-auto">
          <div className="w-[280px] sm:w-[330px] rounded-[4px] bg-[#F4CF83] px-5 py-3 sm:px-6 sm:py-3.5 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[0.92rem] sm:text-base font-black uppercase tracking-wider text-[#8A1238] select-none">
                {currentLook.title}
              </span>
              <ChevronDown className="h-4 w-4 text-[#8A1238] shrink-0" aria-hidden="true" />
            </div>
            <div className="mt-2 border-b border-dotted border-[#8A1238]/65" />
          </div>
        </div>

        {/* Right Corner Thumbnails Stack (FULL VIBRANT COLOR, matching Template) */}
        <div
          className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 sm:gap-3.5"
          role="tablist"
          aria-label="Editorial look thumbnails"
        >
          {EDITORIAL_LOOKS.map((look, idx) => {
            const isActive = idx === slideIndex;

            return (
              <button
                key={look.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Switch to ${look.title}`}
                onClick={() => goToSlide(idx)}
                className={`relative h-15 w-22 sm:h-18 sm:w-28 overflow-hidden rounded-[6px] transition-all duration-300 cursor-pointer shadow-md ${
                  isActive
                    ? "scale-105 border-2 border-[#F4CF83] shadow-[0_4px_20px_rgba(244,207,131,0.6)] opacity-100 ring-2 ring-[#F4CF83]/45"
                    : "border border-white/30 opacity-65 hover:opacity-100 hover:scale-102"
                }`}
                style={{ position: "relative" }}
              >
                {/* Small thumbnails remain in full vibrant color as in the template */}
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
    </section>
  );
}

export { EditorialScrollShowcase };
