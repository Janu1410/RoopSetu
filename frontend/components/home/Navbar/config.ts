export type BeauticianProfileActionLabel =
  "Profile Setup" | "Continue Setup" | "My Profile";

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
  isComingSoon?: boolean;
};

export const getBeauticianProfileHref = (
  label: BeauticianProfileActionLabel | null,
) => {
  if (!label) {
    return "/become-beautician";
  }

  return label === "My Profile"
    ? "/become-beautician"
    : "/become-beautician/setup";
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Ethnic Rentals", href: "/rentals" },
  { label: "Beauty Guide", href: "/beauty-guide" },
  { label: "Become Partner", href: "/become-beautician" },
];

