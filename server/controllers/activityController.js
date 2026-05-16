import Activity from "../models/Activity.js";

export async function listActivities(req, res, next) {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(60);
    res.json({ activities });
  } catch (error) {
    next(error);
  }
}
