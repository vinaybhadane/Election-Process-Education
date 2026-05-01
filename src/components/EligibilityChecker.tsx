"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";

type Answer = "yes" | "no" | null;

interface Question {
  id: string;
  text: string;
  hint?: string;
  passOn: "yes" | "no";
  failMsg: string;
}

const QUESTIONS: Question[] = [
  {
    id: "citizen",
    text: "Are you a citizen of India?",
    hint: "NRIs with valid Indian passport qualify under Section 20A.",
    passOn: "yes",
    failMsg: "Only Indian citizens can register to vote in Indian elections.",
  },
  {
    id: "age",
    text: "Are you 18 years or older as of January 1st of this year?",
    hint: "The qualifying date is 1st January of the year of electoral roll revision.",
    passOn: "yes",
    failMsg: "You must be at least 18 years old on the qualifying date (1 Jan) to be eligible.",
  },
  {
    id: "resident",
    text: "Are you an ordinary resident of a constituency in India?",
    hint: "You must have a permanent/ordinary residence in the constituency where you apply.",
    passOn: "yes",
    failMsg: "You must be an ordinary resident of a constituency to register there.",
  },
  {
    id: "soundMind",
    text: "Have you NOT been declared of unsound mind by a competent court?",
    hint: "A court declaration of unsound mind disqualifies a person from voting.",
    passOn: "yes",
    failMsg: "A person declared of unsound mind by a court is disqualified under Section 16 of RPA 1950.",
  },
  {
    id: "disqualified",
    text: "Are you free from any electoral disqualification under the Representation of the People's Act?",
    hint: "Includes conviction for certain crimes, corrupt practices, or holding an office of profit.",
    passOn: "yes",
    failMsg: "Certain convictions or disqualifications under RPA 1950/1951 make a person ineligible.",
  },
];

type CheckerState = "idle" | "checking" | "eligible" | "ineligible";

export default function EligibilityChecker() {
  const [state, setState] = useState<CheckerState>("idle");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(Array(QUESTIONS.length).fill(null));
  const [failReason, setFailReason] = useState<string>("");

  const handleAnswer = (answer: Answer) => {
    const q = QUESTIONS[step];
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);

    if (answer !== q.passOn) {
      setFailReason(q.failMsg);
      setState("ineligible");
      return;
    }

    if (step + 1 >= QUESTIONS.length) {
      setState("eligible");
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => {
    setState("idle");
    setStep(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setFailReason("");
  };

  if (state === "idle") {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-4">🗳️</div>
        <h3 className="font-black text-lg text-neutral-900 dark:text-neutral-100 mb-2">Am I Eligible to Vote?</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">Answer 5 quick questions to check your voter eligibility instantly.</p>
        <button
          id="eligibility-start-btn"
          onClick={() => setState("checking")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-200 dark:shadow-none"
        >
          Check My Eligibility <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  if (state === "eligible") {
    return (
      <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
        <CheckCircle2 size={52} className="text-green-600 mx-auto mb-3" />
        <h3 className="font-black text-xl text-green-700 dark:text-green-400 mb-2">✅ You Are Eligible to Vote!</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">All 5 eligibility criteria are met. Register now at voters.eci.gov.in</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition-all"
          >
            Register Now (Form 6) →
          </a>
          <button onClick={reset} className="px-5 py-2.5 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl font-bold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all flex items-center gap-2">
            <RotateCcw size={14} /> Retake
          </button>
        </div>
      </div>
    );
  }

  if (state === "ineligible") {
    return (
      <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
        <XCircle size={52} className="text-red-500 mx-auto mb-3" />
        <h3 className="font-black text-xl text-red-600 dark:text-red-400 mb-2">Not Currently Eligible</h3>
        <div className="flex items-start gap-2 max-w-sm mx-auto mb-5 text-left bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
          <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{failReason}</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="tel:1950" className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-sm transition-all">
            📞 Call Helpline 1950
          </a>
          <button onClick={reset} className="px-5 py-2.5 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl font-bold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all flex items-center gap-2">
            <RotateCcw size={14} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  // checking state
  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-[11px] font-bold text-neutral-500 mb-2">
          <span>Question {step + 1} of {QUESTIONS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center py-2">
        <p className="font-black text-lg text-neutral-900 dark:text-neutral-100 leading-snug mb-2">{q.text}</p>
        {q.hint && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1">
            <AlertTriangle size={11} className="text-amber-500" /> {q.hint}
          </p>
        )}
      </div>

      {/* Answer Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          id={`eligibility-yes-${q.id}`}
          onClick={() => handleAnswer("yes")}
          className="flex-1 max-w-[140px] py-3 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black text-base transition-all active:scale-95 shadow-lg shadow-green-200 dark:shadow-none"
        >
          ✅ Yes
        </button>
        <button
          id={`eligibility-no-${q.id}`}
          onClick={() => handleAnswer("no")}
          className="flex-1 max-w-[140px] py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black text-base transition-all active:scale-95 shadow-lg shadow-red-200 dark:shadow-none"
        >
          ❌ No
        </button>
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-2">
        {QUESTIONS.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < step ? "bg-green-500" : i === step ? "bg-blue-600 scale-125" : "bg-neutral-300 dark:bg-neutral-600"}`} />
        ))}
      </div>
    </div>
  );
}
