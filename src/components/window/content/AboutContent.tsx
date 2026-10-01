"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/content";
import { CERTIFICATES_DATA, Certificate } from "@/data/certificates";
import { sound } from "@/lib/sound";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  GraduationCap,
  Briefcase,
  Trophy,
  Code2,
  Layers,
  Award,
  ExternalLink,
  FileText,
  CheckCircle2,
  Database,
  Cpu,
  Wrench,
  ChevronRight,
  ZoomIn,
  BarChart3,
  Languages,
} from "lucide-react";

interface AboutContentProps {
  onNavigate?: (tab: "about" | "links" | "work" | "certificates" | "faq" | "contact") => void;
}

export const AboutContent: React.FC<AboutContentProps> = ({ onNavigate }) => {
  const { profile, education, experience, codingStats, projects } = PORTFOLIO_DATA;

  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Categorized Technical Skills — clean chips only
  const skillsData = [
    {
      category: "Languages",
      title: "Programming Languages",
      icon: <Code2 className="w-4 h-4 text-purple-500" />,
      items: ["Java", "Python", "C", "C++", "C#", "JavaScript (ES6+)", "TypeScript", "SQL"],
    },
    {
      category: "Web & Frameworks",
      title: "Web & Full-Stack Frameworks",
      icon: <Globe className="w-4 h-4 text-sky-500" />,
      items: ["React.js", "Next.js", "Spring Boot", "ASP.NET Core", "Node.js", "Express.js", "REST APIs", "Tailwind CSS", "HTML5 & CSS3"],
    },
    {
      category: "Databases",
      title: "Databases & ORMs",
      icon: <Database className="w-4 h-4 text-amber-500" />,
      items: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Entity Framework Core", "Hibernate"],
    },
    {
      category: "Tools & DevOps",
      title: "Tools & Developer Platforms",
      icon: <Wrench className="w-4 h-4 text-rose-500" />,
      items: ["Git & GitHub", "VS Code", "Postman", "Docker Basics", "Visual Studio", "PowerShell", "Figma", "MS Office"],
    },
    {
      category: "Core Concepts",
      title: "Core Computer Science Concepts",
      icon: <Cpu className="w-4 h-4 text-emerald-500" />,
      items: ["OOP (Java / C#)", "DBMS", "Data Structures & Algorithms (DSA)", "Operating Systems", "Computer Networks", "SDLC & Agile"],
    },
  ];

  const proficiencySkills = [
    { name: "React.js & Next.js", percentage: 92 },
    { name: "Java & Spring Boot", percentage: 88 },
    { name: "JavaScript / TypeScript", percentage: 90 },
    { name: "C# & ASP.NET Core", percentage: 84 },
    { name: "SQL (MySQL / PostgreSQL)", percentage: 88 },
    { name: "Data Structures & Algorithms", percentage: 85 },
    { name: "Git & GitHub", percentage: 92 },
    { name: "REST APIs & Postman", percentage: 90 },
  ];

  const skillFilterTabs = ["All", "Languages", "Web & Frameworks", "Databases", "Tools & DevOps", "Core Concepts"];
  const filteredSkillCategories =
    activeSkillCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeSkillCategory);

  // Personal info cards
  const personalInfo = [
    { icon: <Mail className="w-4 h-4 text-red-500" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: <Phone className="w-4 h-4 text-emerald-500" />, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: <MapPin className="w-4 h-4 text-amber-500" />, label: "Region", value: "India" },
    { icon: <Languages className="w-4 h-4 text-sky-500" />, label: "Languages", value: "Hindi · English · Marathi" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-slate-800 dark:text-slate-200">

      {/* ================================================================ */}
      {/* SECTION 1 — PROFILE HEADER: Photo + Personal Info                 */}
      {/* ================================================================ */}
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start p-6 sm:p-9 rounded-2xl bg-white dark:bg-[#1e232b] border border-slate-200 dark:border-slate-700/80 shadow-xl">
        {/* Photo — enlarged, prominent frame, luxury hover */}
        <div
          className="flex-shrink-0 self-center sm:self-start cursor-pointer group relative"
          onClick={() => { sound.playOpen(); }}
          title="Mayur Banait"
        >
          <div
            className="relative w-[220px] h-[280px] sm:w-[260px] sm:h-[325px] rounded-3xl overflow-hidden gpu-layer transition-all duration-300 group-hover:-translate-y-1.5 shadow-xl"
            style={{
              boxShadow: "0 16px 48px -8px rgba(0,0,0,0.25), 0 4px 14px -3px rgba(0,0,0,0.14)",
              border: "2.5px solid #e2e8f0",
            }}
          >
            <Image
              src="/mayur-photo.png"
              alt="Mayur Banait"
              fill
              sizes="(max-width: 640px) 220px, 260px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
              unoptimized
            />
            {/* Hover amber glow border overlay */}
            <div className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 ring-amber-400/80 transition-all duration-300 pointer-events-none" />
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          {/* Subtle outer glow on hover */}
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: "0 0 0 5px rgba(251,191,36,0.22)" }} />
        </div>

        {/* Personal Info Block */}
        <div className="flex-1 space-y-3.5 min-w-0 w-full">
          {/* Name + Title */}
          <div className="group/name cursor-default">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono transition-colors duration-200 group-hover/name:text-amber-500">
              Mayur Banait
            </h1>
            <p className="text-sm sm:text-base font-semibold text-amber-500 dark:text-amber-400 mt-0.5 font-mono">
              Full-Stack Developer · B.Tech CSE (2026)
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">@mbanait43</p>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Dedicated Full-Stack Developer with hands-on experience in <b>React.js · Next.js</b>,
            backend systems in <b>Java (Spring Boot)</b> & <b>C# (.NET Core)</b>, and 100+ DSA problems solved.
            Open to full-time & internship opportunities immediately.
          </p>

          {/* Info Cards — premium hover: scale + border glow */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-2.5 pt-1">
            {personalInfo.map((item) => (
              <div
                key={item.label}
                className="group/card flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-all duration-200 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md cursor-default"
              >
                <span className="flex-shrink-0 transition-transform duration-200 group-hover/card:scale-110">{item.icon}</span>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-500 transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover/card:text-amber-500 transition-colors">{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Resume CTA */}
          <div className="flex gap-3 pt-1 flex-wrap">
            <a
              href={profile.links.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-mono font-bold shadow-sm transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-amber-200 dark:hover:shadow-amber-900/40 hover:shadow-lg active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {onNavigate && (
              <button
                type="button"
                onClick={() => { sound.playClick(); onNavigate("contact"); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-mono font-bold transition-all duration-200 hover:border-amber-400 hover:scale-105 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Contact Me</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 2 — EDUCATION (Sleek Hover Lift & Glow)                   */}
      {/* ================================================================ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
          <GraduationCap className="w-5 h-5 text-amber-500" />
          <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-wider">
            Education
          </h2>
        </div>

        <div className="space-y-3.5">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="group/edu p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] shadow-xs space-y-2 border-l-4 border-l-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-400 dark:hover:border-amber-500/80 hover:bg-amber-50/20 dark:hover:bg-[#2a303c] cursor-default"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover/edu:text-amber-600 dark:group-hover/edu:text-amber-400 transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                    {edu.institution} &bull; <span className="text-slate-500 dark:text-slate-400">{edu.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs flex-shrink-0">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">{edu.year}</span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700">{edu.score}</span>
                </div>
              </div>
              {edu.highlights && (
                <ul className="pl-5 list-disc text-xs text-slate-600 dark:text-slate-400 space-y-0.5 pt-0.5">
                  {edu.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 3 — INTERNSHIP / EXPERIENCE (Interactive Hover Lift)      */}
      {/* ================================================================ */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
          <Briefcase className="w-5 h-5 text-amber-500" />
          <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-wider">
            Internship
          </h2>
        </div>

        <div className="space-y-3.5">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-400 dark:hover:border-amber-500/80 cursor-default ${
                exp.statusBadge
                  ? "bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/20 border-blue-300 dark:border-blue-700/60 shadow-xs"
                  : "bg-white dark:bg-[#252a34] border-slate-200 dark:border-slate-700 shadow-xs"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{exp.role}</h3>
                    {exp.statusBadge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500 text-white shadow-xs">
                        {exp.statusBadge}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                    {exp.company} &bull; <span className="text-slate-500 dark:text-slate-400">{exp.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs flex-shrink-0">
                  <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">{exp.period}</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold">{exp.type}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">{exp.description}</p>

              {exp.contributions && (
                <ul className="pl-5 list-disc text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-1.5">
                  {exp.contributions.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              )}

              <div className="flex flex-wrap gap-1.5 pt-3">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="chip-hover px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 text-xs font-mono text-slate-700 dark:text-slate-300 select-none hover:border-amber-400 transition-colors shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 4 — ACHIEVEMENTS: 100+ DSA Problems                       */}
      {/* ================================================================ */}
      <div className="p-5 sm:p-6 rounded-2xl border border-amber-200 dark:border-amber-800/40 bg-gradient-to-r from-amber-50 to-orange-50/60 dark:from-amber-950/20 dark:to-orange-950/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white uppercase">
              Achievements
            </h2>
          </div>
        </div>

        {/* Hero Achievement Badge — hover lift */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-400 cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md flex-shrink-0">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white font-mono">100+ Coding Problems Solved</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              LeetCode · GeeksforGeeks · HackerRank · CodeChef
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {codingStats.platforms.map((plat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-400 cursor-default"
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 dark:text-slate-200">
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span>{plat.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono leading-tight">{plat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 5 — PROFESSIONAL SKILLS                                   */}
      {/* (No "Sa Re Ga Ma" text — just the clean heading)                  */}
      {/* ================================================================ */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" />
            <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-wider">
              Professional Skills
            </h2>
          </div>
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {skillFilterTabs.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => { sound.playClick(); setActiveSkillCategory(cat); }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all duration-150 cursor-pointer select-none ${
                  activeSkillCategory === cat
                    ? "bg-amber-500 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Chip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkillCategories.map((group, gIdx) => (
            <div key={gIdx} className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] shadow-xs space-y-3">
              <h3 className="font-mono font-bold text-xs sm:text-sm text-slate-900 dark:text-white uppercase flex items-center gap-2">
                {group.icon}
                <span>{group.title}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    onMouseEnter={() => sound.playSkillHover()}
                    onTouchStart={() => sound.playSkillHover()}
                    className="chip-hover px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-mono font-medium text-slate-800 dark:text-slate-200 shadow-2xs hover:border-amber-400 dark:hover:border-amber-500 cursor-pointer select-none transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Matrix */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>Skill Proficiency Matrix</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Practical Application</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {proficiencySkills.map((skill, sIdx) => (
              <div
                key={sIdx}
                onMouseEnter={() => sound.playSkillHover()}
                onTouchStart={() => sound.playSkillHover()}
                className="space-y-1.5 p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer select-none border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="flex justify-between text-xs font-medium">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{skill.name}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{skill.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-700"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 6 — PROJECTS                                              */}
      {/* ================================================================ */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-wider">
              Featured Projects
            </h2>
          </div>
          {onNavigate && (
            <button
              type="button"
              onClick={() => { sound.playOpen(); onNavigate("work"); }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.slice(0, 4).map((project) => {
            const isExt = project.type === "extension";
            return (
              <div
                key={project.id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] overflow-hidden shadow-sm transition-all duration-250 flex flex-col group hover:-translate-y-1 hover:shadow-lg hover:border-amber-400 dark:hover:border-amber-500"
                style={{ transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease" }}
              >
                {/* Screenshot Thumbnail */}
                {project.image && (
                  <div className="relative w-full h-32 bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-700">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy"
                      className={`${isExt ? "object-contain p-1.5" : "object-cover object-top"} transition-transform duration-400 group-hover:scale-108`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                )}

                <div className="p-3 space-y-1.5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {isExt ? "Chrome Extension" : project.category}
                    </span>
                    {project.status && (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">✓ {project.status}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">{tech}</span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="flex-1 text-center px-2 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-mono font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="flex-1 text-center px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-mono font-bold hover:border-amber-400 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1"
                      >
                        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SECTION 7 — CERTIFICATES (bottom, with click-to-enlarge modal)    */}
      {/* ================================================================ */}
      <div className="space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white uppercase tracking-wider">
              Verified Certifications
            </h2>
          </div>
          {onNavigate && (
            <button
              type="button"
              onClick={() => { sound.playOpen(); onNavigate("certificates"); }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <span>All ({CERTIFICATES_DATA.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] overflow-hidden shadow-sm flex flex-col group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-amber-400"
              style={{ transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease" }}
            >
              {/* Thumbnail — lazy, click to enlarge */}
              <div
                onClick={() => { sound.playOpen(); setSelectedCert(cert); }}
                className="relative w-full h-28 bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden border-b border-slate-200 dark:border-slate-700/80"
                title="Click to enlarge"
              >
                <Image
                  src={cert.imagePath}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white font-mono text-[10px] font-bold pointer-events-none">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </div>
              </div>

              <div className="p-2.5 space-y-1.5 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold truncate max-w-[70%]">{cert.issuer}</span>
                  <span className="text-slate-400 flex-shrink-0">{cert.date?.split(",")[0]}</span>
                </div>
                <h3 className="font-bold text-[10px] sm:text-xs text-slate-900 dark:text-white leading-snug flex-1 line-clamp-2">{cert.title}</h3>
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono font-bold">
                  <a
                    href={cert.pdfPath || cert.imagePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    <FileText className="w-3 h-3 text-amber-500" />
                    PDF
                  </a>
                  {cert.verificationUrl ? (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-0.5 text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      Verify <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                      OK
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* CERTIFICATE LIGHTBOX MODAL                                        */}
      {/* ================================================================ */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
          onClick={() => { sound.playClickClose(); setSelectedCert(null); }}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#383c44] text-white px-5 py-3 flex items-center justify-between select-none flex-shrink-0">
              <span className="font-mono text-sm font-bold truncate">{selectedCert.title}</span>
              <button
                type="button"
                onClick={() => { sound.playClickClose(); setSelectedCert(null); }}
                className="font-mono text-sm font-bold text-white/90 hover:text-white px-2 py-0.5 rounded hover:bg-white/10 active:scale-90 cursor-pointer"
              >
                [x]
              </button>
            </div>

            <div className="relative w-full flex-1 bg-slate-950 flex items-center justify-center p-2 min-h-[55vh]">
              <Image
                src={selectedCert.imagePath}
                alt={selectedCert.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                unoptimized
              />
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300 flex-shrink-0">
              <span><b>{selectedCert.issuer}</b> &bull; {selectedCert.date}</span>
              <a
                href={selectedCert.pdfPath || selectedCert.imagePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
              >
                Open Document
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
