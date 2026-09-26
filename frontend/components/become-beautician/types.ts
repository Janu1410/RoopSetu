import type { LucideIcon } from "lucide-react";

export type ServiceRow = {
  id: string;
  name: string;
  price: string;
  duration: string;
};

export type ServiceLocation = "At Client Home" | "At My Salon" | "Both";

export type FormState = {
  fullName: string;
  profilePhoto: string | null;
  phone: string;
  email: string;
  gender: string;
  city: string;
  area: string;
  languages: string[];
  primaryCategory: string;
  servicesOffered: string[];
  yearsOfExperience: string;
  workType: string;
  salonName: string;
  about: string;
  serviceRadius: string;
  governmentId: string | null;
  instagram: string;
  facebook: string;
  website: string;
  beautyCertificate: string | null;
  academyCertificate: string | null;
  workshopCertificate: string | null;
  portfolioPhotos: string[];
  portfolioCategories: string[];
  reelLink: string;
  shortVideo: string | null;
  pricing: ServiceRow[];
  workingDays: string[];
  startTime: string;
  endTime: string;
  sameDayBooking: boolean;
  emergencyBooking: boolean;
  serviceLocation: ServiceLocation;
  salonAddress: string;
  mapsLocation: string;
};

export type TrustBadge = {
  label: string;
  icon: LucideIcon;
};
