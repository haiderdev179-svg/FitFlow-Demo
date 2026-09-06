export const gym = {
  name: "Iron Village Fitness",
  tagline: "Train hard. Belong here.",
  city: "Austin, TX",
  phone: "(512) 555-0147",
  hours: "5:00 AM – 10:00 PM",
};

export type MembershipTier = {
  id: string;
  name: string;
  price: number;
  period: string;
  highlight?: boolean;
  perks: string[];
};

export const memberships: MembershipTier[] = [
  {
    id: "starter",
    name: "Village Starter",
    price: 39,
    period: "/mo",
    perks: ["Gym floor access", "2 group classes / week", "Locker room"],
  },
  {
    id: "unlimited",
    name: "Iron Unlimited",
    price: 79,
    period: "/mo",
    highlight: true,
    perks: [
      "Unlimited classes",
      "Open gym 5AM–10PM",
      "Guest pass each month",
      "App + AI booking",
    ],
  },
  {
    id: "coach",
    name: "Coach Plus",
    price: 149,
    period: "/mo",
    perks: [
      "Everything in Unlimited",
      "2 PT sessions / month",
      "Custom programming",
    ],
  },
];

export type GymClass = {
  id: string;
  name: string;
  coach: string;
  day: string;
  time: string;
  spots: string;
};

export const classes: GymClass[] = [
  { id: "c1", name: "Sunrise HIIT", coach: "Maya", day: "Mon / Wed / Fri", time: "6:00 AM", spots: "4 left" },
  { id: "c2", name: "Strength Foundations", coach: "Andre", day: "Tue / Thu", time: "5:30 PM", spots: "Open" },
  { id: "c3", name: "Village Spin", coach: "Jess", day: "Wed / Sat", time: "7:15 AM", spots: "2 left" },
  { id: "c4", name: "Olympic Lifts", coach: "Andre", day: "Thu", time: "6:00 PM", spots: "Open" },
  { id: "c5", name: "Mobility & Recover", coach: "Priya", day: "Sat", time: "10:00 AM", spots: "Open" },
  { id: "c6", name: "Sunday Strong", coach: "Maya", day: "Sun", time: "9:00 AM", spots: "6 left" },
];

export const trialSlots = [
  "Tomorrow 6:00 AM — Sunrise HIIT",
  "Thursday 5:30 PM — Strength Foundations",
  "Saturday 10:00 AM — Mobility & Recover",
];

export type Lead = {
  id: string;
  name: string;
  phone: string;
  preferredTime: string;
  source: string;
  createdAt: string;
};

export const seedLeads: Lead[] = [
  {
    id: "l1",
    name: "Jake Morales",
    phone: "(512) 555-0144",
    preferredTime: "Thu 5:30 PM Strength",
    source: "Missed-call SMS",
    createdAt: "Mon 9:12 AM",
  },
  {
    id: "l2",
    name: "Elena Park",
    phone: "(512) 555-0198",
    preferredTime: "Sat 10:00 AM Mobility",
    source: "Website chat",
    createdAt: "Sun 4:41 PM",
  },
  {
    id: "l3",
    name: "Devon Blake",
    phone: "(512) 555-0112",
    preferredTime: "Wed 7:15 AM Spin",
    source: "Walk-in follow-up",
    createdAt: "Sat 11:03 AM",
  },
];

export type Member = {
  id: string;
  name: string;
  lastVisitDays: number;
  visitsThisMonth: number;
  weeklyCheckins: number[];
  status: "active" | "at-risk" | "re-engaged" | "no-response";
  winbackSent?: boolean;
};

export const members: Member[] = [
  { id: "m1", name: "Sarah Chen", lastVisitDays: 18, visitsThisMonth: 2, weeklyCheckins: [3, 4, 1, 0], status: "re-engaged", winbackSent: true },
  { id: "m2", name: "Marcus Reid", lastVisitDays: 22, visitsThisMonth: 1, weeklyCheckins: [4, 2, 0, 0], status: "no-response", winbackSent: true },
  { id: "m3", name: "Priya Nair", lastVisitDays: 16, visitsThisMonth: 3, weeklyCheckins: [3, 3, 1, 0], status: "re-engaged", winbackSent: true },
  { id: "m4", name: "Luis Ortega", lastVisitDays: 15, visitsThisMonth: 2, weeklyCheckins: [2, 3, 0, 0], status: "no-response", winbackSent: true },
  { id: "m5", name: "Amy Walsh", lastVisitDays: 19, visitsThisMonth: 1, weeklyCheckins: [3, 1, 0, 0], status: "re-engaged", winbackSent: true },
  { id: "m6", name: "Chris Yoon", lastVisitDays: 21, visitsThisMonth: 0, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
  { id: "m7", name: "Nina Patel", lastVisitDays: 17, visitsThisMonth: 2, weeklyCheckins: [4, 2, 0, 0], status: "no-response", winbackSent: true },
  { id: "m8", name: "Omar Hassan", lastVisitDays: 14, visitsThisMonth: 3, weeklyCheckins: [3, 3, 1, 0], status: "no-response", winbackSent: true },
  { id: "m9", name: "Taylor Brooks", lastVisitDays: 2, visitsThisMonth: 9, weeklyCheckins: [4, 5, 4, 3], status: "active" },
  { id: "m10", name: "Jordan Lee", lastVisitDays: 1, visitsThisMonth: 11, weeklyCheckins: [5, 4, 5, 4], status: "active" },
  { id: "m11", name: "Sam Rivera", lastVisitDays: 4, visitsThisMonth: 7, weeklyCheckins: [3, 4, 3, 2], status: "active" },
  { id: "m12", name: "Casey Nguyen", lastVisitDays: 3, visitsThisMonth: 8, weeklyCheckins: [4, 3, 4, 3], status: "active" },
];

export const dashboardStats = {
  newLeadsThisWeek: 12,
  trialsBooked: 7,
  atRiskMembers: 8,
  winbacksThisMonth: 3,
};
