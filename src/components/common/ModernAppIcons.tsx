import React from "react";

interface ModernIconProps {
  className?: string;
  size?: number;
}

/**
 * 1. ABOUT ICON:
 * Radiant Violet-Indigo 3D Glassmorphic User Profile Badge with Holographic Aura & Stars
 */
export const ModernAboutIcon: React.FC<ModernIconProps> = ({ className = "", size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 drop-shadow-md hover:drop-shadow-xl ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="aboutBg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#818CF8" />
        <stop offset="50%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#4338CA" />
      </linearGradient>
      <linearGradient id="aboutGlow" x1="16" y1="12" x2="48" y2="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
      </linearGradient>
      <filter id="aboutShadow" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4338CA" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Squircle base with 3D bevel and gradient */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      rx="16"
      fill="url(#aboutBg)"
      filter="url(#aboutShadow)"
    />
    {/* Inner Glass Highlight */}
    <rect
      x="8"
      y="8"
      width="48"
      height="24"
      rx="14"
      fill="white"
      fillOpacity="0.18"
    />

    {/* Sparkle Star Top Right */}
    <path
      d="M48 14L49.5 17.5L53 19L49.5 20.5L48 24L46.5 20.5L43 19L46.5 17.5L48 14Z"
      fill="#FDE047"
    />

    {/* Avatar Head & Torso with Soft White Glow */}
    <circle cx="32" cy="25" r="7.5" fill="white" />
    <circle cx="32" cy="25" r="5" fill="#E0E7FF" fillOpacity="0.7" />
    <path
      d="M20 45C20 38.5 25.5 35 32 35C38.5 35 44 38.5 44 45"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Small ID badge detail */}
    <circle cx="21" cy="18" r="2.5" fill="#A5B4FC" />
  </svg>
);

/**
 * 2. LINKS ICON:
 * Vibrant Fuchsia-Magenta 3D Interlocking Infinity Rings with Glass Reflections
 */
export const ModernLinksIcon: React.FC<ModernIconProps> = ({ className = "", size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 drop-shadow-md hover:drop-shadow-xl ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="linksBg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#BE185D" />
      </linearGradient>
      <filter id="linksShadow" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#BE185D" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Squircle base */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      rx="16"
      fill="url(#linksBg)"
      filter="url(#linksShadow)"
    />
    {/* Inner Glass Highlight */}
    <rect
      x="8"
      y="8"
      width="48"
      height="24"
      rx="14"
      fill="white"
      fillOpacity="0.2"
    />

    {/* Interlocking Link 1 (Top Right) */}
    <path
      d="M30 26L36 20C39.3 16.7 44.7 16.7 48 20C51.3 23.3 51.3 28.7 48 32L42 38"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Interlocking Link 2 (Bottom Left) */}
    <path
      d="M34 38L28 44C24.7 47.3 19.3 47.3 16 44C12.7 40.7 12.7 35.3 16 32L22 26"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Connecting Bridge Beam */}
    <path
      d="M26 38L38 26"
      stroke="#FCE7F3"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Sparkle Glow Dot */}
    <circle cx="48" cy="18" r="2.5" fill="#FEF08A" />
  </svg>
);

/**
 * 3. WORK / PROJECTS ICON:
 * Electric Cyan & Royal Sapphire 3D Code Launchpad with Terminal Brackets
 */
export const ModernWorkIcon: React.FC<ModernIconProps> = ({ className = "", size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 drop-shadow-md hover:drop-shadow-xl ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="workBg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="50%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
      <filter id="workShadow" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0369A1" floodOpacity="0.38" />
      </filter>
    </defs>

    {/* Squircle base */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      rx="16"
      fill="url(#workBg)"
      filter="url(#workShadow)"
    />
    {/* Top glass reflection */}
    <rect
      x="8"
      y="8"
      width="48"
      height="24"
      rx="14"
      fill="white"
      fillOpacity="0.2"
    />

    {/* Inner Terminal Screen */}
    <rect
      x="14"
      y="17"
      width="36"
      height="30"
      rx="7"
      fill="#0F172A"
      fillOpacity="0.5"
      stroke="#7DD3FC"
      strokeWidth="1.5"
    />

    {/* Code Brackets: < / > */}
    <path
      d="M23 27L18.5 32L23 37"
      stroke="#38BDF8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M41 27L45.5 32L41 37"
      stroke="#38BDF8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 25L30 39"
      stroke="#FDE047"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Mini terminal dots */}
    <circle cx="19" cy="21" r="1.5" fill="#EF4444" />
    <circle cx="23" cy="21" r="1.5" fill="#F59E0B" />
    <circle cx="27" cy="21" r="1.5" fill="#10B981" />
  </svg>
);

/**
 * 4. CERTIFICATES ICON:
 * Radiant Amber-Gold 3D Rosette Ribbon Medal with Multi-Tier Star Crest
 */
export const ModernCertificatesIcon: React.FC<ModernIconProps> = ({
  className = "",
  size = 56,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 drop-shadow-md hover:drop-shadow-xl ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="certBg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <filter id="certShadow" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#B45309" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Squircle base */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      rx="16"
      fill="url(#certBg)"
      filter="url(#certShadow)"
    />
    {/* Inner Glass Highlight */}
    <rect
      x="8"
      y="8"
      width="48"
      height="24"
      rx="14"
      fill="white"
      fillOpacity="0.22"
    />

    {/* Ribbon Tails */}
    <path
      d="M25 36L19 49L26 46L31 49L28 36"
      fill="#78350F"
      fillOpacity="0.8"
    />
    <path
      d="M39 36L45 49L38 46L33 49L36 36"
      fill="#78350F"
      fillOpacity="0.8"
    />

    {/* Golden Medal Rosette */}
    <circle cx="32" cy="27" r="14" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.5" />
    <circle cx="32" cy="27" r="11" fill="#F59E0B" />

    {/* Center 5-point Gold Star */}
    <path
      d="M32 18L34.5 23.5H40.5L36 27L37.8 32.5L32 29.2L26.2 32.5L28 27L23.5 23.5H29.5L32 18Z"
      fill="#FFFFFF"
    />
  </svg>
);

/**
 * 5. FAQ / KNOWLEDGE ICON:
 * Emerald & Mint Gradient Document with 3D Question Badge
 */
export const ModernFaqIcon: React.FC<ModernIconProps> = ({ className = "", size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 drop-shadow-md hover:drop-shadow-xl ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="faqBg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="50%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <filter id="faqShadow" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#047857" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Squircle base */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      rx="16"
      fill="url(#faqBg)"
      filter="url(#faqShadow)"
    />
    {/* Inner Glass Highlight */}
    <rect
      x="8"
      y="8"
      width="48"
      height="24"
      rx="14"
      fill="white"
      fillOpacity="0.2"
    />

    {/* Document sheet */}
    <path
      d="M20 18C20 16.9 20.9 16 22 16H36L44 24V44C44 45.1 43.1 46 42 46H22C20.9 46 20 45.1 20 44V18Z"
      fill="#ECFDF5"
      fillOpacity="0.9"
    />
    <path d="M36 16V24H44" fill="#A7F3D0" />

    {/* Question Mark */}
    <path
      d="M29 27C29 25 30.5 23.5 32 23.5C33.8 23.5 35 24.8 35 26.5C35 29 32 30 32 33"
      stroke="#065F46"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <circle cx="32" cy="38" r="1.6" fill="#065F46" />
  </svg>
);

/**
 * 6. CONTACT ICON:
 * Sunset Coral & Ruby 3D Envelope with Golden Seal & Airplane Trail
 */
export const ModernContactIcon: React.FC<ModernIconProps> = ({ className = "", size = 56 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-all duration-300 drop-shadow-md hover:drop-shadow-xl ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="contactBg" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB7185" />
        <stop offset="50%" stopColor="#F43F5E" />
        <stop offset="100%" stopColor="#BE123C" />
      </linearGradient>
      <filter id="contactShadow" x="0" y="4" width="64" height="60" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#BE123C" floodOpacity="0.38" />
      </filter>
    </defs>

    {/* Squircle base */}
    <rect
      x="6"
      y="6"
      width="52"
      height="52"
      rx="16"
      fill="url(#contactBg)"
      filter="url(#contactShadow)"
    />
    {/* Inner Glass Highlight */}
    <rect
      x="8"
      y="8"
      width="48"
      height="24"
      rx="14"
      fill="white"
      fillOpacity="0.22"
    />

    {/* Envelope Body */}
    <rect
      x="14"
      y="22"
      width="36"
      height="24"
      rx="4"
      fill="#FFE4E6"
      stroke="white"
      strokeWidth="1.5"
    />
    {/* Flap lines */}
    <path
      d="M14 24L32 37L50 24"
      stroke="#E11D48"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 44L26 33" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M50 44L38 33" stroke="#FDA4AF" strokeWidth="1.8" strokeLinecap="round" />

    {/* Gold Wax Seal */}
    <circle cx="32" cy="36" r="5" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
    <circle cx="32" cy="36" r="2.5" fill="#FEF3C7" />
  </svg>
);
