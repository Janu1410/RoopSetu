import {
  sendOtpService,
  verifyOtpService,
  completeProfileService,
  loginAdminService,
} from "../services/auth.service.js";
import {
  validateSendOtpInput,
  validateVerifyOtpInput,
  validateCompleteProfileInput,
  validateLoginAdminInput,
  formatZodErrors,
} from "../validators/auth.validator.js";

export const sendOtp = async (req, res) => {
  try {
    const parsed = validateSendOtpInput(req.body);

    if (!parsed.success) {
      const errors = formatZodErrors(parsed.error);
      const firstError = Object.values(errors)[0];
      return res.status(400).json({
        message: firstError || "Validation failed",
        errors,
      });
    }

    const { email } = parsed.data;
    const result = await sendOtpService(email);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const parsed = validateVerifyOtpInput(req.body);

    if (!parsed.success) {
      const errors = formatZodErrors(parsed.error);
      const firstError = Object.values(errors)[0];
      return res.status(400).json({
        message: firstError || "Validation failed",
        errors,
      });
    }

    const { email, otp } = parsed.data;
    const result = await verifyOtpService(email, otp);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);

    if (error.message === "Invalid or expired OTP") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "OTP verification failed" });
  }
};

export const completeProfile = async (req, res) => {
  try {
    const parsed = validateCompleteProfileInput(req.body);

    if (!parsed.success) {
      const errors = formatZodErrors(parsed.error);
      const firstError = Object.values(errors)[0];
      return res.status(400).json({
        message: firstError || "Validation failed",
        errors,
      });
    }

    const { email, role, firstName, lastName, phone } = parsed.data;
    const result = await completeProfileService({
      email,
      role,
      firstName,
      lastName,
      phone,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);

    if (error.message === "Invalid role") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Profile creation failed" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const parsed = validateLoginAdminInput(req.body);

    if (!parsed.success) {
      const errors = formatZodErrors(parsed.error);
      const firstError = Object.values(errors)[0];
      return res.status(400).json({
        message: firstError || "Validation failed",
        errors,
      });
    }

    const { email, password } = parsed.data;
    const result = await loginAdminService({ email, password });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);

    if (
      error.message === "Invalid admin credentials" ||
      error.message === "Admin credentials are not configured"
    ) {
      return res.status(401).json({ message: error.message });
    }

    return res.status(500).json({ message: "Admin login failed" });
  }
};

