"use client";

import React, { useRef, useState } from "react";
import { WindowId } from "@/types";
import { sound } from "@/lib/sound";
import { useWindowStore } from "@/store/useWindowStore";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onSelect: (id: WindowId) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  icon,
  isSelected,
  onSelect,
}) => {
  const { openWindow } = useWindowStore();
  const lastTouchTimeRef = useRef<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleOpen = () => {
    openWindow(id);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
    sound.playClick();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOpen();
  };

  const handleTouchStart = () => {
    sound.playTouchFeedback();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTouchTimeRef.current < 500) {
      handleOpen();
    } else {
      onSelect(id);
      sound.playClick();
      handleOpen();
    }
    lastTouchTimeRef.current = now;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        setIsHovered(true);
        sound.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer outline-none transition-all duration-150 select-none text-center w-[84px] sm:w-[92px] ${
        isSelected
          ? "bg-[var(--color-selection)] border-2 border-dashed border-ink shadow-sm"
          : "border-2 border-transparent hover:bg-black/5 dark:hover:bg-white/5"
      } ${isHovered ? "-translate-y-1.5" : "translate-y-0"}`}
    >
      {/* Icon with retro shadow bounce on hover */}
      <div
        className={`w-12 h-12 flex items-center justify-center transition-transform duration-150 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`mt-1.5 text-[11px] font-medium leading-tight px-1.5 py-0.5 rounded break-words max-w-[84px] ${
          isSelected
            ? "bg-titlebar text-titlebarText font-bold shadow-sm"
            : "text-ink bg-surface/75 dark:bg-surface/85 backdrop-blur-sm shadow-xs"
        }`}
      >
        {label}
      </span>
    </div>
  );
};
