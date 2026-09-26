"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearAdminSession,
  fetchAdminDashboard,
  getStoredAdminToken,
  getStoredAdminUser,
  type AdminDashboardData,
  type DashboardBeautician,
  type DashboardUser,
} from "@/lib/admin-auth";

type SectionName =
  | "Dashboard"
  | "Users"
  | "Beauticians"
  | "Verification"
  | "Reports"
  | "Settings";

type NavItem = {
  label: SectionName;
  badge?: string;
  icon: "grid" | "user" | "calendar" | "wallet" | "star" | "shield";
};

const navItems: readonly NavItem[] = [
  { label: "Dashboard", icon: "grid" },
  { label: "Users", icon: "user" },
  { label: "Beauticians", icon: "user" },
  { label: "Verification", icon: "shield", badge: "1" },
  { label: "Reports", icon: "star" },
  { label: "Settings", icon: "wallet" },
] as const;

const formatDate = (value: string | null) => {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const getUserDisplayName = (user: DashboardUser) =>
  [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unnamed user";

const getInitials = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const getStatusTone = (tone: "good" | "warn" | "bad") => {
  if (tone === "good") {
    return "bg-[#EEF8F1] text-[#1F6D41]";
  }

  if (tone === "bad") {
    return "bg-[#FFF0F2] text-[#A01F3E]";
  }

  return "bg-[#FFF4E7] text-[#9A5A0D]";
};

const getBeauticianTone = (beautician: DashboardBeautician): "good" | "warn" | "bad" => {
  if (beautician.verificationStatus === "VERIFIED") {
    return "good";
  }

  if (beautician.verificationStatus === "REJECTED") {
    return "bad";
  }

  return "warn";
};

const sectionDescriptions: Record<SectionName, string> = {
  Dashboard: "A quick look at platform activity and admin actions.",
  Users: "Registered user information from the shared backend.",
  Beauticians: "Real beautician profiles with full onboarding information.",
  Verification: "Review pending profile and verification steps here.",
  Reports: "Platform reports and simple business insights will be shown here.",
  Settings: "Admin settings and account preferences will be managed here.",
};

function Icon({ name, className }: { name: NavItem["icon"] | "bell" | "message"; className?: string }) {
  if (name === "grid") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
        <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    );
  }

  if (name === "wallet") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a3 3 0 0 1 0 6H5.5A2.5 2.5 0 0 1 3 8.5Z" />
        <path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <circle cx="18" cy="8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.2 6.4 20.2l1.1-6.2L3 9.6l6.2-.9Z" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M12 3 5 6v6c0 5 3.4 8 7 9 3.6-1 7-4 7-9V6Z" />
        <path d="m9.5 12 1.7 1.7 3.3-3.7" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
        <path d="M6 17h12l-1.4-1.6A2 2 0 0 1 16 14V11a4 4 0 1 0-8 0v3a2 2 0 0 1-.6 1.4Z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M4 5h16v10H7l-3 3Z" />
    </svg>
  );
}

function SectionShell({
  kicker,
  title,
  description,
  children,
}: {
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-[30px] border border-[#F0DADF] bg-[linear-gradient(180deg,#FFFDFD_0%,#FFF4F7_100%)] p-6 shadow-[0_16px_36px_rgba(90,0,31,0.05)]">
        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#AA7B8A]">
          {kicker}
        </p>
        <h2 className="mt-3 font-serif text-[2rem] leading-tight text-[#5A001F] sm:text-[2.65rem]">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#73606A] sm:text-base">
          {description}
        </p>
      </div>

      {children}
    </div>
  );
}

function DashboardOverview({ summary }: { summary: AdminDashboardData["summary"] }) {
  return (
    <SectionShell
      kicker="Dashboard"
      title="Admin overview"
      description="This admin area now follows the same RoopSetu dashboard mood with a cleaner shell, softer cards, and a more familiar layout."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Users", value: summary.totalUsers },
          { label: "Beauticians", value: summary.totalBeauticians },
          { label: "Verified", value: summary.verifiedBeauticians },
          { label: "Pending", value: summary.pendingBeauticianVerification },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-[24px] border border-[#F1DDE3] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]"
          >
            <p className="text-sm font-medium text-[#8A7781]">{item.label}</p>
            <p className="mt-3 text-[2rem] font-semibold text-[#8A1238]">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[#F1DDE3] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]">
          <p className="text-sm font-semibold text-[#5A2034]">Users section</p>
          <p className="mt-3 text-sm leading-7 text-[#6D5963]">
            Open user information to review simple registered user details.
          </p>
        </div>
        <div className="rounded-[24px] border border-[#F1DDE3] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]">
          <p className="text-sm font-semibold text-[#5A2034]">Beauticians section</p>
          <p className="mt-3 text-sm leading-7 text-[#6D5963]">
            Open beautician profiles to review their full onboarding information.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function UsersSection({ users }: { users: DashboardUser[] }) {
  return (
    <SectionShell
      kicker="Users"
      title="User information"
      description="Simple user details from the shared backend."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {users.map((user) => (
          <article
            key={user.id}
            className="rounded-[24px] border border-[#F1DDE3] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#FDE3EB_0%,#F7DDE2_100%)] text-lg font-semibold text-[#8A1238]">
                {getInitials(getUserDisplayName(user))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-[#2D2230]">
                    {getUserDisplayName(user)}
                  </h3>
                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusTone(
                      user.profileCompleted ? "good" : "warn",
                    )}`}
                  >
                    {user.profileCompleted ? "Profile complete" : "Setup pending"}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm leading-6 text-[#6D5963]">
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone || "Not added"}</p>
                  <p>Role: {user.role}</p>
                  <p>Email verified: {user.isEmailVerified ? "Yes" : "No"}</p>
                  <p>Created: {formatDate(user.createdAt)}</p>
                  <p>Updated: {formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function BeauticiansSection({ beauticians }: { beauticians: DashboardBeautician[] }) {
  return (
    <SectionShell
      kicker="Beauticians"
      title="Beautician information"
      description="Real beautician profiles with their whole onboarding details."
    >
      <div className="space-y-4">
        {beauticians.map((beautician) => (
          <article
            key={beautician.id}
            className="overflow-hidden rounded-[28px] border border-[#F0DADF] bg-white shadow-[0_18px_36px_rgba(90,0,31,0.06)]"
          >
            <div className="border-b border-[#F1DDE3] bg-[#FFFDFD] p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(160deg,#FDE3EB_0%,#F7DDE2_100%)] text-lg font-semibold text-[#8A1238]">
                    {getInitials(beautician.fullName)}
                  </div>
                  <div>
                    <h3 className="text-[1.45rem] font-semibold text-[#2D2230]">
                      {beautician.fullName}
                    </h3>
                    <p className="mt-1 text-sm text-[#5A4451]">{beautician.primaryCategory}</p>
                    <p className="mt-1 text-sm text-[#5A4451]">{beautician.email}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold ${getStatusTone(
                      getBeauticianTone(beautician),
                    )}`}
                  >
                    {beautician.verificationStatus}
                  </span>
                  <span
                    className={`inline-flex rounded-full px-3 py-2 text-xs font-semibold ${
                      beautician.profileCompleted
                        ? "bg-[#EEF8F1] text-[#1F6D41]"
                        : "bg-[#FFF4E7] text-[#9A5A0D]"
                    }`}
                  >
                    {beautician.profileCompleted ? "Profile complete" : "In progress"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-5 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF9FA_100%)] p-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[18px] border border-[#F3E4E8] bg-[#FFFCFD] px-4 py-3 text-sm text-[#5A4451]">
                  {beautician.city}, {beautician.area}
                </div>
                <div className="rounded-[18px] border border-[#F3E4E8] bg-[#FFFCFD] px-4 py-3 text-sm text-[#5A4451]">
                  {beautician.experienceYears} years experience
                </div>
                <div className="rounded-[18px] border border-[#F3E4E8] bg-[#FFFCFD] px-4 py-3 text-sm text-[#5A4451]">
                  {beautician.serviceCount} services
                </div>
                <div className="rounded-[18px] border border-[#F3E4E8] bg-[#FFFCFD] px-4 py-3 text-sm text-[#5A4451]">
                  {beautician.certificateCount} certificates
                </div>
              </div>

              <div className="rounded-[20px] bg-[#FFF8FA] px-4 py-4 text-sm leading-7 text-[#6D5963]">
                {beautician.about}
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Basic Info</p>
                  <div className="mt-3 grid gap-2 text-sm leading-6 text-[#6D5963]">
                    <p>Phone: {beautician.phone || "Not added"}</p>
                    <p>Gender: {beautician.gender || "Not added"}</p>
                    <p>DOB: {formatDate(beautician.dateOfBirth || null)}</p>
                    <p>Languages: {beautician.languages.join(", ") || "Not added"}</p>
                    <p>Email verified: {beautician.isEmailVerified ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Work Details</p>
                  <div className="mt-3 grid gap-2 text-sm leading-6 text-[#6D5963]">
                    <p>Salon: {beautician.salonName || "Not added"}</p>
                    <p>Work type: {beautician.workType}</p>
                    <p>Service location: {beautician.serviceLocation}</p>
                    <p>Travel radius: {beautician.travelRadius} km</p>
                    <p>Working days: {beautician.workingDays.join(", ") || "Not added"}</p>
                    <p>
                      Timing: {beautician.startTime || "--"} to {beautician.endTime || "--"}
                    </p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Business & Verification</p>
                  <div className="mt-3 grid gap-2 text-sm leading-6 text-[#6D5963]">
                    <p>Business: {beautician.businessName || "Not added"}</p>
                    <p>Address: {beautician.businessAddress || "Not added"}</p>
                    <p>GST: {beautician.gstNumber || "Not added"}</p>
                    <p>ID type: {beautician.governmentIdType || "Not added"}</p>
                    <p>Created: {formatDate(beautician.createdAt)}</p>
                    <p>Updated: {formatDate(beautician.updatedAt)}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Social Links</p>
                  <div className="mt-3 grid gap-2 break-all text-sm leading-6 text-[#6D5963]">
                    <p>Instagram: {beautician.instagram || "Not added"}</p>
                    <p>Facebook: {beautician.facebook || "Not added"}</p>
                    <p>YouTube: {beautician.youtube || "Not added"}</p>
                    <p>Website: {beautician.website || "Not added"}</p>
                    <p>Pinterest: {beautician.pinterest || "Not added"}</p>
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Uploaded Links</p>
                  <div className="mt-3 grid gap-2 break-all text-sm leading-6 text-[#6D5963]">
                    <p>Profile photo: {beautician.profilePhoto || "Not added"}</p>
                    <p>Government ID: {beautician.governmentIdUrl || "Not added"}</p>
                    <p>Selfie: {beautician.selfieUrl || "Not added"}</p>
                    <p>Portfolio preview: {beautician.portfolioPreview || "Not added"}</p>
                  </div>
                </div>
              </div>

              {beautician.featuredServices.length ? (
                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Services</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {beautician.featuredServices.map((service) => (
                      <span
                        key={service.id}
                        className="inline-flex rounded-full border border-[#F0D7DD] bg-[#FFF8FA] px-3 py-2 text-xs font-semibold text-[#7C4A5F]"
                      >
                        {service.name} | Rs. {service.price} | {service.duration}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {beautician.portfolioItems.length ? (
                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Portfolio Items</p>
                  <div className="mt-3 grid gap-2 break-all text-sm leading-6 text-[#6D5963]">
                    {beautician.portfolioItems.map((item) => (
                      <p key={item.id}>
                        {item.title || "Untitled"} | {item.category || "No category"} |{" "}
                        {item.imageUrl}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              {beautician.certificates.length ? (
                <div className="rounded-[22px] border border-[#F1DDE3] bg-white p-4">
                  <p className="text-sm font-semibold text-[#5A2034]">Certificates</p>
                  <div className="mt-3 grid gap-2 break-all text-sm leading-6 text-[#6D5963]">
                    {beautician.certificates.map((item) => (
                      <p key={item.id}>
                        {item.title} | {item.fileUrl}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function PlaceholderSection({ title }: { title: SectionName }) {
  return (
    <SectionShell
      kicker={title}
      title={`${title} section`}
      description={sectionDescriptions[title]}
    >
      <div className="rounded-[24px] border border-[#F1DDE3] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]">
        <p className="text-sm leading-7 text-[#6D5963]">{sectionDescriptions[title]}</p>
      </div>
    </SectionShell>
  );
}

export default function AdminDashboardShell() {
  const router = useRouter();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState<SectionName>("Dashboard");

  useEffect(() => {
    const token = getStoredAdminToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    const run = async () => {
      try {
        const result = await fetchAdminDashboard(token);
        setData(result);
      } catch (unknownError) {
        clearAdminSession();
        if (unknownError instanceof Error) {
          setError(unknownError.message);
        } else {
          setError("Failed to load dashboard.");
        }
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [router]);

  const adminUser = getStoredAdminUser();

  if (loading) {
    return (
      <main className="min-h-dvh bg-[#FFF9FA] px-4 py-6">
        <div className="mx-auto mt-28 w-full max-w-md rounded-[24px] border border-[#efdde2] bg-white/90 px-6 py-5 text-center text-[#5a001f] shadow-[0_18px_40px_rgba(90,0,31,0.08)]">
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-dvh bg-[#FFF9FA] px-4 py-6">
        <div className="mx-auto mt-28 w-full max-w-md rounded-[24px] border border-[#efdde2] bg-white/90 px-6 py-5 text-center text-[#5a001f] shadow-[0_18px_40px_rgba(90,0,31,0.08)]">
          {error || "Dashboard data is unavailable."}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#FFF9FA]">
      <div className="grid min-h-dvh grid-cols-1 xl:grid-cols-[335px_minmax(0,1fr)]">
        <aside className="border-r border-[#F0DADF] bg-white">
          <div className="border-b border-[#F0DADF] px-8 py-8">
            <h1 className="font-serif text-[2.8rem] leading-none text-[#8A1238]">RoopSetu</h1>
          </div>

          <div className="h-[calc(100dvh-6.95rem)] overflow-y-auto px-6 py-6">
            <nav className="grid gap-3">
              {navItems.map((item) => {
                const active = activeSection === item.label;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveSection(item.label)}
                    className={`flex items-center gap-4 rounded-[18px] px-5 py-4 text-left text-[1rem] font-semibold transition ${
                      active
                        ? "bg-[linear-gradient(135deg,#8A1238_0%,#A61E4A_100%)] text-white shadow-[0_18px_32px_rgba(138,18,56,0.18)]"
                        : "text-[#49566D] hover:bg-[#FFF7FA]"
                    }`}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      <Icon
                        name={item.icon}
                        className={`h-5 w-5 ${active ? "text-white" : "text-[#49566D]"}`}
                      />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span
                        className={`inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs font-semibold ${
                          active ? "bg-white/16 text-white" : "bg-[#FFF0F5] text-[#C42E5D]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 rounded-[24px] border border-[#F1DDE3] bg-[#FFFDFD] p-5">
              <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-[#AA7B8A]">
                Signed In As
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(160deg,#FDE3EB_0%,#F7DDE2_100%)] text-lg font-semibold text-[#8A1238]">
                  {getInitials(
                    [adminUser?.firstName, adminUser?.lastName].filter(Boolean).join(" ") ||
                      "RA",
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#2D2230]">
                    {[adminUser?.firstName, adminUser?.lastName].filter(Boolean).join(" ") ||
                      "RoopSetu Admin"}
                  </p>
                  <p className="truncate text-sm text-[#77646D]">
                    {adminUser?.email || "admin@roopsetu.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="flex items-center justify-between border-b border-[#F0DADF] bg-[#FFFDFD] px-5 py-5 sm:px-7">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#AA7B8A]">
                RoopSetu Admin
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[#2D2230]">{activeSection}</h2>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F1DDE3] text-[#8A1238] transition hover:bg-[#FFF4F7]"
              >
                <Icon name="bell" className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#F1DDE3] text-[#8A1238] transition hover:bg-[#FFF4F7]"
              >
                <Icon name="message" className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 rounded-full border border-[#F1DDE3] bg-white px-3 py-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(160deg,#FDE3EB_0%,#F7DDE2_100%)] text-sm font-semibold text-[#8A1238]">
                  {getInitials(
                    [adminUser?.firstName, adminUser?.lastName].filter(Boolean).join(" ") ||
                      "RA",
                  )}
                </div>
                <span className="hidden pr-1 text-sm font-semibold text-[#6B5A64] sm:inline">
                  {getInitials(
                    [adminUser?.firstName, adminUser?.lastName].filter(Boolean).join(" ") ||
                      "Admin",
                  )}
                </span>
              </div>
            </div>
          </header>

          <div className="px-5 py-6 sm:px-7">
            {activeSection === "Dashboard" ? <DashboardOverview summary={data.summary} /> : null}
            {activeSection === "Users" ? <UsersSection users={data.users} /> : null}
            {activeSection === "Beauticians" ? (
              <BeauticiansSection beauticians={data.beauticians} />
            ) : null}
            {activeSection === "Verification" ? <PlaceholderSection title="Verification" /> : null}
            {activeSection === "Reports" ? <PlaceholderSection title="Reports" /> : null}
            {activeSection === "Settings" ? <PlaceholderSection title="Settings" /> : null}

            <div className="mt-6">
              <button
                type="button"
                className="rounded-[16px] border border-[#E7CAD3] bg-white px-5 py-3 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6]"
                onClick={() => {
                  clearAdminSession();
                  router.push("/login");
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
