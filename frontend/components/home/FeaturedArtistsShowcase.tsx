"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { Star, ShieldCheck, MapPin, ArrowRight, MessageCircle, Sparkles, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Artist = {
  id: string;
  name: string;
  businessName: string;
  workType: string;
  area: string;
  city: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  primaryCategory: string;
  portfolioImage: string;
  avatarImage: string;
  speciality: string;
  tags: string[];
};

const SAMPLE_ARTISTS: Artist[] = [
  {
    id: "aashi-patel",
    name: "Aashi Patel",
    businessName: "Aashi Bridal Studio",
    workType: "Studio & At-Home",
    area: "Satellite",
    city: "Ahmedabad",
    experienceYears: 8,
    rating: 4.95,
    reviewCount: 42,
    startingPrice: 5500,
    primaryCategory: "HD Bridal Makeup",
    portfolioImage:
      "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    avatarImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    speciality: "Royal Gujarati Bridal & Airbrush",
    tags: ["Airbrush HD", "Gujarati Bride", "Kundan Hair"],
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    businessName: "Priya Makeovers",
    workType: "Freelance / Home Visit",
    area: "Bodakdev",
    city: "Ahmedabad",
    experienceYears: 6,
    rating: 4.88,
    reviewCount: 29,
    startingPrice: 4000,
    primaryCategory: "Bridal & Draping",
    portfolioImage:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80",
    avatarImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    speciality: "Double Dupatta Draping & Dewy Makeup",
    tags: ["Dewy Glam", "Dupatta Draping", "Haldi/Mehendi"],
  },
  {
    id: "meera-vora",
    name: "Meera Vora",
    businessName: "Meera Henna Artistry",
    workType: "Freelance",
    area: "Ghod Dod Road",
    city: "Surat",
    experienceYears: 9,
    rating: 5.0,
    reviewCount: 38,
    startingPrice: 3500,
    primaryCategory: "Mehendi Art",
    portfolioImage:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    avatarImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    speciality: "Organic Dark Stain & Portrait Henna",
    tags: ["Portrait Henna", "Organic Mehendi", "Arabic"],
  },
  {
    id: "drishi-shah",
    name: "Drishti Shah",
    businessName: "The Glam Atelier",
    workType: "Studio & Doorstep",
    area: "Alkapuri",
    city: "Vadodara",
    experienceYears: 7,
    rating: 4.92,
    reviewCount: 34,
    startingPrice: 4500,
    primaryCategory: "Navratri & Bridal",
    portfolioImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
    avatarImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    speciality: "Waterproof Garba Looks & Reception Glam",
    tags: ["Sweatproof Glam", "Floral Braid", "Cocktail"],
  },
  {
    id: "anjali-parmar",
    name: "Anjali Parmar",
    businessName: "Anjali Draping Studio",
    workType: "At-Home Specialist",
    area: "Vesu",
    city: "Surat",
    experienceYears: 5,
    rating: 4.85,
    reviewCount: 22,
    startingPrice: 2000,
    primaryCategory: "Saree & Safa Draping",
    portfolioImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    avatarImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    speciality: "Seedha Pallu & Bollywood Can-Can Draping",
    tags: ["Saree Draping", "Groom Safa", "Fast Pinning"],
  },
  {
    id: "pooja-mehta",
    name: "Pooja Mehta",
    businessName: "Pooja Bridal Art",
    workType: "Studio & Freelance",
    area: "Prahlad Nagar",
    city: "Ahmedabad",
    experienceYears: 10,
    rating: 4.96,
    reviewCount: 56,
    startingPrice: 6000,
    primaryCategory: "Luxury Bridal Couture",
    portfolioImage:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    avatarImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    speciality: "Celebrity Airbrush & Sabyasachi Look",
    tags: ["Celebrity Makeup", "Airbrush", "Bridal Squad"],
  },
];

const CITY_FILTERS = ["All Cities", "Ahmedabad", "Surat", "Vadodara"];

export default function FeaturedArtistsShowcase() {
  const [activeCity, setActiveCity] = useState("All Cities");

  const filteredArtists =
    activeCity === "All Cities"
      ? SAMPLE_ARTISTS
      : SAMPLE_ARTISTS.filter((a) => a.city === activeCity);

  return (
    <section className="py-20 sm:py-24 bg-[#FFF8F3] relative overflow-hidden border-t border-[#F2E5E0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EFD3DC] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#8A1238] shadow-xs mb-3">
              <ShieldCheck className="w-4 h-4 text-[#8A1238]" />
              <span>Hand-Verified Credentials Only</span>
            </div>

            <h2 className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5A001F] tracking-tight`}>
              Verified Artists in{" "}
              <span className="italic bg-gradient-to-r from-[#8A1238] to-[#C9933E] bg-clip-text text-transparent">
                Gujarat
              </span>
            </h2>

            <p className="mt-3 text-base text-[#6C5662] max-w-xl leading-relaxed">
              Explore real bridal portfolios, transparent rate cards, and direct WhatsApp consultations with zero platform markup.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#EED9DF] shadow-xs self-start lg:self-end">
            {CITY_FILTERS.map((city) => {
              const isActive = city === activeCity;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setActiveCity(city)}
                  className={`relative px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    isActive ? "text-white" : "text-[#6C5662] hover:text-[#5A001F]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeArtistCity"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#5A001F] to-[#8A1238] shadow-xs"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{city}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Artist Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredArtists.map((artist, idx) => (
              <motion.article
                layout
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-[#EFE5E0] shadow-[0_10px_30px_rgba(90,0,31,0.04)] hover:shadow-[0_20px_45px_-12px_rgba(90,0,31,0.14)] hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Top Image Portfolio Showcase */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#23151D]">
                    <Image
                      src={artist.portfolioImage}
                      alt={artist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Gold Shield Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.72rem] font-bold text-[#5A001F] shadow-sm backdrop-blur-md">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Gold Verified</span>
                      </span>
                    </div>

                    {/* Work Type Pill */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="inline-flex items-center rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] font-semibold text-white/90 backdrop-blur-md border border-white/20">
                        {artist.workType}
                      </span>
                    </div>

                    {/* Image Footer Info */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white z-10">
                      <span className="text-xs font-semibold text-[#FFD2DD]">
                        {artist.primaryCategory}
                      </span>
                      <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                        ₹{artist.startingPrice.toLocaleString("en-IN")} onwards
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden border-2 border-[#EED7DD] shadow-xs">
                        <Image
                          src={artist.avatarImage}
                          alt={artist.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`${playfair.className} text-xl font-bold text-[#2D2230] truncate group-hover:text-[#5A001F] transition-colors`}>
                          {artist.name}
                        </h3>
                        <p className="text-xs text-[#8C7A84] truncate">
                          {artist.businessName}
                        </p>
                      </div>
                    </div>

                    {/* Location & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#6C5662] mb-3 pb-3 border-b border-[#F5EBE6]">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8A1238]" />
                        <span>
                          {artist.area}, {artist.city}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="font-bold text-[#2D2230]">{artist.rating}</span>
                        <span className="text-[#8C7A84]">({artist.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#544152] font-medium leading-relaxed mb-4 line-clamp-2">
                      ✦ {artist.speciality}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {artist.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[0.68rem] font-semibold bg-[#FFF5F8] text-[#8A1238] border border-[#FADCE4]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-6 pt-0 flex items-center gap-2.5">
                  <Link
                    href={`/services?artist=${artist.id}`}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl border border-[#E0D0CC] text-xs font-bold text-[#2D2230] hover:bg-[#FFF8F3] hover:border-[#8A1238] transition-colors"
                  >
                    View Rate Cards
                  </Link>

                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hi ${artist.name}, I saw your verified bridal work on RoopSetu and would like to inquire about your availability.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all shadow-xs cursor-pointer active:scale-95"
                    aria-label="Inquire on WhatsApp"
                    title="Inquire directly on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8A1238] bg-white px-8 py-3.5 text-sm font-bold text-[#8A1238] hover:bg-[#8A1238] hover:text-white transition-all duration-200 shadow-sm group"
          >
            <span>Explore All 120+ Verified Artists in Gujarat</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { FeaturedArtistsShowcase };
