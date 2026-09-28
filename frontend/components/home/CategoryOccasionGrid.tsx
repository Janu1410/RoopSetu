"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { ArrowRight, Sparkles, Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Category = {
  id: string;
  type: "wedding" | "festive" | "styling";
  title: string;
  tagline: string;
  artistCount: string;
  startingPrice: string;
  imageUrl: string;
  href: string;
  size: string;
  badge?: string | null;
};

const CATEGORIES: Category[] = [
  {
    id: "bridal",
    type: "wedding",
    title: "Bridal Makeup & Squads",
    tagline: "HD, Airbrush, Haldi & Sangeet Looks",
    artistCount: "45+ Verified Artists",
    startingPrice: "From ₹5,500",
    imageUrl:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80",
    href: "/services?category=bridal",
    size: "col-span-1 md:col-span-2 lg:col-span-2",
    badge: "Most Booked",
  },
  {
    id: "festive",
    type: "festive",
    title: "Navratri & Garba Glam",
    tagline: "Sweat-Resistant 9-Night Garba Styles",
    artistCount: "38+ Artists",
    startingPrice: "From ₹2,500",
    imageUrl:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=80",
    href: "/services?category=festive",
    size: "col-span-1 md:col-span-1 lg:col-span-1",
    badge: "Trending Season",
  },
  {
    id: "mehendi",
    type: "styling",
    title: "Bridal Mehndi & Henna",
    tagline: "Portrait, Arabic & Chemical-Free Henna",
    artistCount: "29+ Artists",
    startingPrice: "From ₹3,500",
    imageUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    href: "/services?category=mehendi",
    size: "col-span-1 md:col-span-1 lg:col-span-1",
    badge: "Organic Stain",
  },
  {
    id: "hair-draping",
    type: "styling",
    title: "Hair Styling & Saree Draping",
    tagline: "Gujarati Seedha Pallu, Can-Can & Floral Updos",
    artistCount: "52+ Specialists",
    startingPrice: "From ₹1,200",
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    href: "/services?category=hair-draping",
    size: "col-span-1 md:col-span-1 lg:col-span-1",
    badge: "Essential",
  },
  {
    id: "party",
    type: "wedding",
    title: "Cocktail & Reception Glam",
    tagline: "Dewy Evening Looks & Hollywood Waves",
    artistCount: "34+ Artists",
    startingPrice: "From ₹3,000",
    imageUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    href: "/services?category=party",
    size: "col-span-1 md:col-span-1 lg:col-span-1",
    badge: null,
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Celebrations" },
  { id: "wedding", label: "✦ Bridal & Weddings" },
  { id: "festive", label: "✦ Navratri & Festive" },
  { id: "styling", label: "✦ Mehendi & Draping" },
];

export default function CategoryOccasionGrid() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories =
    activeTab === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.type === activeTab);

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8A1238] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Curated Festive & Bridal Occasions</span>
            </div>
            <h2 className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2230] tracking-tight`}>
              Style Every{" "}
              <span className="italic bg-gradient-to-r from-[#8A1238] to-[#C9933E] bg-clip-text text-transparent">
                Celebration
              </span>
            </h2>
            <p className="mt-3 text-base text-[#6C5662] max-w-xl leading-relaxed">
              From grand royal weddings to vibrant Navratri nights, find specialized artists crafted for your exact event.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#FFF8F3] border border-[#F0E0DE] self-start lg:self-end">
            {FILTER_TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-white" : "text-[#6C5662] hover:text-[#5A001F]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeOccasionFilter"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5A001F] to-[#8A1238] shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat, idx) => (
              <motion.div
                layout
                key={cat.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                className={`relative h-[300px] sm:h-[340px] rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(90,0,31,0.18)] transition-all duration-300 group border border-black/5 ${
                  cat.size
                }`}
              >
                <Link href={cat.href} className="block relative w-full h-full">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Badges on Top */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    {cat.badge ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wide uppercase bg-white/95 text-[#5A001F] backdrop-blur-md shadow-xs">
                        {cat.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.7rem] font-bold bg-black/40 backdrop-blur-md text-white/90 border border-white/20">
                      <Users className="w-3 h-3 text-[#D4AF37]" />
                      <span>{cat.artistCount}</span>
                    </span>
                  </div>

                  {/* Card Content at Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
                    <p className="text-[#FFD2DD] text-xs font-semibold uppercase tracking-wider mb-1.5">
                      {cat.tagline}
                    </p>
                    <h3 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-white group-hover:text-[#FFE8EF] transition-colors leading-tight`}>
                      {cat.title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20">
                      <span className="text-xs font-semibold text-white/90">
                        {cat.startingPrice}
                      </span>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#FFD2DD] transition-colors">
                        <span>Explore Artists</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export { CategoryOccasionGrid };
