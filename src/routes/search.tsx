import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, MapPin, Star, MessageCircle, Bot, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { providers } from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  component: SearchPage,
});

type Msg = { role: "user" | "bot"; content: string; results?: typeof providers };

const suggestions = [
  "Car wash open near me",
  "Dentist this week",
  "Best Italian restaurant",
  "AC repair today",
];

function SearchPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", content: "Hi 👋 I'm Botly. Tell me what you need — anywhere, anytime." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          content: `Found 6 great options nearby for "${text}". Tap to chat on WhatsApp 💬`,
          results: providers,
        },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">AI Search</h1>
            <p className="text-sm text-muted-foreground">Ask anything in natural language</p>
          </div>
        </div>

        <div className="space-y-4 pb-32">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-primary"}`}>
                {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[85%] ${m.role === "user" ? "items-end" : ""}`}>
                <Card className={`rounded-2xl px-4 py-3 ${m.role === "user" ? "bg-primary text-primary-foreground border-0" : "bg-card"}`}>
                  <p className="text-sm leading-relaxed">{m.content}</p>
                </Card>
                {m.results && (
                  <div className="mt-3 grid gap-2">
                    {m.results.slice(0, 4).map((p) => (
                      <Card key={p.id} className="p-3 rounded-xl hover:border-primary/40 transition">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-2xl">{p.image}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-sm truncate">{p.name}</p>
                              <Badge variant="secondary" className={p.open ? "bg-success/15 text-success border-0 text-[10px]" : "text-[10px]"}>
                                {p.open ? "Open" : "Closed"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                              <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-warning text-warning" />{p.rating}</span>
                              <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" />{p.distance}</span>
                            </div>
                          </div>
                          <Button size="sm" className="rounded-lg h-8 gap-1">
                            <MessageCircle className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-3 py-2 rounded-full bg-muted hover:bg-accent transition">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-4">
        <div className="container mx-auto px-4 max-w-3xl">
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 p-2 rounded-2xl bg-card border border-border shadow-card"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Botly..."
              className="flex-1 bg-transparent outline-none px-3 py-2 text-sm"
            />
            <Button type="submit" size="icon" className="rounded-xl shadow-glow">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
