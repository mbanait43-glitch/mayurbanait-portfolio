"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export const FAQContent: React.FC = () => {
  const { faq } = PORTFOLIO_DATA;
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleAccordion = (index: number) => {
    sound.playClick();
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-1 text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between gap-3 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="font-mono font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
              Frequently Asked Questions (Q&A)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Common questions about my background, work availability, engineering philosophy, and stack.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500 text-white shadow-xs whitespace-nowrap hidden sm:inline-block">
          {faq.length} Answers
        </span>
      </div>

      {/* Accordions List (ONLY Q&A) */}
      <div className="space-y-3 pt-1">
        {faq.map((item, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 shadow-xs overflow-hidden ${
                isOpen
                  ? "border-amber-300 dark:border-amber-700/80 bg-white dark:bg-[#252a34]"
                  : "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-3 text-sm sm:text-base font-bold text-slate-900 dark:text-white cursor-pointer select-none"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${
                      isOpen ? "bg-amber-500" : "bg-slate-400 dark:bg-slate-600"
                    }`}
                  />
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-amber-500" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-850/60">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
