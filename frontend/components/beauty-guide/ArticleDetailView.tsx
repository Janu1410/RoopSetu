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
} from "lucide-react";
import Navbar from "@/components/home/Navbar/Navbar";
import LuxuryFooter from "@/components/home/LuxuryFooter";
import type { LookItem, LookCategory, LookProduct } from "@/constants/beauty-data";

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

  const handlePinterestPin = () => {
    const currentOrigin =
      typeof window !== "undefined" ? window.location.origin : "https://roopsetu.com";
    const shareUrl = encodeURIComponent(`${currentOrigin}/articles/${articleData.id}`);
    const mediaUrl = encodeURIComponent(`${currentOrigin}${articleData.image}`);
    const desc = encodeURIComponent(
      `${articleData.title || articleData.alt} — Recreate this look with exact drugstore products or verified artists on RoopSetu.`
    );
    const pinUrl = `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${mediaUrl}&description=${desc}`;
    window.open(pinUrl, "_blank", "noopener,noreferrer,width=750,height=600");
  };

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
      `Hi RoopSetu! I'm planning my look for an upcoming wedding/event and love the "${articleData.title || articleData.alt}" from your Beauty Guide. Can you connect me with a verified specialist in Ahmedabad/Surat to recreate this?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const productsList: LookProduct[] = articleData.products || [
    {
      id: "p1",
      name: "Long-Wear Sheer Base Coat / Foundation",
      brand: "O.P.I / Pro Line",
      price: "₹850",
      originalPrice: "₹950",
      rating: 4.8,
      reviewsCount: 3120,
      image: "/images/products/opi.jpg",
      platform: "Nykaa",
      affiliateUrl: "https://www.nykaa.com",
      isHeroProduct: true,
    },
    {
      id: "p2",
      name: "Glass Shine Top Coat / Setting Mist",
      brand: "Beetles Beauty",
      price: "₹599",
      originalPrice: "₹799",
      rating: 4.7,
      reviewsCount: 1840,
      image: "/images/products/beetles.jpg",
      platform: "Amazon",
      affiliateUrl: "https://www.amazon.in",
    },
    {
      id: "p3",
      name: "High-Reflective Pigment Dust / Highlighter",
      brand: "Kodi Professional",
      price: "₹449",
      originalPrice: "₹550",
      rating: 4.9,
      reviewsCount: 940,
      image: "/images/products/kodi.jpg",
      platform: "Amazon",
      affiliateUrl: "https://www.amazon.in",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2B1B20]">
      <Navbar />

      {/* Top Header & Breadcrumb */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-[#FAF6F0] border-b border-[#EEDFD7]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              href="/beauty-guide"
              className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#6F6267] hover:text-[#7A0B2E] transition-colors"
            >
              <ArrowLeft size={15} />
              Back to Beauty Guide
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePinterestPin}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#E60023] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#c9001f]"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                Pin Look
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#EEDFD7] bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#2B1B20] hover:bg-[#FDF0F2] transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check size={13} className="text-emerald-600" /> Copied
                  </>
                ) : (
                  <>
                    <Share2 size={13} /> Share
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EEDFD7] bg-white text-[#2B1B20] hover:scale-105 transition-transform"
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

          {/* Editorial Title */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7A0B2E]">
                {parentCategory ? parentCategory.label : "Look Breakdown"}
              </span>
              {articleData.occasion && (
                <>
                  <span className="text-xs text-[#6F6267]">•</span>
                  <span className="text-[11px] font-semibold text-[#6F6267]">
                    {articleData.occasion}
                  </span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2B1B20] leading-[1.08]">
              {articleData.title || articleData.alt}
            </h1>

            <p className="mt-4 text-[15px] sm:text-[17px] text-[#6F6267] leading-relaxed">
              {articleData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Hero Photograph (Sticky on Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="relative aspect-[3/4] w-full rounded-[28px] overflow-hidden shadow-2xl border border-[#EEDFD7] bg-[#FDF0F2]">
                <Image
                  src={articleData.image}
                  alt={articleData.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                  style={{ objectPosition: articleData.objectPosition ?? "center" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#2B1B20] shadow-sm">
                    {articleData.tag || "Editorial Pick"}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 z-10 text-white flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFD6A5]">
                      {articleData.savesCount || "100k+ Pinterest Saves"}
                    </p>
                    <p className="text-[12px] text-white/80">
                      Difficulty: {articleData.difficulty || "Intermediate"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handlePinterestPin}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E60023] text-white shadow-lg hover:scale-110 transition-transform"
                    title="Pin this image"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Steps, Products & Artist Booking */}
            <div className="lg:col-span-7 space-y-10">
              {/* SECTION 1: PRO STEPS */}
              {articleData.steps && articleData.steps.length > 0 ? (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-[#7A0B2E]" />
                    <h2 className="font-serif text-2xl text-[#2B1B20]">
                      Step-by-Step Technique
                    </h2>
                  </div>

                  <div className="space-y-4">
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
                            sizes="140px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg font-medium text-[#2B1B20]">
                            {step.id}. {step.title}
                          </h3>
                          <p className="mt-1 text-[13px] text-[#6F6267] leading-relaxed">
                            {step.description}
                          </p>
                          {step.proTip && (
                            <p className="mt-2 text-[11px] font-semibold text-[#7A0B2E] bg-[#FDF0F2] px-2.5 py-1 rounded inline-block">
                              ✦ Pro Secret: {step.proTip}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* SECTION 2: SHOPPING ENGINE (AFFILIATE COMMISSIONS) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={16} className="text-[#7A0B2E]" />
                    <h2 className="font-serif text-2xl text-[#2B1B20]">
                      Shop The Exact Kit
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] bg-[#FDF0F2] px-3 py-1 rounded-full">
                    Verified Formulas
                  </span>
                </div>

                <div className="space-y-3">
                  {productsList.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 rounded-[20px] bg-white border border-[#EEDFD7] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#FDF0F2] shrink-0 border border-[#EEDFD7]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A0B2E]">
                            {product.brand}
                          </span>
                          <h4 className="font-serif text-[14px] sm:text-[15px] font-medium text-[#2B1B20] line-clamp-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[13px] font-bold text-[#2B1B20]">
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-[#8F7E84] line-through">
                                {product.originalPrice}
                              </span>
                            )}
                            <span className="flex items-center gap-0.5 text-[11px] text-[#C59B27] ml-1">
                              <Star size={11} fill="currentColor" /> {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#2B1B20] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#7A0B2E] transition-colors"
                      >
                        Buy on {product.platform}
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}

                  {/* Complete DIY Kit Bundle Box */}
                  <div className="p-4 sm:p-5 rounded-[22px] bg-gradient-to-r from-[#7A0B2E] to-[#960E39] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
                        1-Click DIY Kit
                      </span>
                      <h4 className="font-serif text-lg font-medium text-white">
                        Full Recreate Kit with Free Applicator
                      </h4>
                      <p className="text-[12px] text-white/80">
                        All verified shades &amp; coats shipped together.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">
                        {articleData.kitPrice || "₹1,898"}
                      </span>
                      <a
                        href="https://www.amazon.in"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="rounded-full bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-[#7A0B2E] hover:bg-[#FFE5D0] transition-colors shadow"
                      >
                        Order Kit
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: RECREATE WITH A VERIFIED ARTIST */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-[#7A0B2E]" />
                  <h2 className="font-serif text-2xl text-[#2B1B20]">
                    Recreate With A Verified Artist
                  </h2>
                </div>

                <div className="p-6 rounded-[24px] bg-white border border-[#EEDFD7] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-2">
                        <ShieldCheck size={12} /> RoopSetu Verified Professional
                      </span>
                      <h3 className="font-serif text-2xl font-medium text-[#2B1B20]">
                        {articleData.artistRecommendation?.name || "Priya Sharma"}
                      </h3>
                      <p className="text-[13px] text-[#6F6267]">
                        {articleData.artistRecommendation?.speciality ||
                          "Senior Bridal & Occasion Specialist"}
                      </p>
                      <p className="text-[12px] text-[#8F7E84] mt-1">
                        Available in: {articleData.artistRecommendation?.city || "Ahmedabad & Surat"} (Doorstep &amp; Studio)
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#C59B27] bg-[#FFF8E7] px-2.5 py-1 rounded-md">
                        <Star size={13} fill="currentColor" />{" "}
                        {articleData.artistRecommendation?.rating || 4.9}
                      </span>
                      <p className="text-[11px] text-[#8F7E84] mt-1">
                        {articleData.artistRecommendation?.reviews || 140}+ verified bookings
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-[#EEDFD7]">
                    <p className="text-[13px] text-[#6F6267] leading-relaxed mb-4">
                      Planning a wedding, sangeet, or festival celebration? Book our verified local artist to recreate &quot;
                      <span className="font-medium text-[#2B1B20]">
                        {articleData.title || articleData.alt}
                      </span>
                      &quot; directly at your doorstep with professional-grade longevity.
                    </p>

                    <button
                      type="button"
                      onClick={handleWhatsAppBooking}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-[12px] font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#1EBE5B] transition-colors"
                    >
                      Book on WhatsApp (Instant Availability Check)
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Footer Integration */}
      <LuxuryFooter />
    </main>
  );
}
