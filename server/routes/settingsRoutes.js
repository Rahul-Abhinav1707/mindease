import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { settingsSchema } from "../utils/wellnessSchemas.js";

const router = Router();

router.use(protect);
router.get("/", getSettings);
router.put("/", validate(settingsSchema), updateSettings);

export default router;
