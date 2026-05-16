import { Router } from "express";
import { listActivities } from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, listActivities);

export default router;
