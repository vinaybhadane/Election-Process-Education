"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, BotMessageSquare, GraduationCap, Play, Vote,
  ShieldCheck, Zap, Clock, Users, CheckCircle2, ExternalLink,
  Landmark, Star, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: "96.8 Cr+", label: "Registered Voters", icon: Users },
  { value: "10.5 Lakh+", label: "Polling Stations", icon: Landmark },
  { value: "3", label: "Languages Supported", icon: Star },
  { value: "1950", label: "Voter Helpline", icon: Phone },
];

const FEATURES = [
  {
    href: "/chat",
    icon: Zap,
    iconBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    hoverBorder: "group-hover:border-blue-500 group-hover:shadow-blue-50",
    badge: "AI Powered",
    badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
    title: "Instant AI Assistance",
    desc: "Poochein sawal Hindi ya English mein — voter registration, EVM, eligibility, polling booth — sab kuch turant.",
  },
  {
    href: "/guide",
    icon: ShieldCheck,
    iconBg: "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400",
    hoverBorder: "group-hover:border-orange-400 group-hover:shadow-orange-50",
    badge: "Official Guide",
    badgeBg: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400",
    title: "Voter Guidelines",
    desc: "Eligibility se lekar Voter ID registration, valid documents, booth process, aur edge cases — ek jagah sab.",
  },
  {
    href: "/timeline",
    icon: Clock,
    iconBg: "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400",
    hoverBorder: "group-hover:border-purple-500 group-hover:shadow-purple-50",
    badge: "Interactive",
    badgeBg: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
    title: "Election Timeline",
    desc: "Announcement se lekar Counting tak — har phase ko animated, interactive timeline ke zariye samjhein.",
  },
  {
    href: "/simulator",
    icon: Vote,
    iconBg: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400",
    hoverBorder: "group-hover:border-green-500 group-hover:shadow-green-50",
    badge: "Practice Mode",
    badgeBg: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400",
    title: "EVM Simulator",
    desc: "Asli EVM machine par vote dene ka anubhav + VVPAT verification — safe, educational simulator.",
  },
];

const GUIDED_STEPS = [
  { step: 1, label: "Check Eligibility", href: "/guide#eligibility" },
  { step: 2, label: "Register as Voter", href: "/guide#registration" },
  { step: 3, label: "Verify Voter Status", href: "/guide#registration" },
  { step: 4, label: "Find Polling Booth", href: "/chat" },
  { step: 5, label: "Cast Your Vote", href: "/simulator" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-[90vh] py-12 px-4 overflow-hidden relative">

      {/* ── Background ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-blue-100/60 dark:bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-orange-100/60 dark:bg-orange-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-green-100/40 dark:bg-green-900/10 rounded-full blur-[120px]" />
      </div>

      {/* ── Hero Badge ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center rounded-full border-2 border-blue-200 dark:border-blue-900 bg-white/60 dark:bg-blue-950/30 backdrop-blur-sm px-5 py-2 text-xs md:text-sm font-black text-blue-800 dark:text-blue-300 mb-8 shadow-sm"
      >
        <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-3 animate-ping" />
        SASHAKT BHARAT: AI-POWERED ELECTION GUIDE 2026
      </motion.div>

      {/* ── Main Heading ─────────────────────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-5xl md:text-8xl font-black tracking-tighter max-w-5xl text-center leading-[0.88] mb-6"
      >
        Empowering{" "}
        <span className="text-blue-700 dark:text-blue-400">Voters</span>{" "}
        with{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-green-600">
          Smart Technology.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl text-center leading-relaxed mb-10 font-medium"
      >
        Bharat ke loktantra ko samjhein aur apna vote sahi tarike se dein.
        <br />
        Your official AI guide for the complete election process — powered by Google Gemini.
      </motion.p>

      {/* ── CTA Buttons ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
      >
        <Link href="/chat" className="w-full sm:w-auto">
          <Button
            id="cta-ai-sahayak"
            size="lg"
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white rounded-2xl px-10 py-7 text-lg font-bold shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-3"
          >
            <BotMessageSquare className="h-6 w-6" /> Talk to AI Sahayak
          </Button>
        </Link>
        <Link href="/guide" className="w-full sm:w-auto">
          <Button
            id="cta-start-learning"
            size="lg"
            variant="outline"
            className="w-full sm:w-auto rounded-2xl px-8 py-7 text-lg font-bold border-2 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all flex items-center gap-2"
          >
            Read Voter Guide <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <Link href="/simulator" className="w-full sm:w-auto">
          <Button
            id="cta-evm-simulator"
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto rounded-2xl px-8 py-7 text-lg font-bold text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 transition-all flex items-center gap-2"
          >
            <Play className="h-5 w-5 fill-green-700 dark:fill-green-400" /> EVM Simulator
          </Button>
        </Link>
      </motion.div>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-4xl mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 text-center shadow-sm"
            >
              <div className="flex justify-center mb-2">
                <Icon size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-black text-neutral-900 dark:text-neutral-50 tracking-tighter">{stat.value}</p>
              <p className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mt-1">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* ── Guided Journey Flow ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mt-20"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-neutral-900 dark:text-neutral-50">
            Your Voter Journey
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium mt-2">
            5 steps to exercise your democratic right
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-0">
          {GUIDED_STEPS.map((step, i) => (
            <div key={step.step} className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
              <Link
                href={step.href}
                className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all text-center min-w-[110px]"
              >
                <div className="w-12 h-12 rounded-full bg-blue-700 text-white flex items-center justify-center font-black text-lg shadow-lg shadow-blue-200 dark:shadow-none group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300 leading-tight">{step.label}</p>
              </Link>
              {i < GUIDED_STEPS.length - 1 && (
                <ArrowRight size={20} className="text-neutral-300 dark:text-neutral-700 rotate-90 sm:rotate-0 my-1 sm:my-0 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Feature Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20 w-full max-w-6xl">
        {FEATURES.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={feat.href} className="group h-full block">
                <div className={`h-full bg-white dark:bg-neutral-900 p-7 rounded-[2.5rem] shadow-sm border-2 border-neutral-100 dark:border-neutral-800 flex flex-col items-center text-center ${feat.hoverBorder} hover:shadow-xl transition-all duration-300`}>
                  <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 ${feat.badgeBg}`}>
                    {feat.badge}
                  </div>
                  <div className={`p-4 ${feat.iconBg} rounded-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={30} />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight mb-3 text-neutral-900 dark:text-neutral-50">{feat.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs font-medium leading-relaxed flex-1">{feat.desc}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs font-bold text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* ── Trust & Official Links ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mt-20 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950/20 dark:to-orange-950/20 border border-blue-100 dark:border-blue-900 rounded-3xl p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <CheckCircle2 size={20} className="text-green-600" />
              <p className="font-black text-neutral-900 dark:text-neutral-50 uppercase tracking-tight">Official Sources</p>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              This assistant provides <strong>simulation & general guidance</strong>. For official registrations and verified election information, always use ECI's official portals.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-bold text-neutral-700 dark:text-neutral-300 hover:border-blue-400 transition-all"
            >
              voters.eci.gov.in <ExternalLink size={13} />
            </a>
            <a
              href="tel:1950"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 rounded-xl text-sm font-bold text-white hover:bg-blue-800 transition-all"
            >
              <Phone size={14} /> Helpline: 1950
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── Footer Tagline ─────────────────────────────────────────────────── */}
      <div className="mt-20 flex flex-col items-center gap-3 opacity-60">
        <div className="w-12 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
          🇮🇳 Aapka Vote, Aapki Taqat | Election Commission Simulation | Jai Hind
        </p>
      </div>

    </div>
  );
}