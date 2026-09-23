"use client";

import { useCallback, useEffect, useState } from "react";
import { useBusiness } from "@/lib/business-context";
import { useLeads } from "@/lib/leads-context";

type Phase = "ringing" | "missed";

type Bubble = {
  id: string;
  from: "business" | "caller";
  text: string;
  status?: string;
};

export default function MissedCallPage() {
  const { business } = useBusiness();
  const { addLead } = useLeads();
  const [phase, setPhase] = useState<Phase>("ringing");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [runId, setRunId] = useState(0);

  const replay = useCallback(() => {
    setPhase("ringing");
    setBubbles([]);
    setRunId((n) => n + 1);
  }, []);

  useEffect(() => {
    const timers = business.missedCall.script.map((beat) =>
      window.setTimeout(() => {
        if ("phase" in beat) {
          setPhase(beat.phase);
        }
        if ("bubble" in beat) {
          setBubbles((prev) => [...prev, beat.bubble]);
          if (beat.bubble.status === "done") {
            addLead({
              name: business.missedCall.capture.name,
              phone: business.missedCall.capture.phone,
              preferredTime: business.missedCall.capture.preferredTime,
              source: business.missedCall.capture.source,
            });
          }
        }
      }, beat.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, [addLead, business, runId]);

  return (
    <main className="page-shell flex-1 px-4 py-8 text-[var(--cc-text)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 rounded-[28px] border border-[var(--cc-border)] bg-white/80 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.05)] backdrop-blur-sm">
          <div>
            <p className="cc-section-label">Demo 2 · Live pitch</p>
            <h1 className="mt-1 font-display text-4xl uppercase text-[var(--cc-navy)]">{business.missedCall.title}</h1>
            <p className="mt-2 max-w-xl text-sm text-[var(--cc-text-muted)]">{business.missedCall.intro}</p>
          </div>
          <button
            type="button"
            onClick={replay}
            className="rounded-full bg-[var(--cc-orange)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(255,116,69,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f76a3d]"
            >
            Replay Demo
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="cc-panel-dark flex flex-col items-center rounded-[30px] p-8">
            <p className="mb-6 text-xs tracking-[0.24em] text-slate-300 uppercase">{business.missedCall.incomingLead}</p>
            <div className={`relative ${phase === "ringing" ? "animate-shake" : ""}`}>
              {phase === "ringing" && (
                <>
                  <span className="animate-ring absolute inset-[-18px] rounded-[42px] border-2 border-[var(--cc-orange)]" />
                  <span className="animate-ring absolute inset-[-32px] rounded-[50px] border border-[rgba(255,116,69,0.45)]" />
                </>
              )}
              <div className="relative h-[520px] w-[280px] overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,#1a2333_0%,#0f1728_100%)] shadow-[0_24px_50px_rgba(9,16,27,0.32)]">
                <div className="flex h-full flex-col items-center px-6 pt-12 text-center">
                  <p className="text-xs text-slate-300 uppercase tracking-[0.22em]">mobile</p>
                  <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)] font-display text-2xl text-[var(--cc-orange)]">
                    {business.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="mt-4 font-display text-xl uppercase text-slate-100">{business.name}</p>
                  <p className="mt-1 text-sm text-slate-300">{business.phone}</p>
                  <p className="mt-8 text-lg font-medium text-slate-100">{phase === "ringing" ? "Calling…" : "Missed Call"}</p>
                  {phase === "missed" && <p className="mt-2 text-sm text-[#fca5a5]">Unanswered · 0:04</p>}
                  <div className="mt-auto mb-10 flex w-full justify-around pb-4">
                    {phase === "ringing" ? (
                      <>
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ef4444] text-xs font-semibold text-white">Decline</span>
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#22c55e] text-xs font-semibold text-[#0b1220]">Accept</span>
                      </>
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200">Call back</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="cc-panel-dark rounded-[30px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{business.missedCall.messageIntro}</p>
                <p className="mt-1 font-medium text-slate-100">Unknown · {business.missedCall.capture.phone}</p>
              </div>
              <span className="rounded-full border border-[rgba(255,116,69,0.25)] bg-[rgba(255,116,69,0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--cc-orange)]">AI · 3s SLA</span>
            </div>
            <div className="flex min-h-[480px] flex-col gap-3 rounded-[24px] border border-white/8 bg-[rgba(16,26,38,0.72)] p-4">
              {bubbles.length === 0 && <p className="m-auto text-sm text-slate-300">Waiting for the unanswered ring…</p>}
              {bubbles.map((b) => (
                <div key={b.id} className={`animate-fade-up flex ${b.from === "business" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                      b.status === "done"
                        ? "border border-[#2fd58d]/40 bg-[#1a7b4f]/20 text-[#a7f3d0]"
                        : b.from === "business"
                          ? "rounded-bl-sm bg-[#1d2433] text-slate-100"
                          : "rounded-br-sm bg-[var(--cc-orange)] text-[#0f172a]"
                    }`}
                  >
                    {b.text}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
