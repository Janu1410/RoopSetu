import express from "express";
import { getAdminDashboard } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getAdminDashboard);

export default router;
