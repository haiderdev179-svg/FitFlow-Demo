"use client";

import { useBusiness } from "@/lib/business-context";
import { useLeads } from "@/lib/leads-context";

export default function DashboardPage() {
  const { business } = useBusiness();
  const { leads, extraLeadsCount } = useLeads();

  const newLeads = business.dashboardStats.newLeadsThisWeek + extraLeadsCount;
  const primaryMetricValue = business.dashboardStats.primaryMetricValue + extraLeadsCount;

  return (
    <main className="page-shell flex-1 px-4 py-8 text-[var(--cc-text)]">
      <div className="mx-auto max-w-6xl">
        <div className="cc-panel mb-8 rounded-[28px] p-6">
          <p className="cc-section-label">Owner view</p>
          <h1 className="mt-2 font-display text-4xl uppercase text-[var(--cc-navy)]">{business.dashboardTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--cc-text-muted)]">{business.dashboardSummary}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "New Leads This Week", value: newLeads },
            { label: business.dashboardStats.primaryMetricLabel, value: primaryMetricValue },
            { label: business.dashboardStats.riskLabel, value: business.dashboardStats.riskValue },
            { label: business.dashboardStats.winbackLabel, value: business.dashboardStats.winbackValue },
          ].map((card) => (
            <article key={card.label} className="cc-metric-card rounded-[22px] p-5">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--cc-text-muted)]">{card.label}</p>
              <p className="mt-3 font-display text-4xl text-[var(--cc-navy)]">{card.value}</p>
            </article>
          ))}
        </div>

        <section className="cc-panel mt-8 overflow-hidden rounded-[28px]">
          <div className="flex items-center justify-between border-b border-[var(--cc-border)] bg-[rgba(236,243,251,0.7)] px-5 py-4">
            <h2 className="font-display text-lg uppercase text-[var(--cc-navy)]">New Leads</h2>
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--cc-text-muted)]">{leads.length} in pipeline</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 text-[var(--cc-text-muted)]">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Preferred time</th>
                  <th className="px-5 py-3 font-medium">Source</th>
                  <th className="px-5 py-3 font-medium">Logged</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`border-t border-[var(--cc-border)] transition-all duration-180 hover:bg-white/70 ${
                      lead.id.startsWith("live-") ? "lead-row--highlight" : "bg-white/35"
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-[var(--cc-navy)]">
                      {lead.id.startsWith("live-") && (
                        <span className="lead-badge mr-2">New</span>
                      )}
                      {lead.name}
                    </td>
                    <td className="px-5 py-3 text-[var(--cc-text-muted)]">{lead.phone}</td>
                    <td className="px-5 py-3 text-[var(--cc-text)]">{lead.preferredTime}</td>
                    <td className="px-5 py-3 text-[var(--cc-text)]">{lead.source}</td>
                    <td className="px-5 py-3 text-[var(--cc-text-muted)]">{lead.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
