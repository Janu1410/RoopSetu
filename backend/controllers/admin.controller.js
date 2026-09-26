import { getAdminDashboardService } from "../services/admin.service.js";

export const getAdminDashboard = async (_req, res) => {
  try {
    const result = await getAdminDashboardService();

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch admin dashboard data",
    });
  }
};
