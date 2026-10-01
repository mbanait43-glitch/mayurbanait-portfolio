"use client";

import React, { useState, useEffect } from "react";
import { WindowId } from "@/types";
import { useWindowStore } from "@/store/useWindowStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { TopBar } from "./TopBar";
import { Taskbar } from "./Taskbar";
import { DesktopIcon } from "./DesktopIcon";
import { ContextMenu } from "./ContextMenu";
import { Mascot } from "@/components/mascot/Mascot";
import { MobileBanner } from "@/components/mobile/MobileBanner";
import { Window } from "@/components/window/Window";

// Window Content components
import { AboutContent } from "@/components/window/content/AboutContent";
import { ExperienceContent } from "@/components/window/content/ExperienceContent";
import { ProjectsContent } from "@/components/window/content/ProjectsContent";
import { SkillsContent } from "@/components/window/content/SkillsContent";
import { CertificatesContent } from "@/components/window/content/CertificatesContent";
import { ResumeContent } from "@/components/window/content/ResumeContent";
import { ContactContent } from "@/components/window/content/ContactContent";
import { FAQContent } from "@/components/window/content/FAQContent";
import { SettingsContent } from "@/components/window/content/SettingsContent";

// Modern SVG icons
import {
  ModernAboutIcon,
  ModernWorkIcon,
  ModernCertificatesIcon,
  ModernContactIcon,
  ModernFaqIcon,
  ModernLinksIcon,
} from "@/components/common/ModernAppIcons";
import {
  ExperienceIcon,
  SkillsIcon,
  ResumeIcon,
  SettingsIcon,
} from "@/components/common/OriginalIcons";

const ICONS_CONFIG: { id: WindowId; label: string; icon: React.ReactNode }[] = [
  { id: "about", label: "About.txt", icon: <ModernAboutIcon size={42} /> },
  { id: "experience", label: "Work.log", icon: <ExperienceIcon size={42} /> },
  { id: "projects", label: "Projects", icon: <ModernWorkIcon size={42} /> },
  { id: "skills", label: "Skills.cfg", icon: <SkillsIcon size={42} /> },
  { id: "certificates", label: "Certificates", icon: <ModernCertificatesIcon size={42} /> },
  { id: "resume", label: "Resume.pdf", icon: <ResumeIcon size={42} /> },
  { id: "contact", label: "Contact.me", icon: <ModernContactIcon size={42} /> },
  { id: "faq", label: "FAQ.hlp", icon: <ModernFaqIcon size={42} /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon size={42} /> },
];

export const Desktop: React.FC = () => {
  const { windows, windowOrder, closeTopWindow, openWindow } = useWindowStore();
  const { wallpaper, initFromStorage } = useSettingsStore();

  const [selectedIconId, setSelectedIconId] = useState<WindowId | null>(null);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);

  // Initialize storage settings & bind global keyboard listeners
  useEffect(() => {
    initFromStorage();

    // Auto-open "about" window on initial load for a welcoming retro desktop impression
    const timer = setTimeout(() => {
      openWindow("about");
    }, 150);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc closes the top window
      if (e.key === "Escape") {
        closeTopWindow();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [initFromStorage, openWindow, closeTopWindow]);

  // Right-click desktop context menu handler
  const handleContextMenu = (e: React.MouseEvent) => {
    // Only trigger if clicked on the desktop background itself
    if ((e.target as HTMLElement).closest(".selectable-text, .retro-button, button, input, textarea")) {
      return;
    }
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
  };

  // Click on empty desktop deselects active desktop icon and closes context menu
  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[role='button'], button, .retro-border")) {
      return;
    }
    setSelectedIconId(null);
    setContextMenuPos(null);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
      className={`fixed inset-0 overflow-hidden select-none wallpaper-${wallpaper} bg-desktop transition-colors duration-250`}
    >
      {/* Top Bar (36px) */}
      <TopBar />

      {/* Mobile Info Banner */}
      <MobileBanner />

      {/* Desktop Main Workspace Area */}
      <main className="absolute top-[36px] bottom-[48px] left-0 right-0 p-3 sm:p-5 overflow-hidden">
        {/* Desktop Icons Grid:
            - Desktop: vertical stack / left column
            - Mobile (<768px): 3-column home-screen grid
        */}
        <div className="grid grid-cols-3 sm:flex sm:flex-col sm:flex-wrap sm:max-h-[calc(100vh-120px)] gap-3 sm:gap-2.5 w-full sm:w-auto items-start justify-items-center sm:justify-items-start z-10 relative">
          {ICONS_CONFIG.map(({ id, label, icon }) => (
            <DesktopIcon
              key={id}
              id={id}
              label={label}
              icon={icon}
              isSelected={selectedIconId === id}
              onSelect={(selectedId) => setSelectedIconId(selectedId)}
            />
          ))}
        </div>

        {/* Windows Rendering (Stacked by z-index) */}
        {windowOrder.map((id) => {
          const win = windows[id];
          if (!win) return null;

          const iconEntry = ICONS_CONFIG.find((i) => i.id === id);

          return (
            <Window key={id} window={win} icon={iconEntry?.icon}>
              {id === "about" && <AboutContent />}
              {id === "experience" && <ExperienceContent />}
              {id === "projects" && <ProjectsContent />}
              {id === "skills" && <SkillsContent />}
              {id === "certificates" && <CertificatesContent />}
              {id === "resume" && <ResumeContent />}
              {id === "contact" && <ContactContent />}
              {id === "faq" && <FAQContent />}
              {id === "settings" && <SettingsContent />}
            </Window>
          );
        })}
      </main>

      {/* Right-click Context Menu */}
      {contextMenuPos && (
        <ContextMenu
          x={contextMenuPos.x}
          y={contextMenuPos.y}
          onClose={() => setContextMenuPos(null)}
        />
      )}

      {/* Animated Desktop Robot Mascot */}
      <Mascot />

      {/* Bottom Taskbar (48px) */}
      <Taskbar />
    </div>
  );
};
