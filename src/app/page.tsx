"use client";

import Link from "next/link";
import { ArrowRight, BotMessageSquare, GraduationCap, Play, Vote, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 overflow-hidden relative">

      {/* Subtle Background Elements for a Professional Look */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-50 rounded-full blur-[120px]"></div>
      </div>

      {/* Hero Badge */}
      <div className="inline-flex items-center rounded-full border-2 border-blue-200 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-xs md:text-sm font-bold text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300 mb-8 animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-3 animate-ping"></span>
        SASHAKT BHARAT: AI-POWERED ELECTION GUIDE 2026
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-8xl font-black tracking-tighter max-w-5xl text-center leading-[0.9] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        Empowering <span className="text-blue-700">Voters</span> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-green-600">Smart Technology.</span>
      </h1>

      <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl text-center leading-relaxed mb-10 font-medium">
        Bharat ke loktantra ko samjhein aur apna vote sahi tarike se dein.
        Your digital officer for election procedures, powered by Google Gemini AI.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full justify-center">
        <Link href="/chat" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white rounded-2xl px-10 py-7 text-lg font-bold shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-3">
            <BotMessageSquare className="h-6 w-6" /> Talk to AI Sahayak
          </Button>
        </Link>

        <Link href="/guide" className="w-full sm:w-auto">
          <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-2xl px-8 py-7 text-lg font-bold border-2 border-neutral-200 hover:bg-neutral-50 transition-all flex items-center gap-2">
            Start Learning <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>

        <Link href="/simulator" className="w-full sm:w-auto">
          <Button size="lg" variant="ghost" className="w-full sm:w-auto rounded-2xl px-8 py-7 text-lg font-bold text-green-700 hover:bg-green-50 transition-all flex items-center gap-2">
            <Play className="h-5 w-5 fill-green-700" /> EVM Simulator
          </Button>
        </Link>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-6xl">

        {/* Feature 1: AI */}
        <Link href="/chat" className="group">
          <div className="h-full bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] shadow-sm border-2 border-neutral-100 dark:border-neutral-800 flex flex-col items-center text-center group-hover:border-blue-500 group-hover:shadow-xl group-hover:shadow-blue-50 transition-all duration-300">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-3xl mb-6 group-hover:scale-110 transition-transform">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Instant AI Assistance</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Poochein sawal Hindi ya English mein aur payein sateek sarkari jankari turant.</p>
          </div>
        </Link>

        {/* Feature 2: Guide */}
        <Link href="/guide" className="group">
          <div className="h-full bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] shadow-sm border-2 border-neutral-100 dark:border-neutral-800 flex flex-col items-center text-center group-hover:border-orange-400 group-hover:shadow-xl group-hover:shadow-orange-50 transition-all duration-300">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-3xl mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Voter Guidelines</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Eligibility se lekar Voter ID registration tak, har step ki official digital guide.</p>
          </div>
        </Link>

        {/* Feature 3: Simulator */}
        <Link href="/simulator" className="group">
          <div className="h-full bg-white dark:bg-neutral-900 p-8 rounded-[2.5rem] shadow-sm border-2 border-neutral-100 dark:border-neutral-800 flex flex-col items-center text-center group-hover:border-green-500 group-hover:shadow-xl group-hover:shadow-green-50 transition-all duration-300">
            <div className="p-4 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-3xl mb-6 group-hover:scale-110 transition-transform">
              <Vote size={32} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-3">Realistic Simulator</h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Asli EVM machine par vote dene ka anubhav paayein humare secure simulator par.</p>
          </div>
        </Link>

      </div>

      {/* Footer Tagline */}
      <div className="mt-20 flex flex-col items-center gap-2 opacity-60">
        <div className="w-12 h-1 bg-neutral-300 rounded-full"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
          Aapka Vote, Aapki Taqat | Election Commission Simulation
        </p>
      </div>

    </div>
  );
}