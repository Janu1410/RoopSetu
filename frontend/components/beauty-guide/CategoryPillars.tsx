"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const PILLARS = [
  {
    id: "nail-art",
    title: "Nail Art",
    count: "5 Curated Looks",
    vibe: "Chrome & Micro-French",
    image: "/images/nails/nai-10.jpg",
  },
  {
    id: "makeup",
    title: "Makeup",
    count: "5 Curated Looks",
    vibe: "Soft Glam & Latte Eyes",
    image: "/images/makeup/mak-14.jpg",
  },
  {
    id: "hairstyles",
    title: "Hairstyles",
    count: "5 Curated Looks",
    vibe: "Waves & Textured Braids",
    image: "/images/hair/hai-22.jpg",
  },
  {
    id: "fashion",
    title: "Fashion & Drapes",
    count: "5 Curated Looks",
    vibe: "Seedha Pallu & Saree",
    image: "/images/makeup/mak-12.jpg",
  },
  {
    id: "mehndi",
    title: "Mehndi Art",
    count: "5 Curated Looks",
    vibe: "Organic Dark Henna",
    image: "/images/nails/nai-11.jpg",
  },
  {
    id: "bridal",
    title: "Bridal Harmony",
    count: "5 Curated Looks",
    vibe: "Complete Day Styling",
    image: "/images/hero/desktop/her-30.jpg",
  },
];

export default function CategoryPillars() {
  const handlePillarClick = (categoryId: string) => {
    const feed = document.getElementById("discovery-feed");
    if (feed) {
      feed.scrollIntoView({ behavior: "smooth" });
      const tabButton = document.getElementById(
        `cat-tab-${categoryId}`
      ) as HTMLButtonElement | null;
      if (tabButton) {
        tabButton.click();
      }
    }
  };

  return (
    <section className="bg-[#FAF6F0] pb-12 sm:pb-16 border-b border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A0B2E]">
              Browse By Aesthetic
            </span>
            <span className="h-px w-6 bg-[#7A0B2E]/30" />
          </div>
          <a
            href="#discovery-feed"
            className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] hover:underline inline-flex items-center gap-1"
          >
            All 30 Looks <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => handlePillarClick(pillar.id)}
              className="group relative flex flex-col items-center text-left rounded-2xl bg-white p-2.5 border border-[#E3D3C9] shadow-2xs hover:shadow-md hover:border-[#7A0B2E]/50 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#FDF0F2] mb-2.5">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white tracking-wide">
                  {pillar.count}
                </span>
              </div>

              <div className="w-full px-1">
                <h3 className="font-serif text-[14px] font-medium text-[#2B1B20] leading-tight group-hover:text-[#7A0B2E] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-[11px] text-[#8C7A81] truncate mt-0.5">
                  {pillar.vibe}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
