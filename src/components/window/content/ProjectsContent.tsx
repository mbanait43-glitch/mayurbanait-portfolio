"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  Lock,
  Mail,
  Copy,
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
  const [statusModalProject, setStatusModalProject] = useState<Project | null>(null);
  const [copiedSpecs, setCopiedSpecs] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleOpenStatusModal = (project: Project) => {
    sound.playOpen();
    setStatusModalProject(project);
    setCopiedSpecs(false);
  };

  const handleCloseStatusModal = () => {
    sound.playClickClose();
    setStatusModalProject(null);
    setCopiedSpecs(false);
  };

  const handleCopySpecs = () => {
    if (!statusModalProject) return;
    sound.playClick();
    const summary = `${statusModalProject.title} (${statusModalProject.category})\nStatus: ${statusModalProject.status || "In Progress"}\nTech Stack: ${statusModalProject.stack.join(", ")}\nHighlights:\n${statusModalProject.highlights.map((h) => `- ${h}`).join("\n")}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(summary);
    }
    setCopiedSpecs(true);
    setTimeout(() => setCopiedSpecs(false), 3000);
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

                    {/* Screenshot Container with Click to Enlarge - Full screenshot fits inside box properly */}
                    <div
                      onClick={() => handleOpenImage(project.image!, project.title)}
                      className="relative w-full h-[calc(100%-32px)] cursor-pointer group/img overflow-hidden bg-[#0d1117] flex items-center justify-center p-2"
                      title="Click to inspect full screenshot"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain transition-transform duration-300 group-hover/img:scale-105"
                      />
                      {/* Zoom Hint Overlay */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-bold pointer-events-none">
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
              {/* Card Footer Actions (Code & Demo / Status Specs)     */}
              {/* ---------------------------------------------------- */}
              <div className="p-6 pt-0 flex items-center gap-2.5 border-t border-slate-100 dark:border-slate-800 mt-3">
                {project.id === "job-portal" ? (
                  <>
                    <a
                      href={project.githubUrl || "https://github.com/mbanait43-glitch"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>View Code</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenStatusModal(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </button>
                  </>
                ) : project.githubUrl && !project.inProgress ? (
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
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenStatusModal(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-amber-300/80 dark:border-amber-700/80 bg-amber-50/70 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-200 text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Source Specs</span>
                  </button>
                )}

                {project.id === "job-portal" ? null : project.liveUrl && !project.inProgress ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{isExtension ? "Open Extension" : "Live Demo"}</span>
                  </a>
                ) : project.id === "job-portal" ? null : (
                  <button
                    type="button"
                    onClick={() => handleOpenStatusModal(project)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-mono font-bold shadow-xs hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Status &amp; Specs</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 5. LIGHTBOX MODAL FOR HIGH-RES PROJECT SCREENSHOTS           */}
      {/* ============================================================ */}
      {mounted && selectedImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
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
        </div>,
        document.body
      )}

      {/* ============================================================ */}
      {/* 6. PROJECT STATUS & ARCHITECTURE PREVIEW MODAL               */}
      {/* ============================================================ */}
      {mounted && statusModalProject && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseStatusModal}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-white dark:bg-[#1f242d] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 dark:border-slate-600 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Retro Titlebar */}
            <div className="bg-[#383c44] dark:bg-[#22262e] text-white px-5 py-3 flex items-center justify-between select-none shadow-sm flex-shrink-0">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 truncate">
                  PROJECT STATUS &amp; ARCHITECTURE — {statusModalProject.title}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseStatusModal}
                className="font-mono text-base font-bold text-white/80 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 active:scale-80 cursor-pointer"
              >
                [x]
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7 overflow-y-auto modal-scroll space-y-5 text-slate-800 dark:text-slate-100">
              {/* Status Beacon & Progress Banner */}
              <div className="p-4 rounded-xl border border-amber-300/80 dark:border-amber-700/80 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/20">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                      Active Development / In Progress
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-amber-200/80 dark:bg-amber-800/80 text-amber-900 dark:text-amber-100">
                    {statusModalProject.progressPercent || 85}% Completed
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-amber-200/60 dark:bg-amber-900/40 h-2.5 rounded-full overflow-hidden shadow-inner mb-2.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500 animate-pulse"
                    style={{ width: `${statusModalProject.progressPercent || 85}%` }}
                  />
                </div>

                <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed font-sans">
                  {statusModalProject.progressNote ||
                    "This project is currently in active development. Backend architecture and core modules are functional. Public deployment and source repository release are scheduled for upcoming release."}
                </p>
              </div>

              {/* Project Description & Architecture Highlights */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  System Overview &amp; Architecture
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {statusModalProject.description}
                </p>
              </div>

              {/* Key Completed Modules */}
              {statusModalProject.highlights && statusModalProject.highlights.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    Completed Modules &amp; Engineered Features
                  </h4>
                  <div className="space-y-2">
                    {statusModalProject.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Chips */}
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Engineered With
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {statusModalProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Staging / Private Code Access Note */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Confidential Codebase &amp; Staging Security</span>
                </div>
                <p>
                  To protect proprietary candidate data and system logic, live staging and repository access are available upon request for technical evaluation and recruiters.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={statusModalProject.githubUrl || "https://github.com/mbanait43-glitch"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-mono text-xs font-bold shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Profile</span>
                </a>

                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`Project Access Request: ${statusModalProject.title}`)}&body=${encodeURIComponent(`Hi Mayur,\n\nI reviewed your portfolio and would like to request technical details / preview access for "${statusModalProject.title}".\n\nThanks!`)}`}
                  onClick={() => sound.playClick()}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request Staging</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySpecs}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedSpecs ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Specs</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCloseStatusModal}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
