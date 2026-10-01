"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { sound } from "@/lib/sound";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const ExperienceContent: React.FC = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between pb-2 border-b border-retroBorder/20">
        <div>
          <h2 className="font-pixel text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent" /> Work & Internships
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Practical industry exposure and software engineering experience
          </p>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent text-ink retro-border font-bold">
          {experience.length} Entries
        </span>
      </div>

      {experience.map((exp, idx) => (
        <div
          key={idx}
          className="p-5 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-4"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-pixel text-sm font-bold text-ink">{exp.role}</h3>
                {exp.statusBadge ? (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold animate-pulse shadow-sm">
                    {exp.statusBadge}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-titlebar text-titlebarText retro-border font-bold">
                    {exp.type}
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-accent-hover mt-0.5">{exp.company}</div>
            </div>

            <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs text-ink-muted font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accent" /> {exp.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accent" /> {exp.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            {exp.description}
          </p>

          {/* Key Contributions */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider font-pixel text-[10px]">
              Key Responsibilities & Impact:
            </h4>
            <ul className="space-y-1.5">
              {exp.contributions.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Applied Chips */}
          <div className="pt-2 border-t border-retroBorder/20">
            <div className="text-[11px] font-bold text-ink mb-2">Technologies Used:</div>
            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded bg-surface retro-border text-[11px] font-mono text-ink select-none hover:border-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
