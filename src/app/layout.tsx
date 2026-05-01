import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Voter Sahayak — AI-Powered Election Assistant India",
    template: "%s | Voter Sahayak",
  },
  description:
    "India's official AI-powered Election Process Assistant — voter registration, EVM simulator, election timeline, and guided voter journey. Powered by Google Gemini.",
  keywords: [
    "voter registration india",
    "election process india",
    "EVM simulator",
    "voter ID",
    "election commission india",
    "how to vote india",
    "polling booth",
    "VVPAT",
    "Form 6",
    "nirvachan sahayak",
  ],
  authors: [{ name: "Election Commission of India Digital Helpdesk" }],
  openGraph: {
    title: "Voter Sahayak — AI Election Assistant",
    description: "Guided election process, voter registration, and EVM simulator for every Indian citizen.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50`}
      >
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
