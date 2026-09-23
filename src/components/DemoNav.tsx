"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-line bg-card px-2 py-1.5 shadow-sm">
            <svg viewBox="0 0 40 40" className="h-5 w-5" aria-hidden>
              <rect width="40" height="40" rx="11" fill="#ff7a45" />
              <path d="M11 12.5c0-1.4 1.1-2.5 2.5-2.5h3.1c2.1 0 3.9 1.7 3.9 3.8v0c0 1.6-1.2 2.9-2.8 3.1l-3.1.4v7.1h5.2c1.7 0 3.1 1.4 3.1 3.1v0c0 1.9-1.6 3.4-3.5 3.4H13.5C12.1 31.9 11 30.8 11 29.4V12.5Z" fill="#0b0d10" opacity="0.9" />
              <path d="M22.5 12.5h6.7c1.4 0 2.5 1.1 2.5 2.5v11.8c0 1.4-1.1 2.5-2.5 2.5h-6.7v-4.8h3.4v-6.5h-3.4v-5.5Z" fill="#0b0d10" opacity="0.9" />
            </svg>
            <span className="font-display text-[11px] tracking-[0.2em] text-sand uppercase">CloseCove</span>
          </div>
          <span className="hidden text-xs text-mute sm:inline">{business.name}</span>
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  active
                    ? "bg-ember text-ink"
                    : "text-sand/80 hover:bg-card hover:text-sand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
