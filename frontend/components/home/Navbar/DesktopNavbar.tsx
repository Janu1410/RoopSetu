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
          className="block h-auto w-[160px] max-w-none object-contain lg:w-[178px]"
          priority
        />
      </Link>

      <ul className="hidden items-center gap-7 lg:flex h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.label} className="h-full flex items-center relative">
              <Link
                href={item.href}
                className={`premium-interactive text-[0.95rem] font-medium transition-colors duration-200 hover:text-[#8A1238] ${
                  isActive ? "text-[#8A1238]" : "text-[#334155]"
                }`}
              >
                {item.label}
              </Link>
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8A1238] rounded-t-sm" />
              )}
            </li>
          );
        })}
      </ul>

      <div className="hidden items-center gap-4 lg:flex">
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
          className="inline-flex h-6 w-6 items-center justify-center text-[#8A1238] transition-opacity hover:opacity-75"
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
