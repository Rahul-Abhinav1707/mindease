import JournalEntry from "../models/JournalEntry.js";
import { createActivity } from "../services/activityService.js";

export async function listJournals(req, res, next) {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json({ entries });
  } catch (error) {
    next(error);
  }
}

export async function createJournal(req, res, next) {
  try {
    const entry = await JournalEntry.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      prompt: req.body.prompt,
      mood: req.body.mood
    });

    await createActivity({
      user: req.user._id,
      type: "journal",
      title: "Journal entry saved",
      description: entry.title,
      metadata: { journalId: entry._id }
    });

    res.status(201).json({ entry });
  } catch (error) {
    next(error);
  }
}
