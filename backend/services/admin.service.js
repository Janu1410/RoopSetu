import prisma from "../config/prisma.js";

const formatDate = (value) => (value ? value.toISOString() : null);

export const getAdminDashboardService = async () => {
  const [totalUsers, totalBeauticians, verifiedBeauticians, recentUsers, recentBeauticians] =
    await Promise.all([
      prisma.user.count({
        where: {
          role: {
            not: "ADMIN",
          },
        },
      }),
      prisma.user.count({
        where: {
          role: "BEAUTICIAN",
        },
      }),
      prisma.beauticianProfile.count({
        where: {
          verificationStatus: "VERIFIED",
        },
      }),
      prisma.user.findMany({
        where: {
          role: {
            not: "ADMIN",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 12,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          role: true,
          profileCompleted: true,
          isEmailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.beauticianProfile.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        take: 12,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              profileCompleted: true,
              isEmailVerified: true,
              createdAt: true,
              updatedAt: true,
            },
          },
          services: true,
          portfolio: {
            select: {
              id: true,
              imageUrl: true,
              title: true,
              category: true,
            },
          },
          certificates: true,
        },
      }),
    ]);

  return {
    summary: {
      totalUsers,
      totalBeauticians,
      verifiedBeauticians,
      pendingBeauticianVerification: totalBeauticians - verifiedBeauticians,
    },
    users: recentUsers.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    })),
    beauticians: recentBeauticians.map((profile) => ({
      id: profile.id,
      userId: profile.userId,
      fullName:
        [profile.user?.firstName, profile.user?.lastName].filter(Boolean).join(" ") ||
        "Unnamed beautician",
      email: profile.user?.email || "",
      phone: profile.user?.phone || null,
      isEmailVerified: Boolean(profile.user?.isEmailVerified),
      userCreatedAt: formatDate(profile.user?.createdAt),
      userUpdatedAt: formatDate(profile.user?.updatedAt),
      city: profile.city,
      area: profile.area,
      languages: profile.languages,
      gender: profile.gender,
      dateOfBirth: formatDate(profile.dateOfBirth),
      primaryCategory: profile.primaryCategory,
      experienceYears: profile.experienceYears,
      workType: profile.workType,
      salonName: profile.salonName,
      serviceLocation: profile.serviceLocation,
      travelRadius: profile.travelRadius,
      workingDays: profile.workingDays,
      startTime: profile.startTime,
      endTime: profile.endTime,
      verificationStatus: profile.verificationStatus,
      profileCompleted: Boolean(profile.user?.profileCompleted),
      about: profile.about,
      profilePhoto: profile.profilePhoto,
      portfolioPreview: profile.portfolio[0]?.imageUrl || null,
      businessName: profile.businessName,
      businessAddress: profile.businessAddress,
      gstNumber: profile.gstNumber,
      instagram: profile.instagram,
      facebook: profile.facebook,
      youtube: profile.youtube,
      website: profile.website,
      pinterest: profile.pinterest,
      governmentIdType: profile.governmentIdType,
      governmentIdUrl: profile.governmentIdUrl,
      selfieUrl: profile.selfieUrl,
      serviceCount: profile.services.length,
      certificateCount: profile.certificates.length,
      featuredServices: profile.services,
      portfolioItems: profile.portfolio,
      certificates: profile.certificates,
      createdAt: formatDate(profile.createdAt),
      updatedAt: formatDate(profile.updatedAt),
    })),
  };
};
