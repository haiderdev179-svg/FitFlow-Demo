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
    <main className="flex-1 bg-ink px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-ember uppercase">Demo 2 · Live pitch</p>
            <h1 className="font-display mt-1 text-4xl uppercase">{business.missedCall.title}</h1>
            <p className="mt-2 max-w-xl text-sm text-mute">{business.missedCall.intro}</p>
          </div>
          <button
            type="button"
            onClick={replay}
            className="rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ember-2"
          >
            Replay Demo
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="flex flex-col items-center rounded-3xl border border-line bg-ink-2 p-8">
            <p className="mb-6 text-xs tracking-widest text-mute uppercase">{business.missedCall.incomingLead}</p>
            <div className={`relative ${phase === "ringing" ? "animate-shake" : ""}`}>
              {phase === "ringing" && (
                <>
                  <span className="animate-ring absolute inset-[-18px] rounded-[42px] border-2 border-ember" />
                  <span className="animate-ring absolute inset-[-32px] rounded-[50px] border border-ember/50" />
                </>
              )}
              <div className="relative h-[520px] w-[280px] overflow-hidden rounded-[40px] border-4 border-line bg-black shadow-2xl">
                <div className="flex h-full flex-col items-center px-6 pt-12 text-center">
                  <p className="text-xs text-mute">mobile</p>
                  <div className="mt-10 h-20 w-20 rounded-full bg-card-2 font-display text-2xl leading-[80px] text-ember">
                    {business.name.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="mt-4 font-display text-xl uppercase">{business.name}</p>
                  <p className="mt-1 text-sm text-mute">{business.phone}</p>
                  <p className="mt-8 text-lg font-medium">{phase === "ringing" ? "Calling…" : "Missed Call"}</p>
                  {phase === "missed" && <p className="mt-2 text-sm text-risk">Unanswered · 0:04</p>}
                  <div className="mt-auto mb-10 flex w-full justify-around pb-4">
                    {phase === "ringing" ? (
                      <>
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-risk text-xs">Decline</span>
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-good text-xs text-ink">Accept</span>
                      </>
                    ) : (
                      <span className="rounded-full bg-card px-4 py-2 text-xs text-mute">Call back</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-line bg-ink-2 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-mute uppercase tracking-widest">{business.missedCall.messageIntro}</p>
                <p className="font-medium">Unknown · {business.missedCall.capture.phone}</p>
              </div>
              <span className="rounded-full bg-card px-3 py-1 text-[11px] text-ember">AI · 3s SLA</span>
            </div>
            <div className="flex min-h-[480px] flex-col gap-3 rounded-2xl bg-ink p-4">
              {bubbles.length === 0 && <p className="m-auto text-sm text-mute">Waiting for the unanswered ring…</p>}
              {bubbles.map((b) => (
                <div key={b.id} className={`animate-fade-up flex ${b.from === "business" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                      b.status === "done"
                        ? "border border-good/40 bg-good/15 text-good"
                        : b.from === "business"
                          ? "rounded-bl-sm bg-card text-sand"
                          : "rounded-br-sm bg-ember text-ink"
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
