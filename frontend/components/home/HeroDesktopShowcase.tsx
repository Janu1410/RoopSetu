"use client";

import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type HeroDesktopShowcaseProps = {
  className?: string;
};

export default function HeroDesktopShowcase({
  className = "",
}: HeroDesktopShowcaseProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
        <article className="relative h-[300px] overflow-hidden rounded-[1.2rem] bg-[#EEE3DE] sm:h-[350px]">
          <Image
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=80"
            alt="Mehandi Art"
            fill
            sizes="(max-width: 1024px) 50vw, 28vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4">
            <p className="text-2xl font-semibold text-white">Mehandi Art</p>
          </div>
        </article>

        <article className="relative h-[142px] overflow-hidden rounded-[1.2rem] bg-[#EEE3DE] sm:h-[172px]">
          <Image
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80"
            alt="Nail care treatment"
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            className="object-cover"
          />
        </article>

        <article className="relative h-[142px] overflow-hidden rounded-[1.2rem] bg-[#EEE3DE] sm:h-[174px]">
          <Image
            src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80"
            alt="Beauty makeup products"
            fill
            sizes="(max-width: 1024px) 50vw, 20vw"
            className="object-cover"
          />
        </article>

        <article className="flex h-[142px] flex-col justify-between rounded-[1.2rem] bg-gradient-to-br from-[#5A001F] via-[#730028] to-[#8A1238] p-4 text-white sm:h-[174px] sm:p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD2DD]">
              Special Offer
            </p>
            <h3
              className={`${playfair.className} mt-1.5 text-[1.7rem] leading-tight`}
            >
              Bridal Package
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[2rem] font-bold leading-none">
              20% <span className="text-lg font-medium">OFF</span>
            </p>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl transition-colors hover:bg-white/30"
              aria-label="View offer"
            >
              &rarr;
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
