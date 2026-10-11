"use client";

import React, { useState } from "react";

interface AiTerminalCardProps {
  onClaimAccess: () => void;
  className?: string;
}

export default function AiTerminalCard({
  onClaimAccess,
  className = "",
}: AiTerminalCardProps) {
  const defaultSynthesis =
    "Balance: ₹7,050. ₹8,400 drained into post-midnight orders and recurring subscriptions you haven't opened in 4 months.";

  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string>(defaultSynthesis);
  const [customInput, setCustomInput] = useState<string>("");

  const chips = [
    {
      id: "leaks",
      label: "Show all leaks",
      response:
        "Flagged 4 leaks: Swiggy (-₹420), Blinkit (-₹180), Netflix (-₹649), Midnight Biryani (-₹850). Total leaked this cycle: ₹8,400.",
    },
    {
      id: "guardrail",
      label: "Set 1 AM guardrail",
      response:
        "Guardrail staged: UPI debits between 12:00 AM - 05:00 AM will require strict 60s cooldown confirmation and tough-love roast preview.",
    },
    {
      id: "audit",
      label: "Audit subscriptions",
      response:
        "Audited 3 recurring debits: Netflix 4K (-₹649/mo, 0 watch hours in 120 days). Tap to cancel with automated RBI e-mandate revocation.",
    },
  ];

  const handleChipClick = (chip: (typeof chips)[0]) => {
    if (activeChip === chip.id) {
      setActiveChip(null);
      setDisplayText(defaultSynthesis);
    } else {
      setActiveChip(chip.id);
      setDisplayText(chip.response);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setDisplayText(
      `Analyzing "${customInput}" against real-time ledger: Projected surplus impact is +₹4,200 if deferred to next salary cycle.`
    );
    setCustomInput("");
  };

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
            setthi-engine v2.4 ~ ai:triage
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
            Realtime
          </span>
        </div>
      </div>

      {/* Content Display with blinking cursor */}
      <div className="min-h-[76px] mb-5">
        <p className="font-sans text-[15px] sm:text-[17px] text-[#EDEDED] leading-relaxed tracking-[-0.02em]">
          <span className="text-emerald-400 font-mono text-sm mr-2 select-none">
            &gt;
          </span>
          <span className="font-medium text-white">{displayText}</span>
          <span
            className="inline-block w-2 h-4 ml-1.5 bg-emerald-400/90 align-middle animate-pulse"
            aria-hidden="true"
          />
        </p>
      </div>

      {/* Action Footer: Input Field + Contextual Prompt Chips + Primary CTA */}
      <div className="space-y-4 pt-2 border-t border-white/[0.06]">
        {/* Contextual prompt chips */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-mono text-[#8A8F98] mr-1 hidden sm:inline uppercase">
            Prompt chips:
          </span>
          {chips.map((chip) => {
            const isSelected = activeChip === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleChipClick(chip)}
                className={`text-[11px] font-mono px-2.5 py-1 rounded-md transition-all border ${
                  isSelected
                    ? "bg-white/[0.12] text-white border-white/30"
                    : "bg-[#14161C] text-[#8A8F98] border-white/[0.08] hover:border-white/20 hover:text-[#EDEDED]"
                }`}
              >
                [{chip.label}]
              </button>
            );
          })}
        </div>

        {/* Input prompt field */}
        <form onSubmit={handleCustomSubmit} className="relative">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ask Setthi a command or rule (e.g. Can I afford sushi tonight?)..."
            className="w-full h-10 pl-3.5 pr-14 rounded-lg bg-[#14161C] border border-white/[0.08] text-[13px] text-[#EDEDED] placeholder-[#8A8F98]/60 focus:outline-none focus:border-white/30 transition-colors font-sans"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded bg-white/[0.08] hover:bg-white/[0.15] text-[11px] font-mono text-[#EDEDED] transition-colors"
          >
            Run
          </button>
        </form>

        {/* Primary and Secondary CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#8A8F98]">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span>Zero training on personal data • RBI AA Sandboxed</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* Secondary Action: Ghost pill with interactive hairline border highlight */}
            <a
              href="#details"
              className="text-[12px] font-medium text-[#8A8F98] hover:text-[#EDEDED] px-3.5 py-2 rounded-full border border-white/[0.08] hover:border-white/25 transition-all text-center"
            >
              Learn More
            </a>

            {/* Primary Action: Solid white pill button with integrated keyboard shortcut badge */}
            <button
              type="button"
              onClick={onClaimAccess}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-[#F0F0F0] active:scale-[0.98] transition-all text-[12px] font-semibold tracking-tight shadow-[0_0_20px_rgba(255,255,255,0.18)] border border-white shrink-0"
            >
              <span>Claim Early Access</span>
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
