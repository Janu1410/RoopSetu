import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import redis from "../config/redis.js";
import { warmBeauticianDashboardCacheService } from "./beautician.service.js";
import { sendOtpEmail } from "./mail.service.js";

const OTP_TTL_SECONDS = 10 * 60;
const getOtpCacheKey = (email) => `auth:otp:${email.trim().toLowerCase()}`;

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const getAdminConfig = () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Admin credentials are not configured");
  }

  return {
    email,
    password,
    firstName: process.env.ADMIN_FIRST_NAME?.trim() || "RoopSetu",
    lastName: process.env.ADMIN_LAST_NAME?.trim() || "Admin",
  };
};

const getBeauticianProfileStatus = async (userId) => {
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
    return {
      hasProfile: false,
      profileCompleted: false,
    };
  }

  const profilePhotoUploaded = Boolean(profile.profilePhoto?.trim());
  const basicComplete =
    Boolean(profile.user?.firstName?.trim()) &&
    Boolean(profile.user?.phone?.trim()) &&
    Boolean(profile.user?.email?.trim()) &&
    Boolean(profile.gender?.trim()) &&
    Boolean(profile.dateOfBirth) &&
    Boolean(profile.city?.trim()) &&
    Boolean(profile.area?.trim()) &&
    Array.isArray(profile.languages) &&
    profile.languages.length > 0;
  const expertiseComplete =
    Boolean(profile.primaryCategory?.trim()) &&
    Number(profile.experienceYears || 0) > 0 &&
    Boolean(profile.workType?.trim()) &&
    Boolean(profile.about?.trim());
  const servicesComplete = Array.isArray(profile.services) && profile.services.length > 0;
  const galleryComplete = Array.isArray(profile.portfolio) && profile.portfolio.length > 0;
  const availabilityComplete =
    Array.isArray(profile.workingDays) &&
    profile.workingDays.length > 0 &&
    Boolean(profile.startTime?.trim()) &&
    Boolean(profile.endTime?.trim()) &&
    Boolean(profile.serviceLocation?.trim()) &&
    Number(profile.travelRadius || 0) > 0;
  const verificationComplete =
    Array.isArray(profile.certificates) &&
    profile.certificates.some(
      (certificate) => Boolean(certificate.title?.trim()) && Boolean(certificate.fileUrl?.trim()),
    );

  const profileCompleted =
    basicComplete &&
    expertiseComplete &&
    servicesComplete &&
    galleryComplete &&
    availabilityComplete &&
    verificationComplete &&
    profilePhotoUploaded;

  return {
    hasProfile: true,
    profileCompleted,
  };
};

export const sendOtpService = async (email) => {
  const otp = generateOtp();
  const normalizedEmail = email.trim().toLowerCase();

  await redis.set(getOtpCacheKey(normalizedEmail), otp, {
    EX: OTP_TTL_SECONDS,
  });

  await sendOtpEmail(email, otp);

  return {
    message: "OTP sent successfully",
  };
};

export const verifyOtpService = async (email, otp) => {
  const normalizedEmail = email.trim().toLowerCase();
  const storedOtp = await redis.get(getOtpCacheKey(normalizedEmail));

  if (!storedOtp || storedOtp !== otp) {
    throw new Error("Invalid or expired OTP");
  }

  await redis.del(getOtpCacheKey(normalizedEmail));

  let user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        isEmailVerified: true,
      },
    });
  }

  let canLoginDirectly = Boolean(user.firstName && user.lastName && user.phone && user.role);
  let isProfileFullyCompleted = user.profileCompleted;

  if (user.role === "BEAUTICIAN") {
    const beauticianStatus = await getBeauticianProfileStatus(user.id);
    isProfileFullyCompleted = beauticianStatus.profileCompleted;

    if (user.profileCompleted !== beauticianStatus.profileCompleted) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          profileCompleted: beauticianStatus.profileCompleted,
        },
      });
    }
  }

  if (canLoginDirectly) {
    if (user.role === "BEAUTICIAN") {
      await warmBeauticianDashboardCacheService(user.id);
    }

    const token = generateToken(user);

    return {
      message: "Login successful",
      isNewUser: false,
      profileCompleted: isProfileFullyCompleted,
      token,
      user,
    };
  }

  return {
    message: "OTP verified. Complete profile.",
    isNewUser: !user.firstName,
    profileCompleted: false,
    needRoleSelection: !user.role,
    userId: user.id,
    email: user.email,
  };
};

export const completeProfileService = async ({
  email,
  role,
  firstName,
  lastName,
  phone,
}) => {
  if (!["CLIENT", "BEAUTICIAN"].includes(role)) {
    throw new Error("Invalid role");
  }

  const isBeautician = role === "BEAUTICIAN";
  const user = await prisma.user.update({
    where: { email },
    data: {
      role,
      firstName,
      lastName,
      phone,
      profileCompleted: !isBeautician,
      isEmailVerified: true,
    },
  });

  const token = generateToken(user);

  if (user.role === "BEAUTICIAN") {
    await warmBeauticianDashboardCacheService(user.id);
  }

  return {
    message: isBeautician
      ? "Profile basics saved successfully"
      : "Profile created successfully",
    token,
    user,
  };
};

export const loginAdminService = async ({ email, password }) => {
  const adminConfig = getAdminConfig();
  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail !== adminConfig.email ||
    password !== adminConfig.password
  ) {
    throw new Error("Invalid admin credentials");
  }

  let user = await prisma.user.findUnique({
    where: { email: adminConfig.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: adminConfig.email,
        firstName: adminConfig.firstName,
        lastName: adminConfig.lastName,
        role: "ADMIN",
        isEmailVerified: true,
        profileCompleted: true,
      },
    });
  } else if (
    user.role !== "ADMIN" ||
    user.firstName !== adminConfig.firstName ||
    user.lastName !== adminConfig.lastName ||
    !user.isEmailVerified ||
    !user.profileCompleted
  ) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: adminConfig.firstName,
        lastName: adminConfig.lastName,
        role: "ADMIN",
        isEmailVerified: true,
        profileCompleted: true,
      },
    });
  }

  const token = generateToken(user);

  return {
    message: "Admin login successful",
    token,
    user,
  };
};
