"use client";

import Navbar from "@/components/home/Navbar/Navbar";
import Hero from "@/components/home/Hero";
import CorePillarsSection from "@/components/home/CorePillarsSection";
import CategoryOccasionGrid from "@/components/home/CategoryOccasionGrid";
import FeaturedArtistsShowcase from "@/components/home/FeaturedArtistsShowcase";
import PartnerAcquisitionCTA from "@/components/home/PartnerAcquisitionCTA";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230] flex flex-col">
      <Navbar />
      <Hero />
      <CorePillarsSection />
      <CategoryOccasionGrid />
      <FeaturedArtistsShowcase />
      <PartnerAcquisitionCTA />
      <LuxuryFooter />
    </main>
  );
}
