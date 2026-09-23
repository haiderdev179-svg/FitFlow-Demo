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

const chipMap: Record<string, string[]> = {
  fitness: ["Pricing", "Class Schedule", "Book a Trial"],
  "home-services": ["Get a Quote", "Service Availability", "Book a Visit"],
  "pet-care": ["Services", "Availability", "Book a Visit"],
  "salon-spa": ["Services", "Pricing", "Availability", "Book a Service"],
  "professional-services": ["Services", "Consultation", "Availability"],
  other: ["Ask a Question", "Availability", "Get Started"],
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
  const [messages, setMessages] = useState<Message[]>(() => [{ id: "g", role: "ai", text: "" }]);
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
    setMessages([{ id: `g-${business.id}`, role: "ai", text: business.chat.greeting }]);
    setInput("");
    setTyping(false);
    setStep("idle");
    stepRef.current = "idle";
    draft.current = { name: "", phone: "", time: "" };
    queue.current = [];
    processing.current = false;
  }, [business.id, business.chat.greeting]);

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
    if (step === "idle") return chipMap[business.id] ?? ["Pricing", "Availability", "Book a service"];
    return [];
  }, [business.id, business.trialSlots, step]);

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
      await pushAi(`Let’s get you booked. What’s your name?`);
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
        <div className="animate-fade-up flex h-[440px] w-[min(100vw-1.5rem,360px)] origin-bottom-right flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,#f7f9fc_0%,#edf3fb_100%)] shadow-[0_26px_64px_rgba(13,23,40,0.18)] ring-1 ring-white/70 transition-all duration-300 ease-out">
          <header className="flex items-center justify-between bg-[#0d1728] px-4 py-3 text-slate-100 ring-1 ring-inset ring-white/8">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ff8c5c] shadow-[0_0_12px_rgba(255,140,92,0.8)]" aria-hidden />
                <p className="font-display text-[10px] tracking-[0.2em] uppercase text-white">CloseCove</p>
              </div>
              <p className="mt-1 text-[11px] text-slate-300">Usually replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg leading-none text-slate-100 transition hover:border-white/15 hover:bg-white/10"
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div ref={scroller} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,#eef4fb_0%,#edf3fa_100%)] px-3 py-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed transition-all duration-200 ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-white text-slate-800 shadow-[0_10px_20px_rgba(15,23,42,0.06)]"
                      : "rounded-bl-sm bg-[#dfeaf7] text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="dot-typing flex w-fit gap-1 rounded-2xl bg-white px-3 py-2 ring-1 ring-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              </div>
            )}
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-slate-200 bg-white/60 px-3 py-2.5">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => handleUserText(chip)}
                  className="rounded-full border border-slate-200 bg-[#f8fafc] px-2.5 py-1 text-[11px] font-medium text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff8a5b] hover:text-slate-900"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex gap-2 border-t border-slate-200 bg-white/70 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void handleUserText(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services or availability…"
              className="flex-1 rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-[#ff8a5b] focus:bg-white"
            />
            <button type="submit" className="rounded-full bg-[#ff7a45] px-3 py-2 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(255,122,69,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f66e3d] active:translate-y-0">
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff7a45] text-white shadow-[0_18px_32px_rgba(255,122,69,0.28)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f66e3d] active:translate-y-0"
        aria-label="Open AI chat"
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12a8 8 0 0 1 8-8h0a8 8 0 0 1 8 8v5a3 3 0 0 1-3 3H9l-5 3v-8Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
