"use client";

import Link from "next/link";
import { ChatWidget } from "@/components/ChatWidget";
import { businessOptions, type BusinessType } from "@/lib/data";
import { useBusiness } from "@/lib/business-context";

const iconMap: Record<string, string> = {
  Fitness: "🏋️",
  "Home Services": "🔧",
  "Pet Care": "🐾",
  "Salon & Spa": "💅",
  "Professional Services": "⚖️",
  Other: "📦",
};

export default function HomePage() {
  const { business, industry, selectIndustry } = useBusiness();

  return (
    <div className="min-h-screen bg-[#f4efe9] text-[#171513]">
      <main className="mx-auto max-w-[1200px] px-5 pb-20 pt-10 md:pt-14">
        <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e655f]">
          AI AUTOMATION FOR LOCAL BUSINESSES
        </div>

        <section className="max-w-[1280px] pt-2 pb-8 md:pb-10">
          <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_0.95fr] lg:items-end">
            <div>
              <h1 className="max-w-[760px] text-[1.8rem] font-black leading-[1.02] tracking-[-0.08em] text-[#171513] md:text-[2.8rem] xl:text-[4.2rem]">
                Turn missed opportunities into booked customers.
              </h1>

              <p className="mt-5 max-w-[620px] text-base leading-relaxed text-[#4f4b46] md:text-[1.15rem]">
                AI systems that catch every inbound lead your gym, clinic, or shop would otherwise lose — responding in seconds and booking directly into your schedule 24/7.
              </p>
            </div>

            <div className="ml-auto w-full max-w-[420px] rounded-[26px] border border-[#e7ddd5] bg-white p-4 shadow-[0_16px_44px_rgba(29,20,10,0.06)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff7a45] text-lg font-black text-[#171513]">
                  {iconMap[businessOptions.find((option) => option.id === business.id)?.label ?? "Other"] ?? "💬"}
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d7269]">Live demo</div>
                  <div className="text-lg font-semibold text-[#171513]">{business.name}</div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-[#efe7df] bg-[#faf7f2] p-3.5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7d7269]">AI receptionist</div>
                <p className="mt-2 text-sm leading-5 text-[#403d39]">
                  “Hi there! We just noticed a missed call from a new lead. I can help with pricing, availability, and next steps right now.”
                </p>
              </div>

              <div className="mt-5 space-y-2.5">
                <div className="flex items-center justify-between rounded-2xl border border-[#ece3da] bg-[#fffdfb] px-3 py-2.5">
                  <span className="text-sm text-[#403d39]">Missed-call text-back</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c7a4f]">Live</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[#ece3da] bg-[#fffdfb] px-3 py-2.5">
                  <span className="text-sm text-[#403d39]">AI qualification flow</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c7a4f]">On</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-[#ece3da] bg-[#fffdfb] px-3 py-2.5">
                  <span className="text-sm text-[#403d39]">Calendar booking sync</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c7a4f]">Ready</span>
                </div>
              </div>
            </div>
          </div>

          <div id="demo" className="mt-10 max-w-[1280px]">
            <p className="mb-5 text-[1.9rem] font-black tracking-[-0.06em] text-[#171513] md:text-[2.2rem]">
              What type of business are you?
            </p>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {businessOptions.map((option) => {
                const active = option.id === industry;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => selectIndustry(option.id as BusinessType)}
                    className={`flex items-center justify-center gap-2.5 rounded-[16px] border px-3 py-2.5 text-left text-sm font-semibold transition ${
                      active
                        ? "border-[#d9c2a7] bg-[#fffaf5] text-[#171513] shadow-[0_8px_22px_rgba(32,23,13,0.05)]"
                        : "border-[#e7ddd5] bg-white text-[#2a2824] hover:border-[#d9c9ba] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <span aria-hidden className="text-[1.35rem]">{iconMap[option.label] ?? "📦"}</span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="schedule" className="mx-auto mt-20 w-full max-w-6xl">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-[#171513]">Availability</h2>
          <p className="mt-2 text-sm text-[#5b564f]">Mocked weekly grid — designed to match the real sales flow for {business.name}.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e7ddd5] bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#faf7f2] text-[#5d564f]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Offering</th>
                  <th className="px-4 py-3 font-semibold">Provider</th>
                  <th className="px-4 py-3 font-semibold">Days</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {business.classes.map((c) => (
                  <tr key={c.id} className="border-t border-[#eee4db]">
                    <td className="px-4 py-3 font-medium text-[#171513]">{c.name}</td>
                    <td className="px-4 py-3 text-[#5b564f]">{c.coach}</td>
                    <td className="px-4 py-3 text-[#171513]">{c.day}</td>
                    <td className="px-4 py-3 text-[#171513]">{c.time}</td>
                    <td className="px-4 py-3 font-medium text-[#ff7a45]">{c.spots}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="pricing" className="mt-20 rounded-[28px] border border-[#e7ddd5] bg-[#fffdfb] p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-black tracking-[-0.05em] text-[#171513]">Offerings</h2>
          <p className="mt-2 text-sm text-[#5b564f]">Simple pricing and service tiers. Ask the AI for details.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {business.pricing.map((tier) => (
              <article
                key={tier.id}
                className={`rounded-2xl border p-6 ${tier.highlight ? "border-[#ebd5bf] bg-[#fffaf5]" : "border-[#e7ddd5] bg-white"}`}
              >
                {tier.highlight && (
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">Most popular</p>
                )}
                <h3 className="text-xl font-black tracking-[-0.04em] text-[#171513]">{tier.name}</h3>
                <p className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#171513]">
                  ${tier.price}
                  <span className="ml-2 text-base font-medium text-[#5b564f]">{tier.period}</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[#3f3b37]">
                  {tier.perks.map((perk) => (
                    <li key={perk}>— {perk}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <footer id="inquire" className="mt-20 border-t border-[#e6dbce] pt-8 text-center text-xs text-[#5d564f]">
          <p>
            {business.name} · {business.phone} · Demo property of CloseCove AI (not a live business site)
          </p>
          <p className="mt-2">
            Pitch path:{" "}
            <Link href="/demo/missed-call" className="font-semibold text-[#ff7a45]">
              Missed Call
            </Link>{" "}
            →{" "}
            <Link href="/demo/winback" className="font-semibold text-[#ff7a45]">
              Win-Back
            </Link>{" "}
            →{" "}
            <Link href="/dashboard" className="font-semibold text-[#ff7a45]">
              Dashboard
            </Link>
          </p>
        </footer>
      </main>

      <ChatWidget key={business.id} />
    </div>
  );
}
