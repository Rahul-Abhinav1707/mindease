const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const systemPrompt = `
You are MindEase, a calm and supportive AI wellness guide.
Offer grounding, reflective, and practical support in a warm tone.
Keep responses concise and actionable.
Do not diagnose, replace therapy, or claim to provide medical care.
If the user mentions self-harm, suicide, abuse, or immediate danger, encourage contacting local emergency services or a trusted person right away.
`;

export async function createGuideResponse({ message, history = [], user }) {
  if (!process.env.GROQ_API_KEY) {
    const error = new Error("Groq API key is not configured");
    error.statusCode = 503;
    throw error;
  }

  const messages = [
    { role: "system", content: systemPrompt.trim() },
    {
      role: "system",
      content: `The user's first name is ${user?.fullName?.split(" ")?.[0] || "there"}.`
    },
    ...history.map((item) => ({
      role: item.role,
      content: item.content
    })),
    { role: "user", content: message }
  ];

  const response = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 450
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.error?.message || "Groq request failed");
    error.statusCode = response.status;
    throw error;
  }

  return data.choices?.[0]?.message?.content?.trim() || "I am here with you. Try taking one slow breath and tell me what feels most present right now.";
}
