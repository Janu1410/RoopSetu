"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpenText,
  Images,
  MapPin,
  Sparkles,
} from "lucide-react";

const reasons = [
  {
    number: "01",
    icon: BookOpenText,
    label: "For the first spark",
    title: "Find a look that feels like you.",
    description:
      "Explore beauty ideas, categories and editorial guides before you decide what your occasion calls for.",
    href: "/beauty-guide",
    action: "Explore the beauty guide",
    tone: "rose",
  },
  {
    number: "02",
    icon: Images,
    label: "For a considered choice",
    title: "See the work and the details.",
    description:
      "Artist profiles are built around portfolios, service menus, experience and service areas, so the important details have a place together.",
    href: "/beauty-categories",
    action: "Explore beauty categories",
    tone: "gold",
  },
  {
    number: "03",
    icon: Sparkles,
    label: "For independent artists",
    title: "Make your work easier to discover.",
    description:
      "Beauty professionals can shape a profile with their craft, location, services and portfolio in one dedicated setup flow.",
    href: "/become-beautician",
    action: "Create a professional profile",
    tone: "plum",
  },
] as const;

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

export default function CorePillarsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="why-roopsetu"
      aria-labelledby="why-roopsetu-heading"
      className="relative isolate overflow-hidden border-y border-[#E9DFDA] bg-[#F7F1E9] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-[-10rem] h-[28rem] w-[28rem] rounded-full border border-[#8A1238]/10 sm:right-[-8rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-[-8rem] h-[24rem] w-[24rem] rounded-full border border-[#8A1238]/10 sm:right-[-4rem]"
      />

      <div className="relative mx-auto max-w-[1320px]">
        <div className="grid gap-10 lg:grid-cols-[0.83fr_1.17fr] lg:items-end lg:gap-16">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#8A1238]">
              <span className="h-px w-8 bg-[#B88D43]" />
              Why RoopSetu
            </p>
            <h2
              id="why-roopsetu-heading"
              className="max-w-[620px] font-serif text-[clamp(2.7rem,5.4vw,5rem)] leading-[0.98] tracking-[-0.045em] text-[#34252D] [text-wrap:balance]"
            >
              Beauty choices,
              <br />
              <span className="italic text-[#8A1238]">with a clearer path.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[590px] lg:justify-self-end"
          >
            <p className="text-base leading-7 text-[#66585D] sm:text-lg sm:leading-8">
              RoopSetu brings beauty inspiration and independent professionals
              into one considered space, helping you move from an idea toward
              the details that matter.
            </p>
            <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#796C70]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9C9C3] text-[#8A1238]">
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </span>
              Made for the people who create the look, too
            </div>
          </motion.div>
        </div>

        <div className="relative mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-[#E1D5CE] bg-[#E1D5CE] sm:mt-16 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const tone = toneStyles[reason.tone];

            return (
              <motion.article
                key={reason.number}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: reducedMotion ? 0 : index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex min-h-[330px] flex-col bg-[#FBF8F3] p-6 sm:min-h-[350px] sm:p-8 lg:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className={`font-mono text-xs tracking-[0.18em] ${tone.number}`}>
                    {reason.number}
                  </span>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${tone.icon}`}>
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                </div>

                <div className="mt-9">
                  <p className="mb-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#927D75]">
                    {reason.label}
                  </p>
                  <h3 className="max-w-[18rem] font-serif text-[1.75rem] leading-[1.1] tracking-[-0.025em] text-[#34252D] sm:text-[1.9rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-4 max-w-[25rem] text-sm leading-6 text-[#6C6062]">
                    {reason.description}
                  </p>
                </div>

                <Link
                  href={reason.href}
                  className={`mt-auto inline-flex w-fit items-center gap-2 pt-8 text-xs font-bold text-[#493A40] transition-colors ${tone.hover} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238]`}
                >
                  {reason.action}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#DCCFC8] pt-5 text-xs leading-5 text-[#7D7070] sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#8A1238]" aria-hidden="true" />
            Profiles can include location, services and portfolio work.
          </span>
          <span className="inline-flex items-center gap-2 sm:justify-end">
            Inspiration for every occasion
            <span className="h-px w-8 bg-[#B88D43]" />
          </span>
        </div>
      </div>
    </section>
  );
}

export { CorePillarsSection };
