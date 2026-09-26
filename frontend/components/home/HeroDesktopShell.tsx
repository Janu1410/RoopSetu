"use client";

import { ReactNode } from "react";
import { Playfair_Display } from "next/font/google";
import HeroDesktopShowcase from "./HeroDesktopShowcase";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

type HeroDesktopShellProps = {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  badgeText?: string;
  className?: string;
  contentClassName?: string;
};

export default function HeroDesktopShell({
  title,
  description,
  children,
  badgeText = "Trusted by 2,000+ Brides",
  className = "",
  contentClassName = "",
}: HeroDesktopShellProps) {
  return (
    <div
      className={`hidden w-full max-w-[1240px] items-center gap-10 lg:grid lg:grid-cols-2 ${className}`}
    >
      <div className={`min-w-0 ${contentClassName}`}>
        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#EFD3DC] bg-white px-5 py-3 text-[0.98rem] font-semibold text-[#544152] shadow-[0_8px_20px_rgba(90,0,31,0.05)]">
          <span className="relative inline-block h-4 w-10">
            <span className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#CFD5E3]" />
            <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#CFD5E3]" />
            <span className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#CFD5E3]" />
          </span>
          {badgeText}
        </div>

        <h2
          className={`${playfair.className} mt-7 max-w-[12ch] text-[3.85rem] leading-[0.95] text-[#5A001F]`}
        >
          {title}
        </h2>

        {description ? (
          <div className="mt-5 max-w-[42rem] text-[1.05rem] leading-[1.65] text-[#4B5568]">
            {description}
          </div>
        ) : null}

        {children ? <div className="mt-6">{children}</div> : null}
      </div>

      <HeroDesktopShowcase className="w-full max-w-[560px]" />
    </div>
  );
}
