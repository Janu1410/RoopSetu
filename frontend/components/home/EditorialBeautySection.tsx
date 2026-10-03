"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const looks = [
  {
    title: "Bridal hair & makeup",
    eyebrow: "The wedding edit · 01",
    description: "A considered bridal look, brought to life by artists who understand every detail of your day.",
    image: "/images/hero/desktop/her-30.jpg",
    alt: "Bride wearing traditional bridal makeup and an elegant hairstyle",
    href: "/services?category=bridal",
  },
  {
    title: "Mehendi artistry",
    eyebrow: "The celebration edit · 02",
    description: "Find expressive henna artistry for intimate rituals, joyful gatherings, and the moments in between.",
    image: "/images/hero/desktop/mehndi-generated.jpg",
    alt: "Intricate mehendi artistry created for a bridal celebration",
    href: "/services?category=mehendi",
  },
  {
    title: "Signature hairstyles",
    eyebrow: "The finishing touch · 03",
    description: "From soft, modern styling to timeless occasion hair, discover a look that feels like you.",
    image: "/images/hero/desktop/her-32.jpg",
    alt: "Traditional occasion hairstyle finished with floral accessories",
    href: "/services?category=hair-draping",
  },
];

function LookCard({ index, progress, reduceMotion }: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean | null;
}) {
  const start = index === 1 ? 0.32 : 0.65;
  const end = index === 1 ? 0.43 : 0.76;
  const y = useTransform(progress, [start, end], ["105%", "0%"]);
  const scale = useTransform(progress, [start, end], [0.97, 1]);
  const item = looks[index];

  return (
    <motion.article
      className="absolute inset-0 overflow-hidden bg-[#26151b] shadow-[0_28px_90px_rgba(31,5,15,0.42)]"
      style={{ y: index === 0 || reduceMotion ? 0 : y, scale: index === 0 || reduceMotion ? 1 : scale, zIndex: index + 1 }}
      aria-label={item.title}
    >
      <Image src={item.image} alt={item.alt} fill priority={index === 0} sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[#14080d]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#16090d]/75 via-[#16090d]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#16090d]/75 via-transparent to-[#16090d]/25" />

      <div className="absolute left-5 top-6 flex items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/90 sm:left-10 sm:top-9 lg:left-14">
        <Sparkles className="h-3.5 w-3.5 text-[#E4BE73]" aria-hidden="true" />
        RoopSetu · The beauty edit
      </div>
      <div className="absolute right-5 top-6 flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.16em] text-white/90 sm:right-10 sm:top-9 lg:right-14">
        <span>0{index + 1}</span><span className="h-px w-7 bg-[#E4BE73]" /><span>03</span>
      </div>

      <div className="absolute bottom-8 left-5 right-5 max-w-[620px] sm:bottom-12 sm:left-10 lg:bottom-16 lg:left-14">
        <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#F0D28F]">{item.eyebrow}</p>
        <h2 className="font-serif text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.04em] text-white">{item.title}</h2>
        <p className="mt-4 max-w-[470px] text-sm leading-6 text-white/85 sm:text-base sm:leading-7">{item.description}</p>
        <Link href={item.href} className="group mt-6 inline-flex min-h-[58px] items-center justify-between gap-8 border border-[#E4BE73] bg-[#F4CF83] px-5 py-3 text-[#5A001F] shadow-[0_14px_34px_rgba(20,0,8,0.3)] transition-colors hover:bg-[#F8D995] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-w-[300px]">
          <span className="text-sm font-extrabold uppercase tracking-wide">Explore this look</span>
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

function ScrollProgress({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const first = useTransform(progress, [0, 0.34], [1, 0.35]);
  const second = useTransform(progress, [0.32, 0.66], [0.35, 1]);
  const third = useTransform(progress, [0.65, 1], [0.35, 1]);
  return (
    <div className="absolute bottom-5 right-5 z-20 flex gap-1.5 sm:bottom-8 sm:right-8" aria-hidden="true">
      {([["bridal", first], ["mehendi", second], ["hair", third]] as const).map(([label, opacity]) => (
        <motion.span key={label} className="h-1 w-8 bg-[#F4CF83] sm:w-12" style={{ opacity }} />
      ))}
    </div>
  );
}

export default function EditorialBeautySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  if (reduceMotion) {
    return (
      <section className="space-y-3 bg-[#170b10] p-3 sm:space-y-5 sm:p-5" aria-label="Explore RoopSetu beauty services">
        {looks.map((look) => (
          <article key={look.title} className="relative min-h-[78svh] overflow-hidden border border-[#D4AF37]/50 bg-[#24151a] shadow-[0_28px_90px_rgba(31,5,15,0.42)]">
            <Image src={look.image} alt={look.alt} fill sizes="100vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-[#14080d]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16090d]/85 via-[#16090d]/15 to-[#16090d]/20" />
            <div className="absolute bottom-8 left-5 right-5 max-w-[620px] sm:bottom-12 sm:left-10 lg:left-14">
              <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#F0D28F]">{look.eyebrow}</p>
              <h2 className="font-serif text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.04em] text-white">{look.title}</h2>
              <p className="mt-4 max-w-[470px] text-sm leading-6 text-white/85 sm:text-base sm:leading-7">{look.description}</p>
              <Link href={look.href} className="mt-6 inline-flex min-h-[58px] items-center gap-8 border border-[#E4BE73] bg-[#F4CF83] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-[#5A001F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore this look <ArrowUpRight className="h-5 w-5" aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[300svh] bg-[#170b10]" aria-label="Explore RoopSetu beauty services">
      <div className="sticky top-0 h-[100svh] min-h-[520px] overflow-hidden bg-[#170b10] p-3 sm:p-5 lg:p-7">
        <div className="relative h-full overflow-hidden border border-[#D4AF37]/50 bg-[#24151a] shadow-[0_30px_100px_rgba(30,0,10,0.3)]">
          {looks.map((look, index) => (
            <LookCard key={look.title} index={index} progress={scrollYProgress} reduceMotion={reduceMotion} />
          ))}
          <ScrollProgress progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
