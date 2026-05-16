import { getDatabaseState, isDatabaseReady } from "../config/db.js";

export function requireDatabase(_req, res, next) {
  if (isDatabaseReady()) {
    return next();
  }

  return res.status(503).json({
    message: "Database is not connected yet. Please retry in a moment.",
    database: getDatabaseState()
  });
}
