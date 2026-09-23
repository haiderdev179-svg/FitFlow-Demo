"use client";

import { useBusiness } from "@/lib/business-context";

export default function WinbackPage() {
  const { business } = useBusiness();
  const atRisk = business.winbackMembers.filter((m) => m.lastVisitDays >= 14);
  const reengaged = atRisk.filter((m) => m.status === "re-engaged").length;
  const highlighted = atRisk.slice(0, 3);

  return (
    <main className="page-shell flex-1 px-4 py-8 text-[var(--cc-text)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[28px] border border-[var(--cc-border)] bg-white/80 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.05)]">
          <p className="cc-section-label">Demo 3 · Retention</p>
          <h1 className="mt-1 font-display text-4xl uppercase text-[var(--cc-navy)]">{business.winback.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--cc-text-muted)]">{business.winback.intro}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="cc-metric-card rounded-[22px] p-5">
            <p className="text-xs tracking-[0.2em] text-[#b7791f] uppercase">At-risk</p>
            <p className="mt-2 font-display text-4xl text-[var(--cc-navy)]">{atRisk.length}</p>
            <p className="text-sm text-[var(--cc-text-muted)]">No check-in in 14+ days</p>
          </article>
          <article className="cc-metric-card rounded-[22px] p-5">
            <p className="text-xs tracking-[0.2em] text-[#1d7a52] uppercase">Win-backs</p>
            <p className="mt-2 font-display text-4xl text-[var(--cc-navy)]">{reengaged} of {atRisk.length}</p>
            <p className="text-sm text-[var(--cc-text-muted)]">At-risk contacts re-engaged this month</p>
          </article>
          <article className="cc-metric-card rounded-[22px] p-5">
            <p className="text-xs tracking-[0.2em] text-[var(--cc-orange)] uppercase">Trigger</p>
            <p className="mt-2 font-display text-2xl leading-tight text-[var(--cc-navy)]">{business.winback.trigger}</p>
          </article>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="cc-panel rounded-[28px] p-5">
            <h2 className="font-display text-lg uppercase text-[var(--cc-navy)]">Recent check-ins</h2>
            <p className="mb-4 text-xs text-[var(--cc-text-muted)]">Amber rows = 14+ days since last visit</p>
            <ul className="space-y-2">
              {business.winbackMembers.map((m) => {
                const risk = m.lastVisitDays >= 14;
                return (
                  <li
                    key={m.id}
                    className={`flex items-center gap-3 rounded-[18px] border px-3 py-2.5 transition-all duration-180 ease-out hover:-translate-y-0.5 ${risk ? "border-[#f4c98f] bg-[#fffaf1]" : "border-[var(--cc-border)] bg-white/80"}`}
                  >
                    <div className="w-36 shrink-0 font-medium text-[var(--cc-navy)]">{m.name}</div>
                    <div className="flex flex-1 items-end gap-1">
                      {m.weeklyCheckins.map((v, i) => (
                        <div
                          key={i}
                          className={`w-3 rounded-sm ${risk ? "bg-[#f5b942]" : "bg-[var(--cc-orange)]"}`}
                          style={{ height: `${8 + v * 5}px` }}
                          title={`Week ${i + 1}: ${v} visits`}
                        />
                      ))}
                    </div>
                    <div className="w-20 shrink-0 text-right text-xs">
                      {risk ? (
                        <span className="font-semibold text-[#b7791f]">{m.lastVisitDays}d ago</span>
                      ) : (
                        <span className="text-[var(--cc-text-muted)]">{m.lastVisitDays}d ago</span>
                      )}
                    </div>
                    <div className="w-32 shrink-0 text-right text-xs">
                      {m.status === "re-engaged" && <span className="text-[#1d7a52]">Re-engaged ✅</span>}
                      {m.status === "no-response" && <span className="text-[var(--cc-text-muted)]">No response yet</span>}
                      {m.status === "active" && <span className="text-[var(--cc-text-muted)]">Active</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside className="space-y-4">
            <div className="cc-panel rounded-[26px] p-5">
              <p className="text-xs tracking-[0.2em] text-[var(--cc-orange)] uppercase">Sequence in flight</p>
              <h3 className="mt-1 font-display text-2xl uppercase text-[var(--cc-navy)]">{highlighted[0]?.name}</h3>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="rounded-lg border border-[var(--cc-border)] bg-[rgba(255,255,255,0.7)] px-3 py-2 text-[var(--cc-text)]">
                  Last check-in <strong>{highlighted[0]?.lastVisitDays} days ago</strong>
                </li>
                <li className="rounded-lg border border-[rgba(255,116,69,0.2)] bg-[rgba(255,116,69,0.08)] px-3 py-2 text-[var(--cc-text)]">{business.winback.trigger}</li>
                <li className="rounded-lg border border-[var(--cc-border)] bg-[rgba(237,243,250,0.75)] px-3 py-2 leading-relaxed text-[var(--cc-text)]">
                  <span className="text-[var(--cc-text-muted)]">Outgoing · 9:04 AM</span>
                  <p className="mt-1">{business.winback.highlightedMessage}</p>
                </li>
                <li className="rounded-lg border border-[#a7f3d0] bg-[#e8f8f0] px-3 py-2 text-[#1d7a52]">{business.winback.messageFooter}</li>
              </ol>
            </div>

            <div className="cc-panel rounded-[26px] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--cc-text-muted)]">Also flagged</p>
              <ul className="mt-3 space-y-2 text-sm">
                {highlighted.slice(1).map((m) => (
                  <li key={m.id} className="flex justify-between border-b border-[var(--cc-border)] pb-2 last:border-0 text-[var(--cc-text)]">
                    <span>{m.name}</span>
                    <span className={m.status === "re-engaged" ? "text-[#1d7a52]" : "text-[#b7791f]"}>
                      {m.status === "re-engaged" ? "Re-engaged ✅" : "No response yet"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
