import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar/Navbar";
import BeautyGuideHero from "@/components/beauty-guide/BeautyGuideHero";
import BeautyDiscovery from "@/components/beauty-guide/BeautyDiscovery";
import GetTheLook from "@/components/beauty-guide/GetTheLook";
import ViralMoodboards from "@/components/beauty-guide/ViralMoodboards";
import SeasonalLookbookBanner from "@/components/beauty-guide/SeasonalLookbookBanner";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export const metadata: Metadata = {
  title: "The Editorial Beauty Guide | RoopSetu — Masterclasses, Formulas & Shade Blueprints",
  description:
    "Curated beauty inspiration with step-by-step masterclasses, drugstore product kits, and South Asian skin-tone shade matrices.",
  openGraph: {
    title: "RoopSetu Beauty Guide — Masterclasses & Shoppable Kits",
    description:
      "Explore 30+ curated looks, 3-step masterclasses, and exact drugstore formulations to recreate your dream look.",
    images: ["/images/nails/nai-10.jpg"],
  },
};

export default function BeautyGuidePage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
      <Navbar />
      <BeautyGuideHero />
      <BeautyDiscovery />
      <GetTheLook />
      <ViralMoodboards />
      <SeasonalLookbookBanner />
      <LuxuryFooter />
    </main>
  );
}
