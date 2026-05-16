import { Router } from "express";
import mongoose from "mongoose";
import { getDatabaseState, isDatabaseReady } from "../config/db.js";

const router = Router();

router.get("/status", (_req, res) => {
  res.json({
    service: "mindease-api",
    status: "ok",
    version: "debug-2026-05-16-01",
    nodeEnv: process.env.NODE_ENV || "unset",
    railwayCommit: process.env.RAILWAY_GIT_COMMIT_SHA || "unset",
    railwayService: process.env.RAILWAY_SERVICE_NAME || "unset",
    database: {
      state: getDatabaseState(),
      ready: isDatabaseReady(),
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || "unset",
      name: mongoose.connection.name || "unset"
    },
    env: {
      hasMongoUri: Boolean(process.env.MONGO_URI),
      hasJwtSecret: Boolean(process.env.JWT_SECRET),
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      clientUrl: process.env.CLIENT_URL || "unset",
      viteApiUrl: process.env.VITE_API_URL || "unset"
    }
  });
});

export default router;
