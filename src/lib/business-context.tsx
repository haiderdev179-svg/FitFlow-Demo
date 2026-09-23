"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { businessProfiles, defaultBusinessType, type BusinessType } from "@/lib/data";

const STORAGE_KEY = "closecove-active-industry";

type BusinessContextValue = {
  industry: BusinessType;
  business: (typeof businessProfiles)[BusinessType];
  selectIndustry: (industry: BusinessType) => void;
};

const BusinessContext = createContext<BusinessContextValue | null>(null);

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [industry, setIndustry] = useState<BusinessType>(defaultBusinessType);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY) as BusinessType | null;
    if (stored && businessProfiles[stored]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIndustry(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, industry);
  }, [industry]);

  const value = useMemo<BusinessContextValue>(
    () => ({
      industry,
      business: businessProfiles[industry],
      selectIndustry: setIndustry,
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
