"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // focus input when drawer opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) throw new Error();
      if (!res.body) throw new Error();

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last && last.role === "assistant") {
            updated[updated.length - 1] = { ...last, content: last.content + chunk };
          }
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2.5 rounded-full border border-border bg-surface px-5 py-3 text-[12px] tracking-[0.15em] text-text-muted shadow-lg transition-all duration-300 hover:border-accent hover:text-text ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open sizing/styling assistant"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="hidden sm:inline">Need help with sizing/styling?</span>
        <span className="sm:hidden">Sizing/Styling Help</span>
      </button>

      {/* Chat drawer */}
      <div
        className={`fixed bottom-0 left-0 z-50 flex h-[min(580px,90dvh)] w-full flex-col border-r border-t border-border bg-bg shadow-2xl transition-all duration-500 ease-out sm:bottom-6 sm:left-6 sm:w-[380px] sm:rounded-lg sm:border ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <p className="text-[13px] font-normal tracking-[0.15em] text-text">
              SILVRSTNS
            </p>
            <p className="mt-0.5 text-[10px] tracking-[0.1em] text-text-muted">
              Sizing/Styling Assistant
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-text-muted transition-colors hover:text-text"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-text-muted mb-3">
                How can I help?
              </p>
              <p className="text-[13px] leading-[1.8] text-text-muted/70 max-w-[260px]">
                I can help you find your ring or bracelet size, or suggest how to style and pair pieces together.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {["What size ring should I get?", "How do I measure my wrist?", "Help me style a look"].map(
                  (q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        inputRef.current?.focus();
                      }}
                      className="rounded-full border border-border px-3 py-1.5 text-[11px] text-text-muted transition-colors hover:border-accent hover:text-text"
                    >
                      {q}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-[13px] leading-[1.7] ${
                  msg.role === "user"
                    ? "bg-surface-light text-text"
                    : "bg-surface text-text-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-surface rounded-lg px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted/50 animate-[pulse_1.2s_ease-in-out_infinite]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted/50 animate-[pulse_1.2s_ease-in-out_0.3s_infinite]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted/50 animate-[pulse_1.2s_ease-in-out_0.6s_infinite]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-t border-border px-5 py-4"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about sizing/styling..."
            className="flex-1 bg-transparent text-[13px] text-text placeholder:text-text-muted/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="text-text-muted transition-colors hover:text-text disabled:opacity-30"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
