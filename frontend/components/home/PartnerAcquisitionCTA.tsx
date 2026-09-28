"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const benefits = [
  {
    icon: ShieldCheck,
    title: "Gold Verified Shield",
    description: "Build immediate trust with brides looking for real, certified talent.",
  },
  {
    icon: Zap,
    title: "Direct WhatsApp Client Leads",
    description: "Inquiries go straight to your personal WhatsApp without third-party delay.",
  },
  {
    icon: TrendingUp,
    title: "0% Commission on Bookings",
    description: "Keep 100% of your earnings. No platform cut or hidden commission fees.",
  },
  {
    icon: Users,
    title: "Your Rates & Your Schedule",
    description: "Full control over your rate cards, at-home travel radius, and salon slots.",
  },
];

export default function PartnerAcquisitionCTA() {
  return (
    <section className="relative py-20 sm:py-24 bg-gradient-to-br from-[#4A0019] via-[#5F0723] to-[#7B1235] text-white overflow-hidden">
      {/* Floating Silk Ambient Auras */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#D4AF37]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#8A1238]/40 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#FFD2DD] backdrop-blur-md mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>For Makeup Artists, Mehendi Masters & Salon Owners</span>
            </div>

            <h2
              className={`${playfair.className} text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-white mb-6`}
            >
              Scale Your Beauty Business With{" "}
              <span className="italic text-[#D4AF37]">Zero Commission</span>
            </h2>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-10">
              Showcase your genuine bridal and festive transformations directly to high-intent clients across Gujarat & Mumbai. Never pay a percentage on the bookings you earn.
            </p>

            {/* 4 Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[#D4AF37]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Onboarding Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md rounded-3xl bg-white/10 p-7 sm:p-9 backdrop-blur-xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#FFD2DD] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>5-Minute Onboarding</span>
              </div>

              <h3 className={`${playfair.className} text-2xl sm:text-3xl font-bold text-white mb-3`}>
                Join 150+ Top Gujarat Artists
              </h3>

              <p className="text-xs text-white/80 leading-relaxed mb-6">
                Create your digital portfolio, publish your rate cards, and begin receiving verified bride inquiries directly to your WhatsApp today.
              </p>

              {/* 3 Step Indicator */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs text-white/90">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white font-bold text-[0.7rem]">
                    1
                  </span>
                  <span>Register with your phone number (2 mins)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/90">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white font-bold text-[0.7rem]">
                    2
                  </span>
                  <span>Upload portfolio photos & set rate cards</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/90">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]/30 text-[#25D366] font-bold text-[0.7rem]">
                    ✓
                  </span>
                  <span>Get verified & receive direct inquiries</span>
                </div>
              </div>

              <Link
                href="/become-beautician"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 px-6 text-sm font-bold text-[#5A001F] hover:bg-[#FFF2F5] transition-all shadow-xl hover:shadow-2xl group cursor-pointer active:scale-98"
              >
                <span>Register as a Beautician</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <p className="text-center text-[0.7rem] text-white/60 mt-4">
                No credit card required • Instant account activation
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { PartnerAcquisitionCTA };
