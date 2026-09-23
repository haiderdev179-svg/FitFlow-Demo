"use client";

import { useEffect } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { businessOptions, type BusinessType } from "@/lib/data";
import { useBusiness } from "@/lib/business-context";

const demoStates: Record<
  BusinessType,
  {
    label: string;
    businessName: string;
    greeting: string;
    workflow: string[];
    statuses: Array<{ label: string; value: string; tone: "blue" | "green" | "purple" | "orange" }>;
    cta: string;
    quickActions: string[];
    descriptor: string;
    cardAccent: string;
    iconWrap: string;
    iconTone: string;
  }
> = {
  fitness: {
    label: "Fitness",
    businessName: "Iron Village Fitness",
    greeting: "Hi there! We just noticed a missed call from a new lead. I can help with pricing, class availability, and next steps right now.",
    workflow: ["Missed call", "AI response", "Lead qualified", "Trial booked"],
    statuses: [
      { label: "Missed call", value: "DETECTED", tone: "blue" },
      { label: "AI response", value: "SENT", tone: "blue" },
      { label: "Lead qualified", value: "READY", tone: "green" },
      { label: "Trial booked", value: "OPEN", tone: "orange" },
    ],
    cta: "Open AI Chat",
    quickActions: ["Pricing", "Class Schedule", "Book a Trial"],
    descriptor: "Memberships · Classes · Trials",
    cardAccent: "from-[#f4f8ff] via-white to-[#fffaf5]",
    iconWrap: "bg-[#fff1ea] text-[#ff7a45] ring-[#fed7c5]",
    iconTone: "text-[#ff7a45]",
  },
  "home-services": {
    label: "Home Services",
    businessName: "Apex Home Services",
    greeting: "Hi! We just noticed a missed call from a new customer. I can help collect the job details and get you scheduled.",
    workflow: ["Missed call", "Job details collected", "Lead qualified", "Service call booked"],
    statuses: [
      { label: "Missed call", value: "DETECTED", tone: "blue" },
      { label: "Job details", value: "COLLECTED", tone: "blue" },
      { label: "Lead qualified", value: "READY", tone: "green" },
      { label: "Service call", value: "OPEN", tone: "orange" },
    ],
    cta: "Request Service",
    quickActions: ["Get a Quote", "Service Availability", "Book a Visit"],
    descriptor: "Quotes · Service Calls · Appointments",
    cardAccent: "from-[#f6f8ff] via-white to-[#fff9f4]",
    iconWrap: "bg-[#edf5ff] text-[#3867d6] ring-[#dbeafe]",
    iconTone: "text-[#3867d6]",
  },
  "pet-care": {
    label: "Pet Care",
    businessName: "Paws & Co. Pet Care",
    greeting: "Hi! Thanks for reaching out to Paws & Co. I can help with grooming, boarding availability, and booking your pet’s next visit.",
    workflow: ["Missed call", "Pet details collected", "Service selected", "Booking ready"],
    statuses: [
      { label: "Missed call", value: "DETECTED", tone: "blue" },
      { label: "Pet details", value: "COLLECTED", tone: "purple" },
      { label: "Service selected", value: "READY", tone: "green" },
      { label: "Booking", value: "OPEN", tone: "orange" },
    ],
    cta: "Book Pet Care",
    quickActions: ["Services", "Availability", "Book a Visit"],
    descriptor: "Grooming · Boarding · Training",
    cardAccent: "from-[#fff8fb] via-white to-[#f9f5ff]",
    iconWrap: "bg-[#f4ebff] text-[#8a5cf6] ring-[#e9ddff]",
    iconTone: "text-[#8a5cf6]",
  },
  "salon-spa": {
    label: "Salon & Spa",
    businessName: "Lumen Salon & Spa",
    greeting: "Hi! I'm Lumen AI. I can help you choose a service, check availability, and book your next appointment.",
    workflow: ["Missed call", "Service selected", "Availability checked", "Appointment booked"],
    statuses: [
      { label: "Missed call", value: "DETECTED", tone: "blue" },
      { label: "Service selected", value: "READY", tone: "green" },
      { label: "Availability", value: "FOUND", tone: "purple" },
      { label: "Appointment", value: "OPEN", tone: "orange" },
    ],
    cta: "Book Appointment",
    quickActions: ["Services", "Pricing", "Availability", "Book a Service"],
    descriptor: "Services · Availability · Booking",
    cardAccent: "from-[#fffafc] via-white to-[#f7f3ff]",
    iconWrap: "bg-[#fef1ff] text-[#d455c5] ring-[#f8d7ff]",
    iconTone: "text-[#d455c5]",
  },
  "professional-services": {
    label: "Professional Services",
    businessName: "Northstar Legal & Advisory",
    greeting: "Hi! Thanks for reaching out. I can collect a few details about your request and help schedule an initial consultation.",
    workflow: ["New inquiry", "Intake started", "Lead qualified", "Consultation booked"],
    statuses: [
      { label: "New inquiry", value: "RECEIVED", tone: "blue" },
      { label: "Intake", value: "STARTED", tone: "purple" },
      { label: "Lead qualified", value: "READY", tone: "green" },
      { label: "Consultation", value: "OPEN", tone: "orange" },
    ],
    cta: "Book Consultation",
    quickActions: ["Services", "Consultation", "Availability"],
    descriptor: "Intake · Consultations · Scheduling",
    cardAccent: "from-[#f8faff] via-white to-[#f5f3ff]",
    iconWrap: "bg-[#eef2ff] text-[#3b63d9] ring-[#dfe7ff]",
    iconTone: "text-[#3b63d9]",
  },
  other: {
    label: "Other",
    businessName: "CloseCove Custom Workflow",
    greeting: "Hi! I’m your CloseCove AI assistant. I can help answer questions, qualify new inquiries, and guide customers toward the next step.",
    workflow: ["New inquiry", "AI response", "Lead qualified", "Next step"],
    statuses: [
      { label: "New inquiry", value: "RECEIVED", tone: "blue" },
      { label: "AI response", value: "SENT", tone: "blue" },
      { label: "Lead qualified", value: "READY", tone: "green" },
      { label: "Next step", value: "OPEN", tone: "orange" },
    ],
    cta: "Explore Workflow",
    quickActions: ["Ask a Question", "Availability", "Get Started"],
    descriptor: "Custom workflows · Booking · Follow-up",
    cardAccent: "from-[#f5f8ff] via-white to-[#f7f8fc]",
    iconWrap: "bg-[#eef3ff] text-[#4e5d7a] ring-[#dde7ff]",
    iconTone: "text-[#4e5d7a]",
  },
};

function IndustryIcon({ label, className = "h-5 w-5" }: { label: string; className?: string }) {
  const baseClass = `${className} stroke-[1.8]`;

  switch (label) {
    case "Iron Village Fitness":
    case "Fitness":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={baseClass} aria-hidden>
          <path d="M3.5 9.5h2.5v5h-2.5M20.5 9.5h-2.5v5h2.5M7 9.5v-2a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v2m0 5v2a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1v-2m9-5v-2a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v2m0 5v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-2M12 7.5V16.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Apex Home Services":
    case "Home Services":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={baseClass} aria-hidden>
          <path d="M8 18.5l-3-3 7.5-7.5 3 3L8 18.5Zm8.25-11.75 2.5-2.5 3 3-2.5 2.5M6.5 15.5l-2 2M15 7l2-2M11.5 18 18 11.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Paws & Co. Pet Care":
    case "Pet Care":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={baseClass} aria-hidden>
          <path d="M8.5 10.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM6.5 15c.5-2 2.3-3.5 5.5-3.5s5 1.5 5.5 3.5v1.5h-11V15Zm-2-3.5 1.5 1.5m11-1.5 1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Lumen Salon & Spa":
    case "Salon & Spa":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={baseClass} aria-hidden>
          <path d="M12 3.5c1.8 2.3 3 4.2 3 6.2A3 3 0 0 1 9 9.7c0-2 1.2-3.9 3-6.2ZM6.5 14.5c.8 3 3 5 5.5 5s4.7-2 5.5-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 15.5h5" strokeLinecap="round" />
        </svg>
      );
    case "Northstar Legal & Advisory":
    case "Professional Services":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={baseClass} aria-hidden>
          <path d="M4 8.5h16v9.5H4zM8 8.5V6.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M9 12h6M9 15h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={baseClass} aria-hidden>
          <path d="M4.5 8.5h5v5h-5zm10-5h5v5h-5zm0 10h5v5h-5zm-10 0h5v5h-5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function HomePage() {
  const { business, industry, selectIndustry } = useBusiness();
  const selectedBusinessType = industry ?? "other";
  const selectedDemo = demoStates[selectedBusinessType];
  const isBusinessSelected = industry !== null;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const timeout = window.setTimeout(() => {
      const revealElements = document.querySelectorAll(".scroll-reveal:not(.is-visible)");
      if (!revealElements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      revealElements.forEach((element) => observer.observe(element));

      return () => observer.disconnect();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [selectedBusinessType]);

  const openDemoChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("closecove-open-chat"));
    }
  };

  const statusToneClass = {
    green: {
      row: "status-row status-row--green",
      indicator: "status-led status-led--green",
      pill: "status-pill status-pill--green",
    },
    blue: {
      row: "status-row status-row--blue",
      indicator: "status-led status-led--blue",
      pill: "status-pill status-pill--blue",
    },
    purple: {
      row: "status-row status-row--purple",
      indicator: "status-led status-led--purple",
      pill: "status-pill status-pill--purple",
    },
    orange: {
      row: "status-row status-row--orange",
      indicator: "status-led status-led--orange",
      pill: "status-pill status-pill--orange",
    },
  } as const;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <main className="mx-auto max-w-[1200px] px-4 pb-20 pt-6 md:px-6 lg:px-8">
        <section className="scroll-reveal relative overflow-hidden pb-2">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_18%_18%,rgba(104,130,180,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(255,117,69,0.09),transparent_26%)]" />

          <div className="grid items-center gap-10 xl:grid-cols-[1.04fr_0.96fr]">
            <div className="max-w-[600px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-muted)] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <span className="h-2 w-2 rounded-full bg-[var(--ember)]" />
                AI automation for local businesses
              </div>

              <h1 className="mt-6 max-w-[620px] text-[3rem] font-black leading-[0.96] tracking-[-0.07em] text-[var(--foreground)] md:text-[3.8rem] xl:text-[4.5rem]">
                Turn missed opportunities into
                <span className="block text-[var(--foreground)]">booked customers.</span>
              </h1>

              <p className="mt-4 max-w-[520px] text-base leading-7 text-[var(--text-muted)] md:text-lg">
                AI systems that respond to missed calls, qualify new leads, and book customers 24/7 — even when you’re busy.
              </p>

              <div id="demo" className="mt-8 max-w-[560px]">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  What type of business are you?
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {businessOptions.map((option) => {
                    const active = option.id === industry;
                    const label = option.label;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => selectIndustry(option.id)}
                        className={`group flex items-center justify-between gap-2 rounded-full border px-3 py-2.5 text-left transition-all duration-220 ease-out ${
                          active
                            ? "border-[#ff9a6d] bg-[#fff1ea] text-[var(--foreground)] shadow-[0_0_0_1px_rgba(255,122,69,0.18),0_10px_24px_rgba(255,122,69,0.12)]"
                            : "border-[var(--line)] bg-white/50 text-[var(--ink)] hover:-translate-y-0.5 hover:border-[#ff8a5b] hover:bg-white hover:shadow-[0_10px_18px_rgba(15,23,42,0.04)]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-full ${active ? "bg-[#fff1ea] text-[var(--ember)]" : "bg-[var(--surface-strong)] text-[var(--text-muted)] group-hover:text-[var(--foreground)]"}`}>
                            <IndustryIcon label={label} className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm font-medium">{option.label}</span>
                        </span>
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] ${active ? "border-[#ffb89f] bg-[#fff1ea] text-[var(--ember)]" : "border-[var(--line)] text-[var(--text-muted)] opacity-0 group-hover:opacity-100"}`}>
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative ml-auto w-full max-w-[560px]">
              <div className={`relative overflow-hidden rounded-[26px] border border-[var(--line)] bg-gradient-to-br ${selectedDemo.cardAccent} p-4 text-[var(--ink)] shadow-[0_26px_70px_rgba(13,23,40,0.10)]`}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_18%,rgba(255,122,69,0.09),transparent_32%)]" />
                <div key={selectedBusinessType} className="relative animate-fade-up">
                  <div className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-white/65 px-3 py-2.5 backdrop-blur-sm">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ring-1 ${selectedDemo.iconWrap}`}>
                      <IndustryIcon label={selectedDemo.businessName} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">LIVE DEMO</div>
                      <div className="truncate text-lg font-semibold text-[var(--foreground)]">{selectedDemo.businessName}</div>
                    </div>
                    <div className="inline-flex items-center gap-1 rounded-full border border-[#dfeaf7] bg-[#edf6ff] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#1f5a8f]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1f5a8f]" />
                      live
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-[var(--ember)]" />
                    configured for
                  </div>
                  <div className="mt-1 text-sm font-medium text-slate-700">{selectedDemo.label}</div>

                  <div className="mt-4 scroll-reveal rounded-[20px] border border-[var(--line)] bg-[linear-gradient(180deg,#f8fbff_0%,#eef5fb_100%)] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">AI receptionist</div>
                    <p className="mt-2 text-sm leading-5 text-slate-700">“{selectedDemo.greeting}”</p>
                  </div>

                  <div className="mt-4 scroll-reveal space-y-3">
                    {selectedDemo.statuses.map((status, index) => {
                      const toneClass = statusToneClass[status.tone];

                      return (
                        <div key={`${status.label}-${index}`} className={`status-row ${toneClass.row} flex items-center justify-between px-3 py-2.5`}>
                          <span className="flex items-center gap-3 text-sm font-medium text-slate-700">
                            <span className={toneClass.indicator} aria-hidden />
                            {status.label}
                          </span>
                          <span className={`status-pill ${toneClass.pill}`}>
                            <span className="status-pill-dot" aria-hidden />
                            {status.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={openDemoChat}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ember)] px-4 py-2.75 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,122,69,0.22)] transition-all duration-220 ease-out hover:-translate-y-0.5 hover:bg-[#f66e3d] active:translate-y-0 ${selectedDemo.iconTone}`}
                  >
                    {selectedDemo.cta}
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="schedule" className="scroll-reveal mx-auto mt-16 w-full max-w-6xl">
          {isBusinessSelected ? (
            <>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Book a service</p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.06em] text-[#0f172a]">{business.name}</h2>
                </div>
                <span className="inline-flex w-fit items-center rounded-full border border-[#dfeaf7] bg-[#edf6ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1f5a8f]">
                  {selectedDemo.descriptor}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {business.pricing.slice(0, 4).map((tier) => (
                  <article
                    key={tier.id}
                    className={`scroll-reveal rounded-[22px] border p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)] ${tier.highlight ? "border-[#ffd4bf] bg-[#fffaf5] text-slate-900 shadow-sm" : "border-slate-200 bg-white text-slate-900 shadow-[0_8px_20px_rgba(15,23,42,0.03)]"}`}
                  >
                    {tier.highlight && (
                      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff7a45]">Most popular</div>
                    )}
                    <div className="text-sm font-medium text-slate-500">{tier.name}</div>
                    <div className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#0f172a]">${tier.price}</div>
                    <div className="mt-1 text-xs text-slate-500">{tier.period}</div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {tier.perks.slice(0, 3).map((perk) => (
                        <li key={perk}>• {perk}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] border border-slate-200 bg-white p-4 md:p-5 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
                <h3 className="text-base font-semibold text-[#0f172a]">Available this week</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {business.classes.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      className="rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-[#ff8a5b] hover:text-slate-900"
                    >
                      {slot.day} · {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-black tracking-[-0.06em] text-[#0f172a]">How it works</h2>
              <p className="mt-2 text-sm text-slate-600">A clean overview of how CloseCove turns missed opportunities into booked revenue.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Capture", body: "Missed calls and form inquiries are detected instantly.", result: "No lead is lost" },
                  { title: "Qualify", body: "The AI asks the right questions and confirms intent.", result: "Better-fit leads only" },
                  { title: "Book", body: "Appointments are sent directly to your calendar and inbox.", result: "Faster follow-through" },
                ].map((item) => (
                  <article key={item.title} className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-[0_10px_20px_rgba(15,23,42,0.03)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_26px_rgba(15,23,42,0.06)]">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Step {item.title === "Capture" ? "1" : item.title === "Qualify" ? "2" : "3"}</div>
                    <h3 className="mt-3 text-xl font-semibold text-[#0f172a]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                    <div className="mt-4 text-sm font-medium text-[#ff7a45]">{item.result}</div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <section id="pricing" className="scroll-reveal mt-16 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.04)] md:p-8">
          {isBusinessSelected ? (
            <>
              <h2 className="text-3xl font-black tracking-[-0.06em] text-[#0f172a]">Offerings</h2>
              <p className="mt-2 text-sm text-slate-600">Simple pricing and service tiers. Ask the AI for details.</p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {business.pricing.map((tier) => (
                  <article
                    key={tier.id}
                    className={`scroll-reveal rounded-[22px] border p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)] ${tier.highlight ? "border-[#ffd4bf] bg-[#fffaf5] text-slate-900 shadow-sm" : "border-slate-200 bg-[#f8fafc] text-slate-900"}`}
                  >
                    {tier.highlight && (
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff7a45]">Most popular</p>
                    )}
                    <h3 className="text-xl font-semibold text-[#0f172a]">{tier.name}</h3>
                    <div className="mt-4 text-3xl font-black tracking-[-0.06em] text-[#0f172a]">${tier.price}</div>
                    <div className="mt-1 text-xs text-slate-500">{tier.period}</div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {tier.perks.map((perk) => (
                        <li key={perk}>• {perk}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-black tracking-[-0.06em] text-[#0f172a]">CloseCove pricing</h2>
              <p className="mt-2 text-sm text-slate-600">Transparent plans for AI-powered lead capture and follow-up.</p>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {business.pricing.map((tier) => (
                  <article
                    key={tier.id}
                    className={`scroll-reveal rounded-[22px] border p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_28px_rgba(15,23,42,0.06)] ${tier.highlight ? "border-[#ffd4bf] bg-[#fffaf5] text-slate-900 shadow-sm" : "border-slate-200 bg-[#f8fafc] text-slate-900"}`}
                  >
                    {tier.highlight && (
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#ff7a45]">Most popular</p>
                    )}
                    <h3 className="text-xl font-semibold text-[#0f172a]">{tier.name}</h3>
                    <div className="mt-4 text-3xl font-black tracking-[-0.06em] text-[#0f172a]">${tier.price}</div>
                    <div className="mt-1 text-xs text-slate-500">{tier.period}</div>
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {tier.perks.map((perk) => (
                        <li key={perk}>• {perk}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <footer id="inquire" className="mt-16 border-t border-slate-200 pt-8 text-center text-xs text-slate-500">
          <p>
            {business.name} · {business.phone} · Demo property of CloseCove AI (not a live business site)
          </p>
          <p className="mt-2">
            Pitch path: <a href="/demo/missed-call" className="text-[#0f172a] underline decoration-slate-300 underline-offset-2">Missed Call</a> → <a href="/demo/winback" className="text-[#0f172a] underline decoration-slate-300 underline-offset-2">Win-Back</a> → <a href="/dashboard" className="text-[#0f172a] underline decoration-slate-300 underline-offset-2">Dashboard</a>
          </p>
        </footer>
      </main>
      <ChatWidget />
    </div>
  );
}
