"use client";

import { useEffect, useRef, useState } from "react";
import { clearAuthSession, getStoredAuthUser, type AuthUser } from "@/lib/auth";
import DesktopNavbar from "@/components/home/Navbar/DesktopNavbar";
import LoginModal from "@/components/home/Navbar/LoginModal";
import MobileMenu from "@/components/home/Navbar/MobileMenu";
import MobileNavbar from "@/components/home/Navbar/MobileNavbar";
import {
  NAV_ITEMS,
  type BeauticianProfileActionLabel,
} from "@/components/home/Navbar/config";
const DASHBOARD_CACHE_KEY_PREFIX = "roopsetu-beautician-dashboard";
const DASHBOARD_CACHE_TTL_MS = 10 * 60 * 1000;

type DashboardSnapshot = {
  cachedAt: number;
  meta?: {
    steps?: Array<unknown>;
  } | null;
  profile?: {
    completion?: {
      completedSteps?: number;
      percentage?: number;
    } | null;
  } | null;
};

const getDashboardCacheKey = (userId: string) =>
  `${DASHBOARD_CACHE_KEY_PREFIX}:${userId}`;

const getBeauticianProfileActionLabel = (
  authUser: AuthUser | null,
): BeauticianProfileActionLabel | null => {
  if (authUser?.role !== "BEAUTICIAN") {
    return null;
  }

  if (authUser.profileCompleted) {
    return "My Profile";
  }

  if (typeof window === "undefined" || !authUser.id) {
    return "Profile Setup";
  }

  const raw = window.localStorage.getItem(getDashboardCacheKey(authUser.id));

  if (!raw) {
    return "Profile Setup";
  }

  try {
    const snapshot = JSON.parse(raw) as DashboardSnapshot;

    if (
      !snapshot?.cachedAt ||
      Date.now() - snapshot.cachedAt > DASHBOARD_CACHE_TTL_MS
    ) {
      return "Profile Setup";
    }

    const completedSteps = snapshot.profile?.completion?.completedSteps || 0;
    const percentage = snapshot.profile?.completion?.percentage || 0;
    const totalSteps = snapshot.meta?.steps?.length || 0;

    if (percentage >= 100 || (totalSteps > 0 && completedSteps >= totalSteps)) {
      return "My Profile";
    }

    if (percentage > 0 || completedSteps > 0) {
      return "Continue Setup";
    }
  } catch {}

  return "Profile Setup";
};

export default function Navbar() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const mobileProfileMenuRef = useRef<HTMLDivElement | null>(null);
  const desktopProfileMenuRef = useRef<HTMLDivElement | null>(null);
  const beauticianProfileActionLabel =
    getBeauticianProfileActionLabel(authUser);

  const handleLoginSuccess = async (user: AuthUser) => {
    setAuthUser(user);
    setIsProfileMenuOpen(false);
    setIsLoginOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    window.setTimeout(() => {
      setIsMenuMounted(false);
    }, 280);
  };

  const handleLogout = () => {
    clearAuthSession();
    setAuthUser(null);
    setIsProfileMenuOpen(false);
    closeMenu();
  };

  const openMenu = () => {
    setIsProfileMenuOpen(false);
    setIsMenuMounted(true);
    window.requestAnimationFrame(() => {
      setIsMenuOpen(true);
    });
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const openLogin = () => {
    if (isMenuMounted) {
      closeMenu();
    }
    setIsLoginOpen(true);
  };

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setAuthUser(getStoredAuthUser());
    });

    const handleStorage = () => {
      setAuthUser(getStoredAuthUser());
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !mobileProfileMenuRef.current?.contains(event.target as Node) &&
        !desktopProfileMenuRef.current?.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isLoginOpen && !isMenuMounted) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLoginOpen(false);
        if (isMenuMounted) {
          closeMenu();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLoginOpen, isMenuMounted]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#5A001F] px-3 pb-2 pt-3 sm:px-4 lg:px-5">
        <nav className="relative mx-auto flex h-[54px] w-full items-center justify-between rounded-[8px] border border-[#D4AF37]/75 bg-[#FFF8F3] px-3 shadow-[0_8px_24px_rgba(33,4,15,0.16)] sm:px-5 lg:h-[70px] lg:px-6">
          <MobileNavbar
            authUser={authUser}
            beauticianProfileActionLabel={beauticianProfileActionLabel}
            isMenuOpen={isMenuOpen}
            isProfileMenuOpen={isProfileMenuOpen}
            mobileProfileMenuRef={mobileProfileMenuRef}
            onOpenLogin={openLogin}
            onToggleMenu={toggleMenu}
            onToggleProfileMenu={() =>
              setIsProfileMenuOpen((current) => !current)
            }
            onCloseProfileMenu={() => setIsProfileMenuOpen(false)}
            onLogout={handleLogout}
          />

          <DesktopNavbar
            authUser={authUser}
            beauticianProfileActionLabel={beauticianProfileActionLabel}
            navItems={NAV_ITEMS}
            isProfileMenuOpen={isProfileMenuOpen}
            isLoginOpen={isLoginOpen}
            desktopProfileMenuRef={desktopProfileMenuRef}
            onOpenLogin={openLogin}
            onToggleProfileMenu={() =>
              setIsProfileMenuOpen((current) => !current)
            }
            onCloseProfileMenu={() => setIsProfileMenuOpen(false)}
            onLogout={handleLogout}
          />
        </nav>
      </header>

      {isMenuMounted ? (
        <MobileMenu
          authUser={authUser}
          beauticianProfileActionLabel={beauticianProfileActionLabel}
          navItems={NAV_ITEMS}
          isMenuOpen={isMenuOpen}
          onCloseMenu={closeMenu}
          onLogout={handleLogout}
        />
      ) : null}

      {isLoginOpen ? (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : null}
    </>
  );
}
