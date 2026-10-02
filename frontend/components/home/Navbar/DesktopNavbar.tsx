import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import type { AuthUser } from "@/lib/auth";
import ProfileDropdown from "@/components/home/Navbar/ProfileDropdown";
import type {
  BeauticianProfileActionLabel,
  NavItem,
} from "@/components/home/Navbar/config";

type DesktopNavbarProps = {
  authUser: AuthUser | null;
  beauticianProfileActionLabel: BeauticianProfileActionLabel | null;
  navItems: NavItem[];
  isProfileMenuOpen: boolean;
  isLoginOpen: boolean;
  desktopProfileMenuRef: RefObject<HTMLDivElement | null>;
  onOpenLogin: () => void;
  onToggleProfileMenu: () => void;
  onCloseProfileMenu: () => void;
  onLogout: () => void;
};

export default function DesktopNavbar({
  authUser,
  beauticianProfileActionLabel,
  navItems,
  isProfileMenuOpen,
  isLoginOpen,
  desktopProfileMenuRef,
  onOpenLogin,
  onToggleProfileMenu,
  onCloseProfileMenu,
  onLogout,
}: DesktopNavbarProps) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        className="premium-reveal hidden shrink-0 items-center lg:inline-flex"
      >
        <Image
          src="/roopsetu-wordmark.png"
          alt="RoopSetu logo"
          width={1100}
          height={300}
          className="block h-auto w-[160px] max-w-none object-contain lg:w-[190px] xl:w-[205px]"
          priority
        />
      </Link>

      <ul className="hidden h-full items-stretch border-l border-[#8A1238]/20 lg:flex">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isPartnerLink = item.href === "/become-partner";
          return (
            <li
              key={item.label}
              className="relative flex h-full items-center border-r border-[#8A1238]/20"
            >
              <Link
                href={item.href}
                className={`premium-interactive flex h-full items-center px-3.5 text-[0.68rem] font-bold uppercase tracking-[0.045em] transition-colors duration-200 xl:px-5 xl:text-[0.75rem] ${
                  isPartnerLink
                    ? "bg-[#5A001F] text-white hover:bg-[#741235]"
                    : isActive
                      ? "bg-[#F1D494] text-[#5A001F]"
                      : "text-[#5A001F] hover:bg-[#F9F0E4]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden h-full items-center gap-2 pl-3 lg:flex xl:gap-3 xl:pl-4">
        {authUser ? (
          <div className="relative" ref={desktopProfileMenuRef}>
            <button
              type="button"
              className="premium-interactive inline-flex h-6 w-6 items-center justify-center text-[#8A1238] transition-opacity hover:opacity-75"
              aria-label="Profile"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              title={authUser.email}
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
                minWidthClassName="min-w-[250px]"
                onClose={onCloseProfileMenu}
                onLogout={onLogout}
              />
            ) : null}
          </div>
        ) : (
          <button
            type="button"
            className="premium-interactive inline-flex items-center justify-center bg-transparent px-0 text-sm font-semibold text-[#6C4A59] transition-colors duration-200 hover:text-[#8A1238] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A1238]"
            aria-haspopup="dialog"
            aria-expanded={isLoginOpen}
            onClick={onOpenLogin}
          >
            Login
          </button>
        )}

        <Link
          href="/liked"
          className="premium-interactive inline-flex h-9 w-9 items-center justify-center rounded-sm text-[#8A1238] transition-colors hover:bg-[#F8E9EC]"
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
