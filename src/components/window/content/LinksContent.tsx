"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { sound } from "@/lib/sound";
import { ExternalLink } from "lucide-react";
import {
  RealisticGitHubIcon,
  RealisticLinkedInIcon,
  RealisticWhatsAppIcon,
  RealisticInstagramIcon,
  RealisticGmailIcon,
  RealisticResumeIcon,
  RealisticPhoneIcon,
  RealisticLeetCodeIcon,
} from "@/components/common/RealisticBrandIcons";

export const LinksContent: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const links = [
    {
      label: "GitHub",
      sublabel: "mbanait43-glitch",
      url: profile.links.github,
      icon: <RealisticGitHubIcon size={44} />,
      badgeBorder: "hover:border-slate-500/50",
      description: "Explore my source code, repositories & open source projects",
    },
    {
      label: "LinkedIn",
      sublabel: "Mayur Banait",
      url: profile.links.linkedin,
      icon: <RealisticLinkedInIcon size={44} />,
      badgeBorder: "hover:border-blue-500/50",
      description: "Connect professionally on LinkedIn",
    },
    {
      label: "WhatsApp",
      sublabel: "+91 8103755388",
      url: profile.links.whatsapp,
      icon: <RealisticWhatsAppIcon size={44} />,
      badgeBorder: "hover:border-emerald-500/50",
      description: "Chat instantly on WhatsApp",
    },
    {
      label: "Instagram",
      sublabel: "@mayur_banait83",
      url: profile.links.instagram,
      icon: <RealisticInstagramIcon size={44} />,
      badgeBorder: "hover:border-pink-500/50",
      description: "Follow on Instagram",
    },
    {
      label: "Email",
      sublabel: profile.email,
      url: `mailto:${profile.email}`,
      icon: <RealisticGmailIcon size={44} />,
      badgeBorder: "hover:border-red-500/50",
      description: "Send a direct email to Mayur",
    },
    {
      label: "Resume / CV",
      sublabel: "Official Google Drive PDF",
      url: profile.links.resumePdf,
      icon: <RealisticResumeIcon size={44} />,
      badgeBorder: "hover:border-amber-500/50",
      description: "View & download verified resume",
    },
    {
      label: "Direct Phone",
      sublabel: profile.phone,
      url: `tel:${profile.phone}`,
      icon: <RealisticPhoneIcon size={44} />,
      badgeBorder: "hover:border-green-500/50",
      description: "Call directly for immediate inquiries",
    },
    {
      label: "LeetCode",
      sublabel: "100+ Problems Solved",
      url: "https://leetcode.com",
      icon: <RealisticLeetCodeIcon size={44} />,
      badgeBorder: "hover:border-yellow-500/50",
      description: "Data Structures & Algorithm solutions",
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto text-sm leading-relaxed p-1 sm:p-3">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">
          Connect & Verified Profiles
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          All links are 100% active, verified, and open in a new tab.
        </p>
      </div>

      {/* Clean realistic brand icon cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onTouchStart={() => sound.playTouchFeedback()}
            onClick={() => sound.playClick()}
            className={`group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#252a34] border border-slate-200 dark:border-slate-700/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${link.badgeBorder} active:scale-[0.98] select-none`}
          >
            {/* Realistic Icon Badge */}
            <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              {link.icon}
            </div>

            {/* Label & Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  {link.label}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
              </div>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-300 font-semibold truncate">
                {link.sublabel}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-0.5">
                {link.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          💡 Each link opens directly in a new browser tab!
        </p>
      </div>
    </div>
  );
};
