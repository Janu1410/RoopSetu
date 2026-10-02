import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowUpRight, Sparkles } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-[#FFF8F3] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-0 select-none font-serif text-[clamp(11rem,27vw,29rem)] font-semibold leading-none tracking-[-0.1em] text-[#8A1238]/[0.035]"
      >
        R.
      </div>

      <div className="relative mx-auto max-w-[1380px]">
        <div className="grid items-end gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="premium-reveal max-w-[390px] pb-1">
            <p className="mb-5 inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#8A1238]">
              <Sparkles
                className="h-3.5 w-3.5 text-[#B88D43]"
                aria-hidden="true"
              />
              About RoopSetu
            </p>
            <p
              className={`${playfair.className} text-lg italic leading-[1.7] text-[#6D233D] sm:text-xl`}
            >
              RoopSetu — the bridge of beauty — brings brides and celebrants
              closer to hand-verified artists, bridal styling, and thoughtful
              inspiration.
            </p>
          </div>

          <h2
            id="about-heading"
            className={`${playfair.className} premium-reveal premium-delay-1 text-right text-[clamp(2.75rem,6.2vw,6rem)] leading-[0.92] tracking-[-0.05em] text-[#8A1238] [text-wrap:balance]`}
          >
            <span className="block italic font-normal">Where beauty meets</span>
            <span className="mt-2 block font-sans text-[0.62em] font-extrabold uppercase leading-[1.15] tracking-[-0.035em] text-[#5A001F] sm:text-[0.68em]">
              your moment.
            </span>
          </h2>
        </div>

        <div className="premium-reveal premium-delay-2 relative mx-auto mt-12 max-w-[1160px] sm:mt-16 lg:mt-20">
          <figure className="relative h-[300px] overflow-hidden rounded-[5px] border border-[#D4AF37]/75 bg-[#3D1C28] sm:h-[430px] lg:h-[500px]">
            <Image
              src="/images/makeup/mak-18.jpg"
              alt="Bridal beauty look finished with soft floral styling"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 1160px"
              className="object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#210710]/45 via-transparent to-transparent" />
            <figcaption className="absolute bottom-5 left-5 flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white sm:bottom-7 sm:left-8">
              <span className="h-px w-8 bg-[#E9C77B]" />
              Beauty for every celebration
            </figcaption>
          </figure>

          <div className="absolute -bottom-7 right-4 h-[150px] w-[112px] overflow-hidden rounded-[4px] border-[5px] border-[#FFF8F3] shadow-[0_16px_38px_rgba(45,13,26,0.22)] sm:-bottom-10 sm:right-8 sm:h-[220px] sm:w-[170px] lg:-bottom-12 lg:right-12 lg:h-[270px] lg:w-[205px]">
            <Image
              src="/images/hair/hai-26.jpg"
              alt="Detailed bridal hair styling"
              fill
              sizes="(max-width: 640px) 112px, 205px"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-16 grid items-start gap-8 border-t border-[#EAD9D7] pt-7 sm:mt-20 sm:pt-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="max-w-[700px] text-sm leading-7 text-[#64505A] sm:text-base sm:leading-8">
            Explore beauty professionals for bridal makeup, mehndi, hair, and
            salon-at-home services, alongside curated looks to help shape your
            celebration.
          </p>
          <Link
            href="/services"
            className="premium-interactive inline-flex min-h-12 items-center gap-4 border-b border-[#8A1238]/40 pb-1 text-sm font-bold text-[#5A001F] transition-colors hover:border-[#5A001F] hover:text-[#8A1238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238]"
          >
            Discover RoopSetu
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D4AF37] text-[#8A1238]">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
