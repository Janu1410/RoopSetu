"use client";

import Image from "next/image";
import { Sparkles, ArrowDown, ChevronRight } from "lucide-react";

const CATEGORY_CHIPS = [
  { icon: "💅", label: "Nail Art", id: "nail-art" },
  { icon: "💇", label: "Hair Styling", id: "hairstyles" },
  { icon: "💄", label: "Makeup", id: "makeup" },
  { icon: "👰", label: "Bridal", id: "bridal-packages" },
];

export default function BeautyGuideHero() {
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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#4A0019] via-[#64102D] to-[#7C1437] pt-20 pb-8 sm:pt-24 sm:pb-12 text-white border-b border-[#3D0A1C]">
      {/* Background Decorative Ambient Blur Orbs (matching home section design) */}
      <div className="pointer-events-none absolute -top-20 right-[-100px] h-64 w-64 rounded-full bg-[#941B3E]/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-[-100px] h-64 w-64 rounded-full bg-[#350212]/50 blur-3xl" />

      {/* Subtle Desktop Background Image for Depth */}
      <div className="absolute inset-0 z-0 hidden lg:block opacity-25 pointer-events-none">
        <Image
          src="/images/hero/desktop/her-30.jpg"
          alt="RoopSetu Beauty Guide"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A0019] via-[#4A0019]/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl py-2 sm:py-4">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3 py-1 border border-white/15 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FFD6A5] mb-2.5">
            <Sparkles size={12} className="text-[#FFD6A5]" />
            <span>RoopSetu Beauty Guide</span>
          </div>

          {/* Simple, Powerful Headline (Home-style Playfair typography) */}
          <h1 className="font-serif text-[2.2rem] sm:text-[2.85rem] lg:text-[3.25rem] font-medium leading-[1.05] tracking-tight text-white">
            The Beauty{" "}
            <span className="relative inline-block text-[#FFE5D0]">
              Guide
              <span className="absolute -bottom-1.5 left-0 h-[3.5px] w-full rounded-full bg-[#E7A8B8]" />
            </span>
          </h1>

          {/* Simple, User-Friendly 1-line Subtitle */}
          <p className="mt-2.5 text-[13px] sm:text-[15px] text-white/85 leading-relaxed font-normal max-w-lg">
            Curated masterclasses, verified drugstore product kits, and shade blueprints for South Asian celebration beauty.
          </p>

          {/* Clean Action Button */}
          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection("discovery-feed")}
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#FFE5D0] px-4.5 py-2 text-xs font-bold uppercase tracking-wider text-[#7A0B2E] shadow-md transition-all active:scale-95"
            >
              <span>Explore Masterclasses</span>
              <ArrowDown size={13} />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("viral-moodboards")}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xs border border-white/20 px-3.5 py-2 text-xs font-semibold text-white transition-all active:scale-95"
            >
              <span>Moodboards</span>
              <ChevronRight size={13} className="text-white/70" />
            </button>
          </div>

          {/* Category Quick Chips (Home-Hero Style) */}
          <div className="mt-5 pt-3 border-t border-white/15 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 mr-0.5">
              Categories:
            </span>
            {CATEGORY_CHIPS.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => scrollToSection("discovery-feed", chip.id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 px-3 py-1 text-xs font-medium text-white transition-all"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
