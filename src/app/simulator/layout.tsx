import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EVM Simulator — Practice Voting",
  description: "Safely practice voting on a realistic EVM machine with VVPAT verification. Educational simulation by Voter Sahayak.",
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
