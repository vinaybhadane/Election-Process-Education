"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Vote, BotMessageSquare, GraduationCap, Clock, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Mukhya Prishth", href: "/", icon: LayoutDashboard }, // Home
    { name: "Timeline", href: "/timeline", icon: Clock },
    { name: "Margdarshika", href: "/guide", icon: GraduationCap }, // Guide
    { name: "AI Sahayak", href: "/chat", icon: BotMessageSquare },
    { name: "Simulator", href: "/simulator", icon: Vote },
  ];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo Section */}
          <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
            <div className="p-2 bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 dark:shadow-none group-hover:bg-blue-600 transition-colors">
              <Vote size={22} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg leading-none tracking-tighter text-neutral-900 dark:text-neutral-50 uppercase">
                Voter Sahayak
              </span>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Digital Helpdesk
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-100/50 dark:bg-neutral-900/50 p-1.5 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide flex items-center gap-2 transition-all duration-200",
                    isActive
                      ? "bg-white dark:bg-neutral-800 text-blue-700 dark:text-blue-400 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                  )}
                >
                  <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold uppercase transition-all",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}