"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/home/Navbar/Navbar";
import { LookItem, LookCategory } from "@/constants/beauty-data";

type ArticleDetailViewProps = {
  articleData: LookItem;
  parentCategory: LookCategory | null;
};

export default function ArticleDetailView({
  articleData,
  parentCategory,
}: ArticleDetailViewProps) {
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
    <main className="min-h-screen bg-[#2B1B20] text-white">
      {/* Immersive Blurred Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={articleData.image}
          alt="Background blur"
          fill
          sizes="100vw"
          className="object-cover opacity-20 blur-3xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1B20]/80 via-[#2B1B20]/60 to-[#2B1B20]/95" />
      </div>

      <div className="relative z-10">
        {/* Make navbar text white if needed, but since it's an imported component it might have its own styling. We'll just render it */}
        <div className="bg-[#FFF8F3] text-[#2D2230]">
          <Navbar />
        </div>

        <section className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
            {/* Back Navigation */}
            {parentCategory && (
              <motion.div
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                variants={fadeUpVariant}
                className="mb-8"
              >
                <Link
                  href={parentCategory.href}
                  className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} strokeWidth={2} />
                  Back to {parentCategory.label}
                </Link>
              </motion.div>
            )}

            {/* Header */}
            <motion.header
              initial={reducedMotion ? false : "hidden"}
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 lg:mb-16"
            >
              <motion.p
                variants={fadeUpVariant}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70"
              >
                {parentCategory ? parentCategory.label : "Anatomy of a Look"}
              </motion.p>
              <motion.h1
                variants={fadeUpVariant}
                className="mt-2 font-serif text-[40px] leading-[1.05] tracking-tight text-white sm:text-[48px] lg:text-[52px]"
              >
                {articleData.title || articleData.alt}
              </motion.h1>
            </motion.header>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-20 lg:items-stretch relative">
              {/* ── Left Column: Hero Player ── */}
              <motion.div
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                variants={fadeUpVariant}
                className="lg:col-span-6 relative w-full z-10 flex justify-center lg:justify-end h-full py-2 lg:py-0"
              >
                <div className="relative h-full min-h-[450px] w-full max-w-[420px] xl:max-w-[460px] rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                  <Image
                    src={articleData.image}
                    alt={articleData.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 460px"
                    className="object-cover"
                    style={{
                      objectPosition: articleData.objectPosition ?? "center",
                    }}
                    priority
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </motion.div>

              {/* ── Right Column: The Glass Cards ── */}
              <motion.div
                initial={reducedMotion ? false : "hidden"}
                animate="visible"
                variants={staggerContainer}
                className="lg:col-span-6 flex flex-col justify-center relative z-20"
              >
                {/* Title & Intro */}
                {articleData.description && (
                  <motion.div
                    variants={fadeUpVariant}
                    className="mb-6 lg:mb-8 max-w-lg"
                  >
                    <p className="text-[13px] lg:text-[14px] leading-relaxed text-white/80 font-medium">
                      <span className="uppercase tracking-widest text-white mr-2">
                        {articleData.title}:
                      </span>
                      {articleData.description}
                    </p>
                  </motion.div>
                )}

                {/* Step Cards */}
                {articleData.steps && articleData.steps.length > 0 ? (
                  <motion.div
                    variants={fadeUpVariant}
                    className="space-y-4 lg:space-y-5"
                  >
                    {articleData.steps.map((step) => (
                      <div
                        key={`card-${step.id}`}
                        className="group relative flex items-center overflow-hidden rounded-[16px] lg:rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/[0.15]"
                      >
                        {/* The Horizontal Connecting Line (Left side) */}
                        <div className="hidden lg:block absolute right-[100%] top-1/2 h-[1px] w-[48px] lg:w-[64px] xl:w-[96px] bg-white/40 -translate-y-1/2 pointer-events-none" />
                        <div className="hidden lg:block absolute left-0 top-1/2 h-1.5 w-1.5 rounded-full bg-white/80 -translate-y-1/2 -translate-x-1/2" />
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
                ) : (
                  <motion.div
                    variants={fadeUpVariant}
                    className="bg-white/5 border border-white/10 rounded-[20px] p-8 text-center max-w-md"
                  >
                    <p className="text-[14px] leading-relaxed text-white/70">
                      Detailed steps and product recommendations for this look
                      are coming soon.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
