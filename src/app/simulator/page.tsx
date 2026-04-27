"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CANDIDATES = [
  { id: 1, name: "Arjun Singh", party: "Democratic Alliance", symbol: "🌟" },
  { id: 2, name: "Priya Sharma", party: "Progressive Front", symbol: "🕊️" },
  { id: 3, name: "Vikram Reddy", party: "United Citizens", symbol: "⚖️" },
  { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌" },
];

export default function SimulatorPage() {
  const [votedId, setVotedId] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVote = (id: number) => {
    if (isProcessing) return;

    setVotedId(id);
    setIsProcessing(true);

    // Simulated "Beep" sound delay like real EVM
    setTimeout(() => {
      setHasVoted(true);
      setIsProcessing(false);
    }, 1500);
  };

  if (hasVoted) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center flex flex-col items-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-neutral-800">मतदान सफल! / Vote Cast Successfully!</h1>
        <p className="text-xl text-neutral-600 mb-8 max-w-lg">
          आपका मत सुरक्षित रूप से दर्ज कर लिया गया है।
        </p>
        <Button onClick={() => { setHasVoted(false); setVotedId(null); }} variant="outline" className="border-2 border-neutral-400">
          Restart Simulator
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-neutral-800 uppercase tracking-tighter border-b-4 border-neutral-800 inline-block pb-1 mb-4">
          भारत निर्वाचन आयोग / Election Commission of India
        </h1>
        <p className="text-neutral-500 font-medium">Electronic Voting Machine (Balloting Unit)</p>
      </div>

      {/* Main EVM Body */}
      <Card className="bg-[#e5e1d8] border-[12px] border-[#c5c1b8] rounded-none shadow-2xl overflow-hidden">

        {/* Header Section of EVM */}
        <div className="bg-[#d5d1c8] p-4 border-b-4 border-[#b5b1a8] flex justify-between items-center">
          <div className="space-y-1">
            <div className="w-12 h-2 bg-neutral-400 rounded-full"></div>
            <div className="w-16 h-2 bg-neutral-400 rounded-full"></div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className={`w-6 h-6 rounded-full border-2 border-neutral-600 mb-1 transition-colors duration-300 ${isProcessing ? 'bg-red-600 shadow-[0_0_10px_red]' : 'bg-red-900'}`}></div>
              <span className="text-[10px] font-bold text-neutral-600">BUSY</span>
            </div>
            <div className="text-center">
              <div className={`w-6 h-6 rounded-full border-2 border-neutral-600 mb-1 transition-colors duration-300 ${!isProcessing ? 'bg-green-600 shadow-[0_0_10px_green]' : 'bg-green-900'}`}></div>
              <span className="text-[10px] font-bold text-neutral-600">READY</span>
            </div>
          </div>
        </div>

        {/* Ballot Paper Area */}
        <div className="p-2 bg-[#f0ede5]">
          <div className="border-2 border-neutral-400 bg-white">
            {CANDIDATES.map((candidate, index) => (
              <div key={candidate.id} className="grid grid-cols-12 items-center border-b-2 border-neutral-300 min-h-[80px]">
                {/* Serial Number */}
                <div className="col-span-1 text-center font-bold text-xl border-r-2 border-neutral-300 h-full flex items-center justify-center bg-neutral-50">
                  {index + 1}
                </div>

                {/* Candidate Details */}
                <div className="col-span-6 px-4 py-2 border-r-2 border-neutral-300 h-full flex flex-col justify-center">
                  <p className="font-black text-lg leading-tight uppercase">{candidate.name}</p>
                  <p className="text-xs text-neutral-500 font-bold">{candidate.party}</p>
                </div>

                {/* Symbol */}
                <div className="col-span-2 text-center text-4xl border-r-2 border-neutral-300 h-full flex items-center justify-center">
                  {candidate.symbol}
                </div>

                {/* Light & Button Section */}
                <div className="col-span-3 flex items-center justify-around px-2 h-full bg-neutral-50/50">
                  {/* Indicator Light */}
                  <div className={`w-4 h-4 rounded-full border border-neutral-400 transition-colors duration-200 
                    ${votedId === candidate.id ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-neutral-200'}`}>
                  </div>

                  {/* The Famous Blue Button */}
                  <button
                    disabled={isProcessing}
                    onClick={() => handleVote(candidate.id)}
                    className="w-16 h-10 bg-[#0056b3] active:bg-[#003d80] rounded-sm border-b-4 border-[#002d5e] active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center shadow-md disabled:opacity-50"
                  >
                    <div className="w-10 h-1 bg-white/20 rounded-full"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-500 italic">
        <ShieldAlert size={16} />
        <span>For educational simulation purposes only.</span>
      </div>
    </div>
  );
}