"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FEATURED_HERO_LOOKS = [
  {
    id: "pink-chrome",
    category: "Nail Art",
    title: "Soft Pink Chrome Finish",
    subtitle: "High-shine pearl glaze over milky blush gel base.",
    image: "/images/nails/nai-10.jpg",
    saves: "148k saves",
    kitPrice: "₹1,798",
    artist: "Priya Sharma (Ahmedabad)",
    tag: "Viral #1",
  },
  {
    id: "bridal-makeup",
    category: "Bridal Makeup",
    title: "Royal Heritage Bridal",
    subtitle: "Sweat-proof HD base, kohl eyes & scarlet pout.",
    image: "/images/makeup/mak-14.jpg",
    saves: "320k saves",
    kitPrice: "₹3,400",
    artist: "Meera Trivedi (Bodakdev)",
    tag: "Wedding Trend",
  },
  {
    id: "easy-waves",
    category: "Hairstyles",
    title: "Old Money Brushed Waves",
    subtitle: "Voluminous S-curls with mirror shine.",
    image: "/images/hair/hai-22.jpg",
    saves: "128k saves",
    kitPrice: "₹1,499",
    artist: "Kavita Patel (Surat)",
    tag: "Everyday Chic",
  },
  {
    id: "rose-pattern",
    category: "Mehndi Art",
    title: "Hyper-Real Rose Henna",
    subtitle: "Dark mahogany stain with shaded botanical roses.",
    image: "/images/nails/nai-11.jpg",
    saves: "155k saves",
    kitPrice: "₹850",
    artist: "Riddhi Shah (Surat)",
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
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-24 pb-14 sm:pt-32 sm:pb-20 border-b border-[#EEDFD7]">
      {/* Editorial Top Masthead Bar */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EADAD0] text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C7A81]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7A0B2E]" />
            <span>RoopSetu Editorial • Issue No. 04</span>
          </div>

          <div className="flex items-center gap-2 text-[#7A0B2E] bg-[#F7E8EB] px-3 py-1 rounded-full border border-[#ECCCD3]">
            <span className="h-2 w-2 rounded-full bg-[#E60023] animate-pulse" />
            <span>1,000,000+ Pinterest Monthly Views &amp; Saves</span>
          </div>

          <div className="hidden md:block">
            <span>Autumn / Festive 2026 Edition</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Prestigious Editorial Typography & Search Console */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A0B2E] bg-[#F5E6E8] px-3 py-1 rounded-full">
                ✦ The Visual Beauty Directory
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/40" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[68px] font-medium leading-[1.04] tracking-tight text-[#2B1B20]">
              Where Viral Trends <br />
              <span className="italic font-normal text-[#7A0B2E]">
                Become Your Reality.
              </span>
            </h1>

            <p className="mt-5 text-[15px] sm:text-[17px] text-[#6F6267] leading-relaxed max-w-xl">
              Curated from 1M+ Pinterest saves. Discover 3-step masterclasses, shoppable drugstore kits, and hand-verified local artists in Ahmedabad and Surat ready to recreate the look.
            </p>

            {/* Interactive Search Console */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-xl"
            >
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A81] pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 30+ looks (e.g., 'Pink Chrome', 'Smokey Eye', 'Bridal Braid')..."
                  className="w-full rounded-full border border-[#D9C8BE] bg-white py-3.5 pl-11 pr-4 text-[13px] sm:text-[14px] text-[#2B1B20] placeholder-[#8C7A81] shadow-sm outline-none transition focus:border-[#7A0B2E] focus:ring-2 focus:ring-[#7A0B2E]/20"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7A0B2E] px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#960E39]"
              >
                Explore Looks
                <ArrowRight size={14} />
              </button>
            </form>

            {/* Trending Quick Tag Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-[#8C7A81]">Trending:</span>
              {[
                { label: "Pink Chrome Nails", query: "Pink Chrome" },
                { label: "Smokey Glam", query: "Smokey" },
                { label: "Bridal Braid", query: "Braid" },
                { label: "Organic Henna", query: "Mehndi" },
                { label: "Pastel Saree", query: "Saree" },
              ].map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => handleTagClick(tag.query)}
                  className="rounded-full border border-[#E3D3C9] bg-white px-3 py-1 text-[11px] font-medium text-[#4A3B41] shadow-2xs transition hover:border-[#7A0B2E] hover:text-[#7A0B2E]"
                >
                  #{tag.label}
                </button>
              ))}
            </div>

            {/* 3-Pillar Trust Props Bar */}
            <div className="mt-10 pt-6 border-t border-[#EADAD0] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E3D3C9] text-[#7A0B2E] shadow-2xs">
                  <ShoppingBag size={17} />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B1B20]">
                    Shoppable Kits
                  </p>
                  <p className="text-[11px] text-[#6F6267]">Nykaa &amp; Amazon links</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E3D3C9] text-[#7A0B2E] shadow-2xs">
                  <Sparkles size={17} />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B1B20]">
                    3-Step Blueprints
                  </p>
                  <p className="text-[11px] text-[#6F6267]">Pro prep &amp; curing times</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E3D3C9] text-[#7A0B2E] shadow-2xs">
                  <ShieldCheck size={17} />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wider text-[#2B1B20]">
                    Verified Artists
                  </p>
                  <p className="text-[11px] text-[#6F6267]">Doorstep in Gujarat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Editorial Magazine Look Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[430px] rounded-[32px] overflow-hidden bg-white border border-[#E3D3C9] shadow-2xl p-3">
              {/* Main Image */}
              <div className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden bg-[#FDF0F2]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLook.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeLook.image}
                      alt={activeLook.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 430px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
                  </motion.div>
                </AnimatePresence>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-md flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E60023]" />
                    {activeLook.tag} • {activeLook.saves}
                  </span>
                </div>

                {/* Bottom Content Card on Image */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-10 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD6A5]">
                    {activeLook.category}
                  </span>
                  <h3 className="font-serif text-2xl font-medium leading-tight text-white mt-1">
                    {activeLook.title}
                  </h3>
                  <p className="text-[12px] text-white/80 mt-1 line-clamp-1">
                    {activeLook.subtitle}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#FFD6A5]">
                      Kit: {activeLook.kitPrice}
                    </span>
                    <a
                      href="#discovery-feed"
                      className="inline-flex items-center gap-1 font-bold text-white hover:text-[#FFD6A5] transition-colors"
                    >
                      View Tutorial <ChevronRight size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Interactive Category Selector Pills under the hero card */}
              <div className="mt-3 grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-[#F7EFE9] border border-[#EADAD0]">
                {FEATURED_HERO_LOOKS.map((look, index) => {
                  const isActive = index === selectedLookIndex;
                  return (
                    <button
                      key={look.id}
                      type="button"
                      onClick={() => setSelectedLookIndex(index)}
                      className={`rounded-xl py-2 px-1 text-center transition-all ${
                        isActive
                          ? "bg-white text-[#7A0B2E] font-bold shadow-xs"
                          : "text-[#6F6267] hover:text-[#2B1B20] text-[11px] font-medium"
                      }`}
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-wider truncate">
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
