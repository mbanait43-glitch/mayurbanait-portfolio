"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  X,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";
import { sound } from "@/lib/sound";
import { useSettingsStore } from "@/store/useSettingsStore";
import { PortfolioCertificatesIcon } from "@/components/common/PortfolioIcons";

// Content Components for the secondary window
import { AboutContent } from "@/components/window/content/AboutContent";
import { LinksContent } from "@/components/window/content/LinksContent";
import { ProjectsContent } from "@/components/window/content/ProjectsContent";
import { CertificatesContent } from "@/components/window/content/CertificatesContent";
import { ContactContent } from "@/components/window/content/ContactContent";
import { FAQContent } from "@/components/window/content/FAQContent";

type WindowTabId = "about" | "links" | "work" | "certificates" | "faq" | "contact";

interface NavItemConfig {
  id: WindowTabId;
  label: string;
  imgLight?: string;
  imgDark?: string;
  icon?: React.ReactNode;
}

// Original 6 launcher icons exactly as requested by user
const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "about",
    label: "about",
    imgLight: "/images/icon_about.webp",
    imgDark: "/images/icon_about_dark.webp",
  },
  {
    id: "links",
    label: "links",
    imgLight: "/images/icon_links.webp",
    imgDark: "/images/icon_links_dark.webp",
  },
  {
    id: "work",
    label: "work",
    imgLight: "/images/icon_work.webp",
    imgDark: "/images/icon_work_dark.webp",
  },
  {
    id: "certificates",
    label: "certificates",
    icon: (
      <PortfolioCertificatesIcon
        size={48}
        className="text-[#383c44] dark:text-amber-400 drop-shadow-flat transition-transform"
      />
    ),
  },
  {
    id: "faq",
    label: "faq",
    imgLight: "/images/icon_faq.webp",
    imgDark: "/images/icon_faq_dark.webp",
  },
  {
    id: "contact",
    label: "contact",
    imgLight: "/images/icon_contact.webp",
    imgDark: "/images/icon_contact_dark.webp",
  },
];

const STAR_HOVER_QUOTES = [
  "enjoy & have fun! ⭐",
  "welcome to my desktop! 🌟",
  "hope you have a wonderful day! ✨",
  "glad to see you here! 💡",
];

const STAR_CLICK_QUOTES = [
  "Hi! I'm Starry! ⭐",
  "Welcome to Mayur's desktop! ✨",
  "Mayur writes clean, robust code!",
  "100+ DSA problems solved! 💡",
  "React.js & Spring Boot ready! 🚀",
  "Full-Stack Developer from SISTec-R!",
];

const FROG_SWEET_MESSAGES_PLAY = [
  "Ribbit! Enjoy the cozy tunes! 🎵☕",
  "Playing sweet melodies for you! 🎶🐸",
  "Relax and enjoy Mayur's portfolio! 🌸✨",
  "Cozy music time! Hope you love it! 🎵💚",
  "Ribbit! Let the rhythm brighten your day! 🎶⭐",
];

const FROG_SWEET_MESSAGES_PAUSE = [
  "Music paused ⏸️ Touch me anytime to play! 🐸",
  "Quiet mode on! Touch me to bring music back! 🎵",
  "Ribbit! Resting for a bit. Touch to play! 🌿",
];

export const PortfolioDesktop: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { soundEnabled, toggleSound, initFromStorage } = useSettingsStore();

  const [mounted, setMounted] = useState<boolean>(false);

  // Active secondary window that opens on top/side of the home box
  const [activeWindow, setActiveWindow] = useState<WindowTabId | null>(null);

  // Background Music state
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);

  // Star Mascot States (Click + Hover quotes in a single top speech bubble)
  const [isStarHovered, setIsStarHovered] = useState<boolean>(false);
  const [starSpeechQuote, setStarSpeechQuote] = useState<string | null>(null);
  const [isStarSpinning, setIsStarSpinning] = useState<boolean>(false);

  // Frog Mascot States (Jump + sweet messages on touch/click)
  const [frogQuote, setFrogQuote] = useState<string | null>(null);
  const [isFrogJumping, setIsFrogJumping] = useState<boolean>(false);

  const starTimerRef = useRef<NodeJS.Timeout | null>(null);
  const starIndexRef = useRef<number>(0);
  const starHoverIndexRef = useRef<number>(0);

  const frogTimerRef = useRef<NodeJS.Timeout | null>(null);
  const frogLockRef = useRef<boolean>(false);
  const frogPlayIndexRef = useRef<number>(0);
  const frogPauseIndexRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    initFromStorage();

    // Subscribe to BGM state changes
    const unsub = sound.subscribeBgm((playing) => {
      setIsBgmPlaying(playing);
    });

    return () => unsub();
  }, [initFromStorage]);

  // Close active window on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeWindow) {
        handleCloseWindow();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeWindow]);

  // Handle Theme Toggle with authentic sound effects
  const handleThemeToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "light") {
      sound.playLightMode();
    } else {
      sound.playDarkMode();
    }
    setTheme(nextTheme);
  };

  // Handle SFX Toggle
  const handleSfxToggle = () => {
    sound.playClickSfx();
    toggleSound();
  };

  // Open secondary window instantly with sound
  const handleOpenWindow = (tab: WindowTabId) => {
    sound.playOpen();
    setActiveWindow(tab);
  };

  // Close secondary window instantly with sound
  const handleCloseWindow = () => {
    sound.playClickClose();
    setActiveWindow(null);
  };

  // Star Mascot Hover: plays sound and triggers wiggle
  const handleStarMouseEnter = () => {
    sound.playStar();
    setIsStarHovered(true);
    if (!starSpeechQuote) {
      const caption = STAR_HOVER_QUOTES[starHoverIndexRef.current % STAR_HOVER_QUOTES.length];
      starHoverIndexRef.current += 1;
      setStarSpeechQuote(caption);
    }
  };

  const handleStarMouseLeave = () => {
    setIsStarHovered(false);
    if (starTimerRef.current) clearTimeout(starTimerRef.current);
    starTimerRef.current = setTimeout(() => {
      setStarSpeechQuote(null);
    }, 1200);
  };

  // Star Mascot Click / Tap: spins 360 and speaks a fun quote in the TOP bubble
  const handleStarClick = () => {
    sound.playStar();
    setIsStarSpinning(true);
    setTimeout(() => setIsStarSpinning(false), 600);

    const quote = STAR_CLICK_QUOTES[starIndexRef.current % STAR_CLICK_QUOTES.length];
    starIndexRef.current += 1;
    setStarSpeechQuote(quote);

    if (starTimerRef.current) clearTimeout(starTimerRef.current);
    starTimerRef.current = setTimeout(() => {
      setStarSpeechQuote(null);
    }, 3800);
  };

  // Frog Mascot Hover Sound & Teaser
  const handleFrogMouseEnter = () => {
    sound.playFrogHover();
    if (!frogQuote && !isBgmPlaying) {
      setFrogQuote("Ribbit! Touch me for music! 🎵");
      if (frogTimerRef.current) clearTimeout(frogTimerRef.current);
      frogTimerRef.current = setTimeout(() => {
        setFrogQuote(null);
      }, 2500);
    }
  };

  // Frog Mascot Click / Touch: Toggles Background Music reliably with debounce
  const handleFrogClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    // Prevent double-trigger on mobile devices
    if (frogLockRef.current) return;
    frogLockRef.current = true;
    setTimeout(() => {
      frogLockRef.current = false;
    }, 350);

    sound.playFrogHover();
    const isNowPlaying = sound.toggleBgm();
    setIsFrogJumping(true);
    setTimeout(() => setIsFrogJumping(false), 500);

    if (isNowPlaying) {
      const msg =
        FROG_SWEET_MESSAGES_PLAY[
          frogPlayIndexRef.current % FROG_SWEET_MESSAGES_PLAY.length
        ];
      frogPlayIndexRef.current += 1;
      setFrogQuote(msg);
    } else {
      const msg =
        FROG_SWEET_MESSAGES_PAUSE[
          frogPauseIndexRef.current % FROG_SWEET_MESSAGES_PAUSE.length
        ];
      frogPauseIndexRef.current += 1;
      setFrogQuote(msg);
    }

    if (frogTimerRef.current) clearTimeout(frogTimerRef.current);
    frogTimerRef.current = setTimeout(() => {
      setFrogQuote(null);
    }, 4500);
  };

  const { profile } = PORTFOLIO_DATA;
  const isDark = mounted && theme === "dark";

  return (
    <div className="fixed inset-0 w-screen h-[100dvh] overflow-x-hidden overflow-y-auto bg-white dark:bg-[#181b22] text-slate-800 dark:text-slate-100 select-none transition-colors duration-250 flex flex-col justify-between">
      {/* ============================================================ */}
      {/* 1. TOP-LEFT CONTROLS (Theme & SFX using official assets)    */}
      {/* ============================================================ */}
      <nav className="fixed top-3 left-3 z-50 flex items-center p-2">
        {/* Theme Toggle Button */}
        {mounted && (
          <button
            type="button"
            onClick={handleThemeToggle}
            onTouchStart={() => sound.playTouchFeedback()}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle theme"
            className="p-1 duration-200 hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
          >
            <Image
              src={isDark ? "/images/dark_mode_dark.webp" : "/images/dark_mode_light.webp"}
              alt="dark mode toggle"
              width={34}
              height={34}
              draggable={false}
              priority
              className="drop-shadow-sm"
            />
          </button>
        )}

        {/* SFX Audio Toggle Button */}
        <button
          type="button"
          onClick={handleSfxToggle}
          onTouchStart={() => sound.playTouchFeedback()}
          title={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
          aria-label="Toggle sound"
          className="p-1 duration-200 hover:scale-110 active:scale-90 cursor-pointer focus:outline-none"
        >
          <Image
            src={
              soundEnabled
                ? isDark
                  ? "/images/sfx_on_dark.webp"
                  : "/images/sfx_on_light.webp"
                : isDark
                ? "/images/sfx_off_dark.webp"
                : "/images/sfx_off_light.webp"
            }
            alt="sfx toggle"
            width={34}
            height={34}
            draggable={false}
            priority
            className="drop-shadow-sm"
          />
        </button>
      </nav>

      {/* ============================================================ */}
      {/* 2. MAIN WORKSPACE WITH CENTRAL HOME BOX (RESPONSIVE & CLEAN) */}
      {/* ============================================================ */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 sm:px-6 pt-10 pb-6 sm:py-14 my-auto w-full">
        <div className="relative w-full max-w-[580px] sm:max-w-[680px] md:max-w-[720px]">
          {/* ======================================================== */}
          {/* STAR MASCOT: PROPERLY ARRANGED & SCALED (NO BOTTOM BUBBLE)*/}
          {/* ======================================================== */}
          <div className="absolute -top-10 sm:-top-16 -left-1 sm:left-2 z-40 group pointer-events-auto">
            {/* Star Speech Bubble: RIGHT side on Mobile (< sm), ABOVE star on Desktop (sm: and up) */}
            <AnimatePresence>
              {starSpeechQuote && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-1 sm:top-auto sm:-top-14 left-[50px] sm:left-1 whitespace-nowrap px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-400 dark:border-amber-500 shadow-2xl text-[11px] sm:text-xs font-mono font-bold text-amber-900 dark:text-amber-100 pointer-events-none z-50 select-none animate-bounce-subtle"
                >
                  <span>{starSpeechQuote}</span>
                  {/* Mobile pointer: points LEFT towards star (< sm) */}
                  <div className="sm:hidden absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-l-2 border-b-2 border-amber-400 dark:border-amber-500 rotate-45" />

                  {/* Desktop pointer: points DOWN (V shape) at user's red mark directly above star head */}
                  <div className="hidden sm:block absolute -bottom-1.5 left-6 sm:left-7 w-3.5 h-3.5 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-amber-400 dark:border-amber-500 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Star Button with Hover Wiggle & Click Spin (No ugly browser tooltip) */}
            <button
              type="button"
              onMouseEnter={handleStarMouseEnter}
              onMouseLeave={handleStarMouseLeave}
              onClick={handleStarClick}
              style={{ touchAction: "manipulation" }}
              className="flex flex-col items-center cursor-pointer focus:outline-none select-none"
              aria-label="Star mascot"
            >
              <div
                className={`transition-transform duration-300 ${
                  isStarSpinning
                    ? "rotate-[360deg] scale-125 duration-600"
                    : isStarHovered
                    ? "animate-star-wiggle"
                    : "animate-bobbing"
                }`}
              >
                <Image
                  src={isDark ? "/images/icon_star_dark.webp" : "/images/icon_star.webp"}
                  alt="star mascot"
                  width={72}
                  height={72}
                  draggable={false}
                  priority
                  className="drop-shadow-md select-none w-[44px] h-[44px] sm:w-[72px] sm:h-[72px]"
                />
              </div>
            </button>
          </div>

          {/* ======================================================== */}
          {/* THE HOME BOX (EXACT ORIGINAL BOX & ORIGINAL ICONS)       */}
          {/* ======================================================== */}
          <div className="rounded-2xl overflow-hidden box-shadow-card bg-white dark:bg-[#1e232b] border border-slate-200/90 dark:border-slate-700/90">
            {/* Dark Title Bar: "home" on left (with left padding to avoid star overlap) and 3 retro OS window control dots */}
            <div
              onClick={activeWindow ? handleCloseWindow : undefined}
              className={`bg-[#383c44] dark:bg-[#22262e] text-white pl-12 sm:pl-16 pr-5 sm:pr-6 py-2.5 sm:py-3.5 select-none flex items-center justify-between transition-colors ${
                activeWindow ? "cursor-pointer hover:bg-[#434852]" : ""
              }`}
              title={activeWindow ? "Click to bring home to front" : undefined}
            >
              <span className="font-mono text-base sm:text-lg font-bold tracking-wide">
                home
              </span>

              {/* Retro OS window control dots (Red, Yellow, Green) */}
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm transition-transform hover:scale-125"
                  title="Close"
                />
                <span
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm transition-transform hover:scale-125"
                  title="Minimize"
                />
                <span
                  className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm transition-transform hover:scale-125"
                  title="Maximize"
                />
              </div>
            </div>

            {/* White Body with Greeting, Subtitle, Resume Button, and 6 Original Icons directly on card */}
            <div className="p-6 sm:p-10 md:p-12 flex flex-col items-center text-center">
              {/* Heading */}
              <h1 className="text-3xl sm:text-5xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-1 sm:mb-2">
                Hi 👋{" "}
                <span className="text-[#f59e0b] dark:text-[#f59e0b]">
                  i&apos;m Mayur
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base font-normal mb-3 sm:mb-4 max-w-[360px] sm:max-w-md">
                full-stack developer, software engineer, and problem solver
              </p>

              {/* Clean "View Resume / CV" pill button */}
              <a
                href={profile.links.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                onTouchStart={() => sound.playTouchFeedback()}
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 mb-4 sm:mb-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-mono text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow group"
                title="Open Mayur's Resume in a new tab"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>View Resume / CV</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
              </a>

              {/* 6 Original Icons directly on card: strictly forward Sa-Re-Ga-Ma progression */}
              <div className="grid grid-cols-3 sm:flex sm:flex-row justify-center items-center gap-3 sm:gap-7 md:gap-8 pt-1 sm:pt-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => sound.playSkillHover()}
                    onTouchStart={() => sound.playSkillHover()}
                    onClick={() => handleOpenWindow(item.id)}
                    className="flex flex-col items-center duration-200 cursor-pointer hover:scale-110 active:scale-90 focus:outline-none group p-1.5 sm:p-2 rounded-lg"
                    title={`Open ${item.label}`}
                  >
                    {item.icon ? (
                      <div className="w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] flex items-center justify-center">
                        {item.icon}
                      </div>
                    ) : (
                      <Image
                        src={(isDark ? item.imgDark : item.imgLight) || "/images/icon_work.webp"}
                        alt={item.label}
                        width={56}
                        height={56}
                        draggable={false}
                        className="drop-shadow-flat select-none w-[46px] h-[46px] sm:w-[56px] sm:h-[56px]"
                      />
                    )}
                    <span className="font-mono text-center text-slate-500 dark:text-slate-400 font-bold text-[11px] sm:text-sm mt-1.5 sm:mt-2 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* 3. FLOATING MASCOT 2: FROG ON LILYPAD (Click Plays Cozy BGM) */}
      {/* ============================================================ */}
      <div className="fixed bottom-8 sm:bottom-12 right-3 sm:right-12 z-[45] pointer-events-auto select-none">
        <div className="relative">
          {/* Frog Speech Bubble */}
          <AnimatePresence>
            {frogQuote && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                className="absolute -top-14 right-0 whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-400 dark:border-emerald-500 shadow-2xl text-xs font-mono font-bold text-emerald-900 dark:text-emerald-100 pointer-events-none z-[70] animate-bounce-subtle"
              >
                {frogQuote}
                <div className="absolute -bottom-1.5 right-12 w-3 h-3 bg-white dark:bg-slate-800 border-r-2 border-b-2 border-emerald-400 dark:border-emerald-500 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating musical notes */}
          {isBgmPlaying && (
            <div className="absolute -top-7 left-4 flex gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm pointer-events-none animate-bounce">
              <span>🎵</span>
              <span className="delay-100">🎶</span>
            </div>
          )}

          {/* Frog Mascot Button */}
          <button
            type="button"
            onMouseEnter={handleFrogMouseEnter}
            onClick={handleFrogClick}
            style={{ touchAction: "manipulation" }}
            className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-90 focus:outline-none select-none ${
              isFrogJumping ? "-translate-y-6 scale-115 rotate-3" : ""
            }`}
            title="Touch or click me to play / pause cozy background music!"
          >
            <div className="animate-bobbing-slow">
              <Image
                src={
                  isDark
                    ? "/images/player/froggert_stop_dark.webp"
                    : "/images/player/froggert_stop.webp"
                }
                alt="froggert player"
                width={105}
                height={105}
                draggable={false}
                priority
                unoptimized
                className="drop-shadow-lg select-none w-[88px] h-[88px] sm:w-[105px] sm:h-[105px]"
              />
            </div>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. BOTTOM HORIZON (Animated Multi-Layer Water Waves)        */}
      {/* ============================================================ */}
      <div className="fixed pointer-events-none bottom-0 left-0 right-0 w-full h-[170px] sm:h-[220px] md:h-[250px] overflow-hidden leading-none z-10">
        {/* Layer 1 - Deep Slow Undulating Wave */}
        <div className="absolute inset-0 w-[115%] -left-[7.5%] bottom-0 flex items-end animate-water-wave-slow opacity-35">
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full min-h-[170px] sm:min-h-[220px] md:min-h-[250px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,90 C320,30 580,140 880,70 C1180,30 1340,110 1440,80 L1440,260 L0,260 Z"
              fill="var(--color-ground)"
            />
          </svg>
        </div>

        {/* Layer 2 - Mid Horizon Gentle Flow */}
        <div className="absolute inset-0 w-[115%] -left-[7.5%] bottom-0 flex items-end animate-water-wave-mid opacity-55">
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full min-h-[170px] sm:min-h-[220px] md:min-h-[250px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,115 C260,165 520,75 820,135 C1100,175 1320,95 1440,115 L1440,260 L0,260 Z"
              fill="var(--color-ground)"
            />
          </svg>
        </div>

        {/* Layer 3 - Foreground Main Calming Wave */}
        <div className="absolute inset-0 w-[115%] -left-[7.5%] bottom-0 flex items-end animate-water-wave-front opacity-100">
          <svg
            viewBox="0 0 1440 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full min-h-[170px] sm:min-h-[220px] md:min-h-[250px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,135 C340,75 520,185 840,125 C1140,65 1320,155 1440,115 L1440,260 L0,260 Z"
              fill="var(--color-ground)"
            />
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. SCREEN FOOTER (Branded Social Dock + Spaced Copyright)   */}
      {/* ============================================================ */}
      <footer className="relative z-30 pb-5 pt-3 flex flex-col items-center justify-center gap-3.5 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* GitHub */}
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onTouchStart={() => sound.playTouchFeedback()}
            onClick={() => sound.playClick()}
            title="GitHub (mbanait43-glitch)"
            className="w-10 h-10 rounded-full bg-[#24292e] text-white hover:bg-[#1b1f23] flex items-center justify-center shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 active:scale-95 active:translate-y-0"
          >
            <Github className="w-4 h-4 text-white" />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onTouchStart={() => sound.playTouchFeedback()}
            onClick={() => sound.playClick()}
            title="LinkedIn (Mayur Banait)"
            className="w-10 h-10 rounded-full bg-[#0077B5] text-white hover:bg-[#005e93] flex items-center justify-center shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 active:scale-95 active:translate-y-0"
          >
            <Linkedin className="w-4 h-4 text-white" />
          </a>

          {/* Mail */}
          <a
            href={`mailto:${profile.email}`}
            onMouseEnter={() => sound.playHover()}
            onTouchStart={() => sound.playTouchFeedback()}
            onClick={() => sound.playClick()}
            title="Email (mbanait43@gmail.com)"
            className="w-10 h-10 rounded-full bg-[#EA4335] text-white hover:bg-[#d33426] flex items-center justify-center shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-110 active:scale-95 active:translate-y-0"
          >
            <Mail className="w-4 h-4 text-white" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 select-none tracking-wide pointer-events-auto">
          &copy; 2026 Mayur Banait
        </p>
      </footer>

      {/* ============================================================ */}
      {/* 6. SECONDARY MODAL WINDOW (ULTRA-SNAPPY & SILKY SMOOTH)     */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeWindow && (
          <motion.div
            key="window-modal-overlay"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/60"
            onClick={handleCloseWindow}
          >
            <motion.div
              key={activeWindow}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.10, ease: "easeOut" }}
              className="w-full max-w-6xl h-[92vh] sm:h-[90vh] max-h-[94vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700/80 dark:border-slate-600 bg-white dark:bg-[#1f242d] gpu-layer"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Secondary Window Titlebar with Retro OS Window Dots & [x] */}
              <div className="bg-[#383c44] dark:bg-[#22262e] text-white px-5 sm:px-6 py-3.5 flex items-center justify-between select-none shadow-sm flex-shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Retro OS control dots (Red, Yellow, Green) */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={handleCloseWindow}
                      onTouchStart={() => sound.playTouchFeedback()}
                      className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] inline-block shadow-sm transition-transform hover:scale-125 cursor-pointer"
                      title="Close window"
                    />
                    <button
                      type="button"
                      onClick={handleCloseWindow}
                      onTouchStart={() => sound.playTouchFeedback()}
                      className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] inline-block shadow-sm transition-transform hover:scale-125 cursor-pointer"
                      title="Minimize window"
                    />
                    <span
                      className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] inline-block shadow-sm"
                      title="Maximized"
                    />
                  </div>
                  <span className="font-mono text-sm sm:text-base font-bold tracking-wide text-slate-100 pl-1 capitalize truncate">
                    {activeWindow === "about"
                      ? "about me — who i am & technical skills"
                      : activeWindow === "work"
                      ? "projects & chrome extensions"
                      : activeWindow === "certificates"
                      ? "verified certifications & credentials"
                      : activeWindow === "links"
                      ? "connect & developer profiles"
                      : activeWindow === "faq"
                      ? "frequently asked questions"
                      : activeWindow === "contact"
                      ? "get in touch & work inquiries"
                      : activeWindow}
                  </span>
                </div>

                {/* [x] Close Button */}
                <button
                  type="button"
                  onClick={handleCloseWindow}
                  onTouchStart={() => sound.playTouchFeedback()}
                  title="Close window (Esc)"
                  aria-label="Close window"
                  className="font-mono text-base sm:text-lg font-bold text-white/90 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 active:scale-80 duration-100 transition-all cursor-pointer focus:outline-none flex-shrink-0"
                >
                  [x]
                </button>
              </div>

              {/* Secondary Window Content Body */}
              <div className="p-4 sm:p-7 md:p-9 flex-1 pb-16 modal-scroll overscroll-contain">
                {activeWindow === "about" && <AboutContent onNavigate={handleOpenWindow} />}
                {activeWindow === "links" && <LinksContent />}
                {activeWindow === "work" && <ProjectsContent />}
                {activeWindow === "certificates" && <CertificatesContent />}
                {activeWindow === "faq" && <FAQContent />}
                {activeWindow === "contact" && <ContactContent />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

