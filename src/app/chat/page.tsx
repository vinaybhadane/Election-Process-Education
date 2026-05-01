"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Bot, User, Loader2, Trash2, Landmark, Languages,
  ChevronDown, BookOpen, Zap, Shield, ArrowRight,
  RefreshCw, AlertCircle, CheckCircle2, Copy, Check,
  MapPin, CalendarDays, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  mode?: Mode;
}

type Mode = "beginner" | "standard" | "expert";

// ─── Constants ────────────────────────────────────────────────────────────────

const MODE_CONFIG: Record<Mode, { label: string; icon: React.ReactNode; desc: string; bg: string; ring: string }> = {
  beginner: {
    label: "Beginner",
    icon: <BookOpen size={14} />,
    desc: "Simple language, step-by-step",
    bg: "bg-green-50 border-green-300 text-green-800 dark:bg-green-950/30 dark:border-green-700 dark:text-green-300",
    ring: "ring-green-400",
  },
  standard: {
    label: "Standard",
    icon: <Zap size={14} />,
    desc: "Balanced, clear guidance",
    bg: "bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-950/30 dark:border-blue-700 dark:text-blue-300",
    ring: "ring-blue-400",
  },
  expert: {
    label: "Expert",
    icon: <Shield size={14} />,
    desc: "Legal refs, official rules",
    bg: "bg-purple-50 border-purple-300 text-purple-800 dark:bg-purple-950/30 dark:border-purple-700 dark:text-purple-300",
    ring: "ring-purple-400",
  },
};

const QUICK_SUGGESTIONS = [
  { label: "🗳️ First-Time Voter", query: "I am voting for the very first time. Please guide me step by step from eligibility to casting my vote." },
  { label: "📋 Voter Registration", query: "Voter ID card kaise banayein? Form 6 kya hota hai? Step by step batayein." },
  { label: "📍 Find Polling Booth", query: "Apna polling booth kaise dhundein? Mujhe process batayein." },
  { label: "🆔 Lost Voter ID", query: "Maine apna Voter ID kho diya hai. Ab main voting ke liye kya document use kar sakta hoon?" },
  { label: "🏙️ Moved to New City", query: "Main ek naye sheher mein shift ho gaya hoon. Voter list mein apna address kaise update karein?" },
  { label: "♿ PwD Facilities", query: "Main differently-abled hoon. Voting ke liye mujhe kya special facilities milti hain?" },
  { label: "📅 Election Dates", query: "Election dates aur schedule kaise check karein?" },
  { label: "📱 EVM Voting Steps", query: "EVM machine par vote kaise daalte hain? VVPAT kya hota hai?" },
];

const GUIDED_JOURNEY_STEPS = [
  { step: 1, label: "Check Eligibility", query: "Am I eligible to vote? What are the basic requirements?" },
  { step: 2, label: "Register as Voter", query: "How to register as a voter? Explain Form 6 process." },
  { step: 3, label: "Verify Voter Status", query: "How to verify if my name is in the voter list?" },
  { step: 4, label: "Find Polling Booth", query: "How to find my designated polling booth?" },
  { step: 5, label: "Voting Process", query: "What is the step-by-step process to vote on election day?" },
];

const MODE_PREFIXES: Record<Mode, string> = {
  beginner: "[BEGINNER MODE] Please use very simple language, short sentences, and explain everything like I am a first-time voter. Use emoji to make it friendly. ",
  standard: "",
  expert: "[EXPERT MODE] Please provide detailed, technical guidance including legal references (RPA 1950/1951), form numbers, ECI circulars, and official procedures where relevant. ",
};

// ─── Copy Button ──────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy response"
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
    >
      {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
    </button>
  );
}

// ─── Integration Chips ────────────────────────────────────────────────────────

function IntegrationChips({ content }: { content: string }) {
  const lower = content.toLowerCase();
  const chips = [];
  if (lower.includes("polling booth") || lower.includes("booth location"))
    chips.push({ icon: MapPin, label: "Find Booth on Maps", href: "https://maps.google.com/?q=polling+booth+near+me", color: "text-red-600" });
  if (lower.includes("election date") || lower.includes("polling day") || lower.includes("matdaan"))
    chips.push({ icon: CalendarDays, label: "Add Election Reminder", href: "https://calendar.google.com/calendar/r/eventedit", color: "text-blue-600" });
  if (lower.includes("register") || lower.includes("form 6") || lower.includes("voters.eci"))
    chips.push({ icon: ExternalLink, label: "Register at voters.eci.gov.in", href: "https://voters.eci.gov.in", color: "text-orange-600" });

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-700">
      {chips.map((c) => {
        const Icon = c.icon;
        return (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full text-[11px] font-bold text-neutral-600 dark:text-neutral-300 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm"
          >
            <Icon size={11} className={c.color} />
            {c.label}
          </a>
        );
      })}
    </div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────────────────

function MessageBubble({ msg, formatTime }: { msg: Message; formatTime: (d: Date) => string }) {
  const isAI = msg.role === "ai";
  return (
    <div className={`flex gap-3 ${isAI ? "flex-row" : "flex-row-reverse"} animate-in fade-in slide-in-from-bottom-3 duration-400`}>
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-md mt-1 ${isAI ? "bg-white dark:bg-neutral-800 border-2 border-blue-100 dark:border-blue-900" : "bg-blue-600 text-white"}`}>
        {isAI ? <Bot size={18} className="text-blue-700 dark:text-blue-400" /> : <User size={18} />}
      </div>
      {/* Bubble */}
      <div className={`group flex flex-col gap-1 max-w-[85%] md:max-w-[72%] ${isAI ? "items-start" : "items-end"}`}>
        <div className={`px-5 py-4 rounded-3xl shadow-sm text-sm leading-relaxed ${isAI ? "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-tl-sm" : "bg-blue-600 text-white rounded-tr-sm"}`}>
          {isAI ? (
            <>
              <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-black prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <IntegrationChips content={msg.content} />
            </>
          ) : (
            <p>{msg.content}</p>
          )}
        </div>
        <div className={`flex items-center gap-2 px-2 ${isAI ? "flex-row" : "flex-row-reverse"}`}>
          <span className="text-[10px] text-neutral-400 font-medium">
            {isAI ? "Nirvachan Sahayak" : "You"} · {formatTime(msg.timestamp)}
          </span>
          {isAI && <CopyButton text={msg.content} />}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content:
        "**नमस्ते, Nagrik! Jai Hind! 🇮🇳**\n\nMain aapka **Nirvachan Sahayak** hoon — Election Commission of India ka Official AI Helpdesk.\n\nMain aapko voting process, registration, election timeline, EVM, aur har election-related sawal ka jawab de sakta hoon.\n\n**Aap kya jaanna chahte hain?**\n- 🗳️ Pehli baar vote dena chahte hain?\n- 📋 Voter ID registration?\n- 📍 Polling booth dhundna?\n- 🆔 Voter ID kho gaya?\n\nKoi bhi sawal puchein — Hindi, English, ya Hinglish mein!\n\n*ℹ️ Neeche Quick Help chips use karein ya seedha type karein.*\n\n🇮🇳 *Aapka Vote, Aapki Taqat!*",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("standard");
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [currentJourneyStep, setCurrentJourneyStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const buildHistory = useCallback(() =>
    messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
    [messages]
  );

  const handleSend = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || input).trim();
    if (!query || isLoading) return;

    setError(null);
    const prefixedQuery = MODE_PREFIXES[mode] + query;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: query, timestamp: new Date(), mode };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = buildHistory();
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prefixedQuery, history, mode }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server Error");

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.reply,
        timestamp: new Date(),
        mode,
      }]);
    } catch (err: any) {
      const fallback = err.fallback || `⚠️ **Sahayak Desk Error:** ${err.message}\n\nKripya kuch der baad try karein, ya direct visit karein: [voters.eci.gov.in](https://voters.eci.gov.in) | Helpline: **1950**`;
      setError(err.message || "Connection failed. Please try again.");
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "ai", content: fallback, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleReset = () => { setMessages((prev) => [prev[0]]); setCurrentJourneyStep(0); setError(null); };
  const handleJourneyStep = (step: (typeof GUIDED_JOURNEY_STEPS)[0], index: number) => { setCurrentJourneyStep(index + 1); handleSend(undefined, step.query); };
  const formatTime = (date: Date) => date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-5rem)] flex flex-col gap-0 font-sans">

      {/* ── Official Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900 border border-b-4 border-blue-600 rounded-t-2xl shadow-sm gap-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-blue-700 rounded-xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
            <Landmark size={26} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-neutral-800 dark:text-neutral-50 tracking-tight leading-tight">
              VOTER SAHAYAK
            </h1>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-[11px] uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              AI Helpdesk — Election Commission of India
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Mode Switcher */}
          <div className="relative">
            <button
              id="mode-switcher"
              onClick={() => setShowModeMenu((v) => !v)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${MODE_CONFIG[mode].bg}`}
              aria-label="Switch response mode"
            >
              {MODE_CONFIG[mode].icon}
              {MODE_CONFIG[mode].label}
              <ChevronDown size={12} className={showModeMenu ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            {showModeMenu && (
              <div className="absolute right-0 top-10 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-xl p-2 w-60">
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 px-3 pb-2">Response Mode</p>
                {(Object.keys(MODE_CONFIG) as Mode[]).map((m) => (
                  <button
                    key={m}
                    id={`mode-${m}`}
                    onClick={() => { setMode(m); setShowModeMenu(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800 ${mode === m ? "bg-neutral-100 dark:bg-neutral-800 font-bold" : ""}`}
                  >
                    <span>{MODE_CONFIG[m].icon}</span>
                    <div>
                      <p className="text-xs font-bold">{MODE_CONFIG[m].label} Mode</p>
                      <p className="text-[10px] text-neutral-500">{MODE_CONFIG[m].desc}</p>
                    </div>
                    {mode === m && <CheckCircle2 size={14} className="ml-auto text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Badge */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700">
            <Languages size={13} /> HI / EN / MR
          </div>

          {/* Reset */}
          <Button
            id="chat-reset-btn"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-neutral-500 border-neutral-300 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all text-xs"
            aria-label="Reset conversation"
          >
            <Trash2 size={13} className="mr-1" /> Reset
          </Button>
        </div>
      </div>

      {/* ── Guided Journey Toggle ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-x border-orange-200 dark:border-orange-800 px-4 py-2 flex-shrink-0">
        <button
          id="guided-journey-toggle"
          onClick={() => setShowJourney((v) => !v)}
          className="flex items-center gap-2 text-xs font-bold text-orange-700 dark:text-orange-400 hover:text-orange-900 transition-colors"
          aria-expanded={showJourney}
        >
          <ArrowRight size={14} className={showJourney ? "rotate-90 transition-transform" : "transition-transform"} />
          🗺️ Guided Journey: Step-by-Step Voter Flow
          <span className="ml-2 px-2 py-0.5 bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-300 rounded-full text-[10px]">5 STEPS</span>
        </button>
        {showJourney && (
          <div className="mt-3 flex flex-wrap gap-2 pb-1">
            {GUIDED_JOURNEY_STEPS.map((step, i) => (
              <button
                key={step.step}
                id={`journey-step-${step.step}`}
                onClick={() => handleJourneyStep(step, i)}
                disabled={isLoading}
                aria-label={`Journey step ${step.step}: ${step.label}`}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${
                  currentJourneyStep > i
                    ? "bg-green-100 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700"
                    : currentJourneyStep === i
                    ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-none"
                    : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-600 hover:border-orange-300 hover:text-orange-700"
                } disabled:opacity-50`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${currentJourneyStep > i ? "bg-green-500 text-white" : "bg-neutral-200 dark:bg-neutral-700 text-neutral-600"}`}>
                  {currentJourneyStep > i ? "✓" : step.step}
                </span>
                {step.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Chat Area ───────────────────────────────────────────────────────── */}
      <Card className="flex-1 flex flex-col overflow-hidden border-x border-b-0 border-neutral-200 dark:border-neutral-800 rounded-none shadow-none bg-neutral-50/70 dark:bg-neutral-900/70">
        <div id="chat-message-list" className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6" ref={scrollRef}>
          {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} formatTime={formatTime} />)}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-center animate-in fade-in duration-300">
              <div className="w-9 h-9 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center border-2 border-blue-100 dark:border-blue-900 shadow-md">
                <Bot size={18} className="text-blue-400" />
              </div>
              <div className="bg-white dark:bg-neutral-800 border border-dashed border-blue-300 dark:border-blue-700 px-5 py-3 rounded-3xl rounded-tl-sm flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Sahayak is responding...</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Input Area ─────────────────────────────────────────────────── */}
        <div className="p-3 md:p-5 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex-shrink-0">

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-400">
              <AlertCircle size={14} />
              <span className="font-medium flex-1">{error}</span>
              <button onClick={() => setError(null)} aria-label="Dismiss error"><RefreshCw size={13} /></button>
            </div>
          )}

          {/* Quick Chips */}
          <div id="quick-suggestions" className="flex gap-2 mb-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
            {QUICK_SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                id={`quick-chip-${i}`}
                onClick={() => handleSend(undefined, s.query)}
                disabled={isLoading}
                aria-label={`Quick question: ${s.label}`}
                className="text-[11px] font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-100 dark:border-blue-800 px-3 py-1.5 rounded-full transition-all whitespace-nowrap shadow-sm snap-start disabled:opacity-50 flex-shrink-0"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <form id="chat-form" onSubmit={handleSend} className="flex gap-2 items-center bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl focus-within:ring-2 ring-blue-400 transition-all">
            <div className="pl-2 text-neutral-400 shrink-0 text-xs font-bold hidden sm:block">
              {MODE_CONFIG[mode].icon}
            </div>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Apna sawal puchein — Hindi, English, ya Hinglish mein..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-neutral-700 dark:text-neutral-200 placeholder:text-neutral-400 py-2"
              disabled={isLoading}
              aria-label="Type your election question"
              maxLength={1000}
            />
            <span className="text-[10px] text-neutral-300 font-mono hidden sm:block">{input.length}/1000</span>
            <Button
              id="chat-send-btn"
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl h-10 w-10 p-0 shadow-md transition-transform active:scale-90 shrink-0 disabled:opacity-40"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-[10px] text-center mt-2.5 text-neutral-400 font-medium">
            🇮🇳 Aapka Vote, Aapki Taqat &nbsp;·&nbsp; voters.eci.gov.in &nbsp;·&nbsp; Helpline: 1950 &nbsp;·&nbsp; Mode: <strong>{mode}</strong>
          </p>
        </div>
      </Card>
    </div>
  );
}