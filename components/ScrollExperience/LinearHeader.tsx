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
    <header className="fixed top-3.5 sm:top-5 inset-x-0 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-5xl lg:max-w-6xl xl:max-w-7xl z-50 pointer-events-none transition-all duration-500 ease-out">
      <div className="flex items-center justify-between gap-3 w-full [&>*]:pointer-events-auto">
        {/* Island 1: Brand & Logo */}
        <div className="h-10 sm:h-11 px-3 sm:px-4 rounded-full bg-[#14151B]/90 backdrop-blur-xl border border-white/[0.08] flex items-center gap-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          <Link
            href="/"
            className="flex items-center gap-2 group text-[#EDEDED] hover:text-white transition-colors"
          >
            <div className="relative flex items-center justify-center">
              <AiCompanionRive size={22} />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              Setthi
            </span>
          </Link>
          <span className="text-white/10 text-xs hidden xs:inline">/</span>
          <span className="text-[10px] font-mono text-emerald-400/90 hidden xs:inline">
            ai money bestie
          </span>
        </div>

        {/* Island 2: Floating Scrub Timeline Indicator (Center) */}
        <div className="hidden sm:flex h-10 sm:h-11 px-4 rounded-full bg-[#14151B]/90 backdrop-blur-xl border border-white/[0.08] items-center gap-2 font-mono text-xs text-[#8A8F98] shadow-[0_4px_24px_rgba(0,0,0,0.4)] tabular-nums transition-all duration-300">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200 font-medium">
            Day {String(currentDay).padStart(2, "0")}&thinsp;/&thinsp;28
          </span>
          <span className="text-white/[0.15]">•</span>
          <span className="text-[#8A8F98]">
            {Math.round(scrollPercent * 100)}%
          </span>
        </div>

        {/* Island 3: Actions & CTA (Right) */}
        <div className="h-10 sm:h-11 px-2.5 sm:px-3 rounded-full bg-[#14151B]/90 backdrop-blur-xl border border-white/[0.08] flex items-center gap-2 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300">
          {/* Motion Mode Switcher */}
          <button
            type="button"
            onClick={onToggleMotion}
            title={
              isReducedMotion
                ? "Switch to scroll timeline"
                : "Switch to static Bento grid"
            }
            className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#8A8F98] hover:text-white px-2.5 py-1 rounded-full border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.05] active:scale-[0.98] transition-all"
          >
            <span>Motion:</span>
            <span className="text-white font-medium">
              {isReducedMotion ? "Bento" : "Scroll"}
            </span>
          </button>

          {/* Discrete Skip link */}
          <a
            href="#details"
            onClick={handleSkip}
            className="text-xs font-medium tracking-tight text-[#8A8F98] hover:text-white px-2.5 py-1 rounded-full hover:bg-white/[0.05] transition-colors hidden lg:inline-block"
          >
            Skip
          </a>

          {/* CTA Pill button */}
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="group inline-flex items-center gap-1.5 h-7 sm:h-8 px-3.5 sm:px-4 rounded-full bg-white text-black hover:bg-zinc-200 active:scale-[0.98] transition-all duration-300 text-xs font-semibold tracking-tight border border-white cursor-pointer shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
          >
            <span>Join waitlist</span>
          </button>
        </div>
      </div>
    </header>
  );
}
