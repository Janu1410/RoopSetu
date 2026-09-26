import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AuthUser } from "@/lib/auth";
import {
  getBeauticianProfileHref,
  type BeauticianProfileActionLabel,
  type NavItem,
} from "@/components/home/Navbar/config";

type MobileMenuProps = {
  authUser: AuthUser | null;
  beauticianProfileActionLabel: BeauticianProfileActionLabel | null;
  navItems: NavItem[];
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onLogout: () => void;
};

export default function MobileMenu({
  authUser,
  beauticianProfileActionLabel,
  navItems,
  isMenuOpen,
  onCloseMenu,
  onLogout,
}: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 z-[60] flex justify-end lg:hidden">
      <button
        type="button"
        className={`absolute inset-0 bg-[#2D1020]/35 backdrop-blur-[2px] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close navigation menu"
        onClick={onCloseMenu}
      />

      <div
        className={`relative h-full overflow-y-auto border-l border-[#EEDBDD] bg-[#FFF8F3] shadow-[-24px_0_60px_rgba(90,0,31,0.2)] transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "66.6667vw", maxWidth: "420px" }}
      >
        <div className="flex min-h-full flex-col px-5 pb-8 pt-5">
          <div className="flex items-start justify-between border-b border-[#EEDBDD] pb-5">
            <div>
              <Image
                src="/roopsetu-wordmark.png"
                alt="RoopSetu logo"
                width={1100}
                height={300}
                className="h-[32px] w-auto max-w-none object-contain"
              />
            </div>

            <button
              type="button"
              onClick={onCloseMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E7D3D6] bg-white text-[#8A1238]"
              aria-label="Close navigation menu"
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
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {authUser ? (
            <div className="mt-5 rounded-2xl border border-[#E7D3D6] bg-white p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#8A1238] text-sm font-semibold text-white">
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
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#5A001F]">
                    {[authUser.firstName, authUser.lastName]
                      .filter(Boolean)
                      .join(" ") || "RoopSetu User"}
                  </p>
                  <p className="text-xs text-[#8C7280]">{authUser.email}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {authUser.role === "BEAUTICIAN" &&
                beauticianProfileActionLabel ? (
                  <Link
                    href={getBeauticianProfileHref(
                      beauticianProfileActionLabel,
                    )}
                    className="inline-flex items-center justify-between rounded-xl border border-[#F0D7DE] px-3 py-3 text-sm font-semibold text-[#8A1238]"
                    onClick={onCloseMenu}
                  >
                    <span>{beauticianProfileActionLabel}</span>
                    <span>&rarr;</span>
                  </Link>
                ) : null}

                <button
                  type="button"
                  className="inline-flex items-center justify-between rounded-xl border border-[#F0D7DE] px-3 py-3 text-sm font-semibold text-[#8A1238]"
                  onClick={onLogout}
                >
                  <span>Logout</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          ) : null}

          <div
            className={`${authUser ? "mt-8" : "mt-6"} flex flex-col gap-5 text-[#334155]`}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[1.15rem] transition-colors hover:text-[#8A1238] ${
                    isActive ? "text-[#8A1238] font-bold" : "font-medium"
                  }`}
                  onClick={onCloseMenu}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
