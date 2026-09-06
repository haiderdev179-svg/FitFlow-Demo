import Link from "next/link";
import { ChatWidget } from "@/components/ChatWidget";
import { GymLogo } from "@/components/GymLogo";
import { OpenChatButton } from "@/components/OpenChatButton";
import { classes, gym, memberships } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line bg-ink-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <GymLogo />
            <div>
              <p className="font-display text-lg tracking-wide uppercase">{gym.name}</p>
              <p className="text-xs text-mute">{gym.city} · {gym.hours}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm sm:flex">
            <a href="#schedule" className="text-mute hover:text-sand">
              Classes
            </a>
            <a href="#pricing" className="text-mute hover:text-sand">
              Pricing
            </a>
            <OpenChatButton className="rounded-full bg-ember px-4 py-2 font-semibold text-ink hover:bg-ember-2">
              Book a Free Trial
            </OpenChatButton>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,90,31,0.28),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,122,69,0.12),transparent_35%),linear-gradient(180deg,#121214,#0b0b0c)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-ember uppercase">
              Independent gym · One location · Real community
            </p>
            <h1 className="font-display text-5xl leading-[0.95] tracking-tight uppercase sm:text-7xl">
              {gym.name}
            </h1>
            <p className="mt-4 max-w-md text-lg text-sand/80">{gym.tagline} Strength, classes, and coaches who know your name.</p>
            <div className="mt-8 flex flex-wrap gap-3" id="trial">
              <OpenChatButton className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ink hover:bg-ember-2">
                Book a Free Trial
              </OpenChatButton>
              <a
                href="#schedule"
                className="rounded-full border border-line px-6 py-3 text-sm text-sand hover:border-ember"
              >
                See class times
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card/80 p-6 backdrop-blur">
            <p className="font-display text-sm tracking-widest text-ember uppercase">Today on the floor</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between border-b border-line pb-3">
                <span>Open gym</span>
                <span className="text-mute">5:00 AM – 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-line pb-3">
                <span>Sunrise HIIT · Maya</span>
                <span className="text-ember">6:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Strength Foundations · Andre</span>
                <span className="text-ember">5:30 PM</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-mute">
              Tap the chat in the corner — that&apos;s the FitFlow AI widget a gym owner would show their staff.
            </p>
          </div>
        </div>
      </section>

      <section id="schedule" className="mx-auto w-full max-w-6xl px-4 py-16">
        <h2 className="font-display text-3xl uppercase tracking-wide">Class schedule</h2>
        <p className="mt-2 text-sm text-mute">Mocked weekly grid — swap this for the gym&apos;s real timetable in production.</p>
        <div className="mt-6 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-card text-mute">
              <tr>
                <th className="px-4 py-3 font-medium">Class</th>
                <th className="px-4 py-3 font-medium">Coach</th>
                <th className="px-4 py-3 font-medium">Days</th>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Spots</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-t border-line">
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-mute">{c.coach}</td>
                  <td className="px-4 py-3">{c.day}</td>
                  <td className="px-4 py-3">{c.time}</td>
                  <td className="px-4 py-3 text-ember">{c.spots}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="pricing" className="border-t border-line bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl uppercase tracking-wide">Membership</h2>
          <p className="mt-2 text-sm text-mute">Simple tiers. No contracts theater. Ask the AI for details.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {memberships.map((tier) => (
              <article
                key={tier.id}
                className={`rounded-2xl border p-6 ${
                  tier.highlight ? "border-ember bg-card" : "border-line bg-ink"
                }`}
              >
                {tier.highlight && (
                  <p className="mb-3 text-[11px] font-semibold tracking-widest text-ember uppercase">
                    Most popular
                  </p>
                )}
                <h3 className="font-display text-xl uppercase">{tier.name}</h3>
                <p className="mt-2 text-3xl font-semibold">
                  ${tier.price}
                  <span className="text-base text-mute">{tier.period}</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-sand/80">
                  {tier.perks.map((perk) => (
                    <li key={perk}>— {perk}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-4 py-8 text-center text-xs text-mute">
        <p>
          {gym.name} · {gym.phone} · Demo property of FitFlow AI (not a live gym site)
        </p>
        <p className="mt-2">
          Pitch path:{" "}
          <Link href="/demo/missed-call" className="text-ember">
            Missed Call
          </Link>{" "}
          →{" "}
          <Link href="/demo/winback" className="text-ember">
            Win-Back
          </Link>{" "}
          →{" "}
          <Link href="/dashboard" className="text-ember">
            Dashboard
          </Link>
        </p>
      </footer>

      <ChatWidget />
    </div>
  );
}
