import { createActivity } from "../services/activityService.js";

export async function getSettings(req, res) {
  res.json({ user: req.user.toSafeObject() });
}

export async function updateSettings(req, res, next) {
  try {
    if (req.body.fullName) {
      req.user.fullName = req.body.fullName;
    }

    if (req.body.preferences) {
      req.user.preferences = {
        ...req.user.preferences?.toObject?.(),
        ...req.body.preferences
      };
    }

    await req.user.save();

    await createActivity({
      user: req.user._id,
      type: "settings",
      title: "Settings updated",
      description: "Profile or preference changes were saved",
      metadata: { preferences: req.user.preferences }
    });

    res.json({ user: req.user.toSafeObject() });
  } catch (error) {
    next(error);
  }
}
