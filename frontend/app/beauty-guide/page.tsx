import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar/Navbar";
import Hero from "@/components/beauty-guide/Hero";
import CategoryPillars from "@/components/beauty-guide/CategoryPillars";
import BeautyDiscovery from "@/components/beauty-guide/BeautyDiscovery";
import GetTheLook from "@/components/beauty-guide/GetTheLook";
import ViralMoodboards from "@/components/beauty-guide/ViralMoodboards";
import SeasonalLookbookBanner from "@/components/beauty-guide/SeasonalLookbookBanner";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export const metadata: Metadata = {
  title: "The Editorial Beauty Guide | RoopSetu — Viral Trends, Shoppable Kits & Verified Artists",
  description:
    "Curated beauty inspiration from our 1,000,000+ Pinterest community. Discover step-by-step masterclasses, drugstore product kits, and hand-verified local artists in Ahmedabad and Surat.",
  openGraph: {
    title: "RoopSetu Beauty Guide — Viral Trends & Shoppable Kits",
    description:
      "Explore 30+ curated looks, 3-step masterclasses, and verified local artists to recreate your dream look.",
    images: ["/images/nails/nai-10.jpg"],
  },
};

export default function BeautyGuidePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
      <Navbar />
      <Hero />
      <CategoryPillars />
      <BeautyDiscovery />
      <GetTheLook />
      <ViralMoodboards />
      <SeasonalLookbookBanner />
      <LuxuryFooter />
    </main>
  );
}
