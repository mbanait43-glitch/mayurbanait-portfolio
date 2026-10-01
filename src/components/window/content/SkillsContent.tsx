"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { Cpu, Award, Users, CheckCircle, BarChart3 } from "lucide-react";
import { sound } from "@/lib/sound";

export const SkillsContent: React.FC = () => {
  const { technicalSkills, skillLevels, coreSkills, interpersonalSkills } =
    PORTFOLIO_DATA;

  const [activeTab, setActiveTab] = useState<"technical" | "core" | "interpersonal">(
    "technical"
  );

  const handleTabChange = (tab: "technical" | "core" | "interpersonal") => {
    setActiveTab(tab);
    sound.playClick();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 pb-2 border-b border-retroBorder/20 overflow-x-auto no-scrollbar">
        <button
          onClick={() => handleTabChange("technical")}
          className={`px-3 py-1.5 rounded-lg retro-border text-xs font-bold flex items-center gap-1.5 transition-transform active:translate-y-0.5 ${
            activeTab === "technical"
              ? "bg-accent text-ink retro-shadow-sm -translate-y-0.5"
              : "bg-surface text-ink hover:bg-surfaceMuted"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Skills</span>
        </button>

        <button
          onClick={() => handleTabChange("core")}
          className={`px-3 py-1.5 rounded-lg retro-border text-xs font-bold flex items-center gap-1.5 transition-transform active:translate-y-0.5 ${
            activeTab === "core"
              ? "bg-accent text-ink retro-shadow-sm -translate-y-0.5"
              : "bg-surface text-ink hover:bg-surfaceMuted"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Core Competencies</span>
        </button>

        <button
          onClick={() => handleTabChange("interpersonal")}
          className={`px-3 py-1.5 rounded-lg retro-border text-xs font-bold flex items-center gap-1.5 transition-transform active:translate-y-0.5 ${
            activeTab === "interpersonal"
              ? "bg-accent text-ink retro-shadow-sm -translate-y-0.5"
              : "bg-surface text-ink hover:bg-surfaceMuted"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Interpersonal Skills</span>
        </button>
      </div>

      {/* Tab: Technical Skills */}
      {activeTab === "technical" && (
        <div className="space-y-6 animate-fade-in">
          {/* Animated Proficiency Bars */}
          <div className="p-4 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-3">
            <h3 className="font-pixel text-[11px] font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" /> Proficiency Matrix
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {skillLevels.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-ink font-semibold">{skill.name}</span>
                    <span className="font-mono text-ink-muted text-[11px]">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-surface retro-border rounded-full overflow-hidden p-[1px]">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grouped Skills: Languages, Web, Databases, Concepts, Tools */}
          <div className="space-y-4">
            <h3 className="font-pixel text-[11px] font-bold text-ink uppercase tracking-wider">
              Categorized Directory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technicalSkills.map((cat, cIdx) => (
                <div
                  key={cIdx}
                  className="p-4 rounded-xl bg-surface retro-border space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-pixel text-[10px] font-bold text-titlebarText bg-titlebar px-2 py-0.5 rounded retro-border uppercase">
                      {cat.category}
                    </h4>
                    <span className="text-[10px] font-mono text-ink-muted">
                      {cat.items.length} skills
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cat.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        onMouseEnter={() => sound.playSkillHover()}
                        className="px-2.5 py-1 rounded-lg bg-surfaceMuted retro-border text-xs font-mono text-ink font-medium hover:border-ink transition-colors cursor-pointer select-none"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Core Skills */}
      {activeTab === "core" && (
        <div className="p-5 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-4 animate-fade-in">
          <div>
            <h3 className="font-pixel text-xs font-bold text-ink uppercase tracking-wider">
              Core & Operational Skills
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              Quality assurance, comprehension, office productivity, and meticulous data handling
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {coreSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-surface retro-border flex items-start gap-2.5 text-xs text-ink"
              >
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Interpersonal Skills */}
      {activeTab === "interpersonal" && (
        <div className="p-5 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-4 animate-fade-in">
          <div>
            <h3 className="font-pixel text-xs font-bold text-ink uppercase tracking-wider">
              Interpersonal & Collaborative Traits
            </h3>
            <p className="text-xs text-ink-muted mt-1">
              Team synergy, analytical problem framing, adaptability, and clear stakeholder communication
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {interpersonalSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-surface retro-border space-y-1"
              >
                <div className="font-bold text-xs text-ink flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                  <span>{skill}</span>
                </div>
                <div className="text-[11px] text-ink-muted leading-relaxed">
                  Demonstrated throughout collegiate project lifecycles, cross-functional sprints, and code reviews.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
