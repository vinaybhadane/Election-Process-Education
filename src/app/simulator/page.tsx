"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, ShieldAlert, Info, ArrowRight, Volume2, RotateCcw, ChevronRight, BookOpen, Timer, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ─── Data ──────────────────────────────────────────────────────────────────

const CANDIDATES = [
  { id: 1, name: "Arjun Singh", party: "Democratic Alliance", symbol: "🌟", ballotSymbol: "★" },
  { id: 2, name: "Priya Sharma", party: "Progressive Front", symbol: "🕊️", ballotSymbol: "✿" },
  { id: 3, name: "Vikram Reddy", party: "United Citizens", symbol: "⚖️", ballotSymbol: "♦" },
  { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌", ballotSymbol: "✗" },
];

type Phase = "idle" | "selected" | "beeping" | "vvpat" | "voted";

const PHASE_INSTRUCTIONS: Record<Phase, string> = {
  idle: "🗳️ Press the blue button next to your chosen candidate to cast your vote.",
  selected: "⚡ Button pressed! The Balloting Unit is recording your choice...",
  beeping: "🔔 BEEP! Vote registered. Check the VVPAT slip on the right side of the machine.",
  vvpat: "👀 The VVPAT paper slip shows your candidate's name & symbol for 7 seconds. Verify it!",
  voted: "✅ Your vote has been securely cast. Thank you for participating in democracy!",
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

function EVMHeader({ isProcessing }: { isProcessing: boolean }) {
  return (
    <div className="bg-[#c8c4b8] border-b-4 border-[#a8a49a] px-5 py-3 flex items-center justify-between">
      <div className="space-y-1">
        <div className="w-14 h-2 bg-[#888580] rounded-full" />
        <div className="w-20 h-1.5 bg-[#888580] rounded-full" />
        <div className="w-10 h-1.5 bg-[#888580] rounded-full" />
      </div>
      <div className="text-center">
        <p className="text-[10px] font-black text-[#555] uppercase tracking-widest">Balloting Unit</p>
        <p className="text-[10px] font-bold text-[#777] uppercase">ECI — BU-2026</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-1.5">
          <div className={`w-5 h-5 rounded-full border-2 border-[#777] transition-all duration-300 ${isProcessing ? "bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.8)]" : "bg-red-950"}`} />
          <span className="text-[9px] font-black text-[#666] uppercase">BUSY</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className={`w-5 h-5 rounded-full border-2 border-[#777] transition-all duration-300 ${!isProcessing ? "bg-green-600 shadow-[0_0_12px_rgba(22,163,74,0.8)]" : "bg-green-950"}`} />
          <span className="text-[9px] font-black text-[#666] uppercase">READY</span>
        </div>
      </div>
    </div>
  );
}

function VVPATSlip({ candidate, visible, onDone }: { candidate: typeof CANDIDATES[0] | null; visible: boolean; onDone: () => void }) {
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (visible) {
      setProgress(100);
      const start = Date.now();
      const duration = 7000;
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const pct = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(pct);
        if (pct <= 0) {
          clearInterval(timerRef.current!);
          onDone();
        }
      }, 50);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [visible, onDone]);

  if (!visible || !candidate) return null;

  return (
    <div className="animate-in fade-in zoom-in duration-500 absolute -right-4 top-12 z-20">
      <div className="bg-white border-2 border-neutral-300 rounded-lg shadow-2xl w-44 overflow-hidden">
        {/* VVPAT Header */}
        <div className="bg-neutral-800 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 text-center">
          VVPAT Receipt
        </div>
        {/* Slip content */}
        <div className="px-4 py-4 flex flex-col items-center gap-3 text-center">
          <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Your Vote</div>
          <div className="text-4xl">{candidate.symbol}</div>
          <div>
            <p className="font-black text-sm text-neutral-900 uppercase tracking-tight">{candidate.name}</p>
            <p className="text-[10px] text-neutral-500">{candidate.party}</p>
          </div>
          <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-none rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[9px] text-neutral-500 font-bold">
            Visible for 7 seconds
          </div>
        </div>
        {/* Printer line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>
      {/* Paper tail */}
      <div className="w-32 mx-auto h-6 bg-white border-x-2 border-b-2 border-neutral-300 rounded-b-lg flex items-center justify-center">
        <div className="w-24 h-0.5 bg-neutral-200 rounded" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SimulatorPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeLight, setActiveLight] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start timer when voting begins
  useEffect(() => {
    if (phase === "selected") {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    if (phase === "voted" || phase === "idle") {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const selectedCandidate = CANDIDATES.find((c) => c.id === selectedId) || null;
  const isProcessing = phase === "selected" || phase === "beeping" || phase === "vvpat";

  const handleVote = (id: number) => {
    if (isProcessing || phase === "voted") return;
    setSelectedId(id);
    setActiveLight(id);
    setPhase("selected");
    setTimeout(() => setPhase("beeping"), 800);
    setTimeout(() => setPhase("vvpat"), 1500);
  };

  const handleVVPATDone = () => { setPhase("voted"); setAttempts((a) => a + 1); setActiveLight(null); };
  const handleReset = () => { setPhase("idle"); setSelectedId(null); setActiveLight(null); setElapsed(0); };

  if (phase === "voted") {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
        <div className="relative">
          <div className="w-32 h-32 bg-green-100 dark:bg-green-950/30 text-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-100">
            <CheckCircle2 size={64} />
          </div>
          <span className="absolute -top-2 -right-2 text-4xl animate-bounce">🇮🇳</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50">मतदान सफल!</h1>
          <p className="text-xl font-bold text-green-700 dark:text-green-400">Vote Cast Successfully!</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">आपका मत सुरक्षित रूप से दर्ज कर लिया गया है।</p>

          {/* Stats Row */}
          <div className="flex gap-4 justify-center flex-wrap mt-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl text-sm font-bold text-blue-700 dark:text-blue-400">
              <Timer size={16} /> {elapsed}s voting time
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl text-sm font-bold text-purple-700 dark:text-purple-400">
              <Trophy size={16} /> Attempt #{attempts}
            </div>
          </div>

          {selectedCandidate && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-2xl mt-2">
              <span className="text-3xl">{selectedCandidate.symbol}</span>
              <div className="text-left">
                <p className="font-black text-green-900 dark:text-green-300">{selectedCandidate.name}</p>
                <p className="text-xs text-green-700 dark:text-green-500">{selectedCandidate.party}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl px-6 py-4 text-sm text-blue-800 dark:text-blue-400 max-w-md text-left">
          <p className="font-bold mb-2">What happens next in a real election:</p>
          <ul className="space-y-1 text-xs leading-relaxed">
            <li>1️⃣ The EVM is sealed under security by the Presiding Officer.</li>
            <li>2️⃣ EVMs are stored in a secure strong-room until counting day.</li>
            <li>3️⃣ On counting day, EVMs are opened in front of candidates & agents.</li>
            <li>4️⃣ Every vote is tallied and the Returning Officer declares the result.</li>
            <li>5️⃣ Live results are updated on results.eci.gov.in during counting.</li>
          </ul>
        </div>

        <div className="flex gap-4 flex-wrap justify-center">
          <Button id="simulator-try-again" onClick={handleReset} variant="outline" className="border-2 border-neutral-300 rounded-2xl px-6 py-5 font-bold gap-2">
            <RotateCcw size={18} /> Try Again
          </Button>
          <Link href="/guide">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl px-6 py-5 font-bold gap-2">
              <BookOpen size={18} /> Read Full Guide
            </Button>
          </Link>
          <Link href="/chat">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 py-5 font-bold gap-2">
              Ask AI Sahayak <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">
          🇮🇳 Aapka Vote, Aapki Taqat | Educational Simulation Only
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-full text-xs font-black uppercase tracking-widest text-green-700 dark:text-green-400">
          🎓 Educational Simulator
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-neutral-50 uppercase">
          EVM Simulator
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium">
          Experience the actual voting process safely. Practice before Election Day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── EVM Machine ────────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {/* Official Header above EVM */}
          <div className="text-center mb-3">
            <p className="text-sm font-black text-neutral-700 dark:text-neutral-300 uppercase tracking-wider border-b-2 border-neutral-700 dark:border-neutral-300 inline-block pb-1">
              भारत निर्वाचन आयोग / Election Commission of India
            </p>
            <p className="text-xs text-neutral-500 font-medium mt-1">Electronic Voting Machine — Balloting Unit</p>
          </div>

          {/* EVM Body */}
          <div className="relative">
            <div className="bg-[#ddd9d0] border-[10px] border-[#bbb7ae] rounded-lg shadow-2xl overflow-hidden">
              <EVMHeader isProcessing={isProcessing} />

              {/* Ballot Area */}
              <div className="p-2 bg-[#ebe8e0]">
                <div className="border-2 border-neutral-400 bg-white">
                  {CANDIDATES.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className={`grid items-center border-b-2 border-neutral-300 last:border-b-0 min-h-[72px] transition-all duration-200 ${
                        activeLight === candidate.id ? "bg-blue-50" : "bg-white"
                      }`}
                      style={{ gridTemplateColumns: "40px 1fr 70px 80px 100px" }}
                    >
                      {/* Serial */}
                      <div className="text-center font-bold text-lg border-r-2 border-neutral-300 h-full flex items-center justify-center bg-neutral-50 text-neutral-700">
                        {index + 1}
                      </div>

                      {/* Candidate */}
                      <div className="px-4 py-2 border-r-2 border-neutral-300 h-full flex flex-col justify-center">
                        <p className="font-black text-base leading-tight uppercase text-neutral-900 tracking-tight">{candidate.name}</p>
                        <p className="text-[11px] text-neutral-500 font-bold mt-0.5">{candidate.party}</p>
                      </div>

                      {/* Ballot Symbol text */}
                      <div className="text-center text-3xl font-black border-r-2 border-neutral-300 h-full flex items-center justify-center text-neutral-400">
                        {candidate.ballotSymbol}
                      </div>

                      {/* Emoji Symbol */}
                      <div className="text-center text-3xl border-r-2 border-neutral-300 h-full flex items-center justify-center">
                        {candidate.symbol}
                      </div>

                      {/* Light + Button */}
                      <div className="flex items-center justify-around px-3 h-full bg-neutral-50/50">
                        {/* Indicator Light */}
                        <div
                          className={`w-4 h-4 rounded-full border border-neutral-400 transition-all duration-200 ${
                            activeLight === candidate.id
                              ? "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.9)]"
                              : "bg-neutral-200"
                          }`}
                        />
                        {/* Blue Vote Button */}
                        <button
                          id={`vote-btn-${candidate.id}`}
                          disabled={isProcessing}
                          onClick={() => handleVote(candidate.id)}
                          aria-label={`Vote for ${candidate.name}`}
                          className="w-16 h-11 bg-[#0056b3] hover:bg-[#0066cc] active:bg-[#003d80] rounded-sm border-b-4 border-[#002d5e] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <div className="w-10 h-1 bg-white/30 rounded-full" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom strip */}
              <div className="bg-[#c8c4b8] border-t-4 border-[#a8a49a] px-4 py-2 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="w-8 h-1.5 bg-[#888] rounded-full" />
                  <div className="w-14 h-1.5 bg-[#888] rounded-full" />
                </div>
                <p className="text-[9px] font-black text-[#666] uppercase tracking-widest">Bharat Electronics Ltd.</p>
              </div>
            </div>

            {/* VVPAT Slip */}
            <VVPATSlip
              candidate={selectedCandidate}
              visible={phase === "vvpat"}
              onDone={handleVVPATDone}
            />
          </div>
        </div>

        {/* ── Right Panel: Instructions + Status ─────────────────────────── */}
        <div className="space-y-5">

          {/* Status Card */}
          <div className={`p-5 rounded-3xl border-2 transition-all duration-500 ${
            phase === "idle" ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" :
            phase === "selected" || phase === "beeping" ? "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700" :
            phase === "vvpat" ? "bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700" :
            "bg-green-100 border-green-400"
          }`}>
            <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2">Current Status</p>
            <p className="text-sm font-bold leading-relaxed text-neutral-800 dark:text-neutral-200">
              {PHASE_INSTRUCTIONS[phase]}
            </p>
            {phase === "beeping" && (
              <div className="mt-3 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Volume2 size={16} className="animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest">BEEP!</span>
              </div>
            )}
          </div>

          {/* Step Guide */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-500">How This Works</p>
            {[
              { label: "Press the blue button", active: phase === "idle" },
              { label: "Light turns ON + Beep sounds", active: phase === "selected" || phase === "beeping" },
              { label: "VVPAT slip appears (7 secs)", active: phase === "vvpat" },
              { label: "Vote recorded securely", active: false },
            ].map((s, i) => (
              <div key={i} className={`flex items-center gap-3 text-xs font-medium transition-all ${s.active ? "text-blue-700 dark:text-blue-400 font-bold" : "text-neutral-500"}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${s.active ? "bg-blue-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"}`}>
                  {i + 1}
                </div>
                {s.label}
                {s.active && <ChevronRight size={12} className="ml-auto" />}
              </div>
            ))}
          </div>

          {/* VVPAT Info */}
          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5">
            <p className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">What is VVPAT?</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong>Voter Verifiable Paper Audit Trail (VVPAT)</strong> is a printer attached to the EVM. When you vote, it prints a paper slip showing your candidate's name and symbol — visible through a glass window for 7 seconds before auto-dropping into a sealed box.
            </p>
          </div>

          {/* Reset */}
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 font-bold gap-2 hover:border-red-300 hover:text-red-600"
            disabled={phase === "idle"}
          >
            <RotateCcw size={16} /> Reset Simulator
          </Button>
        </div>
      </div>

      {/* ── Disclaimer ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-medium pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <ShieldAlert size={16} />
        <span>For educational simulation only. Candidates and party names are fictional. No real votes are cast.</span>
      </div>

    </div>
  );
}