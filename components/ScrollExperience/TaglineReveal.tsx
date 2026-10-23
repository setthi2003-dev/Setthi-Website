"use client";

import React, { useEffect, useRef, useState } from "react";

interface TaglineRevealProps {
  className?: string;
}

const WORDS = [
  "Stop",
  "wondering",
  "where",
  "your",
  "money",
  "went.",
  "One",
  "quiet",
  "conversation",
  "brings",
  "instant",
  "clarity",
  "to",
  "every",
  "rupee.",
];

export default function TaglineReveal({ className = "" }: TaglineRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress from when top enters lower 85% of viewport to when center reaches mid-viewport
        const triggerStart = windowHeight * 0.85;
        const triggerEnd = windowHeight * 0.35;
        const currentPos = rect.top;

        if (currentPos > triggerStart) {
          setActiveCount(0);
        } else if (currentPos < triggerEnd) {
          setActiveCount(WORDS.length);
        } else {
          const ratio = (triggerStart - currentPos) / (triggerStart - triggerEnd);
          const count = Math.min(
            WORDS.length,
            Math.max(0, Math.floor(ratio * (WORDS.length + 1)))
          );
          setActiveCount(count);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`w-full py-16 sm:py-28 md:py-32 flex items-center justify-center bg-[#000000] text-center px-4 ${className}`}
    >
      <div className="max-w-[680px] mx-auto space-y-5 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-white/[0.08] text-emerald-400 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>The core promise</span>
        </div>

        <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance leading-snug sm:leading-tight">
          {WORDS.map((word, index) => {
            const isActive = index < activeCount;
            return (
              <span
                key={index}
                className="inline-block mr-2 xs:mr-2.5 sm:mr-3.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.28)",
                  transform: isActive ? "translateY(0)" : "translateY(2px)",
                }}
              >
                {word}
              </span>
            );
          })}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[#8A8F98] max-w-lg mx-auto text-pretty leading-relaxed px-2">
          No manual bookkeeping, no confusing spreadsheets, and no judgment. Just grounded answers from your bank statements.
        </p>
      </div>
    </section>
  );
}
