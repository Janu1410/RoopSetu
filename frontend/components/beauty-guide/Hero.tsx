"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Palette,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURED_HERO_LOOKS = [
  {
    id: "pink-chrome",
    category: "Nail Art",
    title: "Soft Pink Chrome Finish",
    subtitle: "High-shine iridescent pearl glaze over a milky blush gel base.",
    technique: "Non-Wipe Glaze & 30s Flash Cure",
    difficulty: "Intermediate",
    time: "25 mins DIY",
    image: "/images/nails/nai-10.jpg",
    saves: "148k saves",
    kitPrice: "₹1,898",
    tag: "Trending #1",
  },
  {
    id: "bridal-makeup",
    category: "Bridal & Festive",
    title: "Royal Heritage HD Bridal",
    subtitle: "Sweat-proof 24H HD airbrush finish, kohl eyes & scarlet pout.",
    technique: "Micro-Layered HD Matte Foundation",
    difficulty: "Advanced DIY",
    time: "60 mins DIY",
    image: "/images/makeup/mak-14.jpg",
    saves: "320k saves",
    kitPrice: "₹3,400",
    tag: "Bridal Classic",
  },
  {
    id: "easy-waves",
    category: "Hairstyles",
    title: "Old Money Brushed Waves",
    subtitle: "Voluminous, glossy S-curls with mirror shine and 24H hold.",
    technique: "Titanium S-Wave & Humidity Shield",
    difficulty: "Easy DIY",
    time: "20 mins DIY",
    image: "/images/hair/hai-22.jpg",
    saves: "128k saves",
    kitPrice: "₹1,499",
    tag: "Reception Chic",
  },
  {
    id: "organic-henna-look",
    category: "Henna Art",
    title: "Organic Rajasthani Henna",
    subtitle: "Dark mahogany stain with shaded botanical roses and lace cuffs.",
    technique: "100% Organic Sojat Triple-Sifted Henna",
    difficulty: "Intermediate",
    time: "45 mins DIY",
    image: "/images/hero/desktop/mehndi-generated.jpg",
    saves: "165k saves",
    kitPrice: "₹650",
    tag: "Festive Pick",
  },
];

export default function Hero() {
  const [selectedLookIndex, setSelectedLookIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const activeLook = FEATURED_HERO_LOOKS[selectedLookIndex];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feed = document.getElementById("discovery-feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
      const searchInput = document.getElementById(
        "lookbook-search-input"
      ) as HTMLInputElement | null;
      if (searchInput && searchQuery) {
        searchInput.value = searchQuery;
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  };

  const handleTagClick = (tag: string) => {
    const feed = document.getElementById("discovery-feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
      const searchInput = document.getElementById(
        "lookbook-search-input"
      ) as HTMLInputElement | null;
      if (searchInput) {
        searchInput.value = tag;
        searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-24 pb-10 sm:pt-28 sm:pb-14 border-b border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Editorial Masthead Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-[#EADAD0] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C7A81]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7A0B2E]" />
            <span>RoopSetu Editorial Beauty Journal &amp; Handbook</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#7A0B2E] bg-[#F7E8EB] px-3 py-0.5 rounded-full border border-[#ECCCD3]">
            <span>2026 Masterclass Edition • DIY Blueprints</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Informative Editorial Content & Search */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A0B2E] bg-[#F5E6E8] px-3 py-1 rounded-full border border-[#ECCCD3]">
                ✦ The Beauty Handbook
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.1] tracking-tight text-[#2B1B20]">
              Curated Beauty Masterclasses, <br />
              <span className="italic font-normal text-[#7A0B2E]">
                Formulas &amp; Shade Blueprints.
              </span>
            </h1>

            <p className="mt-3 text-[14px] sm:text-[15px] text-[#6F6267] leading-relaxed max-w-lg">
              Explore step-by-step masterclasses, pro application timing, exact drugstore product dupes, and South Asian skin-tone shade matching curated exclusively by the RoopSetu beauty editorial collective.
            </p>

            {/* Compact Search Console */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-lg"
            >
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A81] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search masterclasses (e.g. 'Pink Chrome', 'Smokey', 'Braid')..."
                  className="w-full rounded-full border border-[#D9C8BE] bg-white py-2.5 pl-10 pr-4 text-[13px] text-[#2B1B20] placeholder-[#8C7A81] shadow-2xs outline-none transition focus:border-[#7A0B2E] focus:ring-1 focus:ring-[#7A0B2E]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#7A0B2E] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#960E39]"
              >
                <span>Browse Guides</span>
                <ArrowRight size={13} />
              </button>
            </form>

            {/* Trending Quick Jump Tags */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A81]">Quick Jump:</span>
              {[
                { label: "Pink Chrome Nails", query: "Pink Chrome" },
                { label: "Smokey Eyes", query: "Smokey" },
                { label: "Bridal Braid", query: "Braid" },
                { label: "Rose Henna", query: "Henna" },
              ].map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => handleTagClick(tag.query)}
                  className="rounded-full border border-[#E3D3C9] bg-white px-2.5 py-0.5 text-[10px] font-medium text-[#4A3B41] shadow-2xs transition hover:border-[#7A0B2E] hover:text-[#7A0B2E]"
                >
                  #{tag.label}
                </button>
              ))}
            </div>

            {/* 3 Informative Knowledge Pillars (No Beauticians) */}
            <div className="mt-6 pt-4 border-t border-[#EADAD0] grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3D3C9] text-[#7A0B2E]">
                  <BookOpen size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2B1B20]">3-Step Guides</p>
                  <p className="text-[9px] text-[#6F6267] hidden sm:block">Pro Prep &amp; Curing</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3D3C9] text-[#7A0B2E]">
                  <ShoppingBag size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2B1B20]">Drugstore Kits</p>
                  <p className="text-[9px] text-[#6F6267] hidden sm:block">Affordable Dupes</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3D3C9] text-[#7A0B2E]">
                  <Palette size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2B1B20]">Shade Matrix</p>
                  <p className="text-[9px] text-[#6F6267] hidden sm:block">Warm &amp; Olive Tones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Informative Spotlight Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] rounded-[24px] overflow-hidden bg-white border border-[#E3D3C9] shadow-md p-2.5">
              <div className="relative aspect-[4/5] w-full rounded-[18px] overflow-hidden bg-[#FDF0F2]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLook.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeLook.image}
                      alt={activeLook.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 380px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-sm">
                    {activeLook.tag}
                  </span>
                </div>

                {/* Bottom Content Card on Image */}
                <div className="absolute inset-x-0 bottom-0 p-4 z-10 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#FFD6A5]">
                      {activeLook.category}
                    </span>
                    <span className="text-[9px] text-white/70">•</span>
                    <span className="text-[9px] text-white/80 flex items-center gap-0.5">
                      <Clock size={10} /> {activeLook.time}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-medium leading-tight text-white">
                    {activeLook.title}
                  </h3>

                  <p className="text-[11px] text-[#FFD6A5] mt-1 font-medium line-clamp-1">
                    ✦ {activeLook.technique}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white/90">
                      Kit: {activeLook.kitPrice}
                    </span>
                    <Link
                      href={`/articles/${activeLook.id}`}
                      className="inline-flex items-center gap-1 font-bold text-[#FFD6A5] hover:text-white transition-colors"
                    >
                      Read Masterclass <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Interactive Category Selector Pills under the hero card */}
              <div className="mt-2 grid grid-cols-4 gap-1 p-1 rounded-xl bg-[#F7EFE9] border border-[#EADAD0]">
                {FEATURED_HERO_LOOKS.map((look, index) => {
                  const isActive = index === selectedLookIndex;
                  return (
                    <button
                      key={look.id}
                      type="button"
                      onClick={() => setSelectedLookIndex(index)}
                      className={`rounded-lg py-1 px-1 text-center transition-all ${
                        isActive
                          ? "bg-white text-[#7A0B2E] font-bold shadow-2xs"
                          : "text-[#6F6267] hover:text-[#2B1B20] text-[9px] font-medium"
                      }`}
                    >
                      <span className="block text-[9px] font-bold uppercase tracking-wider truncate">
                        {look.category.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
