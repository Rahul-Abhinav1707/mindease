import { useEffect, useState } from "react";
import { Bot, Loader2, Send, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { PageHeader } from "../components/dashboard/PageHeader";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { aiService } from "../services/aiService";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

const suggestions = ["Help me calm down", "Reflect on my mood", "Plan a mindful break", "Reframe a stressful thought"];

export default function AIGuidePage() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    { role: "guide", text: "Hi, I'm your MindEase guide. Tell me what is on your mind, and I will help you find a calm next step." }
  ]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await aiService.getHistory();
        if (data.messages?.length) {
          setMessages(
            data.messages.map((item) => ({
              role: item.role === "assistant" ? "guide" : "user",
              text: item.content
            }))
          );
        }
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load AI guide history."));
      }
    };

    loadHistory();
  }, []);

  const sendMessage = async () => {
    if (!message.trim() || isSending) return;

    const userMessage = message.trim();
    setMessages((current) => [...current, { role: "user", text: userMessage }]);
    setMessage("");
    setError("");
    setIsSending(true);

    try {
      const history = messages.slice(-8).map((item) => ({
        role: item.role === "guide" ? "assistant" : "user",
        content: item.text
      }));
      const data = await aiService.sendGuideMessage({ message: userMessage, history });
      setMessages((current) => [...current, { role: "guide", text: data.reply }]);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "MindEase AI is unavailable right now."));
      setMessages((current) => [
        ...current,
        { role: "guide", text: "I could not reach the AI service yet. Check the Groq API key on the backend, then try again." }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <PageHeader
          eyebrow="AI Guide"
          title="A thoughtful support space"
          description="MindEase now connects to Groq through your secure backend, keeping the API key out of the browser."
          action={<Button variant="glass"><ShieldCheck className="h-4 w-4" /> Safety first</Button>}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="flex min-h-[620px] flex-col p-5">
            {error && (
              <div className="mb-4 rounded-3xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500">
                {error}
              </div>
            )}

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {messages.map((item, index) => (
                <div key={`${item.role}-${index}`} className={`flex gap-3 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                  {item.role === "guide" && (
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-white">
                      <Bot className="h-5 w-5" />
                    </span>
                  )}
                  <div className={`max-w-[80%] whitespace-pre-wrap rounded-3xl px-5 py-4 leading-7 ${item.role === "user" ? "bg-primary text-white" : "bg-muted"}`}>
                    {item.text}
                  </div>
                  {item.role === "user" && (
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-secondary text-white">
                      <UserRound className="h-5 w-5" />
                    </span>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary text-white">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div className="flex items-center gap-2 rounded-3xl bg-muted px-5 py-4 font-semibold text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking gently...
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3 rounded-3xl border border-border bg-background p-2">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder="Ask for a gentle next step..."
                className="min-w-0 flex-1 bg-transparent px-4 outline-none"
              />
              <Button onClick={sendMessage} disabled={isSending} aria-label="Send message">
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <Sparkles className="mb-5 h-6 w-6 text-accent" />
            <h2 className="text-2xl font-extrabold">Suggested starts</h2>
            <div className="mt-5 space-y-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setMessage(suggestion)}
                  className="w-full rounded-2xl bg-muted px-4 py-3 text-left text-sm font-bold transition hover:bg-primary hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
