"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useBusiness } from "@/lib/business-context";
import { businessProfiles, type BusinessType, type Lead } from "./data";

type LeadsContextValue = {
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  extraLeadsCount: number;
};

const LeadsContext = createContext<LeadsContextValue | null>(null);

function formatNow() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export function LeadsProvider({ children }: { children: ReactNode }) {
  const { business, industry } = useBusiness();
  const [leadBuckets, setLeadBuckets] = useState<Record<BusinessType, Lead[]>>(() =>
    Object.fromEntries(
      Object.entries(businessProfiles).map(([key, profile]) => [key, profile.seedLeads]),
    ) as Record<BusinessType, Lead[]>,
  );

  const activeBusiness = business ?? businessProfiles.other;
  const activeIndustry = industry ?? "other";
  const leads = leadBuckets[activeIndustry] ?? activeBusiness.seedLeads;

  const addLead = useCallback(
    (lead: Omit<Lead, "id" | "createdAt">) => {
      setLeadBuckets((prev) => ({
        ...prev,
        [activeIndustry]: [
          {
            ...lead,
            id: `live-${Date.now()}`,
            createdAt: formatNow(),
          },
          ...(prev[activeIndustry] ?? activeBusiness.seedLeads),
        ],
      }));
    },
    [activeBusiness.seedLeads, activeIndustry],
  );

  const value = useMemo<LeadsContextValue>(
    () => ({
      leads,
      extraLeadsCount: Math.max(0, leads.length - business.seedLeads.length),
      addLead,
    }),
    [addLead, business.seedLeads.length, leads],
  );

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used inside LeadsProvider");
  return ctx;
}
