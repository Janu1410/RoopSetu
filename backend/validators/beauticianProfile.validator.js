import { z } from "zod";

const emptyToUndefined = (value) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const optionalTrimmedString = z.preprocess(
  emptyToUndefined,
  z.string().trim().min(1).optional(),
);

const optionalNullableTrimmedString = z.preprocess(
  (value) => {
    if (value === null) {
      return null;
    }

    return emptyToUndefined(value);
  },
  z.union([z.string().trim().min(1), z.null()]).optional(),
);

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .trim()
    .url("Enter a valid URL.")
    .optional(),
);

const optionalInstagram = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .trim()
    .refine(
      (value) =>
        /^@?[a-zA-Z0-9._]{2,30}$/.test(value) ||
        /^https?:\/\//i.test(value),
      "Enter a valid Instagram handle or URL.",
    )
    .optional(),
);

const optionalIntegerInput = z
  .union([z.string(), z.number(), z.null(), z.undefined()])
  .refine((value) => {
    if (value === undefined || value === null || value === "") {
      return true;
    }

    const normalized =
      typeof value === "number" ? String(value) : String(value).replace(/,/g, "").trim();

    return /^-?\d+$/.test(normalized);
  }, "Enter a valid number.");

const optionalDateString = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date.")
    .optional(),
);

const serviceSchema = z.object({
  name: z.string().trim().min(1, "Service name is required."),
  price: z
    .union([z.string(), z.number()])
    .refine((value) => {
      const normalized =
        typeof value === "number" ? String(value) : value.replace(/,/g, "").trim();
      return /^\d+$/.test(normalized);
    }, "Enter a valid price.")
    .refine((value) => Number(typeof value === "number" ? value : value.replace(/,/g, "").trim()) >= 0, {
      message: "Price cannot be negative.",
    }),
  duration: z.string().trim().min(1, "Duration is required."),
  description: optionalNullableTrimmedString,
});

const portfolioSchema = z.object({
  imageUrl: z.string().trim().min(1, "Work media is required."),
  title: optionalNullableTrimmedString,
  category: optionalNullableTrimmedString,
});

const certificateSchema = z.object({
  title: z.string().trim().min(1, "Certificate title is required."),
  fileUrl: z.string().trim().min(1, "Certificate file is required."),
});

export const beauticianProfileSchema = z.object({
  fullName: optionalTrimmedString,
  phone: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .trim()
      .regex(/^\d{10,15}$/, "Enter a valid phone number.")
      .optional(),
  ),
  email: z.preprocess(
    emptyToUndefined,
    z.string().trim().email("Enter a valid email address.").optional(),
  ),
  profilePhoto: optionalNullableTrimmedString,
  gender: optionalNullableTrimmedString,
  dateOfBirth: optionalDateString.nullable().optional(),
  city: optionalTrimmedString,
  area: optionalTrimmedString,
  languages: z.array(z.string().trim().min(1)).optional(),
  primaryCategory: optionalTrimmedString,
  experienceYears: optionalIntegerInput,
  workType: optionalTrimmedString,
  salonName: optionalNullableTrimmedString,
  about: optionalTrimmedString,
  serviceLocation: optionalTrimmedString,
  travelRadius: optionalIntegerInput,
  workingDays: z.array(z.string().trim().min(1)).optional(),
  startTime: optionalNullableTrimmedString,
  endTime: optionalNullableTrimmedString,
  instagram: optionalInstagram.nullable().optional(),
  facebook: optionalUrl.nullable().optional(),
  youtube: optionalUrl.nullable().optional(),
  website: optionalUrl.nullable().optional(),
  pinterest: optionalUrl.nullable().optional(),
  services: z.array(serviceSchema).optional(),
  portfolio: z.array(portfolioSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
});

export const validateBeauticianProfileInput = (data) =>
  beauticianProfileSchema.safeParse(data);

export const formatZodErrors = (error) =>
  error.issues.reduce((accumulator, issue) => {
    const key = issue.path.join(".") || "root";

    if (!accumulator[key]) {
      accumulator[key] = issue.message;
    }

    return accumulator;
  }, {});
