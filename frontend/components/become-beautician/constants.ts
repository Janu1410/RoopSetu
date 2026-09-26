import { Award, ShieldCheck, Star } from "lucide-react";
import type {
  FormState,
  TrustBadge,
} from "@/components/become-beautician/types";

export const steps = [
  "Welcome",
  "Basic Information",
  "Professional Identity",
  "Services",
  "Portfolio",
  "Pricing",
  "Availability",
  "Verification & Trust",
  "Preview & Publish",
] as const;

export const languageOptions = ["English", "Hindi", "Gujarati"];

export const categoryOptions = [
  "Bridal Makeup",
  "Party Makeup",
  "Hair Styling",
  "Nail Art",
  "Facial",
  "Skin Care",
  "Mehendi",
  "Spa",
  "Other",
];

export const workTypes = ["Freelance", "Salon Owner", "Salon Employee"];
export const serviceRadiusOptions = ["5km", "10km", "20km"];
export const workingDayOptions = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
export const portfolioCategoryOptions = [
  "Before / After",
  "Bridal",
  "Hair Styling",
  "Nail Art",
  "Editorial",
];

export const trustBadges: TrustBadge[] = [
  { label: "Verified Beautician", icon: ShieldCheck },
  { label: "Certified Professional", icon: Award },
  { label: "Top Rated", icon: Star },
];

export const statusFlow = [
  "Draft",
  "Submitted",
  "Under Review",
  "Approved",
  "Live on Marketplace",
];

export const previewPortfolio = [
  "Bridal Transformation",
  "Soft Glam Look",
  "Hair Styling Finish",
  "Mehendi Detail",
];

export const initialState: FormState = {
  fullName: "Priya Shah",
  profilePhoto: "Priya Profile.jpg",
  phone: "+91 98765 43210",
  email: "priya@roopsetu.in",
  gender: "Female",
  city: "Vadodara",
  area: "Alkapuri",
  languages: ["English", "Hindi", "Gujarati"],
  primaryCategory: "Bridal Makeup",
  servicesOffered: ["Bridal Makeup", "Party Makeup", "Hair Styling", "Mehendi"],
  yearsOfExperience: "5",
  workType: "Freelance",
  salonName: "Priya Beauty Studio",
  about:
    "Professional makeup artist with 5+ years of experience in bridal, party and engagement makeup.",
  serviceRadius: "10km",
  governmentId: null,
  instagram: "@priyabeautystudio",
  facebook: "",
  website: "",
  beautyCertificate: "Professional certificate.pdf",
  academyCertificate: null,
  workshopCertificate: null,
  portfolioPhotos: [
    "bridal-look-1.jpg",
    "bridal-look-2.jpg",
    "hair-style-1.jpg",
  ],
  portfolioCategories: ["Bridal", "Hair Styling"],
  reelLink: "",
  shortVideo: null,
  pricing: [
    { id: "1", name: "Bridal Makeup", price: "5000", duration: "180 min" },
    { id: "2", name: "Party Makeup", price: "2000", duration: "90 min" },
    { id: "3", name: "Hair Styling", price: "1500", duration: "45 min" },
    { id: "4", name: "Mehendi", price: "800", duration: "60 min" },
  ],
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  startTime: "09:00",
  endTime: "20:00",
  sameDayBooking: true,
  emergencyBooking: false,
  serviceLocation: "Both",
  salonAddress: "302, Ivory Plaza, Alkapuri Main Road, Vadodara",
  mapsLocation: "https://maps.google.com/?q=Alkapuri+Vadodara",
};
