"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Square, X, Copy } from "lucide-react";
import { WindowState } from "@/types";
import { useWindowStore } from "@/store/useWindowStore";
import { useSettingsStore } from "@/store/useSettingsStore";

interface WindowProps {
  window: WindowState;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window: win, icon, children }) => {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useWindowStore();

  const { reducedMotion } = useSettingsStore();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  // Drag tracking refs
  const dragStartRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  // Resize tracking refs
  const resizeStartRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origWidth: number;
    origHeight: number;
  } | null>(null);

  // Detect mobile viewport (<768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = activeWindowId === win.id;

  // ==========================================
  // DRAG LOGIC (Pointer Capture & Boundary Clamping)
  // ==========================================
  const handleTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (win.maximized || isMobile) return;
    if ((e.target as HTMLElement).closest("button")) return;

    focusWindow(win.id);

    dragStartRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: win.x,
      origY: win.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handleTitlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current || !isDragging) return;

    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    const topBarHeight = 36;
    const taskbarHeight = 48;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Clamp coordinates so window remains reachable and doesn't get lost
    const minX = 10;
    const maxX = Math.max(10, viewportWidth - 80);
    const minY = topBarHeight;
    const maxY = Math.max(topBarHeight, viewportHeight - taskbarHeight - 40);

    const targetX = Math.min(Math.max(minX, dragStartRef.current.origX + deltaX), maxX);
    const targetY = Math.min(Math.max(minY, dragStartRef.current.origY + deltaY), maxY);

    updateWindowPosition(win.id, targetX, targetY);
  };

  const handleTitlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      try {
        e.currentTarget.releasePointerCapture(dragStartRef.current.pointerId);
      } catch {}
      dragStartRef.current = null;
    }
    setIsDragging(false);
  };

  // ==========================================
  // RESIZE LOGIC (Bottom-Right Corner Handle)
  // ==========================================
  const handleResizePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (win.maximized || isMobile) return;
    e.stopPropagation();

    focusWindow(win.id);

    resizeStartRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origWidth: win.width,
      origHeight: win.height,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsResizing(true);
  };

  const handleResizePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!resizeStartRef.current || !isResizing) return;

    const deltaW = e.clientX - resizeStartRef.current.startX;
    const deltaH = e.clientY - resizeStartRef.current.startY;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const taskbarHeight = 48;

    const maxAllowedWidth = viewportWidth - win.x - 10;
    const maxAllowedHeight = viewportHeight - taskbarHeight - win.y - 10;

    const targetW = Math.min(
      Math.max(win.minWidth, resizeStartRef.current.origWidth + deltaW),
      maxAllowedWidth
    );
    const targetH = Math.min(
      Math.max(win.minHeight, resizeStartRef.current.origHeight + deltaH),
      maxAllowedHeight
    );

    updateWindowSize(win.id, targetW, targetH);
  };

  const handleResizePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (resizeStartRef.current) {
      try {
        e.currentTarget.releasePointerCapture(resizeStartRef.current.pointerId);
      } catch {}
      resizeStartRef.current = null;
    }
    setIsResizing(false);
  };

  // If window is minimized, hide it
  if (win.minimized) {
    return null;
  }

  // Determine window layout geometry
  const windowStyles: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        top: "36px",
        left: 0,
        right: 0,
        bottom: "48px",
        width: "100%",
        height: "calc(100vh - 84px)",
        zIndex: win.z,
      }
    : win.maximized
    ? {
        position: "fixed",
        top: "36px",
        left: 0,
        right: 0,
        bottom: "48px",
        width: "100%",
        height: "calc(100vh - 84px)",
        zIndex: win.z,
      }
    : {
        position: "fixed",
        left: `${win.x}px`,
        top: `${win.y}px`,
        width: `${win.width}px`,
        height: `${win.height}px`,
        zIndex: win.z,
      };

  return (
    <AnimatePresence>
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={windowStyles}
        onMouseDown={() => focusWindow(win.id)}
        className={`flex flex-col bg-surface retro-border overflow-hidden select-none ${
          isMobile || win.maximized ? "rounded-none" : "rounded-xl retro-shadow-lg"
        } ${isActive ? "ring-2 ring-accent/60" : "opacity-95"}`}
      >
        {/* Title Bar */}
        <div
          onPointerDown={handleTitlePointerDown}
          onPointerMove={handleTitlePointerMove}
          onPointerUp={handleTitlePointerUp}
          onDoubleClick={() => !isMobile && toggleMaximizeWindow(win.id)}
          className={`h-9 px-3 flex items-center justify-between retro-border-b cursor-grab active:cursor-grabbing transition-colors ${
            isActive ? "bg-titlebar text-titlebarText" : "bg-surfaceMuted text-ink-muted"
          }`}
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {/* Title and Icon */}
          <div className="flex items-center gap-2 min-w-0 pr-2 pointer-events-none">
            {icon && <div className="w-4 h-4 flex-shrink-0">{icon}</div>}
            <span className="font-pixel text-[10px] sm:text-[11px] font-bold truncate">
              {win.title}
            </span>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Minimize */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              title="Minimize"
              aria-label="Minimize Window"
              className="w-5 h-5 rounded retro-border bg-surface hover:bg-surfaceMuted flex items-center justify-center text-ink active:translate-y-0.5 transition-transform"
            >
              <Minus className="w-3 h-3 stroke-[2.5]" />
            </button>

            {/* Maximize / Restore (Disabled on mobile) */}
            {!isMobile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMaximizeWindow(win.id);
                }}
                title={win.maximized ? "Restore" : "Maximize"}
                aria-label={win.maximized ? "Restore Window" : "Maximize Window"}
                className="w-5 h-5 rounded retro-border bg-surface hover:bg-surfaceMuted flex items-center justify-center text-ink active:translate-y-0.5 transition-transform"
              >
                {win.maximized ? (
                  <Copy className="w-2.5 h-2.5 stroke-[2.5]" />
                ) : (
                  <Square className="w-2.5 h-2.5 stroke-[2.5]" />
                )}
              </button>
            )}

            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
              title="Close"
              aria-label="Close Window"
              className="w-5 h-5 rounded retro-border bg-red-400 hover:bg-red-500 text-white flex items-center justify-center active:translate-y-0.5 transition-transform"
            >
              <X className="w-3 h-3 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Window Content Body */}
        <div className="flex-1 overflow-y-auto bg-surface text-ink p-4 sm:p-5 selectable-text">
          {children}
        </div>

        {/* Status / Resize bar */}
        {!isMobile && !win.maximized && (
          <div className="h-4 bg-surfaceMuted retro-border-t px-2 flex items-center justify-between text-[9px] text-ink-muted font-mono select-none">
            <span className="truncate">Ready • {win.id}.sys</span>
            {/* Resize Grip Handle */}
            <div
              onPointerDown={handleResizePointerDown}
              onPointerMove={handleResizePointerMove}
              onPointerUp={handleResizePointerUp}
              title="Drag to resize"
              className="cursor-nwse-resize w-3.5 h-3.5 flex items-center justify-center -mr-1"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <line x1="6" y1="2" x2="8" y2="0" stroke="currentColor" strokeWidth="1.5" />
                <line x1="4" y1="6" x2="8" y2="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="2" y1="8" x2="8" y2="2" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
