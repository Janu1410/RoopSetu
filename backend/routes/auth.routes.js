import express from "express";
import {
  sendOtp,
  verifyOtp,
  completeProfile,
  loginAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/complete-profile", completeProfile);
router.post("/admin/login", loginAdmin);

export default router;
