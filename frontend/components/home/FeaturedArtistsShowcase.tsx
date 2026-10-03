"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import {
  Star,
  ShieldCheck,
  MapPin,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Award,
  CheckCircle2,
  CalendarCheck,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Artist = {
  id: string;
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
  badges: string[];
};

const FEATURED_ARTISTS: Artist[] = [
  {
    id: "aashi-patel",
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
    speciality: "Royal Gujarati Bridal, 16-Hour Sweatproof Airbrush & Kundan Floral Hair",
    tags: ["Airbrush HD", "Gujarati Bride", "Kundan Hair"],
    badges: ["Top Rated 2026", "Gold Verified"],
  },
  {
    id: "meera-vora",
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
    speciality: "Triple-Sifted Organic Sojat Henna, Micro-Portraits & Dark Stain Guarantee",
    tags: ["Organic Henna", "Portrait Motifs", "Dark Stain"],
    badges: ["Organic Certified", "Gold Verified"],
  },
  {
    id: "drishti-tanvi",
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
    speciality: "Floral Mughal Braids, Double-Dupatta Pinning & Sculpted Saree Silhouettes",
    tags: ["Floral Braids", "Dupatta Draping", "Saree Sculpting"],
    badges: ["Draping Master", "Gold Verified"],
  },
  {
    id: "kavita-desai",
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
    speciality: "Soft Dewy Reception Glam, Sabyasachi Aesthetic & International Vanity Kit",
    tags: ["Dewy Reception", "Charlotte Tilbury", "MAC HD"],
    badges: ["Celebrity Pick", "Gold Verified"],
  },
  {
    id: "riddhi-panchal",
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
    speciality: "Bridal Chrome, Handcrafted 3D Floral Embellishments & Russian Gel Extensions",
    tags: ["Bridal Extensions", "24K Gold Chrome", "Swarovski Art"],
    badges: ["Gel Specialist", "Gold Verified"],
  },
  {
    id: "pooja-rathod",
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
    speciality: "Can-Can Volume Skirting, Seedha Pallu Traditional Drapes & 10-Min Fast Pinning",
    tags: ["Seedha Pallu", "Can-Can Volume", "Fast Pinning"],
    badges: ["Fast Pinning", "Gold Verified"],
  },
];

const CATEGORIES = [
  "All Specialities",
  "Bridal & HD Glam",
  "Organic Mehendi",
  "Haute Hair & Draping",
  "Luxury Nails",
] as const;

const CITIES = ["All Gujarat", "Ahmedabad", "Surat", "Vadodara"] as const;

export default function FeaturedArtistsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Specialities");
  const [selectedCity, setSelectedCity] = useState<string>("All Gujarat");

  const filteredArtists = useMemo(() => {
    return FEATURED_ARTISTS.filter((artist) => {
      const matchCategory =
        selectedCategory === "All Specialities" || artist.category === selectedCategory;
      const matchCity = selectedCity === "All Gujarat" || artist.city === selectedCity;
      return matchCategory && matchCity;
    });
  }, [selectedCategory, selectedCity]);

  return (
    <section
      id="featured-artists"
      className="py-20 sm:py-28 bg-[#FFF8F3] relative overflow-hidden border-t border-[#F2E5DF]"
      aria-labelledby="featured-artists-heading"
    >
      {/* Decorative Warm Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#FCECE5]/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 -left-40 w-96 h-96 rounded-full bg-[#F6E5DB]/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EFD5DC] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#5A001F] shadow-xs mb-3.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span className="tracking-wide uppercase text-[0.7rem] font-bold">
                RoopSetu Verified Artisans Circle
              </span>
            </div>

            <h2
              id="featured-artists-heading"
              className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5A001F] tracking-tight leading-[1.15]`}
            >
              Gujarat’s Verified Artists,{" "}
              <span className="italic bg-gradient-to-r from-[#8A1238] via-[#A83250] to-[#C9933E] bg-clip-text text-transparent">
                Curated for Your Big Day.
              </span>
            </h2>

            <p className="mt-3.5 text-base text-[#6C5662] leading-relaxed">
              Explore authentic bridal portfolios, transparent starting rates, and direct WhatsApp
              inquiries with zero hidden commissions.
            </p>
          </div>

          {/* City Filter Tabs */}
          <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-white border border-[#EED9DF] shadow-xs self-start lg:self-end">
            {CITIES.map((city) => {
              const isActive = city === selectedCity;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-white" : "text-[#6C5662] hover:text-[#5A001F]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCityIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5A001F] to-[#7A0C2E] shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar">
          <div className="flex items-center gap-1.5 text-xs text-[#8A7480] pr-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="font-medium">Filter by:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isSelected = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? "bg-[#5A001F] text-white border-[#5A001F] shadow-xs"
                    : "bg-white text-[#6C5662] border-[#EADBD5] hover:border-[#5A001F] hover:text-[#5A001F]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Artists Grid Showcase */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#EED7DD]">
            <Sparkles className="w-8 h-8 text-[#C9933E] mx-auto mb-3" />
            <h3 className={`${playfair.className} text-xl font-bold text-[#5A001F]`}>
              No verified artists found for this selection
            </h3>
            <p className="text-xs text-[#6C5662] mt-1 mb-4">
              Try switching your city or category filter to discover more verified talent.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All Specialities");
                setSelectedCity("All Gujarat");
              }}
              className="px-4 py-2 rounded-xl bg-[#5A001F] text-white text-xs font-bold hover:bg-[#7A0C2E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredArtists.map((artist, idx) => (
                <motion.article
                  layout
                  key={artist.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group flex flex-col justify-between rounded-3xl bg-white border border-[#EFE4DE] shadow-[0_12px_32px_rgba(90,0,31,0.04)] hover:shadow-[0_22px_50px_-10px_rgba(90,0,31,0.13)] hover:border-[#D4AF37]/60 transition-all duration-300 overflow-hidden"
                >
                  <div>
                    {/* Visual Portfolio Frame */}
                    <div className="relative h-64 sm:h-68 w-full overflow-hidden bg-[#24131C]">
                      <Image
                        src={artist.portfolioImage}
                        alt={`${artist.name} portfolio showcase`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C0913]/90 via-[#1C0913]/25 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.72rem] font-bold text-[#5A001F] shadow-sm backdrop-blur-md">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>RoopSetu Verified</span>
                        </span>

                        <span className="inline-flex items-center rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] font-medium text-white/90 backdrop-blur-md border border-white/20">
                          {artist.workType}
                        </span>
                      </div>

                      {/* Image Bottom Bar with Category & Starting Price */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white z-10">
                        <div>
                          <span className="text-[0.7rem] uppercase tracking-wider text-[#FFD4DF] font-semibold block">
                            {artist.category}
                          </span>
                          <span className="text-xs font-semibold text-white/90">
                            {artist.experienceYears} Years Active
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-[0.68rem] text-white/70 block">Starts from</span>
                          <span className="text-sm font-bold text-white bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-md inline-block">
                            ₹{artist.startingPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Artist Details Card Body */}
                    <div className="p-6">
                      {/* Avatar + Name + Business */}
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="relative h-13 w-13 shrink-0 rounded-full overflow-hidden border-2 border-[#EED7DD] shadow-xs bg-[#FAF5F0]">
                          <Image
                            src={artist.avatarImage}
                            alt={artist.name}
                            fill
                            sizes="52px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={`${playfair.className} text-xl font-bold text-[#2D2230] truncate group-hover:text-[#5A001F] transition-colors`}
                          >
                            {artist.name}
                          </h3>
                          <p className="text-xs text-[#7E6976] truncate font-medium">
                            {artist.businessName}
                          </p>
                        </div>
                      </div>

                      {/* Location & Rating Ribbon */}
                      <div className="flex items-center justify-between text-xs text-[#6C5662] mb-3.5 pb-3 border-b border-[#F4EBE6]">
                        <div className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#8A1238]" />
                          <span>
                            {artist.area}, {artist.city}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                          <span className="font-bold text-[#2D2230]">{artist.rating}</span>
                          <span className="text-[#8C7A84]">({artist.reviewCount} reviews)</span>
                        </div>
                      </div>

                      {/* Speciality Highlight */}
                      <p className="text-xs text-[#523F50] leading-relaxed mb-4 line-clamp-2">
                        ✦ {artist.speciality}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {artist.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg text-[0.7rem] font-semibold bg-[#FFF5F8] text-[#8A1238] border border-[#FADCE4]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-6 pt-0 flex items-center gap-2.5">
                    <Link
                      href={`/services?artist=${artist.id}`}
                      className="flex-1 text-center py-2.5 px-3 rounded-xl border border-[#DECBC5] text-xs font-bold text-[#2D2230] hover:bg-[#FFF7F3] hover:border-[#5A001F] hover:text-[#5A001F] transition-colors"
                    >
                      View Rate Card
                    </Link>

                    <a
                      href={`https://wa.me/919999999999?text=${encodeURIComponent(
                        `Hi ${artist.name}, I discovered your verified bridal work on RoopSetu (${artist.category} in ${artist.city}) and would love to check your availability for an upcoming celebration.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all shadow-xs cursor-pointer active:scale-95 font-semibold text-xs"
                      aria-label={`Inquire with ${artist.name} on WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Verified Assurance Ribbon (4 Pillars of RoopSetu Artists) */}
        <div className="mt-16 pt-10 border-t border-[#F0E2DC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EFE3DD] shadow-xs">
            <div className="p-2 rounded-xl bg-[#FFF5F8] text-[#5A001F] shrink-0 border border-[#FCDFE7]">
              <ShieldCheck className="w-5 h-5 text-[#8A1238]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2D2230]">100% Verified Identity</h4>
              <p className="text-[0.72rem] text-[#6C5662] mt-0.5 leading-snug">
                Every artist passes hands-on portfolio verification & background audits.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EFE3DD] shadow-xs">
            <div className="p-2 rounded-xl bg-[#FFF9EE] text-[#C9933E] shrink-0 border border-[#FBEEC9]">
              <Sparkles className="w-5 h-5 text-[#C9933E]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2D2230]">Vanity Hygiene Standards</h4>
              <p className="text-[0.72rem] text-[#6C5662] mt-0.5 leading-snug">
                Sanitized brushes, international branded kits & organic certified henna cones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EFE3DD] shadow-xs">
            <div className="p-2 rounded-xl bg-[#F0FAF4] text-[#1B3B2B] shrink-0 border border-[#CEEBD9]">
              <CheckCircle2 className="w-5 h-5 text-[#1B3B2B]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2D2230]">Direct WhatsApp Pricing</h4>
              <p className="text-[0.72rem] text-[#6C5662] mt-0.5 leading-snug">
                Zero commission markups. Pay authentic artist rates directly with transparency.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#EFE3DD] shadow-xs">
            <div className="p-2 rounded-xl bg-[#F7F2FA] text-[#5A001F] shrink-0 border border-[#EDDCF3]">
              <CalendarCheck className="w-5 h-5 text-[#5A001F]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#2D2230]">Studio & Doorstep Ready</h4>
              <p className="text-[0.72rem] text-[#6C5662] mt-0.5 leading-snug">
                Book home visits across Gujarat or visit private luxury artist studios.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#FAF2EC] via-[#FFF8F3] to-[#F7EDE5] border border-[#ECD9D0] text-center shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className={`${playfair.className} text-xl sm:text-2xl font-bold text-[#5A001F]`}>
              Are you an independent beauty or bridal artist in Gujarat?
            </h3>
            <p className="text-xs sm:text-sm text-[#6C5662] mt-1">
              Join RoopSetu’s verified collective. Get client inquiries directly with 0% commission.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/become-partner"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5A001F] px-6 py-3 text-xs font-bold text-white hover:bg-[#7A0C2E] transition-all shadow-sm"
            >
              <span>Apply to Join</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-[#D5C2BC] text-xs font-bold text-[#5A001F] hover:bg-white transition-all"
            >
              Browse All Artists
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FeaturedArtistsShowcase };
