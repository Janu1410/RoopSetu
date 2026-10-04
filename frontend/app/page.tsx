"use client";

import Navbar from "@/components/home/Navbar/Navbar";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import EditorialBeautySection from "@/components/home/EditorialBeautySection";
import CorePillarsSection from "@/components/home/CorePillarsSection";
import ServicesPlansSection from "@/components/home/ServicesPlansSection";
import BeautyMomentsMarquee from "@/components/home/BeautyMomentsMarquee";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230] flex flex-col">
      <Navbar />
      <Hero />
      <AboutSection />
      <EditorialBeautySection />
      <CorePillarsSection />
      <ServicesPlansSection />
      <BeautyMomentsMarquee />
      <LuxuryFooter />
    </main>
  );
}
