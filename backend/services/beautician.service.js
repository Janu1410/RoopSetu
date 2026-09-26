import prisma from "../config/prisma.js";
import redis from "../config/redis.js";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;
const PROFILE_CACHE_TTL_SECONDS = 15 * 60;
const PROFILE_META_CACHE_KEY = "beautician:profile:meta";
const getProfileCacheKey = (userId) => `beautician:profile:${userId}`;

const STEP_META = [
  { id: 1, key: "aboutYou", title: "About You" },
  { id: 2, key: "yourExpertise", title: "Your Expertise" },
  { id: 3, key: "servicesAndPricing", title: "Services & Pricing" },
  { id: 4, key: "workGallery", title: "Work Gallery" },
  { id: 5, key: "availability", title: "Availability" },
  { id: 6, key: "getVerified", title: "Get Verified" },
];

const COMPLETION_WEIGHTS = {
  aboutYou: 10,
  profilePhoto: 5,
  yourExpertise: 15,
  servicesAndPricing: 20,
  workGallery: 25,
  availability: 10,
  getVerified: 15,
};

const PROFILE_BENEFITS = [
  "Higher visibility in search results",
  "Build trust with verification",
  "Get more booking requests",
  "Grow your business with RoopSetu",
];

const SUGGESTED_LANGUAGES = ["Gujarati", "Hindi", "English"];

const SERVICE_NAME_OPTIONS = [
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
];

const WORK_TYPE_OPTIONS = ["Freelance", "Salon based", "Both"];
const WORKING_DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const GALLERY_CATEGORY_OPTIONS = ["Bridal", "Party", "Mehndi", "Hair", "Nail", "Before & After"];
const GALLERY_FILTER_OPTIONS = [
  "All",
  "Bridal Makeup",
  "Hair Styling",
  "Mehendi",
  "Nail Art",
  "Party Makeup",
  "Before & After",
];

const splitFullName = (fullName = "") => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  return {
    firstName: parts[0] || null,
    lastName: parts.slice(1).join(" ") || null,
  };
};

const parseIntegerInput = (value, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.replace(/,/g, "").trim();
    const matched = normalized.match(/-?\d+/);

    if (matched) {
      return Number(matched[0]);
    }
  }

  return fallback;
};

const buildServices = (services = []) =>
  services.map((service) => ({
    name: service.name,
    price: parseIntegerInput(service.price, 0),
    duration: service.duration,
    description: service.description || null,
  }));

const buildPortfolio = (portfolio = []) =>
  portfolio.map((item) => ({
    imageUrl: item.imageUrl,
    title: item.title || null,
    category: item.category || null,
  }));

const buildCertificates = (certificates = []) =>
  certificates.map((item) => ({
    title: item.title,
    fileUrl: item.fileUrl,
  }));

const getCompletionSnapshot = (profile) => {
  const profilePhotoUploaded = hasText(profile.profilePhoto || "");
  const basicComplete =
    hasText(profile.user?.firstName || "") &&
    hasText(profile.user?.phone || "") &&
    hasText(profile.user?.email || "") &&
    hasText(profile.gender || "") &&
    Boolean(profile.dateOfBirth) &&
    hasText(profile.city || "") &&
    hasText(profile.area || "") &&
    Array.isArray(profile.languages) &&
    profile.languages.length > 0;

  const expertiseComplete =
    hasText(profile.primaryCategory || "") &&
    parseIntegerInput(profile.experienceYears, 0) > 0 &&
    hasText(profile.workType || "") &&
    hasText(profile.about || "");

  const servicesComplete = Array.isArray(profile.services) && profile.services.length > 0;
  const galleryComplete = Array.isArray(profile.portfolio) && profile.portfolio.length > 0;
  const availabilityComplete =
    Array.isArray(profile.workingDays) &&
    profile.workingDays.length > 0 &&
    hasText(profile.startTime || "") &&
    hasText(profile.endTime || "") &&
    hasText(profile.serviceLocation || "") &&
    parseIntegerInput(profile.travelRadius, 0) > 0;
  const verificationComplete =
    Array.isArray(profile.certificates) &&
    profile.certificates.some(
      (certificate) => hasText(certificate.title || "") && hasText(certificate.fileUrl || ""),
    );

  const completedSteps = [
    basicComplete,
    expertiseComplete,
    servicesComplete,
    galleryComplete,
    availabilityComplete,
    verificationComplete,
  ].filter(Boolean).length;

  const percentage =
    (basicComplete ? COMPLETION_WEIGHTS.aboutYou : 0) +
    (profilePhotoUploaded ? COMPLETION_WEIGHTS.profilePhoto : 0) +
    (expertiseComplete ? COMPLETION_WEIGHTS.yourExpertise : 0) +
    (servicesComplete ? COMPLETION_WEIGHTS.servicesAndPricing : 0) +
    (galleryComplete ? COMPLETION_WEIGHTS.workGallery : 0) +
    (availabilityComplete ? COMPLETION_WEIGHTS.availability : 0) +
    (verificationComplete ? COMPLETION_WEIGHTS.getVerified : 0);

  return {
    completedSteps,
    percentage,
    profilePhotoUploaded,
    weights: COMPLETION_WEIGHTS,
    stepStates: {
      aboutYou: basicComplete,
      yourExpertise: expertiseComplete,
      servicesAndPricing: servicesComplete,
      workGallery: galleryComplete,
      availability: availabilityComplete,
      getVerified: verificationComplete,
    },
  };
};

const mapBeauticianProfileFields = (data) => ({
  profilePhoto: data.profilePhoto || null,
  gender: data.gender || null,
  dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
  city: data.city,
  area: data.area,
  languages: data.languages || [],
  primaryCategory: data.primaryCategory,
  experienceYears: parseIntegerInput(data.experienceYears, 0),
  workType: data.workType,
  salonName: data.salonName || null,
  about: data.about,
  serviceLocation: data.serviceLocation,
  travelRadius: parseIntegerInput(data.travelRadius, 0),
  workingDays: data.workingDays || [],
  startTime: data.startTime || null,
  endTime: data.endTime || null,
  businessName: data.businessName || null,
  businessAddress: data.businessAddress || null,
  gstNumber: data.gstNumber || null,
  instagram: data.instagram || null,
  facebook: data.facebook || null,
  youtube: data.youtube || null,
  website: data.website || null,
  pinterest: data.pinterest || null,
  governmentIdType: data.governmentIdType || null,
  governmentIdUrl: data.governmentIdUrl || null,
  selfieUrl: data.selfieUrl || null,
});

const mapBeauticianProfileCreateData = (userId, data) => ({
  userId,
  ...mapBeauticianProfileFields(data),
});

const mapBeauticianProfileUpdateData = (data) => mapBeauticianProfileFields(data);

const enrichProfileCompletion = async (profile, { syncUser = false } = {}) => {
  const completion = getCompletionSnapshot(profile);

  if (syncUser) {
    await prisma.user.update({
      where: { id: profile.userId },
      data: {
        profileCompleted: completion.percentage === 100,
      },
    });
  }

  return {
    ...profile,
    completion,
  };
};

const cacheProfile = async (userId, profile) => {
  await redis.set(getProfileCacheKey(userId), JSON.stringify(profile), {
    EX: PROFILE_CACHE_TTL_SECONDS,
  });
};

const readBeauticianProfileFromDatabase = async (userId) => {
  const profile = await prisma.beauticianProfile.findUnique({
    where: { userId },
    include: {
      services: true,
      portfolio: true,
      certificates: true,
      user: true,
    },
  });

  if (!profile) {
    return null;
  }

  const enrichedProfile = await enrichProfileCompletion(profile);
  await cacheProfile(userId, enrichedProfile);

  return enrichedProfile;
};

export const getBeauticianProfileMetaService = async () => {
  const cachedMeta = await redis.get(PROFILE_META_CACHE_KEY);

  if (cachedMeta) {
    return JSON.parse(cachedMeta);
  }

  const meta = {
    steps: STEP_META,
    benefits: PROFILE_BENEFITS,
    options: {
      suggestedLanguages: SUGGESTED_LANGUAGES,
      serviceNames: SERVICE_NAME_OPTIONS,
      workTypes: WORK_TYPE_OPTIONS,
      workingDays: WORKING_DAY_OPTIONS,
      galleryCategories: GALLERY_CATEGORY_OPTIONS,
      galleryFilters: GALLERY_FILTER_OPTIONS,
    },
    completionWeights: COMPLETION_WEIGHTS,
  };

  await redis.set(PROFILE_META_CACHE_KEY, JSON.stringify(meta), {
    EX: PROFILE_CACHE_TTL_SECONDS,
  });

  return meta;
};

export const warmBeauticianDashboardCacheService = async (userId) => {
  const [metaResult, profileResult] = await Promise.allSettled([
    getBeauticianProfileMetaService(),
    readBeauticianProfileFromDatabase(userId),
  ]);

  return {
    meta:
      metaResult.status === "fulfilled"
        ? metaResult.value
        : null,
    profile:
      profileResult.status === "fulfilled"
        ? profileResult.value
        : null,
  };
};

export const getBeauticianDashboardBootstrapService = async (userId) => {
  const [meta, profile] = await Promise.all([
    getBeauticianProfileMetaService(),
    getMyBeauticianProfileService(userId),
  ]);

  return {
    meta,
    profile,
  };
};

export const createBeauticianProfileService = async (userId, data) => {
  const existingProfile = await prisma.beauticianProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("Beautician profile already exists");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "BEAUTICIAN") {
    throw new Error("Only beauticians can create profile");
  }

  const { firstName, lastName } = splitFullName(data.fullName || "");

  const [, profile] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: data.phone || null,
        email: data.email || undefined,
      },
    }),
    prisma.beauticianProfile.create({
      data: {
        ...mapBeauticianProfileCreateData(userId, data),
        services: {
          create: buildServices(data.services),
        },
        portfolio: {
          create: buildPortfolio(data.portfolio),
        },
        certificates: {
          create: buildCertificates(data.certificates),
        },
      },
      include: {
        services: true,
        portfolio: true,
        certificates: true,
        user: true,
      },
    }),
  ]);

  const enrichedProfile = await enrichProfileCompletion(profile, { syncUser: true });
  await cacheProfile(userId, enrichedProfile);

  return enrichedProfile;
};

export const updateBeauticianProfileService = async (userId, data) => {
  const existingProfile = await prisma.beauticianProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Beautician profile not found");
  }

  const { firstName, lastName } = splitFullName(data.fullName || "");

  const [, profile] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phone: data.phone || null,
        email: data.email || undefined,
      },
    }),
    prisma.beauticianProfile.update({
      where: { userId },
      data: {
        ...mapBeauticianProfileUpdateData(data),
        services: {
          deleteMany: {},
          create: buildServices(data.services),
        },
        portfolio: {
          deleteMany: {},
          create: buildPortfolio(data.portfolio),
        },
        certificates: {
          deleteMany: {},
          create: buildCertificates(data.certificates),
        },
      },
      include: {
        services: true,
        portfolio: true,
        certificates: true,
        user: true,
      },
    }),
  ]);

  const enrichedProfile = await enrichProfileCompletion(profile, { syncUser: true });
  await cacheProfile(userId, enrichedProfile);

  return enrichedProfile;
};

export const getMyBeauticianProfileService = async (userId) => {
  const cachedProfile = await redis.get(getProfileCacheKey(userId));

  if (cachedProfile) {
    return JSON.parse(cachedProfile);
  }

  return readBeauticianProfileFromDatabase(userId);
};
