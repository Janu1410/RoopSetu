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
  Sparkle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tutorialData = {
  heroImage: "/images/nails/nai-10.jpg",
  title: "The Viral Pink Chrome",
  desc: "A sheer blush-pink gel foundation sealed with an ultra-reflective pearl glaze. The #1 viral trend for weddings and celebrations.",
  saves: "148,000+ Saves",
  steps: [
    {
      id: "01",
      title: "The Flawless Canvas Prep",
      description:
        "Push cuticles back gently, buff nail plate to 240-grit texture, and apply self-leveling rubber base. Dehydrate with 99% isopropyl alcohol for 3-week salon retention.",
      image: "/images/nails/nai-1.jpg",
      time: "2 mins",
      tip: "Alcohol dehydration removes natural surface oils that cause lifting within 72 hours.",
    },
    {
      id: "02",
      title: "The Blush Base & Flash Cure",
      description:
        "Apply two sheer coats of soft baby pink gel polish. Cure each coat for 60s under LED lamp. Apply a strictly NON-WIPE top coat and flash cure for exactly 30s.",
      image: "/images/nails/nai-2.jpg",
      time: "60s cure",
      tip: "Flash curing for 30s instead of 60s leaves the top coat warm so chrome powder adheres mirror-smooth.",
    },
    {
      id: "03",
      title: "The Pearl Chrome Burnish & Seal",
      description:
        "While warm from the lamp, use a dense silicone applicator to firmly buff the iridescent pearl dust across the nail. Cap free edges and lock with dual-layer top coat.",
      image: "/images/nails/nai-6.jpg",
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
    rating: 4.95,
    reviews: 142,
    rate: "₹1,200 for full set",
    whatsapp: "919876543210",
  },
};

export default function GetTheLook() {
  const [activeMode, setActiveMode] = useState<"tutorial" | "shop" | "artist">("tutorial");
  const [copied, setCopied] = useState(false);

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
    <section id="get-the-look" className="relative overflow-hidden bg-[#FAF6F0] py-12 sm:py-16 border-b border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5E6E8] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A0B2E] mb-2">
            <Sparkle size={12} />
            Recreate The Look Spotlight
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#2B1B20]">
            Anatomy of the Pink Chrome
          </h2>

          <p className="mt-1.5 text-[13px] text-[#6F6267] leading-relaxed">
            The exact 3-step pro technique, shoppable drugstore product dupes, or 1-click booking with a verified local artist.
          </p>

          {/* 3-Mode Switcher Buttons */}
          <div className="mt-4 inline-flex items-center rounded-full bg-[#EDE1D9] p-1 border border-[#E3D3C9] shadow-2xs max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveMode("tutorial")}
              className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeMode === "tutorial"
                  ? "bg-white text-[#7A0B2E] shadow-xs"
                  : "text-[#6F6267] hover:text-[#2B1B20]"
              }`}
            >
              <Sparkles size={13} />
              Pro Technique
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("shop")}
              className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeMode === "shop"
                  ? "bg-white text-[#7A0B2E] shadow-xs"
                  : "text-[#6F6267] hover:text-[#2B1B20]"
              }`}
            >
              <ShoppingBag size={13} />
              Shop Kit (₹1,898)
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("artist")}
              className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeMode === "artist"
                  ? "bg-white text-[#7A0B2E] shadow-xs"
                  : "text-[#6F6267] hover:text-[#2B1B20]"
              }`}
            >
              <Calendar size={13} />
              Book Local Artist
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Photo Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[4/5] w-full max-w-[340px] rounded-[22px] overflow-hidden shadow-md border border-[#EEDFD7] bg-white p-2">
              <div className="relative h-full w-full rounded-[16px] overflow-hidden bg-[#FDF0F2]">
                <Image
                  src={tutorialData.heroImage}
                  alt="Viral pink chrome manicure"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-2xs">
                    ✦ Trending Technique
                  </span>
                </div>

                {/* Bottom Overlay Controls */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 z-10 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                      Longevity: 3+ Weeks
                    </p>
                    <p className="text-[12px] font-medium text-white">
                      Time Needed: 25 Mins
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow hover:scale-105 transition-transform"
                    title="Share look"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Read Complete Full Article Link */}
            <Link
              href="/articles/pink-chrome"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0B2E] hover:underline"
            >
              Read Full Step-by-Step Article <ArrowRight size={13} />
            </Link>
          </div>

          {/* Right Column: 3 Interactive Tabs */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* TAB 1: 3-STEP MASTERCLASS */}
              {activeMode === "tutorial" && (
                <motion.div
                  key="tutorial"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  {tutorialData.steps.map((step) => (
                    <div
                      key={step.id}
                      className="group flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-[18px] bg-white p-3.5 border border-[#EEDFD7] shadow-2xs hover:border-[#7A0B2E]/40 transition-all"
                    >
                      <div className="relative h-20 w-full sm:w-24 shrink-0 rounded-[12px] overflow-hidden bg-[#FDF0F2]">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="100px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1.5 left-1.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[8px] font-bold text-white">
                          {step.time}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7A0B2E] text-[9px] font-bold text-white">
                            {step.id}
                          </span>
                          <h4 className="font-serif text-[15px] font-medium text-[#2B1B20]">
                            {step.title}
                          </h4>
                        </div>

                        <p className="text-[12px] text-[#6F6267] leading-relaxed">
                          {step.description}
                        </p>

                        <div className="mt-1.5 rounded-lg bg-[#FFF8F3] p-1.5 px-2 border border-[#F0DFD7] flex items-start gap-1.5">
                          <Sparkles size={12} className="text-[#7A0B2E] shrink-0 mt-0.5" />
                          <p className="text-[11px] text-[#7A0B2E] font-medium">
                            Pro Artist Tip: {step.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-[12px] text-[#6F6267]">
                      Shop the exact 3 products used in this look:
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveMode("shop")}
                      className="rounded-full bg-[#7A0B2E] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs transition hover:bg-[#960E39]"
                    >
                      View 3-Product Kit (₹1,898) →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SHOPPING KIT */}
              {activeMode === "shop" && (
                <motion.div
                  key="shop"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="rounded-[18px] bg-white p-3.5 border border-[#EEDFD7] shadow-2xs flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                        Complete Recreate Bundle
                      </p>
                      <p className="text-lg font-bold text-[#2B1B20] mt-0.5">
                        ₹1,898{" "}
                        <span className="text-xs text-[#8C7A81] line-through font-normal">
                          ₹2,299
                        </span>
                      </p>
                    </div>
                    <a
                      href="https://www.nykaa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs transition hover:bg-[#960E39]"
                    >
                      <ShoppingBag size={13} /> Buy on Nykaa
                    </a>
                  </div>

                  {tutorialData.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3.5 rounded-[16px] bg-white p-3 border border-[#EEDFD7] shadow-2xs hover:shadow-sm transition-all"
                    >
                      <div className="relative h-14 w-14 shrink-0 rounded-[10px] overflow-hidden bg-[#FAF6F0] p-1 border border-[#EEDFD7]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-[#6F6267]">•</span>
                          <span className="text-[10px] text-[#6F6267] flex items-center gap-0.5">
                            <Star size={10} fill="#F59E0B" className="text-amber-500" />
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <h4 className="text-[13px] font-semibold text-[#2B1B20] truncate">
                          {product.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[13px] font-bold text-[#2B1B20]">
                            {product.price}
                          </span>
                          <span className="text-[11px] text-[#8C7A81] line-through">
                            {product.originalPrice}
                          </span>
                          <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                            {product.platform}
                          </span>
                        </div>
                      </div>

                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 rounded-full bg-[#FAF6F0] border border-[#EEDFD7] px-3 py-1.5 text-[11px] font-semibold text-[#2B1B20] hover:bg-[#FDF0F2] transition-colors"
                      >
                        <span>Buy</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: VERIFIED LOCAL ARTIST BOOKING */}
              {activeMode === "artist" && (
                <motion.div
                  key="artist"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[20px] bg-white p-5 border border-[#EEDFD7] shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-[#7A0B2E] text-[10px] font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck size={15} />
                    Verified Local Artist Booking
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B1B20] font-medium">
                    Recreate it at home with Priya Sharma.
                  </h3>

                  <p className="mt-1 text-[13px] text-[#6F6267] leading-relaxed">
                    Skip buying equipment. Priya is our top-rated nail stylist in Ahmedabad &amp; Surat, specializing in salon-grade chrome applications, Russian cuticle prep, and wedding sets.
                  </p>

                  <div className="mt-4 rounded-xl bg-[#FAF6F0] p-3 border border-[#EEDFD7] grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-[#8C7A81]">Rating</p>
                      <p className="text-[13px] font-bold text-[#2B1B20] flex items-center justify-center gap-0.5 mt-0.5">
                        <Star size={11} fill="#F59E0B" className="text-amber-500" />
                        {tutorialData.artist.rating}
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase font-bold text-[#8C7A81]">Appointments</p>
                      <p className="text-[13px] font-bold text-[#2B1B20] mt-0.5">
                        {tutorialData.artist.reviews}+ Verified
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase font-bold text-[#8C7A81]">Location</p>
                      <p className="text-[12px] font-semibold text-[#2B1B20] mt-0.5 truncate">
                        Ahmedabad &amp; Surat
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] uppercase font-bold text-[#8C7A81]">Service Rate</p>
                      <p className="text-[13px] font-bold text-[#7A0B2E] mt-0.5">
                        {tutorialData.artist.rate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleArtistWhatsApp}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black shadow-2xs hover:bg-[#20ba59] transition-all"
                    >
                      <Calendar size={13} /> Book on WhatsApp
                    </button>

                    <Link
                      href="/articles/pink-chrome"
                      className="w-full sm:w-auto rounded-full border border-[#EEDFD7] bg-white px-5 py-2.5 text-[11px] font-semibold text-center text-[#2B1B20] hover:bg-[#FDF0F2] transition-colors"
                    >
                      View Complete Guide
                    </Link>
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
