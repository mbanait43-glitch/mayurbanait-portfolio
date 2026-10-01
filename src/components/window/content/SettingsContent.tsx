"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Sliders, Sun, Moon, Volume2, VolumeX, Bot, Sparkles, Image as ImageIcon } from "lucide-react";
import { WallpaperPattern } from "@/types";

export const SettingsContent: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const {
    soundEnabled,
    toggleSound,
    mascotEnabled,
    toggleMascot,
    wallpaper,
    setWallpaper,
    reducedMotion,
    setReducedMotion,
  } = useSettingsStore();

  const wallpaperOptions: { id: WallpaperPattern; label: string; desc: string }[] = [
    { id: "dots", label: "Dotted Grid", desc: "Classic retro desktop dot matrix" },
    { id: "grid", label: "Blueprint Grid", desc: "Architectural line graph grid" },
    { id: "plain", label: "Solid Minimal", desc: "Clean uninterrupted backdrop" },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto text-xs text-ink">
      <div className="flex items-center justify-between pb-2 border-b border-retroBorder/20">
        <div>
          <h2 className="font-pixel text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
            <Sliders className="w-4 h-4 text-accent" /> Desktop Customization
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Configure visual appearance, sound effects, mascot, and animations
          </p>
        </div>
        <span className="font-mono text-[10px] text-ink-muted">config.sys</span>
      </div>

      {/* Theme Selection */}
      <div className="p-4 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            {theme === "dark" ? (
              <Moon className="w-4 h-4 text-accent" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-500" />
            )}
            <span>Color Palette Mode</span>
          </div>
          <span className="text-[10px] font-mono text-ink-muted capitalize">
            {theme} Mode
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => setTheme("light")}
            className={`p-2.5 rounded-lg retro-border font-bold flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 ${
              theme === "light"
                ? "bg-accent text-ink retro-shadow-sm"
                : "bg-surface text-ink hover:bg-surfaceMuted"
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light Palette</span>
          </button>

          <button
            onClick={() => setTheme("dark")}
            className={`p-2.5 rounded-lg retro-border font-bold flex items-center justify-center gap-2 transition-transform active:translate-y-0.5 ${
              theme === "dark"
                ? "bg-accent text-ink retro-shadow-sm"
                : "bg-surface text-ink hover:bg-surfaceMuted"
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark Indigo</span>
          </button>
        </div>
      </div>

      {/* Wallpaper Pattern Selector */}
      <div className="p-4 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <ImageIcon className="w-4 h-4 text-accent" />
            <span>Desktop Background Pattern</span>
          </div>
          <span className="text-[10px] font-mono text-ink-muted uppercase">
            {wallpaper}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {wallpaperOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setWallpaper(opt.id)}
              className={`p-3 rounded-lg retro-border text-left space-y-1 transition-transform active:translate-y-0.5 ${
                wallpaper === opt.id
                  ? "bg-accent text-ink retro-shadow-sm"
                  : "bg-surface text-ink hover:bg-surfaceMuted"
              }`}
            >
              <div className="font-bold text-xs flex items-center justify-between">
                <span>{opt.label}</span>
                {wallpaper === opt.id && <span className="font-bold">✓</span>}
              </div>
              <div className="text-[10px] text-ink-muted leading-tight">
                {opt.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles: Sound, Mascot, Reduced Motion */}
      <div className="p-4 rounded-xl bg-surfaceMuted retro-border retro-shadow-sm space-y-3">
        <div className="font-bold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Interactive Preferences</span>
        </div>

        {/* Audio Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface retro-border">
          <div className="flex items-center gap-2">
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-accent-hover" />
            ) : (
              <VolumeX className="w-4 h-4 text-red-500" />
            )}
            <div>
              <div className="font-bold text-xs">Web Audio Sound Effects</div>
              <div className="text-[10px] text-ink-muted">Synthesized 8-bit oscillator beeps</div>
            </div>
          </div>
          <button
            onClick={toggleSound}
            className={`px-3 py-1 rounded-md retro-border text-[11px] font-bold ${
              soundEnabled ? "bg-accent text-ink" : "bg-surfaceMuted text-ink-muted"
            }`}
          >
            {soundEnabled ? "ENABLED" : "MUTED"}
          </button>
        </div>

        {/* Mascot Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface retro-border">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-accent-hover" />
            <div>
              <div className="font-bold text-xs">Desktop Pixel Robot Mascot</div>
              <div className="text-[10px] text-ink-muted">Charming interactive assistant on taskbar</div>
            </div>
          </div>
          <button
            onClick={toggleMascot}
            className={`px-3 py-1 rounded-md retro-border text-[11px] font-bold ${
              mascotEnabled ? "bg-accent text-ink" : "bg-surfaceMuted text-ink-muted"
            }`}
          >
            {mascotEnabled ? "ACTIVE" : "OFF"}
          </button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface retro-border">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-accent-hover" />
            <div>
              <div className="font-bold text-xs">Reduced Motion</div>
              <div className="text-[10px] text-ink-muted">Disable window scaling animations</div>
            </div>
          </div>
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1 rounded-md retro-border text-[11px] font-bold ${
              reducedMotion ? "bg-accent text-ink" : "bg-surfaceMuted text-ink-muted"
            }`}
          >
            {reducedMotion ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
};
