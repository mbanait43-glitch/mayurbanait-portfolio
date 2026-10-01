import { create } from "zustand";
import { WallpaperPattern } from "@/types";
import { sound } from "@/lib/sound";

interface SettingsStore {
  soundEnabled: boolean;
  mascotEnabled: boolean;
  wallpaper: WallpaperPattern;
  reducedMotion: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  setMascotEnabled: (enabled: boolean) => void;
  toggleMascot: () => void;
  setWallpaper: (pattern: WallpaperPattern) => void;
  setReducedMotion: (enabled: boolean) => void;
  initFromStorage: () => void;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  soundEnabled: true,
  mascotEnabled: true,
  wallpaper: "dots",
  reducedMotion: false,

  setSoundEnabled: (enabled: boolean) => {
    sound.setMuted(!enabled);
    set({ soundEnabled: enabled });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mayur_sound_enabled", String(enabled));
      } catch {}
    }
  },

  toggleSound: () => {
    const next = !get().soundEnabled;
    get().setSoundEnabled(next);
    if (next) sound.playToggle();
  },

  setMascotEnabled: (enabled: boolean) => {
    set({ mascotEnabled: enabled });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mayur_mascot_enabled", String(enabled));
      } catch {}
    }
  },

  toggleMascot: () => {
    const next = !get().mascotEnabled;
    get().setMascotEnabled(next);
    sound.playToggle();
  },

  setWallpaper: (pattern: WallpaperPattern) => {
    set({ wallpaper: pattern });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mayur_wallpaper", pattern);
      } catch {}
    }
    sound.playClick();
  },

  setReducedMotion: (enabled: boolean) => {
    set({ reducedMotion: enabled });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mayur_reduced_motion", String(enabled));
      } catch {}
    }
    sound.playToggle();
  },

  initFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const soundVal = localStorage.getItem("mayur_sound_enabled");
      const mascotVal = localStorage.getItem("mayur_mascot_enabled");
      const wallVal = localStorage.getItem("mayur_wallpaper") as WallpaperPattern;
      const motionVal = localStorage.getItem("mayur_reduced_motion");

      // Check system reduced motion
      const prefersReduced =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const isSound = soundVal !== null ? soundVal === "true" : true;
      const isMascot = mascotVal !== null ? mascotVal === "true" : true;
      const wall = wallVal && ["dots", "grid", "plain"].includes(wallVal) ? wallVal : "dots";
      const isReduced = motionVal !== null ? motionVal === "true" : prefersReduced;

      sound.setMuted(!isSound);

      set({
        soundEnabled: isSound,
        mascotEnabled: isMascot,
        wallpaper: wall,
        reducedMotion: isReduced,
      });
    } catch {}
  },
}));
