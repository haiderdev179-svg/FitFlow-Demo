"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Gym Site" },
  { href: "/demo/missed-call", label: "Missed Call" },
  { href: "/demo/winback", label: "Win-Back" },
  { href: "/dashboard", label: "Dashboard" },
];

export function DemoNav() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="rounded bg-ember px-2 py-0.5 font-display text-[11px] font-semibold tracking-[0.14em] text-ink uppercase">
            FitFlow AI
          </span>
          <span className="hidden text-xs text-mute sm:inline">Live sales demo</span>
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
