"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  X,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Calendar,
  Share2,
  Check,
  Star,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  beautyCategories,
  getAllBeautyLooks,
  type LookItem,
} from "@/constants/beauty-data";

export default function BeautyDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeOccasion, setActiveOccasion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [copiedLink, setCopiedLink] = useState(false);

  // Flattened look collection
  const allLooks = useMemo(() => getAllBeautyLooks(), []);

  // Filtered looks based on Category, Occasion, and Search Query
  const filteredLooks = useMemo(() => {
    return allLooks.filter((look) => {
      // Category filter
      if (activeCategory !== "all" && look.categoryId !== activeCategory) {
        return false;
      }
      // Occasion filter
      if (activeOccasion !== "all" && look.occasion !== activeOccasion) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const titleMatch = look.title?.toLowerCase().includes(query);
        const descMatch = look.description?.toLowerCase().includes(query);
        const tagMatch = look.tag?.toLowerCase().includes(query);
        const catMatch = look.categoryLabel?.toLowerCase().includes(query);
        const occasionMatch = look.occasion?.toLowerCase().includes(query);
        return titleMatch || descMatch || tagMatch || catMatch || occasionMatch;
      }
      return true;
    });
  }, [allLooks, activeCategory, activeOccasion, searchQuery]);

  const toggleSaved = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openPinterestShare = (look: LookItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    const shareUrl = encodeURIComponent(`${currentOrigin}/articles/${look.id}`);
    const mediaUrl = encodeURIComponent(`${currentOrigin}${look.image}`);
    const description = encodeURIComponent(
      `${look.title || look.alt} — Recreate this look with exact drugstore products or verified artists on RoopSetu.`
    );
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${mediaUrl}&description=${description}`;
    window.open(pinUrl, "_blank", "noopener,noreferrer,width=750,height=600");
  };

  return (
    <section
      id="discovery-feed"
      className="relative bg-[#FFFBF7] py-14 sm:py-20 border-b border-[#EEDFD7]"
      aria-label="Beauty Inspiration Feed"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#EEDFD7]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
                Editorial Lookbook Feed
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/30" />
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2B1B20]">
              Explore Viral Looks &amp; Kits
            </h2>
            <p className="mt-1.5 text-[13px] sm:text-[15px] text-[#6F6267] max-w-xl">
              Curated from 1M+ Pinterest saves. Tap any look to read the human-written tutorial, see exact products, or book local specialists.
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5E6E8] px-3 py-1 text-[11px] font-semibold text-[#7A0B2E]">
              <Sparkles size={12} />
              {filteredLooks.length} Curated Looks
            </span>
            {savedIds.size > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                <Heart size={12} fill="currentColor" />
                {savedIds.size} Saved
              </span>
            )}
          </div>
        </div>

        {/* Filter Toolbar: Category Tabs & Search */}
        <div className="mt-6 space-y-3.5">
          {/* Category Tabs: Mobile Horizontal Scroll with Snap */}
          <div className="overflow-x-auto pb-1 [scrollbar-width:none]">
            <div className="flex items-center gap-2 min-w-max">
              <button
                id="cat-tab-all"
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === "all"
                    ? "bg-[#7A0B2E] text-white shadow-md"
                    : "bg-white text-[#6F6267] hover:bg-[#FCEEEA] hover:text-[#2B1B20] border border-[#EEDFD7]"
                }`}
              >
                All Looks ({allLooks.length})
              </button>

              {beautyCategories.map((category) => {
                const count = category.items.length;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    id={`cat-tab-${category.id}`}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#7A0B2E] text-white shadow-md"
                        : "bg-white text-[#6F6267] hover:bg-[#FCEEEA] hover:text-[#2B1B20] border border-[#EEDFD7]"
                    }`}
                  >
                    {category.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-Filters: Occasion & Live Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Occasion Vibe Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F7E84] mr-1">
                Occasion:
              </span>
              {[
                { label: "All", value: "all" },
                { label: "Bridal", value: "Bridal & Wedding" },
                { label: "Festive", value: "Festive Garba" },
                { label: "Cocktail", value: "Cocktail & Party" },
                { label: "Everyday", value: "Everyday Chic" },
              ].map((vibe) => (
                <button
                  key={vibe.value}
                  type="button"
                  onClick={() => setActiveOccasion(vibe.value)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                    activeOccasion === vibe.value
                      ? "bg-[#2B1B20] text-white"
                      : "bg-[#F7EFE9] text-[#6F6267] hover:bg-[#EDE1D9] hover:text-[#2B1B20]"
                  }`}
                >
                  {vibe.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative sm:w-64">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F7E84] pointer-events-none"
              />
              <input
                id="lookbook-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search looks or products..."
                className="w-full rounded-full border border-[#EEDFD7] bg-white py-1.5 pl-9 pr-7 text-[12px] text-[#2B1B20] placeholder-[#8F7E84] outline-none transition focus:border-[#7A0B2E] focus:ring-1 focus:ring-[#7A0B2E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F7E84] hover:text-[#2B1B20]"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Look Grid: Dual-Column on Mobile, 4-Column on Desktop */}
        {filteredLooks.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredLooks.map((look, index) => {
              const isSaved = savedIds.has(look.id);
              return (
                <Link
                  key={look.id}
                  href={`/articles/${look.id}`}
                  className="group relative flex flex-col rounded-[20px] sm:rounded-[24px] overflow-hidden bg-white border border-[#EEDFD7] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FDF0F2]">
                    <Image
                      src={look.image}
                      alt={look.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-106"
                      style={{ objectPosition: look.objectPosition ?? "center" }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/15 opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Top Action Floating Controls */}
                    <div className="absolute top-2.5 inset-x-2.5 sm:top-3 sm:inset-x-3 flex items-center justify-between z-10">
                      <span className="rounded-full bg-white/90 backdrop-blur-md px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2B1B20] shadow-sm truncate max-w-[65%]">
                        {look.tag || look.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1 sm:gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => openPinterestShare(look, e)}
                          title="Save this look on Pinterest"
                          className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#E60023] text-white shadow-md transition hover:scale-110 active:scale-95"
                        >
                          <svg
                            className="h-3.5 w-3.5 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => toggleSaved(look.id, e)}
                          title={isSaved ? "Saved to your list" : "Save look"}
                          className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#2B1B20] shadow-md transition hover:scale-110 active:scale-95"
                        >
                          <Heart
                            size={13}
                            strokeWidth={2}
                            fill={isSaved ? "#7A0B2E" : "none"}
                            className={isSaved ? "text-[#7A0B2E]" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-10 text-white flex flex-col justify-end">
                      <div className="flex items-center gap-1.5 mb-1">
                        {look.savesCount && (
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                            ✦ {look.savesCount}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-[13px] sm:text-[16px] font-medium leading-snug line-clamp-1 group-hover:text-[#FFE5D0] transition-colors">
                        {look.title || look.alt}
                      </h3>

                      <p className="hidden sm:block mt-1 text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                        {look.description}
                      </p>

                      <div className="mt-2 sm:mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-white/90">
                        <span className="text-[#FFD6A5] truncate">
                          {look.kitPrice ? `Kit: ${look.kitPrice}` : "Shop Kit"}
                        </span>
                        <span className="inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform text-white shrink-0">
                          Guide <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 text-center py-12 px-4 rounded-[24px] bg-white border border-[#EEDFD7]">
            <Search size={28} className="mx-auto text-[#8F7E84] mb-2.5" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#2B1B20]">No matching looks found</h3>
            <p className="mt-1 text-[13px] text-[#6F6267]">
              Try searching for &quot;Chrome&quot;, &quot;Bridal&quot;, &quot;Smokey&quot;, or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveOccasion("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full bg-[#7A0B2E] px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#960E39]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
