"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { heroScenes, type HeroScene } from "./hero/heroScenes";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroScenes.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, []);

  const activeScene = heroScenes[activeIndex];

  return (
    <section
      className="relative h-[85vh] w-full overflow-hidden bg-black"
      aria-label="Beauty inspiration"
    >
      <h1 className="sr-only">
        RoopSetu — Beauty inspiration, beautifully discovered.
      </h1>

      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Unified Image for both Mobile and Desktop */}
          <div className="absolute inset-0">
            <Image
              src={activeScene.image}
              alt={`${activeScene.category} — ${activeScene.title.replace("\n", " ")}`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              style={{ objectPosition: activeScene.objectPosition }}
            />
          </div>

          {/* Premium Warm Gradient Overlay (matches Amoura reference) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0f]/90 via-[#1a0f0f]/40 to-black/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-24 max-w-[1400px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
              {activeScene.category}
            </p>
            <h2 className="mb-6 font-serif text-[48px] leading-[1.05] tracking-tight sm:text-[64px] md:text-[72px] lg:text-[84px] drop-shadow-lg">
              {activeScene.title.split("\n").map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-[16px] font-medium text-white/90 sm:text-[18px] md:text-[20px] drop-shadow-md">
              {activeScene.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-6">
        <div className="flex gap-2">
          {heroScenes.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(heroScenes.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
