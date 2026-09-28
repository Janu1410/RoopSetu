"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Calendar,
  ExternalLink,
  Star,
  ShieldCheck,
  ArrowRight,
  Share2,
  Check,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const tutorialData = {
  heroImage: "/images/nails/nai-10.jpg",
  title: "THE VIRAL PINK CHROME:",
  desc: "A sheer blush-pink gel foundation sealed with an ultra-reflective pearl glaze. No salon markup needed.",
  saves: "148,000+ Saves on Pinterest",
  steps: [
    {
      id: "01",
      title: "The Flawless Canvas",
      description:
        "Push cuticles back gently, buff nail plate to 240-grit texture, and apply self-leveling rubber base. Dehydrate with 99% isopropyl alcohol for 3-week salon retention.",
      image: "/images/nails/nai-3.jpg",
      time: "2 mins",
      tip: "Never skip dehydration — it eliminates oils that cause lifting.",
    },
    {
      id: "02",
      title: "The Blush Base",
      description:
        "Apply two sheer coats of soft baby pink gel polish. Cure each coat for 60s under LED lamp. Apply a strictly NON-WIPE top coat and flash cure for exactly 30s.",
      image: "/images/nails/nai-4.jpg",
      time: "60s cure",
      tip: "Flash curing 30s instead of 60s leaves the surface warm so chrome dust adheres mirror-smooth.",
    },
    {
      id: "03",
      title: "The Magic Glaze",
      description:
        "While warm from the lamp, use a dense silicone applicator to firmly buff the iridescent pearl dust across the nail. Cap free edges and lock with dual-layer top coat.",
      image: "/images/nails/nai-5.jpg",
      time: "90s final lock",
      tip: "Dust off excess powder with a fluffy fan brush before final curing to avoid graininess.",
    },
  ],
  products: [
    {
      id: "p1",
      name: "Bubble Bath Sheer Gel Polish",
      brand: "O.P.I Professional",
      price: "₹850",
      originalPrice: "₹950",
      rating: 4.8,
      reviews: "3.1k",
      image: "/images/products/opi.jpg",
      platform: "Nykaa",
      affiliateUrl: "https://www.nykaa.com",
    },
    {
      id: "p2",
      name: "Mirror Gloss No-Wipe Gel Top Coat",
      brand: "Beetles Gel Polish",
      price: "₹599",
      originalPrice: "₹799",
      rating: 4.7,
      reviews: "1.8k",
      image: "/images/products/beetles.jpg",
      platform: "Amazon",
      affiliateUrl: "https://www.amazon.in",
    },
    {
      id: "p3",
      name: "Ultra-Fine Pearl Glaze Chrome Powder",
      brand: "Kodi Professional",
      price: "₹449",
      originalPrice: "₹550",
      rating: 4.9,
      reviews: "940",
      image: "/images/products/kodi.jpg",
      platform: "Amazon",
      affiliateUrl: "https://www.amazon.in",
    },
  ],
  artist: {
    name: "Priya Sharma",
    speciality: "Senior Nail & Bridal Gel Artist",
    city: "Ahmedabad & Surat",
    rating: 4.9,
    reviews: 142,
    rate: "₹1,200 for full set",
    whatsapp: "919876543210",
  },
};

export default function GetTheLook() {
  const [activeMode, setActiveMode] = useState<"tutorial" | "shop" | "artist">("tutorial");
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();

  const handlePinterestPin = () => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    const shareUrl = encodeURIComponent(`${currentOrigin}/articles/pink-chrome`);
    const mediaUrl = encodeURIComponent(`${currentOrigin}/images/nails/nai-10.jpg`);
    const desc = encodeURIComponent(
      "The Viral Pink Chrome Tutorial: Step-by-step masterclass, shoppable drugstore kit, and verified salon artists on RoopSetu."
    );
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${mediaUrl}&description=${desc}`;
    window.open(pinUrl, "_blank", "noopener,noreferrer,width=750,height=600");
  };

  const handleShare = () => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    navigator.clipboard.writeText(`${currentOrigin}/articles/pink-chrome`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleArtistWhatsApp = () => {
    const phone = tutorialData.artist.whatsapp;
    const text = encodeURIComponent(
      `Hi Priya! I saw the Viral Pink Chrome Nails tutorial on RoopSetu and would like to book a doorstep appointment in Ahmedabad/Surat for my upcoming event. Could you share your available dates?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <section id="get-the-look" className="relative overflow-hidden bg-[#24131A] py-20 sm:py-28 text-white">
      {/* Immersive Ambient Blur Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={tutorialData.heroImage}
          alt="Ambient background"
          fill
          sizes="100vw"
          className="object-cover opacity-15 blur-3xl scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#24131A]/95 via-[#24131A]/85 to-[#16070D]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header with Pinterest Credibility */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-[#FFD6A5] backdrop-blur-md mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#E60023] animate-pulse" />
            <span>{tutorialData.saves}</span>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70">
            Viral Pinterest Masterclass
          </p>

          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
            Anatomy of the Viral Pink Chrome
          </h2>

          <p className="mt-3 text-[14px] sm:text-[15px] text-white/80 max-w-xl">
            Everything you need: the exact 3-step pro technique, shoppable drugstore product dupes, or 1-click booking with a verified local artist.
          </p>

          {/* 3-Mode Switcher Buttons */}
          <div className="mt-8 inline-flex items-center rounded-full bg-white/10 p-1.5 backdrop-blur-md border border-white/20 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveMode("tutorial")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all ${
                activeMode === "tutorial"
                  ? "bg-white text-[#24131A] shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Sparkles size={14} />
              Pro Technique
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("shop")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all ${
                activeMode === "shop"
                  ? "bg-white text-[#24131A] shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <ShoppingBag size={14} />
              Shop The Kit
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("artist")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all ${
                activeMode === "artist"
                  ? "bg-white text-[#24131A] shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Calendar size={14} />
              Book Artist
            </button>
          </div>
        </div>

        {/* 2-Column Interactive Showcase */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Column: Hero Result & Action Pills */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[28px] overflow-hidden border border-white/20 shadow-2xl bg-black/40">
              <Image
                src={tutorialData.heroImage}
                alt="Viral Pink Chrome Nails"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#24131A] shadow-md">
                  Look of the Week
                </span>
              </div>

              {/* Bottom Action Bar */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex items-center justify-between bg-black/50 backdrop-blur-md border-t border-white/10">
                <button
                  type="button"
                  onClick={handlePinterestPin}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E60023] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#c9001f]"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                  Pin Look
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-2 text-[11px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-[#A7F3D0]" /> Copied!
                    </>
                  ) : (
                    <>
                      <Share2 size={13} /> Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Mode Panels */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* MODE 1: STEP-BY-STEP PRO BREAKDOWN */}
              {activeMode === "tutorial" && (
                <motion.div
                  key="tutorial-panel"
                  initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="mb-4">
                    <p className="text-[14px] text-white/90 leading-relaxed">
                      <span className="font-bold text-[#FFD6A5] mr-2">
                        {tutorialData.title}
                      </span>
                      {tutorialData.desc}
                    </p>
                  </div>

                  {tutorialData.steps.map((step) => (
                    <div
                      key={step.id}
                      className="group relative flex items-center overflow-hidden rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 shadow-lg transition hover:bg-white/[0.14]"
                    >
                      <div className="relative h-20 w-24 sm:h-24 sm:w-28 shrink-0 overflow-hidden rounded-[14px] border border-white/20 bg-black/40 mr-4">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif text-[16px] sm:text-[18px] text-white font-medium">
                            {step.id}. {step.title}
                          </h4>
                          <span className="text-[11px] font-bold text-[#FFD6A5] bg-black/30 px-2 py-0.5 rounded-full border border-white/10">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-[12px] sm:text-[13px] leading-relaxed text-white/80">
                          {step.description}
                        </p>
                        <p className="mt-1.5 text-[11px] font-medium text-[#FFD6A5]">
                          ✦ {step.tip}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveMode("shop")}
                      className="inline-flex items-center gap-2 rounded-full bg-[#7A0B2E] px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white shadow transition hover:bg-[#960E39]"
                    >
                      Shop The Exact Kit <ArrowRight size={14} />
                    </button>
                    <Link
                      href="/articles/pink-chrome"
                      className="text-[12px] font-bold text-white/70 hover:text-white uppercase tracking-wider"
                    >
                      Read In-Depth Guide &rarr;
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* MODE 2: SHOP THE EXACT KIT (AFFILIATE EARNING ENGINE) */}
              {activeMode === "shop" && (
                <motion.div
                  key="shop-panel"
                  initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="mb-4">
                    <p className="text-[14px] text-white/90 leading-relaxed">
                      <span className="font-bold text-[#FFD6A5] mr-2">
                        THE EXACT PRODUCTS:
                      </span>
                      Zero guesswork. These 3 verified products yield the high-shine reflective glaze seen on Pinterest.
                    </p>
                  </div>

                  {tutorialData.products.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-4 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:border-[#FFD6A5]/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-[14px] overflow-hidden bg-black/40 border border-white/15 shrink-0">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            sizes="70px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                            {prod.brand}
                          </p>
                          <h4 className="font-serif text-[15px] sm:text-[16px] text-white font-medium">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2.5 mt-1">
                            <span className="text-[13px] font-bold text-white">
                              {prod.price}
                            </span>
                            <span className="text-[11px] text-white/50 line-through">
                              {prod.originalPrice}
                            </span>
                            <span className="flex items-center gap-0.5 text-[11px] text-[#FFD6A5]">
                              <Star size={11} fill="currentColor" /> {prod.rating} ({prod.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={prod.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="shrink-0 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#24131A] shadow-md transition hover:bg-[#FFD6A5] flex items-center gap-1.5"
                      >
                        Buy on {prod.platform}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}

                  {/* 1-Click Kit Bundle Discount Card */}
                  <div className="p-4 sm:p-5 rounded-[20px] bg-gradient-to-r from-[#7A0B2E] to-[#960E39] border border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
                        Bundle &amp; Save ₹200
                      </span>
                      <h4 className="font-serif text-lg text-white font-medium">
                        Complete 3-Piece DIY Glaze Kit
                      </h4>
                      <p className="text-[12px] text-white/80">
                        OPI Base + Beetles No-Wipe Top Coat + Kodi Chrome Powder.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">₹1,798</span>
                        <span className="block text-[10px] text-white/60 line-through">₹2,299</span>
                      </div>
                      <a
                        href="https://www.amazon.in"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="rounded-full bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow transition hover:bg-[#FFE5D0]"
                      >
                        Shop Full Bundle
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MODE 3: BOOK A VERIFIED ARTIST */}
              {activeMode === "artist" && (
                <motion.div
                  key="artist-panel"
                  initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-[24px] bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-950/60 border border-emerald-400/30 px-2.5 py-0.5 rounded-full mb-2">
                          <ShieldCheck size={12} /> RoopSetu Verified Artist
                        </span>
                        <h3 className="font-serif text-2xl font-medium text-white">
                          {tutorialData.artist.name}
                        </h3>
                        <p className="text-[13px] text-white/80 mt-0.5">
                          {tutorialData.artist.speciality}
                        </p>
                        <p className="text-[12px] text-white/60 mt-1">
                          📍 {tutorialData.artist.city} (Studio &amp; Doorstep Service)
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#FFD6A5] bg-black/40 px-3 py-1 rounded-full border border-white/10">
                          <Star size={13} fill="currentColor" /> {tutorialData.artist.rating}
                        </span>
                        <p className="text-[11px] text-white/60 mt-1">
                          {tutorialData.artist.reviews} verified bridal bookings
                        </p>
                        <p className="text-[12px] font-bold text-[#FFD6A5] mt-1">
                          Starting at {tutorialData.artist.rate}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/15">
                      <p className="text-[13px] leading-relaxed text-white/85 mb-5">
                        Prefer not to DIY? Priya and our vetted salon network will travel to your doorstep or host you at their studio in Ahmedabad &amp; Surat to recreate the Pink Chrome with long-lasting gel perfection.
                      </p>

                      <button
                        type="button"
                        onClick={handleArtistWhatsApp}
                        className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-[12px] font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#1EBE5B]"
                      >
                        Book Artist on WhatsApp (Instant Inquiry)
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
