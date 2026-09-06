import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { DemoNav } from "@/components/DemoNav";
import { LeadsProvider } from "@/lib/leads-context";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iron Village Fitness | FitFlow AI Demo",
  description:
    "Sales demo of an AI-powered gym lead response and member retention system for Iron Village Fitness.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ink text-sand">
        <LeadsProvider>
          <DemoNav />
          {children}
        </LeadsProvider>
      </body>
    </html>
  );
}
