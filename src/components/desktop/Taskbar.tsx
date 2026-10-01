"use client";

import React, { useState, useRef, useEffect } from "react";
import { WindowId } from "@/types";
import { useWindowStore } from "@/store/useWindowStore";
import { sound } from "@/lib/sound";
import {
  AboutIcon,
  ExperienceIcon,
  ProjectsIcon,
  SkillsIcon,
  CertificatesIcon,
  ResumeIcon,
  ContactIcon,
  FAQIcon,
  SettingsIcon,
} from "@/components/common/OriginalIcons";

const ICON_MAP: Record<WindowId, React.ReactNode> = {
  about: <AboutIcon size={20} />,
  experience: <ExperienceIcon size={20} />,
  projects: <ProjectsIcon size={20} />,
  skills: <SkillsIcon size={20} />,
  certificates: <CertificatesIcon size={20} />,
  resume: <ResumeIcon size={20} />,
  contact: <ContactIcon size={20} />,
  faq: <FAQIcon size={20} />,
  settings: <SettingsIcon size={20} />,
};

const WINDOW_LABELS: Record<WindowId, string> = {
  about: "About",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  certificates: "Certificates",
  resume: "Resume",
  contact: "Contact",
  faq: "FAQ",
  settings: "Settings",
};

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    windowOrder,
    focusWindow,
    minimizeWindow,
    openWindow,
  } = useWindowStore();

  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target as Node)) {
        setStartMenuOpen(false);
      }
    };
    if (startMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [startMenuOpen]);

  const handleWindowButtonClick = (id: WindowId) => {
    const win = windows[id];
    if (!win) return;

    if (activeWindowId === id && !win.minimized) {
      // Active window clicked -> minimize it
      minimizeWindow(id);
    } else {
      // Focus and restore
      focusWindow(id);
      sound.playClick();
    }
  };

  const handleStartToggle = () => {
    sound.playToggle();
    setStartMenuOpen(!startMenuOpen);
  };

  const handleStartItemClick = (id: WindowId) => {
    openWindow(id);
    setStartMenuOpen(false);
  };

  const openWindowIds = windowOrder.filter((id) => Boolean(windows[id]));

  return (
    <>
      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div
          ref={startMenuRef}
          className="fixed bottom-[56px] left-3 w-64 bg-surface retro-border retro-shadow-lg rounded-xl z-50 overflow-hidden animate-fade-in text-ink select-none"
        >
          {/* Start Menu Header */}
          <div className="bg-titlebar text-titlebarText p-3 retro-border-b flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface retro-border flex items-center justify-center font-pixel text-xs font-bold text-ink">
              MB
            </div>
            <div>
              <div className="font-pixel text-[11px] font-bold">Mayur Banait</div>
              <div className="text-[10px] text-ink-muted">Software Developer</div>
            </div>
          </div>

          {/* Quick App Launcher List */}
          <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
            {(
              [
                "about",
                "experience",
                "projects",
                "skills",
                "certificates",
                "resume",
                "contact",
                "faq",
                "settings",
              ] as WindowId[]
            ).map((id) => (
              <button
                key={id}
                onClick={() => handleStartItemClick(id)}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-surfaceMuted transition-colors text-left text-xs font-medium text-ink"
              >
                <div className="w-5 h-5 flex items-center justify-center">{ICON_MAP[id]}</div>
                <span>{WINDOW_LABELS[id]}</span>
              </button>
            ))}
          </div>

          <div className="p-2 retro-border-t bg-surfaceMuted text-[10px] text-center text-ink-muted">
            Desktop OS Portfolio • 2026
          </div>
        </div>
      )}

      {/* Main Taskbar */}
      <footer
        className="fixed bottom-0 left-0 right-0 h-[48px] bg-[var(--color-taskbar)] retro-border-t z-50 px-2 flex items-center gap-2 select-none"
        style={{ borderColor: "var(--color-border)" }}
      >
        {/* Start Button */}
        <button
          onClick={handleStartToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg retro-border text-xs font-bold transition-transform active:translate-y-0.5 ${
            startMenuOpen
              ? "bg-accent text-ink shadow-none translate-y-0.5"
              : "bg-titlebar text-titlebarText retro-shadow-sm hover:-translate-y-0.5"
          }`}
          aria-label="Start Menu"
        >
          <span className="font-pixel text-[10px]">START</span>
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-[2px] bg-retroBorder opacity-30 mx-1" />

        {/* Open Windows Buttons */}
        <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {openWindowIds.map((id) => {
            const win = windows[id];
            const isActive = activeWindowId === id && !win?.minimized;
            const isMin = win?.minimized;

            return (
              <button
                key={id}
                onClick={() => handleWindowButtonClick(id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg retro-border text-xs max-w-[170px] truncate transition-all ${
                  isActive
                    ? "bg-accent text-ink font-semibold retro-shadow-sm -translate-y-0.5"
                    : isMin
                    ? "bg-surfaceMuted text-ink-muted opacity-75 hover:opacity-100"
                    : "bg-surface text-ink hover:bg-surfaceMuted"
                }`}
                title={win?.title || id}
              >
                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                  {ICON_MAP[id]}
                </div>
                <span className="truncate text-[11px] font-medium">
                  {WINDOW_LABELS[id]}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0" />
                )}
              </button>
            );
          })}

          {openWindowIds.length === 0 && (
            <span className="text-[11px] text-ink-muted font-mono italic px-2">
              (No active windows - Click any desktop icon to open)
            </span>
          )}
        </div>
      </footer>
    </>
  );
};
