"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const data = {
  heroImage: "/images/nails/pink-chrome-v3.jpg",
  title: "THE VIRAL PINK CHROME:",
  desc: "A blend of a soft, feminine base and a high-shine glaze, perfected for a subtle statement. No salon needed.",
  steps: [
    {
      id: "01",
      title: "The Flawless Canvas",
      description:
        "A perfect chrome finish shows every bump. Gently push back cuticles and apply a smooth, self-leveling base. Create a perfect surface before any color.",
      image: "/images/nails/chrome-step-1.jpg",
    },
    {
      id: "02",
      title: "The Blush Base",
      description:
        "Apply two sheer coats of soft baby pink gel polish. Cures completely, then apply a strictly NON-WIPE top coat.",
      image: "/images/nails/chrome-step-2.jpg",
    },
    {
      id: "03",
      title: "The Magic Glaze",
      description:
        "While slightly warm from the lamp, use a sponge applicator to firmly rub the gold dust onto the nail. Apply fine designs and seal with a mirror-finish top coat.",
      image: "/images/nails/chrome-step-3.jpg",
    },
  ],
};

export default function GetTheLook() {
  const reducedMotion = useReducedMotion();

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#2B1B20] py-16 sm:py-20 lg:py-24">
      {/* Immersive Blurred Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={data.heroImage}
          alt="Background blur"
          fill
          sizes="100vw"
          className="object-cover opacity-20 blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B20]/80 via-[#2B1B20]/60 to-[#2B1B20]/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.header
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 lg:mb-16"
        >
          <motion.p
            variants={fadeUpVariant}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70"
          >
            Anatomy of a Look
          </motion.p>
          <motion.h2
            variants={fadeUpVariant}
            className="mt-2 font-serif text-[40px] leading-[1.05] tracking-tight text-white sm:text-[48px] lg:text-[52px]"
          >
            Recreate the inspiration.
          </motion.h2>
        </motion.header>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-20 lg:items-stretch relative">
          {/* ── Left Column: Hero Player ── */}
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUpVariant}
            className="lg:col-span-6 relative w-full z-10 flex justify-center lg:justify-end h-full py-2 lg:py-0"
          >
            {/* Stretches to exactly match the right column height */}
            <div className="relative h-full min-h-[450px] w-full max-w-[420px] xl:max-w-[460px] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
              {/* Main Hero Image */}
              <Image
                src={data.heroImage}
                alt="Hero look"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
                style={{ objectPosition: "center" }}
                priority
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </motion.div>

          {/* ── Right Column: The Glass Cards ── */}
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-6 flex flex-col justify-center relative z-20"
          >
            {/* Title & Intro */}
            <motion.div
              variants={fadeUpVariant}
              className="mb-6 lg:mb-8 max-w-lg"
            >
              <p className="text-[13px] lg:text-[14px] leading-relaxed text-white/80 font-medium">
                <span className="uppercase tracking-widest text-white mr-2">
                  {data.title}
                </span>
                {data.desc}
              </p>
            </motion.div>

            {/* Step Cards */}
            <motion.div
              variants={fadeUpVariant}
              className="space-y-4 lg:space-y-5"
            >
              {data.steps.map((step) => (
                <div
                  key={`card-${step.id}`}
                  className="group relative flex items-center overflow-hidden rounded-[16px] lg:rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/[0.15]"
                >
                  {/* The Horizontal Connecting Line (Left side) */}
                  {/* Fixed width line that precisely crosses the grid gap to touch the image */}
                  <div className="hidden lg:block absolute right-[100%] top-1/2 h-[1px] w-[48px] lg:w-[64px] xl:w-[96px] bg-white/40 -translate-y-1/2 pointer-events-none" />
                  {/* The connection dot on the card edge */}
                  <div className="hidden lg:block absolute left-0 top-1/2 h-1.5 w-1.5 rounded-full bg-white/80 -translate-y-1/2 -translate-x-1/2" />
                  {/* The connection dot on the hero image */}
                  <div className="hidden lg:block absolute right-[calc(100%+48px)] lg:right-[calc(100%+64px)] xl:right-[calc(100%+96px)] top-1/2 h-1 w-1 rounded-full bg-white shadow-[0_0_4px_white] -translate-y-1/2" />

                  {/* Left: Thumbnail Image */}
                  <div className="relative h-24 w-28 lg:h-32 lg:w-36 shrink-0 overflow-hidden border-r border-white/10">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>

                  {/* Right: Content */}
                  <div className="p-4 lg:p-6 flex-1">
                    <h4 className="font-serif text-[16px] lg:text-[18px] text-white leading-snug">
                      {step.id}. {step.title}
                    </h4>
                    <p className="mt-1.5 text-[11px] lg:text-[12px] leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
