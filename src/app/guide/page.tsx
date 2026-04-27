"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, UserCheck, Shield, FileText } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-neutral-900 dark:text-neutral-50 tracking-tight uppercase">
          Matdaata Margdarshika / Election Guide
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 font-medium">
          Everything you need to know about the democratic process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <UserCheck className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle className="text-xl font-bold">Voter Eligibility</CardTitle>
            <CardDescription>Who can vote in the elections?</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Must be a citizen of India.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Must be 18 years of age or older on the qualifying date.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Must be an ordinary resident of the polling area.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Must possess a valid Voter ID (EPIC) or other ECI-approved IDs.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader>
            <FileText className="w-10 h-10 text-orange-600 mb-2" />
            <CardTitle className="text-xl font-bold">Required Documents</CardTitle>
            <CardDescription>What to bring to the polling booth?</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-start gap-3 font-semibold text-neutral-800 dark:text-neutral-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Voter ID Card (EPIC) - Recommended</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Aadhaar Card</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>PAN Card</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>Driving License, Passport, or Bank Passbook with Photo</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white dark:bg-neutral-950 rounded-3xl p-6 md:p-10 border-2 border-neutral-200 dark:border-neutral-800 shadow-md">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
          <Shield className="text-blue-700" size={28} /> Key Roles in an Election
        </h2>

        <Accordion className="w-full space-y-2">

          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-bold">
              Election Commission of India (ECI)
            </AccordionTrigger>
            <AccordionContent>
              The ECI is an autonomous constitutional authority responsible for administering election processes in India. They ensure elections are free, fair, and conducted on schedule.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-bold">
              Candidates & Political Parties
            </AccordionTrigger>
            <AccordionContent>
              Candidates represent their vision and promises to the citizens. Every candidate must follow the strict guidelines set by the ECI, including expenditure limits.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-bold">
              Voters (The Citizens)
            </AccordionTrigger>
            <AccordionContent>
              Voters are the foundation of our democracy. It is both a right and a national duty for every eligible citizen to cast their vote independently and secretly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-bold">
              Polling & Presiding Officers
            </AccordionTrigger>
            <AccordionContent>
              These officials manage the polling booths. The Presiding Officer ensures the sanctity of the booth, verifies voter identity, and manages the EVM/VVPAT.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>

      <div className="text-center pt-6 opacity-60">
        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
          Aapka Vote, Aapki Taqat | Election Commission Simulation Guide
        </p>
      </div>
    </div>
  );
}