"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Trash2, Landmark, Languages, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown"; // For professional text formatting

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

const QUICK_SUGGESTIONS = [
  { label: "Voter ID Registration", query: "Voter ID card kaise banayein? Step by step batayein." },
  { label: "Check Election Dates", query: "Mere area mein election kab hai? Kaise check karu?" },
  { label: "EVM & VVPAT Guide", query: "EVM machine par vote kaise daalte hain?" },
  { label: "Eligibility", query: "Voting ke liye kya eligibility honi chahiye?" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Jai Hind, Nagrik! Main aapka **Nirvachan Sahayak** hoon. Main ek Election Officer ki tarah aapko voting process samjhane mein madad karunga. Aap mujhse Hindi, English ya Marathi mein sawal pooch sakte hain.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = customQuery || input;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const firstUserIndex = [...messages, userMessage].findIndex(m => m.role === "user");
      const filteredMessages = firstUserIndex === -1 ? [] : [...messages, userMessage].slice(firstUserIndex, -1);

      const chatHistory = filteredMessages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history: chatHistory }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server Error");

      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.reply,
      }]);
    } catch (error: any) {
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: `Error: ${error.message}. Kripya check karein ki server restart kiya gaya hai.`,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-6rem)] flex flex-col p-2 md:p-6 font-sans">

      {/* Official Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-white dark:bg-neutral-900 p-4 rounded-2xl border-b-4 border-blue-600 shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-700 rounded-xl text-white shadow-lg">
            <Landmark size={28} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-neutral-800 dark:text-neutral-50 tracking-tight">VOTER SAHAYAK</h1>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Official AI Helpdesk
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 text-xs font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
            <Languages size={14} /> HI / EN / MR
          </div>
          <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])} className="text-neutral-500 border-neutral-300 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
            <Trash2 size={16} className="mr-2" /> Reset
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-2xl rounded-[2rem] bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-md">

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-white dark:bg-neutral-800 border-2 border-blue-100"
                }`}>
                {msg.role === "user" ? <User size={20} /> : <Bot size={20} className="text-blue-700" />}
              </div>
              <div className={`px-5 py-4 rounded-3xl max-w-[85%] md:max-w-[70%] shadow-sm ${msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-tl-none text-neutral-800 dark:text-neutral-200"
                }`}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center border-2 border-blue-50">
                <Bot size={20} className="text-blue-400" />
              </div>
              <div className="bg-white dark:bg-neutral-800 border border-dashed border-blue-300 px-6 py-3 rounded-3xl flex items-center gap-3">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Sahayak is typing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Interaction Bar */}
        <div className="p-4 md:p-6 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
            {QUICK_SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(undefined, s.query)}
                className="text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 px-4 py-2 rounded-full transition-all whitespace-nowrap shadow-sm"
              >
                {s.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-3 items-center bg-neutral-100 dark:bg-neutral-800 p-2 rounded-[1.5rem] focus-within:ring-2 ring-blue-500 transition-all shadow-inner">
            <div className="pl-3 text-neutral-400">
              <Info size={18} />
            </div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Officer se sawal puchein (e.g. How to vote?)..."
              className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 text-neutral-700 dark:text-neutral-200"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl h-11 w-11 p-0 shadow-lg transition-transform active:scale-90"
            >
              <Send size={20} />
            </Button>
          </form>
          <p className="text-[10px] text-center mt-3 text-neutral-400 font-medium uppercase tracking-widest">
            Aapka Vote, Aapki Taqat | Election Commission of India - Simulation
          </p>
        </div>
      </Card>
    </div>
  );
}