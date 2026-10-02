"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { beautyCategories } from "@/constants/beauty-data";
import { getActiveServiceIndex, getScrollProgress } from "@/lib/services-lookbook.mjs";

const serviceOrder = ["bridal", "makeup", "hairstyles", "nail-art"];
const orderedCategories = [
  ...serviceOrder.flatMap((id) => {
    const category = beautyCategories.find((item) => item.id === id);
    return category ? [category] : [];
  }),
  ...beautyCategories.filter((category) => !serviceOrder.includes(category.id)),
];

const services = orderedCategories.map((category) => {
  const leadLook = category.items[0];

  return {
    id: category.id,
    title: category.label,
    href: category.href,
    description: category.heroDescription ?? category.tagline,
    image: leadLook.image,
    alt: leadLook.alt,
    objectPosition: leadLook.objectPosition ?? "center",
  };
});

const compactServiceNames: Record<string, string> = {
  "bridal": "Bridal",
  "makeup": "Makeup",
  "hairstyles": "Hair",
  "nail-art": "Nails",
};

function useActiveService(
  sectionRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  serviceCount: number,
) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const scrollRange = section.offsetHeight - stage.offsetHeight;
      const distance = -section.getBoundingClientRect().top;
      const progress = getScrollProgress(distance, scrollRange);
      setActiveIndex(getActiveServiceIndex(progress, serviceCount));
    };
    const scheduleMeasure = () => {
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [sectionRef, serviceCount, stageRef]);

  return activeIndex;
}

function ServiceArtwork({ activeIndex }: { activeIndex: number }) {
  const service = services[activeIndex];
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative h-full min-h-0 overflow-hidden bg-[#E8DFD5]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={service.id}
          initial={reducedMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.99 }}
          transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={service.image}
            alt={service.alt}
            width={1200}
            height={1600}
            priority={activeIndex === 0}
            sizes="(max-width: 1023px) 100vw, 56vw"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: service.objectPosition }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#24171C]/45 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#24171C]/10" />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-[#271A20]/35 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:bottom-6 sm:left-6">
            RoopSetu lookbook
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ServiceCopy({ activeIndex }: { activeIndex: number }) {
  const service = services[activeIndex];
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex min-h-0 flex-col justify-center px-5 py-5 sm:px-8 sm:py-7 lg:px-10 xl:px-14">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={service.id}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#997B61] sm:mb-4 sm:text-xs">
            {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")} · Beauty edit
          </p>
          <h3 className="font-serif text-[clamp(1.85rem,4.2vw,4rem)] leading-[0.98] tracking-[-0.04em] text-[#4B1028] [text-wrap:balance]">
            {service.title}
          </h3>
          <p className="mt-3 max-w-[29rem] text-[0.8rem] leading-5 text-[#65575C] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base">
            {service.description}
          </p>
          <Link
            href={service.href}
            className="mt-4 inline-flex min-h-10 items-center gap-3 border-b border-[#8A1238]/35 pb-2 text-xs font-bold text-[#771333] transition-colors hover:border-[#771333] hover:text-[#4B1028] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238] sm:mt-7 sm:text-sm"
          >
            Explore {service.title.toLowerCase()}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ServicesLookbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeIndex = useActiveService(sectionRef, stageRef, services.length);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="service-showcase-heading"
      className="relative w-full overflow-x-clip bg-[#FFF8F3]"
      style={{ height: `${services.length * 100}svh` }}
    >
      <div ref={stageRef} data-service-stage className="sticky top-[74px] grid h-[calc(100svh-74px)] min-h-[calc(100svh-74px)] grid-rows-[minmax(13.5rem,35svh)_minmax(0,1fr)] overflow-hidden lg:top-[90px] lg:h-[calc(100svh-90px)] lg:min-h-0 lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)] lg:grid-rows-1">
        <div className="relative isolate flex min-h-0 flex-col justify-between overflow-hidden bg-[#5A001F] px-5 pb-4 pt-5 text-[#FFF8F3] sm:px-8 sm:pb-7 sm:pt-7 lg:px-10 lg:pb-10 lg:pt-9 xl:px-16 xl:pb-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-[26rem] w-[26rem] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 -z-10 h-[21rem] w-[21rem] rounded-full border border-white/10" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-24 -z-10 h-48 w-[140%] -rotate-[12deg] border-t border-[#D9B98A]/25" />

          <div>
            <p className="flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#E4C9A8] sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              RoopSetu · Beauty services
            </p>
            <h2
              id="service-showcase-heading"
              className="mt-3 max-w-[38rem] font-serif text-[clamp(2rem,5.3vw,5.4rem)] leading-[0.9] tracking-[-0.045em] [text-wrap:balance] lg:mt-10"
            >
              Beauty for
              <br />
              <span className="italic text-[#E6C7AA]">your kind</span>
              <br />
              of moment.
            </h2>
            <p className="mt-3 hidden max-w-sm text-sm leading-6 text-white/75 lg:block xl:mt-6">
              Find ideas across the looks and details that make a celebration feel like yours.
            </p>
          </div>

          <nav aria-label="Beauty service categories" className="mt-4 lg:mt-8">
            <ol className="grid grid-cols-4 gap-2 lg:grid-cols-1 lg:gap-0">
              {services.map((service, index) => {
                const isActive = index === activeIndex;

                return (
                  <li key={service.id} className="min-w-0 lg:border-t lg:border-white/15">
                    <Link
                      href={service.href}
                      aria-current={isActive ? "step" : undefined}
                      className={`group flex min-h-9 items-center gap-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6C7AA] lg:min-h-[3.65rem] lg:gap-4 ${isActive ? "text-[#E6C7AA]" : "text-white/55 hover:text-white"}`}
                    >
                      <span className="hidden font-mono text-[0.65rem] tracking-[0.12em] lg:inline">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`h-px flex-1 transition-colors lg:hidden ${isActive ? "bg-[#E6C7AA]" : "bg-white/25"}`} />
                      <span className="truncate text-[0.56rem] font-bold uppercase tracking-[0.07em] sm:text-[0.65rem] lg:flex-1 lg:text-sm lg:normal-case lg:tracking-normal">
                        <span className="lg:hidden">{compactServiceNames[service.id] ?? service.title}</span>
                        <span className="hidden lg:inline">{service.title}</span>
                      </span>
                      <ArrowUpRight className="hidden h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 lg:block" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <Link
            href="/beauty-categories"
            className="mt-3 hidden w-fit items-center gap-2 text-xs font-semibold text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6C7AA] lg:inline-flex"
          >
            Browse every category <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-[#F8F3EB] lg:grid-cols-[minmax(0,1.12fr)_minmax(230px,0.88fr)] lg:grid-rows-1 lg:items-center lg:gap-8 lg:px-7 lg:py-8 xl:gap-12 xl:px-12 xl:py-12">
          <div className="relative h-full min-h-0 overflow-hidden lg:h-[min(74svh,760px)] lg:rounded-[1.15rem]">
            <ServiceArtwork activeIndex={activeIndex} />
          </div>
          <ServiceCopy activeIndex={activeIndex} />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-[3px] bg-[#5A001F]/10 lg:block">
            <motion.div
              className="h-full origin-left bg-[#8A1238]"
              animate={{ scaleX: (activeIndex + 1) / services.length }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-2 right-4 z-20 flex items-center gap-2 text-[0.58rem] font-bold uppercase tracking-[0.15em] text-[#6F515C] lg:bottom-6 lg:right-7">
          <ArrowDown className="h-3 w-3" aria-hidden="true" />
          Scroll to explore
        </div>
      </div>
    </section>
  );
}

export { services as serviceSlides };
