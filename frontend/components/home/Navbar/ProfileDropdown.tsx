import Link from "next/link";
import type { AuthUser } from "@/lib/auth";
import { getBeauticianProfileHref } from "@/components/home/Navbar/config";

type ProfileDropdownProps = {
  authUser: AuthUser;
  beauticianProfileActionLabel:
    "Profile Setup" | "Continue Setup" | "My Profile" | null;
  minWidthClassName: string;
  onClose: () => void;
  onLogout: () => void;
};

export default function ProfileDropdown({
  authUser,
  beauticianProfileActionLabel,
  minWidthClassName,
  onClose,
  onLogout,
}: ProfileDropdownProps) {
  return (
    <div
      className={`premium-reveal absolute right-0 top-[calc(100%+0.7rem)] z-50 ${minWidthClassName} overflow-hidden rounded-2xl border border-[#EBD6DD] bg-white shadow-[0_18px_50px_rgba(90,0,31,0.14)]`}
    >
      <div className="border-b border-[#F3E4E8] px-4 py-3">
        <p className="text-sm font-semibold text-[#5A001F]">
          {[authUser.firstName, authUser.lastName].filter(Boolean).join(" ") ||
            "RoopSetu User"}
        </p>
        <p className="mt-1 text-xs text-[#836E78]">{authUser.email}</p>
      </div>

      <div className="p-2">
        {authUser.role === "BEAUTICIAN" && beauticianProfileActionLabel ? (
          <Link
            href={getBeauticianProfileHref(beauticianProfileActionLabel)}
            className="premium-interactive flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-[#4A3341] transition-colors hover:bg-[#FFF3F6] hover:text-[#8A1238]"
            onClick={onClose}
          >
            <span>{beauticianProfileActionLabel}</span>
            <span className="text-[#B68091]">&rarr;</span>
          </Link>
        ) : null}

        <button
          type="button"
          className="premium-interactive mt-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium text-[#4A3341] transition-colors hover:bg-[#FFF3F6] hover:text-[#8A1238]"
          onClick={onLogout}
        >
          <span>Logout</span>
          <span className="text-[#B68091]">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
