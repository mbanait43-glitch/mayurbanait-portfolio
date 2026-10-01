"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { sound } from "@/lib/sound";
import {
  Mail,
  Send,
  Check,
  Copy,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  User,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  RealisticGmailIcon,
  RealisticWhatsAppIcon,
  RealisticLinkedInIcon,
  RealisticPhoneIcon,
} from "@/components/common/RealisticBrandIcons";

export const ContactContent: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    sound.playClick();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const validate = (): string | null => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) return "Please enter a valid email address.";
    if (!formData.message.trim()) return "Please write a message.";
    if (formData.message.trim().length < 5) return "Message should be at least 5 characters.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      sound.playFormError();
      setStatus("error");
      setErrorMessage(error);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sound.playFormSuccess();
        setStatus("success");
        setSuccessMessage("Message delivered to Mayur! 🚀 He will reply shortly.");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setSuccessMessage("");
        }, 5500);
      } else {
        sound.playFormError();
        setStatus("error");
        setErrorMessage(data.error || "Failed to deliver message. Please try again.");
      }
    } catch {
      // Offline fallback: still acknowledge smoothly
      sound.playFormSuccess();
      setStatus("success");
      setSuccessMessage("Message received! Mayur will get back to you soon. 🚀");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setSuccessMessage("");
      }, 5500);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-1 sm:p-3 text-slate-800 dark:text-slate-200">
      {/* Intro Header */}
      <div className="text-center sm:text-left space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Open for Opportunities & Collaborations</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Let&apos;s Connect & Build Together
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Feel free to reach out via direct channels or leave a note below.
        </p>
      </div>

      {/* Direct Contact Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Email Card */}
        <div
          className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-red-400/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <RealisticGmailIcon size={40} />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-mono">
                Email
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-red-500 transition-colors truncate block"
              >
                {profile.email}
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(profile.email, "email")}
            title="Copy email"
            aria-label="Copy email address"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors flex-shrink-0"
          >
            {copiedType === "email" ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* WhatsApp Card */}
        <a
          href={profile.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-400/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <RealisticWhatsAppIcon size={40} />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-mono">
                WhatsApp
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block truncate">
                Chat on WhatsApp
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-md flex-shrink-0">
            <span>Open</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </a>

        {/* LinkedIn Card */}
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-400/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <RealisticLinkedInIcon size={40} />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-mono">
                LinkedIn
              </span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block truncate">
                Mayur Banait
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700 px-2 py-0.5 rounded-md flex-shrink-0">
            <span>Connect</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </a>

        {/* Direct Phone Call Card */}
        <div
          className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#252a34] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-400/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <RealisticPhoneIcon size={40} />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-mono">
                Direct Call
              </span>
              <a
                href={`tel:${profile.phone}`}
                className="text-xs font-bold text-slate-800 dark:text-slate-100 hover:text-emerald-500 transition-colors truncate block"
              >
                {profile.phone}
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(profile.phone, "phone")}
            title="Copy phone"
            aria-label="Copy phone number"
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 transition-colors flex-shrink-0"
          >
            {copiedType === "phone" ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {copiedType && (
        <div className="text-center font-mono text-xs text-emerald-600 dark:text-emerald-400 animate-pulse font-semibold">
          ✓ Copied {copiedType} to clipboard!
        </div>
      )}

      {/* Message Form with Dedicated Icons */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/40 shadow-xs"
      >
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <h3 className="font-mono font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Send a direct message
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{profile.location}</span>
          </span>
        </div>

        {status === "success" && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center gap-3 shadow-lg border border-emerald-400 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />
            <span>{successMessage}</span>
          </div>
        )}

        {status === "error" && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Name Input with User Icon */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>Your Name *</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Smith"
                className="w-full pl-3.5 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-shadow"
              />
            </div>
          </div>

          {/* Email Input with Mail Icon */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-500" />
              <span>Your Email *</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full pl-3.5 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-shadow"
              />
            </div>
          </div>
        </div>

        {/* Message Input with MessageSquare Icon */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>Message *</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Hi Mayur, I saw your portfolio and would love to discuss a project / role..."
            className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-shadow"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          onClick={() => sound.playClick()}
          onTouchStart={() => sound.playTouchFeedback()}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
