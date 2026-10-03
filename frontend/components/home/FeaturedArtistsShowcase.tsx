"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import {
  Sparkles,
  ArrowUpRight,
  MapPin,
  Star,
  MessageCircle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

type Artist = {
  id: string;
  collectionIndex: string;
  name: string;
  businessName: string;
  category: "Bridal & HD Glam" | "Organic Mehendi" | "Haute Hair & Draping" | "Luxury Nails";
  workType: string;
  area: string;
  city: "Ahmedabad" | "Surat" | "Vadodara";
  experienceYears: number;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  portfolioImage: string;
  avatarImage: string;
  speciality: string;
  tags: string[];
};

const FEATURED_ARTISTS: Artist[] = [
  {
    id: "aashi-patel",
    collectionIndex: "01",
    name: "Aashi Patel",
    businessName: "Aashi Bridal Couture Studio",
    category: "Bridal & HD Glam",
    workType: "Studio & Doorstep",
    area: "Satellite",
    city: "Ahmedabad",
    experienceYears: 8,
    rating: 4.97,
    reviewCount: 54,
    startingPrice: 5500,
    portfolioImage: "/images/makeup/mak-14.jpg",
    avatarImage: "/images/hero/desktop/her-30.jpg",
    speciality: "Royal Gujarati bridal with 16-hour sweatproof airbrush finish and authentic Kundan hair styling.",
    tags: ["AIRBRUSH HD", "GUJARATI BRIDE", "KUNDAN HAIR"],
  },
  {
    id: "meera-vora",
    collectionIndex: "02",
    name: "Meera Vora",
    businessName: "Meera Henna & Bridal Atelier",
    category: "Organic Mehendi",
    workType: "Doorstep Specialist",
    area: "Ghod Dod Road",
    city: "Surat",
    experienceYears: 9,
    rating: 5.0,
    reviewCount: 62,
    startingPrice: 3500,
    portfolioImage: "/images/hero/desktop/mehndi-generated.jpg",
    avatarImage: "/images/hero/desktop/her-31.jpg",
    speciality: "Triple-sifted organic Sojat henna, bespoke wedding narrative portraits, and deep mahogany stain guarantee.",
    tags: ["ORGANIC SOJAT", "STORY PORTRAITS", "DARK STAIN"],
  },
  {
    id: "drishti-tanvi",
    collectionIndex: "03",
    name: "Drishti & Tanvi Shah",
    businessName: "The Glam Atelier",
    category: "Haute Hair & Draping",
    workType: "Studio & Venue",
    area: "Alkapuri",
    city: "Vadodara",
    experienceYears: 7,
    rating: 4.94,
    reviewCount: 39,
    startingPrice: 3800,
    portfolioImage: "/images/hair/hai-22.jpg",
    avatarImage: "/images/hero/desktop/her-32.jpg",
    speciality: "Floral Mughal braided crowns, double-dupatta royal pinning, and structured seedha pallu silhouettes.",
    tags: ["MUGHAL BRAIDS", "DUPATTA PINNING", "SEEDHA PALLU"],
  },
  {
    id: "kavita-desai",
    collectionIndex: "04",
    name: "Kavita Desai",
    businessName: "Kavita Signature Beauty",
    category: "Bridal & HD Glam",
    workType: "Venue & Doorstep",
    area: "Bodakdev",
    city: "Ahmedabad",
    experienceYears: 10,
    rating: 4.98,
    reviewCount: 71,
    startingPrice: 6000,
    portfolioImage: "/images/makeup/mak-12.jpg",
    avatarImage: "/images/hero/desktop/her-33.jpg",
    speciality: "Luminous reception glam, glass-skin base prep, and curated international luxury kits.",
    tags: ["DEWY RECEPTION", "MAC & CHARLOTTE", "GLASS SKIN"],
  },
  {
    id: "riddhi-panchal",
    collectionIndex: "05",
    name: "Riddhi Panchal",
    businessName: "The Nail Sanctuary",
    category: "Luxury Nails",
    workType: "Private Studio",
    area: "City Light",
    city: "Surat",
    experienceYears: 6,
    rating: 4.92,
    reviewCount: 44,
    startingPrice: 2200,
    portfolioImage: "/images/nails/nai-7.jpg",
    avatarImage: "/images/hero/desktop/her-34.jpg",
    speciality: "Bridal 24K gold chrome, handcrafted micro-embellishments, and long-wear Russian gel overlays.",
    tags: ["BRIDAL CHROME", "24K ACCENTS", "GEL OVERLAYS"],
  },
  {
    id: "pooja-rathod",
    collectionIndex: "06",
    name: "Pooja Rathod",
    businessName: "Pooja Bridal Drapes",
    category: "Haute Hair & Draping",
    workType: "Doorstep Specialist",
    area: "Sindhu Bhavan",
    city: "Ahmedabad",
    experienceYears: 5,
    rating: 4.93,
    reviewCount: 35,
    startingPrice: 2500,
    portfolioImage: "/images/makeup/mak-18.jpg",
    avatarImage: "/images/hero/desktop/her-35.jpg",
    speciality: "Can-can volume styling, heritage Patola draping, and precision crease-free pinning in 10 minutes.",
    tags: ["PATOLA DRAPES", "CAN-CAN VOLUME", "FAST PINNING"],
  },
];

const CATEGORIES = [
  "All Artisans",
  "Bridal & HD Glam",
  "Organic Mehendi",
  "Haute Hair & Draping",
  "Luxury Nails",
] as const;

const CITIES = ["All Gujarat", "Ahmedabad", "Surat", "Vadodara"] as const;

export default function FeaturedArtistsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Artisans");
  const [selectedCity, setSelectedCity] = useState<string>("All Gujarat");

  const filteredArtists = useMemo(() => {
    return FEATURED_ARTISTS.filter((artist) => {
      const matchCategory =
        selectedCategory === "All Artisans" || artist.category === selectedCategory;
      const matchCity = selectedCity === "All Gujarat" || artist.city === selectedCity;
      return matchCategory && matchCity;
    });
  }, [selectedCategory, selectedCity]);

  return (
    <section
      id="featured-artists"
      aria-labelledby="featured-artists-heading"
      className="relative isolate overflow-hidden bg-[#FFF8F3] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28 border-t border-[#EAD9D7]"
    >
      {/* Background Watermark matching AboutSection aesthetic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-0 select-none font-serif text-[clamp(10rem,25vw,26rem)] font-semibold leading-none tracking-[-0.1em] text-[#8A1238]/[0.025]"
      >
        A.
      </div>

      <div className="relative mx-auto max-w-[1380px]">
        {/* Section Header matching RoopSetu's About & Core Pillars editorial grid */}
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-[700px]">
            <p className="mb-4 inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8A1238]">
              <span className="h-px w-8 bg-[#B88D43]" aria-hidden="true" />
              <Sparkles className="h-3.5 w-3.5 text-[#B88D43]" aria-hidden="true" />
              RoopSetu Verified Artisans
            </p>

            <h2
              id="featured-artists-heading"
              className={`${playfair.className} text-[clamp(2.3rem,4.5vw,3.8rem)] leading-[1.04] tracking-[-0.04em] text-[#34252D] [text-wrap:balance]`}
            >
              The hands behind the craft,
              <br />
              <span className="italic font-normal text-[#8A1238]">verified for your celebration.</span>
            </h2>
          </div>

          <div className="lg:justify-self-end max-w-[560px]">
            <p className="text-sm leading-7 text-[#64505A] sm:text-base sm:leading-8">
              Every artist in this circle is rigorously vetted for authentic bridal artistry, sanitized vanity protocols, and transparent pricing with zero platform markups.
            </p>

            {/* City Selection Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8A1238] mr-1">
                Region:
              </span>
              {CITIES.map((city) => {
                const isActive = city === selectedCity;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] rounded-[3px] transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#5A001F] text-[#FFF8F3]"
                        : "bg-[#FAF2EE] text-[#796C70] hover:text-[#5A001F] border border-[#E9DDD7]"
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minimalist Editorial Category Filter Bar */}
        <div className="mt-12 sm:mt-14 border-y border-[#EAD9D7] py-3.5 flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <span className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#8A1238] shrink-0">
            Speciality Edit:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 text-xs font-bold uppercase tracking-[0.14em] transition-colors relative py-1 cursor-pointer ${
                  isSelected ? "text-[#5A001F]" : "text-[#7B6A73] hover:text-[#5A001F]"
                }`}
              >
                {cat}
                {isSelected && (
                  <motion.div
                    layoutId="categoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B88D43]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Artist Grid */}
        <motion.div
          layout
          className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtists.map((artist, idx) => (
              <motion.article
                layout
                key={artist.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between bg-[#FFFDFB] rounded-[6px] border border-[#E7DCD5] hover:border-[#B88D43]/80 transition-all duration-300 overflow-hidden shadow-[0_8px_24px_rgba(45,13,26,0.04)]"
              >
                <div>
                  {/* Portfolio Image Frame */}
                  <div className="relative h-[270px] sm:h-[290px] w-full overflow-hidden bg-[#2E1822]">
                    <Image
                      src={artist.portfolioImage}
                      alt={`${artist.name} bridal portfolio`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F0712]/90 via-[#1F0712]/30 to-transparent" />

                    {/* Frame Top Accents */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.16em] bg-[#5A001F]/90 text-[#F4CF83] border border-[#F4CF83]/40 backdrop-blur-xs rounded-[3px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#F4CF83]" />
                        {artist.collectionIndex} · VERIFIED
                      </span>

                      <span className="px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.12em] bg-black/60 text-white/90 backdrop-blur-xs rounded-[3px] border border-white/15">
                        {artist.city}
                      </span>
                    </div>

                    {/* Frame Bottom Details */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white z-10">
                      <div>
                        <span className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#F0D699] block">
                          {artist.category}
                        </span>
                        <span className="text-xs text-white/85 font-medium">
                          {artist.experienceYears} Years in Craft
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[0.62rem] text-white/70 block uppercase tracking-wider">
                          Starts at
                        </span>
                        <span className="text-sm font-bold text-white tracking-tight">
                          ₹{artist.startingPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    {/* Stylist Profile Row */}
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border border-[#D4AF37]/60 bg-[#2E1822]">
                        <Image
                          src={artist.avatarImage}
                          alt={artist.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          className={`${playfair.className} text-xl font-bold text-[#2D2230] group-hover:text-[#8A1238] transition-colors truncate`}
                        >
                          {artist.name}
                        </h3>
                        <p className="text-xs text-[#7B6874] truncate">
                          {artist.businessName}
                        </p>
                      </div>
                    </div>

                    {/* Location & Verified Rating Line */}
                    <div className="flex items-center justify-between text-xs text-[#64505A] py-2.5 border-y border-[#EFE5E0] mb-3.5">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#8A1238]" />
                        <span>{artist.area}, {artist.city}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#B88D43] fill-[#B88D43]" />
                        <span className="font-bold text-[#34252D]">{artist.rating}</span>
                        <span className="text-[#8C7B85]">({artist.reviewCount})</span>
                      </div>
                    </div>

                    {/* Editorial Speciality Description */}
                    <p className={`${playfair.className} text-[0.88rem] italic text-[#54424D] leading-[1.6] mb-4 min-h-[44px]`}>
                      &ldquo;{artist.speciality}&rdquo;
                    </p>

                    {/* Refined Luxury Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {artist.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-[3px] text-[0.64rem] font-bold uppercase tracking-[0.14em] text-[#8A1238] bg-[#FAF2EF] border border-[#ECD9D2]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 sm:p-7 pt-0 flex items-center gap-3">
                  <Link
                    href={`/services?artist=${artist.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#5A001F] text-[#FFF8F3] hover:bg-[#8A1238] text-[0.72rem] font-bold uppercase tracking-[0.14em] rounded-[4px] transition-all duration-200"
                  >
                    <span>View Rate Card</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hi ${artist.name}, I discovered your verified bridal work on RoopSetu (${artist.category} in ${artist.city}) and would love to check your availability for an upcoming celebration.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-3.5 border border-[#8A1238]/30 bg-[#FAF5F0] hover:bg-[#8A1238] hover:text-[#FFF8F3] text-[#8A1238] text-[0.72rem] font-bold uppercase tracking-[0.14em] rounded-[4px] transition-all duration-200"
                    title={`Inquire with ${artist.name} on WhatsApp`}
                    aria-label={`Inquire with ${artist.name} on WhatsApp`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Inquire</span>
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 4 Pillars Trust Assurance Bar matching RoopSetu layout */}
        <div className="mt-16 pt-8 border-t border-[#EAD9D7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9C9C3] text-[#8A1238] shrink-0 mt-0.5">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#34252D]">
                100% Portfolio Audited
              </h4>
              <p className="text-xs text-[#64505A] mt-1 leading-relaxed">
                Authentic real bride photos verified by our editorial board.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9C9C3] text-[#8A1238] shrink-0 mt-0.5">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#34252D]">
                Sanitized Vanity Kits
              </h4>
              <p className="text-xs text-[#64505A] mt-1 leading-relaxed">
                International brands & triple-sanitized brush protocols.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9C9C3] text-[#8A1238] shrink-0 mt-0.5">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#34252D]">
                Direct Transparent Rates
              </h4>
              <p className="text-xs text-[#64505A] mt-1 leading-relaxed">
                Zero booking markups. Pay authentic artist prices directly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9C9C3] text-[#8A1238] shrink-0 mt-0.5">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-[#34252D]">
                Doorstep & Private Studios
              </h4>
              <p className="text-xs text-[#64505A] mt-1 leading-relaxed">
                Available at wedding venues, private suites, or client residences.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Callout matching AboutSection's action link */}
        <div className="mt-14 pt-8 border-t border-[#EAD9D7] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A1238]">
              Are you an independent beauty or bridal artist in Gujarat?
            </p>
            <p className="text-sm text-[#64505A] mt-1">
              Apply to join the verified RoopSetu collective. Direct client inquiries with zero platform commission.
            </p>
          </div>

          <Link
            href="/become-partner"
            className="premium-interactive inline-flex min-h-11 items-center gap-3 border-b border-[#8A1238]/40 pb-1 text-sm font-bold text-[#5A001F] transition-colors hover:border-[#5A001F] hover:text-[#8A1238]"
          >
            Apply for Verification
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] text-[#8A1238]">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export { FeaturedArtistsShowcase };
