import { create } from "zustand";
import { WindowId, WindowState } from "@/types";
import { sound } from "@/lib/sound";

interface WindowStore {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  windowOrder: WindowId[]; // Ordered by z-index (lowest to highest)
  cascadeIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, x: number, y: number) => void;
  updateWindowSize: (id: WindowId, width: number, height: number) => void;
  closeTopWindow: () => void;
  isOpen: (id: WindowId) => boolean;
}

const DEFAULT_WINDOWS_CONFIG: Record<
  WindowId,
  { title: string; defaultWidth: number; defaultHeight: number }
> = {
  about: { title: "About_Mayur.txt", defaultWidth: 680, defaultHeight: 520 },
  experience: { title: "Work_Experience.log", defaultWidth: 640, defaultHeight: 480 },
  projects: { title: "Projects_Explorer.exe", defaultWidth: 760, defaultHeight: 540 },
  skills: { title: "Skills_Matrix.cfg", defaultWidth: 700, defaultHeight: 520 },
  certificates: { title: "Certificates_&_DSA.dat", defaultWidth: 620, defaultHeight: 480 },
  resume: { title: "Resume_Viewer.pdf", defaultWidth: 660, defaultHeight: 520 },
  contact: { title: "Direct_Message.com", defaultWidth: 580, defaultHeight: 520 },
  faq: { title: "Frequently_Asked_Q.hlp", defaultWidth: 620, defaultHeight: 480 },
  settings: { title: "System_Settings.ini", defaultWidth: 500, defaultHeight: 440 },
};

// Calculate initial spawn position with 28px cascade
function calculateSpawnPosition(
  cascadeCount: number,
  width: number,
  height: number
): { x: number; y: number } {
  if (typeof window === "undefined") {
    return { x: 100, y: 80 };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const topBarHeight = 36;
  const taskbarHeight = 48;
  const availableHeight = viewportHeight - topBarHeight - taskbarHeight;

  // Mobile fallback
  if (viewportWidth < 768) {
    return { x: 0, y: topBarHeight };
  }

  // Base spawn coordinates
  const baseX = Math.max(20, Math.floor((viewportWidth - width) / 2) - 100);
  const baseY = Math.max(topBarHeight + 20, Math.floor((availableHeight - height) / 2));

  const offset = (cascadeCount % 8) * 28;
  let targetX = baseX + offset;
  let targetY = baseY + offset;

  // Guard: Never spawn off-screen
  if (targetX + width > viewportWidth - 20) {
    targetX = Math.max(20, viewportWidth - width - 20);
  }
  if (targetY + height > viewportHeight - taskbarHeight - 20) {
    targetY = Math.max(topBarHeight + 10, viewportHeight - taskbarHeight - height - 10);
  }

  return { x: Math.max(10, targetX), y: Math.max(topBarHeight + 5, targetY) };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {} as Record<WindowId, WindowState>,
  activeWindowId: null,
  windowOrder: [],
  cascadeIndex: 0,

  openWindow: (id: WindowId) => {
    const state = get();
    const existing = state.windows[id];

    if (existing) {
      // Already open: restore if minimized and focus
      sound.playWindowOpen();
      const newOrder = state.windowOrder.filter((wId) => wId !== id).concat(id);
      set({
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            minimized: false,
            z: newOrder.length + 10,
          },
        },
        activeWindowId: id,
        windowOrder: newOrder,
      });
      return;
    }

    // New window spawn
    const config = DEFAULT_WINDOWS_CONFIG[id];
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const initialWidth = isMobile
      ? typeof window !== "undefined"
        ? window.innerWidth
        : 360
      : Math.min(
          config.defaultWidth,
          typeof window !== "undefined" ? window.innerWidth - 40 : config.defaultWidth
        );
    const initialHeight = isMobile
      ? typeof window !== "undefined"
        ? window.innerHeight - 84
        : 500
      : Math.min(
          config.defaultHeight,
          typeof window !== "undefined" ? window.innerHeight - 120 : config.defaultHeight
        );

    const { x, y } = calculateSpawnPosition(state.cascadeIndex, initialWidth, initialHeight);
    const newOrder = [...state.windowOrder, id];
    const newZ = newOrder.length + 10;

    sound.playWindowOpen();

    set({
      windows: {
        ...state.windows,
        [id]: {
          id,
          title: config.title,
          x,
          y,
          width: initialWidth,
          height: initialHeight,
          minWidth: 320,
          minHeight: 240,
          z: newZ,
          minimized: false,
          maximized: false,
        },
      },
      activeWindowId: id,
      windowOrder: newOrder,
      cascadeIndex: state.cascadeIndex + 1,
    });
  },

  closeWindow: (id: WindowId) => {
    const state = get();
    if (!state.windows[id]) return;

    sound.playWindowClose();

    const newWindows = { ...state.windows };
    delete newWindows[id];

    const newOrder = state.windowOrder.filter((wId) => wId !== id);
    const nextActive = newOrder.length > 0 ? newOrder[newOrder.length - 1] : null;

    set({
      windows: newWindows,
      windowOrder: newOrder,
      activeWindowId: nextActive,
    });
  },

  minimizeWindow: (id: WindowId) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    sound.playMinimize();

    const newWindows = {
      ...state.windows,
      [id]: { ...win, minimized: true },
    };

    // Active window becomes top visible window
    const visibleOrder = state.windowOrder.filter(
      (wId) => wId !== id && !newWindows[wId]?.minimized
    );
    const nextActive = visibleOrder.length > 0 ? visibleOrder[visibleOrder.length - 1] : null;

    set({
      windows: newWindows,
      activeWindowId: nextActive,
    });
  },

  toggleMaximizeWindow: (id: WindowId) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    sound.playToggle();

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          maximized: !win.maximized,
          minimized: false,
        },
      },
      activeWindowId: id,
    });
  },

  focusWindow: (id: WindowId) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    if (state.activeWindowId === id && !win.minimized) {
      return; // Already focused
    }

    const newOrder = state.windowOrder.filter((wId) => wId !== id).concat(id);

    // Reassign Z levels
    const updatedWindows = { ...state.windows };
    newOrder.forEach((wId, idx) => {
      if (updatedWindows[wId]) {
        updatedWindows[wId] = {
          ...updatedWindows[wId],
          z: idx + 10,
          minimized: wId === id ? false : updatedWindows[wId].minimized,
        };
      }
    });

    set({
      windows: updatedWindows,
      windowOrder: newOrder,
      activeWindowId: id,
    });
  },

  updateWindowPosition: (id: WindowId, x: number, y: number) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    set({
      windows: {
        ...state.windows,
        [id]: { ...win, x, y },
      },
    });
  },

  updateWindowSize: (id: WindowId, width: number, height: number) => {
    const state = get();
    const win = state.windows[id];
    if (!win) return;

    set({
      windows: {
        ...state.windows,
        [id]: {
          ...win,
          width: Math.max(win.minWidth, width),
          height: Math.max(win.minHeight, height),
        },
      },
    });
  },

  closeTopWindow: () => {
    const state = get();
    // Find topmost un-minimized window
    const visibleOrder = state.windowOrder.filter((wId) => !state.windows[wId]?.minimized);
    if (visibleOrder.length === 0) return;
    const topId = visibleOrder[visibleOrder.length - 1];
    state.closeWindow(topId);
  },

  isOpen: (id: WindowId) => {
    return Boolean(get().windows[id]);
  },
}));
