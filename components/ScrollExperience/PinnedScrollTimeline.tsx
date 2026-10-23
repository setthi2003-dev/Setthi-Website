"use client";

import React, { useRef, useState, useEffect } from "react";
import NotificationToast from "./NotificationToast";
import AiTerminalCard from "./AiTerminalCard";
import PhoneChatExperience from "./PhoneChatExperience";
import AiCompanionRive from "@/components/AiCompanionRive";
import CalmBoxMachine from "./CalmBoxMachine";
import { TRANSACTIONS, TransactionItem } from "./types";

interface PinnedScrollTimelineProps {
  initialProgress?: number;
  onClaimAccess: () => void;
  onProgressChange: (progress: number, day: number) => void;
}

export default function PinnedScrollTimeline({
  initialProgress = 0,
  onClaimAccess,
  onProgressChange,
}: PinnedScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(initialProgress);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("progress");
      if (p) {
        const val = Math.min(1, Math.max(0, parseFloat(p)));
        setScrollProgress(val);
        const day = Math.min(28, Math.max(1, Math.floor(1 + val * 27)));
        onProgressChange(val, day);
        if (containerRef.current) {
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
          window.scrollTo(0, containerRef.current.offsetTop + totalScrollable * val);
        }
      }
    }
  }, [onProgressChange]);

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

  // Screen 1 Salary Card docking transition (clean exit before Screen 2 begins)
  const salaryDockProgress = Math.min(1, Math.max(0, (scrollProgress - 0.05) / 0.12));

  // 3D Z-Axis Transaction Flight Parameters
  const STREAM_START = 0.15;
  const STREAM_END = 0.46;
  const FLIGHT_WINDOW = 0.07;

  // Number of transactions arrived at front plane
  const arrivedTxCount = TRANSACTIONS.filter((_, idx) => {
    const target = STREAM_START + (idx / (TRANSACTIONS.length - 1)) * (STREAM_END - STREAM_START);
    return scrollProgress >= target;
  }).length;
  const displayTxCount = Math.max(1, arrivedTxCount);

  // Deterministic 2D scatter offsets for 28 messy, overlapping horizontal cards across wide canvas
  const SCATTER_PROFILES = [
    // 0: Swiggy
    { x: -380, yOffset: -170, zRest: 15 },
    // 1: Blinkit Late Night
    { x: 360, yOffset: -140, zRest: -10 },
    // 2: Uber Daily Commute
    { x: -240, yOffset: -200, zRest: 5 },
    // 3: Chai Wala
    { x: -410, yOffset: 40, zRest: -25 },
    // 4: Landlord (Rent)
    { x: 40, yOffset: -220, zRest: 25 },
    // 5: Zomato Lunch Box
    { x: 220, yOffset: -180, zRest: -15 },
    // 6: Zepto Groceries
    { x: -120, yOffset: -90, zRest: 10 },
    // 7: Third Wave Coffee
    { x: 390, yOffset: 15, zRest: -5 },
    // 8: Rapido Bike Taxi
    { x: -330, yOffset: -60, zRest: 20 },
    // 9: Amazon Prime Order
    { x: 150, yOffset: -80, zRest: -20 },
    // 10: Spotify Auto-Debit
    { x: -400, yOffset: 130, zRest: 15 },
    // 11: Cult.fit Gym Sub
    { x: -260, yOffset: 30, zRest: -10 },
    // 12: Curefoods Salads
    { x: 310, yOffset: -60, zRest: 10 },
    // 13: BESCOM Power Bill
    { x: -70, yOffset: -140, zRest: -15 },
    // 14: Blue Tokai Coffee
    { x: 410, yOffset: -110, zRest: 5 },
    // 15: Dunzo 24/7 Meds
    { x: -180, yOffset: 110, zRest: -30 },
    // 16: Netflix Auto-Debit
    { x: 240, yOffset: 30, zRest: 20 },
    // 17: Swiggy Instamart
    { x: -320, yOffset: 180, zRest: -5 },
    // 18: Airtel Fiber WiFi
    { x: 50, yOffset: -40, zRest: 15 },
    // 19: Starbucks Cold Brew
    { x: 380, yOffset: 100, zRest: -25 },
    // 20: Apple iCloud 200GB
    { x: -110, yOffset: 40, zRest: 5 },
    // 21: BookMyShow Tickets
    { x: 130, yOffset: 120, zRest: 20 },
    // 22: Naturals Ice Cream
    { x: -250, yOffset: 160, zRest: -15 },
    // 23: Late Night Biryani
    { x: -30, yOffset: 170, zRest: 10 },
    // 24: Uber Airport Drop
    { x: 400, yOffset: 180, zRest: -10 },
    // 25: Instamart Supplies
    { x: 270, yOffset: 195, zRest: 15 },
    // 26: YouTube Premium
    { x: -370, yOffset: 95, zRest: -20 },
    // 27: Index SIP Auto-Save
    { x: 90, yOffset: 70, zRest: 30 },
  ];

  // Calculate true 3D Z-axis coordinates for each transaction card
  const getCardTransform = (index: number) => {
    const total = TRANSACTIONS.length;
    const targetProgress = STREAM_START + (index / (total - 1)) * (STREAM_END - STREAM_START);
    const entryStart = targetProgress - FLIGHT_WINDOW;
    const cfg = SCATTER_PROFILES[index % SCATTER_PROFILES.length];

    // Not yet entered the visible horizon
    if (scrollProgress < entryStart) {
      return {
        isVisible: false,
        isFront: false,
        style: { display: "none" as const },
      };
    }

    // In-flight travel: continuously hurtling forward from far away along the Z-axis
    if (scrollProgress < targetProgress) {
      const rawT = (scrollProgress - entryStart) / FLIGHT_WINDOW;
      // Smooth sinusoidal ease-out for steady, majestic flight toward the camera
      const t = Math.sin((rawT * Math.PI) / 2);

      // Continuous Z-travel from deep distance (-2800px) to resting front plane
      const z = -2800 + t * 2810;

      // Far away in the horizon, items emerge near the center vanishing point and disperse outward
      const originFactor = 0.15 + 0.85 * t;
      const x = cfg.x * originFactor;
      const y = cfg.yOffset * originFactor;

      // Scale gradually expands from distant speck (0.20) to full size (1.0)
      const scale = 0.20 + 0.80 * t;

      // Atmospheric depth blur clears up as it approaches the viewer
      const blur = (1 - t) * 7;

      // Distant cards become visible early in the background
      const opacity = Math.min(1, 0.2 + rawT * 0.8);

      return {
        isVisible: true,
        isFront: t > 0.85,
        style: {
          transform: `translate3d(calc(${x.toFixed(1)}px * var(--scatter-x, 1)), calc(${y.toFixed(1)}px * var(--scatter-y, 1)), ${z.toFixed(1)}px) scale(${scale.toFixed(3)})`,
          opacity,
          filter: blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none",
          zIndex: Math.round(15 + t * 35),
          boxShadow: t > 0.8
            ? `0 16px 40px rgba(0, 0, 0, 0.6), 0 0 ${Math.round(t * 20)}px rgba(16, 185, 129, ${(t * 0.2).toFixed(2)})`
            : "none",
        },
      };
    }

    // DOWNWARD CASCADE FALL: Cards fall DOWNWARDS out of the viewport
    const CASCADE_START = 0.50;
    const cardFallStart = CASCADE_START + (index / (total - 1)) * 0.20;
    const cardFallEnd = cardFallStart + 0.12;

    if (scrollProgress >= cardFallStart) {
      const fallRaw = Math.min(1, Math.max(0, (scrollProgress - cardFallStart) / (cardFallEnd - cardFallStart)));
      // Gravitational acceleration downwards
      const fallEase = Math.pow(fallRaw, 1.8);
      const fallY = cfg.yOffset + fallEase * 1100; // falls 1100px down completely off-screen
      const fallRotate = (index % 2 === 0 ? 1 : -1) * fallEase * 18;
      const opacity = Math.max(0, 1 - fallEase * 1.25);

      if (opacity <= 0.01) {
        return {
          isVisible: false,
          isFront: false,
          style: { display: "none" as const },
        };
      }

      return {
        isVisible: true,
        isFront: false,
        style: {
          transform: `translate3d(calc(${cfg.x.toFixed(1)}px * var(--scatter-x, 1)), calc(${fallY.toFixed(1)}px * var(--scatter-y, 1)), ${cfg.zRest}px) rotate(${fallRotate.toFixed(1)}deg)`,
          opacity,
          filter: "none",
          zIndex: Math.max(1, 20 - Math.round(fallEase * 15)),
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
        },
      };
    }

    // Settled at rest before cascade begins
    const timeSinceArrival = (scrollProgress - targetProgress) / FLIGHT_WINDOW;
    return {
      isVisible: true,
      isFront: timeSinceArrival < 0.15,
      style: {
        transform: `translate3d(calc(${cfg.x.toFixed(1)}px * var(--scatter-x, 1)), calc(${cfg.yOffset.toFixed(1)}px * var(--scatter-y, 1)), ${cfg.zRest}px)`,
        opacity: 1,
        filter: "none",
        zIndex: Math.max(5, Math.round(35 - (index % 10))),
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
      },
    };
  };



  // Quick jump helper for manual scrubbing
  const jumpToStage = (targetProgress: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerTop + totalScrollable * targetProgress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  // Support direct deep-linking to #spends stage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#spends") {
      setTimeout(() => jumpToStage(0.38), 250);
    }
  }, []);

  // Height: 200vh for Section 1
  return (
    <div
      ref={containerRef}
      className="relative w-full h-[210vh] bg-[#08090C] text-[#EDEDED]"
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
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-8 px-3 sm:px-6 lg:px-10 xl:px-14 2xl:px-20 max-w-[1800px] mx-auto">
        {/* ========================================================= */}
        {/* TOP DOCKED LEDGER BAR (Appears when Salary Card docks at > 15% scroll) */}
        {/* ========================================================= */}
        <div
          className="w-full max-w-3xl lg:max-w-4xl mx-auto mb-3 transition-all duration-300"
          style={{
            display: scrollProgress >= 0.95 ? "none" : "block",
            opacity:
              scrollProgress >= 0.88
                ? Math.max(0, 1 - (scrollProgress - 0.88) / 0.06)
                : salaryDockProgress,
            transform: `translateY(${
              scrollProgress >= 0.88
                ? ((scrollProgress - 0.88) / 0.06) * -15
                : (1 - salaryDockProgress) * -20
            }px)`,
            pointerEvents: salaryDockProgress > 0.5 && scrollProgress < 0.88 ? "auto" : "none",
          }}
        >
          <div className="h-11 sm:h-12 rounded-full bg-[#181818]/90 backdrop-blur-md border border-white/[0.1] px-5 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                Current Balance:
              </span>
              <span className="font-mono text-sm sm:text-base font-semibold text-white tracking-tight tabular-nums">
                ₹{formattedBalance}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#8A8F98]">
                <span>Day {String(currentDay).padStart(2, "0")} / 28</span>
              </div>
              <div className="w-16 sm:w-20 h-1.5 bg-white/[0.08] rounded-full overflow-hidden hidden xs:block">
                <div
                  className="h-full bg-white/70 transition-all duration-150"
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
          {/* SCREEN 1: THE SALARY ANCHOR (0% - 22% scroll) */}
          {/* ------------------------------------------------------- */}
          {scrollProgress < 0.25 && (
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-200 pointer-events-none"
              style={{
                opacity: Math.max(0, 1 - salaryDockProgress),
                transform: `scale(${1 - salaryDockProgress * 0.08}) translateY(${salaryDockProgress * -40}px)`,
              }}
            >
              <div className="w-full max-w-xl rounded-3xl bg-[#181818] border border-white/[0.08] p-7 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.5)] text-left pointer-events-auto">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                    Salary Day • Starting Inflow
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    Day 01 / Salary Day
                  </span>
                </div>

                <div className="my-6">
                  <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-1">
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
                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
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

          {/* SCREEN 2: DAILY TRANSACTIONS CASCADE DOWN & DISAPPEAR (20% - 94% scroll) */}
          {scrollProgress >= 0.18 && scrollProgress < 0.96 && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-200 w-full max-w-[1800px] mx-auto px-2 sm:px-6 lg:px-10"
              style={{
                opacity:
                  scrollProgress < 0.22
                    ? (scrollProgress - 0.16) / 0.06
                    : scrollProgress > 0.86
                    ? Math.max(0, (0.94 - scrollProgress) / 0.08)
                    : 1,
                pointerEvents: scrollProgress >= 0.20 && scrollProgress <= 0.86 ? "auto" : "none",
              }}
            >
              <div className="w-full mb-3 flex items-center justify-between px-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8A8F98]" />
                  <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                    Daily Transactions • In Motion
                  </span>
                </div>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[#EDEDED] tabular-nums">
                  {displayTxCount} transactions
                </span>
              </div>

              {/* 3D Perspective Stage */}
              <div
                className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] lg:h-[740px] flex items-center justify-center [--scatter-x:0.18] xs:[--scatter-x:0.32] sm:[--scatter-x:0.52] md:[--scatter-x:0.75] lg:[--scatter-x:0.92] xl:[--scatter-x:1] 2xl:[--scatter-x:1.15] [--scatter-y:0.65] sm:[--scatter-y:0.85] md:[--scatter-y:1]"
                style={{
                  perspective: "1400px",
                  perspectiveOrigin: "50% 50%",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Ambient 3D Depth Field Visual Cues */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.16] rounded-3xl"
                  style={{
                    backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(16, 185, 129, 0.22) 0%, transparent 70%)`,
                    transform: "translateZ(-400px)",
                  }}
                />

                {TRANSACTIONS.map((tx, index) => {
                  const { isVisible, isFront, style } = getCardTransform(index);
                  if (!isVisible) return null;

                  return (
                    <div
                      key={tx.id}
                      className="absolute w-[84%] max-w-[320px] sm:w-[310px] md:w-[330px] lg:w-[340px] origin-center select-none"
                      style={{
                        ...style,
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity, filter",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <NotificationToast
                        transaction={tx}
                        className={
                          isFront
                            ? "ring-1 ring-emerald-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.7),_0_0_28px_rgba(16,185,129,0.25)]"
                            : ""
                        }
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 text-center font-mono text-[11px] text-[#5A5E68] flex items-center justify-center gap-2">
                <span>Transactions cascade downwards and disappear</span>
              </div>
            </div>
          )}

          {/* EXIT CALLOUT (Appears once all transactions have fallen off-screen) */}
          {scrollProgress >= 0.88 && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 pointer-events-none"
              style={{
                opacity: Math.min(1, (scrollProgress - 0.88) / 0.08),
                transform: `translateY(${(1 - Math.min(1, (scrollProgress - 0.88) / 0.08)) * 20}px)`,
              }}
            >
              <div className="px-5 py-2.5 rounded-full bg-[#14151B]/90 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-[#8A8F98] shadow-lg flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-200">28 debits cleared</span>
                <span className="text-white/20">•</span>
                <span>Scroll down to meet your AI Companion ↓</span>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* BOTTOM TIMELINE SCRUB CONTROLS */}
        {/* ========================================================= */}
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#8A8F98]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Day {String(currentDay).padStart(2, "0")} / 28</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-48">
            <div className="flex-1 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10.5px] text-[#8A8F98] tabular-nums shrink-0">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
