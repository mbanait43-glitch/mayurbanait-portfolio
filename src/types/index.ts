export type WindowId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "certificates"
  | "resume"
  | "contact"
  | "faq"
  | "settings";

export interface WindowState {
  id: WindowId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
}

export type WallpaperPattern = "dots" | "grid" | "plain";

export interface Project {
  id: string;
  title: string;
  category: "Java" | ".NET" | "MERN" | "Extensions" | "All" | string;
  description: string;
  stack: string[];
  highlights: string[];
  image?: string;
  type?: "web" | "extension";
  status?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  contributions: string[];
  skills: string[];
  statusBadge?: string;
  featured?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  score: string;
  highlights?: string[];
}

export interface CertificateItem {
  id?: string;
  title: string;
  issuer: string;
  date?: string;
  year?: string;
  imagePath?: string;
  pdfPath?: string;
  verificationUrl?: string;
  code?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SkillLevel {
  name: string;
  percentage: number;
  category: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
