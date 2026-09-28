"use client";

import Image from "next/image";
import { Sparkles, ArrowDown, ChevronRight, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string, categoryId?: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    if (categoryId) {
      const tab = document.getElementById(`cat-tab-${categoryId}`);
      if (tab) tab.click();
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#1E0E14] text-white pt-24 pb-12 sm:pt-28 sm:pb-16 border-b border-[#3D1A25]">
      {/* Background Cover Image with Editorial Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/desktop/her-30.jpg"
          alt="RoopSetu Beauty Editorial Cover"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-right"
        />
        {/* Soft, Warm Editorial Gradient Overlay (ensures left-hand text is super crisp and readable) */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#1E0E14] via-[#1E0E14]/90 sm:via-[#1E0E14]/75 to-[#1E0E14]/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="max-w-xl sm:max-w-2xl py-4 sm:py-6">
          {/* Subtle Editorial Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-[#FFD6A5] mb-3"
          >
            <Sparkles size={12} className="text-[#FFD6A5]" />
            <span>RoopSetu Beauty Guide • Editorial Edition</span>
          </motion.div>

          {/* Simple, Impactful Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.15]"
          >
            Curated Beauty Masterclasses &amp; Recreate Blueprints.
          </motion.h1>

          {/* User-Friendly Concise Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed font-normal max-w-lg"
          >
            Step-by-step DIY techniques, verified drugstore product dupes, and undertone shade-matching curated for modern celebrations.
          </motion.p>

          {/* Clean Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection("discovery-feed")}
              className="inline-flex items-center gap-2 rounded-full bg-[#7A0B2E] hover:bg-[#960E39] border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-95"
            >
              <span>Explore Masterclasses</span>
              <ArrowDown size={14} />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("viral-moodboards")}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all active:scale-95"
            >
              <span>Moodboards</span>
              <ChevronRight size={14} className="text-white/70" />
            </button>
          </motion.div>

          {/* Quick Category Navigation Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 mr-1 flex items-center gap-1">
              <Layers size={11} /> Quick Jump:
            </span>
            {[
              { label: "Nail Art", id: "nail-art" },
              { label: "Makeup", id: "makeup" },
              { label: "Hairstyles", id: "hairstyles" },
              { label: "Bridal", id: "bridal-packages" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToSection("discovery-feed", cat.id)}
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1 text-[11px] font-medium text-white/90 transition-all hover:text-white"
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
