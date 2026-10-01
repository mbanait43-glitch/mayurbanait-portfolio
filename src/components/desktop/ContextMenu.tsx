"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useWindowStore } from "@/store/useWindowStore";
import { sound } from "@/lib/sound";
import { WallpaperPattern } from "@/types";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const { theme, setTheme } = useTheme();
  const { wallpaper, setWallpaper } = useSettingsStore();
  const { openWindow } = useWindowStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or scroll or Esc
  useEffect(() => {
    const handleDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Clamp menu inside viewport
  const menuWidth = 210;
  const menuHeight = 230;
  const clampedX = Math.min(x, typeof window !== "undefined" ? window.innerWidth - menuWidth - 10 : x);
  const clampedY = Math.min(y, typeof window !== "undefined" ? window.innerHeight - menuHeight - 50 : y);

  const handleSelectWallpaper = (pat: WallpaperPattern) => {
    setWallpaper(pat);
    onClose();
  };

  const handleToggleTheme = () => {
    sound.playToggle();
    setTheme(theme === "dark" ? "light" : "dark");
    onClose();
  };

  const handleOpenAbout = () => {
    openWindow("about");
    onClose();
  };

  const handleOpenSettings = () => {
    openWindow("settings");
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{ left: `${clampedX}px`, top: `${clampedY}px` }}
      className="fixed z-50 w-52 bg-surface retro-border retro-shadow-lg rounded-xl py-1.5 text-xs text-ink select-none font-medium animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-1 font-pixel text-[9px] text-ink-muted border-b border-retroBorder/20 tracking-wider">
        DESKTOP MENU
      </div>

      {/* Wallpaper submenu / choices */}
      <div className="py-1">
        <div className="px-3 py-1 text-[10px] text-ink-muted uppercase tracking-wider font-mono">
          Wallpaper Pattern
        </div>
        {(["dots", "grid", "plain"] as WallpaperPattern[]).map((pat) => (
          <button
            key={pat}
            onClick={() => handleSelectWallpaper(pat)}
            className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-surfaceMuted text-left transition-colors"
          >
            <span className="capitalize">{pat}</span>
            {wallpaper === pat && <span className="text-accent font-bold">✓</span>}
          </button>
        ))}
      </div>

      <div className="h-[1px] bg-retroBorder/20 my-1" />

      {/* Theme toggle */}
      <button
        onClick={handleToggleTheme}
        className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-surfaceMuted text-left transition-colors"
      >
        <span>Toggle Theme</span>
        <span className="text-[10px] text-ink-muted font-mono capitalize">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
      </button>

      {/* Settings */}
      <button
        onClick={handleOpenSettings}
        className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-surfaceMuted text-left transition-colors"
      >
        <span>System Settings</span>
        <span className="text-[10px] text-ink-muted font-mono">.ini</span>
      </button>

      {/* About this site */}
      <button
        onClick={handleOpenAbout}
        className="w-full px-3 py-1.5 flex items-center justify-between hover:bg-surfaceMuted text-left transition-colors"
      >
        <span>About This Portfolio</span>
        <span className="text-[10px] text-accent font-bold font-mono">v1.0</span>
      </button>
    </div>
  );
};
