"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  ArrowLeft,
  BadgeCheck,
  BadgeHelp,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CalendarRange,
  Check,
  ChevronDown,
  Eye,
  IndianRupee,
  LayoutDashboard,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Camera,
  LogOut,
  Plus,
  Upload,
  Heart,
  Settings,
  Star,
  Tag,
  Trash2,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import {
  DateField,
  DatalistField,
  Field,
  SelectField,
  TextAreaField,
  TimeField,
} from "@/components/become-beautician/dashboard/DashboardFormFields";
import {
  GalleryUploadModal,
  ProfilePhotoEditorModal,
} from "@/components/become-beautician/dashboard/DashboardModals";
import {
  clearAuthSession,
  getStoredAuthToken,
  getStoredAuthUser,
  storeAuthSession,
  getUserInitials,
  type AuthUser,
} from "@/lib/auth";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:5000";

type SidebarItem = {
  label: string;
  icon: typeof LayoutDashboard;
  active?: boolean;
  badge?: string;
};

const sidebarItems: readonly SidebarItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "My Profile", icon: UserRound, active: true },
  { label: "Bookings", icon: CalendarDays },
  { label: "Calendar", icon: CalendarRange },
  { label: "Earnings", icon: Wallet },
  { label: "Reviews", icon: Star },
  { label: "Clients", icon: UserRound },
  { label: "Messages", icon: MessageSquare, badge: "2" },
  { label: "Promotions", icon: Tag },
  { label: "Payouts", icon: IndianRupee },
  { label: "Settings", icon: Settings },
  { label: "Help & Support", icon: BadgeHelp },
] as const;

type StepId = 1 | 2 | 3 | 4 | 5 | 6;

const defaultSteps: ReadonlyArray<{
  id: StepId;
  key:
    | "aboutYou"
    | "yourExpertise"
    | "servicesAndPricing"
    | "workGallery"
    | "availability"
    | "getVerified";
  title: string;
}> = [
  { id: 1, key: "aboutYou", title: "About You" },
  { id: 2, key: "yourExpertise", title: "Your Expertise" },
  { id: 3, key: "servicesAndPricing", title: "Services & Pricing" },
  { id: 4, key: "workGallery", title: "Work Gallery" },
  { id: 5, key: "availability", title: "Availability" },
  { id: 6, key: "getVerified", title: "Get Verified" },
];

const defaultSavedStepCompletions: Record<StepId, boolean> = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
};

const defaultBenefits = [
  "Higher visibility in search results",
  "Build trust with verification",
  "Get more booking requests",
  "Grow your business with RoopSetu",
] as const;

const defaultSuggestedLanguages = ["Gujarati", "Hindi", "English"] as const;
const defaultSuggestedServiceNames = [
  "Bridal Makeup",
  "Party Makeup",
  "Engagement Makeup",
  "Reception Makeup",
  "Airbrush Makeup",
  "HD Makeup",
  "Hair Styling",
  "Bridal Hairstyling",
  "Saree Draping",
  "Mehendi",
  "Arabic Mehendi",
  "Nail Art",
  "Gel Nails",
  "Manicure",
  "Pedicure",
  "Facial",
  "Cleanup",
  "Waxing",
  "Threading",
  "Hair Cut",
  "Hair Spa",
  "Hair Color",
  "Keratin Treatment",
] as const;
const defaultWorkingDayOptions = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
const defaultWorkTypeOptions = ["Freelance", "Salon based", "Both"] as const;
const defaultGalleryCategoryOptions = [
  "Bridal",
  "Party",
  "Mehndi",
  "Hair",
  "Nail",
  "Before & After",
] as const;
const defaultGalleryFilterOptions = [
  "All",
  "Bridal Makeup",
  "Hair Styling",
  "Mehendi",
  "Nail Art",
  "Party Makeup",
  "Before & After",
] as const;

const normalizeGalleryCategoryKey = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (normalized === "bridal" || normalized === "bridal makeup") {
    return "bridal makeup";
  }
  if (normalized === "hair" || normalized === "hair styling") {
    return "hair styling";
  }
  if (normalized === "mehndi" || normalized === "mehendi") {
    return "mehendi";
  }
  if (normalized === "nail" || normalized === "nail art") {
    return "nail art";
  }
  if (normalized === "party" || normalized === "party makeup") {
    return "party makeup";
  }

  return normalized;
};

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\d{10,15}$/, "Enter a valid phone number.");

const emailSchema = z.string().trim().email("Enter a valid email address.");
const requiredTextSchema = (label: string) =>
  z.string().trim().min(1, `${label} is required.`);

const basicInfoSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  phone: phoneSchema,
  email: emailSchema,
  gender: requiredTextSchema("Gender"),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, "Date of birth is required.")
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Enter a valid date of birth.",
    ),
  city: z.string().trim().min(2, "City is required."),
  area: z.string().trim().min(2, "Area / Locality is required."),
  languages: z.array(z.string().trim()).min(1, "Add at least one language."),
});

const expertiseSchema = z.object({
  primaryCategory: z
    .string()
    .trim()
    .min(2, "Professional category is required."),
  experienceYears: z
    .string()
    .trim()
    .min(1, "Experience years is required.")
    .refine((value) => /^\d+$/.test(value), "Enter valid experience years.")
    .refine((value) => Number(value) >= 0, "Experience cannot be negative."),
  workType: requiredTextSchema("Work type"),
  about: z
    .string()
    .trim()
    .min(10, "Tell clients a little more about your work."),
});

const serviceRowSchema = z.object({
  name: z.string().trim().min(1, "Service name is required."),
  price: z
    .string()
    .trim()
    .min(1, "Price is required.")
    .refine(
      (value) => /^\d+$/.test(value.replace(/,/g, "")),
      "Enter a valid price.",
    ),
  duration: z.string().trim().min(1, "Duration is required."),
  description: z.string().trim().optional(),
});

const galleryDraftSchema = z.object({
  title: z.string().trim().min(1, "Add a name for this work."),
  category: z.string().trim().min(1, "Select a category."),
  uploadedPreviewUrl: z
    .string()
    .trim()
    .min(1, "Choose a photo or video first."),
});

const availabilitySchema = z.object({
  workingDays: z.array(z.string()).min(1, "Select at least one working day."),
  startTime: requiredTextSchema("Start time"),
  endTime: requiredTextSchema("End time"),
  serviceLocation: requiredTextSchema("Service location"),
  travelRadius: z
    .string()
    .trim()
    .min(1, "Travel radius is required.")
    .refine((value) => /^\d+$/.test(value), "Enter a valid travel radius."),
});

const verificationSchema = z.object({
  certificateTitle: z.string().trim().min(1, "Certificate title is required."),
  certificateFileUrl: z.string().trim().min(1, "Certificate file is required."),
  instagram: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) =>
        !value ||
        /^@?[a-zA-Z0-9._]{2,30}$/.test(value) ||
        /^https?:\/\//i.test(value),
      "Enter a valid Instagram handle or URL.",
    ),
  facebook: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: "Enter a valid Facebook URL.",
    }),
  youtube: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: "Enter a valid YouTube URL.",
    }),
  website: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: "Enter a valid website URL.",
    }),
  pinterest: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https?:\/\//i.test(value), {
      message: "Enter a valid Pinterest URL.",
    }),
});

type StepMeta = {
  id: StepId;
  key:
    | "aboutYou"
    | "yourExpertise"
    | "servicesAndPricing"
    | "workGallery"
    | "availability"
    | "getVerified";
  title: string;
};

type CompletionWeights = {
  aboutYou: number;
  profilePhoto: number;
  yourExpertise: number;
  servicesAndPricing: number;
  workGallery: number;
  availability: number;
  getVerified: number;
};

type BeauticianProfileMetaResponse = {
  steps: StepMeta[];
  benefits: string[];
  options: {
    suggestedLanguages: string[];
    serviceNames: string[];
    workTypes: string[];
    workingDays: string[];
    galleryCategories: string[];
    galleryFilters: string[];
  };
  completionWeights: CompletionWeights;
};

type ProfileApiErrorResponse = {
  message?: string;
  errors?: Record<string, string>;
};

const PROFILE_PHOTO_EDITOR_SIZE = 248;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const isPreviewableImageSource = (value: string) =>
  /^(data:image|blob:|https?:\/\/|\/)/i.test(value);

const convertImageFileToPreviewDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        reject(new Error("Failed to read image file."));
        return;
      }

      const image = new window.Image();
      image.onload = () => {
        const maxSide = 1200;
        const scale = Math.min(
          1,
          maxSide / Math.max(image.naturalWidth, image.naturalHeight),
        );
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Failed to prepare image preview."));
          return;
        }

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => {
        reject(new Error("Failed to load image file."));
      };
      image.src = result;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read image file."));
    };

    reader.readAsDataURL(file);
  });

type GalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  type: "Photo" | "Video";
  previewUrl: string;
  objectUrl?: string;
};

type BeauticianProfileResponse = {
  profile: {
    user?: {
      email: string;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      role?: AuthUser["role"];
      profileCompleted?: boolean;
      isEmailVerified?: boolean;
    };
    profilePhoto?: string | null;
    gender?: string | null;
    dateOfBirth?: string | null;
    city?: string;
    area?: string;
    languages?: string[];
    primaryCategory?: string;
    experienceYears?: number | null;
    workType?: string;
    salonName?: string | null;
    about?: string;
    serviceLocation?: string;
    travelRadius?: number | null;
    workingDays?: string[];
    startTime?: string | null;
    endTime?: string | null;
    instagram?: string | null;
    facebook?: string | null;
    youtube?: string | null;
    website?: string | null;
    pinterest?: string | null;
    services?: Array<{
      name: string;
      price: number;
      duration: string;
      description?: string | null;
    }>;
    portfolio?: Array<{
      imageUrl: string;
      title?: string | null;
      category?: string | null;
    }>;
    certificates?: Array<{
      title: string;
      fileUrl: string;
    }>;
    completion?: {
      completedSteps: number;
      percentage: number;
      profilePhotoUploaded?: boolean;
      weights?: CompletionWeights;
      stepStates: {
        aboutYou: boolean;
        yourExpertise: boolean;
        servicesAndPricing: boolean;
        workGallery: boolean;
        availability: boolean;
        getVerified: boolean;
      };
    };
  } | null;
};

type DashboardBootstrapResponse = {
  meta: BeauticianProfileMetaResponse;
  profile: BeauticianProfileResponse["profile"];
};

type DashboardSnapshot = {
  cachedAt: number;
  meta: {
    steps: BeauticianProfileMetaResponse["steps"];
  };
  profile: {
    completion: BeauticianProfileResponse["profile"] extends infer T
      ? T extends { completion?: infer C }
        ? C | null
        : null
      : null;
  };
};

const DASHBOARD_CACHE_KEY_PREFIX = "roopsetu-beautician-dashboard";
const DASHBOARD_CACHE_TTL_MS = 10 * 60 * 1000;

const getDashboardCacheKey = (userId: string) =>
  `${DASHBOARD_CACHE_KEY_PREFIX}:${userId}`;

const readDashboardSnapshot = (userId: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(getDashboardCacheKey(userId));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as DashboardSnapshot;

    if (
      !parsed?.cachedAt ||
      Date.now() - parsed.cachedAt > DASHBOARD_CACHE_TTL_MS
    ) {
      window.localStorage.removeItem(getDashboardCacheKey(userId));
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(getDashboardCacheKey(userId));
    return null;
  }
};

const writeDashboardSnapshot = (
  userId: string,
  meta: BeauticianProfileMetaResponse,
  profile: BeauticianProfileResponse["profile"],
) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(
      getDashboardCacheKey(userId),
      JSON.stringify({
        cachedAt: Date.now(),
        meta: {
          steps: meta.steps,
        },
        profile: {
          completion: profile?.completion ?? null,
        },
      } satisfies DashboardSnapshot),
    );
  } catch {
    window.localStorage.removeItem(getDashboardCacheKey(userId));
  }
};

function createServiceRow() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    price: "",
    duration: "",
    description: "",
  };
}

function getDisplayName(user: AuthUser | null) {
  const fullName = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || "Your Name";
}

export default function ProfileCompletionDashboard() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isSessionHydrated, setIsSessionHydrated] = useState(false);
  const displayName = getDisplayName(authUser);
  const initials = authUser ? getUserInitials(authUser) : "RS";
  const [activeStep, setActiveStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileStepViewOpen, setIsMobileStepViewOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);
  const [selectedGalleryFilter, setSelectedGalleryFilter] = useState("All");
  const formSectionRef = useRef<HTMLElement | null>(null);
  const [profileMeta, setProfileMeta] = useState<BeauticianProfileMetaResponse>(
    {
      steps: [...defaultSteps],
      benefits: [...defaultBenefits],
      options: {
        suggestedLanguages: [...defaultSuggestedLanguages],
        serviceNames: [...defaultSuggestedServiceNames],
        workTypes: [...defaultWorkTypeOptions],
        workingDays: [...defaultWorkingDayOptions],
        galleryCategories: [...defaultGalleryCategoryOptions],
        galleryFilters: [...defaultGalleryFilterOptions],
      },
      completionWeights: {
        aboutYou: 10,
        profilePhoto: 5,
        yourExpertise: 15,
        servicesAndPricing: 20,
        workGallery: 25,
        availability: 10,
        getVerified: 15,
      },
    },
  );

  const [basicInfo, setBasicInfo] = useState({
    profilePhoto: "",
    fullName: displayName === "Your Name" ? "" : displayName,
    phone: authUser?.phone || "",
    email: authUser?.email || "",
    gender: "",
    dateOfBirth: "",
    city: "",
    area: "",
    languageSearch: "",
    languages: [] as string[],
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    primaryCategory: "",
    experienceYears: "",
    workType: "",
    salonName: "",
    about: "",
  });
  const [servicesInfo, setServicesInfo] = useState([createServiceRow()]);
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>([]);
  const [expandedServiceIds, setExpandedServiceIds] = useState<string[]>(() =>
    servicesInfo.map((service) => service.id),
  );
  const [portfolioInfo, setPortfolioInfo] = useState({
    title: "",
    category: "",
    mediaType: "Photo" as "Photo" | "Video",
    uploadedFileName: "",
    uploadedPreviewUrl: "",
  });
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [availabilityInfo, setAvailabilityInfo] = useState({
    workingDays: [] as string[],
    startTime: "",
    endTime: "",
    serviceLocation: "",
    travelRadius: "",
  });
  const [verificationInfo, setVerificationInfo] = useState({
    certificateTitle: "",
    certificateFileUrl: "",
    instagram: "",
    facebook: "",
    youtube: "",
    website: "",
    pinterest: "",
  });
  const profilePhotoInputRef = useRef<HTMLInputElement | null>(null);
  const galleryUploadInputRef = useRef<HTMLInputElement | null>(null);
  const galleryUploadMenuRef = useRef<HTMLDivElement | null>(null);
  const certificateFileInputRef = useRef<HTMLInputElement | null>(null);
  const profilePhotoEditorFrameRef = useRef<HTMLDivElement | null>(null);
  const hasLocalEditsRef = useRef(false);
  const profilePhotoDragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const pendingGalleryPreviewRef = useRef("");
  const [isGalleryUploadOpen, setIsGalleryUploadOpen] = useState(false);
  const [isGalleryUploadMenuOpen, setIsGalleryUploadMenuOpen] = useState(false);
  const [isProfilePhotoEditorOpen, setIsProfilePhotoEditorOpen] =
    useState(false);
  const [profilePhotoEditorSize, setProfilePhotoEditorSize] = useState(
    PROFILE_PHOTO_EDITOR_SIZE,
  );
  const [profilePhotoDraft, setProfilePhotoDraft] = useState({
    src: "",
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    naturalWidth: 0,
    naturalHeight: 0,
  });
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileNotice, setProfileNotice] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [savedStepCompletions, setSavedStepCompletions] = useState(
    defaultSavedStepCompletions,
  );
  const [savedCompletion, setSavedCompletion] = useState({
    completedSteps: 0,
    percentage: 0,
    profilePhotoUploaded: false,
  });

  useEffect(() => {
    const syncAuthState = () => {
      setAuthUser(getStoredAuthUser());
      setAuthToken(getStoredAuthToken());
      setIsSessionHydrated(true);
    };

    const frameId = window.requestAnimationFrame(syncAuthState);
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("[data-profile-menu-root='true']")) {
        setIsProfileMenuOpen(false);
      }
      if (
        galleryUploadMenuRef.current &&
        !galleryUploadMenuRef.current.contains(event.target as Node)
      ) {
        setIsGalleryUploadMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateBasicInfo = (
    key: keyof typeof basicInfo,
    value: string | string[],
  ) => {
    hasLocalEditsRef.current = true;
    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`basicInfo.${String(key)}`];
      return next;
    });
    setBasicInfo((previous) => ({ ...previous, [key]: value }));
  };

  const handleLogout = () => {
    clearAuthSession();
    setAuthUser(null);
    setAuthToken(null);
    setIsProfileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const openGalleryUploadFlow = (type: "Photo" | "Video") => {
    setPortfolioInfo((previous) => {
      if (
        previous.mediaType === type &&
        previous.title === "" &&
        previous.category === "" &&
        previous.uploadedFileName === "" &&
        previous.uploadedPreviewUrl === ""
      ) {
        return previous;
      }

      if (
        previous.uploadedPreviewUrl &&
        previous.uploadedPreviewUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previous.uploadedPreviewUrl);
      }

      return {
        title: "",
        category: "",
        mediaType: type,
        uploadedFileName: "",
        uploadedPreviewUrl: "",
      };
    });
    setIsGalleryUploadMenuOpen(false);
    setIsGalleryUploadOpen(true);
  };
  const updateProfessionalInfo = (
    key: keyof typeof professionalInfo,
    value: string,
  ) => {
    hasLocalEditsRef.current = true;
    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`professionalInfo.${String(key)}`];
      return next;
    });
    setProfessionalInfo((previous) => ({ ...previous, [key]: value }));
  };
  const updateServiceRow = (
    id: string,
    key: keyof (typeof servicesInfo)[number],
    value: string,
  ) => {
    hasLocalEditsRef.current = true;
    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`servicesInfo.${id}.${String(key)}`];
      delete next["servicesInfo.root"];
      return next;
    });
    setServicesInfo((previous) =>
      previous.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };
  const addServiceRow = () => {
    hasLocalEditsRef.current = true;
    const newRow = createServiceRow();
    setServicesInfo((previous) => [...previous, newRow]);
    setExpandedServiceIds((previous) => [...previous, newRow.id]);
  };
  const removeServiceRow = (id: string) => {
    hasLocalEditsRef.current = true;
    setServicesInfo((previous) =>
      previous.length > 1 ? previous.filter((row) => row.id !== id) : previous,
    );
    setSavedServiceIds((previous) => previous.filter((item) => item !== id));
    setExpandedServiceIds((previous) => previous.filter((item) => item !== id));
  };
  const saveServiceRow = (id: string) => {
    hasLocalEditsRef.current = true;
    if (!validateServiceRow(id)) {
      setProfileNotice("Please fix the service fields highlighted below.");
      return;
    }
    setSavedServiceIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
    setExpandedServiceIds((previous) => previous.filter((item) => item !== id));
  };
  const editServiceRow = (id: string) => {
    hasLocalEditsRef.current = true;
    setExpandedServiceIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
  };
  const updatePortfolioInfo = (
    key: keyof typeof portfolioInfo,
    value: string,
  ) => {
    hasLocalEditsRef.current = true;
    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`portfolioInfo.${String(key)}`];
      delete next["portfolioInfo.root"];
      return next;
    });
    setPortfolioInfo((previous) => ({ ...previous, [key]: value }));
  };
  const handleGalleryMediaTypeChange = (type: "Photo" | "Video") => {
    setPortfolioInfo((previous) => {
      if (
        previous.uploadedPreviewUrl &&
        previous.uploadedPreviewUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(previous.uploadedPreviewUrl);
      }

      return {
        title: "",
        category: "",
        mediaType: type,
        uploadedFileName: "",
        uploadedPreviewUrl: "",
      };
    });
  };
  const updateAvailabilityInfo = (
    key: keyof typeof availabilityInfo,
    value: string | string[],
  ) => {
    hasLocalEditsRef.current = true;
    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`availabilityInfo.${String(key)}`];
      return next;
    });
    setAvailabilityInfo((previous) => ({ ...previous, [key]: value }));
  };
  const updateVerificationInfo = (
    key: keyof typeof verificationInfo,
    value: string,
  ) => {
    hasLocalEditsRef.current = true;
    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`verificationInfo.${String(key)}`];
      return next;
    });
    setVerificationInfo((previous) => ({ ...previous, [key]: value }));
  };
  const hasText = (value: string) => value.trim().length > 0;
  const mapZodIssues = (
    prefix: string,
    issues: { path: PropertyKey[]; message: string }[],
  ) =>
    issues.map((issue) => ({
      path: `${prefix}.${issue.path.join(".")}`,
      message: issue.message,
    }));

  const validateServiceRow = (serviceId: string) => {
    const row = servicesInfo.find((service) => service.id === serviceId);

    if (!row) {
      return true;
    }

    const parsed = serviceRowSchema.safeParse(row);

    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next[`servicesInfo.${serviceId}.name`];
      delete next[`servicesInfo.${serviceId}.price`];
      delete next[`servicesInfo.${serviceId}.duration`];
      delete next[`servicesInfo.${serviceId}.description`];

      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          next[`servicesInfo.${serviceId}.${issue.path.join(".")}`] =
            issue.message;
        }
      }

      return next;
    });

    return parsed.success;
  };

  const validateGalleryDraft = () => {
    const parsed = galleryDraftSchema.safeParse(portfolioInfo);

    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next["portfolioInfo.title"];
      delete next["portfolioInfo.category"];
      delete next["portfolioInfo.uploadedPreviewUrl"];

      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          next[`portfolioInfo.${issue.path.join(".")}`] = issue.message;
        }
      }

      return next;
    });

    return parsed.success;
  };

  const validateActiveStep = () => {
    if (activeStep === 1) {
      const parsed = basicInfoSchema.safeParse({
        fullName: basicInfo.fullName,
        phone: basicInfo.phone,
        email: basicInfo.email,
        gender: basicInfo.gender,
        dateOfBirth: basicInfo.dateOfBirth,
        city: basicInfo.city,
        area: basicInfo.area,
        languages: basicInfo.languages,
      });

      setFieldErrors((previous) => {
        const next = { ...previous };
        for (const key of [
          "basicInfo.fullName",
          "basicInfo.phone",
          "basicInfo.email",
          "basicInfo.gender",
          "basicInfo.dateOfBirth",
          "basicInfo.city",
          "basicInfo.area",
          "basicInfo.languages",
        ]) {
          delete next[key];
        }
        if (!parsed.success) {
          for (const issue of mapZodIssues("basicInfo", parsed.error.issues)) {
            next[issue.path] = issue.message;
          }
        }
        return next;
      });

      return parsed.success;
    }

    if (activeStep === 2) {
      const parsed = expertiseSchema.safeParse(professionalInfo);

      setFieldErrors((previous) => {
        const next = { ...previous };
        for (const key of [
          "professionalInfo.primaryCategory",
          "professionalInfo.experienceYears",
          "professionalInfo.workType",
          "professionalInfo.about",
        ]) {
          delete next[key];
        }
        if (!parsed.success) {
          for (const issue of mapZodIssues(
            "professionalInfo",
            parsed.error.issues,
          )) {
            next[issue.path] = issue.message;
          }
        }
        return next;
      });

      return parsed.success;
    }

    if (activeStep === 3) {
      const startedRows = servicesInfo.filter((service) =>
        [
          service.name,
          service.price,
          service.duration,
          service.description,
        ].some((value) => hasText(value)),
      );

      const nextIssues: Array<{ path: string; message: string }> = [];

      if (startedRows.length === 0) {
        nextIssues.push({
          path: "servicesInfo.root",
          message: "Add at least one service before continuing.",
        });
      }

      for (const row of startedRows) {
        const parsed = serviceRowSchema.safeParse(row);
        if (!parsed.success) {
          for (const issue of parsed.error.issues) {
            nextIssues.push({
              path: `servicesInfo.${row.id}.${issue.path.join(".")}`,
              message: issue.message,
            });
          }
        }
      }

      setFieldErrors((previous) => {
        const next = Object.fromEntries(
          Object.entries(previous).filter(
            ([key]) => !key.startsWith("servicesInfo."),
          ),
        );
        for (const issue of nextIssues) {
          next[issue.path] = issue.message;
        }
        return next;
      });

      return nextIssues.length === 0;
    }

    if (activeStep === 4) {
      if (visibleGalleryItems.length > 0) {
        setFieldErrors((previous) =>
          Object.fromEntries(
            Object.entries(previous).filter(
              ([key]) => !key.startsWith("portfolioInfo."),
            ),
          ),
        );
        return true;
      }

      const validDraft = validateGalleryDraft();

      if (!validDraft) {
        setFieldErrors((previous) => ({
          ...previous,
          "portfolioInfo.root":
            "Complete this upload first, then add it to the gallery.",
        }));
      }

      return false;
    }

    if (activeStep === 5) {
      const parsed = availabilitySchema.safeParse(availabilityInfo);

      setFieldErrors((previous) => {
        const next = { ...previous };
        for (const key of [
          "availabilityInfo.workingDays",
          "availabilityInfo.startTime",
          "availabilityInfo.endTime",
          "availabilityInfo.serviceLocation",
          "availabilityInfo.travelRadius",
        ]) {
          delete next[key];
        }
        if (!parsed.success) {
          for (const issue of mapZodIssues(
            "availabilityInfo",
            parsed.error.issues,
          )) {
            next[issue.path] = issue.message;
          }
        }
        return next;
      });

      return parsed.success;
    }

    if (activeStep === 6) {
      const parsed = verificationSchema.safeParse(verificationInfo);

      setFieldErrors((previous) => {
        const next = { ...previous };
        for (const key of [
          "verificationInfo.certificateTitle",
          "verificationInfo.certificateFileUrl",
          "verificationInfo.instagram",
          "verificationInfo.facebook",
          "verificationInfo.youtube",
          "verificationInfo.website",
          "verificationInfo.pinterest",
        ]) {
          delete next[key];
        }
        if (!parsed.success) {
          for (const issue of mapZodIssues(
            "verificationInfo",
            parsed.error.issues,
          )) {
            next[issue.path] = issue.message;
          }
        }
        return next;
      });

      return parsed.success;
    }

    return true;
  };

  const applyBackendFieldErrors = (errors?: Record<string, string>) => {
    if (!errors) {
      return;
    }

    const mapped = Object.entries(errors).reduce<Record<string, string>>(
      (accumulator, [key, value]) => {
        const nextKey =
          key === "fullName"
            ? "basicInfo.fullName"
            : key === "phone"
              ? "basicInfo.phone"
              : key === "email"
                ? "basicInfo.email"
                : key === "gender"
                  ? "basicInfo.gender"
                  : key === "dateOfBirth"
                    ? "basicInfo.dateOfBirth"
                    : key === "city"
                      ? "basicInfo.city"
                      : key === "area"
                        ? "basicInfo.area"
                        : key === "languages"
                          ? "basicInfo.languages"
                          : key === "primaryCategory"
                            ? "professionalInfo.primaryCategory"
                            : key === "experienceYears"
                              ? "professionalInfo.experienceYears"
                              : key === "workType"
                                ? "professionalInfo.workType"
                                : key === "about"
                                  ? "professionalInfo.about"
                                  : key === "serviceLocation"
                                    ? "availabilityInfo.serviceLocation"
                                    : key === "travelRadius"
                                      ? "availabilityInfo.travelRadius"
                                      : key === "workingDays"
                                        ? "availabilityInfo.workingDays"
                                        : key === "startTime"
                                          ? "availabilityInfo.startTime"
                                          : key === "endTime"
                                            ? "availabilityInfo.endTime"
                                            : key === "instagram"
                                              ? "verificationInfo.instagram"
                                              : key === "facebook"
                                                ? "verificationInfo.facebook"
                                                : key === "youtube"
                                                  ? "verificationInfo.youtube"
                                                  : key === "website"
                                                    ? "verificationInfo.website"
                                                    : key === "pinterest"
                                                      ? "verificationInfo.pinterest"
                                                      : key === "services"
                                                        ? "servicesInfo.root"
                                                        : key === "portfolio"
                                                          ? "portfolioInfo.root"
                                                          : key ===
                                                              "certificates"
                                                            ? "verificationInfo.certificateTitle"
                                                            : key;

        accumulator[nextKey] = value;
        return accumulator;
      },
      {},
    );

    setFieldErrors((previous) => ({ ...previous, ...mapped }));
  };

  const addLanguage = (language: string) => {
    const normalized = language.trim();
    if (!normalized || basicInfo.languages.includes(normalized)) {
      return;
    }
    updateBasicInfo("languages", [...basicInfo.languages, normalized]);
    updateBasicInfo("languageSearch", "");
  };

  const removeLanguage = (language: string) => {
    updateBasicInfo(
      "languages",
      basicInfo.languages.filter((item) => item !== language),
    );
  };

  const toggleWorkingDay = (day: string) => {
    const hasDay = availabilityInfo.workingDays.includes(day);
    updateAvailabilityInfo(
      "workingDays",
      hasDay
        ? availabilityInfo.workingDays.filter((item) => item !== day)
        : [...availabilityInfo.workingDays, day],
    );
  };

  const getProfilePhotoRenderMetrics = (
    size = profilePhotoEditorSize,
    scale = profilePhotoDraft.scale,
  ) => {
    if (!profilePhotoDraft.naturalWidth || !profilePhotoDraft.naturalHeight) {
      return {
        renderWidth: size,
        renderHeight: size,
        maxOffsetX: 0,
        maxOffsetY: 0,
      };
    }

    const coverScale = Math.max(
      size / profilePhotoDraft.naturalWidth,
      size / profilePhotoDraft.naturalHeight,
    );
    const renderWidth = profilePhotoDraft.naturalWidth * coverScale * scale;
    const renderHeight = profilePhotoDraft.naturalHeight * coverScale * scale;

    return {
      renderWidth,
      renderHeight,
      maxOffsetX: Math.max(0, (renderWidth - size) / 2),
      maxOffsetY: Math.max(0, (renderHeight - size) / 2),
    };
  };

  const resetProfilePhotoDraft = () => {
    setProfilePhotoDraft((previous) => ({
      ...previous,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
    }));
  };

  const openStep = (stepId: number) => {
    const shouldOpenSubmittedView =
      stepId === 6 &&
      savedCompletion.completedSteps >= profileMeta.steps.length;

    setIsProfileSubmitted(shouldOpenSubmittedView);
    setActiveStep(stepId);

    if (window.innerWidth < 1024) {
      setIsMobileStepViewOpen(true);
      return;
    }

    window.requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleProfilePhotoPick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        return;
      }

      const image = new window.Image();
      image.onload = () => {
        setProfilePhotoDraft({
          src: result,
          scale: 1,
          offsetX: 0,
          offsetY: 0,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        });
        setIsProfilePhotoEditorOpen(true);
      };
      image.src = result;
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleGalleryAssetPick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const commitPreviewUrl = (nextPreviewUrl: string) => {
      setFieldErrors((previous) => {
        const next = { ...previous };
        delete next["portfolioInfo.uploadedPreviewUrl"];
        delete next["portfolioInfo.root"];
        return next;
      });
      setPortfolioInfo((previous) => {
        if (
          previous.uploadedPreviewUrl &&
          previous.uploadedPreviewUrl.startsWith("blob:")
        ) {
          URL.revokeObjectURL(previous.uploadedPreviewUrl);
        }

        return {
          ...previous,
          title: previous.title || getFileNameWithoutExtension(file.name),
          uploadedFileName: file.name,
          uploadedPreviewUrl: nextPreviewUrl,
        };
      });
    };

    if (file.type.startsWith("image/")) {
      convertImageFileToPreviewDataUrl(file)
        .then((previewUrl) => {
          commitPreviewUrl(previewUrl);
        })
        .catch(() => {
          const fallbackObjectUrl = URL.createObjectURL(file);
          commitPreviewUrl(fallbackObjectUrl);
        });
      return;
    }

    commitPreviewUrl(URL.createObjectURL(file));
  };

  const handleCertificateFilePick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFieldErrors((previous) => {
      const next = { ...previous };
      delete next["verificationInfo.certificateFileUrl"];
      return next;
    });
    updateVerificationInfo("certificateFileUrl", file.name);
  };
  const isLikelyPreviewableMedia = (value: string) =>
    /^(https?:\/\/|data:|blob:|\/)/i.test(value);
  const getFileNameWithoutExtension = (fileName: string) =>
    fileName.replace(/\.[^/.]+$/, "").trim();
  const isRenderableGalleryItem = (item: GalleryItem) =>
    item.type === "Video"
      ? isLikelyPreviewableMedia(item.previewUrl)
      : isPreviewableImageSource(item.previewUrl);
  const inferGalleryItemType = (imageUrl: string): "Photo" | "Video" =>
    /\.(mp4|mov|webm|ogg)$/i.test(imageUrl) ? "Video" : "Photo";

  const profilePhotoPreview = isPreviewableImageSource(basicInfo.profilePhoto)
    ? basicInfo.profilePhoto
    : "";
  const isVideoUpload = portfolioInfo.mediaType === "Video";
  const galleryTypeLabel = isVideoUpload ? "video" : "photo";
  const galleryCategoryLabel = isVideoUpload
    ? "Video Category"
    : "Image Category";
  const galleryNameLabel = isVideoUpload ? "Video Name" : "Image Name";
  const galleryNamePlaceholder = isVideoUpload
    ? "Give this video a clear name"
    : "Give this image a clear name";
  const galleryDraftPreviewUrl = portfolioInfo.uploadedPreviewUrl.trim();
  const galleryPickerDescription = isVideoUpload
    ? "Upload short makeover, bridal, hair, mehndi, or nail videos."
    : "Upload your best bridal, party, mehndi, hair, or nail photos.";
  const galleryHasDraft = hasText(portfolioInfo.uploadedPreviewUrl);
  const visibleGalleryItems = galleryItems.filter(isRenderableGalleryItem);
  const filteredGalleryItems = visibleGalleryItems.filter((item) => {
    if (selectedGalleryFilter === "All") {
      return true;
    }

    return (
      normalizeGalleryCategoryKey(item.subtitle) ===
      normalizeGalleryCategoryKey(selectedGalleryFilter)
    );
  });
  const photoCount = visibleGalleryItems.filter(
    (item) => item.type === "Photo",
  ).length;
  const videoCount = visibleGalleryItems.filter(
    (item) => item.type === "Video",
  ).length;
  const totalGalleryViews = 0;
  const totalGalleryLikes = 0;

  const basicStepComplete =
    hasText(basicInfo.fullName) &&
    hasText(basicInfo.phone) &&
    hasText(basicInfo.email) &&
    hasText(basicInfo.gender) &&
    hasText(basicInfo.dateOfBirth) &&
    hasText(basicInfo.city) &&
    hasText(basicInfo.area) &&
    basicInfo.languages.length > 0;
  const basicStepTouched =
    hasText(basicInfo.fullName) ||
    hasText(basicInfo.phone) ||
    hasText(basicInfo.email) ||
    hasText(basicInfo.gender) ||
    hasText(basicInfo.dateOfBirth) ||
    hasText(basicInfo.city) ||
    hasText(basicInfo.area) ||
    basicInfo.languages.length > 0;

  const expertiseStepComplete =
    hasText(professionalInfo.primaryCategory) &&
    hasText(professionalInfo.experienceYears) &&
    hasText(professionalInfo.workType) &&
    hasText(professionalInfo.about);
  const expertiseStepTouched = Object.values(professionalInfo).some((value) =>
    hasText(value),
  );

  const validServiceRows = servicesInfo.filter(
    (service) =>
      hasText(service.name) &&
      hasText(service.price) &&
      hasText(service.duration),
  );
  const servicesStepComplete = validServiceRows.length > 0;
  const servicesStepTouched = servicesInfo.some(
    (service) =>
      hasText(service.name) ||
      hasText(service.price) ||
      hasText(service.duration) ||
      hasText(service.description),
  );

  const galleryStepComplete = visibleGalleryItems.length > 0;
  const galleryStepTouched =
    visibleGalleryItems.length > 0 ||
    hasText(portfolioInfo.title) ||
    hasText(portfolioInfo.category) ||
    hasText(portfolioInfo.uploadedFileName);

  const availabilityStepComplete =
    availabilityInfo.workingDays.length > 0 &&
    hasText(availabilityInfo.startTime) &&
    hasText(availabilityInfo.endTime) &&
    hasText(availabilityInfo.serviceLocation) &&
    hasText(availabilityInfo.travelRadius);
  const availabilityStepTouched =
    availabilityInfo.workingDays.length > 0 ||
    hasText(availabilityInfo.startTime) ||
    hasText(availabilityInfo.endTime) ||
    hasText(availabilityInfo.serviceLocation) ||
    hasText(availabilityInfo.travelRadius);

  const verificationStepComplete =
    hasText(verificationInfo.certificateTitle) &&
    hasText(verificationInfo.certificateFileUrl);
  const verificationStepTouched = Object.values(verificationInfo).some(
    (value) => hasText(value),
  );

  const getSavedCompletionFromProfile = useCallback(
    (profile: BeauticianProfileResponse["profile"]) => ({
      completedSteps: profile?.completion?.completedSteps || 0,
      percentage: profile?.completion?.percentage || 0,
      profilePhotoUploaded: Boolean(
        profile?.completion?.profilePhotoUploaded || profile?.profilePhoto,
      ),
    }),
    [],
  );

  const getSavedStepCompletionsFromProfile = useCallback(
    (
      profile: BeauticianProfileResponse["profile"],
    ): Record<StepId, boolean> => {
      if (profile?.completion?.stepStates) {
        return {
          1: profile.completion.stepStates.aboutYou,
          2: profile.completion.stepStates.yourExpertise,
          3: profile.completion.stepStates.servicesAndPricing,
          4: profile.completion.stepStates.workGallery,
          5: profile.completion.stepStates.availability,
          6: profile.completion.stepStates.getVerified,
        };
      }

      return {
        1:
          hasText(getDisplayName(profile?.user as AuthUser)) &&
          hasText(profile?.user?.phone || "") &&
          hasText(profile?.user?.email || "") &&
          hasText(profile?.gender || "") &&
          hasText(
            profile?.dateOfBirth
              ? new Date(profile.dateOfBirth).toISOString().slice(0, 10)
              : "",
          ) &&
          hasText(profile?.city || "") &&
          hasText(profile?.area || "") &&
          (profile?.languages || []).length > 0,
        2:
          hasText(profile?.primaryCategory || "") &&
          hasText(
            profile?.experienceYears !== null &&
              profile?.experienceYears !== undefined
              ? String(profile.experienceYears)
              : "",
          ) &&
          hasText(profile?.workType || "") &&
          hasText(profile?.about || ""),
        3: (profile?.services || []).length > 0,
        4: (profile?.portfolio || []).length > 0,
        5:
          (profile?.workingDays || []).length > 0 &&
          hasText(profile?.startTime || "") &&
          hasText(profile?.endTime || "") &&
          hasText(profile?.serviceLocation || "") &&
          hasText(
            profile?.travelRadius !== null &&
              profile?.travelRadius !== undefined
              ? String(profile.travelRadius)
              : "",
          ),
        6:
          hasText(profile?.certificates?.[0]?.title || "") &&
          hasText(profile?.certificates?.[0]?.fileUrl || ""),
      };
    },
    [],
  );

  const normalizeProfileMeta = useCallback(
    (
      meta: BeauticianProfileMetaResponse | null | undefined,
    ): BeauticianProfileMetaResponse => ({
      steps: meta?.steps?.length ? meta.steps : [...defaultSteps],
      benefits: meta?.benefits?.length ? meta.benefits : [...defaultBenefits],
      options: {
        suggestedLanguages: meta?.options?.suggestedLanguages?.length
          ? meta.options.suggestedLanguages
          : [...defaultSuggestedLanguages],
        serviceNames: meta?.options?.serviceNames?.length
          ? meta.options.serviceNames
          : [...defaultSuggestedServiceNames],
        workTypes: meta?.options?.workTypes?.length
          ? meta.options.workTypes
          : [...defaultWorkTypeOptions],
        workingDays: meta?.options?.workingDays?.length
          ? meta.options.workingDays
          : [...defaultWorkingDayOptions],
        galleryCategories: meta?.options?.galleryCategories?.length
          ? meta.options.galleryCategories
          : [...defaultGalleryCategoryOptions],
        galleryFilters: meta?.options?.galleryFilters?.length
          ? meta.options.galleryFilters
          : [...defaultGalleryFilterOptions],
      },
      completionWeights: meta?.completionWeights || {
        aboutYou: 10,
        profilePhoto: 5,
        yourExpertise: 15,
        servicesAndPricing: 20,
        workGallery: 25,
        availability: 10,
        getVerified: 15,
      },
    }),
    [],
  );

  const applyProfileData = useCallback(
    (
      profile: BeauticianProfileResponse["profile"],
      nextAuthUser?: AuthUser | null,
      options?: { syncAuthSession?: boolean },
    ) => {
      if (!profile) {
        return;
      }

      const syncAuthSession = options?.syncAuthSession ?? true;

      setHasExistingProfile(true);
      setSavedCompletion(getSavedCompletionFromProfile(profile));
      setBasicInfo((previous) => ({
        ...previous,
        fullName:
          getDisplayName(profile.user as AuthUser) === "Your Name"
            ? previous.fullName
            : getDisplayName(profile.user as AuthUser),
        phone: profile.user?.phone || previous.phone,
        email: profile.user?.email || previous.email,
        profilePhoto: profile.profilePhoto || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().slice(0, 10)
          : "",
        city: profile.city || "",
        area: profile.area || "",
        languages: profile.languages || [],
      }));
      setProfessionalInfo({
        primaryCategory: profile.primaryCategory || "",
        experienceYears:
          profile.experienceYears !== null &&
          profile.experienceYears !== undefined
            ? String(profile.experienceYears)
            : "",
        workType: profile.workType || "",
        salonName: profile.salonName || "",
        about: profile.about || "",
      });

      const loadedServices = profile.services?.length
        ? profile.services.map((service) => ({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: service.name || "",
            price: String(service.price ?? ""),
            duration: service.duration || "",
            description: service.description || "",
          }))
        : [createServiceRow()];

      setServicesInfo(loadedServices);
      setSavedServiceIds(
        profile.services?.length
          ? loadedServices.map((service) => service.id)
          : [],
      );
      setExpandedServiceIds([]);
      setAvailabilityInfo({
        workingDays: profile.workingDays || [],
        startTime: profile.startTime || "",
        endTime: profile.endTime || "",
        serviceLocation: profile.serviceLocation || "",
        travelRadius:
          profile.travelRadius !== null && profile.travelRadius !== undefined
            ? String(profile.travelRadius)
            : "",
      });
      setVerificationInfo({
        certificateTitle: profile.certificates?.[0]?.title || "",
        certificateFileUrl: profile.certificates?.[0]?.fileUrl || "",
        instagram: profile.instagram || "",
        facebook: profile.facebook || "",
        youtube: profile.youtube || "",
        website: profile.website || "",
        pinterest: profile.pinterest || "",
      });
      setGalleryItems(
        (profile.portfolio || []).map((item, index) => {
          const type = inferGalleryItemType(item.imageUrl);
          return {
            id: `loaded-gallery-${index}`,
            title: item.title || `${type} Upload`,
            subtitle: item.category || "",
            type,
            previewUrl: item.imageUrl,
          };
        }),
      );

      const loadedStepCompletions = getSavedStepCompletionsFromProfile(profile);
      setSavedStepCompletions(loadedStepCompletions);
      setIsProfileSubmitted(
        Boolean(profile.user?.profileCompleted) ||
          Object.values(loadedStepCompletions).every(Boolean),
      );

      if (profile.user && authToken && syncAuthSession) {
        const updatedUser: AuthUser = {
          id: nextAuthUser?.id || "",
          email: profile.user.email,
          firstName: profile.user.firstName,
          lastName: profile.user.lastName,
          phone: profile.user.phone,
          role: profile.user.role || nextAuthUser?.role || null,
          profileCompleted: profile.user.profileCompleted,
          isEmailVerified: profile.user.isEmailVerified,
        };
        setAuthUser(updatedUser);
        storeAuthSession(authToken, updatedUser);
      }
    },
    [
      authToken,
      getSavedCompletionFromProfile,
      getSavedStepCompletionsFromProfile,
    ],
  );

  useEffect(() => {
    if (!isSessionHydrated) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (authUser?.id) {
        const cachedSnapshot = readDashboardSnapshot(authUser.id);

        if (cachedSnapshot) {
          setProfileMeta(
            normalizeProfileMeta(
              cachedSnapshot.meta as BeauticianProfileMetaResponse,
            ),
          );

          const cachedCompletion = cachedSnapshot.profile.completion;
          if (cachedCompletion) {
            setSavedCompletion({
              completedSteps: cachedCompletion.completedSteps,
              percentage: cachedCompletion.percentage,
              profilePhotoUploaded: Boolean(
                cachedCompletion.profilePhotoUploaded,
              ),
            });
            setSavedStepCompletions({
              1: Boolean(cachedCompletion.stepStates?.aboutYou),
              2: Boolean(cachedCompletion.stepStates?.yourExpertise),
              3: Boolean(cachedCompletion.stepStates?.servicesAndPricing),
              4: Boolean(cachedCompletion.stepStates?.workGallery),
              5: Boolean(cachedCompletion.stepStates?.availability),
              6: Boolean(cachedCompletion.stepStates?.getVerified),
            });
          }

          setIsLoadingProfile(false);
          return;
        }
      }

      if (!authToken) {
        setIsLoadingProfile(false);
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [authToken, authUser, isSessionHydrated, normalizeProfileMeta]);

  const currentStepCompletions: Record<StepId, boolean> = {
    1: basicStepComplete,
    2: expertiseStepComplete,
    3: servicesStepComplete,
    4: galleryStepComplete,
    5: availabilityStepComplete,
    6: verificationStepComplete,
  };
  const steps = profileMeta.steps;
  const benefits = profileMeta.benefits;
  const suggestedLanguages = profileMeta.options.suggestedLanguages;
  const suggestedServiceNames = profileMeta.options.serviceNames;
  const workTypeOptions = profileMeta.options.workTypes;
  const workingDayOptions = profileMeta.options.workingDays;
  const galleryCategoryOptions = profileMeta.options.galleryCategories;
  const galleryFilterOptions = profileMeta.options.galleryFilters;
  const activeStepMeta =
    steps.find((step) => step.id === activeStep) ?? steps[0];

  const stepStates = {
    1:
      savedStepCompletions[1] && basicStepComplete
        ? "completed"
        : basicStepTouched
          ? "in-progress"
          : "pending",
    2:
      savedStepCompletions[2] && expertiseStepComplete
        ? "completed"
        : expertiseStepTouched
          ? "in-progress"
          : "pending",
    3:
      savedStepCompletions[3] && servicesStepComplete
        ? "completed"
        : servicesStepTouched
          ? "in-progress"
          : "pending",
    4:
      savedStepCompletions[4] && galleryStepComplete
        ? "completed"
        : galleryStepTouched
          ? "in-progress"
          : "pending",
    5:
      savedStepCompletions[5] && availabilityStepComplete
        ? "completed"
        : availabilityStepTouched
          ? "in-progress"
          : "pending",
    6:
      savedStepCompletions[6] && verificationStepComplete
        ? "completed"
        : verificationStepTouched
          ? "in-progress"
          : "pending",
  } as const;

  const completedSteps = savedCompletion.completedSteps;
  const progress = savedCompletion.percentage;
  const activeStepState = stepStates[activeStep as keyof typeof stepStates];

  const activeStepLabel =
    activeStepState === "completed"
      ? "Completed"
      : activeStepState === "in-progress"
        ? "In Progress"
        : "Pending";

  const handleSaveGalleryItem = () => {
    if (!validateGalleryDraft()) {
      setProfileNotice(
        "Please complete the gallery upload fields shown below.",
      );
      return;
    }

    const previewUrl = portfolioInfo.uploadedPreviewUrl.trim();

    if (!previewUrl) {
      return;
    }

    const newGalleryItem: GalleryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title:
        portfolioInfo.title.trim() ||
        getFileNameWithoutExtension(portfolioInfo.uploadedFileName) ||
        `${portfolioInfo.mediaType} Upload`,
      subtitle: portfolioInfo.category.trim(),
      type: portfolioInfo.mediaType,
      previewUrl,
      objectUrl: portfolioInfo.uploadedPreviewUrl || undefined,
    };

    setGalleryItems((previous) => [newGalleryItem, ...previous]);
    setPortfolioInfo({
      title: "",
      category: "",
      mediaType: portfolioInfo.mediaType,
      uploadedFileName: "",
      uploadedPreviewUrl: "",
    });
    setFieldErrors((previous) =>
      Object.fromEntries(
        Object.entries(previous).filter(
          ([key]) => !key.startsWith("portfolioInfo."),
        ),
      ),
    );
    setIsGalleryUploadOpen(false);
  };

  const saveAdjustedProfilePhoto = () => {
    if (
      !profilePhotoDraft.src ||
      !profilePhotoDraft.naturalWidth ||
      !profilePhotoDraft.naturalHeight
    ) {
      return;
    }

    const outputSize = 512;
    const { renderWidth, renderHeight } = getProfilePhotoRenderMetrics();
    const ratio = outputSize / profilePhotoEditorSize;
    const drawWidth = renderWidth * ratio;
    const drawHeight = renderHeight * ratio;
    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const image = new window.Image();
    image.onload = () => {
      context.clearRect(0, 0, outputSize, outputSize);
      context.drawImage(
        image,
        outputSize / 2 - drawWidth / 2 + safeProfilePhotoOffsetX * ratio,
        outputSize / 2 - drawHeight / 2 + safeProfilePhotoOffsetY * ratio,
        drawWidth,
        drawHeight,
      );

      updateBasicInfo("profilePhoto", canvas.toDataURL("image/jpeg", 0.92));
      setIsProfilePhotoEditorOpen(false);
      setProfileNotice("Profile photo updated.");
    };
    image.src = profilePhotoDraft.src;
  };

  const handleProfilePhotoPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!profilePhotoDraft.src) {
      return;
    }

    profilePhotoDragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: safeProfilePhotoOffsetX,
      originY: safeProfilePhotoOffsetY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleProfilePhotoPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const dragState = profilePhotoDragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;

    setProfilePhotoDraft((previous) => {
      const metrics = getProfilePhotoRenderMetrics(
        profilePhotoEditorSize,
        previous.scale,
      );

      return {
        ...previous,
        offsetX: clamp(
          dragState.originX + deltaX,
          -metrics.maxOffsetX,
          metrics.maxOffsetX,
        ),
        offsetY: clamp(
          dragState.originY + deltaY,
          -metrics.maxOffsetY,
          metrics.maxOffsetY,
        ),
      };
    });
  };

  const handleProfilePhotoPointerEnd = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const dragState = profilePhotoDragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    profilePhotoDragStateRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const buildProfilePayload = () => ({
    fullName: basicInfo.fullName.trim(),
    phone: basicInfo.phone.trim(),
    email: basicInfo.email.trim(),
    profilePhoto: basicInfo.profilePhoto || null,
    gender: basicInfo.gender || null,
    dateOfBirth: basicInfo.dateOfBirth || null,
    city: basicInfo.city.trim(),
    area: basicInfo.area.trim(),
    languages: basicInfo.languages,
    primaryCategory: professionalInfo.primaryCategory.trim(),
    experienceYears: professionalInfo.experienceYears.trim() || "0",
    workType: professionalInfo.workType.trim(),
    salonName: professionalInfo.salonName.trim() || null,
    about: professionalInfo.about.trim(),
    serviceLocation: availabilityInfo.serviceLocation.trim(),
    travelRadius: availabilityInfo.travelRadius.trim() || "0",
    workingDays: availabilityInfo.workingDays,
    startTime: availabilityInfo.startTime.trim() || null,
    endTime: availabilityInfo.endTime.trim() || null,
    instagram: verificationInfo.instagram.trim() || null,
    facebook: verificationInfo.facebook.trim() || null,
    youtube: verificationInfo.youtube.trim() || null,
    website: verificationInfo.website.trim() || null,
    pinterest: verificationInfo.pinterest.trim() || null,
    services: validServiceRows.map((service) => ({
      name: service.name.trim(),
      price: service.price.trim() || "0",
      duration: service.duration.trim(),
      description: service.description.trim() || null,
    })),
    portfolio: visibleGalleryItems.map((item) => ({
      imageUrl: item.previewUrl,
      title: item.title,
      category: item.subtitle || null,
    })),
    certificates:
      hasText(verificationInfo.certificateTitle) &&
      hasText(verificationInfo.certificateFileUrl)
        ? [
            {
              title: verificationInfo.certificateTitle.trim(),
              fileUrl: verificationInfo.certificateFileUrl.trim(),
            },
          ]
        : [],
  });

  const saveProfile = async () => {
    if (!authToken) {
      setProfileNotice("Please log in again to save your profile.");
      return null;
    }

    setIsSavingProfile(true);
    setProfileNotice("");

    try {
      let response = await fetch(`${API_BASE_URL}/api/beautician/profile`, {
        method: hasExistingProfile ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(buildProfilePayload()),
      });

      let json = (await response
        .json()
        .catch(() => null)) as ProfileApiErrorResponse | null;

      if (
        !response.ok &&
        !hasExistingProfile &&
        json?.message === "Beautician profile already exists"
      ) {
        response = await fetch(`${API_BASE_URL}/api/beautician/profile`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(buildProfilePayload()),
        });

        json = (await response
          .json()
          .catch(() => null)) as ProfileApiErrorResponse | null;
      }

      if (!response.ok) {
        applyBackendFieldErrors(json?.errors);
        throw new Error(json?.message || "Failed to save profile.");
      }

      setHasExistingProfile(true);
      const savedProfile = (json as BeauticianProfileResponse | null)?.profile;
      setSavedCompletion(
        savedProfile
          ? getSavedCompletionFromProfile(savedProfile)
          : {
              completedSteps: Object.values(currentStepCompletions).filter(
                Boolean,
              ).length,
              percentage: 0,
              profilePhotoUploaded: Boolean(profilePhotoPreview),
            },
      );
      setSavedStepCompletions(
        savedProfile
          ? getSavedStepCompletionsFromProfile(savedProfile)
          : currentStepCompletions,
      );
      setSavedServiceIds((previous) => {
        const validRowIds = validServiceRows.map((service) => service.id);
        return Array.from(new Set([...previous, ...validRowIds]));
      });
      setProfileNotice("Profile saved successfully.");

      if (savedProfile?.user && authToken) {
        const updatedUser: AuthUser = {
          id: authUser?.id || "",
          email: savedProfile.user.email,
          firstName: savedProfile.user.firstName,
          lastName: savedProfile.user.lastName,
          phone: savedProfile.user.phone,
          role: savedProfile.user.role || authUser?.role || null,
          profileCompleted: savedProfile.user.profileCompleted,
          isEmailVerified: savedProfile.user.isEmailVerified,
        };
        setAuthUser(updatedUser);
        storeAuthSession(authToken, updatedUser);
      }

      if (savedProfile && authUser?.id) {
        writeDashboardSnapshot(authUser.id, profileMeta, savedProfile);
      }

      const fallbackSavedProfile: NonNullable<
        BeauticianProfileResponse["profile"]
      > = {
        completion: {
          stepStates: {
            aboutYou: currentStepCompletions[1],
            yourExpertise: currentStepCompletions[2],
            servicesAndPricing: currentStepCompletions[3],
            workGallery: currentStepCompletions[4],
            availability: currentStepCompletions[5],
            getVerified: currentStepCompletions[6],
          },
          completedSteps: Object.values(currentStepCompletions).filter(Boolean)
            .length,
          percentage: 0,
          profilePhotoUploaded: Boolean(profilePhotoPreview),
        },
      };

      return savedProfile || fallbackSavedProfile;
    } catch (error) {
      setProfileNotice(
        error instanceof Error ? error.message : "Failed to save profile.",
      );
      return null;
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleSaveAndContinue = async () => {
    if (!validateActiveStep()) {
      return;
    }

    const savedProfile = await saveProfile();

    if (!savedProfile) {
      return;
    }

    const savedSteps = getSavedStepCompletionsFromProfile(savedProfile);
    const currentStepCompleted = savedSteps[activeStep as StepId];

    if (!currentStepCompleted) {
      return;
    }

    const nextStepId = Math.min(activeStep + 1, steps.length);
    openStep(nextStepId);
  };

  const handleSubmitProfile = async () => {
    if (!validateActiveStep()) {
      return;
    }

    const savedProfile = await saveProfile();

    if (!savedProfile) {
      return;
    }

    const savedSteps = getSavedStepCompletionsFromProfile(savedProfile);
    const allStepsCompleted = Object.values(savedSteps).every(Boolean);

    if (!allStepsCompleted) {
      const firstIncompleteStep = steps.find(
        (step) => !savedSteps[step.id as StepId],
      );
      if (firstIncompleteStep) {
        openStep(firstIncompleteStep.id);
      }
      return;
    }

    setSavedStepCompletions(savedSteps);
    setIsProfileSubmitted(true);
    setProfileNotice("Your profile is submitted.");
    setIsMobileStepViewOpen(false);
  };

  const handleBackToVerificationForm = () => {
    setIsProfileSubmitted(false);
    setActiveStep(6);

    window.requestAnimationFrame(() => {
      formSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    if (!isGalleryUploadOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isGalleryUploadOpen]);

  useEffect(() => {
    if (!isProfilePhotoEditorOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isProfilePhotoEditorOpen]);

  useEffect(() => {
    if (!isProfilePhotoEditorOpen) {
      return;
    }

    const updateEditorSize = () => {
      if (!profilePhotoEditorFrameRef.current) {
        return;
      }

      const nextSize = clamp(
        profilePhotoEditorFrameRef.current.clientWidth - 24,
        180,
        PROFILE_PHOTO_EDITOR_SIZE,
      );

      setProfilePhotoEditorSize(nextSize);
    };

    updateEditorSize();
    window.addEventListener("resize", updateEditorSize);

    return () => {
      window.removeEventListener("resize", updateEditorSize);
    };
  }, [isProfilePhotoEditorOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileStepViewOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    pendingGalleryPreviewRef.current = portfolioInfo.uploadedPreviewUrl;
  }, [portfolioInfo.uploadedPreviewUrl]);

  useEffect(() => {
    if (!isSessionHydrated) {
      return;
    }

    const loadDashboard = async () => {
      if (!authToken) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/beautician/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        if (!response.ok) {
          setIsLoadingProfile(false);
          return;
        }

        const json = (await response.json()) as DashboardBootstrapResponse;
        const normalizedMeta = normalizeProfileMeta(json.meta);
        setProfileMeta(normalizedMeta);

        if (json.profile) {
          if (hasLocalEditsRef.current) {
            return;
          }
          applyProfileData(json.profile, authUser);
          if (authUser?.id) {
            writeDashboardSnapshot(authUser.id, normalizedMeta, json.profile);
          }
        }
      } catch {
        setProfileNotice("We could not load your existing profile right now.");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    void loadDashboard();
  }, [
    applyProfileData,
    authToken,
    authUser,
    isSessionHydrated,
    normalizeProfileMeta,
  ]);

  useEffect(() => {
    return () => {
      if (
        pendingGalleryPreviewRef.current &&
        pendingGalleryPreviewRef.current.startsWith("blob:")
      ) {
        URL.revokeObjectURL(pendingGalleryPreviewRef.current);
      }
    };
  }, []);

  const renderStepForm = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div className="grid gap-4 md:grid-cols-3">
              <Field
                label="Full Name"
                placeholder="Add your full name"
                value={basicInfo.fullName}
                onChange={(value) => updateBasicInfo("fullName", value)}
                error={fieldErrors["basicInfo.fullName"]}
              />
              <Field
                label="Phone Number"
                placeholder="Add your phone number"
                value={basicInfo.phone}
                onChange={(value) => updateBasicInfo("phone", value)}
                icon={Phone}
                type="tel"
                error={fieldErrors["basicInfo.phone"]}
              />
              <Field
                label="Email"
                placeholder="Add your email"
                value={basicInfo.email}
                onChange={(value) => updateBasicInfo("email", value)}
                icon={Mail}
                type="email"
                error={fieldErrors["basicInfo.email"]}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Gender"
                value={basicInfo.gender}
                onChange={(value) => updateBasicInfo("gender", value)}
                options={["Female", "Male", "Other"]}
                placeholder="Select your gender"
                error={fieldErrors["basicInfo.gender"]}
              />
              <DateField
                label="Date of Birth"
                value={basicInfo.dateOfBirth}
                onChange={(value) => updateBasicInfo("dateOfBirth", value)}
                error={fieldErrors["basicInfo.dateOfBirth"]}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="City"
                placeholder="Add your city"
                value={basicInfo.city}
                onChange={(value) => updateBasicInfo("city", value)}
                error={fieldErrors["basicInfo.city"]}
              />
              <Field
                label="Area / Locality"
                placeholder="Add your area or locality"
                value={basicInfo.area}
                onChange={(value) => updateBasicInfo("area", value)}
                error={fieldErrors["basicInfo.area"]}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-[#2D2230]">
                  Languages Spoken <span className="text-[#C42E5D]">*</span>
                </span>
                <button
                  type="button"
                  onClick={() => addLanguage(basicInfo.languageSearch)}
                  className="premium-interactive inline-flex shrink-0 items-center justify-center rounded-lg border border-[#E6BCCC] bg-white px-3 py-2 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6]"
                >
                  Add
                </button>
              </div>
              <div
                className={`rounded-xl border bg-white px-4 py-3 shadow-[0_8px_18px_-16px_rgba(90,0,31,0.28)] transition-all duration-200 focus-within:border-[#C42E5D] focus-within:shadow-[0_0_0_4px_rgba(196,46,93,0.12)] ${
                  fieldErrors["basicInfo.languages"]
                    ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
                    : "border-[#E9D9DC]"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {basicInfo.languages.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => removeLanguage(language)}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#FFF1F5] px-3 py-1.5 text-sm font-semibold text-[#B11F4D]"
                    >
                      {language}
                      <span className="text-[#D45B80]">x</span>
                    </button>
                  ))}
                  <input
                    type="text"
                    value={basicInfo.languageSearch}
                    onChange={(event) =>
                      updateBasicInfo("languageSearch", event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === ",") {
                        event.preventDefault();
                        addLanguage(basicInfo.languageSearch);
                      }
                    }}
                    placeholder="Type a language and press Enter"
                    className="min-w-[220px] flex-1 bg-transparent text-[0.96rem] text-[#334155] outline-none placeholder:text-[#94A3B8]"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestedLanguages.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => addLanguage(language)}
                      className="rounded-full border border-[#F0D7DE] bg-[#FFF9FB] px-3 py-1.5 text-xs font-semibold text-[#8A1238] transition hover:bg-[#FFF1F5]"
                    >
                      + {language}
                    </button>
                  ))}
                </div>
              </div>
              {fieldErrors["basicInfo.languages"] ? (
                <span className="text-sm text-[#B4234D]">
                  {fieldErrors["basicInfo.languages"]}
                </span>
              ) : null}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Professional Category"
                placeholder="Bridal makeup artist / Mehndi artist / Hairstylist"
                value={professionalInfo.primaryCategory}
                onChange={(value) =>
                  updateProfessionalInfo("primaryCategory", value)
                }
                error={fieldErrors["professionalInfo.primaryCategory"]}
              />
              <Field
                label="Experience Years"
                placeholder="Add your years of experience"
                value={professionalInfo.experienceYears}
                onChange={(value) =>
                  updateProfessionalInfo("experienceYears", value)
                }
                error={fieldErrors["professionalInfo.experienceYears"]}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Work Type"
                value={professionalInfo.workType}
                onChange={(value) => updateProfessionalInfo("workType", value)}
                options={workTypeOptions}
                placeholder="Select work type"
                error={fieldErrors["professionalInfo.workType"]}
              />
              <Field
                label="Salon / Brand Name"
                placeholder="Add your salon or studio name"
                value={professionalInfo.salonName}
                onChange={(value) => updateProfessionalInfo("salonName", value)}
              />
            </div>
            <TextAreaField
              label="About You"
              placeholder="Describe your style, skills, and specialties"
              value={professionalInfo.about}
              onChange={(value) => updateProfessionalInfo("about", value)}
              error={fieldErrors["professionalInfo.about"]}
            />
          </div>
        );
      case 3:
        return (
          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[1.15rem] font-semibold text-[#2D2230]">
                  Build your service menu
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#64748B]">
                  Add as many services as you want with pricing and timing
                  details.
                </p>
              </div>
              <button
                type="button"
                onClick={addServiceRow}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6BCCC] bg-white text-[#8A1238] transition hover:bg-[#FFF3F6] sm:h-auto sm:w-auto sm:gap-2 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm sm:font-semibold"
                aria-label="Add service"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Service</span>
              </button>
            </div>
            {fieldErrors["servicesInfo.root"] ? (
              <div className="rounded-xl border border-[#F3C8D3] bg-[#FFF7F9] px-4 py-3 text-sm text-[#B4234D]">
                {fieldErrors["servicesInfo.root"]}
              </div>
            ) : null}

            <div className="space-y-4">
              {servicesInfo.map((service, index) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-[#EEDCE1] bg-white px-4 py-4 shadow-[0_12px_24px_-22px_rgba(90,0,31,0.22)]"
                >
                  {savedServiceIds.includes(service.id) &&
                  !expandedServiceIds.includes(service.id) ? (
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex flex-1 items-start gap-3">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#8A1238] px-2 text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[0.98rem] font-semibold text-[#2D2230]">
                              {service.name || `Service ${index + 1}`}
                            </p>
                            <span className="rounded-full bg-[#EEF9F0] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A]">
                              Saved
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-[#64748B]">
                            {service.price || "INR 0"} •{" "}
                            {service.duration || "Duration not added"}
                          </p>
                          {service.description ? (
                            <p className="mt-1 line-clamp-1 text-sm text-[#7A6671]">
                              {service.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 self-start">
                        <button
                          type="button"
                          onClick={() => editServiceRow(service.id)}
                          className="inline-flex h-9 items-center justify-center rounded-lg border border-[#E6BCCC] bg-white px-2.5 text-xs font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6] sm:px-3"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => removeServiceRow(service.id)}
                          disabled={servicesInfo.length === 1}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#F1D7DD] bg-white text-[#B11F4D] transition hover:bg-[#FFF3F6] disabled:cursor-not-allowed disabled:opacity-45"
                          aria-label={`Remove service ${index + 1}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.98rem] font-semibold text-[#2D2230]">
                            Service {index + 1}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => saveServiceRow(service.id)}
                            className="inline-flex items-center justify-center rounded-lg bg-[#8A1238] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#730F30]"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => removeServiceRow(service.id)}
                            disabled={servicesInfo.length === 1}
                            className="inline-flex items-center justify-center rounded-lg border border-[#F1D7DD] bg-white p-2.5 text-[#B11F4D] transition hover:bg-[#FFF3F6] disabled:cursor-not-allowed disabled:opacity-45"
                            aria-label={`Remove service ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        <DatalistField
                          label="Service Name"
                          placeholder="Bridal Makeup"
                          value={service.name}
                          onChange={(value) =>
                            updateServiceRow(service.id, "name", value)
                          }
                          options={suggestedServiceNames}
                          error={fieldErrors[`servicesInfo.${service.id}.name`]}
                        />
                        <Field
                          label="Price"
                          placeholder="INR 0"
                          value={service.price}
                          onChange={(value) =>
                            updateServiceRow(service.id, "price", value)
                          }
                          error={
                            fieldErrors[`servicesInfo.${service.id}.price`]
                          }
                        />
                        <Field
                          label="Duration"
                          placeholder="e.g. 2 Hours"
                          value={service.duration}
                          onChange={(value) =>
                            updateServiceRow(service.id, "duration", value)
                          }
                          error={
                            fieldErrors[`servicesInfo.${service.id}.duration`]
                          }
                        />
                      </div>
                      <div className="mt-3">
                        <TextAreaField
                          label="Description"
                          placeholder="Explain what is included in this service"
                          value={service.description}
                          onChange={(value) =>
                            updateServiceRow(service.id, "description", value)
                          }
                          required={false}
                          error={
                            fieldErrors[
                              `servicesInfo.${service.id}.description`
                            ]
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div className="grid grid-cols-4 gap-2 sm:gap-3 xl:grid-cols-4">
              <div className="rounded-xl border border-[#F0E0DE] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF7FA_100%)] px-2.5 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-medium text-[#64748B] sm:text-sm">
                  Photos
                </p>
                <p className="mt-1.5 text-[1.1rem] font-semibold text-[#2D2230] sm:mt-2 sm:text-[1.65rem]">
                  {photoCount}
                </p>
              </div>
              <div className="rounded-xl border border-[#F0E0DE] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF7FA_100%)] px-2.5 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-medium text-[#64748B] sm:text-sm">
                  Videos
                </p>
                <p className="mt-1.5 text-[1.1rem] font-semibold text-[#2D2230] sm:mt-2 sm:text-[1.65rem]">
                  {videoCount}
                </p>
              </div>
              <div className="rounded-xl border border-[#F0E0DE] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF7FA_100%)] px-2.5 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-medium text-[#64748B] sm:text-sm">
                  Views
                </p>
                <p className="mt-1.5 text-[1.1rem] font-semibold text-[#2D2230] sm:mt-2 sm:text-[1.65rem]">
                  {totalGalleryViews}
                </p>
              </div>
              <div className="rounded-xl border border-[#F0E0DE] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF7FA_100%)] px-2.5 py-3 sm:px-4 sm:py-4">
                <p className="text-[10px] font-medium text-[#64748B] sm:text-sm">
                  Likes
                </p>
                <p className="mt-1.5 text-[1.1rem] font-semibold text-[#2D2230] sm:mt-2 sm:text-[1.65rem]">
                  {totalGalleryLikes}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-col gap-4 rounded-[1.2rem] border border-dashed border-[#F2BAC9] bg-[linear-gradient(135deg,#FFFDFD_0%,#FFF5F8_55%,#FFF1F5_100%)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,#8A1238_0%,#C42E5D_100%)] text-white shadow-[0_20px_30px_-24px_rgba(138,18,56,0.75)]">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold text-[#2D2230]">
                      Upload your work
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#64748B]">
                      Add your best bridal, party, mehndi, hair, or nail work
                      here.
                    </p>
                  </div>
                </div>
                <div ref={galleryUploadMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setIsGalleryUploadMenuOpen((current) => !current)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8A1238] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#730F30]"
                  >
                    <Plus className="h-4 w-4" />
                    Upload Options
                    <ChevronDown
                      className={`h-4 w-4 transition ${isGalleryUploadMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isGalleryUploadMenuOpen ? (
                    <div className="premium-reveal absolute right-0 top-[calc(100%+0.75rem)] z-30 min-w-[220px] overflow-hidden rounded-[1.2rem] border border-[#EFD4DC] bg-white p-2 shadow-[0_24px_44px_-24px_rgba(90,0,31,0.34)]">
                      <button
                        type="button"
                        onClick={() => openGalleryUploadFlow("Photo")}
                        className="premium-interactive flex w-full items-center justify-between rounded-[0.95rem] px-3 py-3 text-left text-sm font-medium text-[#4A3341] hover:bg-[#FFF3F6] hover:text-[#8A1238]"
                      >
                        <span className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Image
                        </span>
                        <span className="text-[#B68091]">&rarr;</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openGalleryUploadFlow("Video")}
                        className="premium-interactive mt-1 flex w-full items-center justify-between rounded-[0.95rem] px-3 py-3 text-left text-sm font-medium text-[#4A3341] hover:bg-[#FFF3F6] hover:text-[#8A1238]"
                      >
                        <span className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Video
                        </span>
                        <span className="text-[#B68091]">&rarr;</span>
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {fieldErrors["portfolioInfo.root"] ? (
              <div className="rounded-xl border border-[#F3C8D3] bg-[#FFF7F9] px-4 py-3 text-sm text-[#B4234D]">
                {fieldErrors["portfolioInfo.root"]}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-2">
              {galleryFilterOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedGalleryFilter(item)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedGalleryFilter === item
                      ? "bg-[#8A1238] text-white"
                      : "border border-[#F0D7DE] bg-white text-[#5A001F] hover:bg-[#FFF3F6]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {filteredGalleryItems.length === 0 ? (
              <div className="rounded-[1.2rem] border border-[#F0E0DE] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF7FA_100%)] px-6 py-12 text-center shadow-[0_12px_24px_-22px_rgba(90,0,31,0.2)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF1F5] text-[#B11F4D]">
                  <Upload className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-[1.2rem] font-semibold text-[#2D2230]">
                  {selectedGalleryFilter === "All"
                    ? "No work uploaded yet"
                    : `No ${selectedGalleryFilter.toLowerCase()} uploaded yet`}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  {selectedGalleryFilter === "All"
                    ? "Add your first photo or video to start building a strong gallery for clients."
                    : `Upload a ${selectedGalleryFilter.toLowerCase()} photo or video to show this category here.`}
                </p>
                <div className="mt-5 flex justify-center">
                  <div className="relative" ref={galleryUploadMenuRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setIsGalleryUploadMenuOpen((current) => !current)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8A1238] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#730F30]"
                    >
                      <Plus className="h-4 w-4" />
                      Upload your first work
                      <ChevronDown
                        className={`h-4 w-4 transition ${isGalleryUploadMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isGalleryUploadMenuOpen ? (
                      <div className="premium-reveal absolute left-1/2 top-[calc(100%+0.75rem)] z-30 min-w-[220px] -translate-x-1/2 overflow-hidden rounded-[1.2rem] border border-[#EFD4DC] bg-white p-2 shadow-[0_24px_44px_-24px_rgba(90,0,31,0.34)]">
                        <button
                          type="button"
                          onClick={() => openGalleryUploadFlow("Photo")}
                          className="premium-interactive flex w-full items-center justify-between rounded-[0.95rem] px-3 py-3 text-left text-sm font-medium text-[#4A3341] hover:bg-[#FFF3F6] hover:text-[#8A1238]"
                        >
                          <span className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </span>
                          <span className="text-[#B68091]">&rarr;</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openGalleryUploadFlow("Video")}
                          className="premium-interactive mt-1 flex w-full items-center justify-between rounded-[0.95rem] px-3 py-3 text-left text-sm font-medium text-[#4A3341] hover:bg-[#FFF3F6] hover:text-[#8A1238]"
                        >
                          <span className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Video
                          </span>
                          <span className="text-[#B68091]">&rarr;</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
                {filteredGalleryItems.map((item, index) => {
                  const cardAspectClass =
                    index % 3 === 0
                      ? "aspect-[0.82]"
                      : index % 3 === 1
                        ? "aspect-[1.15]"
                        : "aspect-[0.95]";

                  return (
                    <div
                      key={item.id}
                      className="premium-card overflow-hidden rounded-[1.1rem] border border-[#EFDDE2] bg-white shadow-[0_12px_24px_-22px_rgba(90,0,31,0.22)]"
                    >
                      {item.type === "Video" ? (
                        <div
                          className={`relative overflow-hidden bg-[#1F1722] ${cardAspectClass}`}
                        >
                          {isLikelyPreviewableMedia(
                            item.objectUrl || item.previewUrl,
                          ) ? (
                            <video
                              src={item.objectUrl || item.previewUrl}
                              className="h-full w-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#F1B6C8]">
                              <Upload className="h-9 w-9" />
                            </div>
                          )}
                          <span className="absolute inset-x-0 bottom-3 mx-auto inline-flex w-fit items-center rounded-full bg-[#2D2230]/72 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                            Video
                          </span>
                        </div>
                      ) : (
                        <div
                          className={`relative overflow-hidden bg-[linear-gradient(180deg,#FFF8FA_0%,#FFF0F4_100%)] ${cardAspectClass}`}
                        >
                          {isPreviewableImageSource(
                            item.objectUrl || item.previewUrl,
                          ) ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.objectUrl || item.previewUrl}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#C56A86]">
                              <Upload className="h-9 w-9" />
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col gap-2 px-3 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#2D2230]">
                            {item.title}
                          </p>
                          {item.subtitle ? (
                            <p className="mt-1 truncate text-xs text-[#7A6671]">
                              {item.subtitle}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex items-center gap-3 text-[#8C7480]">
                          <span className="inline-flex items-center gap-1 text-xs">
                            <Eye className="h-3.5 w-3.5" />
                            {totalGalleryViews}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs">
                            <Heart className="h-3.5 w-3.5" />
                            {totalGalleryLikes}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div className="grid gap-2">
              <span className="text-sm font-semibold text-[#2D2230]">
                Working Days <span className="text-[#C42E5D]">*</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {workingDayOptions.map((day) => {
                  const active = availabilityInfo.workingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleWorkingDay(day)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[#8A1238] text-white shadow-[0_14px_22px_-18px_rgba(138,18,56,0.7)]"
                          : "border border-[#E9D9DC] bg-white text-[#5A001F] hover:bg-[#FFF3F6]"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              {fieldErrors["availabilityInfo.workingDays"] ? (
                <span className="text-sm text-[#B4234D]">
                  {fieldErrors["availabilityInfo.workingDays"]}
                </span>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <TimeField
                label="Start Time"
                value={availabilityInfo.startTime}
                onChange={(value) => updateAvailabilityInfo("startTime", value)}
                error={fieldErrors["availabilityInfo.startTime"]}
              />
              <TimeField
                label="End Time"
                value={availabilityInfo.endTime}
                onChange={(value) => updateAvailabilityInfo("endTime", value)}
                error={fieldErrors["availabilityInfo.endTime"]}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Service Location"
                placeholder="Client home / Salon / Both"
                value={availabilityInfo.serviceLocation}
                onChange={(value) =>
                  updateAvailabilityInfo("serviceLocation", value)
                }
                error={fieldErrors["availabilityInfo.serviceLocation"]}
              />
              <Field
                label="Travel Radius"
                placeholder="e.g. 20 KM"
                value={availabilityInfo.travelRadius}
                onChange={(value) =>
                  updateAvailabilityInfo("travelRadius", value)
                }
                error={fieldErrors["availabilityInfo.travelRadius"]}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="grid gap-5 px-4 py-5 sm:px-5">
            <div className="rounded-[1.15rem] border border-[#F2CFD7] bg-[linear-gradient(180deg,#FFF8FA_0%,#FFF2F5_100%)] px-4 py-4 shadow-[0_14px_28px_-24px_rgba(90,0,31,0.28)] sm:px-5">
              <h3 className="text-[1.2rem] font-semibold text-[#2D2230]">
                Profile Verification Required
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5F4B57]">
                Complete your verification to publish your profile, appear in
                search results, and start receiving booking requests on
                RoopSetu.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Certificate Title"
                placeholder="Makeup course / Diploma / Workshop"
                value={verificationInfo.certificateTitle}
                onChange={(value) =>
                  updateVerificationInfo("certificateTitle", value)
                }
                required={false}
                error={fieldErrors["verificationInfo.certificateTitle"]}
              />
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#2D2230]">
                  Certificate File
                </span>
                <input
                  ref={certificateFileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleCertificateFilePick}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => certificateFileInputRef.current?.click()}
                  className={`flex min-h-[52px] items-center gap-3 overflow-hidden rounded-xl border bg-white px-4 shadow-[0_8px_18px_-16px_rgba(90,0,31,0.28)] transition-all duration-200 hover:border-[#C42E5D] hover:bg-[#FFF8FA] ${
                    fieldErrors["verificationInfo.certificateFileUrl"]
                      ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
                      : "border-[#E9D9DC]"
                  }`}
                >
                  <span
                    className={`min-w-0 flex-1 truncate text-left text-[0.96rem] ${
                      verificationInfo.certificateFileUrl
                        ? "text-[#334155]"
                        : "text-[#94A3B8]"
                    }`}
                    title={
                      verificationInfo.certificateFileUrl ||
                      "Upload certificate file"
                    }
                  >
                    {verificationInfo.certificateFileUrl ||
                      "Upload certificate file"}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#FFF1F5] px-3 py-1.5 text-xs font-semibold text-[#B11F4D]">
                    <Upload className="h-3.5 w-3.5" />
                    Choose File
                  </span>
                </button>
                {fieldErrors["verificationInfo.certificateFileUrl"] ? (
                  <span className="text-sm text-[#B4234D]">
                    {fieldErrors["verificationInfo.certificateFileUrl"]}
                  </span>
                ) : null}
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Field
                label="Instagram"
                placeholder="@yourhandle"
                value={verificationInfo.instagram}
                onChange={(value) => updateVerificationInfo("instagram", value)}
                error={fieldErrors["verificationInfo.instagram"]}
              />
              <Field
                label="Facebook"
                placeholder="Facebook profile URL"
                value={verificationInfo.facebook}
                onChange={(value) => updateVerificationInfo("facebook", value)}
                error={fieldErrors["verificationInfo.facebook"]}
              />
              <Field
                label="YouTube"
                placeholder="YouTube channel URL"
                value={verificationInfo.youtube}
                onChange={(value) => updateVerificationInfo("youtube", value)}
                error={fieldErrors["verificationInfo.youtube"]}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Website"
                placeholder="https://yourwebsite.com"
                value={verificationInfo.website}
                onChange={(value) => updateVerificationInfo("website", value)}
                error={fieldErrors["verificationInfo.website"]}
              />
              <Field
                label="Pinterest"
                placeholder="Pinterest profile URL"
                value={verificationInfo.pinterest}
                onChange={(value) => updateVerificationInfo("pinterest", value)}
                error={fieldErrors["verificationInfo.pinterest"]}
              />
            </div>
          </div>
        );
    }
  };

  const renderAvatarFace = (sizeClass: string, textClass: string) =>
    profilePhotoPreview ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={profilePhotoPreview}
        alt={`${displayName} profile`}
        className={`${sizeClass} rounded-full object-cover`}
      />
    ) : (
      <div
        className={`flex ${sizeClass} items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#FFF7F9_0%,#FDECEF_100%)] ${textClass} font-semibold`}
      >
        {initials}
      </div>
    );

  const profilePhotoRenderMetrics = getProfilePhotoRenderMetrics();
  const safeProfilePhotoOffsetX = clamp(
    profilePhotoDraft.offsetX,
    -profilePhotoRenderMetrics.maxOffsetX,
    profilePhotoRenderMetrics.maxOffsetX,
  );
  const safeProfilePhotoOffsetY = clamp(
    profilePhotoDraft.offsetY,
    -profilePhotoRenderMetrics.maxOffsetY,
    profilePhotoRenderMetrics.maxOffsetY,
  );

  return (
    <>
      <main className="min-h-screen bg-[#FFF8F3] text-[#2D2230]">
        <div className="premium-float pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,236,239,0.88),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(252,229,233,0.68),transparent_28%),linear-gradient(180deg,#FFF8F3_0%,#FFF9F6_100%)]" />

        <div className="premium-reveal-soft lg:grid lg:min-h-screen lg:grid-cols-[268px_minmax(0,1fr)]">
          <aside className="premium-reveal hidden h-screen border-r border-[#F0E0DE] bg-white/80 lg:sticky lg:top-0 lg:flex lg:flex-col">
            <div className="flex h-[78px] items-center border-b border-[#F0E0DE] px-5">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/roopsetu-wordmark.png"
                  alt="RoopSetu logo"
                  width={1100}
                  height={300}
                  className="h-[38px] w-auto max-w-none object-contain"
                  priority
                />
              </Link>
            </div>

            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-7">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[0.98rem] font-medium transition ${
                      item.active
                        ? "bg-gradient-to-r from-[#8A1238] to-[#A11743] text-white shadow-[0_16px_28px_-18px_rgba(138,18,56,0.85)]"
                        : "text-[#475569] hover:bg-[#FFF3F6] hover:text-[#5A001F]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </span>
                    {"badge" in item ? (
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FFF0F4] px-2 text-xs font-semibold text-[#C42E5D]">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0">
            <header className="premium-reveal-soft border-b border-[#F0E0DE] bg-white/70 backdrop-blur-md">
              <div className="relative flex h-[78px] items-center justify-between gap-4 px-4 sm:px-6 lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F1D5DC] bg-white text-[#5A001F] transition hover:bg-[#FFF3F6]"
                  aria-label="Open dashboard menu"
                >
                  <Menu className="h-5 w-5" />
                </button>

                <Link
                  href="/"
                  className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center"
                >
                  <Image
                    src="/roopsetu-wordmark.png"
                    alt="RoopSetu logo"
                    width={1100}
                    height={300}
                    className="h-[34px] w-auto max-w-none object-contain"
                    priority
                  />
                </Link>

                <div className="ml-auto flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#5A001F] transition hover:text-[#8A1238]"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#5A001F] transition hover:text-[#8A1238]"
                    aria-label="Messages"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <div data-profile-menu-root="true" className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsProfileMenuOpen((current) => !current)
                      }
                      className="inline-flex items-center gap-1 rounded-full border border-[#F0E0DE] bg-white px-1.5 py-1.5 text-[#5A001F] transition hover:bg-[#FFF3F6]"
                      aria-label="Open profile menu"
                    >
                      {renderAvatarFace("h-10 w-10", "text-sm text-white")}
                      <ChevronDown
                        className={`h-4 w-4 transition ${isProfileMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isProfileMenuOpen ? (
                      <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 w-[240px] rounded-[1.2rem] border border-[#F0E0DE] bg-white p-3 shadow-[0_24px_48px_-24px_rgba(90,0,31,0.35)]">
                        <div className="rounded-[1rem] bg-[#FFF7FA] px-3 py-3">
                          <p className="truncate text-sm font-semibold text-[#2D2230]">
                            {displayName}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#64748B]">
                            {authUser?.email || "Beautician"}
                          </p>
                          <p className="mt-1 text-xs font-medium text-[#A71945]">
                            Beautician
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[0.95rem] border border-[#F1D7DD] bg-white px-4 py-3 text-sm font-semibold text-[#B11F4D] transition hover:bg-[#FFF3F6]"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="hidden h-[78px] items-center justify-end gap-4 px-4 sm:px-6 lg:px-8 lg:flex">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#5A001F] transition hover:text-[#8A1238]"
                    aria-label="Notifications"
                  >
                    <Bell className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center text-[#5A001F] transition hover:text-[#8A1238]"
                    aria-label="Messages"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </button>
                  <div data-profile-menu-root="true" className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsProfileMenuOpen((current) => !current)
                      }
                      className="inline-flex items-center gap-1 rounded-full border border-[#F0E0DE] bg-white px-1.5 py-1.5 text-[#5A001F] transition hover:bg-[#FFF3F6]"
                      aria-label="Open profile menu"
                    >
                      {renderAvatarFace("h-10 w-10", "text-sm text-white")}
                      <ChevronDown
                        className={`h-4 w-4 transition ${isProfileMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isProfileMenuOpen ? (
                      <div className="absolute right-0 top-[calc(100%+0.75rem)] z-40 w-[260px] rounded-[1.2rem] border border-[#F0E0DE] bg-white p-3 shadow-[0_24px_48px_-24px_rgba(90,0,31,0.35)]">
                        <div className="rounded-[1rem] bg-[#FFF7FA] px-3 py-3">
                          <p className="truncate text-sm font-semibold text-[#2D2230]">
                            {displayName}
                          </p>
                          <p className="mt-1 truncate text-xs text-[#64748B]">
                            {authUser?.email || "Beautician"}
                          </p>
                          <p className="mt-1 text-xs font-medium text-[#A71945]">
                            Beautician
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[0.95rem] border border-[#F1D7DD] bg-white px-4 py-3 text-sm font-semibold text-[#B11F4D] transition hover:bg-[#FFF3F6]"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </header>

            <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
              <div className="mx-auto max-w-[1380px]">
                <section
                  className={`${isMobileStepViewOpen ? "hidden" : "mb-5 space-y-4"} lg:hidden`}
                >
                  <div className="relative rounded-[1.5rem] border border-[#F0E0DE] bg-white/92 p-4 shadow-[0_18px_40px_-30px_rgba(90,0,31,0.28)] sm:p-5">
                    <div className="absolute right-4 top-4 inline-flex shrink-0 rounded-full bg-[#FFF1F5] px-2.5 py-1 text-[11px] font-semibold text-[#B11F4D] sm:right-5 sm:top-5">
                      {completedSteps}/{steps.length}
                    </div>
                    <div className="flex min-w-0 items-center gap-3 pr-16 sm:pr-20">
                      <div className="relative">
                        <input
                          ref={profilePhotoInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProfilePhotoPick}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => profilePhotoInputRef.current?.click()}
                          className="relative h-20 w-20 shrink-0 rounded-full border-[4px] border-[#F6D6DE] bg-white p-1.5"
                          aria-label="Upload profile photo"
                        >
                          {renderAvatarFace(
                            "h-full w-full",
                            "text-[1.35rem] text-[#8A1238]",
                          )}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#5A001F]/42 via-[#8A1238]/10 to-transparent opacity-80" />
                          <span className="absolute bottom-1 right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#8A1238] text-white shadow-[0_12px_22px_-14px_rgba(90,0,31,0.8)]">
                            <Camera className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A06C7E]">
                          My Profile
                        </p>
                        <h1
                          className={`${playfair.className} mt-1 text-[1.7rem] leading-tight text-[#5A001F]`}
                        >
                          {displayName}
                        </h1>
                        <p className="mt-1 text-sm font-medium text-[#C42E5D]">
                          {professionalInfo.primaryCategory ||
                            "Add your professional category"}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#64748B]">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#A06C7E]" />
                            {basicInfo.city
                              ? `${basicInfo.city}${basicInfo.area ? `, ${basicInfo.area}` : ""}`
                              : "Add your city"}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BriefcaseBusiness className="h-3.5 w-3.5 text-[#A06C7E]" />
                            {professionalInfo.experienceYears
                              ? `${professionalInfo.experienceYears} year${professionalInfo.experienceYears === "1" ? "" : "s"}`
                              : "Add experience"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-[#F0E0DE] bg-white/92 p-4 shadow-[0_18px_40px_-30px_rgba(90,0,31,0.28)] sm:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[1.1rem] font-semibold text-[#2D2230]">
                          Profile Steps
                        </p>
                        <p className="mt-1 text-sm text-[#64748B]">
                          Tap any section to jump directly to its form.
                        </p>
                      </div>
                      <span className="rounded-full bg-[#FFF4F6] px-3 py-1 text-xs font-semibold text-[#B11F4D]">
                        Active: {activeStep}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {steps.map((step) => {
                        const isCurrent = step.id === activeStep;

                        return (
                          <button
                            key={step.id}
                            type="button"
                            onClick={() => openStep(step.id)}
                            className={`rounded-[1.1rem] border px-4 py-4 text-left shadow-[0_10px_24px_-22px_rgba(90,0,31,0.35)] transition ${
                              isCurrent
                                ? "border-[#E7BCCA] bg-[#FFF7FA]"
                                : "border-[#F1E2E0] bg-[#FFFDFC] hover:bg-[#FFF8FA]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                                  isCurrent
                                    ? "bg-gradient-to-r from-[#8A1238] to-[#A11743] text-white"
                                    : "border border-[#F0D7DE] bg-white text-[#8A1238]"
                                }`}
                              >
                                {step.id}
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-[#2D2230]">
                                  {step.title}
                                </p>
                                <span
                                  className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                    isCurrent
                                      ? "bg-[#FFF1F5] text-[#B11F4D]"
                                      : "bg-[#FFF5F7] text-[#A55A73]"
                                  }`}
                                >
                                  {stepStates[
                                    step.id as keyof typeof stepStates
                                  ] === "completed"
                                    ? "Completed"
                                    : stepStates[
                                          step.id as keyof typeof stepStates
                                        ] === "in-progress"
                                      ? "In Progress"
                                      : "Open Section"}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <div className="mb-6 hidden lg:block">
                  <h1
                    className={`${playfair.className} text-[2rem] leading-tight text-[#5A001F] sm:text-[2.3rem]`}
                  >
                    Complete Your Beautician Profile
                  </h1>
                  <p className="mt-2 text-[0.98rem] leading-7 text-[#475569]">
                    A complete profile helps clients trust you and get more
                    bookings.
                  </p>
                  {isLoadingProfile ? (
                    <p className="mt-3 inline-flex rounded-full bg-[#FFF7EA] px-4 py-2 text-sm font-medium text-[#9A5B16]">
                      Loading your saved profile...
                    </p>
                  ) : null}
                  {profileNotice ? (
                    <p className="mt-3 inline-flex rounded-full bg-[#FFF1F5] px-4 py-2 text-sm font-medium text-[#B11F4D]">
                      {profileNotice}
                    </p>
                  ) : null}
                </div>

                <div
                  className={`${isMobileStepViewOpen ? "grid" : "hidden"} gap-5 lg:grid xl:grid-cols-[minmax(0,1fr)_320px]`}
                >
                  <div className="space-y-5">
                    <section className="hidden rounded-[1.4rem] border border-[#F0E0DE] bg-white/88 p-4 shadow-[0_18px_40px_-30px_rgba(90,0,31,0.28)] sm:p-5 lg:block">
                      <div className="grid gap-4 lg:grid-cols-[1.45fr_0.85fr]">
                        <div className="flex items-center gap-3 border-[#F4E6E4] lg:border-r lg:pr-4">
                          <div className="relative">
                            <input
                              ref={profilePhotoInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePhotoPick}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                profilePhotoInputRef.current?.click()
                              }
                              className="group relative h-24 w-24 shrink-0 rounded-full border-[4px] border-[#F6D6DE] bg-white p-1.5 transition hover:border-[#E7BCCA]"
                              aria-label="Upload profile photo"
                            >
                              {renderAvatarFace(
                                "h-full w-full",
                                "text-[1.6rem] text-[#8A1238]",
                              )}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#5A001F]/42 via-[#8A1238]/10 to-transparent opacity-80 transition group-hover:opacity-100" />
                              <span className="absolute bottom-1.5 right-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#8A1238] text-white shadow-[0_12px_22px_-14px_rgba(90,0,31,0.8)]">
                                <Camera className="h-4 w-4" />
                              </span>
                            </button>
                            <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#F0D7DE] bg-white shadow-[0_12px_24px_-18px_rgba(90,0,31,0.38)]">
                              <span className="text-[0.78rem] font-semibold leading-none text-[#8A1238]">
                                {progress}%
                              </span>
                            </div>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h2 className="text-[1.55rem] font-semibold leading-tight text-[#2D2230]">
                                {displayName}
                              </h2>
                              <BadgeCheck className="h-5 w-5 text-[#C42E5D]" />
                            </div>
                            <p className="mt-1 text-[0.95rem] font-medium text-[#C42E5D]">
                              {professionalInfo.primaryCategory ||
                                "Add your professional category"}
                            </p>
                            <div className="mt-4 space-y-2.5 text-sm text-[#475569]">
                              <div className="flex items-center gap-2.5">
                                <MapPin className="h-4.5 w-4.5 text-[#8C7480]" />
                                <span>
                                  {basicInfo.city
                                    ? `${basicInfo.city}${basicInfo.area ? `, ${basicInfo.area}` : ""}`
                                    : "Add your city and state"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <BriefcaseBusiness className="h-4.5 w-4.5 text-[#8C7480]" />
                                <span>
                                  {professionalInfo.experienceYears
                                    ? `${professionalInfo.experienceYears} experience`
                                    : "Add your experience"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center">
                          <p className="text-[1.1rem] font-semibold text-[#2D2230]">
                            Almost there!
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[#475569]">
                            Complete the remaining sections to publish your
                            profile and get more bookings.
                          </p>
                          <button
                            type="button"
                            className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#F4D8DF] bg-[#FFF4F6] px-4 py-2.5 text-sm font-semibold text-[#A71945]"
                          >
                            <Eye className="h-4 w-4" />
                            Preview My Profile
                          </button>
                        </div>
                      </div>
                    </section>

                    {isProfileSubmitted && activeStep === steps.length ? (
                      <section className="overflow-hidden rounded-[1.6rem] border border-[#E4D6D9] bg-[linear-gradient(180deg,#FFFDFD_0%,#FFF7FA_36%,#FFFFFF_100%)] shadow-[0_24px_50px_-32px_rgba(90,0,31,0.28)]">
                        <div className="border-b border-[#F2E3E1] bg-[radial-gradient(circle_at_top_right,rgba(255,232,239,0.9),transparent_32%),linear-gradient(135deg,#FFF8FA_0%,#FFFDFE_100%)] px-5 py-5 sm:px-6">
                          <div className="mb-5 flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={handleBackToVerificationForm}
                              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E9D9DC] bg-white text-[#8A1238] transition hover:bg-[#FFF1F5]"
                              aria-label="Back to verification form"
                            >
                              <ArrowLeft className="h-4.5 w-4.5" />
                            </button>
                            <span className="inline-flex rounded-full bg-[#EEF9F0] px-3 py-1 text-xs font-semibold text-[#0F9F57]">
                              Profile Submitted
                            </span>
                          </div>
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-[680px]">
                              <h2 className="text-[1.9rem] font-semibold leading-tight text-[#2D2230] sm:text-[2.2rem]">
                                Your beautician profile has been submitted
                              </h2>
                              <p className="mt-3 max-w-[620px] text-[0.98rem] leading-7 text-[#5B5560]">
                                Your profile status is now under review. Use the
                                back button anytime to return to the Get
                                Verified form and update this step.
                              </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
                              <div className="rounded-[1.15rem] border border-[#EADADF] bg-white/90 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A06C7E]">
                                  Completed
                                </p>
                                <p className="mt-2 text-[1.45rem] font-semibold text-[#2D2230]">
                                  {completedSteps}/{steps.length}
                                </p>
                              </div>
                              <div className="rounded-[1.15rem] border border-[#EADADF] bg-white/90 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A06C7E]">
                                  Status
                                </p>
                                <p className="mt-2 text-[1.05rem] font-semibold text-[#0F9F57]">
                                  Awaiting review
                                </p>
                              </div>
                              <div className="rounded-[1.15rem] border border-[#EADADF] bg-white/90 px-4 py-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A06C7E]">
                                  Verification
                                </p>
                                <p className="mt-2 text-[1.05rem] font-semibold text-[#2D2230]">
                                  Step 6 completed
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    ) : null}

                    {!(isProfileSubmitted && activeStep === steps.length) ? (
                      <section
                        ref={formSectionRef}
                        className="rounded-[1.4rem] border border-[#F0E0DE] bg-white/90 shadow-[0_18px_40px_-30px_rgba(90,0,31,0.28)]"
                      >
                        <div className="flex flex-col gap-3 border-b border-[#F2E3E1] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                          <div className="flex flex-wrap items-center gap-3">
                            {isMobileStepViewOpen ? (
                              <button
                                type="button"
                                onClick={() => setIsMobileStepViewOpen(false)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E9D9DC] bg-white text-[#8A1238] transition hover:bg-[#FFF1F5] lg:hidden"
                                aria-label="Back to profile steps"
                              >
                                <ArrowLeft className="h-4.5 w-4.5" />
                              </button>
                            ) : null}
                            <span className="text-[1.7rem] font-semibold text-[#2D2230]">
                              {activeStep}.
                            </span>
                            <h2 className="text-[1.5rem] font-semibold text-[#2D2230]">
                              {activeStepMeta.title}
                            </h2>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                activeStepState === "completed"
                                  ? "bg-[#EEF9F0] text-[#16A34A]"
                                  : activeStepState === "in-progress"
                                    ? "bg-[#FFF1F5] text-[#B11F4D]"
                                    : "bg-[#FFF5F7] text-[#A55A73]"
                              }`}
                            >
                              {activeStepLabel}
                            </span>
                          </div>
                        </div>

                        {renderStepForm()}

                        <div className="flex justify-end px-4 pb-5 sm:px-5">
                          <button
                            type="button"
                            onClick={
                              activeStep === steps.length
                                ? handleSubmitProfile
                                : handleSaveAndContinue
                            }
                            disabled={isSavingProfile}
                            className={`inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition ${
                              isSavingProfile
                                ? "cursor-not-allowed bg-[#D8A8B8]"
                                : "bg-[#8A1238] hover:bg-[#730F30]"
                            }`}
                          >
                            {isSavingProfile
                              ? activeStep === steps.length
                                ? "Submitting..."
                                : "Saving..."
                              : activeStep === steps.length
                                ? "Submit Profile"
                                : "Save & Continue"}
                          </button>
                        </div>
                      </section>
                    ) : null}
                  </div>

                  <aside className="hidden space-y-5 lg:block">
                    <section className="rounded-[1.4rem] border border-[#F0E0DE] bg-white/90 p-4 shadow-[0_18px_40px_-30px_rgba(90,0,31,0.28)] sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-[1.65rem] font-semibold text-[#2D2230]">
                          Profile Completion
                        </h3>
                        <span className="inline-flex shrink-0 items-center rounded-full border border-[#E9D9DC] bg-[#FFF6F8] px-3 py-1.5 text-sm font-semibold text-[#8A1238] shadow-[0_10px_24px_-20px_rgba(90,0,31,0.32)]">
                          {completedSteps}/{steps.length}
                        </span>
                      </div>

                      <div className="mt-5 space-y-3">
                        {steps.map((step, index) => {
                          const isCurrent = step.id === activeStep;
                          const stepState =
                            stepStates[step.id as keyof typeof stepStates];
                          const isCompleted = stepState === "completed";
                          const isInProgress = stepState === "in-progress";

                          return (
                            <div
                              key={step.id}
                              className="relative flex items-stretch gap-3"
                            >
                              {index !== steps.length - 1 ? (
                                <span
                                  className={`absolute left-[15px] top-10 h-[calc(100%+10px)] w-[2px] ${
                                    isCompleted
                                      ? "bg-[linear-gradient(180deg,#8A1238_0%,#D78AA2_100%)]"
                                      : "bg-[#F2D5DC]"
                                  }`}
                                />
                              ) : null}
                              <div
                                className={`relative mt-3 h-8 w-8 shrink-0 rounded-full border-2 transition ${
                                  isCompleted
                                    ? "border-[#8A1238] bg-[#8A1238]"
                                    : isCurrent || isInProgress
                                      ? "border-[#B11F4D] bg-white"
                                      : "border-[#E9B7C5] bg-white"
                                }`}
                              >
                                <span
                                  className={`absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
                                    isCompleted
                                      ? "bg-white"
                                      : isCurrent || isInProgress
                                        ? "bg-[#B11F4D]"
                                        : "bg-transparent"
                                  }`}
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => openStep(step.id)}
                                className={`flex flex-1 items-center justify-between rounded-xl border px-4 py-4 text-left shadow-[0_10px_24px_-22px_rgba(90,0,31,0.35)] transition ${
                                  isCurrent
                                    ? "border-[#E7BCCA] bg-[#FFF7FA]"
                                    : "border-[#F1E2E0] bg-[#FFFDFC] hover:bg-[#FFF8FA]"
                                }`}
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-[#2D2230]">
                                      {step.id}
                                    </span>
                                    <span className="text-[1.02rem] font-medium text-[#334155]">
                                      {step.title}
                                    </span>
                                  </div>
                                  <span
                                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                      isCompleted
                                        ? "bg-[#EAF8EF] text-[#17944B]"
                                        : isCurrent || isInProgress
                                          ? "bg-[#FFF1F5] text-[#B11F4D]"
                                          : "bg-[#FFF5F7] text-[#A55A73]"
                                    }`}
                                  >
                                    {stepState === "completed"
                                      ? "Completed"
                                      : stepState === "in-progress"
                                        ? "In Progress"
                                        : "Pending"}
                                  </span>
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    <section className="rounded-[1.4rem] border border-[#F0E0DE] bg-[linear-gradient(180deg,#FFF9FA_0%,#FFFDFC_100%)] p-5 shadow-[0_18px_40px_-30px_rgba(90,0,31,0.22)]">
                      <h3 className="text-[1.45rem] font-semibold text-[#2D2230]">
                        Profile Benefits
                      </h3>
                      <div className="mt-5 space-y-4">
                        {benefits.map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-start gap-3 text-sm text-[#475569]"
                          >
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#E7BBC7] text-[#B11F4D]">
                              <Check className="h-3 w-3" />
                            </span>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#2D2230]/45 backdrop-blur-[2px]"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative flex h-full w-[66vw] min-w-[260px] max-w-[420px] flex-col border-r border-[#F0E0DE] bg-[linear-gradient(180deg,#FFFDFC_0%,#FFF6F8_100%)] shadow-[0_30px_70px_-30px_rgba(90,0,31,0.45)]">
            <div className="flex h-[78px] items-center justify-between border-b border-[#F0E0DE] px-5">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/roopsetu-wordmark.png"
                  alt="RoopSetu logo"
                  width={1100}
                  height={300}
                  className="h-[36px] w-auto max-w-none object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E9D9DC] bg-white text-[#8A1238] transition hover:bg-[#FFF1F5]"
                aria-label="Close dashboard menu"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="border-b border-[#F0E0DE] px-5 py-4">
              <div className="flex items-center gap-3 rounded-[1.2rem] border border-[#F0E0DE] bg-white px-3 py-3">
                <div className="overflow-hidden rounded-full bg-gradient-to-br from-[#5A001F] to-[#8A1238]">
                  {renderAvatarFace("h-11 w-11", "text-sm text-white")}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#2D2230]">
                    {displayName}
                  </p>
                  <p className="text-xs text-[#64748B]">Beautician</p>
                </div>
              </div>
            </div>

            <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-5">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[0.98rem] font-medium transition ${
                      item.active
                        ? "bg-gradient-to-r from-[#8A1238] to-[#A11743] text-white shadow-[0_16px_28px_-18px_rgba(138,18,56,0.85)]"
                        : "text-[#475569] hover:bg-[#FFF3F6] hover:text-[#5A001F]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </span>
                    {"badge" in item ? (
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FFF0F4] px-2 text-xs font-semibold text-[#C42E5D]">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}
      <GalleryUploadModal
        isOpen={isGalleryUploadOpen}
        onClose={() => setIsGalleryUploadOpen(false)}
        uploadInputRef={galleryUploadInputRef}
        accept={isVideoUpload ? "video/*" : "image/*"}
        onPickFile={handleGalleryAssetPick}
        previewUrl={galleryDraftPreviewUrl}
        isVideoUpload={isVideoUpload}
        galleryTypeLabel={galleryTypeLabel}
        galleryPickerDescription={galleryPickerDescription}
        mediaType={portfolioInfo.mediaType}
        onMediaTypeChange={handleGalleryMediaTypeChange}
        portfolioInfo={portfolioInfo}
        onPortfolioInfoChange={updatePortfolioInfo}
        galleryCategoryLabel={galleryCategoryLabel}
        galleryNameLabel={galleryNameLabel}
        galleryNamePlaceholder={galleryNamePlaceholder}
        galleryCategoryOptions={galleryCategoryOptions}
        fieldErrors={fieldErrors}
        onSave={handleSaveGalleryItem}
        galleryHasDraft={galleryHasDraft}
      />
      <ProfilePhotoEditorModal
        isOpen={isProfilePhotoEditorOpen}
        onClose={() => setIsProfilePhotoEditorOpen(false)}
        frameRef={profilePhotoEditorFrameRef}
        draft={profilePhotoDraft}
        metrics={profilePhotoRenderMetrics}
        safeOffsetX={safeProfilePhotoOffsetX}
        safeOffsetY={safeProfilePhotoOffsetY}
        editorSize={profilePhotoEditorSize}
        onPointerDown={handleProfilePhotoPointerDown}
        onPointerMove={handleProfilePhotoPointerMove}
        onPointerEnd={handleProfilePhotoPointerEnd}
        onScaleChange={(value) =>
          setProfilePhotoDraft((previous) => ({
            ...previous,
            scale: value,
          }))
        }
        onOffsetXChange={(value) =>
          setProfilePhotoDraft((previous) => ({
            ...previous,
            offsetX: value,
          }))
        }
        onOffsetYChange={(value) =>
          setProfilePhotoDraft((previous) => ({
            ...previous,
            offsetY: value,
          }))
        }
        initials={initials}
        onChooseAnotherPhoto={() => profilePhotoInputRef.current?.click()}
        onReset={resetProfilePhotoDraft}
        onRemoveCurrentPhoto={() => {
          updateBasicInfo("profilePhoto", "");
          setIsProfilePhotoEditorOpen(false);
          setProfileNotice("Profile photo removed.");
        }}
        onSave={saveAdjustedProfilePhoto}
      />
    </>
  );
}
