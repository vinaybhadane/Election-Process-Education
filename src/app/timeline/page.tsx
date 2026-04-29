"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, Megaphone, Users, Vote, FileCheck, Trophy,
  ChevronDown, ExternalLink, Clock, AlertTriangle, CheckCircle2, Info
} from "lucide-react";
import Link from "next/link";

// ─── Data ──────────────────────────────────────────────────────────────────

const TIMELINE_STEPS = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Election Announcement",
    title_hi: "चुनाव की घोषणा",
    description:
      "The Election Commission announces the schedule for polls: notification date, last date of nomination, scrutiny, withdrawal, and polling date. The Model Code of Conduct (MCC) comes into force immediately.",
    detail:
      "The MCC prohibits ruling governments from announcing new schemes, using government machinery for campaign, or making transfers of key officials. Violating MCC is a serious election offence.",
    timeframe: "~8–10 weeks before Polling Day",
    tip: "Check ECI press releases at eci.gov.in for official notifications.",
    icon: CalendarDays,
    color: "from-blue-500 to-blue-700",
    border: "border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    dot: "bg-blue-600",
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "Filing of Nominations",
    title_hi: "नामांकन दाखिल करना",
    description:
      "Eligible candidates file their nomination papers with the Returning Officer (RO). They must submit sworn affidavits on criminal cases, assets & liabilities, educational qualifications.",
    detail:
      "Candidates must deposit ₹25,000 (₹12,500 for SC/ST) for State Assembly seats and ₹25,000 for Parliamentary seats. This is forfeited if they get less than 1/6th of total valid votes polled.",
    timeframe: "7–14 days after notification",
    tip: "Scrutiny of nominations follows. Invalid nominations are rejected by the RO.",
    icon: FileCheck,
    color: "from-indigo-500 to-indigo-700",
    border: "border-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    dot: "bg-indigo-600",
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Scrutiny & Withdrawal",
    title_hi: "जांच और नाम वापसी",
    description:
      "The RO scrutinizes all nomination papers. Candidates with valid nominations are listed. A window of 2 days is given to candidates who wish to withdraw their names.",
    detail:
      "After withdrawal, the final list of contesting candidates is published. Party symbols are allotted by ECI. Independent candidates may choose a free symbol from a list.",
    timeframe: "~4–5 weeks before Polling Day",
    tip: "The final symbol list and candidate list is published on ECI's website.",
    icon: Users,
    color: "from-purple-500 to-purple-700",
    border: "border-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/20",
    dot: "bg-purple-600",
  },
  {
    id: 4,
    phase: "Phase 4",
    title: "Election Campaigning",
    title_hi: "चुनाव प्रचार",
    description:
      "Candidates and parties campaign vigorously — rallies, door-to-door visits, print/digital media, and public meetings. All campaigning must follow ECI's expenditure limits and MCC.",
    detail:
      "Campaigning must stop 48 hours before the Polling Day (silence period). No canvassing, no distribution of money/gifts, and no alcohol near booths. Paid news and fake news are offences.",
    timeframe: "3–4 weeks, ends 48 hrs before polling",
    tip: "Report MCC violations on the cVIGIL app with geo-tagged evidence.",
    icon: Megaphone,
    color: "from-orange-500 to-orange-700",
    border: "border-orange-500",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    dot: "bg-orange-500",
  },
  {
    id: 5,
    phase: "Phase 5",
    title: "Polling Day",
    title_hi: "मतदान दिवस",
    description:
      "Voters go to their designated polling booths and cast their votes using Electronic Voting Machines (EVMs). The VVPAT allows voters to verify their vote. Voting is secret and personal.",
    detail:
      "Polling is typically from 7:00 AM to 6:00 PM. Special provisions for PwD, senior citizens, and essential workers. Polling Agents of candidates can be present to observe, but cannot interfere.",
    timeframe: "The designated Polling Date",
    tip: "Carry a valid photo ID. Find your booth at voterportal.eci.gov.in",
    icon: Vote,
    color: "from-red-500 to-red-700",
    border: "border-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
    dot: "bg-red-600",
  },
  {
    id: 6,
    phase: "Phase 6",
    title: "Counting & Results",
    title_hi: "मतगणना और परिणाम",
    description:
      "EVMs are opened at Counting Centres under strict security, in the presence of candidates and their agents. Votes are counted round by round. The Returning Officer declares the winner.",
    detail:
      "The winner needs a plurality (most votes, not majority) to win in Indian elections (First Past The Post system). Results are uploaded in real-time on the ECI results portal during counting.",
    timeframe: "1–3 weeks after Polling Day",
    tip: "Follow live results at results.eci.gov.in",
    icon: Trophy,
    color: "from-green-500 to-green-700",
    border: "border-green-500",
    bg: "bg-green-50 dark:bg-green-950/20",
    dot: "bg-green-600",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimelinePage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-black uppercase tracking-widest text-blue-700 dark:text-blue-400">
          <Clock size={14} /> Election Journey
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-neutral-50 tracking-tighter uppercase leading-none">
          Election<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">Timeline</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium max-w-xl mx-auto">
          Follow the complete journey — from Election Announcement to the Final Result Declaration.
        </p>
      </div>

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 via-orange-400 to-green-400 -translate-x-1/2 rounded-full opacity-50" />

        <div className="space-y-10">
          {TIMELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            const isExpanded = expandedId === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex items-start md:justify-center"
              >
                {/* Node Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-neutral-950 border-4 border-neutral-100 dark:border-neutral-900 shadow-lg flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}>
                    <Icon size={16} />
                  </div>
                </div>

                {/* Card */}
                <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? "md:pr-16 md:mr-auto" : "md:pl-16 md:ml-auto"}`}>
                  <div
                    className={`bg-white dark:bg-neutral-900 rounded-3xl border-2 ${step.border} overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
                    onClick={() => setExpandedId(isExpanded ? null : step.id)}
                  >
                    {/* Card Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-2 bg-gradient-to-r ${step.color}`}>
                            {step.phase}
                          </div>
                          <h3 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">{step.title}</h3>
                          <p className="text-xs text-neutral-400 font-medium mt-0.5">{step.title_hi}</p>
                        </div>
                        <ChevronDown
                          size={20}
                          className={`text-neutral-400 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mt-3">{step.description}</p>

                      {/* Timeframe badge */}
                      <div className="flex items-center gap-2 mt-3">
                        <Clock size={12} className="text-neutral-400" />
                        <span className="text-[11px] font-bold text-neutral-500">{step.timeframe}</span>
                      </div>
                    </div>

                    {/* Expandable Detail */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`px-5 pb-5 space-y-3 border-t ${step.border} ${step.bg}`}
                      >
                        <div className="pt-4 space-y-3">
                          <div className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                            <Info size={15} className="shrink-0 mt-0.5 text-blue-500" />
                            <p className="leading-relaxed">{step.detail}</p>
                          </div>
                          <div className="flex items-start gap-2 text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2 text-amber-700 dark:text-amber-400">
                            <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                            <span>{step.tip}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <div className="mt-20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-black uppercase tracking-widest text-sm">
          <CheckCircle2 size={18} /> Now you understand the complete election process!
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/simulator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-green-100 dark:shadow-none"
          >
            Try EVM Simulator →
          </Link>
          <Link
            href="/guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-100 dark:shadow-none"
          >
            Read Voter Guide →
          </Link>
          <a
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl font-bold text-sm text-neutral-700 dark:text-neutral-300 hover:border-orange-400 transition-all"
          >
            Register to Vote <ExternalLink size={14} />
          </a>
        </div>
        <p className="text-xs text-neutral-400 font-bold uppercase tracking-[0.2em]">
          🇮🇳 Aapka Vote, Aapki Taqat | Election Commission Simulation
        </p>
      </div>

    </div>
  );
}
