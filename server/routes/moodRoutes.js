import { Router } from "express";
import { createMood, listMoods } from "../controllers/moodController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { moodSchema } from "../utils/wellnessSchemas.js";

const router = Router();

router.use(protect);
router.get("/", listMoods);
router.post("/", validate(moodSchema), createMood);

export default router;
