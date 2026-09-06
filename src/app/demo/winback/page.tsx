import { members } from "@/lib/data";

export default function WinbackPage() {
  const atRisk = members.filter((m) => m.lastVisitDays >= 14);
  const reengaged = atRisk.filter((m) => m.status === "re-engaged").length;
  const highlighted = atRisk.slice(0, 3);

  return (
    <main className="flex-1 bg-ink px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-[0.2em] text-ember uppercase">Demo 3 · Retention</p>
        <h1 className="font-display mt-1 text-4xl uppercase">Churn radar & win-back</h1>
        <p className="mt-2 max-w-2xl text-sm text-mute">
          Members who vanish after week two rarely self-correct. FitFlow watches check-ins, fires a human-sounding text on day 14, and shows the owner who came back.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-warn/40 bg-warn/10 p-5">
            <p className="text-xs tracking-widest text-warn uppercase">At-risk</p>
            <p className="mt-2 font-display text-4xl">{atRisk.length}</p>
            <p className="text-sm text-mute">No check-in in 14+ days</p>
          </article>
          <article className="rounded-2xl border border-good/40 bg-good/10 p-5">
            <p className="text-xs tracking-widest text-good uppercase">Win-backs</p>
            <p className="mt-2 font-display text-4xl">
              {reengaged} of {atRisk.length}
            </p>
            <p className="text-sm text-mute">at-risk members re-engaged this month</p>
          </article>
          <article className="rounded-2xl border border-ember/40 bg-ember/10 p-5">
            <p className="text-xs tracking-widest text-ember uppercase">Trigger</p>
            <p className="mt-2 font-display text-2xl leading-tight">Day 14 no check-in → Auto win-back text sent</p>
          </article>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-line bg-ink-2 p-5">
            <h2 className="font-display text-lg uppercase">Member check-ins</h2>
            <p className="mb-4 text-xs text-mute">Amber rows = 14+ days since last swipe</p>
            <ul className="space-y-2">
              {members.map((m) => {
                const risk = m.lastVisitDays >= 14;
                return (
                  <li
                    key={m.id}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                      risk ? "border-warn/50 bg-warn/10" : "border-line bg-card"
                    }`}
                  >
                    <div className="w-36 shrink-0 font-medium">{m.name}</div>
                    <div className="flex flex-1 items-end gap-1">
                      {m.weeklyCheckins.map((v, i) => (
                        <div
                          key={i}
                          className={`w-3 rounded-sm ${risk ? "bg-warn" : "bg-ember"}`}
                          style={{ height: `${8 + v * 5}px` }}
                          title={`Week ${i + 1}: ${v} visits`}
                        />
                      ))}
                    </div>
                    <div className="w-20 shrink-0 text-right text-xs">
                      {risk ? (
                        <span className="font-semibold text-warn">{m.lastVisitDays}d ago</span>
                      ) : (
                        <span className="text-mute">{m.lastVisitDays}d ago</span>
                      )}
                    </div>
                    <div className="w-32 shrink-0 text-right text-xs">
                      {m.status === "re-engaged" && <span className="text-good">Re-engaged ✅</span>}
                      {m.status === "no-response" && <span className="text-mute">No response yet</span>}
                      {m.status === "active" && <span className="text-sand/70">Active</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-ember bg-card p-5">
              <p className="text-xs tracking-widest text-ember uppercase">Sequence in flight</p>
              <h3 className="font-display mt-1 text-2xl uppercase">{highlighted[0]?.name}</h3>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="rounded-lg border border-line bg-ink px-3 py-2">
                  Last check-in <strong>18 days ago</strong>
                </li>
                <li className="rounded-lg border border-ember/40 bg-ember/10 px-3 py-2">
                  Day 14 rule fired · auto win-back SMS
                </li>
                <li className="rounded-lg border border-line bg-ink px-3 py-2 leading-relaxed">
                  <span className="text-mute">Outgoing · 9:04 AM</span>
                  <p className="mt-1">
                    Hey Sarah, we miss you at Iron Village! Here&apos;s a free guest pass for a friend if you come back this week 🎟️
                  </p>
                </li>
                <li className="rounded-lg border border-good/40 bg-good/10 px-3 py-2 text-good">
                  Replied · booked Thursday spin · Re-engaged ✅
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-line bg-ink-2 p-5">
              <p className="text-xs text-mute uppercase tracking-widest">Also flagged</p>
              <ul className="mt-3 space-y-2 text-sm">
                {highlighted.slice(1).map((m) => (
                  <li key={m.id} className="flex justify-between border-b border-line pb-2 last:border-0">
                    <span>{m.name}</span>
                    <span className={m.status === "re-engaged" ? "text-good" : "text-warn"}>
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
