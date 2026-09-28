"use client";

import { useState } from "react";
import { Download, CheckCircle2, Sparkles, ArrowRight, Mail } from "lucide-react";

export default function SeasonalLookbookBanner() {
  const [contactValue, setContactValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactValue.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] py-16 sm:py-20 border-y border-[#EEDFD7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#4D071E] via-[#630A27] to-[#800D32] p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#FFD6A5]/10 blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#FFD6A5] backdrop-blur-md mb-4 border border-white/15">
                <Sparkles size={12} />
                Free Digital Lookbook • 2026 Edition
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                The 2026 Festive &amp; Bridal Beauty Playbook
              </h2>

              <p className="mt-3 text-[14px] sm:text-[16px] text-white/85 leading-relaxed max-w-xl">
                Curated directly from our 1,000,000+ beauty community. Get instant access to 45+ viral looks, exact drugstore product dupes, and skin-tone palette matching matrices.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-[12px] text-white/90">
                  <CheckCircle2 size={15} className="text-[#FFD6A5] shrink-0" />
                  <span>45+ Viral Blueprints</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/90">
                  <CheckCircle2 size={15} className="text-[#FFD6A5] shrink-0" />
                  <span>Drugstore Dupes Under ₹800</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/90">
                  <CheckCircle2 size={15} className="text-[#FFD6A5] shrink-0" />
                  <span>Ahmedabad &amp; Surat Artists</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Opt-in Box */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/10 backdrop-blur-lg border border-white/20 p-6 sm:p-8 shadow-xl">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-[13px] font-semibold uppercase tracking-wider text-white">
                      Get The Free PDF Lookbook
                    </p>
                    <p className="text-[12px] text-white/70">
                      Enter your email or WhatsApp number to receive the instant download link and secret weekly pin drops.
                    </p>

                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                      <input
                        type="text"
                        required
                        value={contactValue}
                        onChange={(e) => setContactValue(e.target.value)}
                        placeholder="Email or WhatsApp Number"
                        className="w-full rounded-full border border-white/25 bg-black/30 py-3.5 pl-11 pr-4 text-[13px] text-white placeholder-white/50 outline-none backdrop-blur-md transition focus:border-white/60 focus:bg-black/50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#7A0B2E] shadow-lg transition hover:bg-[#FFE5D0]"
                    >
                      <Download size={14} />
                      Download Free Lookbook (PDF)
                    </button>

                    <p className="text-[10px] text-center text-white/60">
                      🔒 Zero spam. We protect your privacy. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 mb-3">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="font-serif text-xl text-white font-medium">
                      Your Lookbook is Ready!
                    </h3>
                    <p className="mt-1.5 text-[12px] text-white/80">
                      We&apos;ve dispatched the download link to{" "}
                      <span className="font-semibold text-white">{contactValue}</span>.
                    </p>
                    <a
                      href="#discovery-feed"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/30"
                    >
                      Continue Exploring Looks <ArrowRight size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
