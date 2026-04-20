import { useState, useRef, useEffect } from "react";
import { Send, MapPin, Search, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

import { mockConversations, type ChatMessage } from "@/shared/lib/mock-data";

export function InstructorChat() {
  const [activeId, setActiveId] = useState(mockConversations[0].id);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(
    Object.fromEntries(mockConversations.map((c) => [c.id, c.messages]))
  );
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = mockConversations.find((c) => c.id === activeId)!;
  const activeMessages = messages[activeId] ?? [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages.length, activeId]);

  const send = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: "me",
      text: input,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), newMsg] }));
    setInput("");
    
    // محاكاة رد تلقائي
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: "other",
        text: "تمام، تم الاستلام 👍",
        time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => ({ ...prev, [activeId]: [...(prev[prev[activeId] ? activeId : activeId] ?? []), reply] }));
    }, 1200);
  };

  return (
    <div className="grid h-[calc(100vh-10rem)] grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-sm md:grid-cols-[320px_1fr]" dir="rtl">
      {/* Conversations List */}
      <aside className="flex flex-col border-l border-border bg-muted/5">
        <div className="border-b border-border p-4">
          <h2 className="mb-3 text-lg font-bold text-foreground">المحادثات</h2>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="ابحث في الرسائل..." className="pr-10 bg-background border-border rounded-xl h-9 text-xs font-bold" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex w-full items-center gap-3 border-b border-border/50 p-4 text-right transition-all hover:bg-muted/50 ${
                activeId === c.id ? "bg-primary/10 border-r-4 border-r-primary" : ""
              }`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                  <AvatarImage src={c.avatar} />
                  <AvatarFallback className="font-bold">{c.name[0]}</AvatarFallback>
                </Avatar>
                {c.online && (
                  <span className="absolute bottom-0 left-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500 shadow-sm" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm truncate text-foreground">{c.name}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">{c.lastTime}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted-foreground font-medium">{c.lastMessage}</span>
                  {c.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-primary-foreground shadow-sm shadow-primary/20">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <section className="flex min-h-0 flex-col bg-background">
        <header className="flex items-center justify-between border-b border-border p-4 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border shadow-sm">
              <AvatarImage src={active.avatar} />
              <AvatarFallback className="font-bold">{active.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-sm text-foreground">{active.name}</div>
              <div className="text-[10px] font-bold">
                {active.online ? <span className="text-green-600">نشط الآن</span> : <span className="text-muted-foreground">غير متصل</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </header>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-muted/5 p-6 space-y-4">
          {activeMessages.map((m) => {
            const mine = m.senderId === "me";
            return (
              <div key={m.id} className={`flex ${mine ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm font-medium shadow-sm leading-relaxed ${
                  mine
                    ? "bg-primary text-primary-foreground rounded-br-none shadow-primary/10"
                    : "bg-card border border-border rounded-bl-none"
                }`}>
                  <div>{m.text}</div>
                  <div className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider ${mine ? "opacity-70" : "text-muted-foreground"}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <footer className="border-t border-border p-4 bg-card/50">
          <div className="flex items-center gap-3 bg-muted/30 rounded-2xl px-2 py-1 border border-border/50 focus-within:border-primary/30 transition-all">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-transparent" title="إرسال موقع">
              <MapPin className="h-5 w-5" />
            </Button>
            <Input
              placeholder="اكتب رسالتك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="bg-transparent border-0 focus-visible:ring-0 shadow-none text-sm font-bold"
            />
            <Button 
              size="icon" 
              onClick={send} 
              disabled={!input.trim()}
              className="rounded-xl h-10 w-10 shadow-md shadow-primary/20 transition-all active:scale-95"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </section>
    </div>
  );
}