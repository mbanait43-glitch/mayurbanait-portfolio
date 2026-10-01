"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/content";
import { Project } from "@/types";
import { sound } from "@/lib/sound";
import {
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Code2,
  Wrench,
  Puzzle,
  Monitor,
  ZoomIn,
  CheckCircle2,
  Clock,
  Sparkle,
  X,
  Laptop,
} from "lucide-react";

type FilterTab =
  | "All"
  | "Web Applications"
  | "Chrome Extensions"
  | "Java"
  | ".NET"
  | "MERN";

export const ProjectsContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const { projects, profile } = PORTFOLIO_DATA;

  const filters: FilterTab[] = [
    "All",
    "Web Applications",
    "Chrome Extensions",
    "Java",
    ".NET",
    "MERN",
  ];

  const handleFilterClick = (filter: FilterTab) => {
    setActiveFilter(filter);
    sound.playClick();
  };

  const filteredProjects = projects.filter((proj) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Web Applications") return proj.type === "web";
    if (activeFilter === "Chrome Extensions") return proj.type === "extension";
    return proj.category === activeFilter;
  });

  const handleOpenImage = (url: string, title: string) => {
    sound.playOpen();
    setSelectedImage({ url, title });
  };

  const handleCloseImage = () => {
    sound.playClickClose();
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 sm:p-2 text-slate-800 dark:text-slate-200">
      {/* ============================================================ */}
      {/* 1. TOP BANNER & WORK INQUIRIES                               */}
      {/* ============================================================ */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/60 dark:from-amber-950/40 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs sm:text-sm shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-sm sm:text-base">
            <Sparkle className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Open for Software Engineer Roles & Full-Stack Internships</span>
          </p>
          <p className="text-amber-800/80 dark:text-amber-300/80 text-xs">
            Architecting robust web applications, high-performance REST APIs, and productive Chrome Extensions.
          </p>
        </div>

        <a
          href={`mailto:${profile.email}`}
          onClick={() => sound.playClick()}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-mono text-xs font-bold shadow-xs transition-all hover:scale-105 active:scale-95 duration-150 inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <span>Send Work Email</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ============================================================ */}
      {/* 3. PROJECTS FILTER & STATS BAR                               */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <span>PROJECTS & EXTENSIONS</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Full-stack web applications and Chrome Extensions with real production screenshots
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterClick(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
                activeFilter === tab
                  ? "bg-amber-500 text-white shadow-sm -translate-y-0.5"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. PROJECTS SHOWCASE GRID (WELL-SPACED, CENTERED & BALANCED) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch justify-items-center">
        {filteredProjects.map((project: Project) => {
          const isExtension = project.type === "extension";

          return (
            <div
              key={project.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 flex flex-col justify-between group w-full max-w-xl mx-auto"
            >
              <div>
                {/* ---------------------------------------------------- */}
                {/* Visual Header / Screenshot Frame                    */}
                {/* ---------------------------------------------------- */}
                {project.image ? (
                  <div className="relative w-full h-52 sm:h-60 bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-700/80">
                    {/* Mock Browser/App Bar Header */}
                    <div className="bg-[#2d3139] dark:bg-[#1a1e24] px-4 py-2 flex items-center justify-between text-white/80 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300/80 bg-slate-800/80 px-3 py-0.5 rounded-md truncate max-w-[220px]">
                        {isExtension ? <Puzzle className="w-3 h-3 text-amber-400" /> : <Monitor className="w-3 h-3 text-blue-400" />}
                        <span className="truncate">{project.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {isExtension ? "Extension" : "Live App"}
                      </span>
                    </div>

                    {/* Screenshot Container with Click to Enlarge */}
                    <div
                      onClick={() => handleOpenImage(project.image!, project.title)}
                      className="relative w-full h-[calc(100%-32px)] cursor-pointer group/img overflow-hidden"
                      title="Click to inspect full screenshot"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`${
                          isExtension
                            ? "object-contain bg-[#0f141c] p-2"
                            : "object-cover object-top"
                        } transition-transform duration-300 group-hover/img:scale-105`}
                      />
                      {/* Zoom Hint Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold pointer-events-none">
                        <ZoomIn className="w-4 h-4" />
                        <span>Enlarge Screenshot</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Placeholder Frame for Extensions with images pending */
                  <div className="relative w-full h-52 sm:h-60 bg-gradient-to-br from-slate-100 via-slate-50 to-amber-50/30 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border-b border-slate-200 dark:border-slate-700/80 flex flex-col justify-between p-5">
                    {/* Mock Extension Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                          <Puzzle className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                            Chrome Extension
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            Manifest V3
                          </div>
                        </div>
                      </div>

                      {project.status && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 flex items-center gap-1.5 shadow-2xs">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{project.status}</span>
                        </span>
                      )}
                    </div>

                    {/* Frame Ready / Placeholder Notice */}
                    <div className="my-auto text-center space-y-2 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-slate-800/60">
                      <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                          Screenshot Frame Ready
                        </p>
                        <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          UI preview update in progress &bull; Frame initialized
                        </p>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-400 text-right">
                      Updated &bull; 2026 Release
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* Project Details Body                                */}
                {/* ---------------------------------------------------- */}
                <div className="p-5 space-y-3.5">
                  {/* Badges row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {isExtension ? "Chrome Extension" : project.category}
                      </span>
                      {project.status && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                          <span>{project.status}</span>
                        </span>
                      )}
                    </div>

                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 font-bold border border-amber-300 dark:border-amber-700">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description — justified with clean breathing room */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify sm:text-left">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <ul className="pl-4 list-disc space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      {project.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 select-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* Card Footer Actions (Code & Demo)                    */}
              {/* ---------------------------------------------------- */}
              <div className="p-6 pt-0 flex items-center gap-2.5 border-t border-slate-100 dark:border-slate-800 mt-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Code</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{isExtension ? "WebStore / Info" : "Live Demo"}</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 5. LIGHTBOX MODAL FOR HIGH-RES PROJECT SCREENSHOTS           */}
      {/* ============================================================ */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseImage}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="bg-[#383c44] text-white px-5 py-3 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 overflow-hidden">
                <Monitor className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-mono text-sm sm:text-base font-bold truncate">
                  {selectedImage.title} — Full Screenshot
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-amber-300 hover:underline hidden sm:inline-block"
                >
                  Open Original File
                </a>
                <button
                  type="button"
                  onClick={handleCloseImage}
                  className="font-mono text-sm font-bold text-white/90 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
                  title="Close screenshot"
                >
                  [x]
                </button>
              </div>
            </div>

            {/* Lightbox Image Preview Body */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[550px] bg-slate-950 flex items-center justify-center overflow-auto p-2">
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Lightbox Footer Bar */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
              <span>{selectedImage.title}</span>
              <button
                type="button"
                onClick={handleCloseImage}
                className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 font-bold"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
