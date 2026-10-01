import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

// 1. About Icon: Speech bubble with an italic lowercase "i"
export const SharyapAboutIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Speech Bubble Body */}
    <path
      d="M32 10C19.85 10 10 19.4 10 31C10 36.6 12.35 41.67 16.2 45.45C15.4 49.3 13.5 52.8 11.2 54.8C10.7 55.25 11 56 11.7 55.9C17.2 55.1 22.1 52.6 25.5 49.9C27.6 50.6 29.75 51 32 51C44.15 51 54 41.6 54 30C54 18.4 44.15 10 32 10Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Letter "i" dot */}
    <circle cx="32" cy="22" r="3" fill="currentColor" />
    {/* Letter "i" stem with serif */}
    <path
      d="M30 29H33V41H35M30 41H34"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 2. Links Icon: Two interlocking chain links tilted at 45 degrees
export const SharyapLinksIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Upper-right link */}
    <rect
      x="24"
      y="12"
      width="14"
      height="26"
      rx="7"
      transform="rotate(45 24 12)"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Lower-left link */}
    <rect
      x="12"
      y="24"
      width="14"
      height="26"
      rx="7"
      transform="rotate(45 12 24)"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 3. Work Icon: File folder with documents peeking out
export const SharyapWorkIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Back paper sheet */}
    <path
      d="M20 18V13C20 11.9 20.9 11 22 11H42C43.1 11 44 11.9 44 13V22"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Middle paper sheet */}
    <path
      d="M26 18V16C26 14.9 26.9 14 28 14H48C49.1 14 50 14.9 50 16V24"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Folder Back with Tab */}
    <path
      d="M10 24V19C10 17.9 10.9 17 12 17H24L28 22H52C53.1 22 54 17 54 24"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Folder Front Pocket (slanted 3D look) */}
    <path
      d="M8 24H56L50 51C49.8 52.1 48.9 53 47.8 53H16.2C15.1 53 14.2 52.1 14 51L8 24Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 4. FAQ / Skills Icon: Document with question mark
export const SharyapFaqIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Document sheet with folded top-right corner */}
    <path
      d="M16 11C16 9.9 16.9 9 18 9H38L48 19V53C48 54.1 47.1 55 46 55H18C16.9 55 16 54.1 16 53V11Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Folded flap */}
    <path
      d="M38 9V19H48"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Question mark */}
    <path
      d="M26 27C26 23.5 28.5 21 32 21C35.5 21 38 23.5 38 26.5C38 31 32 32.5 32 37"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="32" cy="45" r="2.5" fill="currentColor" />
  </svg>
);

// 5. Contact Icon: Postal envelope with stamp and spiral @
export const SharyapContactIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Envelope Body */}
    <rect
      x="8"
      y="15"
      width="48"
      height="34"
      rx="4"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Envelope Flap Fold Lines */}
    <path
      d="M8 17L32 34L56 17"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 48L24 33"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M56 48L40 33"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Postal Stamp Badge in center */}
    <circle
      cx="32"
      cy="28"
      r="9"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    {/* Spiral / @ symbol inside stamp */}
    <path
      d="M34 26.5C34 25.4 33.1 24.5 32 24.5C30.6 24.5 29.5 25.6 29.5 27C29.5 28.9 31.1 30.5 33 30.5C34.9 30.5 36.5 29 36.5 27C36.5 24.2 34.2 22 31.5 22C28.5 22 26 24.5 26 27.5C26 31 29 33.5 32.5 33.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 6. Resume Icon: CV Sheet with folded corner and CV text
export const SharyapCertificatesIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left ribbon tail */}
    <path
      d="M23 36L17 56L26 51L32 56L29 38"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right ribbon tail */}
    <path
      d="M41 36L47 56L38 51L32 56L35 38"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Circular rosette medal */}
    <circle
      cx="32"
      cy="24"
      r="16"
      fill="currentColor"
      fillOpacity="0.12"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner decorative star badge */}
    <path
      d="M32 14L34.5 20.5H41L35.8 24.5L37.8 31L32 27.2L26.2 31L28.2 24.5L23 20.5H29.5L32 14Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const SharyapResumeIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sheet */}
    <path
      d="M15 11C15 9.9 15.9 9 17 9H39L49 19V53C49 54.1 48.1 55 47 55H17C15.9 55 15 54.1 15 53V11Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39 9V19H49"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* CV Badge */}
    <rect
      x="21"
      y="24"
      width="22"
      height="14"
      rx="3"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <text
      x="32"
      y="34.5"
      textAnchor="middle"
      fontSize="11"
      fontWeight="900"
      fontFamily="monospace"
      fill="currentColor"
    >
      CV
    </text>
    {/* Content lines */}
    <path d="M22 44H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 49H34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 7. Floating Star Mascot: Kawaii warm smiling star with blush
export const SharyapStarMascot: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
}> = ({ className = "", size = 80, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer transition-transform duration-250 hover:scale-110 active:scale-95 focus:outline-none select-none ${className}`}
    title="Click me for a twinkle!"
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-md"
    >
      {/* 5-point puffy star with rounded tips */}
      <path
        d="M50 8C52 14 57 26 63 32C69 38 81 40 88 42C92 43 94 48 90 51C84 56 75 62 72 70C69 78 71 90 69 94C67 98 62 99 57 96C51 92 41 85 33 87C25 89 16 97 12 94C8 91 9 86 11 79C13 72 7 62 3 56C0 52 3 47 7 46C15 44 26 41 31 34C36 27 39 15 42 9C44 5 48 5 50 8Z"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Kawaii Smiling Eyes: ^  ^ */}
      <path
        d="M34 46C36 43 40 43 42 46"
        stroke="#78350F"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M58 46C60 43 64 43 66 46"
        stroke="#78350F"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Cute Open Smiling Mouth: ‿ */}
      <path
        d="M45 52C45 56 55 56 55 52"
        fill="#DC2626"
        stroke="#78350F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Rosy Blush Cheeks */}
      <ellipse cx="30" cy="52" rx="4.5" ry="3" fill="#F87171" fillOpacity="0.8" />
      <ellipse cx="70" cy="52" rx="4.5" ry="3" fill="#F87171" fillOpacity="0.8" />
      {/* Highlight Shine */}
      <path
        d="M44 18C42 24 37 32 30 36"
        stroke="#FEF3C7"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </button>
);

// 8. Frog on Lilypad Mascot (Froggert): Green frog with waterlily blossom
export const SharyapFrogMascot: React.FC<{
  className?: string;
  size?: number;
  onClick?: () => void;
}> = ({ className = "", size = 110, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer transition-transform duration-250 hover:scale-105 active:scale-95 focus:outline-none select-none ${className}`}
    title="Ribbit! Click for tips"
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Lilypad base */}
      <ellipse
        cx="60"
        cy="80"
        rx="52"
        ry="15"
        fill="#15803D"
        stroke="#14532D"
        strokeWidth="3"
      />
      {/* Lilypad notch cut */}
      <path d="M102 74L60 80L108 86" fill="#A7CEF8" />

      {/* Frog Feet */}
      <ellipse cx="30" cy="74" rx="10" ry="6" fill="#4ADE80" stroke="#166534" strokeWidth="2.5" />
      <ellipse cx="90" cy="74" rx="10" ry="6" fill="#4ADE80" stroke="#166534" strokeWidth="2.5" />

      {/* Frog Body */}
      <ellipse
        cx="60"
        cy="60"
        rx="32"
        ry="22"
        fill="#86EFAC"
        stroke="#166534"
        strokeWidth="3"
      />
      {/* Frog Belly */}
      <ellipse cx="60" cy="65" rx="20" ry="12" fill="#DCFCE7" />

      {/* Frog Big Eye Bulges */}
      <circle cx="44" cy="40" r="12" fill="#86EFAC" stroke="#166534" strokeWidth="3" />
      <circle cx="76" cy="40" r="12" fill="#86EFAC" stroke="#166534" strokeWidth="3" />

      {/* Frog Eye Whites */}
      <circle cx="44" cy="40" r="8" fill="#FFFFFF" />
      <circle cx="76" cy="40" r="8" fill="#FFFFFF" />

      {/* Frog Pupils (cute glossy look) */}
      <circle cx="45" cy="40" r="4.5" fill="#14532D" />
      <circle cx="75" cy="40" r="4.5" fill="#14532D" />
      <circle cx="46.5" cy="38.5" r="1.5" fill="#FFFFFF" />
      <circle cx="76.5" cy="38.5" r="1.5" fill="#FFFFFF" />

      {/* Frog Blush */}
      <ellipse cx="33" cy="56" rx="4" ry="2.5" fill="#F87171" fillOpacity="0.7" />
      <ellipse cx="87" cy="56" rx="4" ry="2.5" fill="#F87171" fillOpacity="0.7" />

      {/* Frog Friendly Smile */}
      <path
        d="M52 56C56 60 64 60 68 56"
        stroke="#166534"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Waterlily flower on head */}
      <g transform="translate(68, 20) scale(0.7)">
        <path d="M10 20C5 12 0 10 -8 18C0 24 6 22 10 20Z" fill="#F472B6" stroke="#9D174D" strokeWidth="1.5" />
        <path d="M10 20C15 12 20 10 28 18C20 24 14 22 10 20Z" fill="#F472B6" stroke="#9D174D" strokeWidth="1.5" />
        <path d="M10 20C8 8 12 2 10 0C8 2 12 8 10 20Z" fill="#FBCFE8" stroke="#9D174D" strokeWidth="1.5" />
        <circle cx="10" cy="18" r="3" fill="#FDE047" />
      </g>
    </svg>
  </button>
);
