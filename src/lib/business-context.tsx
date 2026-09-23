"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { businessProfiles, type BusinessType } from "@/lib/data";

const STORAGE_KEY = "closecove-active-industry";

type BusinessContextValue = {
  industry: BusinessType | null;
  business: (typeof businessProfiles)[BusinessType];
  selectIndustry: (industry: BusinessType) => void;
};

const neutralBusinessProfile = {
  ...businessProfiles.other,
  id: "other",
  name: "CloseCove",
  tagline: "AI automation for local businesses.",
  city: "San Francisco, CA",
  phone: "+1 (415) 555-0142",
  hours: "Mon–Fri · 9:00 AM – 6:00 PM",
  badge: "CloseCove · AI sales automation",
  heroLead: "Turn missed opportunities into booked customers.",
  heroBlurb: "AI systems that catch every inbound lead your business would otherwise lose — responding in seconds and booking directly into your schedule 24/7.",
  pricing: [
    { id: "starter", name: "Starter", price: 300, period: "one-time + $150/month", highlight: false, perks: ["24/7 missed-call text-back", "Website booking chat agent", "Google Calendar sync"] },
    { id: "growth", name: "Growth", price: 650, period: "one-time + $250/month", highlight: true, perks: ["Everything in Starter", "Automated win-back & retention workflows", "Custom lead qualification"] },
  ],
  classes: [
    { id: "c1", name: "Discovery call", coach: "CloseCove team", day: "Mon / Tue / Thu", time: "9:00 AM", spots: "Booked in minutes" },
    { id: "c2", name: "AI onboarding", coach: "Implementation lead", day: "Wed / Fri", time: "11:00 AM", spots: "Custom setup" },
    { id: "c3", name: "Optimization review", coach: "Revenue ops", day: "Weekly", time: "12:30 PM", spots: "Live coaching" },
  ],
  dashboardTitle: "CloseCove · AI Sales Demo",
  dashboardSummary: "The default view shows CloseCove's own pricing and onboarding flow until a business type is selected.",
  chat: {
    greeting: "Hi! I'm CloseCove AI. Ask me about pricing, onboarding, or booking a demo.",
    pricingReply: "Here are our plans:\n• Starter — $300 setup + $150/mo\n• Growth — $650 setup + $250/mo (most popular)\n\nWant me to help you book a demo?",
    scheduleReply: "We can walk through onboarding, AI lead handling, and next steps for your business. I can also help schedule a demo call.",
    fallback: "I can help with pricing, onboarding, or booking a demo. What would you like to do?",
  },
} as (typeof businessProfiles)[BusinessType];

const BusinessContext = createContext<BusinessContextValue | null>(null);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [industry, setIndustry] = useState<BusinessType | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedIndustry = window.localStorage.getItem(STORAGE_KEY) as BusinessType | null;
    if (savedIndustry && savedIndustry in businessProfiles) {
      setIndustry(savedIndustry);
      return;
    }
    setIndustry(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (industry) {
      window.localStorage.setItem(STORAGE_KEY, industry);
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
  }, [industry]);

  const value = useMemo<BusinessContextValue>(
    () => ({
      industry,
      business: industry ? businessProfiles[industry] : neutralBusinessProfile,
      selectIndustry: (nextIndustry: BusinessType) => setIndustry(nextIndustry),
    }),
    [industry],
  );

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
}

export function useBusiness() {
  const ctx = useContext(BusinessContext);
  if (!ctx) throw new Error("useBusiness must be used inside BusinessProvider");
  return ctx;
}
