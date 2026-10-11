"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface AiTerminalCardProps {
  onClaimAccess: () => void;
  className?: string;
}

interface ChatScenario {
  id: string;
  levelBadge: string;
  chipLabel: string;
  toolCall: string;
  question: string;
  replyParagraphs: string[];
}

const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: "affordability",
    levelBadge: "Level 2 • Derived Math",
    chipLabel: "Can I afford ₹500?",
    toolCall: "tool: daily_safe_limit + balance",
    question: "Can I afford ₹500 today?",
    replyParagraphs: [
      "Your available balance is ₹37.21 as of 6 Oct 2026 (5 days ago).",
      "Your safe spending limit is ₹7.44 a day until 11 Oct. Spending ₹500 right now would exceed your safe limit and leave you overdrawn for the rest of your cycle.",
    ],
  },
  {
    id: "netflix",
    levelBadge: "Level 1 • Single Fact",
    chipLabel: "Spent on Netflix?",
    toolCall: "tool: spending_summary",
    question: "How much did I spend on Netflix?",
    replyParagraphs: [
      "You spent ₹597.00 on Netflix across 3 payments between 6 Jul and 6 Oct 2026.",
      "Your subscription is ₹199.00 a month, last paid on 23 Sep. Your next expected charge is around 21 Oct.",
    ],
  },
  {
    id: "pace",
    levelBadge: "Level 2 • Spending Pace",
    chipLabel: "Am I spending faster?",
    toolCall: "tool: spending_pace",
    question: "Am I spending faster lately?",
    replyParagraphs: [
      "Your 7-day spending pace is ₹182.43 a day, compared to ₹1,224.00 a day in the previous window.",
      "Your average daily spending dropped by 85.1% over the last week as of 6 Oct 2026.",
    ],
  },
  {
    id: "bills",
    levelBadge: "Level 2 • Recurring Bills",
    chipLabel: "What bills do I have?",
    toolCall: "tool: bills_and_subscriptions",
    question: "What bills do I have coming up?",
    replyParagraphs: [
      "You have 1 active recurring bill detected: Netflix at ₹199.00 a month.",
      "It was last paid on 23 Sep 2026. The next payment is estimated for 21 Oct.",
    ],
  },
  {
    id: "comparison",
    levelBadge: "Level 3 • Multi-Step",
    chipLabel: "Compare Aug vs Sep",
    toolCall: "tool: spending_summary (2 rounds)",
    question: "Compare my spending in August and September",
    replyParagraphs: [
      "In August, total outflow was ₹14,210.00 across 42 payments. In September, total outflow was ₹18,450.00 across 56 payments.",
      "September spending was ₹4,240.00 higher than August, driven primarily by dining out and grocery restocks.",
    ],
  },
];

export default function AiTerminalCard({
  onClaimAccess,
  className = "",
}: AiTerminalCardProps) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedQuestion, setTypedQuestion] = useState("");
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>([]);
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [currentParaText, setCurrentParaText] = useState("");
  const [phase, setPhase] = useState<"typing_q" | "calling_tool" | "streaming_r" | "idle">("typing_q");
  
  const isUserInteractingRef = useRef(false);
  const currentScenario = CHAT_SCENARIOS[scenarioIndex];

  // Simulation state machine
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
        }, 35);
      } else {
        timer = setTimeout(() => {
          setPhase("calling_tool");
        }, 350);
      }
    } else if (phase === "calling_tool") {
      // Simulate Gemini calling backend tool and fetching exact statement numbers
      timer = setTimeout(() => {
        setPhase("streaming_r");
      }, 600);
    } else if (phase === "streaming_r") {
      const targetParas = currentScenario.replyParagraphs;
      const targetPara = targetParas[currentParaIndex];

      if (currentParaText.length < targetPara.length) {
        timer = setTimeout(() => {
          const step = Math.min(4, targetPara.length - currentParaText.length);
          setCurrentParaText(targetPara.slice(0, currentParaText.length + step));
        }, 20);
      } else {
        // Current paragraph finished
        if (currentParaIndex < targetParas.length - 1) {
          timer = setTimeout(() => {
            setTypedParagraphs((prev) => [...prev, currentParaText]);
            setCurrentParaIndex((prev) => prev + 1);
            setCurrentParaText("");
          }, 200);
        } else {
          // All paragraphs completed
          setTypedParagraphs((prev) => [...prev, currentParaText]);
          setPhase("idle");
        }
      }
    } else if (phase === "idle") {
      timer = setTimeout(() => {
        if (!isUserInteractingRef.current) {
          setScenarioIndex((prev) => (prev + 1) % CHAT_SCENARIOS.length);
          setTypedQuestion("");
          setTypedParagraphs([]);
          setCurrentParaIndex(0);
          setCurrentParaText("");
          setPhase("typing_q");
        }
      }, 5500);
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
    }, 7000);
  }, []);

  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-xl bg-[#0F1014] border border-white/[0.08] p-5 sm:p-7 shadow-2xl relative overflow-hidden text-left ${className}`}
    >
      {/* Hairline top subtle glow accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent" />

      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="font-mono text-[11px] text-[#8A8F98] ml-2 tracking-tight">
            gemini ~ 7 tools grounded
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] text-emerald-400 tracking-wider">
            {currentScenario.levelBadge}
          </span>
        </div>
      </div>

      {/* Simulated Conversation Box */}
      <div className="space-y-4 mb-5 min-h-[175px] flex flex-col justify-center">
        {/* User Question */}
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

        {/* AI Reply with Tool Invocation Indicator */}
        <div className="flex items-start gap-3 pt-3 border-t border-white/[0.04]">
          <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider pt-0.5 shrink-0 w-12">
            Setthi:
          </span>

          <div className="space-y-2.5 flex-1">
            {phase === "calling_tool" ? (
              <div className="flex items-center gap-2 font-mono text-xs text-[#8A8F98]">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Invoking {currentScenario.toolCall}...</span>
              </div>
            ) : (
              <>
                {/* Committed Paragraphs */}
                {typedParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-sans text-[13.5px] sm:text-[14.5px] text-[#D4D4D8] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}

                {/* Currently Streaming Paragraph */}
                {phase === "streaming_r" && currentParaText && (
                  <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#D4D4D8] leading-relaxed">
                    {currentParaText}
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 align-middle animate-pulse" />
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Level / Question Chips */}
      <div className="space-y-4 pt-3 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-mono text-[#8A8F98] mr-1 uppercase">
            Test a question:
          </span>
          {CHAT_SCENARIOS.map((sc, index) => {
            const isSelected = scenarioIndex === index;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => selectScenario(index)}
                className={`text-[11px] font-sans px-3 py-1.5 rounded-md transition-all border ${
                  isSelected
                    ? "bg-white/[0.12] text-white border-white/30 font-medium"
                    : "bg-[#14161C] text-[#8A8F98] border-white/[0.08] hover:border-white/20 hover:text-[#EDEDED]"
                }`}
              >
                {sc.chipLabel}
              </button>
            );
          })}
        </div>

        {/* Footer Row: Grounded Trust Line & Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A8F98]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Exact bank statement numbers • No emojis • 100% Free</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href="#details"
              className="text-[12px] font-medium text-[#8A8F98] hover:text-[#EDEDED] px-3.5 py-2 rounded-full border border-white/[0.08] hover:border-white/25 transition-all text-center"
            >
              See All Capabilities
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
