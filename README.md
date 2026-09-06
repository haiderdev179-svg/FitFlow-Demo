# FitFlow AI — Iron Village Fitness demo

Sales demo of an AI lead-response and member-retention product for independent gyms. Mocked data only. No Twilio, calendar APIs, auth, or database.

## Pitch order (~3 minutes)

1. **Gym site** `/` — open the orange chat widget, ask pricing / classes, then book a trial.
2. **Missed call** `/demo/missed-call` — let the sequence play; hit **Replay Demo** if needed.
3. **Win-back** `/demo/winback` — at-risk members, day-14 SMS, re-engaged vs no response.
4. **Dashboard** `/dashboard` — owner stats; the chat trial appears in **New Leads**.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

```bash
npx vercel
```

Or import this folder in the Vercel dashboard. No env vars required for the canned demo.
