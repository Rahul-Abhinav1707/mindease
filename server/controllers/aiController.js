import { createGuideResponse } from "../services/groqService.js";
import AiMessage from "../models/AiMessage.js";
import { createActivity } from "../services/activityService.js";

export async function guide(req, res, next) {
  try {
    const reply = await createGuideResponse({
      message: req.body.message,
      history: req.body.history,
      user: req.user
    });

    const [userMessage, assistantMessage] = await AiMessage.create([
      {
        user: req.user._id,
        role: "user",
        content: req.body.message
      },
      {
        user: req.user._id,
        role: "assistant",
        content: reply
      }
    ]);

    await createActivity({
      user: req.user._id,
      type: "ai",
      title: "AI guide conversation",
      description: req.body.message,
      metadata: {
        userMessageId: userMessage._id,
        assistantMessageId: assistantMessage._id
      }
    });

    res.json({ reply });
  } catch (error) {
    next(error);
  }
}

export async function history(req, res, next) {
  try {
    const messages = await AiMessage.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(40);
    res.json({ messages: messages.reverse() });
  } catch (error) {
    next(error);
  }
}
