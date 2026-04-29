"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, UserCheck, Shield, FileText, ChevronRight, ChevronDown,
  AlertTriangle, ExternalLink, ArrowRight, BookOpen, Phone, Globe,
  MapPin, Clock, Star, HelpCircle, Info, Users, Vote
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ─── Data ──────────────────────────────────────────────────────────────────

const ELIGIBILITY_CHECKLIST = [
  { id: "citizen", label: "Indian Citizen", desc: "You must be a citizen of India (NRIs eligible under Section 20A).", met: true },
  { id: "age", label: "Age 18 or above", desc: "Must be 18+ on the qualifying date (1st January of registration year).", met: true },
  { id: "resident", label: "Ordinary Resident", desc: "Must be an ordinary resident of the constituency where you apply.", met: true },
  { id: "unsound", label: "Sound Mind", desc: "Not declared of unsound mind by a court of law.", met: true },
  { id: "corrupt", label: "No Disqualification", desc: "Not disqualified under any representation of the People's Act.", met: true },
];

const DOCUMENTS_VALID = [
  { name: "Voter ID Card (EPIC)", note: "Primary & most recommended", primary: true },
  { name: "Aadhaar Card", note: "UIDAI issued" },
  { name: "PAN Card", note: "Tax department issued" },
  { name: "Driving License", note: "State transport issued" },
  { name: "Passport", note: "MEA issued" },
  { name: "Bank/Post Office Passbook with Photo", note: "Any nationalized bank" },
  { name: "MNREGA Job Card", note: "Rural development" },
  { name: "Health Insurance Smart Card", note: "Labour Ministry issued" },
  { name: "Pension Document with Photo", note: "Government issued" },
  { name: "NPR Smart Card", note: "National Population Register" },
  { name: "Official Photo ID by Govt. Service", note: "For Govt. employees" },
];

const REGISTRATION_FORMS = [
  {
    form: "Form 6",
    purpose: "New Voter Registration",
    who: "First-time voters; citizens who have moved to a new constituency",
    link: "https://voters.eci.gov.in",
    color: "blue",
    steps: [
      "Visit voters.eci.gov.in or download the Voter Helpline App",
      "Fill Form 6 with your name, DOB, address, and upload photo",
      "Submit and note your reference number",
      "BLO (Booth Level Officer) will verify your details",
      "Your name will appear in the electoral roll within 30-90 days",
    ],
  },
  {
    form: "Form 8",
    purpose: "Correct/Update Voter Details",
    who: "Existing voters who need to correct name, address, photo, or other details",
    link: "https://voters.eci.gov.in",
    color: "orange",
    steps: [
      "Login to voters.eci.gov.in with your EPIC number",
      "Select 'Correction of Entries' — Form 8",
      "Enter the field to be corrected with supporting documents",
      "Submit with self-attested proof of the correction",
      "Changes reflect in 30–60 days before cutoff",
    ],
  },
  {
    form: "Form 8A",
    purpose: "Shift Within Same Constituency",
    who: "Voters who have moved address but within the same assembly constituency",
    link: "https://voters.eci.gov.in",
    color: "purple",
    steps: [
      "Visit voters.eci.gov.in and select Form 8A",
      "Provide new address proof (Aadhaar / utility bill)",
      "Submit online — no physical visit needed",
      "BLO will verify the new address",
      "Updated voter slip sent to new address",
    ],
  },
  {
    form: "Form 7",
    purpose: "Deletion / Report Bogus Voter",
    who: "To remove deceased voters or report fraudulent entries",
    link: "https://voters.eci.gov.in",
    color: "red",
    steps: [
      "Visit voters.eci.gov.in, select 'Deletion of Name'",
      "Fill in the EPIC number of the entry to be deleted",
      "Provide reason: deceased / duplicate / shifted",
      "Attach supporting proof (death certificate etc.)",
      "ERO will investigate and take action",
    ],
  },
];

const BOOTH_PROCESS_STEPS = [
  {
    step: 1,
    title: "Reach the Polling Booth",
    desc: "Arrive at your designated polling station on time. Booths are open from 7:00 AM to 6:00 PM (times may vary by area).",
    tip: "Carry your Voter ID slip received from BLO. Find your booth at voterportal.eci.gov.in",
    icon: MapPin,
    color: "bg-blue-500",
  },
  {
    step: 2,
    title: "Queue & Identity Check",
    desc: "Stand in the queue. When your turn comes, the Polling Officer checks your name in the electoral roll.",
    tip: "Produce one of the 11 valid photo ID documents.",
    icon: UserCheck,
    color: "bg-indigo-500",
  },
  {
    step: 3,
    title: "Indelible Ink Mark",
    desc: "The Polling Officer applies indelible ink on the index finger of your left hand to prevent double voting.",
    tip: "This ink lasts 2–3 weeks. Do not try to remove it — it is a legal offence.",
    icon: Shield,
    color: "bg-purple-500",
  },
  {
    step: 4,
    title: "Issue of Voter Slip",
    desc: "You are issued a numbered slip. Proceed to the Balloting Unit (EVM) in the voting compartment.",
    tip: "Voting is secret — no one can see your choice inside the compartment.",
    icon: FileText,
    color: "bg-orange-500",
  },
  {
    step: 5,
    title: "Cast Your Vote on EVM",
    desc: "Press the blue button next to your chosen candidate's name and symbol. A beep confirms your vote.",
    tip: "VVPAT (Voter Verifiable Paper Audit Trail) will display your choice for 7 seconds — verify it!",
    icon: Vote,
    color: "bg-red-500",
  },
  {
    step: 6,
    title: "Vote Cast — Jai Hind!",
    desc: "Your vote is securely recorded. Leave the booth proudly — you have fulfilled your civic duty!",
    tip: "Show your inked finger proudly — it is the mark of a responsible citizen.",
    icon: Star,
    color: "bg-green-500",
  },
];

const EDGE_CASES = [
  {
    question: "I lost my Voter ID. Can I still vote?",
    answer: "Yes! ECI accepts 11 alternative photo IDs including Aadhaar, PAN, Driving License, Passport, and more. You can also download your e-EPIC from voterportal.eci.gov.in.",
    icon: "🆔",
  },
  {
    question: "I've moved to a new city. How do I vote?",
    answer: "File Form 6 in your new constituency to register fresh. Note: same-day transfers are NOT possible. You must plan at least 30–60 days before the election. You can also vote in your old constituency if your name is still there.",
    icon: "🏙️",
  },
  {
    question: "I am differently-abled / PwD voter. What are my special rights?",
    answer: "PwD voters can bring a companion (any person of their choice) to assist in voting. Polling stations have wheelchair access, accessible routes, and Braille-enabled EVMs. Voters 85+ or with severe disability may opt for Home Voting (postal ballot).",
    icon: "♿",
  },
  {
    question: "I am an NRI / Overseas Indian. Can I vote?",
    answer: "Yes, under Section 20A of RPA 1950, Non-Resident Indians holding valid Indian passports can register as overseas voters. File Form 6A online at voters.eci.gov.in. You must physically come to your constituency to vote; postal voting for NRIs is under consideration.",
    icon: "✈️",
  },
  {
    question: "What if I see election malpractice?",
    answer: "Report immediately to: cVIGIL App (real-time geo-tagged complaints), Voter Helpline 1950, or the nearest Returning Officer. Your report is confidential.",
    icon: "🚨",
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-neutral-500 dark:text-neutral-400 font-medium">{subtitle}</p>}
    </div>
  );
}

function FormCard({ form }: { form: (typeof REGISTRATION_FORMS)[0] }) {
  const [open, setOpen] = useState(false);
  const colorMap: Record<string, string> = {
    blue: "border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300",
    orange: "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-800 dark:text-orange-300",
    purple: "border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-800 dark:text-purple-300",
    red: "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300",
  };
  const btnMap: Record<string, string> = {
    blue: "bg-blue-600 hover:bg-blue-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    purple: "bg-purple-600 hover:bg-purple-700",
    red: "bg-red-600 hover:bg-red-700",
  };

  return (
    <div className={`border-2 rounded-3xl overflow-hidden ${colorMap[form.color]} transition-all duration-300`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div>
          <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">{form.who}</div>
          <div className="text-2xl font-black tracking-tight">{form.form}</div>
          <div className="text-sm font-bold mt-1 opacity-80">{form.purpose}</div>
        </div>
        <ChevronDown className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`} size={22} />
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-white/60 dark:bg-black/20 rounded-2xl p-4">
            {form.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5 ${btnMap[form.color]}`}>
                  {i + 1}
                </div>
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
          <a
            href={form.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all ${btnMap[form.color]}`}
          >
            Apply Online <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navSections = [
    { id: "eligibility", label: "Eligibility" },
    { id: "documents", label: "Documents" },
    { id: "registration", label: "Registration" },
    { id: "process", label: "Voting Process" },
    { id: "edgecases", label: "FAQs" },
    { id: "resources", label: "Resources" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-20 animate-in fade-in duration-700">

      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-full text-xs font-black uppercase tracking-widest text-orange-700 dark:text-orange-400">
          <BookOpen size={14} /> Official Voter Guide
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-neutral-50 tracking-tighter uppercase leading-none">
          Matdaata<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-green-600">Margdarshika</span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl mx-auto">
          A complete, step-by-step guide to exercising your democratic right — from eligibility to casting your vote.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 dark:shadow-none text-sm"
        >
          Have a question? Ask AI Sahayak <ArrowRight size={16} />
        </Link>
      </div>

      {/* ── Quick Nav ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 justify-center">
        {navSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-all shadow-sm"
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* ── 1. Eligibility ─────────────────────────────────────────────────── */}
      <section id="eligibility">
        <SectionHeader title="Voter Eligibility" subtitle="Check if you qualify to vote in Indian Elections" />
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 border-2 border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4">
          {ELIGIBILITY_CHECKLIST.map((item) => (
            <div key={item.id} className="flex items-start gap-4 p-4 rounded-2xl bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900 dark:text-neutral-100">{item.label}</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl text-sm text-amber-800 dark:text-amber-400">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <p><strong>Disqualification:</strong> A person convicted of certain crimes, declared insolvent, or holding an office of profit under Government is disqualified under Section 16 of RPA 1950.</p>
          </div>
        </div>
      </section>

      {/* ── 2. Documents ───────────────────────────────────────────────────── */}
      <section id="documents">
        <SectionHeader title="Valid Documents" subtitle="11 documents accepted at the polling booth (per ECI guidelines)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {DOCUMENTS_VALID.map((doc, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                doc.primary
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-blue-300"
              }`}
            >
              <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${doc.primary ? "text-blue-600" : "text-green-600"}`} />
              <div>
                <p className={`text-sm font-bold ${doc.primary ? "text-blue-800 dark:text-blue-300" : "text-neutral-800 dark:text-neutral-200"}`}>
                  {doc.name}
                  {doc.primary && <span className="ml-2 text-[10px] bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full font-black">PRIMARY</span>}
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{doc.note}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-neutral-500 mt-4 font-medium">
          ℹ️ Source: ECI Notification — Alternative Photo Identity Documents for Electors
        </p>
      </section>

      {/* ── 3. Registration Forms ──────────────────────────────────────────── */}
      <section id="registration">
        <SectionHeader title="Voter Registration" subtitle="Choose the right form for your situation" />
        <div className="space-y-4">
          {REGISTRATION_FORMS.map((form) => (
            <FormCard key={form.form} form={form} />
          ))}
        </div>
      </section>

      {/* ── 4. Voting Process ──────────────────────────────────────────────── */}
      <section id="process">
        <SectionHeader title="Polling Day — Step by Step" subtitle="What happens when you go to vote" />
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full" />
          <div className="space-y-6 pl-16">
            {BOOTH_PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative animate-in fade-in slide-in-from-left-4 duration-500">
                  {/* Node */}
                  <div className={`absolute -left-10 w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon size={18} />
                  </div>
                  {/* Card */}
                  <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`inline-block px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-3 ${step.color}`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-lg font-black tracking-tight mb-2">{step.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                    {step.tip && (
                      <div className="mt-3 flex items-start gap-2 text-xs bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl px-3 py-2 text-amber-700 dark:text-amber-400">
                        <Info size={13} className="shrink-0 mt-0.5" />
                        <span>{step.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. Edge Cases / FAQ ────────────────────────────────────────────── */}
      <section id="edgecases">
        <SectionHeader title="Common Situations" subtitle="Find answers to the most frequently asked voter questions" />
        <div className="bg-white dark:bg-neutral-950 rounded-3xl p-6 md:p-10 border-2 border-neutral-200 dark:border-neutral-800 shadow-md">
          <Accordion className="w-full space-y-3">
            {EDGE_CASES.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden">
                <AccordionTrigger className="px-5 py-4 text-sm font-bold text-left hover:no-underline hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-0 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── 6. Key Roles ───────────────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Key Roles in an Election" subtitle="Who does what in India's democratic process" />
        <div className="bg-white dark:bg-neutral-950 rounded-3xl p-6 md:p-10 border-2 border-neutral-200 dark:border-neutral-800 shadow-md">
          <Accordion className="w-full space-y-2">
            {[
              { title: "Election Commission of India (ECI)", content: "The ECI is an autonomous constitutional authority (Article 324) responsible for administering election processes in India. They issue Model Code of Conduct, supervise free & fair elections, manage EVMs, and redress voter grievances." },
              { title: "Chief Electoral Officer (CEO)", content: "Each state has a CEO who coordinates with the ECI at the state level — managing voter rolls, election staff deployment, and voter awareness programs (SVEEP)." },
              { title: "Returning Officer (RO)", content: "The RO is responsible for each constituency. They scrutinize nominations, manage campaigning rules, oversee counting, and declare the election result." },
              { title: "Booth Level Officer (BLO)", content: "The BLO is the ground-level ECI representative who verifies voter applications, conducts house-to-house surveys, and ensures the electoral roll is accurate for each polling booth." },
              { title: "Presiding Officer", content: "The Presiding Officer manages the polling station on Election Day. They ensure the EVM/VVPAT setup, verify voter identities, manage queue discipline, and seal the EVM after voting ends." },
              { title: "Voters — The Citizens", content: "The most powerful role. Every eligible citizen has the right and constitutional responsibility to cast their vote independently, secretly, and freely. Your vote decides India's future!" },
            ].map((item, i) => (
              <AccordionItem key={i} value={`role-${i}`}>
                <AccordionTrigger className="text-sm font-bold">{item.title}</AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-600 dark:text-neutral-400">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── 7. Official Resources ──────────────────────────────────────────── */}
      <section id="resources">
        <SectionHeader title="Official Resources" subtitle="Always go to verified sources for election information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Globe, label: "Voter Portal", link: "https://voterportal.eci.gov.in", desc: "Check voter roll, e-EPIC, booth details" },
            { icon: Globe, label: "ECI Main Site", link: "https://eci.gov.in", desc: "Official Election Commission of India" },
            { icon: Globe, label: "Register / Correct", link: "https://voters.eci.gov.in", desc: "Forms 6, 7, 8, 8A online" },
            { icon: Phone, label: "Helpline 1950", link: "tel:1950", desc: "National Voter Helpline (toll-free)" },
            { icon: Globe, label: "cVIGIL App", link: "https://cvigil.eci.gov.in", desc: "Report election violations in real-time" },
            { icon: Globe, label: "SVEEP", link: "https://ecisveep.nic.in", desc: "Voter awareness programs & events" },
          ].map((res) => {
            const Icon = res.icon;
            return (
              <a
                key={res.label}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-white dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800 rounded-3xl hover:border-blue-400 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-none transition-all group"
              >
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{res.label}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{res.desc}</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-neutral-300 group-hover:text-blue-500 transition-colors shrink-0" />
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <div className="text-center py-6 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-neutral-400">
          🇮🇳 Aapka Vote, Aapki Taqat | Election Commission Simulation Guide
        </p>
        <p className="text-[10px] text-neutral-400">
          Information based on ECI guidelines. For official decisions, always consult voters.eci.gov.in or call 1950.
        </p>
      </div>

    </div>
  );
}