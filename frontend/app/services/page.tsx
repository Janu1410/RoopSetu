import type { Metadata } from "next";
import Navbar from "@/components/home/Navbar/Navbar";
import ServicesLookbook from "@/components/home/ServicesLookbook";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export const metadata: Metadata = {
  title: "Luxury Beauty Services | RoopSetu — Bridal, Makeup, Hair & Nails",
  description:
    "Explore RoopSetu's curated beauty services delivered by verified artists: Bridal & Festive transformations, expressive makeup, hair artistry, and couture nail art.",
  openGraph: {
    title: "RoopSetu Luxury Services — Hand-Verified Beauty Professionals",
    description:
      "Explore curated luxury bridal, makeup, hairstyle, and nail art services with verified artists and transparent pricing.",
    images: ["/images/hero/desktop/her-30.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230] flex flex-col">
      <Navbar />
      <ServicesLookbook />
      <LuxuryFooter />
    </main>
  );
}
