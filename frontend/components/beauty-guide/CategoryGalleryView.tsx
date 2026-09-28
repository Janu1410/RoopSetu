"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LookCategory, LookItem } from "@/constants/beauty-data";

type Props = {
  categoryData: LookCategory;
};

export default function CategoryGalleryView({ categoryData }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Extract unique tags for filtering
  const allTags = [
    "All",
    ...Array.from(
      new Set(categoryData.items.map((item) => item.tag).filter(Boolean)),
    ),
  ];

  const filteredItems =
    activeFilter === "All"
      ? categoryData.items
      : categoryData.items.filter((item) => item.tag === activeFilter);

  const toggleSaved = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent navigating to article
    setSavedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#FFF8F3] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/beauty-guide"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#6F6267] transition-colors hover:text-[#7A0B2E]"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Back to Beauty Guide
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A0B2E] bg-[#FDF0F2] px-3 py-1.5 rounded-full">
            {categoryData.items.length} LOOKS
          </span>
        </div>

        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#5A0822] to-[#8C0D35] text-white p-10 sm:p-14 lg:p-20 shadow-xl mb-12 sm:mb-16">
          {/* Subtle background pattern or shine could go here */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.25em] bg-white/10 px-3 py-1 rounded-full mb-6 border border-white/20">
              ✦ {categoryData.label} INSPIRATION
            </span>
            <h1 className="font-serif text-[42px] leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px] mb-4">
              {categoryData.label} Inspiration
            </h1>
            <p className="text-[16px] sm:text-[18px] text-white/90 mb-4 font-medium">
              {categoryData.tagline}
            </p>
            {categoryData.heroDescription && (
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/70 max-w-xl">
                {categoryData.heroDescription}
              </p>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-6 border-b border-[#EADFDB]">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6F6267] mr-2 shrink-0">
            <Filter size={14} strokeWidth={2} />
            Filter:
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {allTags.map((tag) => (
              <button
                key={tag as string}
                onClick={() => setActiveFilter(tag as string)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                  activeFilter === tag
                    ? "bg-[#7A0B2E] text-white shadow-md"
                    : "bg-[#FDF0F2] text-[#6F6267] hover:bg-[#F3DEE3] hover:text-[#2B1B20]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/articles/${item.id}`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[#FDF0F2] shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.objectPosition ?? "center" }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Top Left Tag */}
                  {item.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur-sm text-[#2B1B20] text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm shadow-sm">
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* Top Right Save Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleSaved(e, item.id)}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#2B1B20] shadow-sm transition-transform hover:scale-110 focus-visible:outline-none"
                  >
                    <Heart
                      size={14}
                      strokeWidth={2}
                      fill={savedIds.has(item.id) ? "#7A0B2E" : "none"}
                      className={savedIds.has(item.id) ? "text-[#7A0B2E]" : ""}
                    />
                  </button>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 z-10">
                    <h3 className="font-serif text-[18px] sm:text-[22px] text-white leading-tight mb-2">
                      {item.title || item.alt}
                    </h3>
                    {item.description && (
                      <p className="text-[12px] sm:text-[13px] leading-relaxed text-white/80 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[16px] text-[#6F6267]">
              No looks found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
