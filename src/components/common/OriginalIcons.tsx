import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const AboutIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* ID Card base */}
    <rect x="6" y="8" width="36" height="32" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    <path d="M6 16H42" stroke="var(--color-border)" strokeWidth="2" />
    {/* Clip/Lanyard hole */}
    <rect x="20" y="5" width="8" height="4" rx="2" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Avatar portrait frame */}
    <rect x="11" y="21" width="12" height="14" rx="2" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    <circle cx="17" cy="26" r="3" fill="var(--color-ink)" />
    <path d="M13 34C13 31.5 15 30 17 30C19 30 21 31.5 21 34" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
    {/* Text lines */}
    <rect x="27" y="22" width="11" height="2.5" rx="1" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1" />
    <rect x="27" y="27" width="9" height="2.5" rx="1" fill="var(--color-ink-muted)" />
    <rect x="27" y="32" width="7" height="2" rx="1" fill="var(--color-ink-muted)" />
  </svg>
);

export const ExperienceIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Briefcase Handle */}
    <path d="M18 12V9C18 7.9 18.9 7 20 7H28C29.1 7 30 7.9 30 9V12" stroke="var(--color-border)" strokeWidth="2.5" fill="none" />
    {/* Briefcase Body */}
    <rect x="6" y="12" width="36" height="28" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    {/* Top flap */}
    <path d="M6 18H42" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="3 2" />
    {/* Accent band */}
    <rect x="6" y="22" width="36" height="8" fill="var(--color-titlebar)" fillOpacity="0.4" />
    {/* Center Lock / Stamp */}
    <rect x="21" y="19" width="6" height="7" rx="1.5" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Corner reinforcements */}
    <path d="M8 38H12M40 38H36" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ProjectsIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Floppy Disk Body */}
    <rect x="7" y="6" width="34" height="36" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    {/* Chamfered top right */}
    <path d="M35 6L41 12V40C41 41.1 40.1 42 39 42H9C7.9 42 7 41.1 7 40V8C7 6.9 7.9 6 9 6H35Z" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    {/* Metal Slider Shutter */}
    <rect x="14" y="6" width="20" height="14" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    <rect x="18" y="9" width="4" height="8" rx="1" fill="var(--color-ink)" />
    {/* Paper Label */}
    <rect x="12" y="24" width="24" height="15" rx="2" fill="var(--color-surface-muted)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Code bracket icon on label */}
    <path d="M19 29L16 32L19 35M29 29L32 32L29 35" stroke="var(--color-accent-hover)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="25" y1="28" x2="23" y2="36" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const SkillsIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Chip base */}
    <rect x="10" y="10" width="28" height="28" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    {/* Chip pins */}
    <line x1="16" y1="5" x2="16" y2="10" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="5" x2="24" y2="10" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="5" x2="32" y2="10" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="38" x2="16" y2="43" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="24" y1="38" x2="24" y2="43" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="32" y1="38" x2="32" y2="43" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5" y1="16" x2="10" y2="16" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5" y1="24" x2="10" y2="24" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5" y1="32" x2="10" y2="32" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="38" y1="16" x2="43" y2="16" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="38" y1="24" x2="43" y2="24" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="38" y1="32" x2="43" y2="32" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Inner core */}
    <rect x="16" y="16" width="16" height="16" rx="2" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Lightning energy icon */}
    <path d="M25 18L20 25H25L23 30L29 23H24L25 18Z" fill="var(--color-ink)" />
  </svg>
);

export const CertificatesIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Ribbons */}
    <path d="M19 28L15 42L24 37L33 42L29 28" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="2" strokeLinejoin="round" />
    {/* Medal rosette circle */}
    <circle cx="24" cy="20" r="14" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    <circle cx="24" cy="20" r="10" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Star inside medal */}
    <path
      d="M24 14L25.8 17.8L30 18.4L26.9 21.4L27.7 25.6L24 23.6L20.3 25.6L21.1 21.4L18 18.4L22.2 17.8L24 14Z"
      fill="var(--color-ink)"
    />
  </svg>
);

export const ResumeIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Document sheet */}
    <path
      d="M10 8C10 6.9 10.9 6 12 6H28L38 16V40C38 41.1 37.1 42 36 42H12C10.9 42 10 41.1 10 40V8Z"
      fill="var(--color-surface)"
      stroke="var(--color-border)"
      strokeWidth="2.5"
    />
    {/* Folded corner */}
    <path d="M28 6V16H38" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="2" />
    {/* CV Badge badge */}
    <rect x="15" y="20" width="18" height="10" rx="2" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    <text
      x="24"
      y="27.5"
      textAnchor="middle"
      fontSize="8"
      fontWeight="900"
      fontFamily="monospace"
      fill="var(--color-ink)"
    >
      CV
    </text>
    {/* Summary lines */}
    <line x1="15" y1="34" x2="33" y2="34" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" />
    <line x1="15" y1="38" x2="27" y2="38" stroke="var(--color-ink-muted)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ContactIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Envelope Body */}
    <rect x="6" y="12" width="36" height="26" rx="3" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    {/* Flap lines */}
    <path d="M6 15L24 28L42 15" stroke="var(--color-border)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 36L18 25" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 36L30 25" stroke="var(--color-border)" strokeWidth="2" strokeLinecap="round" />
    {/* Stamp top-right */}
    <rect x="30" y="16" width="8" height="7" rx="1" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1.5" />
    <circle cx="34" cy="19.5" r="1.5" fill="var(--color-ink)" />
  </svg>
);

export const FAQIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Speech bubble */}
    <path
      d="M8 12C8 9.8 9.8 8 12 8H36C38.2 8 40 9.8 40 12V28C40 30.2 38.2 32 36 32H20L12 39V32H12C9.8 32 8 30.2 8 28V12Z"
      fill="var(--color-surface)"
      stroke="var(--color-border)"
      strokeWidth="2.5"
    />
    {/* Accent inner plate */}
    <circle cx="24" cy="20" r="9" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Question mark */}
    <text
      x="24"
      y="24"
      textAnchor="middle"
      fontSize="12"
      fontWeight="900"
      fontFamily="monospace"
      fill="var(--color-ink)"
    >
      ?
    </text>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className = "", size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Retro Gear Outer */}
    <circle cx="24" cy="24" r="12" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="2.5" />
    {/* Gear teeth */}
    <rect x="22" y="6" width="4" height="6" rx="1" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1.5" />
    <rect x="22" y="36" width="4" height="6" rx="1" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1.5" />
    <rect x="6" y="22" width="6" height="4" rx="1" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1.5" />
    <rect x="36" y="22" width="6" height="4" rx="1" fill="var(--color-accent)" stroke="var(--color-border)" strokeWidth="1.5" />
    {/* Diagonal teeth */}
    <line x1="12" y1="12" x2="16" y2="16" stroke="var(--color-border)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="36" y1="36" x2="32" y2="32" stroke="var(--color-border)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="36" y1="12" x2="32" y2="16" stroke="var(--color-border)" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="12" y1="36" x2="16" y2="32" stroke="var(--color-border)" strokeWidth="3.5" strokeLinecap="round" />
    {/* Center Hole */}
    <circle cx="24" cy="24" r="5" fill="var(--color-titlebar)" stroke="var(--color-border)" strokeWidth="2" />
  </svg>
);
