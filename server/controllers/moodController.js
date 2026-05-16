import MoodCheckIn from "../models/MoodCheckIn.js";
import { createActivity } from "../services/activityService.js";

export async function listMoods(req, res, next) {
  try {
    const moods = await MoodCheckIn.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(30);
    res.json({ moods });
  } catch (error) {
    next(error);
  }
}

export async function createMood(req, res, next) {
  try {
    const mood = await MoodCheckIn.create({
      user: req.user._id,
      mood: req.body.mood,
      factors: req.body.factors,
      note: req.body.note
    });

    await createActivity({
      user: req.user._id,
      type: "mood",
      title: `${mood.mood} mood check-in`,
      description: mood.factors.length ? `Factors: ${mood.factors.join(", ")}` : "No factors selected",
      metadata: { moodId: mood._id, mood: mood.mood }
    });

    res.status(201).json({ mood });
  } catch (error) {
    next(error);
  }
}
