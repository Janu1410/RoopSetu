-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateTable
CREATE TABLE "BeauticianProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "city" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "languages" TEXT[],
    "primaryCategory" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "workType" TEXT NOT NULL,
    "salonName" TEXT,
    "about" TEXT NOT NULL,
    "serviceLocation" TEXT NOT NULL,
    "travelRadius" INTEGER NOT NULL,
    "workingDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "startTime" TEXT,
    "endTime" TEXT,
    "businessName" TEXT,
    "businessAddress" TEXT,
    "gstNumber" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "youtube" TEXT,
    "website" TEXT,
    "pinterest" TEXT,
    "governmentIdType" TEXT,
    "governmentIdUrl" TEXT,
    "selfieUrl" TEXT,
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BeauticianProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BeauticianService" (
    "id" TEXT NOT NULL,
    "beauticianId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BeauticianService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioImage" (
    "id" TEXT NOT NULL,
    "beauticianId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "beauticianId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BeauticianProfile_userId_key" ON "BeauticianProfile"("userId");

-- AddForeignKey
ALTER TABLE "BeauticianProfile" ADD CONSTRAINT "BeauticianProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BeauticianService" ADD CONSTRAINT "BeauticianService_beauticianId_fkey" FOREIGN KEY ("beauticianId") REFERENCES "BeauticianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioImage" ADD CONSTRAINT "PortfolioImage_beauticianId_fkey" FOREIGN KEY ("beauticianId") REFERENCES "BeauticianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_beauticianId_fkey" FOREIGN KEY ("beauticianId") REFERENCES "BeauticianProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
