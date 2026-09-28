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
  type LookProduct,
} from "@/constants/beauty-data";

export default function BeautyDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeOccasion, setActiveOccasion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [selectedLook, setSelectedLook] = useState<
    (LookItem & { categoryId: string; categoryLabel: string }) | null
  >(null);
  const [modalTab, setModalTab] = useState<"steps" | "shop" | "artist">("steps");
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
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openPinterestShare = (look: LookItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  const copyShareLink = (look: LookItem) => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    navigator.clipboard.writeText(`${currentOrigin}/articles/${look.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppBooking = (look: LookItem) => {
    const artist = look.artistRecommendation;
    const phone = artist?.whatsappNumber || "919876543210";
    const text = encodeURIComponent(
      `Hi RoopSetu! I found "${look.title || look.alt}" on the RoopSetu Beauty Guide and would like to book a verified artist to recreate this for my upcoming event. Could you help check availability in Ahmedabad / Surat?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedLook(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="discovery-feed"
      className="relative bg-[#FFFBF7] py-16 sm:py-24"
      aria-label="Beauty Inspiration Feed"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EEDFD7]">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
                Editorial Lookbook Feed
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/30" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2B1B20]">
              Explore Viral Looks &amp; Kits
            </h2>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#6F6267] max-w-xl">
              Curated from 1M+ Pinterest saves. Discover exact products, pro tutorials, and verified local artists.
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5E6E8] px-3.5 py-1.5 text-[11px] font-semibold text-[#7A0B2E]">
              <Sparkles size={13} />
              {filteredLooks.length} Curated Looks
            </span>
            {savedIds.size > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm">
                <Heart size={13} fill="currentColor" />
                {savedIds.size} Saved
              </span>
            )}
          </div>
        </div>

        {/* Filter Toolbar: Category Tabs & Search */}
        <div className="mt-8 space-y-4">
          {/* Category Tabs */}
          <div className="overflow-x-auto pb-2 [scrollbar-width:none]">
            <div className="flex items-center gap-2 min-w-max">
              <button
                id="cat-tab-all"
                type="button"
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === "all"
                    ? "bg-[#7A0B2E] text-white shadow-md"
                    : "bg-white text-[#6F6267] hover:bg-[#FCEEEA] hover:text-[#2B1B20] border border-[#EEDFD7]"
                }`}
              >
                All Trends ({allLooks.length})
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
                    className={`rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider transition-all ${
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            {/* Occasion Vibe Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F7E84] mr-1">
                Vibe:
              </span>
              {[
                { label: "All Vibes", value: "all" },
                { label: "Bridal & Wedding", value: "Bridal & Wedding" },
                { label: "Festive Garba", value: "Festive Garba" },
                { label: "Cocktail & Party", value: "Cocktail & Party" },
                { label: "Everyday Chic", value: "Everyday Chic" },
              ].map((vibe) => (
                <button
                  key={vibe.value}
                  type="button"
                  onClick={() => setActiveOccasion(vibe.value)}
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
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
            <div className="relative sm:w-72">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F7E84] pointer-events-none"
              />
              <input
                id="lookbook-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full rounded-full border border-[#EEDFD7] bg-white py-2 pl-9 pr-8 text-[12px] text-[#2B1B20] placeholder-[#8F7E84] outline-none transition focus:border-[#7A0B2E] focus:ring-1 focus:ring-[#7A0B2E]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F7E84] hover:text-[#2B1B20]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Look Grid: Pinterest-Style Masonry / Bento Cards */}
        {filteredLooks.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredLooks.map((look, index) => {
              const isSaved = savedIds.has(look.id);
              return (
                <motion.div
                  key={look.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  onClick={() => {
                    setSelectedLook(look);
                    setModalTab(look.steps ? "steps" : "shop");
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-[24px] bg-white border border-[#EEDFD7] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FDF0F2]">
                    <Image
                      src={look.image}
                      alt={look.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: look.objectPosition ?? "center" }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/15 opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Top Action Floating Controls */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2B1B20] shadow-sm">
                        {look.tag || look.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={(e) => openPinterestShare(look, e)}
                          title="Save this look on Pinterest"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E60023] text-white shadow-md transition hover:scale-110 active:scale-95"
                        >
                          <svg
                            className="h-4 w-4 fill-current"
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
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#2B1B20] shadow-md transition hover:scale-110 active:scale-95"
                        >
                          <Heart
                            size={14}
                            strokeWidth={2}
                            fill={isSaved ? "#7A0B2E" : "none"}
                            className={isSaved ? "text-[#7A0B2E]" : ""}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 z-10 text-white flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-1.5">
                        {look.savesCount && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                            ✦ {look.savesCount}
                          </span>
                        )}
                        {look.difficulty && (
                          <span className="text-[10px] text-white/70">
                            • {look.difficulty}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-[17px] font-medium leading-snug line-clamp-1 group-hover:text-[#FFE5D0] transition-colors">
                        {look.title || look.alt}
                      </h3>

                      <p className="mt-1 text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                        {look.description}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] font-semibold text-white/90">
                        <span className="inline-flex items-center gap-1 text-[#FFD6A5]">
                          <ShoppingBag size={12} />
                          {look.kitPrice ? `Kit: ${look.kitPrice}` : "Shoppable Kit"}
                        </span>
                        <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-white">
                          Breakdown <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="mt-16 text-center py-16 px-4 rounded-[24px] bg-white border border-[#EEDFD7]">
            <Search size={32} className="mx-auto text-[#8F7E84] mb-3" />
            <h3 className="font-serif text-2xl text-[#2B1B20]">No matching looks found</h3>
            <p className="mt-1 text-[14px] text-[#6F6267]">
              Try searching for &quot;Chrome&quot;, &quot;Bridal&quot;, &quot;Smokey&quot;, or clear your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveOccasion("all");
                setSearchQuery("");
              }}
              className="mt-5 rounded-full bg-[#7A0B2E] px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#960E39]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Interactive Quick-View Modal / Drawer */}
      <AnimatePresence>
        {selectedLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLook(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#FFF8F3] shadow-2xl border border-[#EEDFD7] flex flex-col [scrollbar-width:thin]"
            >
              <button
                type="button"
                onClick={() => setSelectedLook(null)}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#2B1B20] shadow-md transition hover:scale-105"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
                {/* Left Column: Image Preview + Viral Pinterest Controls */}
                <div className="md:col-span-5 relative bg-[#1E0D14] flex flex-col justify-between overflow-hidden">
                  <div className="relative aspect-[4/5] md:h-full w-full">
                    <Image
                      src={selectedLook.image}
                      alt={selectedLook.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                      style={{ objectPosition: selectedLook.objectPosition ?? "center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex items-center justify-between bg-black/40 backdrop-blur-sm border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => openPinterestShare(selectedLook)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#E60023] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-md transition hover:bg-[#c9001f]"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                      </svg>
                      Pin to Pinterest
                    </button>

                    <button
                      type="button"
                      onClick={() => copyShareLink(selectedLook)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md hover:bg-white/30"
                    >
                      {copiedLink ? (
                        <>
                          <Check size={12} className="text-[#A7F3D0]" /> Link Copied
                        </>
                      ) : (
                        <>
                          <Share2 size={12} /> Share
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Column: Conversion Tabs */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A0B2E] bg-[#FDF0F2] px-2.5 py-1 rounded-full">
                        {selectedLook.categoryLabel}
                      </span>
                      {selectedLook.occasion && (
                        <span className="text-[10px] font-semibold text-[#6F6267] bg-[#F2E7E2] px-2.5 py-1 rounded-full">
                          {selectedLook.occasion}
                        </span>
                      )}
                      {selectedLook.savesCount && (
                        <span className="text-[10px] font-bold text-[#C59B27] ml-auto">
                          ✦ {selectedLook.savesCount}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2B1B20] leading-snug">
                      {selectedLook.title || selectedLook.alt}
                    </h3>

                    <p className="mt-2 text-[13px] leading-relaxed text-[#6F6267]">
                      {selectedLook.description}
                    </p>

                    <div className="mt-6 flex border-b border-[#EEDFD7]">
                      {selectedLook.steps && (
                        <button
                          type="button"
                          onClick={() => setModalTab("steps")}
                          className={`flex items-center gap-1.5 pb-2.5 px-3 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                            modalTab === "steps"
                              ? "border-[#7A0B2E] text-[#7A0B2E]"
                              : "border-transparent text-[#8F7E84] hover:text-[#2B1B20]"
                          }`}
                        >
                          <Sparkles size={13} />
                          Pro Steps
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setModalTab("shop")}
                        className={`flex items-center gap-1.5 pb-2.5 px-3 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                          modalTab === "shop"
                            ? "border-[#7A0B2E] text-[#7A0B2E]"
                            : "border-transparent text-[#8F7E84] hover:text-[#2B1B20]"
                        }`}
                      >
                        <ShoppingBag size={13} />
                        Shoppable Kit
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab("artist")}
                        className={`flex items-center gap-1.5 pb-2.5 px-3 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                          modalTab === "artist"
                            ? "border-[#7A0B2E] text-[#7A0B2E]"
                            : "border-transparent text-[#8F7E84] hover:text-[#2B1B20]"
                        }`}
                      >
                        <Calendar size={13} />
                        Book Artist
                      </button>
                    </div>

                    <div className="mt-5 space-y-4">
                      {/* Tab 1: Pro Steps */}
                      {modalTab === "steps" && selectedLook.steps && (
                        <div className="space-y-3">
                          {selectedLook.steps.map((step) => (
                            <div
                              key={step.id}
                              className="flex gap-3.5 p-3 rounded-[16px] bg-white border border-[#EEDFD7] shadow-xs"
                            >
                              <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-[#FDF0F2]">
                                <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  sizes="60px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-serif text-[14px] font-medium text-[#2B1B20]">
                                  {step.id}. {step.title}
                                </h4>
                                <p className="text-[12px] text-[#6F6267] mt-0.5 leading-relaxed">
                                  {step.description}
                                </p>
                                {step.proTip && (
                                  <p className="mt-1 text-[11px] font-medium text-[#7A0B2E] bg-[#FDF0F2] px-2 py-0.5 rounded inline-block">
                                    💡 Pro Tip: {step.proTip}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tab 2: Shoppable Kit */}
                      {modalTab === "shop" && (
                        <div className="space-y-3">
                          {(selectedLook.products || [
                            {
                              id: "p1",
                              name: "Essential Professional Gel / Makeup Base",
                              brand: "Curated Drugstore Pick",
                              price: "₹699",
                              rating: 4.8,
                              image: "/images/products/opi.jpg",
                              platform: "Nykaa" as const,
                              affiliateUrl: "https://www.nykaa.com",
                            },
                            {
                              id: "p2",
                              name: "High-Shine Locking Top Coat / Setting Mist",
                              brand: "Verified Formula",
                              price: "₹549",
                              rating: 4.7,
                              image: "/images/products/beetles.jpg",
                              platform: "Amazon" as const,
                              affiliateUrl: "https://www.amazon.in",
                            },
                          ]).map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center justify-between p-3 rounded-[16px] bg-white border border-[#EEDFD7] shadow-xs hover:border-[#7A0B2E]/40 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-[#FDF0F2] shrink-0">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="50px"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                                    {product.brand}
                                  </p>
                                  <p className="text-[13px] font-medium text-[#2B1B20] line-clamp-1">
                                    {product.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[12px] font-bold text-[#2B1B20]">
                                      {product.price}
                                    </span>
                                    <span className="flex items-center gap-0.5 text-[11px] text-[#C59B27]">
                                      <Star size={11} fill="currentColor" /> {product.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <a
                                href={product.affiliateUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="shrink-0 rounded-full bg-[#2B1B20] px-3.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#7A0B2E] flex items-center gap-1"
                              >
                                Buy on {product.platform}
                                <ExternalLink size={11} />
                              </a>
                            </div>
                          ))}

                          <div className="p-3 rounded-[16px] bg-[#FDF0F2] border border-[#F3CED5] flex items-center justify-between">
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                                Complete 3-Piece Kit
                              </p>
                              <p className="text-[12px] text-[#6F6267]">
                                Everything you need to recreate this exact finish at home.
                              </p>
                            </div>
                            <span className="text-[13px] font-bold text-[#7A0B2E]">
                              {selectedLook.kitPrice || "₹1,898"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Tab 3: Recreate With A Verified Artist */}
                      {modalTab === "artist" && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-[20px] bg-white border border-[#EEDFD7] shadow-sm">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-1">
                                  <ShieldCheck size={12} />
                                  Verified Specialist
                                </span>
                                <h4 className="font-serif text-lg font-medium text-[#2B1B20]">
                                  {selectedLook.artistRecommendation?.name || "Priya Sharma"}
                                </h4>
                                <p className="text-[12px] text-[#6F6267]">
                                  {selectedLook.artistRecommendation?.speciality ||
                                    "Senior Bridal & Occasion Specialist"}
                                </p>
                                <p className="text-[11px] text-[#8F7E84] mt-0.5">
                                  Servicing: {selectedLook.artistRecommendation?.city || "Ahmedabad & Surat"} (Doorstep &amp; Studio)
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#C59B27] bg-[#FFF8E7] px-2 py-1 rounded-md">
                                  <Star size={12} fill="currentColor" />{" "}
                                  {selectedLook.artistRecommendation?.rating || 4.9}
                                </span>
                                <p className="text-[10px] text-[#8F7E84] mt-1">
                                  {selectedLook.artistRecommendation?.reviews || 140}+ bookings
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#EEDFD7]">
                              <p className="text-[12px] text-[#6F6267] mb-3">
                                Don&apos;t want to DIY? Book this specialist to recreate &quot;
                                <span className="font-medium text-[#2B1B20]">
                                  {selectedLook.title || selectedLook.alt}
                                </span>
                                &quot; flawlessly for your wedding, reception, or Garba night.
                              </p>

                              <button
                                type="button"
                                onClick={() => handleWhatsAppBooking(selectedLook)}
                                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-[12px] font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#1EBE5B]"
                              >
                                Recreate On WhatsApp (Instant Inquiry)
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EEDFD7] flex items-center justify-between">
                    <Link
                      href={`/articles/${selectedLook.id}`}
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#7A0B2E] hover:underline"
                    >
                      Open Full Article Page
                      <ArrowRight size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSaved(selectedLook.id)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6F6267] hover:text-[#2B1B20]"
                    >
                      <Heart
                        size={15}
                        fill={savedIds.has(selectedLook.id) ? "#7A0B2E" : "none"}
                        className={savedIds.has(selectedLook.id) ? "text-[#7A0B2E]" : ""}
                      />
                      {savedIds.has(selectedLook.id) ? "Saved to Favorites" : "Save for Later"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
