"use client";

import React, { useState, useEffect } from "react";
import { Monitor, X } from "lucide-react";

export const MobileBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only show on screens under 768px if not previously dismissed in session
    const isMobile = window.innerWidth < 768;
    const dismissed = sessionStorage.getItem("mayur_mobile_banner_dismissed");
    if (isMobile && !dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("mayur_mobile_banner_dismissed", "true");
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="fixed top-11 left-3 right-3 z-50 p-3 rounded-xl bg-titlebar text-titlebarText retro-border retro-shadow-sm flex items-start gap-2.5 animate-fade-in text-xs">
      <Monitor className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 pr-1 leading-snug">
        <span className="font-bold">Welcome!</span> Best experienced on desktop for draggable windows and sounds, but feel free to explore!
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss banner"
        className="w-5 h-5 rounded retro-border bg-surface text-ink flex items-center justify-center hover:bg-surfaceMuted flex-shrink-0"
      >
        <X className="w-3 h-3 stroke-[2.5]" />
      </button>
    </div>
  );
};
