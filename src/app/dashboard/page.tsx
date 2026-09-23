"use client";

import { useBusiness } from "@/lib/business-context";
import { useLeads } from "@/lib/leads-context";

export default function DashboardPage() {
  const { business } = useBusiness();
  const { leads, extraLeadsCount } = useLeads();

  const newLeads = business.dashboardStats.newLeadsThisWeek + extraLeadsCount;
  const primaryMetricValue = business.dashboardStats.primaryMetricValue + extraLeadsCount;

  return (
    <main className="flex-1 bg-ink px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-ember uppercase">Owner view</p>
          <h1 className="font-display mt-1 text-4xl uppercase">{business.dashboardTitle}</h1>
          <p className="mt-2 text-sm text-mute">{business.dashboardSummary}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "New Leads This Week", value: newLeads },
            { label: business.dashboardStats.primaryMetricLabel, value: primaryMetricValue },
            { label: business.dashboardStats.riskLabel, value: business.dashboardStats.riskValue },
            { label: business.dashboardStats.winbackLabel, value: business.dashboardStats.winbackValue },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl border border-line bg-card p-5">
              <p className="text-xs text-mute">{card.label}</p>
              <p className="mt-2 font-display text-4xl">{card.value}</p>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-line bg-ink-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-lg uppercase">New Leads</h2>
            <span className="text-xs text-mute">{leads.length} in pipeline</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-mute">
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
                  <tr key={lead.id} className="border-t border-line">
                    <td className="px-5 py-3 font-medium">
                      {lead.id.startsWith("live-") && (
                        <span className="mr-2 rounded bg-ember px-1.5 py-0.5 text-[10px] font-semibold text-ink uppercase">
                          New
                        </span>
                      )}
                      {lead.name}
                    </td>
                    <td className="px-5 py-3 text-mute">{lead.phone}</td>
                    <td className="px-5 py-3">{lead.preferredTime}</td>
                    <td className="px-5 py-3">{lead.source}</td>
                    <td className="px-5 py-3 text-mute">{lead.createdAt}</td>
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
