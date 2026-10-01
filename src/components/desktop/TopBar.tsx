"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Volume2, VolumeX, Sun, Moon } from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { sound } from "@/lib/sound";

export const TopBar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { soundEnabled, toggleSound } = useSettingsStore();

  const [mounted, setMounted] = useState<boolean>(false);
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    sound.playToggle();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 h-[36px] bg-[var(--color-topbar)] retro-border-b z-50 px-3 flex items-center justify-between text-xs select-none"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Left: Brand / System info */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 font-pixel text-[11px] font-bold tracking-wider text-ink">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
          <span>mayur.exe</span>
        </div>
        <span className="hidden sm:inline-block text-[10px] text-ink-muted px-1.5 py-0.5 rounded bg-surfaceMuted retro-border text-[9px] font-mono">
          v1.0.4-release
        </span>
      </div>

      {/* Center: System Status */}
      <div className="hidden md:flex items-center gap-2 text-ink-muted font-mono text-[11px]">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span>STATUS: OPEN FOR OPPORTUNITIES</span>
      </div>

      {/* Right Controls: Sound, Theme, Live Clock */}
      <div className="flex items-center gap-2">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
          aria-label={soundEnabled ? "Mute sounds" : "Unmute sounds"}
          className="p-1 rounded retro-border bg-surface hover:bg-surfaceMuted active:translate-y-0.5 transition-transform text-ink flex items-center justify-center"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-red-500" />
          )}
        </button>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={handleThemeToggle}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Color Theme"
            className="p-1 rounded retro-border bg-surface hover:bg-surfaceMuted active:translate-y-0.5 transition-transform text-ink flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-indigo-700" />
            )}
          </button>
        )}

        {/* Live Clock */}
        <div className="px-2 py-0.5 rounded retro-border bg-surfaceMuted font-mono text-[11px] font-medium text-ink min-w-[85px] text-center">
          {timeStr || "--:--:--"}
        </div>
      </div>
    </header>
  );
};
