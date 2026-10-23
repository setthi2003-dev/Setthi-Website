"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import AiCompanionRive from "@/components/AiCompanionRive";

export interface PhoneScenario {
  id: string;
  chipLabel: string;
  badge: string;
  toolCall: string;
  question: string;
  replyParagraphs: string[];
  safeVerdict: string;
}

export const PHONE_SCENARIOS: PhoneScenario[] = [
  {
    id: "dinner",
    chipLabel: "Can I afford dinner? 🍕",
    badge: "Level 2 • Safe Spending Limit",
    toolCall: "tool: daily_safe_limit (₹820/day) + balance",
    question: "Can I afford dinner with friends tonight?",
    safeVerdict: "Safe to spend • ₹820/day limit",
    replyParagraphs: [
      "Yes, comfortably. Your available balance is ₹7,050 with 4 days until salary.",
      "Your safe daily limit is ₹820. A ₹500 dinner keeps you ₹320 ahead with zero debt.",
    ],
  },
  {
    id: "salary_where",
    chipLabel: "Where did my money go? 💸",
    badge: "Level 1 • Spending Breakdown",
    toolCall: "tool: spending_summary (28 transactions)",
    question: "Where did most of my salary go this month?",
    safeVerdict: "Honest breakdown • No judgment",
    replyParagraphs: [
      "Out of ₹50,000, fixed bills & rent took ₹24,000. Food delivery was ₹14,200 across 19 orders.",
      "You have ₹7,050 remaining — enough to finish the month without borrowing.",
    ],
  },
  {
    id: "bills",
    chipLabel: "Any surprise bills? 📅",
    badge: "Level 2 • Upcoming Charges",
    toolCall: "tool: recurring_bills + subscriptions",
    question: "Any surprise bills coming up before Friday?",
    safeVerdict: "Clear forecast • 1 charge detected",
    replyParagraphs: [
      "Just 1 active subscription: Netflix at ₹199 on 21 Oct.",
      "No other recurring debits are scheduled. You are completely safe.",
    ],
  },
  {
    id: "roast",
    chipLabel: "Roast my spending 🔥",
    badge: "Roast Mode • Radical Honesty",
    toolCall: "tool: spending_pace + delivery_frequency",
    question: "Be honest, roast my Swiggy habit 🔥",
    safeVerdict: "Radical honesty • Clean conscience",
    replyParagraphs: [
      "You ordered late-night food 19 times this month. The delivery rider knows your dog by name.",
      "The good news? You didn't touch your emergency savings. Let's cook twice this week.",
    ],
  },
];

interface PhoneChatExperienceProps {
  scrollProgress: number; // Overall timeline progress (0.46 -> 1.0)
  onClaimAccess: () => void;
  className?: string;
}

export default function PhoneChatExperience({
  scrollProgress,
  onClaimAccess,
  className = "",
}: PhoneChatExperienceProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>([]);
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [currentParaText, setCurrentParaText] = useState("");
  const [phase, setPhase] = useState<"typing_q" | "calling_tool" | "streaming_r" | "idle">("typing_q");

  const isUserInteractingRef = useRef(false);
  const currentScenario = PHONE_SCENARIOS[scenarioIndex];

  // -------------------------------------------------------------
  // THE CLEO ZOOM-OUT CHOREOGRAPHY
  // Stage 1 (0.46 -> 0.68): Up-close direct conversation with AI Companion
  // Stage 2 (0.68 -> 0.90): As user scrolls, the view ZOOMS OUT into the 3D phone
  // Stage 3 (0.90 -> 1.00): Fully settled in 3D isometric tilt with editorial copy
  // -------------------------------------------------------------
  
  // Progress of the zoom-out transition [0.0 = up-close, 1.0 = fully docked 3D phone]
  const zoomProgress = Math.min(1, Math.max(0, (scrollProgress - 0.66) / 0.22));
  
  // Easing function for smooth cinematic camera pull-back
  const zoomEase = Math.sin((zoomProgress * Math.PI) / 2);

  // Phone 3D perspective transforms
  const rotateY = -zoomEase * 9.5;    // 0deg -> -9.5deg
  const rotateX = zoomEase * 4.5;     // 0deg -> 4.5deg
  const translateZ = -zoomEase * 50;  // 0px -> -50px depth
  const scale = 1.05 - zoomEase * 0.15; // 1.05 (up-close) -> 0.90 (tilted 3D phone)

  // On desktop, the phone shifts smoothly from center to the right half
  const translateXDesktop = zoomEase * 80;

  // The outer smartphone hardware chassis (titanium borders, dynamic island, buttons) fades in as we zoom out
  const chassisOpacity = Math.min(1, Math.max(0, (zoomProgress - 0.10) / 0.60));

  // The left editorial narrative fades and slides in as the phone pulls back
  const editorialOpacity = Math.min(1, Math.max(0, (zoomProgress - 0.35) / 0.65));
  const editorialTranslateX = (1 - editorialOpacity) * -24;

  // Conversation state machine
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "typing_q") {
      setTypedParagraphs([]);
      setCurrentParaIndex(0);
      setCurrentParaText("");
      const target = currentScenario.question;

      if (typedQuestion.length < target.length) {
        timer = setTimeout(() => {
          setTypedQuestion(target.slice(0, typedQuestion.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setPhase("calling_tool");
        }, 320);
      }
    } else if (phase === "calling_tool") {
      timer = setTimeout(() => {
        setPhase("streaming_r");
      }, 550);
    } else if (phase === "streaming_r") {
      const targetParas = currentScenario.replyParagraphs;
      const targetPara = targetParas[currentParaIndex];

      if (currentParaText.length < targetPara.length) {
        timer = setTimeout(() => {
          const step = Math.min(4, targetPara.length - currentParaText.length);
          setCurrentParaText(targetPara.slice(0, currentParaText.length + step));
        }, 18);
      } else {
        if (currentParaIndex < targetParas.length - 1) {
          timer = setTimeout(() => {
            setTypedParagraphs((prev) => [...prev, currentParaText]);
            setCurrentParaIndex((prev) => prev + 1);
            setCurrentParaText("");
          }, 180);
        } else {
          setTypedParagraphs((prev) => [...prev, currentParaText]);
          setPhase("idle");
        }
      }
    } else if (phase === "idle") {
      timer = setTimeout(() => {
        if (!isUserInteractingRef.current) {
          setScenarioIndex((prev) => (prev + 1) % PHONE_SCENARIOS.length);
          setTypedQuestion("");
          setTypedParagraphs([]);
          setCurrentParaIndex(0);
          setCurrentParaText("");
          setPhase("typing_q");
        }
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [phase, typedQuestion, currentParaText, currentParaIndex, currentScenario]);

  const selectScenario = useCallback((idx: number) => {
    isUserInteractingRef.current = true;
    setScenarioIndex(idx);
    setTypedQuestion("");
    setTypedParagraphs([]);
    setCurrentParaIndex(0);
    setCurrentParaText("");
    setPhase("typing_q");
    setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 8000);
  }, []);

  return (
    <div className={`w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 px-4 relative ${className}`}>
      
      {/* ─── UP-CLOSE PHASE PROMPT BANNER (Only visible before zooming out) ─── */}
      <div
        className="absolute top-0 inset-x-0 mx-auto text-center pointer-events-none transition-all duration-300 z-10"
        style={{
          opacity: Math.max(0, 1 - zoomProgress * 2.5),
          transform: `translateY(${-zoomProgress * 20}px)`,
          display: zoomProgress > 0.4 ? "none" : "block",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14151B]/90 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-[#8A8F98] mb-2 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200">AI Companion In Focus</span>
          <span className="text-white/20">•</span>
          <span>Scroll down to zoom out ↓</span>
        </div>
      </div>

      {/* ─── LEFT EDITORIAL NARRATIVE (Fades & slides in as the phone zooms out) ─── */}
      <div
        className="w-full lg:w-[42%] text-center lg:text-left flex flex-col items-center lg:items-start select-none transition-all duration-300"
        style={{
          opacity: editorialOpacity,
          transform: `translateX(${editorialTranslateX}px)`,
          pointerEvents: editorialOpacity > 0.6 ? "auto" : "none",
          display: zoomProgress < 0.25 ? "none" : "flex",
        }}
      >
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1C23] border border-white/[0.08] text-xs font-mono text-[#8A8F98] mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200">The Conversation</span>
          <span className="text-white/20">•</span>
          <span>Zero Guilt</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08] mb-4 text-balance">
          Money talks. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
            Setthi gives you peace of mind.
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-[#9A9EA7] leading-relaxed max-w-md mb-6 font-sans text-pretty">
          No rigid spreadsheets. No moralizing lectures. Ask what you can afford in plain English and get calm, mathematically grounded clarity.
        </p>

        {/* Interactive Question Chips */}
        <div className="w-full mb-6">
          <div className="text-xs font-mono text-[#8A8F98] uppercase tracking-wider mb-2.5">
            Tap a question to test:
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            {PHONE_SCENARIOS.map((sc, index) => {
              const isSelected = scenarioIndex === index;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => selectScenario(index)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-300 border cursor-pointer active:scale-95 ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/35 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : "bg-[#14151B] text-[#8A8F98] border-white/[0.06] hover:border-white/20 hover:text-white"
                  }`}
                >
                  {sc.chipLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grounded Trust & CTA Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onClaimAccess}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all duration-300 text-xs font-semibold tracking-tight shadow-[0_4px_20px_rgba(255,255,255,0.2)] border border-white cursor-pointer"
          >
            <span>Get free early access</span>
            <span className="font-mono text-xs">→</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#717682]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>28 bank facts • 0 ads</span>
          </div>
        </div>
      </div>

      {/* ─── THE CONVERSATION STAGE (ZOOMS OUT INTO THE 3D PHONE) ─── */}
      <div
        className="w-full lg:w-[54%] flex items-center justify-center"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className="relative transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translateX(${typeof window !== 'undefined' && window.innerWidth >= 1024 ? translateXDesktop : 0}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Ambient device backlight glow (intensifies as chassis frames in) */}
          <div
            className="absolute -inset-4 rounded-[60px] blur-2xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: 0.2 + chassisOpacity * 0.25,
              background: "radial-gradient(ellipse at 50% 40%, rgba(16, 185, 129, 0.28) 0%, transparent 70%)",
              transform: "translateZ(-80px)",
            }}
          />

          {/* ─── HARDWARE BUTTONS (Left Side) ─── */}
          <div
            className="absolute -left-[9px] top-28 w-[4px] h-8 bg-[#2A2B33] rounded-l-md border-l border-white/20 transition-opacity duration-300"
            style={{ opacity: chassisOpacity }}
          />
          <div
            className="absolute -left-[9px] top-40 w-[4px] h-12 bg-[#2A2B33] rounded-l-md border-l border-white/20 transition-opacity duration-300"
            style={{ opacity: chassisOpacity }}
          />
          <div
            className="absolute -left-[9px] top-56 w-[4px] h-12 bg-[#2A2B33] rounded-l-md border-l border-white/20 transition-opacity duration-300"
            style={{ opacity: chassisOpacity }}
          />

          {/* ─── HARDWARE BUTTON (Right Side Power) ─── */}
          <div
            className="absolute -right-[9px] top-36 w-[4px] h-16 bg-[#2A2B33] rounded-r-md border-r border-white/20 transition-opacity duration-300"
            style={{ opacity: chassisOpacity }}
          />

          {/* ─── CHASSIS: Titanium Outer Shell ─── */}
          <div
            className="w-[310px] xs:w-[330px] sm:w-[350px] md:w-[360px] h-[640px] sm:h-[660px] rounded-[52px] p-[10px] relative overflow-hidden select-none transition-all duration-300"
            style={{
              background: `linear-gradient(to bottom, rgba(44, 45, 53, ${chassisOpacity}), rgba(26, 27, 32, ${chassisOpacity}) 50%, rgba(37, 38, 46, ${chassisOpacity}))`,
              boxShadow: `0 30px 90px rgba(0,0,0,${0.5 + chassisOpacity * 0.35}), 0 0 0 1px rgba(255,255,255,${chassisOpacity * 0.08})`,
            }}
          >
            {/* Inner Screen Container */}
            <div className="w-full h-full rounded-[44px] bg-[#0A0B0E] p-3 flex flex-col justify-between relative overflow-hidden border border-white/[0.06] shadow-inner">
              
              {/* ─── TOP STATUS BAR & DYNAMIC ISLAND ─── */}
              <div
                className="relative z-20 pt-1 pb-2 px-3 flex items-center justify-between text-xs text-white/80 font-mono transition-opacity duration-300"
                style={{ opacity: 0.3 + chassisOpacity * 0.7 }}
              >
                {/* Clock */}
                <span className="font-semibold text-[11px] tracking-tight">9:41</span>

                {/* Dynamic Island */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-1.5 w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2 border border-white/10 shadow-sm transition-opacity duration-300"
                  style={{ opacity: chassisOpacity }}
                >
                  {/* Camera lens reflection */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111318] ring-1 ring-white/15 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                  </div>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 h-1 bg-white rounded-full" />
                    <span className="w-0.5 h-1.5 bg-white rounded-full" />
                    <span className="w-0.5 h-2 bg-white rounded-full" />
                    <span className="w-0.5 h-2.5 bg-white rounded-full" />
                  </div>
                  <div className="w-4 h-2 rounded-[3px] border border-white/70 p-0.5 flex items-center">
                    <div className="h-full w-full bg-emerald-400 rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* ─── IN-APP HEADER BAR (Prominent AI Companion Avatar) ─── */}
              <div className="relative z-20 px-3 py-2 rounded-2xl bg-[#14151B]/90 backdrop-blur-md border border-white/[0.06] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden">
                    <AiCompanionRive size={24} />
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white tracking-tight">Setthi AI</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/90">
                      Statement Grounded
                    </span>
                  </div>
                </div>

                {/* Live balance indicator */}
                <div className="text-right">
                  <span className="block text-[9px] font-mono text-[#8A8F98] uppercase">Safe Limit</span>
                  <span className="text-xs font-mono font-semibold text-white">₹820 / day</span>
                </div>
              </div>

              {/* ─── CHAT FEED CONTAINER (Direct conversation animation) ─── */}
              <div className="flex-1 my-3 overflow-y-auto overflow-x-hidden flex flex-col justify-end gap-3 px-1 relative z-10">
                {/* 1. User Message (Pushed from right) */}
                <div className="self-end max-w-[85%] text-left">
                  <div className="bg-[#1F2128] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs font-medium border border-white/[0.08] shadow-md leading-relaxed">
                    &ldquo;{typedQuestion}&rdquo;
                    {phase === "typing_q" && (
                      <span className="inline-block w-1 h-3 ml-1 bg-white align-middle animate-pulse" />
                    )}
                  </div>
                  <span className="block text-[9px] font-mono text-[#8A8F98] text-right mt-1 pr-1">
                    Just now
                  </span>
                </div>

                {/* 2. Tool Query Pill */}
                {phase === "calling_tool" && (
                  <div className="self-start flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25 text-[11px] font-mono text-emerald-400 animate-pulse text-left">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span>Querying statement records...</span>
                  </div>
                )}

                {/* 3. AI Companion Response Bubble */}
                {(phase === "streaming_r" || phase === "idle") && (
                  <div className="self-start max-w-[92%] text-left flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/25 shrink-0 flex items-center justify-center overflow-hidden mt-0.5">
                      <AiCompanionRive size={18} />
                    </div>

                    <div className="flex-1 bg-[#13141B] text-[#EDEDED] px-4 py-3 rounded-2xl rounded-tl-sm text-xs border border-white/[0.08] shadow-lg space-y-2">
                      {/* Verdict banner */}
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-medium text-emerald-400">
                        <span>✓</span>
                        <span>{currentScenario.safeVerdict}</span>
                      </div>

                      {/* Paragraphs */}
                      {typedParagraphs.map((para, i) => (
                        <p key={i} className="leading-relaxed text-[#D4D4D8]">
                          {para}
                        </p>
                      ))}

                      {phase === "streaming_r" && currentParaText && (
                        <p className="leading-relaxed text-[#D4D4D8]">
                          {currentParaText}
                          <span className="inline-block w-1 h-3 ml-1 bg-emerald-400 align-middle animate-pulse" />
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── IN-APP BOTTOM DOCK & HOME INDICATOR ─── */}
              <div className="relative z-20 pt-1 pb-1">
                {/* In-app input simulation */}
                <div className="h-9 rounded-full bg-[#15171F] border border-white/[0.08] px-3.5 flex items-center justify-between text-xs text-[#6B707B]">
                  <span className="truncate">Ask Setthi about any debit...</span>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    ↑
                  </div>
                </div>

                {/* iOS Home Indicator Bar */}
                <div
                  className="w-28 h-1 bg-white/25 rounded-full mx-auto mt-2 transition-opacity duration-300"
                  style={{ opacity: chassisOpacity }}
                />
              </div>

              {/* Glass surface reflection shine */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.02] z-30 transition-opacity duration-300"
                style={{ opacity: chassisOpacity }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
