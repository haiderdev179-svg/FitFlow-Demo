export type BusinessType =
  | "fitness"
  | "home-services"
  | "pet-care"
  | "salon-spa"
  | "professional-services"
  | "other";

export type MembershipTier = {
  id: string;
  name: string;
  price: number;
  period: string;
  highlight?: boolean;
  perks: string[];
};

export type BusinessClass = {
  id: string;
  name: string;
  coach: string;
  day: string;
  time: string;
  spots: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  preferredTime: string;
  source: string;
  createdAt: string;
};

export type WinbackMember = {
  id: string;
  name: string;
  lastVisitDays: number;
  visitsThisMonth: number;
  weeklyCheckins: number[];
  status: "active" | "at-risk" | "re-engaged" | "no-response";
  winbackSent?: boolean;
};

export type BusinessProfile = {
  id: BusinessType;
  name: string;
  tagline: string;
  city: string;
  phone: string;
  hours: string;
  badge: string;
  heroLead: string;
  heroBlurb: string;
  services: string[];
  pricing: MembershipTier[];
  classes: BusinessClass[];
  trialSlots: string[];
  dashboardTitle: string;
  dashboardSummary: string;
  dashboardStats: {
    newLeadsThisWeek: number;
    primaryMetricLabel: string;
    primaryMetricValue: number;
    riskLabel: string;
    riskValue: number;
    winbackLabel: string;
    winbackValue: number;
  };
  seedLeads: Lead[];
  winbackMembers: WinbackMember[];
  missedCall: {
    title: string;
    intro: string;
    incomingLead: string;
    messageIntro: string;
    capture: { name: string; phone: string; preferredTime: string; source: string };
    script: Array<
      | { delay: number; phase: "ringing" | "missed" }
      | { delay: number; bubble: { id: string; from: "business" | "caller"; text: string; status?: string } }
    >;
  };
  winback: {
    title: string;
    intro: string;
    trigger: string;
    highlightedName: string;
    highlightedMessage: string;
    messageFooter: string;
  };
  chat: {
    greeting: string;
    pricingReply: string;
    scheduleReply: string;
    fallback: string;
  };
};

export const businessOptions = [
  { id: "fitness", label: "Fitness" },
  { id: "home-services", label: "Home Services" },
  { id: "pet-care", label: "Pet Care" },
  { id: "salon-spa", label: "Salon & Spa" },
  { id: "professional-services", label: "Professional Services" },
  { id: "other", label: "Other" },
] as const;

export const businessProfiles: Record<BusinessType, BusinessProfile> = {
  fitness: {
    id: "fitness",
    name: "Iron Village Fitness",
    tagline: "Train hard. Belong here.",
    city: "Austin, TX",
    phone: "(512) 555-0147",
    hours: "5:00 AM – 10:00 PM",
    badge: "Independent gym · One location · Real community",
    heroLead: "Strength, classes, and coaches who know your name.",
    heroBlurb: "Train hard. Belong here. A neighborhood gym built for consistent progress and real accountability.",
    services: ["Strength coaching", "Group classes", "Recovery sessions", "Personal training"],
    pricing: [
      { id: "starter", name: "Village Starter", price: 39, period: "/mo", perks: ["Gym floor access", "2 group classes / week", "Locker room"] },
      { id: "unlimited", name: "Iron Unlimited", price: 79, period: "/mo", highlight: true, perks: ["Unlimited classes", "Open gym 5AM–10PM", "Guest pass each month", "App + AI booking"] },
      { id: "coach", name: "Coach Plus", price: 149, period: "/mo", perks: ["Everything in Unlimited", "2 PT sessions / month", "Custom programming"] },
    ],
    classes: [
      { id: "c1", name: "Sunrise HIIT", coach: "Maya", day: "Mon / Wed / Fri", time: "6:00 AM", spots: "4 left" },
      { id: "c2", name: "Strength Foundations", coach: "Andre", day: "Tue / Thu", time: "5:30 PM", spots: "Open" },
      { id: "c3", name: "Village Spin", coach: "Jess", day: "Wed / Sat", time: "7:15 AM", spots: "2 left" },
      { id: "c4", name: "Olympic Lifts", coach: "Andre", day: "Thu", time: "6:00 PM", spots: "Open" },
      { id: "c5", name: "Mobility & Recover", coach: "Priya", day: "Sat", time: "10:00 AM", spots: "Open" },
      { id: "c6", name: "Sunday Strong", coach: "Maya", day: "Sun", time: "9:00 AM", spots: "6 left" },
    ],
    trialSlots: [
      "Tomorrow 6:00 AM — Sunrise HIIT",
      "Thursday 5:30 PM — Strength Foundations",
      "Saturday 10:00 AM — Mobility & Recover",
    ],
    dashboardTitle: "Iron Village · CloseCove",
    dashboardSummary: "What the owner sees Monday morning. Book a trial from the business chat and it shows up in New Leads without a refresh.",
    dashboardStats: {
      newLeadsThisWeek: 12,
      primaryMetricLabel: "Trials Booked",
      primaryMetricValue: 7,
      riskLabel: "At-Risk Members",
      riskValue: 8,
      winbackLabel: "Win-Backs This Month",
      winbackValue: 3,
    },
    seedLeads: [
      { id: "l1", name: "Jake Morales", phone: "(512) 555-0144", preferredTime: "Thu 5:30 PM Strength", source: "Missed-call SMS", createdAt: "Mon 9:12 AM" },
      { id: "l2", name: "Elena Park", phone: "(512) 555-0198", preferredTime: "Sat 10:00 AM Mobility", source: "Website chat", createdAt: "Sun 4:41 PM" },
      { id: "l3", name: "Devon Blake", phone: "(512) 555-0112", preferredTime: "Wed 7:15 AM Spin", source: "Walk-in follow-up", createdAt: "Sat 11:03 AM" },
    ],
    winbackMembers: [
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
    ],
    missedCall: {
      title: "Missed call → booked trial",
      intro: "Front desk is with a member. The call dies. CloseCove texts in seconds, books the trial, and writes it to the calendar — no one picks up the phone.",
      incomingLead: "Incoming · Iron Village Fitness",
      messageIntro: "Auto-text thread",
      capture: { name: "Unknown Caller", phone: "(512) 555-0188", preferredTime: "Thursday 5:30 PM — Strength Foundations", source: "Missed-call SMS" },
      script: [
        { delay: 0, phase: "ringing" },
        { delay: 3200, phase: "missed" },
        { delay: 4200, bubble: { id: "1", from: "business", text: "Hey! Sorry we missed you at Iron Village Fitness 💪 Want to grab a free trial class this week?" } },
        { delay: 6200, bubble: { id: "2", from: "caller", text: "Yes! What times do you have?" } },
        { delay: 8200, bubble: { id: "3", from: "business", text: "We've got a few open trial slots:\n• Tomorrow 6:00 AM — Sunrise HIIT\n• Thu 5:30 PM — Strength Foundations\n• Sat 10:00 AM — Mobility" } },
        { delay: 10800, bubble: { id: "4", from: "caller", text: "Thursday 5:30 works" } },
        { delay: 12400, bubble: { id: "5", from: "business", text: "Locked in — Thursday 5:30 PM with Andre. We'll text a reminder an hour before. See you on the floor 🔥" } },
        { delay: 14000, bubble: { id: "6", from: "business", text: "✅ Trial booked — added to your calendar", status: "done" } },
      ],
    },
    winback: {
      title: "Churn radar & win-back",
      intro: "Members who vanish after week two rarely self-correct. CloseCove watches check-ins, fires a human-sounding text on day 14, and shows the owner who came back.",
      trigger: "Day 14 no check-in → Auto win-back text sent",
      highlightedName: "Sarah Chen",
      highlightedMessage: "Hey Sarah, we miss you at Iron Village! Here&apos;s a free guest pass for a friend if you come back this week 🎟️",
      messageFooter: "Replied · booked Thursday spin · Re-engaged ✅",
    },
    chat: {
      greeting: "Hi! I'm Iron Village's AI assistant. Ask me about classes, pricing, or book a free trial!",
      pricingReply: "Here's what membership looks like at Iron Village:\n• Village Starter — $39/mo\n• Iron Unlimited — $79/mo (most popular)\n• Coach Plus — $149/mo\n\nWant me to book you a free trial class?",
      scheduleReply: "This week's classes:\n• Sunrise HIIT — Mon / Wed / Fri at 6:00 AM (Maya)\n• Strength Foundations — Tue / Thu at 5:30 PM (Andre)\n• Village Spin — Wed / Sat at 7:15 AM (Jess)\n• Mobility & Recover — Sat at 10:00 AM (Priya)\n\nI can lock in a free trial at one of those times.",
      fallback: "I can help with membership pricing, this week's class schedule, or booking a free trial. What do you want to do?",
    },
  },
  "home-services": {
    id: "home-services",
    name: "Apex Home Services",
    tagline: "Comfort that shows up on time.",
    city: "Phoenix, AZ",
    phone: "(602) 555-0186",
    hours: "7:00 AM – 7:00 PM",
    badge: "Residential comfort · Emergency repairs",
    heroLead: "Fast, honest comfort care for homes and small businesses.",
    heroBlurb: "From emergency cooling repairs to preventative maintenance, we keep homes comfortable before issues become emergencies.",
    services: ["AC repair", "Furnace tune-ups", "Heat pump service", "Ductless mini-splits", "Indoor air quality"],
    pricing: [
      { id: "comfort", name: "Comfort Care", price: 79, period: "/mo", perks: ["Annual tune-up", "Priority scheduling", "20% off repairs"] },
      { id: "shield", name: "HomeShield Plus", price: 149, period: "/mo", highlight: true, perks: ["Everything in Comfort Care", "24/7 emergency response", "Free filter delivery"] },
      { id: "commercial", name: "Commercial Essentials", price: 249, period: "/mo", perks: ["Multi-unit support", "Maintenance plans", "Service reports"] },
    ],
    classes: [
      { id: "c1", name: "AC Performance Check", coach: "Alex", day: "Mon / Thu", time: "8:00 AM", spots: "2 open" },
      { id: "c2", name: "Furnace Tune-Up", coach: "Renee", day: "Tue / Fri", time: "10:00 AM", spots: "Open" },
      { id: "c3", name: "Mini-Split Inspection", coach: "Drew", day: "Wed", time: "1:30 PM", spots: "1 left" },
      { id: "c4", name: "Same-Day Emergency Call", coach: "Sam", day: "Daily", time: "Any time", spots: "On-call" },
    ],
    trialSlots: [
      "Tomorrow 9:00 AM — AC Performance Check",
      "Thursday 1:30 PM — Mini-Split Inspection",
      "Saturday 10:00 AM — Furnace Tune-Up",
    ],
    dashboardTitle: "Ferris HVAC & Air · CloseCove",
    dashboardSummary: "What the owner sees Monday morning. Service calls, maintenance check-ins, and emergency dispatches are tracked in one place.",
    dashboardStats: {
      newLeadsThisWeek: 15,
      primaryMetricLabel: "Service Calls",
      primaryMetricValue: 9,
      riskLabel: "Seasonal Check-Ups Due",
      riskValue: 11,
      winbackLabel: "Follow-Ups Sent",
      winbackValue: 5,
    },
    seedLeads: [
      { id: "l1", name: "Marisol Wong", phone: "(602) 555-0132", preferredTime: "Tomorrow 9:00 AM AC check", source: "Missed-call SMS", createdAt: "Mon 8:42 AM" },
      { id: "l2", name: "Terry Baines", phone: "(602) 555-0145", preferredTime: "Thu 1:30 PM mini-split", source: "Website form", createdAt: "Sun 6:15 PM" },
      { id: "l3", name: "Denise Ibarra", phone: "(602) 555-0193", preferredTime: "Urgent cooling outage", source: "Google review follow-up", createdAt: "Sat 9:19 AM" },
    ],
    winbackMembers: [
      { id: "m1", name: "Maya Cross", lastVisitDays: 19, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m2", name: "Luca Ortiz", lastVisitDays: 28, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m3", name: "Nina Holt", lastVisitDays: 17, visitsThisMonth: 2, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m4", name: "Alan Voss", lastVisitDays: 23, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
      { id: "m5", name: "Rita Gomez", lastVisitDays: 15, visitsThisMonth: 3, weeklyCheckins: [3, 2, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m6", name: "Bennett Hall", lastVisitDays: 27, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m7", name: "Vera Young", lastVisitDays: 21, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
      { id: "m8", name: "Owen Pike", lastVisitDays: 16, visitsThisMonth: 2, weeklyCheckins: [2, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m9", name: "Jasmine Lee", lastVisitDays: 6, visitsThisMonth: 5, weeklyCheckins: [3, 2, 3, 2], status: "active" },
      { id: "m10", name: "Cole Foster", lastVisitDays: 3, visitsThisMonth: 7, weeklyCheckins: [4, 3, 4, 2], status: "active" },
    ],
    missedCall: {
      title: "Missed call → dispatched service",
      intro: "The call drops while a homeowner is trying to get the AC back online. CloseCove texts in seconds, identifies the issue, and collects the address before dispatch.",
      incomingLead: "Incoming · Ferris HVAC & Air",
      messageIntro: "Auto-text thread",
      capture: { name: "Unknown Caller", phone: "(602) 555-0178", preferredTime: "Emergency cooling issue", source: "Missed-call SMS" },
      script: [
        { delay: 0, phase: "ringing" },
        { delay: 2800, phase: "missed" },
        { delay: 4200, bubble: { id: "1", from: "business", text: "Hi, this is Ferris HVAC & Air. We saw your missed call — is your cooling system blowing warm air right now?" } },
        { delay: 6200, bubble: { id: "2", from: "caller", text: "Yes. It started this morning and the house is getting hot." } },
        { delay: 8800, bubble: { id: "3", from: "business", text: "Thanks. Can you send your service address and whether the unit is making any strange noises?" } },
        { delay: 10800, bubble: { id: "4", from: "caller", text: "1234 N. 7th Ave, Phoenix. It hums, then shuts off." } },
        { delay: 12600, bubble: { id: "5", from: "business", text: "We can dispatch a tech this afternoon. I’m tagging this as a cooling emergency and will send a 2-hour arrival window." } },
        { delay: 14800, bubble: { id: "6", from: "business", text: "✅ Service call created — homeowner details saved for dispatch", status: "done" } },
      ],
    },
    winback: {
      title: "Seasonal service reminder",
      intro: "Homeowners usually ignore maintenance until a failure hits. CloseCove spots stale service dates, sends a quick check-in, and books a tune-up before the next outage.",
      trigger: "90-day gap since last tune-up → reminder with scheduling link",
      highlightedName: "Maya Cross",
      highlightedMessage: "Hi Maya, we noticed it’s been a while since your last tune-up. Want to book a quick AC check before it gets too hot this week?",
      messageFooter: "Replied · booked Thursday maintenance visit · Follow-up sent ✅",
    },
    chat: {
      greeting: "Hi! I'm Apex Home Services AI. I can help collect the job details and get you scheduled.",
      pricingReply: "Here are our service plans:\n• Comfort Care — $79/mo\n• HomeShield Plus — $149/mo (most popular)\n• Commercial Essentials — $249/mo\n\nWant me to help you book a tune-up or a same-day service call?",
      scheduleReply: "This week's service windows:\n• AC Performance Check — Mon / Thu at 8:00 AM (Alex)\n• Furnace Tune-Up — Tue / Fri at 10:00 AM (Renee)\n• Mini-Split Inspection — Wed at 1:30 PM (Drew)\n• Emergency Service — Daily on-call\n\nI can help you book the best time for your home.",
      fallback: "I can help with emergency cooling issues, seasonal maintenance, or booking a service visit. What are you looking for?",
    },
  },
  "pet-care": {
    id: "pet-care",
    name: "Whisker & Wag Grooming",
    tagline: "Clean coats. Calm pets. Happy routines.",
    city: "Denver, CO",
    phone: "(303) 555-0194",
    hours: "8:00 AM – 6:00 PM",
    badge: "Grooming · Boarding · Daycare",
    heroLead: "Professional grooming and care that puts pets at ease.",
    heroBlurb: "From breed-specific grooming to daycare and boarding, we make every visit smooth for both pets and owners.",
    services: ["Breed-specific grooming", "Boarding & daycare", "Bath & brush", "Pawdicure", "Nail trim"],
    pricing: [
      { id: "wash", name: "Fresh & Fluffy", price: 45, period: "/visit", perks: ["Bath + blow dry", "Brush-out", "Nail trim"] },
      { id: "signature", name: "Signature Groom", price: 85, period: "/visit", highlight: true, perks: ["Full haircut", "Breed-specific styling", "Ear cleaning"] },
      { id: "board", name: "Board & Play", price: 55, period: "/night", perks: ["Playtime", "Feeding & meds", "Photo updates"] },
    ],
    classes: [
      { id: "c1", name: "Puppy Bath & Brush", coach: "Lena", day: "Mon / Thu", time: "9:00 AM", spots: "3 open" },
      { id: "c2", name: "De-Shedding Session", coach: "Harper", day: "Tue / Sat", time: "11:00 AM", spots: "Open" },
      { id: "c3", name: "Boarding Intake", coach: "Milo", day: "Wed / Fri", time: "2:00 PM", spots: "2 left" },
      { id: "c4", name: "Luxury Spa Groom", coach: "Jules", day: "Thu", time: "4:00 PM", spots: "Open" },
    ],
    trialSlots: [
      "Tomorrow 9:00 AM — Puppy Bath & Brush",
      "Friday 2:00 PM — Boarding Intake",
      "Saturday 11:00 AM — De-Shedding Session",
    ],
    dashboardTitle: "Whisker & Wag · CloseCove",
    dashboardSummary: "What the owner sees Monday morning. Grooming bookings, boarding leads, and retention follow-ups all live in one schedule.",
    dashboardStats: {
      newLeadsThisWeek: 18,
      primaryMetricLabel: "Appointments",
      primaryMetricValue: 11,
      riskLabel: "Overdue Grooms",
      riskValue: 9,
      winbackLabel: "Check-Ins Sent",
      winbackValue: 6,
    },
    seedLeads: [
      { id: "l1", name: "Sofia Reed", phone: "(303) 555-0121", preferredTime: "Tomorrow 9:00 AM puppy bath", source: "Missed-call SMS", createdAt: "Tue 7:58 AM" },
      { id: "l2", name: "Ben Carter", phone: "(303) 555-0167", preferredTime: "Saturday 11:00 AM de-shedding", source: "Website form", createdAt: "Mon 4:22 PM" },
      { id: "l3", name: "Ari Kolev", phone: "(303) 555-0105", preferredTime: "Wednesday 2:00 PM boarding", source: "Instagram DM", createdAt: "Sun 12:40 PM" },
    ],
    winbackMembers: [
      { id: "m1", name: "Nora Bell", lastVisitDays: 24, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m2", name: "Derek Price", lastVisitDays: 33, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m3", name: "Susan Yu", lastVisitDays: 19, visitsThisMonth: 2, weeklyCheckins: [3, 1, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m4", name: "Marcus Flynn", lastVisitDays: 27, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
      { id: "m5", name: "Leah Mendez", lastVisitDays: 14, visitsThisMonth: 3, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m6", name: "Parker Hall", lastVisitDays: 30, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m7", name: "Chloe Singh", lastVisitDays: 18, visitsThisMonth: 2, weeklyCheckins: [2, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m8", name: "Evan Ross", lastVisitDays: 16, visitsThisMonth: 2, weeklyCheckins: [2, 3, 0, 0], status: "no-response", winbackSent: true },
      { id: "m9", name: "Anya Foster", lastVisitDays: 4, visitsThisMonth: 6, weeklyCheckins: [3, 3, 2, 1], status: "active" },
      { id: "m10", name: "Dillon Moss", lastVisitDays: 2, visitsThisMonth: 8, weeklyCheckins: [4, 3, 3, 2], status: "active" },
    ],
    missedCall: {
      title: "Missed call → grooming appointment",
      intro: "A pet owner calls in a panic with a mud-caked dog and a daycare need before the weekend. CloseCove texts back with breed-appropriate questions and confirms a slot.",
      incomingLead: "Incoming · Whisker & Wag Grooming",
      messageIntro: "Auto-text thread",
      capture: { name: "Unknown Caller", phone: "(303) 555-0108", preferredTime: "Saturday 11:00 AM — de-shedding", source: "Missed-call SMS" },
      script: [
        { delay: 0, phase: "ringing" },
        { delay: 3000, phase: "missed" },
        { delay: 4400, bubble: { id: "1", from: "business", text: "Hi! This is Whisker & Wag Grooming. We missed your call — do you need a bath, grooming, or boarding for your dog?" } },
        { delay: 6300, bubble: { id: "2", from: "caller", text: "We need a full groom for our golden retriever before Saturday." } },
        { delay: 8900, bubble: { id: "3", from: "business", text: "Perfect. Is your dog a male or female, and do you need a de-shedding treatment or a standard trim?" } },
        { delay: 10900, bubble: { id: "4", from: "caller", text: "Male, 3 years old, and he needs a de-shedding treatment." } },
        { delay: 12700, bubble: { id: "5", from: "business", text: "We have a Saturday 11:00 AM slot available. I’ve saved the appointment and we’ll text a reminder the day before." } },
        { delay: 14900, bubble: { id: "6", from: "business", text: "✅ Grooming appointment booked — pet profile saved", status: "done" } },
      ],
    },
    winback: {
      title: "Grooming retention",
      intro: "A dog that’s overdue for a coat service starts to mat. CloseCove sees the gap, sends a gentle reminder, and books a quick fix before things get uncomfortable.",
      trigger: "14+ days since last groom → seasonal check-in + photo reminder",
      highlightedName: "Nora Bell",
      highlightedMessage: "Hi Nora, your pup is due for a coat refresh. We can fit in a de-shedding session before the weekend and keep him comfortable.",
      messageFooter: "Replied · booked Thursday de-shedding · Follow-up sent ✅",
    },
    chat: {
      greeting: "Hi! I'm Paws & Co. Pet Care AI. I can help with grooming, boarding availability, and booking your pet's next visit.",
      pricingReply: "Here are our care packages:\n• Fresh & Fluffy — $45/visit\n• Signature Groom — $85/visit (most popular)\n• Board & Play — $55/night\n\nWant me to help you choose the right service for your pup?",
      scheduleReply: "Our appointment windows:\n• Puppy Bath & Brush — Mon / Thu at 9:00 AM (Lena)\n• De-Shedding Session — Tue / Sat at 11:00 AM (Harper)\n• Boarding Intake — Wed / Fri at 2:00 PM (Milo)\n• Luxury Spa Groom — Thu at 4:00 PM (Jules)\n\nI can book the best slot for your pet.",
      fallback: "I can help with grooming, boarding, de-shedding, or daycare scheduling. What does your pet need?",
    },
  },
  "salon-spa": {
    id: "salon-spa",
    name: "Lumen Salon & Spa",
    tagline: "Feel polished, renewed, and like yourself.",
    city: "Chicago, IL",
    phone: "(312) 555-0169",
    hours: "9:00 AM – 7:00 PM",
    badge: "Haircare · Color · Wellness",
    heroLead: "Hair, color, and self-care experiences designed around your routine.",
    heroBlurb: "Whether you need a quick cut, a color refresh, or a full spa reset, we help you feel your best without the stress.",
    services: ["Precision cuts", "Balayage & color", "Bridal styling", "Facials", "Massage and ritual"],
    pricing: [
      { id: "cut", name: "Fresh Cut", price: 65, period: "/service", perks: ["Consultation", "Style finish", "Dry shampoo add-on"] },
      { id: "color", name: "Color Refresh", price: 140, period: "/service", highlight: true, perks: ["Gloss treatment", "Tone balancing", "Home-care guide"] },
      { id: "ritual", name: "Luxe Ritual", price: 210, period: "/service", perks: ["Facial + massage", "Product finishing", "Extended styling time"] },
    ],
    classes: [
      { id: "c1", name: "Precision Cut", coach: "Ava", day: "Tue / Fri", time: "10:00 AM", spots: "3 open" },
      { id: "c2", name: "Balayage Refresh", coach: "Noah", day: "Wed / Sat", time: "1:00 PM", spots: "Open" },
      { id: "c3", name: "Glow Facial", coach: "Sana", day: "Thu", time: "2:30 PM", spots: "2 left" },
      { id: "c4", name: "Signature Blowout", coach: "Mila", day: "Daily", time: "4:00 PM", spots: "Open" },
    ],
    trialSlots: [
      "Tuesday 10:00 AM — Precision Cut",
      "Wednesday 1:00 PM — Balayage Refresh",
      "Thursday 2:30 PM — Glow Facial",
    ],
    dashboardTitle: "Lumen Salon & Spa · CloseCove",
    dashboardSummary: "What the owner sees Monday morning. Appointments, color touch-ups, and retention reminders are tracked without losing the human touch.",
    dashboardStats: {
      newLeadsThisWeek: 19,
      primaryMetricLabel: "Bookings",
      primaryMetricValue: 13,
      riskLabel: "Color Touch-Ups Due",
      riskValue: 10,
      winbackLabel: "Re-Engagements",
      winbackValue: 7,
    },
    seedLeads: [
      { id: "l1", name: "Janelle Diaz", phone: "(312) 555-0151", preferredTime: "Tue 10:00 AM precision cut", source: "Missed-call SMS", createdAt: "Mon 9:04 AM" },
      { id: "l2", name: "Carla Kim", phone: "(312) 555-0174", preferredTime: "Wed 1:00 PM balayage", source: "Website form", createdAt: "Sun 7:12 PM" },
      { id: "l3", name: "Aisha Orr", phone: "(312) 555-0120", preferredTime: "Thu 2:30 PM facial", source: "Instagram DM", createdAt: "Sat 1:49 PM" },
    ],
    winbackMembers: [
      { id: "m1", name: "Ava Brooks", lastVisitDays: 18, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m2", name: "Kurt Martin", lastVisitDays: 26, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m3", name: "Sonia Patel", lastVisitDays: 17, visitsThisMonth: 2, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m4", name: "Harper Stone", lastVisitDays: 24, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
      { id: "m5", name: "Leah Warner", lastVisitDays: 15, visitsThisMonth: 3, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m6", name: "Theo Green", lastVisitDays: 29, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m7", name: "Mia Wong", lastVisitDays: 19, visitsThisMonth: 2, weeklyCheckins: [2, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m8", name: "Rae Davis", lastVisitDays: 16, visitsThisMonth: 2, weeklyCheckins: [3, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m9", name: "Paige Reed", lastVisitDays: 5, visitsThisMonth: 6, weeklyCheckins: [3, 3, 2, 1], status: "active" },
      { id: "m10", name: "Nico Chang", lastVisitDays: 2, visitsThisMonth: 7, weeklyCheckins: [4, 3, 3, 2], status: "active" },
    ],
    missedCall: {
      title: "Missed call → color consult",
      intro: "A client calls while she is trying to lock in a color refresh before a big event. CloseCove asks the right questions and books a consultation without forcing a long hold.",
      incomingLead: "Incoming · Lumen Salon & Spa",
      messageIntro: "Auto-text thread",
      capture: { name: "Unknown Caller", phone: "(312) 555-0182", preferredTime: "Thursday 2:30 PM — glow facial", source: "Missed-call SMS" },
      script: [
        { delay: 0, phase: "ringing" },
        { delay: 3100, phase: "missed" },
        { delay: 4300, bubble: { id: "1", from: "business", text: "Hi, this is Lumen Salon & Spa. We missed your call — are you looking for a haircut, color refresh, or a facial?" } },
        { delay: 6100, bubble: { id: "2", from: "caller", text: "I need a color refresh before a wedding next weekend." } },
        { delay: 8500, bubble: { id: "3", from: "business", text: "Absolutely. Are you looking for a gloss, dimensional color, or a more dramatic balayage correction?" } },
        { delay: 10900, bubble: { id: "4", from: "caller", text: "A subtle balayage refresh would be perfect." } },
        { delay: 12700, bubble: { id: "5", from: "business", text: "We have a Thursday 2:30 PM slot open with Noah. I’ve locked it in and we’ll send a reminder 24 hours before." } },
        { delay: 14900, bubble: { id: "6", from: "business", text: "✅ Consultation booked — color profile saved", status: "done" } },
      ],
    },
    winback: {
      title: "Color retention",
      intro: "Clients who skip their gloss or toner often fade fast. CloseCove sees the time gap, offers a touch-up, and brightens the next visit before damage or client drift sets in.",
      trigger: "8+ weeks since last service → color care check-in",
      highlightedName: "Ava Brooks",
      highlightedMessage: "Hi Ava, it’s been a little while since your last gloss. Want to book a quick tone refresh before your color starts to fade?",
      messageFooter: "Replied · booked Thursday gloss refresh · Re-engaged ✅",
    },
    chat: {
      greeting: "Hi! I'm Lumen AI. I can help you choose a service, check availability, and book your next appointment.",
      pricingReply: "Here are our signature services:\n• Fresh Cut — $65/service\n• Color Refresh — $140/service (most popular)\n• Luxe Ritual — $210/service\n\nWant me to help you choose the right treatment for your next visit?",
      scheduleReply: "This week's availability:\n• Precision Cut — Tue / Fri at 10:00 AM (Ava)\n• Balayage Refresh — Wed / Sat at 1:00 PM (Noah)\n• Glow Facial — Thu at 2:30 PM (Sana)\n• Signature Blowout — Daily at 4:00 PM (Mila)\n\nI can book a time that matches your schedule.",
      fallback: "I can help with hair services, color touch-ups, facial treatments, or bridal styling. What are you looking for?",
    },
  },
  "professional-services": {
    id: "professional-services",
    name: "Northstar Legal & Advisory",
    tagline: "Clear counsel. Calm guidance.",
    city: "Seattle, WA",
    phone: "(206) 555-0139",
    hours: "8:30 AM – 6:30 PM",
    badge: "Consulting · Contracts · Counsel",
    heroLead: "Practical legal guidance for fast-moving decisions.",
    heroBlurb: "From contract review to estate planning and employment matters, we help clients move forward with clarity and confidence.",
    services: ["Business counsel", "Estate planning", "Employment disputes", "Contract review", "Real estate matters"],
    pricing: [
      { id: "consult", name: "Consultation", price: 175, period: "/session", perks: ["30-minute case review", "Next-step guidance", "Follow-up summary"] },
      { id: "counsel", name: "Business Counsel", price: 650, period: "/month", highlight: true, perks: ["Monthly check-ins", "Priority response", "Document review"] },
      { id: "retainer", name: "Retainer", price: 1200, period: "/month", perks: ["Dedicated counsel", "Ongoing support", "Priority scheduling"] },
    ],
    classes: [
      { id: "c1", name: "Case Intake", coach: "Elise", day: "Mon / Thu", time: "9:30 AM", spots: "2 open" },
      { id: "c2", name: "Contract Review", coach: "Damon", day: "Tue / Fri", time: "11:00 AM", spots: "Open" },
      { id: "c3", name: "Estate Planning", coach: "Ariana", day: "Wed", time: "2:00 PM", spots: "1 left" },
      { id: "c4", name: "Employment Consultation", coach: "Shane", day: "Thu", time: "4:30 PM", spots: "Open" },
    ],
    trialSlots: [
      "Monday 9:30 AM — Case Intake",
      "Wednesday 2:00 PM — Estate Planning",
      "Thursday 4:30 PM — Employment Consultation",
    ],
    dashboardTitle: "Halbrook & Reyes Law · CloseCove",
    dashboardSummary: "What the owner sees Monday morning. Consultations, follow-ups, and case review requests are tracked by urgency and source.",
    dashboardStats: {
      newLeadsThisWeek: 14,
      primaryMetricLabel: "Consultations",
      primaryMetricValue: 8,
      riskLabel: "Unreached Leads",
      riskValue: 7,
      winbackLabel: "Check-Ins Sent",
      winbackValue: 4,
    },
    seedLeads: [
      { id: "l1", name: "Megan Ross", phone: "(206) 555-0172", preferredTime: "Mon 9:30 AM case intake", source: "Missed-call SMS", createdAt: "Mon 8:23 AM" },
      { id: "l2", name: "Daniel Price", phone: "(206) 555-0135", preferredTime: "Wed 2:00 PM estate review", source: "Website inquiry", createdAt: "Sun 6:41 PM" },
      { id: "l3", name: "Jared Wu", phone: "(206) 555-0118", preferredTime: "Thu 4:30 PM employment consult", source: "Referral follow-up", createdAt: "Sat 10:12 AM" },
    ],
    winbackMembers: [
      { id: "m1", name: "Nadia Cole", lastVisitDays: 19, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m2", name: "Peter Hall", lastVisitDays: 30, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m3", name: "Reina Sato", lastVisitDays: 16, visitsThisMonth: 2, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m4", name: "George Shaw", lastVisitDays: 25, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
      { id: "m5", name: "Elena Moss", lastVisitDays: 14, visitsThisMonth: 3, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m6", name: "Darnell Ford", lastVisitDays: 21, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m7", name: "Chris Kim", lastVisitDays: 18, visitsThisMonth: 2, weeklyCheckins: [2, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m8", name: "Talia Roy", lastVisitDays: 15, visitsThisMonth: 2, weeklyCheckins: [2, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m9", name: "Mason Lee", lastVisitDays: 3, visitsThisMonth: 6, weeklyCheckins: [3, 2, 3, 1], status: "active" },
      { id: "m10", name: "Paola Ruiz", lastVisitDays: 1, visitsThisMonth: 8, weeklyCheckins: [4, 3, 2, 4], status: "active" },
    ],
    missedCall: {
      title: "Missed call → case intake",
      intro: "A prospective client calls with urgent concerns after a contract dispute. CloseCove asks for the facts, captures the timeline, and books a callback with the right attorney.",
      incomingLead: "Incoming · Halbrook & Reyes Law",
      messageIntro: "Auto-text thread",
      capture: { name: "Unknown Caller", phone: "(206) 555-0198", preferredTime: "Thursday 4:30 PM — employment consult", source: "Missed-call SMS" },
      script: [
        { delay: 0, phase: "ringing" },
        { delay: 3000, phase: "missed" },
        { delay: 4400, bubble: { id: "1", from: "business", text: "Hi, this is Halbrook & Reyes Law. We missed your call — are you calling about a business, estate, or employment matter?" } },
        { delay: 6200, bubble: { id: "2", from: "caller", text: "Employment issue. I was terminated after reporting harassment." } },
        { delay: 8600, bubble: { id: "3", from: "business", text: "Thank you for sharing that. Can you tell me when the incident happened and whether you have any written communications or documentation?" } },
        { delay: 10800, bubble: { id: "4", from: "caller", text: "It started in March. I have emails and a complaint to HR." } },
        { delay: 12800, bubble: { id: "5", from: "business", text: "I can schedule a callback this Thursday at 4:30 PM. I’ve saved your case notes and will send a confirmation text with the next step." } },
        { delay: 15000, bubble: { id: "6", from: "business", text: "✅ Consultation scheduled — case summary captured", status: "done" } },
      ],
    },
    winback: {
      title: "Client follow-up",
      intro: "Prospects often go quiet after an initial consultation. CloseCove recognizes the silence, sends a calm follow-up, and prompts a next step instead of losing the file.",
      trigger: "14 days since consultation → structured check-in and callback offer",
      highlightedName: "Nadia Cole",
      highlightedMessage: "Hi Nadia, I wanted to check in on your case review from last month. If you’re ready to move forward, I can schedule a follow-up call this week.",
      messageFooter: "Replied · booked Thursday strategy call · Follow-up complete ✅",
    },
    chat: {
      greeting: "Hi! I'm Northstar AI. I can collect a few details about your request and help schedule an initial consultation.",
      pricingReply: "Here are our counsel options:\n• Consultation — $175/session\n• Business Counsel — $650/month (most popular)\n• Retainer — $1,200/month\n\nWant me to help you book a consultation or review a matter?",
      scheduleReply: "Our consultation windows:\n• Case Intake — Mon / Thu at 9:30 AM (Elise)\n• Contract Review — Tue / Fri at 11:00 AM (Damon)\n• Estate Planning — Wed at 2:00 PM (Ariana)\n• Employment Consultation — Thu at 4:30 PM (Shane)\n\nI can help you arrange the right time for your case.",
      fallback: "I can help with case intake, contract review, estate planning, or employment guidance. Tell me what you need help with.",
    },
  },
  other: {
    id: "other",
    name: "CloseCove Custom Workflow",
    tagline: "Reliable service. Honest work. No surprises.",
    city: "Portland, OR",
    phone: "(503) 555-0173",
    hours: "8:00 AM – 6:00 PM",
    badge: "Repairs · Installations · Maintenance",
    heroLead: "Dependable service for homes, rentals, and small businesses.",
    heroBlurb: "From quick repairs to preventative maintenance and install work, we make service feel easy for busy customers.",
    services: ["General repairs", "Installations", "Maintenance plans", "Emergency service", "Seasonal tune-ups"],
    pricing: [
      { id: "quick", name: "Quick Fix", price: 95, period: "/visit", perks: ["Diagnosis", "Basic repair", "Initial setup"] },
      { id: "priority", name: "Priority Care", price: 169, period: "/month", highlight: true, perks: ["Priority dispatch", "Annual tune-ups", "Repair discounts"] },
      { id: "maintenance", name: "Maintenance Plus", price: 260, period: "/month", perks: ["Service plan", "Inspection logic", "Seasonal reminders"] },
    ],
    classes: [
      { id: "c1", name: "Repair Visit", coach: "Jesse", day: "Mon / Thu", time: "9:00 AM", spots: "2 open" },
      { id: "c2", name: "Water Heater Check", coach: "Lola", day: "Tue / Fri", time: "11:30 AM", spots: "Open" },
      { id: "c3", name: "Seasonal Tune-Up", coach: "Sam", day: "Wed", time: "1:00 PM", spots: "3 left" },
      { id: "c4", name: "Install Consultation", coach: "Pia", day: "Sat", time: "10:00 AM", spots: "Open" },
    ],
    trialSlots: [
      "Tomorrow 9:00 AM — Repair Visit",
      "Wednesday 1:00 PM — Seasonal Tune-Up",
      "Saturday 10:00 AM — Install Consultation",
    ],
    dashboardTitle: "Harbor & Pine · CloseCove",
    dashboardSummary: "What the owner sees Monday morning. Service requests, maintenance follow-ups, and booked work orders all stay visible in one pipeline.",
    dashboardStats: {
      newLeadsThisWeek: 16,
      primaryMetricLabel: "Service Requests",
      primaryMetricValue: 10,
      riskLabel: "Maintenance Due",
      riskValue: 8,
      winbackLabel: "Follow-Up Messages",
      winbackValue: 5,
    },
    seedLeads: [
      { id: "l1", name: "Iris Nash", phone: "(503) 555-0126", preferredTime: "Tomorrow 9:00 AM repair visit", source: "Missed-call SMS", createdAt: "Tue 7:35 AM" },
      { id: "l2", name: "Frank Silva", phone: "(503) 555-0188", preferredTime: "Wednesday 1:00 PM tune-up", source: "Website inquiry", createdAt: "Mon 3:28 PM" },
      { id: "l3", name: "Jules Morrow", phone: "(503) 555-0130", preferredTime: "Saturday 10:00 AM install consult", source: "Referral", createdAt: "Sun 11:49 AM" },
    ],
    winbackMembers: [
      { id: "m1", name: "Rena Holt", lastVisitDays: 21, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "re-engaged", winbackSent: true },
      { id: "m2", name: "Bram Fields", lastVisitDays: 29, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m3", name: "Mila Barnes", lastVisitDays: 18, visitsThisMonth: 2, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m4", name: "Charles Lee", lastVisitDays: 24, visitsThisMonth: 1, weeklyCheckins: [2, 1, 0, 0], status: "no-response", winbackSent: true },
      { id: "m5", name: "Tess Rowan", lastVisitDays: 15, visitsThisMonth: 3, weeklyCheckins: [2, 2, 1, 0], status: "re-engaged", winbackSent: true },
      { id: "m6", name: "Grant Moss", lastVisitDays: 27, visitsThisMonth: 0, weeklyCheckins: [1, 0, 0, 0], status: "no-response", winbackSent: true },
      { id: "m7", name: "Carmen Del", lastVisitDays: 17, visitsThisMonth: 2, weeklyCheckins: [2, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m8", name: "Nolan West", lastVisitDays: 15, visitsThisMonth: 2, weeklyCheckins: [3, 2, 0, 0], status: "no-response", winbackSent: true },
      { id: "m9", name: "Vera Bell", lastVisitDays: 6, visitsThisMonth: 5, weeklyCheckins: [3, 3, 2, 2], status: "active" },
      { id: "m10", name: "Dylan Price", lastVisitDays: 3, visitsThisMonth: 7, weeklyCheckins: [4, 3, 4, 2], status: "active" },
    ],
    missedCall: {
      title: "Missed call → service request",
      intro: "A customer calls when a faulty appliance or repair issue becomes urgent. CloseCove asks the right triage questions, captures the service location, and books response time.",
      incomingLead: "Incoming · Harbor & Pine Service Co.",
      messageIntro: "Auto-text thread",
      capture: { name: "Unknown Caller", phone: "(503) 555-0161", preferredTime: "Service visit tomorrow 9:00 AM", source: "Missed-call SMS" },
      script: [
        { delay: 0, phase: "ringing" },
        { delay: 2900, phase: "missed" },
        { delay: 4300, bubble: { id: "1", from: "business", text: "Hi, this is Harbor & Pine. We missed your call. Are you dealing with a repair issue, a maintenance check, or a new install request?" } },
        { delay: 6200, bubble: { id: "2", from: "caller", text: "We need a repair. The water heater is leaking." } },
        { delay: 8400, bubble: { id: "3", from: "business", text: "Thanks. Can you send the address and whether the issue is active right now or just a leak under the unit?" } },
        { delay: 10900, bubble: { id: "4", from: "caller", text: "It’s active. 1847 Emmerson St. Portland." } },
        { delay: 12800, bubble: { id: "5", from: "business", text: "I’ve marked this as urgent and scheduled a same-day technician visit. We’ll send the arrival window and your service notes by text." } },
        { delay: 14900, bubble: { id: "6", from: "business", text: "✅ Service request created — dispatch details saved", status: "done" } },
      ],
    },
    winback: {
      title: "Service retention",
      intro: "Customers often skip seasonal maintenance until a failure becomes expensive. CloseCove catches that drift, sends a quick reminder, and helps book a low-friction tune-up before the next issue.",
      trigger: "Seasonal gap + no response → maintenance reminder",
      highlightedName: "Rena Holt",
      highlightedMessage: "Hi Rena, it’s been a while since your last maintenance check. Want to book a quick tune-up before the next issue pops up?",
      messageFooter: "Replied · booked seasonal tune-up · Follow-up sent ✅",
    },
    chat: {
      greeting: "Hi! I’m your CloseCove AI assistant. I can help answer questions, qualify new inquiries, and guide customers toward the next step.",
      pricingReply: "Here are our service options:\n• Quick Fix — $95/visit\n• Priority Care — $169/month (most popular)\n• Maintenance Plus — $260/month\n\nWant me to help you schedule a repair or a maintenance check?",
      scheduleReply: "Service availability:\n• Repair Visit — Mon / Thu at 9:00 AM (Jesse)\n• Water Heater Check — Tue / Fri at 11:30 AM (Lola)\n• Seasonal Tune-Up — Wed at 1:00 PM (Sam)\n• Install Consultation — Sat at 10:00 AM (Pia)\n\nI can book the right visit for your property.",
      fallback: "I can help with repairs, seasonal maintenance, or new installation consultations. What kind of service do you need?",
    },
  },
};

export const defaultBusinessType: BusinessType = "fitness";

export function getBusinessProfile(type: BusinessType) {
  return businessProfiles[type];
}
