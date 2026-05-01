import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Election Timeline — Announcement to Results",
  description: "Follow the complete Indian election journey from announcement to result declaration with our interactive animated timeline.",
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
