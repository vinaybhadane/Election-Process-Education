import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voter Guide — Matdaata Margdarshika",
  description: "Complete voter eligibility, registration forms, documents, polling process and FAQs for Indian elections.",
};

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
