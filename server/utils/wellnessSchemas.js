import { z } from "zod";

export const journalSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  content: z.string().trim().min(1, "Journal entry is required").max(8000),
  prompt: z.string().trim().max(500).optional().default(""),
  mood: z.string().trim().max(40).optional().default("")
});

export const moodSchema = z.object({
  mood: z.enum(["Great", "Good", "Okay", "Low"]),
  factors: z.array(z.string().trim().min(1).max(40)).max(12).optional().default([]),
  note: z.string().trim().max(1000).optional().default("")
});

export const settingsSchema = z.object({
  fullName: z.string().trim().min(2).max(80).optional(),
  preferences: z
    .object({
      gentleReminders: z.boolean().optional(),
      weeklyReflection: z.boolean().optional(),
      safetyCheckIn: z.boolean().optional()
    })
    .optional()
});
