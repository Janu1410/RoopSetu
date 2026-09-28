"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Share2, Check, Palette, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOODBOARDS = [
  {
    id: "pastel-sangeet",
    title: "The Pastel Gujarati Sangeet",
    tagline: "Blush silk, champagne dewdrop skin & cascading sculpted curls.",
    saves: "240k Saves",
    palette: [
      { name: "Peach Blush", hex: "#F5D0C5" },
      { name: "Champagne Glow", hex: "#F7E7CE" },
      { name: "Antique Polki", hex: "#D4AF37" },
      { name: "Ivory Organza", hex: "#FFF8F3" },
    ],
    editorialNote:
      "Pair lightweight organza or tissue silk with a dewy, translucent champagne complexion. Keep jewelry in unpolished polki diamonds to allow the delicate pastel color accents to glow under dancefloor lighting.",
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
        label: "Minimalist Henna Cuffs",
        src: "/images/nails/nai-2.jpg",
      },
      {
        label: "Sangeet Pinned Waves",
        src: "/images/hair/hai-23.jpg",
      },
    ],
  },
  {
    id: "royal-heritage",
    title: "The Royal Heritage Wedding",
    tagline: "Crimson zardozi, kohl eyes & fresh Madurai Mogra architectural bun.",
    saves: "310k Saves",
    palette: [
      { name: "Crimson Velvet", hex: "#7A0B2E" },
      { name: "Antique Temple Gold", hex: "#C5A059" },
      { name: "Carbon Kohl", hex: "#1C1618" },
      { name: "Mogra Blossom", hex: "#FBF9F5" },
    ],
    editorialNote:
      "Heavy velvet zardozi requires a high-definition matte airbrush base to resist venue heat and photography flash. Concentric Mogra rings anchored around an architectural low bun support heavy bridal dupattas with zero slip.",
    images: [
      {
        label: "Heritage Velvet Ensemble",
        src: "/images/makeup/mak-14.jpg",
      },
      {
        label: "Regal Kohl Rimmed Eyes",
        src: "/images/makeup/mak-20.jpg",
      },
      {
        label: "Rose Henna Motifs",
        src: "/images/nails/nai-11.jpg",
      },
      {
        label: "Architectural Gajra Bun",
        src: "/images/makeup/mak-13.jpg",
      },
    ],
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
              Complete harmony between complexion, hair styling, jewellery, and draping for modern celebrations.
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

            {/* Color Palette & Editorial Harmony Note Strip */}
            <div className="mt-5 pt-4 border-t border-[#F0DFD7] flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Color Swatches */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8C7A81]">
                  <Palette size={13} className="text-[#7A0B2E]" />
                  <span>Harmonized Palette:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {activeBoard.palette.map((color) => (
                    <div
                      key={color.name}
                      title={color.name}
                      className="group relative flex items-center"
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/15 shadow-2xs inline-block transition-transform group-hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Editorial Advice Note */}
              <p className="text-[12px] text-[#6F6267] leading-relaxed max-w-xl">
                <span className="font-semibold text-[#2B1B20]">Editorial Note: </span>
                {activeBoard.editorialNote}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
