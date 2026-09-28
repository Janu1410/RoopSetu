"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Search,
  X,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
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
  const [visibleCount, setVisibleCount] = useState<number>(8);

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

  // Sliced items for display
  const displayedLooks = useMemo(() => {
    // If a category or search filter is active, show all matching for that category
    if (activeCategory !== "all" || searchQuery.trim() || activeOccasion !== "all") {
      return filteredLooks;
    }
    return filteredLooks.slice(0, visibleCount);
  }, [filteredLooks, activeCategory, searchQuery, activeOccasion, visibleCount]);

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

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setVisibleCount(8);
  };

  return (
    <section
      id="discovery-feed"
      className="relative bg-[#FFFBF7] py-12 sm:py-16 border-b border-[#EEDFD7]"
      aria-label="Beauty Inspiration Feed"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-[#EEDFD7]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
                Editorial Lookbook Feed
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/30" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#2B1B20]">
              Explore Curated Looks &amp; Kits
            </h2>
            <p className="mt-1 text-[13px] text-[#6F6267] max-w-xl">
              Tap any look to explore the complete masterclass, pro application tips, and drugstore product breakdowns.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5E6E8] px-3 py-1 text-[11px] font-semibold text-[#7A0B2E]">
              <Sparkles size={12} />
              {filteredLooks.length} Curated Looks
            </span>
            {savedIds.size > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-3 py-1 text-[11px] font-semibold text-white shadow-2xs">
                <Heart size={12} fill="currentColor" />
                {savedIds.size} Saved
              </span>
            )}
          </div>
        </div>

        {/* Filter Toolbar: Category Tabs & Search */}
        <div className="mt-5 space-y-3">
          {/* Category Tabs: Mobile Horizontal Scroll with Snap */}
          <div className="overflow-x-auto pb-1 [scrollbar-width:none]">
            <div className="flex items-center gap-1.5 min-w-max">
              <button
                id="cat-tab-all"
                type="button"
                onClick={() => handleCategorySelect("all")}
                className={`rounded-full px-4 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === "all"
                    ? "bg-[#7A0B2E] text-white shadow-2xs"
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
                    onClick={() => handleCategorySelect(category.id)}
                    className={`rounded-full px-4 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#7A0B2E] text-white shadow-2xs"
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
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
                  className={`rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold transition-all ${
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
            <div className="relative sm:w-60">
              <Search
                size={13}
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
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Look Grid: Dual-Column on Mobile, 4-Column on Desktop */}
        {displayedLooks.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {displayedLooks.map((look) => {
                const isSaved = savedIds.has(look.id);
                return (
                  <Link
                    key={look.id}
                    href={`/articles/${look.id}`}
                    className="group relative flex flex-col rounded-[18px] sm:rounded-[22px] overflow-hidden bg-white border border-[#EEDFD7] shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FDF0F2]">
                      <Image
                        src={look.image}
                        alt={look.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: look.objectPosition ?? "center" }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10 opacity-75 group-hover:opacity-90 transition-opacity" />

                      {/* Top Action Floating Controls */}
                      <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
                        <span className="rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2B1B20] shadow-2xs truncate max-w-[70%]">
                          {look.tag || look.categoryLabel}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => toggleSaved(look.id, e)}
                          title={isSaved ? "Saved to your list" : "Save look"}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#2B1B20] shadow-2xs transition hover:scale-110 active:scale-95"
                        >
                          <Heart
                            size={13}
                            strokeWidth={2}
                            fill={isSaved ? "#7A0B2E" : "none"}
                            className={isSaved ? "text-[#7A0B2E]" : ""}
                          />
                        </button>
                      </div>

                      {/* Bottom Card Content */}
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10 text-white flex flex-col justify-end">
                        <h3 className="font-serif text-[13px] sm:text-[15px] font-medium leading-snug line-clamp-1 group-hover:text-[#FFE5D0] transition-colors">
                          {look.title || look.alt}
                        </h3>

                        <div className="mt-1.5 pt-1.5 border-t border-white/20 flex items-center justify-between text-[10px] font-semibold text-white/90">
                          <span className="text-[#FFD6A5] truncate">
                            {look.kitPrice ? `Kit: ${look.kitPrice}` : "Shop Kit"}
                          </span>
                          <span className="inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform text-white shrink-0">
                            Guide <ChevronRight size={11} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Load More Button if showing initial 8 and not filtering */}
            {activeCategory === "all" && !searchQuery && activeOccasion === "all" && visibleCount < filteredLooks.length && (
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C8BE] bg-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#2B1B20] shadow-2xs hover:border-[#7A0B2E] hover:text-[#7A0B2E] transition-all"
                >
                  <span>Load More Looks ({filteredLooks.length - visibleCount} Remaining)</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 text-center py-10 px-4 rounded-[20px] bg-white border border-[#EEDFD7]">
            <Search size={24} className="mx-auto text-[#8F7E84] mb-2" />
            <h3 className="font-serif text-lg text-[#2B1B20]">No matching looks found</h3>
            <p className="mt-1 text-[12px] text-[#6F6267]">
              Try searching for &quot;Chrome&quot;, &quot;Bridal&quot;, &quot;Smokey&quot;, or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveOccasion("all");
                setSearchQuery("");
                setVisibleCount(8);
              }}
              className="mt-3 rounded-full bg-[#7A0B2E] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#960E39]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
