"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { LookCategory } from "@/constants/beauty-data";

type Props = {
  category: LookCategory;
  reverse?: boolean; // Kept for API compatibility, though layout is now stacked
};

export default function CategoryHubSection({ category }: Props) {
  const reducedMotion = useReducedMotion();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  
  // Show 3 images to perfectly match the 3-column grid from the category page
  const displayItems = category.items.slice(0, 3);

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
    <section className="overflow-hidden mb-16 sm:mb-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <motion.div 
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
                {category.label}
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/30" />
            </div>
            <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] tracking-[-0.02em] text-[#2B1B20]">
              {category.tagline}
            </h2>
          </div>
          
          <Link
            href={category.href}
            className="group shrink-0 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-[#2B1B20] transition-colors duration-300 hover:text-[#7A0B2E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A0B2E] focus-visible:ring-offset-4"
          >
            See all {category.label}
            <ArrowRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>

        {/* 3-Column Grid matching CategoryGalleryView exactly */}
        <motion.div 
          initial={reducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {displayItems.map((item) => (
            <Link
              key={item.id}
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

              {/* Overlay Gradient (Identical to CategoryGalleryView) */}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
