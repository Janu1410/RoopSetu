"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpenText,
  Check,
  Crown,
  MapPin,
  Sparkles,
} from "lucide-react";

export type CorePillarItem = {
  number: string;
  icon: typeof Sparkles;
  badge: {
    label: string;
    variant: "emerald" | "gold" | "wine";
  };
  label: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  action: string;
  tone: "rose" | "gold" | "plum";
};

export const CORE_PILLARS: CorePillarItem[] = [
  {
    number: "01",
    icon: Sparkles,
    badge: {
      label: "Now Live",
      variant: "emerald",
    },
    label: "Verified Beauticians & Salons",
    title: "Hand-verified beauty artists in your city.",
    description:
      "Discover bridal makeup artists, mehndi designers, and doorstep salons with authentic portfolios and transparent pricing.",
    features: [
      "At-Home & Studio Visits",
      "Direct Artist Consultation",
      "100% Verified Portfolios",
    ],
    href: "/services",
    action: "Find verified beauticians",
    tone: "rose",
  },
  {
    number: "02",
    icon: Crown,
    badge: {
      label: "Coming Soon",
      variant: "gold",
    },
    label: "Ethnic Wear & Jewelry Rentals",
    title: "Designer festive wear at 10% of retail.",
    description:
      "Rent authentic designer Chaniya Cholis, bridal lehengas, and handcrafted Kundan jewelry for weddings and Navratri celebrations.",
    features: [
      "Festive Chaniya Cholis",
      "Bridal Lehenga Collections",
      "Kundan & Jadau Jewelry",
    ],
    href: "/rentals",
    action: "Preview rental collection",
    tone: "gold",
  },
  {
    number: "03",
    icon: BookOpenText,
    badge: {
      label: "Explore Looks",
      variant: "wine",
    },
    label: "The RoopSetu Beauty Guide",
    title: "Real bridal looks & 'Book The Exact Look'.",
    description:
      "Explore curated trend guides, regional bridal inspirations, and connect directly with the specific artist who created each look.",
    features: [
      "Real Bridal Transformations",
      "Navratri & Garba Trends",
      "Direct Artist Attribution",
    ],
    href: "/beauty-guide",
    action: "Browse the beauty guide",
    tone: "plum",
  },
];

const toneStyles = {
  rose: {
    icon: "bg-[#F5E7E9] text-[#8A1238]",
    number: "text-[#A7465E]",
    hover: "group-hover:text-[#8A1238]",
  },
  gold: {
    icon: "bg-[#F4EDDF] text-[#826329]",
    number: "text-[#8C7449]",
    hover: "group-hover:text-[#826329]",
  },
  plum: {
    icon: "bg-[#ECE8F0] text-[#5E496B]",
    number: "text-[#766480]",
    hover: "group-hover:text-[#5E496B]",
  },
};

const badgeStyles = {
  emerald:
    "border-[#CDE7D5] bg-[#EAF7EE] text-[#137333]",
  gold:
    "border-[#F3E3B6] bg-[#FDF6E2] text-[#8C6B1B]",
  wine:
    "border-[#ECCCD4] bg-[#F9EBEF] text-[#8A1238]",
};

export default function CorePillarsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="why-roopsetu"
      aria-labelledby="why-roopsetu-heading"
      className="relative isolate overflow-hidden border-y border-[#E9DFDA] bg-[#F7F1E9] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-16"
    >
      <div className="relative mx-auto max-w-[1320px]">
        {/* Section Header */}
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8A1238]">
              <span className="h-px w-8 bg-[#B88D43]" />
              Why RoopSetu · The 3 Core Pillars
            </p>
            <h2
              id="why-roopsetu-heading"
              className="max-w-[560px] font-serif text-[clamp(1.9rem,3.4vw,2.85rem)] leading-[1.08] tracking-[-0.035em] text-[#34252D] [text-wrap:balance]"
            >
              A complete ecosystem,
              <br />
              <span className="italic text-[#8A1238]">for your celebratory moments.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-[580px] lg:justify-self-end"
          >
            <p className="text-sm leading-6 text-[#66585D] sm:text-base sm:leading-7">
              RoopSetu unites hand-verified beauty talent, designer festive
              rentals, and curated lookbooks into one trusted space — designed
              for brides, celebrants, and independent artisans across Gujarat & Mumbai.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#796C70]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9C9C3] text-[#8A1238]">
                <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Built for clients and the artists who create the look
            </div>
          </motion.div>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="relative mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-[#E1D5CE] bg-[#E1D5CE] sm:mt-10 lg:grid-cols-3">
          {CORE_PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const tone = toneStyles[pillar.tone];
            const badgeClass = badgeStyles[pillar.badge.variant];

            return (
              <motion.article
                key={pillar.number}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex min-h-[350px] flex-col justify-between bg-[#FBF8F3] p-6 transition-colors hover:bg-white sm:min-h-[375px] sm:p-7 lg:p-8"
              >
                <div>
                  {/* Top Bar: Number + Status Badge + Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs font-bold tracking-[0.18em] ${tone.number}`}
                    >
                      {pillar.number}
                    </span>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider ${badgeClass}`}
                      >
                        {pillar.badge.label}
                      </span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${tone.icon}`}
                      >
                        <Icon
                          className="h-[1.1rem] w-[1.1rem]"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-6">
                    <p className="mb-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#927D75]">
                      {pillar.label}
                    </p>
                    <h3 className="font-serif text-[1.4rem] leading-[1.15] tracking-[-0.025em] text-[#34252D] sm:text-[1.55rem]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-[#6C6062]">
                      {pillar.description}
                    </p>

                    {/* Key Feature Checkpoints */}
                    <ul className="mt-5 space-y-2 border-t border-[#F0E6DF] pt-4">
                      {pillar.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-xs font-medium text-[#5D5054]"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EADACD]/50 text-[#8A1238]">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Link */}
                <Link
                  href={pillar.href}
                  className={`mt-6 inline-flex w-fit items-center gap-2 border-t border-transparent pt-2 text-xs font-bold text-[#493A40] transition-colors ${tone.hover} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238]`}
                >
                  {pillar.action}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Section Bottom Quality Commitment */}
        <div className="mt-6 flex flex-col gap-3 border-t border-[#DCCFC8] pt-5 text-xs leading-5 text-[#7D7070] sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#8A1238]" aria-hidden="true" />
            Active in Ahmedabad, Surat, Vadodara, Rajkot & Mumbai
          </span>
          <span className="inline-flex items-center gap-2 sm:justify-end">
            100% Hand-Verified Portfolios · Transparent Rate Cards
            <span className="h-px w-8 bg-[#B88D43]" />
          </span>
        </div>
      </div>
    </section>
  );
}

export { CorePillarsSection };

