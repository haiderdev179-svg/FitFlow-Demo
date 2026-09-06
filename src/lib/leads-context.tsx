"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { seedLeads, type Lead } from "./data";

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
  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const addLead = useCallback((lead: Omit<Lead, "id" | "createdAt">) => {
    setLeads((prev) => [
      {
        ...lead,
        id: `live-${Date.now()}`,
        createdAt: formatNow(),
      },
      ...prev,
    ]);
  }, []);

  const value = useMemo<LeadsContextValue>(
    () => ({
      leads,
      extraLeadsCount: Math.max(0, leads.length - seedLeads.length),
      addLead,
    }),
    [addLead, leads],
  );

  return <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>;
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used inside LeadsProvider");
  return ctx;
}
