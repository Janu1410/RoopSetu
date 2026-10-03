import Link from "next/link";
import { ArrowLeft, Crown, Sparkles, Bell } from "lucide-react";
import Navbar from "@/components/home/Navbar/Navbar";
import LuxuryFooter from "@/components/home/LuxuryFooter";

export default function RentalsPreviewPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230] flex flex-col justify-between">
      <Navbar />

      <section className="relative px-5 py-24 sm:px-8 sm:py-32 flex flex-col items-center justify-center text-center">
        {/* Subtle Luxury Aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[32rem] w-[32rem] rounded-full bg-[#D4AF37]/10 blur-[100px]"
        />

        <div className="relative max-w-2xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#FAF0E6] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#5A001F] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Coming for Festive Season · Expansion</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-[#5A001F] sm:text-5xl lg:text-6xl [text-wrap:balance]">
            Ethnic Wear &amp; Jewelry Rentals
          </h1>

          <p className="mt-6 text-base leading-7 text-[#6C505D] sm:text-lg sm:leading-8">
            Experience luxury designer Chaniya Cholis, bridal lehengas, and
            authentic handcrafted Kundan jewelry for weddings and Navratri — at
            just 10% of retail price, with doorstep fitting.
          </p>

          {/* Value Highlights */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="rounded-xl border border-[#E8D7CA] bg-white p-5 shadow-xs">
              <span className="text-xl mb-2 block">🥻</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B222D]">
                Navratri Chaniya Cholis
              </h3>
              <p className="mt-1 text-xs text-[#7A606A]">
                Heavy mirror-work, authentic Gamthi &amp; designer flare.
              </p>
            </div>

            <div className="rounded-xl border border-[#E8D7CA] bg-white p-5 shadow-xs">
              <span className="text-xl mb-2 block">👑</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B222D]">
                Bridal Lehengas
              </h3>
              <p className="mt-1 text-xs text-[#7A606A]">
                High-end Sabyasachi &amp; Rajwada inspired bridal sets.
              </p>
            </div>

            <div className="rounded-xl border border-[#E8D7CA] bg-white p-5 shadow-xs">
              <span className="text-xl mb-2 block">✨</span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B222D]">
                Kundan &amp; Polki Jewelry
              </h3>
              <p className="mt-1 text-xs text-[#7A606A]">
                Chokers, mathapattis &amp; complete bridal jewelry sets.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services"
              className="premium-interactive inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#5A001F] px-7 text-xs font-bold uppercase tracking-[0.12em] text-[#FFF8F3] shadow-md transition hover:bg-[#460018]"
            >
              <Crown className="h-4 w-4 text-[#D4AF37]" aria-hidden="true" />
              <span>Explore Verified Beauticians</span>
            </Link>

            <Link
              href="/"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/60 bg-white px-6 text-xs font-bold uppercase tracking-[0.12em] text-[#5A001F] transition hover:bg-[#FAF0E6]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </main>
  );
}
