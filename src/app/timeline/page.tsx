"use client";

import { motion } from "framer-motion";
import { CalendarDays, Megaphone, Users, Vote, FileCheck, Trophy } from "lucide-react";

const TIMELINE_STEPS = [
  {
    id: 1,
    title: "Election Announcement",
    description: "The Election Commission announces the dates for polling and counting. The Model Code of Conduct comes into effect immediately.",
    icon: CalendarDays,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Filing of Nominations",
    description: "Candidates submit their nomination papers, affidavits regarding criminal background, assets, liabilities, and educational qualifications.",
    icon: FileCheck,
    color: "bg-indigo-500",
  },
  {
    id: 3,
    title: "Scrutiny & Withdrawal",
    description: "The Returning Officer scrutinizes nominations. Valid candidates are announced, and candidates are given a window to withdraw their names if they wish.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    id: 4,
    title: "Election Campaigning",
    description: "Candidates and political parties campaign to reach out to voters through rallies, door-to-door visits, and media. Campaigning stops 48 hours before voting.",
    icon: Megaphone,
    color: "bg-orange-500",
  },
  {
    id: 5,
    title: "Polling Day",
    description: "Voters go to their designated polling booths and cast their votes securely and secretly using Electronic Voting Machines (EVMs).",
    icon: Vote,
    color: "bg-red-500",
  },
  {
    id: 6,
    title: "Counting & Results",
    description: "EVMs are opened in the presence of candidates/agents. Votes are counted under strict security, and the Returning Officer declares the winner.",
    icon: Trophy,
    color: "bg-green-500",
  },
];

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Election Timeline</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">Follow the journey from announcement to results.</p>
      </div>

      <div className="relative">
        {/* Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2 rounded-full"></div>

        <div className="space-y-12">
          {TIMELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={step.id} 
                className="relative flex items-center md:justify-center"
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-white dark:bg-neutral-950 border-4 border-neutral-100 dark:border-neutral-900 shadow-md flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${step.color} flex items-center justify-center text-white`}>
                    <Icon size={16} />
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full pl-16 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right md:mr-auto' : 'md:pl-16 md:ml-auto'}`}>
                  <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md transition-shadow">
                    <div className={`inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full text-white mb-3 ${step.color}`}>
                      Phase {step.id}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
