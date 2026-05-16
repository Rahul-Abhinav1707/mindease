import { Router } from "express";
import { createJournal, listJournals } from "../controllers/journalController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { journalSchema } from "../utils/wellnessSchemas.js";

const router = Router();

router.use(protect);
router.get("/", listJournals);
router.post("/", validate(journalSchema), createJournal);

export default router;
