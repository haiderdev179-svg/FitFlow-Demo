"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBusiness } from "@/lib/business-context";
import { useLeads } from "@/lib/leads-context";

type Role = "ai" | "user";
type BookingStep = "idle" | "name" | "phone" | "time" | "done";

type Message = {
  id: string;
  role: Role;
  text: string;
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function typingMs() {
  return 600 + Math.floor(Math.random() * 600);
}

function looksLikeBooking(text: string) {
  return /(book|trial|appointment|consult|service|quote|schedule|sign up|signup|join)/i.test(text);
}

function looksLikePricing(text: string) {
  return /(price|pricing|cost|membership|service plan|how much|plan|tier|monthly)/i.test(text);
}

function looksLikeSchedule(text: string) {
  return /(schedule|hours|when|times?|availability|class|service window|slot|appointment)/i.test(text);
}

export function ChatWidget() {
  const { business } = useBusiness();
  const { addLead } = useLeads();
  const [open, setOpen] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(() => [{ id: "g", role: "ai", text: business.chat.greeting }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<BookingStep>("idle");
  const stepRef = useRef<BookingStep>("idle");
  const draft = useRef({ name: "", phone: "", time: "" });
  const queue = useRef<string[]>([]);
  const processing = useRef(false);

  function go(next: BookingStep) {
    stepRef.current = next;
    setStep(next);
  }

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("closecove-open-chat", openChat);
    return () => window.removeEventListener("closecove-open-chat", openChat);
  }, []);

  const chips = useMemo(() => {
    if (step === "time") return business.trialSlots;
    if (step === "idle") return ["Pricing", "Availability", "Book a service"];
    return [];
  }, [business.trialSlots, step]);

  async function pushAi(text: string) {
    setTyping(true);
    await delay(typingMs());
    setTyping(false);
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "ai", text }]);
  }

  async function processTurn(text: string) {
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);
    const current = stepRef.current;

    if (current === "name") {
      draft.current.name = text;
      go("phone");
      await pushAi(`Nice to meet you, ${text.split(" ")[0]}. What's the best phone number for a confirmation text?`);
      return;
    }
    if (current === "phone") {
      draft.current.phone = text;
      go("time");
      await pushAi(`Got it. Pick a time slot (or type your own):\n${business.trialSlots.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);
      return;
    }
    if (current === "time") {
      draft.current.time = text;
      go("done");
      addLead({
        name: draft.current.name,
        phone: draft.current.phone,
        preferredTime: draft.current.time,
        source: "Website chat",
      });
      await pushAi(`You’re booked, ${draft.current.name.split(" ")[0]}! ✅\n\n${draft.current.time}\nWe’ll text ${draft.current.phone} with confirmation details.\n\nThis lead is now on the owner dashboard.`);
      return;
    }

    if (looksLikeBooking(text)) {
      go("name");
      await pushAi(`Let's get you booked. What's your name?`);
      return;
    }
    if (looksLikePricing(text)) {
      await pushAi(business.chat.pricingReply);
      return;
    }
    if (looksLikeSchedule(text)) {
      await pushAi(business.chat.scheduleReply);
      return;
    }
    await pushAi(business.chat.fallback);
  }

  async function handleUserText(raw: string) {
    const text = raw.trim();
    if (!text) return;
    setInput("");
    queue.current.push(text);
    if (processing.current) return;
    processing.current = true;
    while (queue.current.length) {
      const next = queue.current.shift();
      if (next) await processTurn(next);
    }
    processing.current = false;
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="animate-fade-up flex h-[520px] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
          <header className="flex items-center justify-between bg-ember px-4 py-3 text-ink">
            <div>
              <p className="font-display text-sm tracking-wide uppercase">{business.name}</p>
              <p className="text-xs opacity-80">Usually replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2 text-lg leading-none"
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div ref={scroller} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user" ? "rounded-br-sm bg-ember text-ink" : "rounded-bl-sm bg-card text-sand"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="dot-typing flex w-fit gap-1 rounded-2xl bg-card px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mute" />
                <span className="h-1.5 w-1.5 rounded-full bg-mute" />
                <span className="h-1.5 w-1.5 rounded-full bg-mute" />
              </div>
            )}
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-line px-3 py-2">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleUserText(chip)}
                  className="rounded-full border border-line bg-card px-2.5 py-1 text-[11px] text-sand hover:border-ember"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex gap-2 border-t border-line p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void handleUserText(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services or availability…"
              className="flex-1 rounded-full border border-line bg-card px-3 py-2 text-sm outline-none placeholder:text-mute focus:border-ember"
            />
            <button type="submit" className="rounded-full bg-ember px-3 py-2 text-sm font-semibold text-ink">
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ember text-ink shadow-lg shadow-ember/30 transition hover:bg-ember-2"
        aria-label="Open AI chat"
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v5a3 3 0 0 1-3 3H9l-5 3v-8Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
