import { Router } from "express";
import { guide, history } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { aiGuideSchema } from "../utils/aiSchemas.js";

const router = Router();

router.get("/history", protect, history);
router.post("/guide", protect, validate(aiGuideSchema), guide);

export default router;
