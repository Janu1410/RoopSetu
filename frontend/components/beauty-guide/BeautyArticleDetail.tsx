"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share2,
  Check,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  Clock,
  CheckCircle2,
  Wrench,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/home/Navbar/Navbar";
import LuxuryFooter from "@/components/home/LuxuryFooter";
import type { LookItem, LookCategory, LookProduct } from "@/constants/beauty-data";
import { beautyCategories } from "@/constants/beauty-data";

type BeautyArticleDetailProps = {
  articleData: LookItem;
  parentCategory: LookCategory | null;
};

export default function BeautyArticleDetail({
  articleData,
  parentCategory,
}: BeautyArticleDetailProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    navigator.clipboard.writeText(`${currentOrigin}/articles/${articleData.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find related looks from the same category
  const relatedLooks = (parentCategory?.items || beautyCategories[0]?.items || [])
    .filter((item) => item.id !== articleData.id)
    .slice(0, 4);

  const productsList: LookProduct[] = articleData.products || [];

  return (
    <main className="min-h-screen bg-white text-[#1A1A1A] pb-24 lg:pb-0 font-sans selection:bg-[#FCE7F3] selection:text-[#7A0B2E]">
      <Navbar />

      {/* Top Breadcrumb & Beauty Guide Hub Strip (Clean Editorial Style) */}
      <nav
        aria-label="Breadcrumb"
        className="pt-20 sm:pt-24 bg-[#FAF7F2] border-b border-[#EAE3DC]"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link
              href="/"
              className="hover:text-[#7A0B2E] transition-colors font-medium"
            >
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/beauty-guide"
              className="hover:text-[#7A0B2E] transition-colors font-medium text-[#7A0B2E]"
            >
              Beauty Guide
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600 font-medium">
              {parentCategory ? parentCategory.label : "Masterclass"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/beauty-guide"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A0B2E] hover:underline"
            >
              <ArrowLeft size={12} />
              <span>Beauty Guide Hub</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ARTICLE CONTAINER (Clean Production-Level Editorial Width) */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12 pb-16">
        {/* Category Pill & Action Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#FFF0F5] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] border border-[#FCDDEC]">
                {parentCategory ? `${parentCategory.label} Guide` : "Beauty Masterclass"}
              </span>
              {articleData.occasion && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium text-gray-600">
                  {articleData.occasion}
                </span>
              )}
            </div>

            {/* Save & Share Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-2xs"
                title="Share this guide"
              >
                {copiedLink ? (
                  <>
                    <Check size={13} className="text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 size={13} />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors shadow-2xs ${
                  isSaved
                    ? "border-[#7A0B2E] bg-[#FFF0F5] text-[#7A0B2E]"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                title={isSaved ? "Saved" : "Save Look"}
              >
                <Heart
                  size={13}
                  fill={isSaved ? "#7A0B2E" : "none"}
                  className={isSaved ? "text-[#7A0B2E]" : ""}
                />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-medium tracking-tight text-gray-900 leading-[1.18]">
            {articleData.title || articleData.alt}
          </h1>

          {/* Excerpt / Lead Description */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            {articleData.description}
          </p>

          {/* Author Byline & Meta Info */}
          <div className="pt-3 pb-1 border-t border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7A0B2E] text-white font-bold text-[10px]">
                R
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  {articleData.author?.name || "RoopSetu Beauty Editorial"}
                </span>
                <span className="text-gray-400 mx-1.5">•</span>
                <span className="text-gray-500">
                  {articleData.author?.role || "RoopSetu Beauty Editorial Desk"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-[#7A0B2E]" />
                {articleData.readTime || "3 min read"}
              </span>
              <span className="flex items-center gap-1">
                <Sparkles size={13} className="text-[#7A0B2E]" />
                DIY: {articleData.estimatedTime || "25 mins"}
              </span>
              {articleData.kitPrice && (
                <span className="font-bold text-[#7A0B2E]">
                  Kit: {articleData.kitPrice}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* HERO FEATURED IMAGE */}
        <figure className="mt-6 mb-10">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-xs">
            <Image
              src={articleData.image}
              alt={articleData.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
              style={{ objectPosition: articleData.objectPosition ?? "center" }}
            />
          </div>
          <figcaption className="mt-2 text-center text-xs text-gray-400 italic">
            Curated look: {articleData.title || articleData.alt} • RoopSetu Editorial Edition
          </figcaption>
        </figure>

        {/* AT-A-GLANCE QUICK STATS BAR */}
        <div className="mb-10 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3DC] text-center">
          <div className="p-2">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
              Difficulty
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {articleData.difficulty || "Intermediate"}
            </p>
          </div>
          <div className="p-2 border-l border-gray-200">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
              Est. Time
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {articleData.estimatedTime || "25 mins"}
            </p>
          </div>
          <div className="p-2 border-l-0 sm:border-l border-gray-200">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
              Occasion
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-800 truncate">
              {articleData.occasion || "Celebration"}
            </p>
          </div>
          <div className="p-2 border-l border-gray-200">
            <p className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
              Kit Estimate
            </p>
            <p className="mt-1 text-sm font-bold text-[#7A0B2E]">
              {articleData.kitPrice || "₹1,499"}
            </p>
          </div>
        </div>

        {/* SECTION 1: EDITORIAL STORY */}
        <section className="prose prose-gray max-w-none mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mb-4">
            Why This Look Is Trending
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            {articleData.articleStory?.intro ||
              `The "${articleData.title || articleData.alt}" has become a sensation for modern celebrations. It pairs effortlessly with both contemporary outfits and festive attire, creating a balanced, high-reflect finish that captures natural light seamlessly.`}
          </p>
          {articleData.articleStory?.whyViral && (
            <p className="mt-4 text-base text-gray-700 leading-relaxed">
              {articleData.articleStory.whyViral}
            </p>
          )}

          {/* Editorial Pullquote */}
          <div className="my-6 rounded-r-xl border-l-4 border-[#7A0B2E] bg-[#FFF5F7] p-4 text-gray-800">
            <p className="font-serif italic text-base sm:text-lg text-[#7A0B2E]">
              &ldquo;
              {articleData.technique
                ? `The key is the ${articleData.technique.toLowerCase()}: creating clean reflective dimension without harsh contrast.`
                : "Flawless prep is 80% of the result. When the base canvas is hydrated and primed, the finish remains pristine for weeks."}
              &rdquo;
            </p>
            <span className="block mt-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              — RoopSetu Beauty Editorial Desk
            </span>
          </div>
        </section>

        {/* SECTION 2: SHOP THE PRODUCTS */}
        <section className="mb-14 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                What You&apos;ll Need
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mt-0.5">
                Shop The Recreate Kit
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Formulations verified by RoopSetu beauty editors for performance and longevity.
              </p>
            </div>

            {articleData.kitPrice && (
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-xs text-gray-500">Complete Kit:</span>
                <span className="text-base font-bold text-[#7A0B2E]">
                  {articleData.kitPrice}
                </span>
              </div>
            )}
          </div>

          {/* Product Cards Grid */}
          {productsList.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {productsList.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between rounded-xl bg-white border border-gray-200 p-3 hover:border-gray-400 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative aspect-square w-full rounded-lg bg-[#FAF7F2] overflow-hidden mb-2.5 p-2 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 220px"
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                      {product.tag && (
                        <span className="absolute top-1.5 left-1.5 rounded bg-gray-900/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {/* Brand */}
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E] truncate">
                      {product.brand}
                    </p>

                    {/* Product Name */}
                    <h3 className="mt-0.5 text-xs font-semibold text-gray-900 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Buy Button */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-gray-900">
                        {product.price}
                      </p>
                      <p className="text-[9px] text-gray-400">
                        on {product.platform || "Nykaa"}
                      </p>
                    </div>

                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-[#7A0B2E] hover:bg-[#960E39] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs transition-colors shrink-0"
                    >
                      <span>Shop</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-4">
              Products to recreate this look will be listed shortly.
            </p>
          )}

          {/* Buy All Bundle Banner */}
          <div className="mt-6 p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3DC] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Want to buy the whole set in one place?
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                All {productsList.length} verified products for this look • Est. {articleData.kitPrice || "₹1,499"}
              </p>
            </div>
            <a
              href="https://www.nykaa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#7A0B2E] hover:bg-[#960E39] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition-all"
            >
              <ShoppingBag size={14} /> Shop All on Nykaa
            </a>
          </div>
        </section>

        {/* SECTION 3: STEP-BY-STEP TUTORIAL */}
        <section className="mb-14 pt-8 border-t border-gray-200">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E]">
              Easy Application Guide
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mt-0.5">
              How To Recreate The Look: Step-by-Step
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Follow these simple steps for durable high-gloss results at home.
            </p>
          </div>

          {articleData.steps && articleData.steps.length > 0 ? (
            <div className="space-y-8">
              {articleData.steps.map((step, index) => (
                <div
                  key={step.id || index}
                  className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7A0B2E] text-white font-bold text-xs">
                        {step.id || `0${index + 1}`}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-gray-900">
                        {step.title}
                      </h3>
                    </div>

                    {step.time && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                        <Clock size={11} /> {step.time}
                      </span>
                    )}
                  </div>

                  {/* Step Visual & Instructions */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    {step.image && (
                      <div className="md:col-span-5 relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className={step.image ? "md:col-span-7 space-y-3" : "md:col-span-12 space-y-3"}>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Pro Tip Box */}
                      {step.proTip && (
                        <div className="rounded-lg border-l-4 border-[#7A0B2E] bg-[#FFF5F7] p-3 text-xs sm:text-sm text-gray-800">
                          <p className="font-semibold text-[#7A0B2E] flex items-center gap-1 mb-0.5">
                            <Sparkles size={13} /> Editorial Pro Tip:
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            {step.proTip}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 py-4">
              Step-by-step instructions available in the Beauty Guide feed.
            </p>
          )}
        </section>

        {/* SECTION 4: UNDERTONE & LONGEVITY SECRETS */}
        <section className="mb-14 pt-8 border-t border-gray-200">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E]">
              Pro Knowledge
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mt-0.5">
              Undertone Harmony &amp; Longevity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Undertone Suitability */}
            <div className="rounded-xl bg-[#FAF7F2] p-5 border border-[#EAE3DC] space-y-2">
              <div className="flex items-center gap-2 text-[#7A0B2E]">
                <CheckCircle2 size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Undertone Compatibility
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {articleData.skinToneSuitability ||
                  "Engineered specifically for warm golden, honey, and olive South Asian complexions. The warm undertones prevent ashy cast under flash photography."}
              </p>
            </div>

            {/* Retention Secret */}
            <div className="rounded-xl bg-[#FAF7F2] p-5 border border-[#EAE3DC] space-y-2">
              <div className="flex items-center gap-2 text-[#7A0B2E]">
                <ShieldCheck size={16} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                  Application Retention Secret
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {articleData.longevityTip ||
                  "Take extra time on the prep and dehydration step. Eliminating surface oils ensures up to 3 weeks of durable high-gloss retention without lifting or chipping."}
              </p>
            </div>
          </div>

          {/* Key Tools Pills */}
          {articleData.keyTools && articleData.keyTools.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 mr-1">
                <Wrench size={13} className="text-[#7A0B2E]" /> Key Tools Needed:
              </span>
              {articleData.keyTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-white border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700"
                >
                  ✦ {tool}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 5: RELATED MASTERCLASSES */}
        {relatedLooks.length > 0 && (
          <section className="mb-14 pt-8 border-t border-gray-200">
            <div className="flex items-end justify-between gap-3 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                  Continue Exploring
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight mt-0.5">
                  Related {parentCategory?.label || "Beauty"} Masterclasses
                </h2>
              </div>
              <Link
                href="/beauty-guide"
                className="text-xs font-bold text-[#7A0B2E] hover:underline inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {relatedLooks.map((look) => (
                <Link
                  key={look.id}
                  href={`/articles/${look.id}`}
                  className="group flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={look.image}
                      alt={look.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="rounded bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        {look.tag || "Trending"}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif text-xs sm:text-sm font-medium text-gray-900 group-hover:text-[#7A0B2E] transition-colors line-clamp-2">
                      {look.title || look.alt}
                    </h3>
                    <p className="mt-2 text-[11px] font-bold text-[#7A0B2E]">
                      Kit: {look.kitPrice || "₹1,499"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: BEAUTY GUIDE HUB BRIDGE */}
        <div className="rounded-2xl bg-[#FAF7F2] border border-[#EAE3DC] p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
              RoopSetu Beauty Guide
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-gray-900 mt-1">
              Explore 30+ Complete Masterclasses
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
              Find step-by-step DIY techniques, verified drugstore product dupes, and undertone guides across Nails, Hair, Makeup, and Bridal.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/beauty-guide"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] hover:bg-[#960E39] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow transition-all"
            >
              <ArrowLeft size={13} />
              <span>Back to Beauty Guide</span>
            </Link>
          </div>
        </div>
      </article>

      {/* MOBILE STICKY BOTTOM SHOPPING BAR */}
      <aside
        aria-label="Mobile kit buy bar"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3"
      >
        <div className="min-w-0">
          <p className="text-[10px] uppercase font-bold text-gray-400 truncate">
            Recreate Kit
          </p>
          <p className="text-sm font-bold text-[#7A0B2E]">
            {articleData.kitPrice || "₹1,499"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs transition-colors shrink-0 ${
              isSaved
                ? "border-[#7A0B2E] bg-[#FFF0F5] text-[#7A0B2E]"
                : "border-gray-200 bg-white text-gray-700"
            }`}
            title="Save Look"
          >
            <Heart
              size={15}
              fill={isSaved ? "#7A0B2E" : "none"}
              className={isSaved ? "text-[#7A0B2E]" : ""}
            />
          </button>

          <a
            href="https://www.nykaa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#7A0B2E] hover:bg-[#960E39] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow transition-all"
          >
            <ShoppingBag size={13} />
            <span>Shop Kit</span>
          </a>
        </div>
      </aside>

      <LuxuryFooter />
    </main>
  );
}
