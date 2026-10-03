import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import type { AuthUser } from "@/lib/auth";
import ProfileDropdown from "@/components/home/Navbar/ProfileDropdown";
import CitySelector from "@/components/home/Navbar/CitySelector";
import type { BeauticianProfileActionLabel } from "@/components/home/Navbar/config";

type MobileNavbarProps = {
  authUser: AuthUser | null;
  beauticianProfileActionLabel: BeauticianProfileActionLabel | null;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  isMenuOpen: boolean;
  isProfileMenuOpen: boolean;
  mobileProfileMenuRef: RefObject<HTMLDivElement | null>;
  onOpenLogin: () => void;
  onToggleMenu: () => void;
  onToggleProfileMenu: () => void;
  onCloseProfileMenu: () => void;
  onLogout: () => void;
};

export default function MobileNavbar({
  authUser,
  beauticianProfileActionLabel,
  selectedCity,
  onSelectCity,
  isMenuOpen,
  isProfileMenuOpen,
  mobileProfileMenuRef,
  onOpenLogin,
  onToggleMenu,
  onToggleProfileMenu,
  onCloseProfileMenu,
  onLogout,
}: MobileNavbarProps) {
  return (
    <>
      <div className="flex items-center lg:hidden">
        <button
          type="button"
          onClick={onToggleMenu}
          className="premium-interactive inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E7D3D6] bg-white text-[#8A1238]"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            {isMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      <Link
        href="/"
        className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center lg:hidden"
      >
        <Image
          src="/roopsetu-wordmark.png"
          alt="RoopSetu logo"
          width={1100}
          height={300}
          className="block h-auto w-[124px] max-w-none object-contain sm:w-[136px]"
          priority
        />
      </Link>

      <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
        {/* Compact Location Icon Only (Beside Login) */}
        <CitySelector
          selectedCity={selectedCity}
          onSelectCity={onSelectCity}
          variant="mobile-icon-only"
        />
        {authUser ? (
          <div className="relative" ref={mobileProfileMenuRef}>
            <button
              type="button"
              className="premium-interactive inline-flex items-center justify-center text-[#8A1238] transition-opacity hover:opacity-75"
              aria-label="Profile menu"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              onClick={onToggleProfileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="8" r="4" />
              </svg>
            </button>

            {isProfileMenuOpen ? (
              <ProfileDropdown
                authUser={authUser}
                beauticianProfileActionLabel={beauticianProfileActionLabel}
                minWidthClassName="min-w-[240px]"
                onClose={onCloseProfileMenu}
                onLogout={onLogout}
              />
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            className="premium-interactive inline-flex items-center justify-center bg-transparent px-0 text-xs sm:text-sm font-semibold text-[#6C4A59] transition-colors duration-200 hover:text-[#8A1238]"
            onClick={onOpenLogin}
          >
            Login
          </button>
        )}

        <Link
          href="/liked"
          className="premium-interactive inline-flex items-center justify-center text-[#8A1238] transition-opacity hover:opacity-75"
          aria-label="Liked profiles"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </Link>
      </div>
    </>
  );
}

