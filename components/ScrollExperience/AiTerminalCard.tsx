"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface AiTerminalCardProps {
  onClaimAccess: () => void;
  className?: string;
}

interface Scenario {
  id: string;
  label: string;
  question: string;
  response: string;
  badge: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "where-money-went",
    label: "Where did my salary go?",
    question: "Where did my salary go this month?",
    response:
      "Balance: ₹7,050. ₹8,400 drained into post-midnight orders and subscriptions you haven't opened in 4 months.",
    badge: "Monthly Check",
  },
  {
    id: "can-i-afford",
    label: "Can I afford dinner tonight?",
    question: "Can I afford dinner at Bastian tonight?",
    response:
      "Rent is ₹22,000 next Monday. If you spend ₹4,000 on dinner tonight, you'll have only ₹3,050 left for the entire week. Better cook at home!",
    badge: "Safe-to-Spend",
  },
  {
    id: "show-leaks",
    label: "Show my money leaks",
    question: "What are my biggest money leaks?",
    response:
      "Found 4 leaks: Swiggy at 1:14 AM (₹420), Blinkit at 2:30 AM (₹180), Netflix you haven't watched (₹649), and late-night Biryani (₹850).",
    badge: "Leak Alert",
  },
];

export default function AiTerminalCard({
  onClaimAccess,
  className = "",
}: AiTerminalCardProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [typedResponse, setTypedResponse] = useState("");
  const [phase, setPhase] = useState<"typing_q" | "thinking" | "typing_r" | "idle">("typing_q");
  const isInteractingRef = useRef(false);

  const currentScenario = SCENARIOS[scenarioIndex];

  // Typing animation simulation loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing_q") {
      setTypedResponse("");
      const targetText = currentScenario.question;
      if (typedQuestion.length < targetText.length) {
        timeout = setTimeout(() => {
          setTypedQuestion(targetText.slice(0, typedQuestion.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setPhase("thinking");
        }, 300);
      }
    } else if (phase === "thinking") {
      timeout = setTimeout(() => {
        setPhase("typing_r");
      }, 500);
    } else if (phase === "typing_r") {
      const targetText = currentScenario.response;
      if (typedResponse.length < targetText.length) {
        timeout = setTimeout(() => {
          // Type in small chunks for natural speed
          const step = Math.min(3, targetText.length - typedResponse.length);
          setTypedResponse(targetText.slice(0, typedResponse.length + step));
        }, 25);
      } else {
        setPhase("idle");
      }
    } else if (phase === "idle") {
      // Pause on completed answer before moving to next question automatically
      timeout = setTimeout(() => {
        if (!isInteractingRef.current) {
          setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
          setTypedQuestion("");
          setTypedResponse("");
          setPhase("typing_q");
        }
      }, 4500);
    }

    return () => clearTimeout(timeout);
  }, [phase, typedQuestion, typedResponse, currentScenario]);

  const selectScenario = useCallback((index: number) => {
    isInteractingRef.current = true;
    setScenarioIndex(index);
    setTypedQuestion("");
    setTypedResponse("");
    setPhase("typing_q");
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 6000);
  }, []);

  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-xl bg-[#0F1014] border border-white/[0.08] p-5 sm:p-7 shadow-2xl relative overflow-hidden text-left ${className}`}
    >
      {/* Hairline subtle glow accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="font-mono text-[11px] text-[#8A8F98] ml-2 tracking-tight">
            setthi ~ ask anything
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            {currentScenario.badge}
          </span>
        </div>
      </div>

      {/* Simulated Conversation Box (No manual user typing input) */}
      <div className="space-y-4 mb-5 min-h-[140px] flex flex-col justify-center">
        {/* User Question Simulation */}
        <div className="flex items-start gap-3">
          <span className="font-mono text-[11px] text-[#8A8F98] uppercase tracking-wider pt-0.5 shrink-0 w-12">
            You:
          </span>
          <div className="font-sans text-[15px] sm:text-[16px] text-[#EDEDED] font-medium leading-relaxed">
            &ldquo;{typedQuestion}&rdquo;
            {phase === "typing_q" && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-white align-middle animate-pulse" />
            )}
          </div>
        </div>

        {/* AI Answer Simulation */}
        <div className="flex items-start gap-3 pt-2 border-t border-white/[0.04]">
          <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider pt-0.5 shrink-0 w-12">
            Setthi:
          </span>
          <div className="font-sans text-[14px] sm:text-[15px] text-[#D4D4D8] leading-relaxed">
            {phase === "thinking" ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8F98]">
                <span>Checking your expenses</span>
                <span className="animate-pulse">...</span>
              </span>
            ) : typedResponse ? (
              <>
                <span>{typedResponse}</span>
                {phase === "typing_r" && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-emerald-400 align-middle animate-pulse" />
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Interactive Question Chips (Click to test different questions) */}
      <div className="space-y-4 pt-3 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-mono text-[#8A8F98] mr-1 uppercase">
            Try a question:
          </span>
          {SCENARIOS.map((scenario, index) => {
            const isSelected = scenarioIndex === index;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => selectScenario(index)}
                className={`text-[11px] font-sans px-3 py-1.5 rounded-md transition-all border ${
                  isSelected
                    ? "bg-white/[0.12] text-white border-white/30 font-medium"
                    : "bg-[#14161C] text-[#8A8F98] border-white/[0.08] hover:border-white/20 hover:text-[#EDEDED]"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>

        {/* Footer Row: Simple Trust Line & Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A8F98]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>100% Free • Stays private on your phone • No ads</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href="#details"
              className="text-[12px] font-medium text-[#8A8F98] hover:text-[#EDEDED] px-3.5 py-2 rounded-full border border-white/[0.08] hover:border-white/25 transition-all text-center"
            >
              Learn More
            </a>

            <button
              type="button"
              onClick={onClaimAccess}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-[#F0F0F0] active:scale-[0.98] transition-all text-[12px] font-semibold tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.18)] border border-white shrink-0"
            >
              <span>Get Free Early Access</span>
              <span className="font-mono text-xs">→</span>
              <kbd className="hidden sm:inline-flex items-center justify-center font-mono text-[10px] bg-black/[0.1] text-black px-1.5 py-0.5 rounded border border-black/10">
                ↵
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
