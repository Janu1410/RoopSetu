import express from "express";
import {
  createBeauticianProfile,
  getBeauticianDashboardBootstrap,
  getBeauticianProfileMeta,
  getMyBeauticianProfile,
  updateBeauticianProfile,
} from "../controllers/beautician.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/meta", authMiddleware, getBeauticianProfileMeta);
router.get("/dashboard", authMiddleware, getBeauticianDashboardBootstrap);
router.post("/profile", authMiddleware, createBeauticianProfile);
router.put("/profile", authMiddleware, updateBeauticianProfile);
router.get("/profile/me", authMiddleware, getMyBeauticianProfile);

export default router;
