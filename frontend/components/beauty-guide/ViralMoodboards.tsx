"use client";

import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

const MOODBOARDS = [
  {
    id: "pastel-sangeet",
    title: "The Pastel Gujarati Sangeet",
    tagline: "Blush silk, diamond dewdrop skin & cascade curls.",
    saves: "240k Pinterest Saves",
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
    saves: "310k Pinterest Saves",
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
  const handlePin = (board: (typeof MOODBOARDS)[0]) => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    const shareUrl = encodeURIComponent(`${origin}/beauty-guide#moodboards`);
    const mediaUrl = encodeURIComponent(`${origin}${board.images[0].src}`);
    const desc = encodeURIComponent(
      `${board.title} Moodboard: Recreate the entire hair, makeup, and bridal ensemble with verified artists on RoopSetu.`
    );
    window.open(
      `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${mediaUrl}&description=${desc}`,
      "_blank",
      "noopener,noreferrer,width=750,height=600"
    );
  };

  const handleBooking = (whatsappText: string) => {
    window.open(
      `https://wa.me/919876543210?text=${encodeURIComponent(whatsappText)}`,
      "_blank"
    );
  };

  return (
    <section id="moodboards" className="bg-[#FAF6F0] py-16 sm:py-24 border-t border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#7A0B2E]">
                Pinterest Viral Format
              </span>
              <span className="h-px w-8 bg-[#7A0B2E]/30" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2B1B20]">
              Curated Wedding &amp; Festive Moodboards
            </h2>
            <p className="mt-2 text-[14px] sm:text-[15px] text-[#6F6267] max-w-xl">
              Complete head-to-toe look coordination between complexion, hair, draping, and jewelry.
            </p>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5E6E8] px-3.5 py-1.5 text-[11px] font-semibold text-[#7A0B2E]">
              <Sparkles size={13} />
              Full Head-to-Toe Coordination
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {MOODBOARDS.map((board) => (
            <div
              key={board.id}
              className="rounded-[32px] bg-white border border-[#E3D3C9] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="rounded-full bg-[#FDF0F2] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                    ✦ {board.saves}
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePin(board)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#E60023] px-3 py-1 text-[10px] font-bold text-white shadow-xs hover:bg-[#c9001f] transition-colors"
                  >
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                    Pin Moodboard
                  </button>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2B1B20]">
                  {board.title}
                </h3>
                <p className="text-[13px] text-[#6F6267] mt-1">
                  {board.tagline}
                </p>

                {/* 4-Quadrant Visual Collage */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {board.images.map((img, i) => (
                    <div
                      key={i}
                      className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FDF0F2] border border-[#E3D3C9]"
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        sizes="(max-width: 1024px) 45vw, 250px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] font-bold text-white tracking-wide leading-tight">
                        {img.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Lead Gen Action */}
              <div className="mt-6 pt-5 border-t border-[#E3D3C9] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[12px] text-[#6F6267] inline-flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  Verified Team Available in Gujarat
                </span>

                <button
                  type="button"
                  onClick={() => handleBooking(board.whatsappText)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#1EBE5B] transition-colors"
                >
                  Book Full Look on WhatsApp <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
