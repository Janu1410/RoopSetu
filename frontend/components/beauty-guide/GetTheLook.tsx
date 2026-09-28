"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShoppingBag,
  Palette,
  ExternalLink,
  Star,
  ArrowRight,
  Share2,
  Check,
  Sparkle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tutorialData = {
  heroImage: "/images/nails/nai-10.jpg",
  title: "The Viral Pink Chrome",
  desc: "A sheer blush-pink gel foundation sealed with an ultra-reflective pearl glaze. The #1 requested manicure for modern celebrations.",
  saves: "148,000+ Community Saves",
  difficulty: "Intermediate",
  estimatedTime: "25 mins",
  kitPrice: "₹1,898",
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
  guideDetails: {
    undertoneCompatibility:
      "Flattering for warm, golden, and olive Indian complexions. Use a warm petal-peach base instead of cool pink to avoid an ashy contrast under bright festive halogen lighting.",
    commonMistakes:
      "Curing the top coat for full 60 seconds before buffing chrome. Once 100% cured and cooled, the powder will slip off rather than fusing into a mirror glaze.",
    longevitySecret:
      "Always swipe free edges with primer and cap with top coat. Chrome edge chipping happens when the free edge is left exposed.",
  },
};

export default function GetTheLook() {
  const [activeMode, setActiveMode] = useState<"tutorial" | "shop" | "guide">("tutorial");
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    navigator.clipboard.writeText(`${currentOrigin}/articles/pink-chrome`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="get-the-look" className="relative overflow-hidden bg-[#FAF6F0] py-12 sm:py-16 border-b border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5E6E8] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A0B2E] mb-2 border border-[#ECCCD3]">
            <Sparkle size={12} />
            Masterclass Spotlight
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#2B1B20]">
            Anatomy of the Pink Chrome
          </h2>

          <p className="mt-1.5 text-[13px] text-[#6F6267] leading-relaxed">
            The exact 3-step pro technique, verified drugstore product dupes, and undertone formulation secrets.
          </p>

          {/* 3-Mode Switcher Buttons (Pure Informative, No Beautician Suggestions) */}
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
              Shoppable Kit ({tutorialData.kitPrice})
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("guide")}
              className={`flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-1.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeMode === "guide"
                  ? "bg-white text-[#7A0B2E] shadow-xs"
                  : "text-[#6F6267] hover:text-[#2B1B20]"
              }`}
            >
              <Palette size={13} />
              Shade &amp; Undertone Guide
            </button>
          </div>
        </div>

        {/* 2-Column Showcase */}
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

                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-2xs">
                    Curated Masterclass
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                  <p className="text-[10px] text-[#FFD6A5] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Clock size={11} /> {tutorialData.estimatedTime} • {tutorialData.difficulty}
                  </p>
                  <h3 className="font-serif text-lg font-medium text-white leading-tight mt-0.5">
                    {tutorialData.title}
                  </h3>

                  <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between text-[11px]">
                    <span className="text-white/85 font-semibold">
                      Complete Kit: {tutorialData.kitPrice}
                    </span>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1 font-bold text-[#FFD6A5] hover:text-white transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <Share2 size={12} /> Share Look
                        </>
                      )}
                    </button>
                  </div>
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

          {/* Right Column: Dynamic Panel based on activeMode */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* MODE 1: PRO TECHNIQUE (3-Step Masterclass) */}
              {activeMode === "tutorial" && (
                <motion.div
                  key="tutorial-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5"
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
                          sizes="96px"
                          className="object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 rounded-full bg-black/75 px-1.5 py-0.5 text-[8px] font-bold text-white">
                          {step.time}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7A0B2E] text-[9px] font-bold text-white">
                            {step.id}
                          </span>
                          <h4 className="font-serif text-[14px] font-medium text-[#2B1B20]">
                            {step.title}
                          </h4>
                        </div>

                        <p className="mt-1 text-[12px] text-[#6F6267] leading-relaxed">
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
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] hover:underline"
                    >
                      <span>View Full Product Kit</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* MODE 2: SHOPPING KIT (Exact verified products) */}
              {activeMode === "shop" && (
                <motion.div
                  key="shop-panel"
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
                      <p className="text-[13px] font-bold text-[#2B1B20]">
                        All 3 verified products: {tutorialData.kitPrice}
                      </p>
                    </div>

                    <a
                      href="https://www.nykaa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-4 py-2 text-[11px] font-bold text-white shadow-2xs hover:bg-[#960E39] transition-all"
                    >
                      <ShoppingBag size={13} />
                      Buy Kit on Nykaa
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
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                            {product.brand}
                          </span>
                          <span className="text-[9px] text-[#6F6267] flex items-center gap-0.5">
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
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#8C7A81] line-through">
                              {product.originalPrice}
                            </span>
                          )}
                          <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                            {product.platform}
                          </span>
                        </div>
                      </div>

                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 flex items-center gap-1 rounded-full bg-[#FAF6F0] border border-[#EEDFD7] px-3 py-1.5 text-[11px] font-bold text-[#2B1B20] hover:bg-[#7A0B2E] hover:text-white transition-all"
                      >
                        <span>Buy</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* MODE 3: SHADE & LONGEVITY GUIDE (Deeply Informative, No Beauticians) */}
              {activeMode === "guide" && (
                <motion.div
                  key="guide-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[20px] bg-white p-5 border border-[#EEDFD7] shadow-2xs space-y-4"
                >
                  <div className="flex items-center gap-2 text-[#7A0B2E] text-[10px] font-bold uppercase tracking-wider">
                    <Palette size={15} />
                    Editorial Formulation &amp; Undertone Matrix
                  </div>

                  {/* Undertone Harmony */}
                  <div className="rounded-xl bg-[#FFF8F3] p-3.5 border border-[#F0DFD7] flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5E6E8] text-[#7A0B2E]">
                      <CheckCircle2 size={15} />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-[#2B1B20] uppercase tracking-wider">
                        South Asian Undertone Harmony
                      </h4>
                      <p className="mt-1 text-[12px] text-[#6F6267] leading-relaxed">
                        {tutorialData.guideDetails.undertoneCompatibility}
                      </p>
                    </div>
                  </div>

                  {/* Longevity Secret */}
                  <div className="rounded-xl bg-[#FAF6F0] p-3.5 border border-[#EEDFD7] flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white border border-[#EEDFD7] text-[#7A0B2E]">
                      <Sparkles size={15} />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-[#2B1B20] uppercase tracking-wider">
                        3-Week Retention Secret
                      </h4>
                      <p className="mt-1 text-[12px] text-[#6F6267] leading-relaxed">
                        {tutorialData.guideDetails.longevitySecret}
                      </p>
                    </div>
                  </div>

                  {/* Mistakes to Avoid */}
                  <div className="rounded-xl bg-[#FFF5F5] p-3.5 border border-[#FED7D7] flex items-start gap-2.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FDE8E8] text-[#C53030]">
                      <AlertCircle size={15} />
                    </div>
                    <div>
                      <h4 className="text-[12px] font-bold text-[#9B2C2C] uppercase tracking-wider">
                        Critical Curing Mistake to Avoid
                      </h4>
                      <p className="mt-1 text-[12px] text-[#742A2A] leading-relaxed">
                        {tutorialData.guideDetails.commonMistakes}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <Link
                      href="/articles/pink-chrome"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A0B2E] hover:underline"
                    >
                      Read In-Depth Masterclass Article <ArrowRight size={13} />
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
