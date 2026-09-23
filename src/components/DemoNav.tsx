"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useBusiness } from "@/lib/business-context";

const links = [
  { href: "/", label: "Business Site" },
  { href: "/demo/missed-call", label: "Missed Call" },
  { href: "/demo/winback", label: "Win-Back" },
  { href: "/dashboard", label: "Dashboard" },
];

export function DemoNav() {
  const pathname = usePathname();
  const { business } = useBusiness();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-white/8 bg-[#0d1728]/90 backdrop-blur-xl shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#101d2d] px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-transform duration-200 hover:scale-[1.01]">
            <svg viewBox="0 0 40 40" className="h-5 w-5" aria-hidden>
              <rect width="40" height="40" rx="11" fill="#ff7a45" />
              <path d="M11 12.5c0-1.4 1.1-2.5 2.5-2.5h3.1c2.1 0 3.9 1.7 3.9 3.8v0c0 1.6-1.2 2.9-2.8 3.1l-3.1.4v7.1h5.2c1.7 0 3.1 1.4 3.1 3.1v0c0 1.9-1.6 3.4-3.5 3.4H13.5C12.1 31.9 11 30.8 11 29.4V12.5Z" fill="#0b0d10" opacity="0.9" />
              <path d="M22.5 12.5h6.7c1.4 0 2.5 1.1 2.5 2.5v11.8c0 1.4-1.1 2.5-2.5 2.5h-6.7v-4.8h3.4v-6.5h-3.4v-5.5Z" fill="#0b0d10" opacity="0.9" />
            </svg>
            <span className="font-display text-[10px] tracking-[0.22em] text-slate-100 uppercase">CloseCove</span>
          </div>
          <span suppressHydrationWarning className="hidden text-xs text-slate-300 sm:inline">{business.name}</span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out ${
                  active
                    ? "bg-[#fff1ea] text-[#0d1728] shadow-[0_8px_18px_rgba(255,122,69,0.12)] ring-1 ring-[#ffd7c5]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition-all duration-200 ease-out hover:border-white/20 hover:bg-white/10 md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-200 ${mobileOpen ? "top-1.5 -rotate-45" : "bottom-0"}`} />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/8 bg-[#0d1728]/95 px-4 py-3 shadow-[0_18px_34px_rgba(15,23,42,0.2)] md:hidden">
          <nav className="flex flex-col gap-1.5">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-all duration-180 ease-out ${
                    active
                      ? "bg-[#fff1ea] text-[#0d1728] shadow-[0_8px_18px_rgba(255,122,69,0.12)] ring-1 ring-[#ffd7c5]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
