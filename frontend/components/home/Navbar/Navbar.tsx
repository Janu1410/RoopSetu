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
      <header className="premium-reveal-soft sticky top-0 z-40 border-b border-[#F1DDDE] bg-[#FFF8F3]/90 backdrop-blur-md">
        <nav className="relative mx-auto flex h-[62px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[68px] lg:px-6">
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
