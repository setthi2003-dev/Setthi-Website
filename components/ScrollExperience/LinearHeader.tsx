"use client";

import React from "react";
import Link from "next/link";

import AiCompanionRive from "@/components/AiCompanionRive";

interface LinearHeaderProps {
  currentDay: number;
  scrollPercent: number;
  isReducedMotion: boolean;
  onToggleMotion: () => void;
  onOpenWaitlist: () => void;
}

export default function LinearHeader({
  currentDay,
  scrollPercent,
  isReducedMotion,
  onToggleMotion,
  onOpenWaitlist,
}: LinearHeaderProps) {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("details");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 mx-auto w-[calc(100%-2rem)] max-w-4xl z-50">
      <div className="h-10 px-3.5 rounded-full bg-[#0D0E12]/85 backdrop-blur-md border border-white/[0.08] flex items-center justify-between shadow-2xl transition-all">
        {/* Setthi AI Rive brand mark */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 group text-[#EDEDED] hover:text-white transition-colors"
          >
            <AiCompanionRive size={24} />
            <span className="font-semibold text-[13px] tracking-[-0.03em] text-[#EDEDED]">
              Setthi
            </span>
          </Link>

          <span className="text-white/[0.15] text-xs">/</span>

          {/* Scrub position counter (Day 1 to 30) */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#8A8F98] tabular-nums">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            <span>
              Day {String(currentDay).padStart(2, "0")}&thinsp;/&thinsp;30
            </span>
            <span className="hidden sm:inline text-white/[0.15]">•</span>
            <span className="hidden sm:inline text-[#8A8F98]/80">
              {Math.round(scrollPercent * 100)}%
            </span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Motion Mode Switcher */}
          <button
            type="button"
            onClick={onToggleMotion}
            title={
              isReducedMotion
                ? "Switch to scroll-driven timeline"
                : "Switch to static Bento grid layout"
            }
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8A8F98] hover:text-[#EDEDED] px-2.5 py-1 rounded-full border border-transparent hover:border-white/[0.08] transition-all"
          >
            <span>Motion:</span>
            <span className="text-white">
              {isReducedMotion ? "Bento" : "Scroll"}
            </span>
          </button>

          {/* Discrete Skip Experience button */}
          <a
            href="#details"
            onClick={handleSkip}
            className="text-[11px] font-medium tracking-tight text-[#8A8F98] hover:text-[#EDEDED] px-2.5 py-1 rounded-full transition-colors hidden xs:inline-block"
          >
            Skip Experience
          </a>

          {/* Primary Action Button: Solid white pill button with integrated keyboard shortcut badge */}
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="group inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-white text-black hover:bg-[#F2F2F2] active:scale-[0.98] transition-all shadow-[0_0_12px_rgba(255,255,255,0.2)] text-[12px] font-semibold tracking-tight border border-white"
          >
            <span>Join Waitlist</span>
            <kbd className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] bg-black/[0.1] text-black px-1.5 py-0.5 rounded border border-black/10">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
