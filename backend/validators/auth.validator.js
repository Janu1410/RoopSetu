import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address");

export const sendOtpSchema = z.object({
  email: emailSchema,
});

export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit OTP"),
});

export const completeProfileSchema = z.object({
  email: emailSchema,
  role: z.enum(["CLIENT", "BEAUTICIAN"], {
    errorMap: () => ({ message: "Invalid role" }),
  }),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export const loginAdminSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const validateSendOtpInput = (data) => sendOtpSchema.safeParse(data);
export const validateVerifyOtpInput = (data) => verifyOtpSchema.safeParse(data);
export const validateCompleteProfileInput = (data) => completeProfileSchema.safeParse(data);
export const validateLoginAdminInput = (data) => loginAdminSchema.safeParse(data);

export const formatZodErrors = (error) =>
  error.issues.reduce((accumulator, issue) => {
    const key = issue.path.join(".") || "root";
    if (!accumulator[key]) {
      accumulator[key] = issue.message;
    }
    return accumulator;
  }, {});
