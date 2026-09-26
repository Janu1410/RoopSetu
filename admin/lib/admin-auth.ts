"use client";

export type AdminUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role?: "ADMIN" | null;
};

export type DashboardUser = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  role: "CLIENT" | "BEAUTICIAN";
  profileCompleted: boolean;
  isEmailVerified: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

export type DashboardBeautician = {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  isEmailVerified: boolean;
  userCreatedAt: string | null;
  userUpdatedAt: string | null;
  city: string;
  area: string;
  languages: string[];
  gender?: string | null;
  dateOfBirth?: string | null;
  primaryCategory: string;
  experienceYears: number;
  workType: string;
  salonName?: string | null;
  serviceLocation: string;
  travelRadius: number;
  workingDays: string[];
  startTime?: string | null;
  endTime?: string | null;
  verificationStatus: "PENDING" | "VERIFIED" | "REJECTED";
  profileCompleted: boolean;
  about: string;
  profilePhoto?: string | null;
  portfolioPreview?: string | null;
  businessName?: string | null;
  businessAddress?: string | null;
  gstNumber?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  website?: string | null;
  pinterest?: string | null;
  governmentIdType?: string | null;
  governmentIdUrl?: string | null;
  selfieUrl?: string | null;
  serviceCount: number;
  certificateCount: number;
  featuredServices: Array<{
    id: string;
    name: string;
    price: number;
    duration: string;
    description?: string | null;
  }>;
  portfolioItems: Array<{
    id: string;
    imageUrl: string;
    title?: string | null;
    category?: string | null;
  }>;
  certificates: Array<{
    id: string;
    title: string;
    fileUrl: string;
  }>;
  createdAt: string | null;
  updatedAt: string | null;
};

export type AdminDashboardData = {
  summary: {
    totalUsers: number;
    totalBeauticians: number;
    verifiedBeauticians: number;
    pendingBeauticianVerification: number;
  };
  users: DashboardUser[];
  beauticians: DashboardBeautician[];
};

type AdminLoginResponse = {
  message: string;
  token: string;
  user: AdminUser;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

const ADMIN_TOKEN_KEY = "roopsetu-admin-token";
const ADMIN_USER_KEY = "roopsetu-admin-user";

const apiRequest = async <TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const json = (await response.json().catch(() => null)) as
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(json?.message || "Request failed.");
  }

  return json as TResponse;
};

export const loginAdmin = async (email: string, password: string) =>
  apiRequest<AdminLoginResponse>("/api/auth/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const fetchAdminDashboard = async (token: string) =>
  apiRequest<AdminDashboardData>("/api/admin/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const storeAdminSession = (token: string, user: AdminUser) => {
  window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
  window.localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
};

export const clearAdminSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_USER_KEY);
};

export const getStoredAdminToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const getStoredAdminUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(ADMIN_USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    window.localStorage.removeItem(ADMIN_USER_KEY);
    return null;
  }
};
