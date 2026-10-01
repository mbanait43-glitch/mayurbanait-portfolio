"use client";

import React, { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import { useSettingsStore } from "@/store/useSettingsStore";

const MASCOT_QUOTES = [
  "Hi! I'm Pixel Bot 🤖",
  "Hire Mayur! He's awesome!",
  "Try dragging a window!",
  "Double click titlebar to maximize!",
  "100+ DSA problems solved!",
  "Check out the Projects folder! 📂",
  "Java, React, .NET & SQL ready!",
  "Right-click desktop for secret menu! ✨",
  "Need a quick learner? Mayur's your guy!",
];

export const Mascot: React.FC = () => {
  const { mascotEnabled } = useSettingsStore();

  const [positionX, setPositionX] = useState<number>(120);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = right, -1 = left
  const [isWalking, setIsWalking] = useState<boolean>(true);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [speech, setSpeech] = useState<string | null>("Click me for tips! 👋");
  const [stepFrame, setStepFrame] = useState<number>(0);

  const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speechIndexRef = useRef<number>(0);

  // Clear speech after 4 seconds
  useEffect(() => {
    if (speech) {
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
      bubbleTimeoutRef.current = setTimeout(() => {
        setSpeech(null);
      }, 4000);
    }
    return () => {
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, [speech]);

  // Mascot movement loop
  useEffect(() => {
    if (!mascotEnabled) return;

    let animId: number;
    let lastTime = performance.now();
    let pauseUntil = 0;

    const loop = (currentTime: number) => {
      // Pause animation if document is hidden
      if (document.hidden) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Handle random pauses
      if (currentTime < pauseUntil) {
        setIsWalking(false);
        animId = requestAnimationFrame(loop);
        return;
      } else {
        setIsWalking(true);
      }

      // Random chance to pause for 1-2.5s
      if (Math.random() < 0.005) {
        pauseUntil = currentTime + 1000 + Math.random() * 1500;
        setIsWalking(false);
      }

      const speed = 48; // px per second
      const maxX = Math.max(60, window.innerWidth - 80);

      setPositionX((prev) => {
        let next = prev + direction * speed * delta;
        if (next >= maxX) {
          next = maxX;
          setDirection(-1);
        } else if (next <= 20) {
          next = 20;
          setDirection(1);
        }
        return next;
      });

      // Toggle step frame for leg animation
      setStepFrame((f) => (f + 1) % 20);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [mascotEnabled, direction]);

  if (!mascotEnabled) return null;

  const handleClick = () => {
    sound.playMascotJump();
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 350);

    const quote = MASCOT_QUOTES[speechIndexRef.current % MASCOT_QUOTES.length];
    speechIndexRef.current += 1;
    setSpeech(quote);
  };

  return (
    <div
      className="fixed z-40 pointer-events-none select-none"
      style={{
        left: `${positionX}px`,
        bottom: "48px",
        transition: isJumping ? "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
        transform: isJumping ? "translateY(-24px)" : "translateY(0px)",
      }}
    >
      {/* Speech Bubble */}
      {speech && (
        <div
          className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-surface retro-border retro-shadow-sm px-3 py-1.5 rounded-lg pointer-events-auto cursor-pointer animate-fade-in text-xs font-medium text-ink flex items-center gap-1.5"
          onClick={handleClick}
        >
          <span>{speech}</span>
          {/* Bubble tail */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-retroBorder" />
        </div>
      )}

      {/* Pixel Mascot Character (Original SVG) */}
      <button
        onClick={handleClick}
        aria-label="Desktop Mascot"
        className="pointer-events-auto cursor-pointer outline-none focus-visible:ring-2 ring-accent rounded"
        style={{
          transform: `scaleX(${direction})`,
          transition: "transform 150ms ease",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Antenna */}
          <line x1="24" y1="4" x2="24" y2="10" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="4" r="3" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />

          {/* Head & Body (Retro Boxy Robot) */}
          <rect
            x="10"
            y="10"
            width="28"
            height="26"
            rx="6"
            fill="var(--color-surface)"
            stroke="var(--color-border)"
            strokeWidth="2.5"
          />

          {/* Screen / Visor */}
          <rect
            x="14"
            y="14"
            width="20"
            height="11"
            rx="3"
            fill="var(--color-titlebar)"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />

          {/* Glowing Eyes */}
          <circle cx="19" cy="19.5" r="2.5" fill="var(--color-ink)" />
          <circle cx="29" cy="19.5" r="2.5" fill="var(--color-ink)" />
          <circle cx="19.5" cy="18.5" r="0.8" fill="#ffffff" />
          <circle cx="29.5" cy="18.5" r="0.8" fill="#ffffff" />

          {/* Cheerful Mouth / Spark */}
          <path
            d="M21 28C22 30 26 30 27 28"
            stroke="var(--color-ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Left Arm / Ear */}
          <rect
            x="5"
            y="17"
            width="5"
            height="8"
            rx="2"
            fill="var(--color-accent)"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />

          {/* Right Arm / Ear */}
          <rect
            x="38"
            y="17"
            width="5"
            height="8"
            rx="2"
            fill="var(--color-accent)"
            stroke="var(--color-border)"
            strokeWidth="1.5"
          />

          {/* Feet / Tread (animated walking wiggle) */}
          <rect
            x="13"
            y={isWalking && stepFrame < 10 ? "35" : "37"}
            width="9"
            height="6"
            rx="2"
            fill="var(--color-border)"
          />
          <rect
            x="26"
            y={isWalking && stepFrame >= 10 ? "35" : "37"}
            width="9"
            height="6"
            rx="2"
            fill="var(--color-border)"
          />
        </svg>
      </button>
    </div>
  );
};
