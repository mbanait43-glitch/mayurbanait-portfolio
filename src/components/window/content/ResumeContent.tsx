"use client";

import React, { useState } from "react";
import { Download, ExternalLink, FileText, CheckCircle2, Eye } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";
import { sound } from "@/lib/sound";

export const ResumeContent: React.FC = () => {
  const { profile, education, experience, technicalSkills, certificates } = PORTFOLIO_DATA;
  const [activeView, setActiveView] = useState<"viewer" | "preview">("preview");

  const handleOpenPdf = () => {
    sound.playClick();
    window.open("/resume.pdf", "_blank");
  };

  const handleDownloadPdf = () => {
    sound.playClick();
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Mayur_Banait_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-titlebar retro-border flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-titlebarText" />
          </div>
          <div>
            <h3 className="font-pixel text-xs font-bold text-ink">
              Mayur_Banait_Resume.pdf
            </h3>
            <p className="text-[11px] text-ink-muted">
              Source file located in <code className="font-mono text-accent-hover">public/resume.pdf</code>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenPdf}
            className="retro-button px-3.5 py-1.5 rounded-lg bg-surface text-ink text-xs font-bold flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open PDF</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            className="retro-button px-3.5 py-1.5 rounded-lg bg-accent text-ink text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* View Switcher: Interactive Document Outline vs Embedded PDF */}
      <div className="flex items-center gap-2 border-b border-retroBorder/20 pb-2">
        <button
          onClick={() => {
            setActiveView("preview");
            sound.playClick();
          }}
          className={`px-3 py-1 rounded-lg retro-border text-xs font-bold flex items-center gap-1.5 ${
            activeView === "preview"
              ? "bg-accent text-ink retro-shadow-sm"
              : "bg-surface text-ink hover:bg-surfaceMuted"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Executive Summary Sheet</span>
        </button>

        <button
          onClick={() => {
            setActiveView("viewer");
            sound.playClick();
          }}
          className={`px-3 py-1 rounded-lg retro-border text-xs font-bold flex items-center gap-1.5 ${
            activeView === "viewer"
              ? "bg-accent text-ink retro-shadow-sm"
              : "bg-surface text-ink hover:bg-surfaceMuted"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Embedded PDF Viewer</span>
        </button>
      </div>

      {activeView === "preview" ? (
        <div className="p-5 rounded-xl bg-surface retro-border space-y-5 text-xs text-ink leading-relaxed">
          {/* Header */}
          <div className="border-b border-retroBorder/20 pb-3 space-y-1">
            <h2 className="font-pixel text-base font-bold text-ink">{profile.name}</h2>
            <p className="text-ink-muted">{profile.headline}</p>
            <div className="font-mono text-[11px] text-ink-muted flex flex-wrap gap-2 pt-1">
              <span>{profile.email}</span> • <span>{profile.phone}</span> • <span>{profile.location}</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <div className="font-pixel text-[11px] font-bold text-accent-hover uppercase">
              1. Education
            </div>
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline gap-2">
                <div>
                  <span className="font-bold">{edu.degree}</span> — {edu.institution}
                </div>
                <div className="font-mono text-ink-muted whitespace-nowrap">{edu.score} ({edu.year})</div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-2 pt-2 border-t border-retroBorder/15">
            <div className="font-pixel text-[11px] font-bold text-accent-hover uppercase">
              2. Professional Experience
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold">{exp.role} @ {exp.company}</span>
                  <span className="font-mono text-ink-muted">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-ink-muted space-y-0.5 pl-1">
                  {exp.contributions.slice(0, 2).map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Skills */}
          <div className="space-y-2 pt-2 border-t border-retroBorder/15">
            <div className="font-pixel text-[11px] font-bold text-accent-hover uppercase">
              3. Technical Toolkit
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-ink-muted">
              {technicalSkills.map((cat, i) => (
                <div key={i}>
                  <strong className="text-ink">{cat.category}:</strong> {cat.items.join(", ")}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2 pt-2 border-t border-retroBorder/15">
            <div className="font-pixel text-[11px] font-bold text-accent-hover uppercase">
              4. Certifications & Badges
            </div>
            <div className="space-y-1">
              {certificates.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5 text-ink-muted">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  <span>
                    <strong className="text-ink">{c.title}</strong> — {c.issuer} {c.code ? `(${c.code})` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-96 rounded-xl retro-border overflow-hidden bg-surfaceMuted flex flex-col items-center justify-center p-4">
          <iframe
            src="/resume.pdf"
            className="w-full h-full border-none rounded-lg"
            title="Resume PDF"
          />
        </div>
      )}
    </div>
  );
};
