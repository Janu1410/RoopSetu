import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

const discoverLinks = [
  { label: "Beauty categories", href: "/beauty-categories" },
  { label: "Beauty guide", href: "/beauty-guide" },
  { label: "Services", href: "/services" },
];

const communityLinks = [
  { label: "For beauty professionals", href: "/become-beautician" },
  { label: "Partner sign in", href: "/login" },
];

function PinterestMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M12.04 2C6.57 2 3.68 5.93 3.68 9.22c0 1.99.75 3.76 2.36 4.42.26.11.5 0 .58-.28l.24-.97c.08-.28.05-.38-.16-.63-.47-.55-.77-1.26-.77-2.27 0-2.93 2.2-5.55 5.73-5.55 3.13 0 4.85 1.91 4.85 4.46 0 3.35-1.48 6.18-3.68 6.18-1.21 0-2.12-1-1.83-2.24.35-1.48 1.04-3.08 1.04-4.14 0-.95-.51-1.74-1.57-1.74-1.25 0-2.25 1.3-2.25 3.05 0 1.11.38 1.86.38 1.86l-1.52 6.45c-.45 1.92-.07 4.28-.04 4.52.02.14.2.18.29.07.12-.15 1.66-2.06 2.18-3.93.15-.53.86-3.37.86-3.37.43.82 1.69 1.54 3.02 1.54 3.98 0 6.68-3.63 6.68-8.49C20.07 5.42 16.88 2 12.04 2Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function LuxuryFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#FFF8F3] text-[#2D2230]">
      <div className="pointer-events-none absolute -right-36 -top-40 h-96 w-96 rounded-full bg-[#E6C27B]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-7 pt-14 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid gap-12 border-b border-[#5A001F]/15 pb-12 md:grid-cols-12 md:gap-8 lg:pb-16">
          <div className="md:col-span-6 lg:col-span-5">
            <Link href="/" aria-label="RoopSetu home" className="group inline-flex items-center gap-2">
              <span className="font-serif text-3xl font-semibold tracking-tight text-[#5A001F] sm:text-4xl">
                RoopSetu<span className="text-[#B67A36]">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#66545D] sm:text-base">
              A little inspiration, a trusted beauty professional, and the confidence to make every moment your own.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#5A001F]/10 bg-white/70 px-3.5 py-2 text-xs font-medium text-[#5A001F]">
              <Sparkles className="h-3.5 w-3.5 text-[#B67A36]" aria-hidden="true" />
              Beauty inspiration for every occasion
            </div>
          </div>

          <nav aria-label="Explore RoopSetu" className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A1238]">Explore</h2>
            <ul className="mt-5 space-y-3.5">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <Link className="group inline-flex items-center gap-1 text-sm text-[#55434C] transition-colors hover:text-[#8A1238] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238]" href={link.href}>
                    {link.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="RoopSetu community" className="md:col-span-3 lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A1238]">Community</h2>
            <ul className="mt-5 space-y-3.5">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link className="group inline-flex items-center gap-1 text-sm text-[#55434C] transition-colors hover:text-[#8A1238] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238]" href={link.href}>
                    {link.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-12 lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#8A1238]">Follow along</h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-[#66545D]">
              Fresh looks, thoughtful details, and ideas worth saving.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (opens in a new tab)"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5A001F]/15 bg-white text-[#5A001F] transition-colors hover:border-[#5A001F] hover:bg-[#5A001F] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8A1238]"
              >
                <InstagramMark />
              </a>
              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest (opens in a new tab)"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5A001F]/15 bg-white text-[#5A001F] transition-colors hover:border-[#5A001F] hover:bg-[#5A001F] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8A1238]"
              >
                <PinterestMark />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-[#76636B] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RoopSetu. Made for moments that matter.</p>
          <a href="#" className="w-fit transition-colors hover:text-[#8A1238] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8A1238]">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export { LuxuryFooter };
