"use client";

import { useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Mail,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const CITIES = [
  { name: "Ahmedabad", areas: "Satellite, Bodakdev, SG Highway, Prahlad Nagar" },
  { name: "Surat", areas: "Ghod Dod Road, Vesu, Adajan, Piplod" },
  { name: "Vadodara", areas: "Alkapuri, Akota, Vasna, Gotri" },
  { name: "Rajkot", areas: "Kalawad Road, Yagnik Road, Amin Marg" },
  { name: "Mumbai", areas: "Juhu, Bandra, Andheri, Ghatkopar" },
];

export default function LuxuryFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#4A0018] via-[#380113] to-[#24000C] text-[#F5E6EC] border-t border-[#D4AF37]/35 overflow-hidden">
      {/* Ambient Silk Light Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-[#8A1238]/25 blur-[100px]" />

      {/* Top Pre-Footer Newsletter / Lookbook Strip */}
      <div className="border-b border-[#6E1632]/60 bg-black/15 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#5A001F]/60 px-3.5 py-1 text-xs font-semibold text-[#FFD2DD] mb-3 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>The RoopSetu Bridal & Festive Edit</span>
              </div>
              <h3 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-white tracking-tight`}>
                Curated Trends & Artist Spotlights, Weekly.
              </h3>
              <p className="mt-2 text-sm text-[#D8B4C0] max-w-xl">
                Get handpicked bridal lookbooks, Navratri beauty guides, and early access to designer rentals delivered to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-[#2E7D32]/25 border border-[#4CAF50]/40 p-4 text-center text-white"
                >
                  <p className="text-sm font-semibold flex items-center justify-center gap-2 text-[#A5D6A7]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Welcome to the RoopSetu Inner Circle!</span>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C49DA9]" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email for the Lookbook"
                      className="w-full rounded-xl bg-white/10 border border-[#85223E] pl-10 pr-4 py-3 text-sm text-white placeholder-[#C49DA9] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all backdrop-blur-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C29826] text-[#33000F] font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Directory */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#6E1632]/50">
          {/* Brand Bio Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <span className={`${playfair.className} text-3xl font-bold tracking-tight text-white group-hover:text-[#FFD2DD] transition-colors`}>
                RoopSetu
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#6C0024] text-[#FFD2DD] border border-[#A11B45] shadow-xs">
                ✦ Elegance
              </span>
            </Link>

            <p className="text-sm text-[#D8B4C0] leading-relaxed max-w-sm mb-6">
              RoopSetu (रूपसेतु – The Bridge of Elegance) is Gujarat & Mumbai’s premier festive beauty ecosystem. Connecting brides and celebrants with hand-verified artists, bridal attire, and curated lookbooks.
            </p>

            <div className="inline-flex items-center gap-2 rounded-xl bg-[#5A001F]/60 px-4 py-2.5 text-xs font-semibold text-[#FFD2DD] border border-[#85223E] shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Hand-Verified Artist Credentials</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/35 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] transition-colors"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Explore Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-[#E0C0CC] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Find Beauticians</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/beauty-guide"
                  className="text-[#E0C0CC] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Beauty Lookbook</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=festive"
                  className="text-[#E0C0CC] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Navratri Garba Glam</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=bridal"
                  className="text-[#E0C0CC] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Bridal Packages</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=mehendi"
                  className="text-[#E0C0CC] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#D4AF37]" />
                  <span>Bridal Mehendi Art</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Active Cities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CITIES.map((city) => (
                <li key={city.name}>
                  <Link
                    href={`/services?location=${encodeURIComponent(city.name)}`}
                    className="text-[#E0C0CC] hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <MapPin className="w-3 h-3 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                    <span>{city.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              For Artists
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/become-beautician"
                  className="text-[#FFD2DD] font-semibold hover:underline flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Join as Beautician</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[#E0C0CC] hover:text-white transition-colors"
                >
                  Partner Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/become-beautician/setup"
                  className="text-[#E0C0CC] hover:text-white transition-colors"
                >
                  Profile Setup Guide
                </Link>
              </li>
              <li className="pt-2">
                <div className="rounded-lg bg-[#5A001F]/50 p-2.5 border border-[#85223E] text-xs text-[#FFD2DD]">
                  <p className="font-bold text-white mb-0.5">0% Commission</p>
                  <p className="text-[0.7rem] text-[#D8B4C0]">Direct WhatsApp inquiries to your phone.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Love Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B892A0]">
          <p>© {new Date().getFullYear()} RoopSetu Technologies Private Limited. All rights reserved.</p>

          <div className="flex items-center gap-1.5 text-[#E0C0CC]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E74C3C] fill-[#E74C3C]" />
            <span>for Indian Weddings & Festive Celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { LuxuryFooter };
