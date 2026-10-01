"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CERTIFICATES_DATA, Certificate } from "@/data/certificates";
import { PORTFOLIO_DATA } from "@/data/content";
import { sound } from "@/lib/sound";
import {
  Award,
  ExternalLink,
  FileText,
  CheckCircle2,
  ZoomIn,
  X,
  ShieldCheck,
  Trophy,
  Code2,
} from "lucide-react";

export const CertificatesContent: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { codingStats } = PORTFOLIO_DATA;

  const categories = [
    "All",
    "AI & ML",
    "Programming",
    "Cybersecurity & Networks",
    "Cloud & Enterprise",
  ];

  const filteredCerts =
    activeCategory === "All"
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((c) => c.category === activeCategory);

  const handleOpenLightbox = (cert: Certificate) => {
    sound.playOpen();
    setSelectedCert(cert);
  };

  const handleCloseLightbox = () => {
    sound.playClickClose();
    setSelectedCert(null);
  };

  return (
    <div className="space-y-6 max-w-6xl w-full mx-auto p-1 sm:p-2 text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="font-mono font-bold text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
              Verified Certifications & Credentials
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Professional specializations from Google, Cisco Networking Academy, Oracle, and IBM.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700/60 font-mono text-xs font-bold text-amber-600 dark:text-amber-400 shadow-sm flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{CERTIFICATES_DATA.length} Verified</span>
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveCategory(cat);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
              activeCategory === cat
                ? "bg-amber-500 text-white shadow-sm -translate-y-0.5"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certificates Responsive Grid (3 per row on desktop/laptop, 2 on tablet, 1 on phone) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 flex flex-col h-full w-full"
          >
            {/* Preview Thumbnail Container */}
            <div
              onClick={() => handleOpenLightbox(cert)}
              className="relative w-full h-44 sm:h-48 bg-slate-100 dark:bg-slate-800/80 cursor-pointer overflow-hidden border-b border-slate-200 dark:border-slate-700/80 group-hover:opacity-95 transition-opacity flex-shrink-0"
              title="Click to view full certificate"
            >
              <Image
                src={cert.imagePath}
                alt={cert.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-mono text-xs font-bold pointer-events-none">
                <ZoomIn className="w-4 h-4" />
                <span>Click to Enlarge</span>
              </div>
            </div>

            {/* Certificate Meta Details & Bottom Actions - Flex-1 tightly organized */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                {/* Issuer Badge & Date below image so certificate logo is 100% visible */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                    {cert.issuer}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {cert.date}
                  </span>
                </div>

                <div className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Skills/Tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons: View PDF & Verify - tight at the bottom without large empty gap */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                <a
                  href={cert.pdfPath || cert.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-sm transition-colors"
                  title="Open certificate document"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>View PDF</span>
                </a>

                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold shadow-sm transition-colors"
                    title="Verify credential on Coursera"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verify</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(cert)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold shadow-sm transition-colors cursor-pointer"
                    title="Inspect Certificate"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coding Stats Credibility Section */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white uppercase">
              {codingStats.badge} (100+ Problems Solved)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            LeetCode &bull; CodeChef &bull; HackerRank
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {codingStats.platforms.map((plat, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 shadow-sm"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 dark:text-slate-200">
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{plat.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono leading-tight">
                {plat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseLightbox}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="bg-[#383c44] text-white px-5 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 overflow-hidden">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-mono text-sm sm:text-base font-bold truncate">
                  {selectedCert.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedCert.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-amber-300 hover:underline hidden sm:inline-block"
                >
                  Open Original
                </a>
                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  className="font-mono text-sm font-bold text-white/90 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                  title="Close lightbox"
                >
                  [x]
                </button>
              </div>
            </div>

            {/* Lightbox Image Preview Body */}
            <div className="relative flex-1 min-h-[300px] sm:min-h-[500px] bg-slate-950 flex items-center justify-center overflow-auto p-2">
              <div className="relative w-full h-[65vh]">
                <Image
                  src={selectedCert.imagePath}
                  alt={selectedCert.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Lightbox Footer Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="font-mono text-slate-600 dark:text-slate-300">
                <b>{selectedCert.issuer}</b> &bull; {selectedCert.date}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedCert.pdfPath || selectedCert.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono font-bold inline-flex items-center gap-1.5 hover:bg-slate-100"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>View PDF</span>
                </a>

                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-mono font-bold inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verify Online</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
