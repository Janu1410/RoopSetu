import {
  createBeauticianProfileService,
  getBeauticianDashboardBootstrapService,
  getBeauticianProfileMetaService,
  getMyBeauticianProfileService,
  updateBeauticianProfileService,
} from "../services/beautician.service.js";
import {
  formatZodErrors,
  validateBeauticianProfileInput,
} from "../validators/beauticianProfile.validator.js";

export const createBeauticianProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const parsed = validateBeauticianProfileInput(req.body);

    if (!parsed.success) {
      return res.status(422).json({
        message: "Please fix the highlighted fields.",
        errors: formatZodErrors(parsed.error),
      });
    }

    const result = await createBeauticianProfileService(userId, parsed.data);

    return res.status(201).json({
      message: "Beautician profile created successfully",
      profile: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to create beautician profile",
    });
  }
};

export const getMyBeauticianProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await getMyBeauticianProfileService(userId);

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};

export const getBeauticianDashboardBootstrap = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await getBeauticianDashboardBootstrapService(userId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  }
};

export const getBeauticianProfileMeta = async (_req, res) => {
  try {
    const meta = await getBeauticianProfileMetaService();

    return res.status(200).json(meta);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Failed to fetch profile metadata",
    });
  }
};

export const updateBeauticianProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const parsed = validateBeauticianProfileInput(req.body);

    if (!parsed.success) {
      return res.status(422).json({
        message: "Please fix the highlighted fields.",
        errors: formatZodErrors(parsed.error),
      });
    }

    const result = await updateBeauticianProfileService(userId, parsed.data);

    return res.status(200).json({
      message: "Beautician profile updated successfully",
      profile: result,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || "Failed to update beautician profile",
    });
  }
};
