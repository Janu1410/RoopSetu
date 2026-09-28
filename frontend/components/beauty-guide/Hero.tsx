"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    kitPrice: "₹1,898",
    artist: "Priya Sharma (Ahmedabad)",
    tag: "Trending #1",
  },
  {
    id: "bridal-makeup",
    category: "Bridal Makeup",
    title: "Royal Heritage HD Bridal",
    subtitle: "Sweat-proof HD base, kohl eyes & scarlet pout.",
    image: "/images/makeup/mak-14.jpg",
    saves: "320k saves",
    kitPrice: "₹3,400",
    artist: "Meera Trivedi (Bodakdev)",
    tag: "Wedding Favorite",
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
    tag: "Reception Chic",
  },
  {
    id: "rose-pattern",
    category: "Mehndi Art",
    title: "Hyper-Real Rose Henna",
    subtitle: "Dark mahogany stain with shaded botanical roses.",
    image: "/images/nails/nai-11.jpg",
    saves: "155k saves",
    kitPrice: "₹650",
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
    <section className="relative overflow-hidden bg-[#FAF6F0] pt-24 pb-10 sm:pt-28 sm:pb-16 border-b border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Subtle Top Status */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-3 border-b border-[#EADAD0] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#8C7A81]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7A0B2E]" />
            <span>RoopSetu Editorial Beauty Guide</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#7A0B2E] bg-[#F7E8EB] px-3 py-0.5 rounded-full border border-[#ECCCD3]">
            <span>Festive &amp; Bridal 2026 Collection</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Prestigious Editorial Typography & Search Console */}
          <div className="lg:col-span-7">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A0B2E] bg-[#F5E6E8] px-3 py-1 rounded-full mb-3">
              ✦ Curated Style Playbook
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.08] tracking-tight text-[#2B1B20]">
              Where Viral Looks <br />
              <span className="italic font-normal text-[#7A0B2E]">
                Become Your Reality.
              </span>
            </h1>

            <p className="mt-3 text-[14px] sm:text-[15px] text-[#6F6267] leading-relaxed max-w-lg">
              Curated beauty lookbooks with human-written step-by-step masterclasses, shoppable drugstore kits, and verified local artists in Ahmedabad and Surat.
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
                  placeholder="Search looks (e.g. 'Pink Chrome', 'Smokey')..."
                  className="w-full rounded-full border border-[#D9C8BE] bg-white py-2.5 pl-10 pr-4 text-[13px] text-[#2B1B20] placeholder-[#8C7A81] shadow-2xs outline-none transition focus:border-[#7A0B2E] focus:ring-1 focus:ring-[#7A0B2E]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#7A0B2E] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#960E39]"
              >
                <span>Browse Looks</span>
                <ArrowRight size={13} />
              </button>
            </form>

            {/* Trending Quick Tag Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A81]">Quick Jump:</span>
              {[
                { label: "Pink Chrome Nails", query: "Pink Chrome" },
                { label: "Smokey Eyes", query: "Smokey" },
                { label: "Bridal Braid", query: "Braid" },
                { label: "Rose Henna", query: "Rose" },
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

            {/* 3 Trust Props Strip */}
            <div className="mt-6 pt-4 border-t border-[#EADAD0] grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3D3C9] text-[#7A0B2E]">
                  <ShoppingBag size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2B1B20]">Shoppable Kits</p>
                  <p className="text-[9px] text-[#6F6267] hidden sm:block">Nykaa &amp; Amazon</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3D3C9] text-[#7A0B2E]">
                  <Sparkles size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2B1B20]">Pro Masterclasses</p>
                  <p className="text-[9px] text-[#6F6267] hidden sm:block">3-Step DIY</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#E3D3C9] text-[#7A0B2E]">
                  <ShieldCheck size={13} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#2B1B20]">Verified Artists</p>
                  <p className="text-[9px] text-[#6F6267] hidden sm:block">Doorstep Service</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Refined Featured Look Showcase */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
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
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#FFD6A5]">
                    {activeLook.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium leading-tight text-white mt-0.5">
                    {activeLook.title}
                  </h3>
                  <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                    {activeLook.subtitle}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#FFD6A5]">
                      Kit: {activeLook.kitPrice}
                    </span>
                    <Link
                      href={`/articles/${activeLook.id}`}
                      className="inline-flex items-center gap-1 font-bold text-white hover:text-[#FFD6A5] transition-colors"
                    >
                      Read Full Article <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Interactive Category Selector Pills */}
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
