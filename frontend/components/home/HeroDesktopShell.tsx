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
  badgeText = "✦ Hand-Verified Beauty Professionals",
  className = "",
  contentClassName = "",
}: HeroDesktopShellProps) {
  return (
    <div
      className={`hidden w-full max-w-[1240px] items-center gap-10 lg:grid lg:grid-cols-2 ${className}`}
    >
      <div className={`min-w-0 ${contentClassName}`}>
        <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[#EFD3DC] bg-white px-4 py-2 text-[0.88rem] font-semibold text-[#8A1238] shadow-[0_8px_20px_rgba(90,0,31,0.05)]">
          <span className="relative inline-block h-2 w-2 rounded-full bg-[#137333]" />
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
