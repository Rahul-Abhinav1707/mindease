import { z } from "zod";

export const aiGuideSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(1600, "Message is too long"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(2000)
      })
    )
    .max(8)
    .optional()
    .default([])
});
