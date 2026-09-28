"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Check,
  Star,
  ShieldCheck,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Calendar,
  ArrowRight,
  Clock,
  Sparkle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/home/Navbar/Navbar";
import LuxuryFooter from "@/components/home/LuxuryFooter";
import type { LookItem, LookCategory, LookProduct } from "@/constants/beauty-data";
import { beautyCategories } from "@/constants/beauty-data";

type ArticleDetailViewProps = {
  articleData: LookItem;
  parentCategory: LookCategory | null;
};

export default function ArticleDetailView({
  articleData,
  parentCategory,
}: ArticleDetailViewProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "steps" | "shop" | "artist">("story");

  const handleShare = () => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    navigator.clipboard.writeText(`${currentOrigin}/articles/${articleData.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppBooking = () => {
    const artist = articleData.artistRecommendation;
    const phone = artist?.whatsappNumber || "919876543210";
    const text = encodeURIComponent(
      `Hi RoopSetu! I was reading the "${articleData.title || articleData.alt}" guide on RoopSetu and would love to book a verified artist to recreate this for my upcoming event in Ahmedabad/Surat. Could you share available dates?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // Find related looks from the same category
  const relatedLooks = (parentCategory?.items || beautyCategories[0]?.items || [])
    .filter((item) => item.id !== articleData.id)
    .slice(0, 4);

  const productsList: LookProduct[] = articleData.products || [];

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2B1B20] pb-24 lg:pb-0">
      <Navbar />

      {/* Top Header & Breadcrumb */}
      <section className="pt-24 pb-8 sm:pt-32 sm:pb-12 bg-[#FAF6F0] border-b border-[#EEDFD7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          {/* Top Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <Link
              href="/beauty-guide"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6F6267] hover:text-[#7A0B2E] transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Beauty Guide
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EEDFD7] bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#2B1B20] hover:bg-[#FDF0F2] transition-colors shadow-2xs"
              >
                {copiedLink ? (
                  <>
                    <Check size={12} className="text-emerald-600" /> Copied Link
                  </>
                ) : (
                  <>
                    <Share2 size={12} /> Share Look
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EEDFD7] bg-white text-[#2B1B20] hover:scale-105 transition-transform shadow-2xs"
                title="Save look"
              >
                <Heart
                  size={14}
                  fill={isSaved ? "#7A0B2E" : "none"}
                  className={isSaved ? "text-[#7A0B2E]" : ""}
                />
              </button>
            </div>
          </div>

          {/* Editorial Title & Badges */}
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A0B2E] bg-[#FDF0F2] px-3 py-1 rounded-full border border-[#F3D7DC]">
                {parentCategory ? parentCategory.label : "Look Breakdown"}
              </span>

              {articleData.occasion && (
                <span className="text-[10px] font-semibold text-[#6F6267] bg-white px-3 py-1 rounded-full border border-[#EEDFD7]">
                  ✦ {articleData.occasion}
                </span>
              )}

              {articleData.savesCount && (
                <span className="text-[10px] font-bold text-[#7A0B2E] bg-[#FAF0E6] px-3 py-1 rounded-full border border-[#EEDFD7] ml-auto sm:ml-0">
                  ✦ {articleData.savesCount}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#2B1B20] leading-[1.12]">
              {articleData.title || articleData.alt}
            </h1>

            <p className="mt-3 text-[14px] sm:text-[16px] text-[#6F6267] leading-relaxed max-w-3xl">
              {articleData.description}
            </p>

            {/* Human Author Byline Bar */}
            <div className="mt-5 pt-4 border-t border-[#EADAD0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#6F6267]">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7A0B2E] text-white font-bold text-[11px] shadow-xs">
                  {articleData.author?.name ? articleData.author.name[0] : "R"}
                </div>
                <div>
                  <p className="font-bold text-[#2B1B20]">
                    {articleData.author?.name || "RoopSetu Beauty Editorial"}
                  </p>
                  <p className="text-[10px] text-[#8C7A81]">
                    {articleData.author?.role || "Certified Stylist Collective"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[#6F6267]">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-[#7A0B2E]" />
                  {articleData.readTime || "3 min read"}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <ShieldCheck size={13} />
                  Cosmetologist Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Visual Showcase & Quick Stats (Sticky on Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
              {/* Main Image Card */}
              <div className="relative aspect-[4/5] w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-lg border border-[#EEDFD7] bg-[#FDF0F2]">
                <Image
                  src={articleData.image}
                  alt={articleData.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                  style={{ objectPosition: articleData.objectPosition ?? "center" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-sm">
                    {articleData.tag || "Editorial Pick"}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                    {articleData.occasion || "Signature Look"}
                  </p>
                  <p className="text-[14px] sm:text-[15px] font-serif font-medium text-white line-clamp-1 mt-0.5">
                    {articleData.title}
                  </p>
                </div>
              </div>

              {/* 4-Stat At A Glance Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-2xl bg-white p-3 border border-[#EEDFD7] shadow-2xs">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A81]">⏱️ Time</p>
                  <p className="text-[13px] font-bold text-[#2B1B20] mt-0.5">
                    {articleData.estimatedTime || "25 mins"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 border border-[#EEDFD7] shadow-2xs">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A81]">🎨 Skill Level</p>
                  <p className="text-[13px] font-bold text-[#2B1B20] mt-0.5">
                    {articleData.difficulty || "Intermediate"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 border border-[#EEDFD7] shadow-2xs">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A81]">🛍️ Est. Kit Cost</p>
                  <p className="text-[13px] font-bold text-[#7A0B2E] mt-0.5">
                    {articleData.kitPrice || "₹1,499"}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-3 border border-[#EEDFD7] shadow-2xs">
                  <p className="text-[10px] uppercase font-bold text-[#8C7A81]">📍 Pro Booking</p>
                  <p className="text-[13px] font-bold text-emerald-700 mt-0.5 truncate">
                    Ahmedabad &amp; Surat
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Tabbed Editorial Guide */}
            <div className="lg:col-span-7 space-y-8">
              {/* Tab Navigation Pill Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F7EFE9] border border-[#EADAD0] overflow-x-auto [scrollbar-width:none]">
                <button
                  type="button"
                  onClick={() => setActiveTab("story")}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                    activeTab === "story"
                      ? "bg-white text-[#7A0B2E] shadow-xs"
                      : "text-[#6F6267] hover:text-[#2B1B20]"
                  }`}
                >
                  <Sparkles size={13} /> The Story
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("steps")}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                    activeTab === "steps"
                      ? "bg-white text-[#7A0B2E] shadow-xs"
                      : "text-[#6F6267] hover:text-[#2B1B20]"
                  }`}
                >
                  <Sparkle size={13} /> 3-Step DIY
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("shop")}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                    activeTab === "shop"
                      ? "bg-white text-[#7A0B2E] shadow-xs"
                      : "text-[#6F6267] hover:text-[#2B1B20]"
                  }`}
                >
                  <ShoppingBag size={13} /> Shop Kit ({articleData.kitPrice || "₹1,499"})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("artist")}
                  className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-wider transition-all shrink-0 ${
                    activeTab === "artist"
                      ? "bg-white text-[#7A0B2E] shadow-xs"
                      : "text-[#6F6267] hover:text-[#2B1B20]"
                  }`}
                >
                  <Calendar size={13} /> Book Artist
                </button>
              </div>

              {/* TAB 1: THE HUMAN-WRITTEN EDITORIAL STORY */}
              {(activeTab === "story" || activeTab === "steps") && (
                <div className="space-y-6">
                  {articleData.articleStory && (
                    <div className="space-y-5 rounded-[24px] bg-white p-6 sm:p-8 border border-[#EEDFD7] shadow-sm">
                      <div>
                        <h2 className="font-serif text-2xl text-[#2B1B20] font-medium flex items-center gap-2">
                          <Sparkles size={18} className="text-[#7A0B2E]" />
                          The Story Behind This Look
                        </h2>
                        <p className="mt-3 text-[14px] sm:text-[15px] text-[#4A3B41] leading-relaxed">
                          {articleData.articleStory.intro}
                        </p>
                        <p className="mt-3 text-[14px] sm:text-[15px] text-[#4A3B41] leading-relaxed">
                          {articleData.articleStory.whyViral}
                        </p>
                      </div>

                      {/* Skin Tone & Styling Advice Callout */}
                      <div className="rounded-2xl bg-[#FFF8F3] p-4 sm:p-5 border border-[#F0DFD7] flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F5E6E8] text-[#7A0B2E]">
                          <CheckCircle2 size={16} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#2B1B20] uppercase tracking-wider">
                            Skin Tone &amp; Outfit Styling Guide
                          </h4>
                          <p className="mt-1 text-[13px] text-[#6F6267] leading-relaxed">
                            {articleData.articleStory.skinToneTips}
                          </p>
                        </div>
                      </div>

                      {/* Common Rookie Mistakes Box */}
                      <div className="rounded-2xl bg-[#FFF5F5] p-4 sm:p-5 border border-[#FED7D7] flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FDE8E8] text-[#C53030]">
                          <AlertCircle size={16} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#9B2C2C] uppercase tracking-wider">
                            Rookie Mistakes to Avoid
                          </h4>
                          <p className="mt-1 text-[13px] text-[#742A2A] leading-relaxed">
                            {articleData.articleStory.mistakesToAvoid}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP-BY-STEP TECHNIQUE CARDS */}
                  {articleData.steps && articleData.steps.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-serif text-2xl text-[#2B1B20] font-medium flex items-center gap-2">
                          <Sparkle size={18} className="text-[#7A0B2E]" />
                          Step-by-Step Recreate Technique
                        </h2>
                        <span className="text-xs font-semibold text-[#8C7A81]">
                          {articleData.steps.length} Pro Steps
                        </span>
                      </div>

                      {articleData.steps.map((step) => (
                        <div
                          key={step.id}
                          className="flex flex-col sm:flex-row gap-4 p-5 rounded-[22px] bg-white border border-[#EEDFD7] shadow-sm hover:border-[#7A0B2E]/40 transition-colors"
                        >
                          <div className="relative h-28 w-full sm:w-32 shrink-0 rounded-[14px] overflow-hidden bg-[#FDF0F2]">
                            <Image
                              src={step.image}
                              alt={step.title}
                              fill
                              sizes="130px"
                              className="object-cover"
                            />
                            {step.time && (
                              <span className="absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-[9px] font-bold text-white">
                                {step.time}
                              </span>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7A0B2E] text-[10px] font-bold text-white">
                                {step.id}
                              </span>
                              <h3 className="font-serif text-[16px] sm:text-[17px] font-medium text-[#2B1B20]">
                                {step.title}
                              </h3>
                            </div>

                            <p className="text-[13px] text-[#6F6267] leading-relaxed mt-1">
                              {step.description}
                            </p>

                            {step.proTip && (
                              <div className="mt-3 rounded-xl bg-[#FFF8F3] p-2.5 border border-[#F0DFD7] flex items-start gap-2">
                                <Sparkles size={14} className="text-[#7A0B2E] shrink-0 mt-0.5" />
                                <p className="text-[12px] text-[#7A0B2E] font-medium">
                                  Pro Artist Tip: {step.proTip}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SHOPPABLE PRODUCT KIT */}
              {(activeTab === "shop" || activeTab === "story") && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl text-[#2B1B20] font-medium flex items-center gap-2">
                        <ShoppingBag size={18} className="text-[#7A0B2E]" />
                        Exact Products Used in This Look
                      </h2>
                      <p className="text-xs text-[#6F6267] mt-1">
                        Drugstore and salon professional products verified by our editorial stylists.
                      </p>
                    </div>

                    <span className="text-xs font-bold text-[#7A0B2E] bg-[#FDF0F2] px-3 py-1 rounded-full border border-[#F3D7DC]">
                      Total: {articleData.kitPrice || "₹1,499"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {productsList.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 p-4 rounded-[20px] bg-white border border-[#EEDFD7] shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-[12px] overflow-hidden bg-[#FAF6F0] p-1 border border-[#EEDFD7]">
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
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                              {product.brand}
                            </span>
                            <span className="text-[10px] text-[#6F6267]">•</span>
                            <span className="text-[10px] text-[#6F6267] flex items-center gap-0.5">
                              <Star size={11} fill="#F59E0B" className="text-amber-500" />
                              {product.rating} ({product.reviewsCount || 1200})
                            </span>
                          </div>

                          <h4 className="text-[14px] font-semibold text-[#2B1B20] truncate mt-0.5">
                            {product.name}
                          </h4>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[14px] font-bold text-[#2B1B20]">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[12px] text-[#8C7A81] line-through">
                                {product.originalPrice}
                              </span>
                            )}
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Verified on {product.platform}
                            </span>
                          </div>
                        </div>

                        <a
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-4 py-2 text-[11px] font-bold text-white shadow-sm hover:bg-[#960E39] transition-colors"
                        >
                          <span>Buy</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Bundle Box */}
                  <div className="rounded-[22px] bg-gradient-to-r from-[#FAF0E6] to-[#FDF5EE] p-5 border border-[#E8D4C8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                        Complete Recreate Kit
                      </p>
                      <p className="text-lg font-bold text-[#2B1B20]">
                        Get all {productsList.length} products for {articleData.kitPrice || "₹1,499"}
                      </p>
                    </div>

                    <a
                      href="https://www.nykaa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7A0B2E] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#960E39] transition-all"
                    >
                      <ShoppingBag size={14} /> Buy Full Kit on Nykaa
                    </a>
                  </div>
                </div>
              )}

              {/* TAB 4: VERIFIED ARTIST BOOKING */}
              {(activeTab === "artist" || activeTab === "story") && (
                <div className="rounded-[26px] bg-white p-6 sm:p-8 border border-[#EEDFD7] shadow-sm">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] mb-2">
                    <ShieldCheck size={16} />
                    Verified Local Artist Booking
                  </div>

                  <h3 className="font-serif text-2xl text-[#2B1B20] font-medium">
                    Prefer salon perfection at your home?
                  </h3>

                  <p className="mt-2 text-[14px] text-[#6F6267] leading-relaxed">
                    Skip buying equipment. Connect directly with our vetted top-tier cosmetologists in Ahmedabad and Surat who arrive with salon-grade LED tools, sterile hygiene kits, and exact shade matches.
                  </p>

                  {articleData.artistRecommendation && (
                    <div className="mt-6 rounded-2xl bg-[#FFF8F3] p-5 border border-[#EEDFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-lg font-semibold text-[#2B1B20]">
                            {articleData.artistRecommendation.name}
                          </h4>
                          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                            <Star size={11} fill="currentColor" />
                            {articleData.artistRecommendation.rating} (
                            {articleData.artistRecommendation.reviews} reviews)
                          </span>
                        </div>

                        <p className="text-[12px] text-[#7A0B2E] font-medium mt-0.5">
                          {articleData.artistRecommendation.speciality}
                        </p>

                        <p className="text-[12px] text-[#6F6267] mt-1">
                          📍 {articleData.artistRecommendation.city} • Doorstep Service
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleWhatsAppBooking}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-black shadow-md hover:bg-[#20ba59] transition-all"
                      >
                        <Calendar size={14} /> Book via WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Looks Feed */}
          {relatedLooks.length > 0 && (
            <div className="mt-16 sm:mt-24 pt-10 border-t border-[#EEDFD7]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7A0B2E]">
                    Curated Recommendations
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2B1B20] font-medium mt-1">
                    Trending Looks You&apos;ll Love
                  </h3>
                </div>

                <Link
                  href="/beauty-guide"
                  className="text-xs font-bold uppercase tracking-wider text-[#7A0B2E] hover:underline flex items-center gap-1"
                >
                  View All Looks <ArrowRight size={13} />
                </Link>
              </div>

              {/* 2-Column Mobile Grid for Related Looks */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {relatedLooks.map((look) => (
                  <Link
                    key={look.id}
                    href={`/articles/${look.id}`}
                    className="group relative flex flex-col rounded-[20px] overflow-hidden bg-white border border-[#EEDFD7] shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FDF0F2]">
                      <Image
                        src={look.image}
                        alt={look.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />

                      <div className="absolute top-2.5 left-2.5 z-10">
                        <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2B1B20]">
                          {look.tag || "Trending"}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-3 z-10 text-white">
                        <p className="text-[9px] font-bold text-[#FFD6A5]">
                          ✦ {look.savesCount || "90k saves"}
                        </p>
                        <h4 className="font-serif text-[13px] sm:text-[15px] font-medium leading-snug line-clamp-1 mt-0.5 group-hover:text-[#FFD6A5] transition-colors">
                          {look.title || look.alt}
                        </h4>
                        <p className="text-[10px] text-white/80 mt-1 font-semibold">
                          Kit: {look.kitPrice || "₹1,499"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MOBILE STICKY BOTTOM ACTION BAR (Screens < 1024px) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EEDFD7] p-3 px-4 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C7A81]">
            Shoppable Kit
          </p>
          <p className="text-[15px] font-bold text-[#7A0B2E]">
            {articleData.kitPrice || "₹1,499"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF6F0] border border-[#EEDFD7] text-[#2B1B20] shadow-sm active:scale-95 shrink-0"
            title="Share Look"
          >
            {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppBooking}
            className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black shadow-md active:scale-95"
          >
            <Calendar size={13} /> Book Artist
          </button>

          <a
            href="https://www.nykaa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-[#7A0B2E] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md active:scale-95"
          >
            <ShoppingBag size={13} /> Shop
          </a>
        </div>
      </div>

      <LuxuryFooter />
    </main>
  );
}
