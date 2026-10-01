import React from "react";

interface BrandIconProps {
  className?: string;
  size?: number;
}

/**
 * Realistic WhatsApp Icon:
 * Pixel-perfect official WhatsApp squircle with authentic gradient, subtle shadow,
 * and crisp white speech bubble with phone handset.
 */
export const RealisticWhatsAppIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="waGrad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#29E373" />
        <stop offset="100%" stopColor="#1EBE5D" />
      </linearGradient>
      <filter id="waShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#1EBE5D" floodOpacity="0.28" />
      </filter>
    </defs>
    {/* Base realistic app badge */}
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#waGrad)" filter="url(#waShadow)" />
    {/* Subtle gloss highlight */}
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.12"
    />
    {/* WhatsApp Speech Bubble & Phone Handset */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 10C16.82 10 11 15.82 11 23C11 25.54 11.73 27.91 13 29.92L11.5 35.5L17.26 34.02C19.23 35.25 21.53 36 24 36C31.18 36 37 30.18 37 23C37 15.82 31.18 10 24 10ZM20.67 16.89C20.35 16.18 20.02 16.16 19.67 16.15C19.38 16.14 19.05 16.14 18.72 16.14C18.39 16.14 17.85 16.26 17.39 16.76C16.93 17.26 15.63 18.48 15.63 20.96C15.63 23.44 17.43 25.84 17.68 26.17C17.93 26.5 21.14 31.69 26.23 33.68C30.46 35.34 31.32 35.01 32.23 34.93C33.14 34.84 35.17 33.72 35.59 32.55C36 31.38 36 30.37 35.87 30.16C35.74 29.95 35.41 29.83 34.91 29.58C34.41 29.33 31.97 28.13 31.51 27.96C31.06 27.79 30.73 27.71 30.4 28.21C30.07 28.71 29.12 29.83 28.83 30.16C28.54 30.5 28.25 30.54 27.75 30.29C27.25 30.04 25.64 29.51 23.74 27.81C22.25 26.49 21.25 24.85 20.96 24.35C20.67 23.86 20.93 23.59 21.18 23.34C21.41 23.12 21.68 22.77 21.93 22.48C22.18 22.19 22.26 21.98 22.43 21.65C22.59 21.32 22.51 21.03 22.39 20.78C22.26 20.53 21.27 18.13 20.67 16.89Z"
      fill="white"
    />
  </svg>
);

/**
 * Realistic Instagram Icon:
 * Pixel-perfect official Instagram app icon with authentic warm-to-cool radial-linear gradient,
 * rounded outer camera stroke, centered lens circle, and notification flash dot.
 */
export const RealisticInstagramIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient
        id="igRadial"
        cx="14%"
        cy="92%"
        r="115%"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#FFDE59" />
        <stop offset="12%" stopColor="#FFAA33" />
        <stop offset="42%" stopColor="#F5365C" />
        <stop offset="70%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#833AB4" />
      </radialGradient>
      <filter id="igShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#C13584" floodOpacity="0.32" />
      </filter>
    </defs>
    {/* Base realistic app badge */}
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#igRadial)" filter="url(#igShadow)" />
    {/* Subtle top gloss */}
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.14"
    />
    {/* Camera outer rounded rectangle */}
    <rect
      x="12"
      y="12"
      width="24"
      height="24"
      rx="7"
      stroke="white"
      strokeWidth="2.6"
    />
    {/* Center camera lens */}
    <circle cx="24" cy="24" r="5.6" stroke="white" strokeWidth="2.6" />
    {/* Flash dot */}
    <circle cx="31.2" cy="16.8" r="1.4" fill="white" />
  </svg>
);

/**
 * Realistic GitHub Icon:
 * Authentic dark slate squircle with crisp white GitHub Invertocat logo.
 */
export const RealisticGitHubIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ghGrad" x1="24" y1="3" x2="24" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2F363D" />
        <stop offset="100%" stopColor="#1B1F23" />
      </linearGradient>
      <filter id="ghShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#1B1F23" floodOpacity="0.35" />
      </filter>
    </defs>
    {/* Base realistic app badge */}
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#ghGrad)" filter="url(#ghShadow)" />
    {/* Subtle top gloss */}
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.1"
    />
    {/* Octocat vector */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 10C16.27 10 10 16.27 10 24C10 30.19 14.02 35.43 19.59 37.28C20.29 37.41 20.55 36.98 20.55 36.61C20.55 36.28 20.54 35.2 20.53 34.04C16.64 34.88 15.82 32.36 15.82 32.36C15.18 30.74 14.26 30.31 14.26 30.31C12.99 29.44 14.36 29.46 14.36 29.46C15.77 29.56 16.51 30.9 16.51 30.9C17.76 33.04 19.79 32.42 20.59 32.06C20.72 31.15 21.08 30.53 21.48 30.18C18.37 29.83 15.1 28.63 15.1 23.27C15.1 21.74 15.65 20.49 16.54 19.51C16.4 19.16 15.92 17.73 16.68 15.8C16.68 15.8 17.86 15.42 20.53 17.23C21.65 16.92 22.84 16.76 24.03 16.76C25.22 16.76 26.41 16.92 27.53 17.23C30.2 15.42 31.38 15.8 31.38 15.8C32.14 17.73 31.66 19.16 31.52 19.51C32.42 20.49 32.96 21.74 32.96 23.27C32.96 28.64 29.68 29.82 26.56 30.17C27.06 30.6 27.52 31.46 27.52 32.77C27.52 34.65 27.5 36.16 27.5 36.61C27.5 36.98 27.75 37.42 28.46 37.28C34.02 35.43 38.04 30.19 38.04 24C38.04 16.27 31.77 10 24 10Z"
      fill="white"
    />
  </svg>
);

/**
 * Realistic LinkedIn Icon:
 * Authentic LinkedIn blue badge with crisp white "in" emblem.
 */
export const RealisticLinkedInIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="liGrad" x1="24" y1="3" x2="24" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0B74E5" />
        <stop offset="100%" stopColor="#0060C7" />
      </linearGradient>
      <filter id="liShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#0060C7" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Base realistic app badge */}
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#liGrad)" filter="url(#liShadow)" />
    {/* Subtle top gloss */}
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.15"
    />
    {/* LinkedIn letters "in" */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5 16.5C13.5 15.12 14.62 14 16 14C17.38 14 18.5 15.12 18.5 16.5C18.5 17.88 17.38 19 16 19C14.62 19 13.5 17.88 13.5 16.5ZM13.8 21.5H18.2V34.5H13.8V21.5ZM24.8 21.5H20.7V34.5H24.8V27.58C24.8 25.75 25.15 23.98 27.42 23.98C29.65 23.98 29.68 26.06 29.68 27.69V34.5H33.8V26.86C33.8 23.11 32.99 21.2 29.35 21.2C27.59 21.2 25.96 22.16 24.8 23.27V21.5Z"
      fill="white"
    />
  </svg>
);

/**
 * Realistic Gmail / Email Icon:
 * Clean white squircle with authentic multi-color Google M glyph (Blue, Red, Yellow, Green).
 */
export const RealisticGmailIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <filter id="gmailShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#000000" floodOpacity="0.12" />
      </filter>
    </defs>
    {/* Base realistic app badge */}
    <rect
      x="3"
      y="3"
      width="42"
      height="42"
      rx="12"
      fill="#FFFFFF"
      stroke="#E2E8F0"
      strokeWidth="1.2"
      filter="url(#gmailShadow)"
    />
    {/* Gmail M logo */}
    <g transform="translate(10, 12) scale(1.16)">
      <path
        d="M2 17.5V5.5C2 4.12 3.12 3 4.5 3H6L12 8L18 3H19.5C20.88 3 22 4.12 22 5.5V17.5C22 18.88 20.88 20 19.5 20H18V9.5L12 14.5L6 9.5V20H4.5C3.12 20 2 18.88 2 17.5Z"
        fill="#EA4335"
      />
      <path d="M2 5.5C2 4.12 3.12 3 4.5 3H6V11L2 7.5V5.5Z" fill="#4285F4" />
      <path d="M22 5.5C22 4.12 20.88 3 19.5 3H18V11L22 7.5V5.5Z" fill="#34A853" />
      <path d="M18 11V20H19.5C20.88 20 22 18.88 22 17.5V7.5L18 11Z" fill="#FBBC04" />
      <path d="M6 11V20H4.5C3.12 20 2 18.88 2 17.5V7.5L6 11Z" fill="#4285F4" />
    </g>
  </svg>
);

/**
 * Realistic Phone Call Icon:
 * Authentic smartphone dialer badge with vibrant emerald-green gradient,
 * sleek glass gloss, and a perfectly centered, crisp white handset.
 */
export const RealisticPhoneIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="phoneGrad" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#30D158" />
        <stop offset="100%" stopColor="#1E8E3E" />
      </linearGradient>
      <filter id="phoneShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#1E8E3E" floodOpacity="0.32" />
      </filter>
    </defs>
    {/* Base realistic app badge */}
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#phoneGrad)" filter="url(#phoneShadow)" />
    {/* Subtle top gloss */}
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.16"
    />
    {/* Crisp, centered telephone handset */}
    <g transform="translate(13.5, 13.5)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.7 1.5C4.5 0.7 5.7 0.7 6.5 1.5L8.8 3.8C9.6 4.6 9.6 5.8 8.8 6.6L7.4 8C7.2 8.2 7.1 8.5 7.2 8.8C8.3 11.2 10.2 13.1 12.6 14.2C12.9 14.3 13.2 14.2 13.4 14L14.8 12.6C15.6 11.8 16.8 11.8 17.6 12.6L19.9 14.9C20.7 15.7 20.7 16.9 19.9 17.7L18.4 19.2C17.1 20.5 15.1 20.9 13.3 20.1C8.2 17.8 4.1 13.7 1.8 8.6C1 6.8 1.4 4.8 2.7 3.5L3.7 1.5Z"
        fill="white"
      />
    </g>
  </svg>
);

/**
 * Realistic LeetCode Icon:
 * Official LeetCode dark/gold emblem.
 */
export const RealisticLeetCodeIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="lcGrad" x1="24" y1="3" x2="24" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#374151" />
        <stop offset="100%" stopColor="#1F2937" />
      </linearGradient>
      <filter id="lcShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#1F2937" floodOpacity="0.32" />
      </filter>
    </defs>
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#lcGrad)" filter="url(#lcShadow)" />
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.1"
    />
    {/* LeetCode bracket glyph */}
    <path
      d="M27.2 16.5L20.8 22.9C19.7 24 19.7 25.8 20.8 26.9L25.4 31.5C26.5 32.6 28.3 32.6 29.4 31.5L33.2 27.7"
      stroke="#FFA116"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 24.8H33.5"
      stroke="#FFFFFF"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Realistic Resume / Document Icon:
 * Google Drive / PDF styled gold-amber document badge.
 */
export const RealisticResumeIcon: React.FC<BrandIconProps> = ({
  className = "",
  size = 44,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="docGrad" x1="24" y1="3" x2="24" y2="45" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id="docShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#D97706" floodOpacity="0.3" />
      </filter>
    </defs>
    <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#docGrad)" filter="url(#docShadow)" />
    <path
      d="M3 15C3 8.37 8.37 3 15 3H33C39.63 3 45 8.37 45 15V18C33 16 15 20 3 24V15Z"
      fill="white"
      fillOpacity="0.16"
    />
    {/* Sheet with folded corner and lines */}
    <path
      d="M17 14C15.9 14 15 14.9 15 16V32C15 33.1 15.9 34 17 34H31C32.1 34 33 33.1 33 32V20L27 14H17Z"
      fill="white"
    />
    <path d="M27 14V20H33" fill="#FDE68A" />
    <path d="M19 23H29M19 27H26" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

