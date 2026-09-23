import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { DemoNav } from "@/components/DemoNav";
import { BusinessProvider } from "@/lib/business-context";
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
  title: "CloseCove | AI Sales Demo",
  description:
    "Multi-industry AI sales demo for business lead response, retention, and monitoring across service-focused companies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-sand">
        <BusinessProvider>
          <LeadsProvider>
            <DemoNav />
            {children}
          </LeadsProvider>
        </BusinessProvider>
      </body>
    </html>
  );
}
