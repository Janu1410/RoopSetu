import { apiRequest } from "@/lib/api";

export type UserRole = "CLIENT" | "BEAUTICIAN";

export type AuthUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  role?: UserRole | "ADMIN" | null;
  profileCompleted?: boolean;
  isEmailVerified?: boolean;
};

type VerifyOtpResponse =
  | {
      message: string;
      isNewUser: false;
      profileCompleted: true;
      token: string;
      user: AuthUser;
    }
  | {
      message: string;
      isNewUser: boolean;
      profileCompleted: false;
      needRoleSelection: boolean;
      userId: string;
      email: string;
    };

type CompleteProfileResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

const AUTH_USER_KEY = "roopsetu-auth-user";
const AUTH_TOKEN_KEY = "roopsetu-auth-token";

const readJson = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
};

const authRequest = async <TResponse>(
  path: string,
  body: Record<string, unknown>,
): Promise<TResponse> =>
  apiRequest<TResponse>(`/api/auth${path}`, {
    method: "POST",
    body,
  });

export const sendOtp = async (email: string) =>
  authRequest<{ message: string }>("/send-otp", { email });

export const verifyOtp = async (email: string, otp: string) =>
  authRequest<VerifyOtpResponse>("/verify-otp", { email, otp });

export const completeProfile = async (input: {
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
}) => authRequest<CompleteProfileResponse>("/complete-profile", input);

export const storeAuthSession = (token: string, user: AuthUser) => {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
};

export const getStoredAuthUser = () => readJson<AuthUser>(AUTH_USER_KEY);

export const getStoredAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getUserInitials = (user: AuthUser) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

  if (fullName) {
    return fullName
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }

  return user.email.slice(0, 2).toUpperCase();
};
