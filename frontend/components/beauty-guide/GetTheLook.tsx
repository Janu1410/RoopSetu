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
import { motion, AnimatePresence } from "framer-motion";

const tutorialData = {
  heroImage: "/images/nails/nai-10.jpg",
  title: "THE VIRAL PINK CHROME:",
  desc: "A sheer blush-pink gel foundation sealed with an ultra-reflective pearl glaze. The #1 viral Pinterest trend.",
  saves: "148,000+ Saves on Pinterest",
  steps: [
    {
      id: "01",
      title: "The Flawless Canvas Prep",
      description:
        "Push cuticles back gently, buff nail plate to 240-grit texture, and apply self-leveling rubber base. Dehydrate with 99% isopropyl alcohol for 3-week salon retention.",
      image: "/images/nails/nai-1.jpg",
      time: "2 mins",
      tip: "Never skip alcohol dehydration — it removes natural oils that cause gel peeling within 72 hours.",
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
    rating: 4.9,
    reviews: 142,
    rate: "₹1,200 for full set",
    whatsapp: "919876543210",
  },
};

export default function GetTheLook() {
  const [activeMode, setActiveMode] = useState<"tutorial" | "shop" | "artist">("tutorial");
  const [copied, setCopied] = useState(false);

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
    <section id="get-the-look" className="relative overflow-hidden bg-[#24131A] py-16 sm:py-24 text-white">
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
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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
          <div className="mt-6 inline-flex items-center rounded-full bg-white/10 p-1.5 backdrop-blur-md border border-white/20 shadow-lg max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveMode("tutorial")}
              className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
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
              className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeMode === "shop"
                  ? "bg-white text-[#24131A] shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <ShoppingBag size={14} />
              Shop Kit (₹1,898)
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("artist")}
              className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
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

        {/* Dynamic Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Photograph Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative aspect-[4/5] w-full max-w-[420px] rounded-[28px] overflow-hidden shadow-2xl border border-white/15 bg-black/40">
              <Image
                src={tutorialData.heroImage}
                alt="Viral pink chrome manicure"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-sm">
                  Viral #1 on Pinterest
                </span>
              </div>

              {/* Bottom Card Controls */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                    Longevity: 3+ Weeks
                  </p>
                  <p className="text-[13px] font-medium text-white">
                    Estimated Time: 25 Mins
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePinterestPin}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white shadow-lg transition hover:scale-110 active:scale-95"
                    title="Save this look on Pinterest"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg transition hover:scale-110 active:scale-95"
                    title="Copy Article Link"
                  >
                    {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Read Complete Full Article Link */}
            <Link
              href="/articles/pink-chrome"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#FFD6A5] hover:underline"
            >
              Read Full Human-Written Blog Article <ArrowRight size={13} />
            </Link>
          </div>

          {/* Right Column: 3 Interactive Tabs */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* TAB 1: 3-STEP MASTERCLASS */}
              {activeMode === "tutorial" && (
                <motion.div
                  key="tutorial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {tutorialData.steps.map((step) => (
                    <div
                      key={step.id}
                      className="group flex flex-col sm:flex-row gap-4 rounded-[22px] bg-white/5 p-4 sm:p-5 border border-white/10 backdrop-blur-md hover:border-white/25 transition-all"
                    >
                      <div className="relative h-24 w-full sm:w-28 shrink-0 rounded-[14px] overflow-hidden bg-black/30">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="120px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-bold text-white">
                          {step.time}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7A0B2E] text-[10px] font-bold text-white">
                            {step.id}
                          </span>
                          <h4 className="font-serif text-[16px] sm:text-[17px] font-medium text-white">
                            {step.title}
                          </h4>
                        </div>

                        <p className="text-[12px] sm:text-[13px] text-white/80 leading-relaxed">
                          {step.description}
                        </p>

                        <div className="mt-2.5 rounded-lg bg-white/5 p-2 border border-white/10 flex items-start gap-1.5">
                          <Sparkles size={13} className="text-[#FFD6A5] shrink-0 mt-0.5" />
                          <p className="text-[11px] text-[#FFD6A5]/90 italic">
                            Pro Artist Tip: {step.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px] text-white/70">
                      Want to shop the exact products used in this tutorial?
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveMode("shop")}
                      className="rounded-full bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#24131A] shadow-md transition hover:bg-[#FFE5D0]"
                    >
                      View 3-Product Kit (₹1,898) →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: SHOPPING KIT WITH MONETIZATION LINKS */}
              {activeMode === "shop" && (
                <motion.div
                  key="shop"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="rounded-[22px] bg-white/10 p-4 border border-white/20 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                        Complete 3-Product Bundle
                      </p>
                      <p className="text-xl font-bold text-white mt-0.5">
                        ₹1,898{" "}
                        <span className="text-xs text-white/60 line-through font-normal">
                          ₹2,299
                        </span>
                      </p>
                    </div>
                    <a
                      href="https://www.nykaa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#E60023] px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#c9001f]"
                    >
                      <ShoppingBag size={14} /> Buy All on Nykaa
                    </a>
                  </div>

                  {tutorialData.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 rounded-[20px] bg-white/5 p-4 border border-white/10 backdrop-blur-md hover:border-white/25 transition-all"
                    >
                      <div className="relative h-16 w-16 shrink-0 rounded-[12px] overflow-hidden bg-white p-1">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                            {product.brand}
                          </span>
                          <span className="text-[10px] text-white/50">•</span>
                          <span className="text-[10px] text-white/70 flex items-center gap-1">
                            <Star size={10} fill="#FFD6A5" className="text-[#FFD6A5]" />
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <h4 className="text-[14px] font-semibold text-white truncate">
                          {product.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[13px] font-bold text-white">
                            {product.price}
                          </span>
                          <span className="text-[11px] text-white/50 line-through">
                            {product.originalPrice}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                            Verified on {product.platform}
                          </span>
                        </div>
                      </div>

                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-[#24131A] transition-colors"
                        title={`Buy on ${product.platform}`}
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: VERIFIED LOCAL ARTIST BOOKING */}
              {activeMode === "artist" && (
                <motion.div
                  key="artist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-[24px] bg-gradient-to-br from-white/10 to-white/5 p-6 sm:p-8 border border-white/20 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2 text-[#FFD6A5] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck size={16} />
                    RoopSetu Verified Specialist
                  </div>

                  <h3 className="font-serif text-2xl text-white font-medium">
                    Don&apos;t want to DIY? Recreate it with Priya.
                  </h3>

                  <p className="mt-2 text-[13px] text-white/80 leading-relaxed">
                    Skip buying equipment. Priya is our top-rated nail stylist in Ahmedabad &amp; Surat, specializing in salon-grade chrome applications, Russian cuticle prep, and wedding sets.
                  </p>

                  <div className="mt-6 rounded-2xl bg-white/10 p-4 border border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div>
                      <p className="text-[10px] uppercase text-white/60">Rating</p>
                      <p className="text-[15px] font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                        <Star size={13} fill="#FFD6A5" className="text-[#FFD6A5]" />
                        {tutorialData.artist.rating}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-white/60">Appointments</p>
                      <p className="text-[15px] font-bold text-white mt-0.5">
                        {tutorialData.artist.reviews}+ Verified
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-white/60">Location</p>
                      <p className="text-[13px] font-semibold text-white mt-0.5 truncate">
                        Ahmedabad &amp; Surat
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase text-white/60">Service Rate</p>
                      <p className="text-[14px] font-bold text-[#FFD6A5] mt-0.5">
                        {tutorialData.artist.rate}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handleArtistWhatsApp}
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider text-black shadow-lg transition hover:bg-[#20ba59]"
                    >
                      <Calendar size={15} /> Book Appointment on WhatsApp
                    </button>

                    <Link
                      href="/articles/pink-chrome"
                      className="w-full sm:w-auto rounded-full border border-white/30 px-6 py-3.5 text-[12px] font-semibold text-center text-white hover:bg-white/10 transition-colors"
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
