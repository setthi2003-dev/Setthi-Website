"use client";

import React, { useRef, useState, useEffect } from "react";
import NotificationToast from "./NotificationToast";
import AiTerminalCard from "./AiTerminalCard";
import AiCompanionRive from "@/components/AiCompanionRive";
import { TRANSACTIONS, TransactionItem, ExpenseCategory } from "./types";

interface PinnedScrollTimelineProps {
  onClaimAccess: () => void;
  onProgressChange: (progress: number, day: number) => void;
}

export default function PinnedScrollTimeline({
  onClaimAccess,
  onProgressChange,
}: PinnedScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<ExpenseCategory>("leaks");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
          if (totalScrollable <= 0) return;

          // How far from top of container has the viewport scrolled
          const currentScrolled = -rect.top;
          const rawProgress = currentScrolled / totalScrollable;
          const clamped = Math.min(1, Math.max(0, rawProgress));

          setScrollProgress(clamped);

          const currentDay = Math.min(28, Math.max(1, Math.floor(1 + clamped * 27)));
          onProgressChange(clamped, currentDay);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onProgressChange]);

  // Derived Values
  const currentDay = Math.min(28, Math.max(1, Math.floor(1 + scrollProgress * 27)));
  // Balance scrubs down smoothly from 50,000.00 to 7,050.00
  const currentBalance = Math.max(
    7050,
    50000 - (50000 - 7050) * Math.min(1, scrollProgress * 1.05)
  );
  const formattedBalance = currentBalance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Screen phase thresholds
  // Screen 1: 0.00 -> 0.28 (Salary Anchor)
  // Screen 2: 0.25 -> 0.60 (Entropy Stream / Stack)
  // Screen 3: 0.55 -> 0.85 (Triage Pipeline)
  // Screen 4: 0.80 -> 1.00 (AI Intelligence Terminal)

  // Screen 1 Salary Card docking transition
  const salaryDockProgress = Math.min(1, Math.max(0, (scrollProgress - 0.2) / 0.15));

  // Screen 2 stack items count based on scroll
  const visibleTxCount = Math.min(
    TRANSACTIONS.length,
    Math.max(1, Math.floor(((scrollProgress - 0.2) / 0.35) * TRANSACTIONS.length) + 1)
  );

  // Mechanical Reel percentages for Screen 3
  const triageReelProgress = Math.min(1, Math.max(0, (scrollProgress - 0.55) / 0.2));
  const needsPct = Math.round(52 * triageReelProgress);
  const wantsPct = Math.round(28 * triageReelProgress);
  const leaksPct = Math.round(14 * triageReelProgress);
  const savedPct = Math.round(6 * triageReelProgress);

  // Quick jump helper for manual scrubbing
  const jumpToStage = (targetProgress: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + totalScrollable * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420vh] bg-[#08090C] text-[#EDEDED]"
    >
      {/* Background subtle Linear grid texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 px-4 sm:px-8 max-w-5xl mx-auto">
        {/* ========================================================= */}
        {/* TOP DOCKED LEDGER BAR (Appears when Salary Card docks at > 22% scroll) */}
        {/* ========================================================= */}
        <div
          className="w-full max-w-2xl mx-auto mb-3 transition-all duration-300"
          style={{
            display: scrollProgress >= 0.82 ? "none" : "block",
            opacity:
              scrollProgress >= 0.78
                ? Math.max(0, 1 - (scrollProgress - 0.78) / 0.04)
                : salaryDockProgress,
            transform: `translateY(${
              scrollProgress >= 0.78
                ? ((scrollProgress - 0.78) / 0.04) * -15
                : (1 - salaryDockProgress) * -20
            }px)`,
            pointerEvents: salaryDockProgress > 0.5 && scrollProgress < 0.78 ? "auto" : "none",
          }}
        >
          <div className="h-11 rounded-lg bg-[#121316] border border-white/[0.08] px-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-[#8A8F98] uppercase tracking-wider">
                Current Balance:
              </span>
              <span className="font-mono text-sm font-semibold text-white tracking-tight tabular-nums">
                ₹{formattedBalance}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#8A8F98]">
                <span>Day {String(currentDay).padStart(2, "0")} / 28</span>
              </div>
              <div className="w-16 h-1 bg-white/[0.08] rounded-full overflow-hidden hidden xs:block">
                <div
                  className="h-full bg-white/50 transition-all duration-150"
                  style={{ width: `${(currentDay / 28) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN STAGE CANVAS */}
        {/* ========================================================= */}
        <div className="relative flex-1 flex items-center justify-center w-full min-h-0">
          {/* ------------------------------------------------------- */}
          {/* SCREEN 1: THE SALARY ANCHOR (0% - 25% scroll) */}
          {/* ------------------------------------------------------- */}
          {scrollProgress < 0.35 && (
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none"
              style={{
                opacity: 1 - salaryDockProgress * 1.2,
                transform: `scale(${1 - salaryDockProgress * 0.12}) translateY(${salaryDockProgress * -50}px)`,
              }}
            >
              <div className="w-full max-w-xl rounded-2xl bg-[#121316] border border-white/[0.08] p-6 sm:p-9 shadow-2xl text-left pointer-events-auto">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                    Salary Day • Starting Inflow
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    Day 01 / Salary Day
                  </span>
                </div>

                <div className="my-6">
                  <div className="text-[12px] font-mono text-[#8A8F98] uppercase tracking-wider mb-1">
                    Salary Credited
                  </div>
                  <div className="text-4xl sm:text-6xl font-mono font-bold text-white tracking-tight tabular-nums flex items-baseline">
                    <span>₹{formattedBalance}</span>
                  </div>
                </div>

                {/* Hairline progress indicator beneath the card tracking Day 1 to 28 */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#8A8F98]">
                    <span>Days into the month: Day {String(currentDay).padStart(2, "0")}</span>
                    <span>Day 28</span>
                  </div>
                  <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-out"
                      style={{ width: `${(currentDay / 28) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#8A8F98]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Bank deposit received</span>
                  </span>
                  <span className="font-mono">Scroll down to see spending ↓</span>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------- */}
          {/* SCREEN 2: THE ENTROPY STREAM (UPI STACK) (25% - 60% scroll) */}
          {/* ------------------------------------------------------- */}
          {scrollProgress >= 0.2 && scrollProgress < 0.65 && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 w-full max-w-lg mx-auto"
              style={{
                opacity:
                  scrollProgress < 0.25
                    ? (scrollProgress - 0.2) / 0.05
                    : scrollProgress > 0.58
                    ? (0.65 - scrollProgress) / 0.07
                    : 1,
                transform: `scale(${
                  scrollProgress > 0.58 ? 0.95 : 1
                })`,
              }}
            >
              <div className="w-full mb-3 flex items-center justify-between px-1">
                <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                  Daily Spends • Live Stream
                </span>
                <span className="font-mono text-xs text-[#8A8F98]">
                  {visibleTxCount} / {TRANSACTIONS.length} spends logged
                </span>
              </div>

              {/* Rigid vertical rail stack */}
              <div className="relative w-full h-[290px] flex flex-col items-center justify-end">
                {TRANSACTIONS.slice(0, visibleTxCount).map((tx, index) => {
                  const reverseIndex = visibleTxCount - 1 - index; // 0 is top/newest
                  const scale = Math.max(0.85, 1 - reverseIndex * 0.03); // older cards scale down slightly
                  const opacity = reverseIndex === 0 ? 1 : Math.max(0.3, 0.9 - reverseIndex * 0.15); // dim in opacity
                  const translateY = -reverseIndex * 14;

                  return (
                    <div
                      key={tx.id}
                      className="absolute w-full transition-all duration-300 ease-out origin-bottom"
                      style={{
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        opacity: opacity,
                        zIndex: 20 - reverseIndex,
                      }}
                    >
                      <NotificationToast transaction={tx} />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-center font-mono text-[11px] text-[#8A8F98]">
                Every UPI payment slides in and stacks up automatically
              </div>
            </div>
          )}

          {/* ------------------------------------------------------- */}
          {/* SCREEN 3: THE TRIAGE PIPELINE (THE SUBTLE MACHINE) (55% - 85% scroll) */}
          {/* ------------------------------------------------------- */}
          {scrollProgress >= 0.52 && scrollProgress < 0.88 && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 w-full max-w-2xl mx-auto"
              style={{
                opacity:
                  scrollProgress < 0.58
                    ? (scrollProgress - 0.52) / 0.06
                    : scrollProgress > 0.82
                    ? (0.88 - scrollProgress) / 0.06
                    : 1,
                transform: `scale(${
                  scrollProgress > 0.82 ? 0.93 : 1
                })`,
              }}
            >
              <div className="w-full text-center mb-5">
                <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider block mb-1">
                  Automatic Sorting • Zero Manual Math
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Every expense is neatly sorted into four simple buckets.
                </h3>
              </div>

              {/* The Filter Element: Segmented Control horizontally across viewport */}
              <div className="w-full rounded-xl bg-[#121316] border border-white/[0.08] p-1.5 flex items-center justify-between mb-5 shadow-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("essentials")}
                  className={`flex-1 py-2 px-1 text-center rounded-lg font-mono text-xs transition-all ${
                    activeTab === "essentials"
                      ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                      : "text-[#8A8F98] hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">Needs: </span>
                  <span className="sm:hidden">Needs </span>
                  <span className="text-white font-semibold tabular-nums">{needsPct}%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("discretionary")}
                  className={`flex-1 py-2 px-1 text-center rounded-lg font-mono text-xs transition-all ${
                    activeTab === "discretionary"
                      ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                      : "text-[#8A8F98] hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">Wants: </span>
                  <span className="sm:hidden">Wants </span>
                  <span className="text-amber-400 font-semibold tabular-nums">{wantsPct}%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("leaks")}
                  className={`flex-1 py-2 px-1 text-center rounded-lg font-mono text-xs transition-all ${
                    activeTab === "leaks"
                      ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                      : "text-[#8A8F98] hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">Leaks: </span>
                  <span className="sm:hidden">Leaks </span>
                  <span className="text-red-400 font-semibold tabular-nums">{leaksPct}%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("saved")}
                  className={`flex-1 py-2 px-1 text-center rounded-lg font-mono text-xs transition-all ${
                    activeTab === "saved"
                      ? "bg-white/[0.1] text-white border border-white/[0.15] shadow-sm"
                      : "text-[#8A8F98] hover:text-white"
                  }`}
                >
                  <span className="hidden sm:inline">Saved: </span>
                  <span className="sm:hidden">Saved </span>
                  <span className="text-emerald-400 font-semibold tabular-nums">{savedPct}%</span>
                </button>
              </div>

              {/* Compressed 1-line data rows for slotted items */}
              <div className="w-full space-y-2 min-h-[170px]">
                {TRANSACTIONS.filter((tx) => tx.category === activeTab).map((tx) => (
                  <NotificationToast key={tx.id} transaction={tx} compact />
                ))}
              </div>

              <div className="mt-3 text-center font-mono text-[11px] text-[#8A8F98]">
                Needs (Rent & Food), Wants (Coffee & Outings), Leaks (Midnight orders)
              </div>
            </div>
          )}

          {/* ------------------------------------------------------- */}
          {/* SCREEN 4: CHAT WITH YOUR MONEY (80% - 100% scroll) */}
          {/* ------------------------------------------------------- */}
          {scrollProgress >= 0.78 && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 w-full"
              style={{
                opacity:
                  scrollProgress < 0.85
                    ? (scrollProgress - 0.78) / 0.07
                    : 1,
                transform: `scale(${
                  scrollProgress < 0.85 ? 0.94 + ((scrollProgress - 0.78) / 0.07) * 0.06 : 1
                })`,
              }}
            >
              <div className="w-full text-center mb-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-2">
                  <AiCompanionRive size={20} />
                  <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                    Ask Anything • Real Answers
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Chat With Your Money in Plain English
                </h3>
              </div>

              <AiTerminalCard onClaimAccess={onClaimAccess} />
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM TIMELINE SCRUB CONTROLS & STAGE CHIPS */}
        {/* ========================================================= */}
        <div className="w-full max-w-2xl mx-auto pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Stage Quick Jumps */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-[#8A8F98] mr-1 hidden xs:inline uppercase">
              Jump:
            </span>
            <button
              type="button"
              onClick={() => jumpToStage(0.0)}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                scrollProgress < 0.28
                  ? "bg-white/[0.15] text-white"
                  : "text-[#8A8F98] hover:text-white"
              }`}
            >
              0% Salary
            </button>
            <button
              type="button"
              onClick={() => jumpToStage(0.38)}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                scrollProgress >= 0.28 && scrollProgress < 0.62
                  ? "bg-white/[0.15] text-white"
                  : "text-[#8A8F98] hover:text-white"
              }`}
            >
              35% Spends
            </button>
            <button
              type="button"
              onClick={() => jumpToStage(0.72)}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                scrollProgress >= 0.62 && scrollProgress < 0.85
                  ? "bg-white/[0.15] text-white"
                  : "text-[#8A8F98] hover:text-white"
              }`}
            >
              70% Categories
            </button>
            <button
              type="button"
              onClick={() => jumpToStage(0.98)}
              className={`text-[11px] font-mono px-2 py-0.5 rounded transition-colors ${
                scrollProgress >= 0.85
                  ? "bg-white/[0.15] text-white"
                  : "text-[#8A8F98] hover:text-white"
              }`}
            >
              100% Ask AI
            </button>
          </div>

          {/* Interactive Scrub Progress Bar */}
          <div className="flex items-center gap-2 w-full sm:w-48">
            <div className="flex-1 h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-[#8A8F98] tabular-nums shrink-0">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
