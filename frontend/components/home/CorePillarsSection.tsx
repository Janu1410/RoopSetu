"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  BookOpen,
  CheckCircle2,
  Bell,
  Star,
  Clock,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type Pillar = {
  id: string;
  badge: string;
  badgeColor: string;
  icon: typeof Sparkles;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
  tag: string;
};

const pillars: Pillar[] = [
  {
    id: "beauticians",
    badge: "LIVE NOW",
    badgeColor: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    icon: Sparkles,
    iconBg: "bg-[#FCE8ED]",
    iconColor: "text-[#8A1238]",
    title: "Hand-Verified Beauticians",
    subtitle: "At-Home & Studio Appointments",
    description:
      "Connect directly with curated bridal makeup artists, mehendi masters, and festive hair stylists. Transparent pricing menus and zero booking commission.",
    features: [
      "100% Verified portfolios & genuine bride reviews",
      "Direct WhatsApp inquiries with no middlemen",
      "Doorstep service or luxury studio bookings",
    ],
    cta: "Find Verified Artists",
    href: "/services",
    highlight: true,
    tag: "Most Popular Vertical",
  },
  {
    id: "rentals",
    badge: "COMING SOON",
    badgeColor: "bg-[#FFF4E5] text-[#B06000] border-[#FFE2B8]",
    icon: HeartHandshake,
    iconBg: "bg-[#FFF4E5]",
    iconColor: "text-[#B06000]",
    title: "Ethnic Wear & Jewelry Rentals",
    subtitle: "Navratri Chaniyas & Bridal Lehengas",
    description:
      "Wear authentic handcrafted Kutchi Chaniya Cholis, designer bridal couture, and royal Kundan/Polki jewelry at just 10% of retail price with verified security deposit protection.",
    features: [
      "Save 90% without hoarding single-use festive outfits",
      "Sanitized, tailored fit & doorstep delivery",
      "Curated sets matching your makeup style",
    ],
    cta: "Explore Rental Teaser",
    href: "/services",
    highlight: false,
    tag: "Launching Navratri 2026",
  },
  {
    id: "guide",
    badge: "EXPLORE LOOKS",
    badgeColor: "bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]",
    icon: BookOpen,
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#6B21A8]",
    title: "Beauty & Style Lookbook",
    subtitle: "Curated Trends & Editorial Guides",
    description:
      "Browse hand-curated festive makeup trends, Gujarati & Marwari bridal lookbooks, and step-by-step beauty routines. Match any editorial look directly to local artists.",
    features: [
      "Editorial inspiration for all 9 Navratri nights",
      "Product recommendations for sweat-resistant garba",
      "One-click 'Get This Look' artist attribution",
    ],
    cta: "Browse Beauty Guide",
    href: "/beauty-guide",
    highlight: false,
    tag: "Editorial Inspiration",
  },
];

export default function CorePillarsSection() {
  const [waitlistNotified, setWaitlistNotified] = useState(false);

  return (
    <section className="relative py-20 sm:py-24 bg-[#FFF8F3] overflow-hidden border-t border-[#F2E5E0]">
      {/* Ambient background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#D4AF37]/5 via-[#8A1238]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#EFD3DC] bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#8A1238] shadow-xs mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-[#8A1238]" />
            <span>The 3 Pillars of RoopSetu</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5A001F] tracking-tight`}
          >
            Your Complete Festive &{" "}
            <span className="italic bg-gradient-to-r from-[#8A1238] to-[#C9933E] bg-clip-text text-transparent">
              Wedding Bridge
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-[#6C5662] leading-relaxed"
          >
            We bridge the gap between discerning celebrants and hand-verified beauty professionals, regal attire, and timeless styling inspiration.
          </motion.p>
        </div>

        {/* 3 Interactive Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-8 transition-all duration-300 border ${
                  pillar.highlight
                    ? "border-[#E7B8C6] shadow-[0_20px_45px_-12px_rgba(90,0,31,0.14)] ring-2 ring-[#8A1238]/10"
                    : "border-[#EFE5E0] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] hover:border-[#D4AF37]/50 hover:shadow-[0_20px_40px_-12px_rgba(90,0,31,0.1)]"
                }`}
              >
                {/* Top Corner Ribbon / Tag */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.iconBg} ${pillar.iconColor} shadow-xs`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.72rem] font-bold tracking-wide uppercase border ${pillar.badgeColor}`}
                  >
                    {pillar.id === "beauticians" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#137333] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#137333]" />
                      </span>
                    )}
                    {pillar.badge}
                  </span>
                </div>

                {/* Card Header & Description */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A07080] mb-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>{pillar.tag}</span>
                  </div>

                  <h3
                    className={`${playfair.className} text-2xl font-bold text-[#2D2230] leading-snug mb-3`}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2.5 mb-8 border-t border-[#F5EBE6] pt-5">
                    {pillar.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#544152] font-medium leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#137333] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-[#F5EBE6]">
                  {pillar.id === "rentals" ? (
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B06000] hover:text-[#804600] transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setWaitlistNotified(true)}
                        className={`inline-flex items-center gap-1 text-[0.72rem] font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                          waitlistNotified
                            ? "bg-[#E6F4EA] text-[#137333]"
                            : "bg-[#FFF4E5] hover:bg-[#FFE8CC] text-[#B06000] border border-[#FFE2B8]"
                        }`}
                      >
                        <Bell className="w-3 h-3" />
                        <span>{waitlistNotified ? "Notified!" : "Notify Me"}</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={pillar.href}
                      className={`inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all group ${
                        pillar.highlight
                          ? "bg-gradient-to-r from-[#5A001F] to-[#8A1238] text-white shadow-sm hover:shadow-md"
                          : "bg-[#FFF5F8] text-[#8A1238] hover:bg-[#8A1238] hover:text-white"
                      }`}
                    >
                      <span>{pillar.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { CorePillarsSection };
