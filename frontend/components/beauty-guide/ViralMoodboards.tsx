"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOODBOARDS = [
  {
    id: "pastel-sangeet",
    title: "The Pastel Gujarati Sangeet",
    tagline: "Blush silk, diamond dewdrop skin & cascade curls.",
    saves: "240k Saves",
    images: [
      {
        label: "Tissue Silk Drape",
        src: "/images/makeup/mak-12.jpg",
      },
      {
        label: "Dewy Champagne Base",
        src: "/images/makeup/mak-19.jpg",
      },
      {
        label: "Minimalist Henna",
        src: "/images/nails/nai-2.jpg",
      },
      {
        label: "Sangeet Pinned Waves",
        src: "/images/hair/hai-23.jpg",
      },
    ],
    whatsappText:
      "Hi RoopSetu! I love the 'Pastel Gujarati Sangeet' moodboard from your Beauty Guide. Can you help coordinate a verified hair, makeup, and draping team for my event in Ahmedabad/Surat?",
  },
  {
    id: "royal-heritage",
    title: "The Royal Heritage Wedding",
    tagline: "Crimson zardozi, kohl eyes & fresh Mogra architectural bun.",
    saves: "310k Saves",
    images: [
      {
        label: "Heritage Velvet",
        src: "/images/makeup/mak-14.jpg",
      },
      {
        label: "Regal Kohl Eyes",
        src: "/images/makeup/mak-20.jpg",
      },
      {
        label: "Rose Henna Motifs",
        src: "/images/nails/nai-11.jpg",
      },
      {
        label: "Architectural Bun",
        src: "/images/makeup/mak-13.jpg",
      },
    ],
    whatsappText:
      "Hi RoopSetu! I want to recreate the 'Royal Heritage Wedding' moodboard from your Beauty Guide. Could you check artist availability for my wedding date?",
  },
];

export default function ViralMoodboards() {
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeBoard = MOODBOARDS[activeBoardIndex];

  const handleShare = () => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    navigator.clipboard.writeText(`${origin}/beauty-guide#moodboards`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppBooking = (text: string) => {
    const phone = "919876543210";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="moodboards" className="bg-[#FAF6F0] py-12 sm:py-16 border-b border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#EEDFD7]">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
                Event Look Coordination
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/30" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#2B1B20]">
              Curated Event Moodboards
            </h2>
            <p className="mt-1 text-[13px] text-[#6F6267] max-w-xl">
              Complete harmony between complexion, hair styling, jewellery, and draping for Gujarati celebrations.
            </p>
          </div>

          {/* Interactive 2-Tab Switcher */}
          <div className="inline-flex items-center rounded-full bg-[#EDE1D9] p-1 border border-[#E3D3C9] shrink-0">
            {MOODBOARDS.map((board, index) => {
              const isActive = index === activeBoardIndex;
              return (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => setActiveBoardIndex(index)}
                  className={`rounded-full px-4 py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-white text-[#7A0B2E] shadow-2xs"
                      : "text-[#6F6267] hover:text-[#2B1B20]"
                  }`}
                >
                  {board.title.replace("The ", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Moodboard Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBoard.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-[24px] bg-white p-5 sm:p-7 border border-[#EEDFD7] shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2B1B20]">
                  {activeBoard.title}
                </h3>
                <p className="text-[13px] text-[#6F6267] mt-0.5">
                  {activeBoard.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-full border border-[#EEDFD7] bg-[#FAF6F0] px-3.5 py-1.5 text-[11px] font-semibold text-[#2B1B20] hover:bg-[#FDF0F2] transition-colors"
                >
                  {copied ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
                  <span>{copied ? "Link Copied" : "Share Moodboard"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking(activeBoard.whatsappText)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs transition hover:bg-[#960E39]"
                >
                  <Calendar size={13} />
                  <span>Book Team</span>
                </button>
              </div>
            </div>

            {/* 4 Quadrant Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {activeBoard.images.map((img) => (
                <div
                  key={img.label}
                  className="group relative aspect-[3/4] w-full rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#FAF6F0] border border-[#EEDFD7] shadow-2xs"
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] sm:text-[12px] font-medium text-white truncate">
                    {img.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
