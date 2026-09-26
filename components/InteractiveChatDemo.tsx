"use client";

import { useState } from "react";

type DemoMode = "roast" | "hype" | "safetospend" | "breakdown";

interface Scenario {
  id: DemoMode;
  tabLabel: string;
  tagline: string;
  badgeColor: string;
  userPrompt: string;
  assistantReply: string;
  cardTitle: string;
  cardContent: React.ReactNode;
}

export default function InteractiveChatDemo() {
  const [activeMode, setActiveMode] = useState<DemoMode>("roast");

  const scenarios: Record<DemoMode, Scenario> = {
    roast: {
      id: "roast",
      tabLabel: "🌶️ Roast Mode",
      tagline: "Brutal honesty when you're about to blow your budget.",
      badgeColor: "border-pink-500/30 bg-pink-500/10 text-pink-400",
      userPrompt: "Can I order Swiggy tonight? 🍕",
      assistantReply:
        "You've ordered takeout 4 nights in a row and spent ₹3,840 this week alone. Your kitchen stove is filing for abandonment. 👁️👄👁️ Boil some eggs or make instant noodles, bestie.",
      cardTitle: "Weekly Takeout Breakdown",
      cardContent: (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-zinc-300">
            <span>Swiggy & Zomato (4 orders)</span>
            <span className="font-bold text-pink-400">₹3,840</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-pink-500 h-2 rounded-full w-[92%]" />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>92% of dining budget blown</span>
            <span className="text-zinc-500">Only ₹360 left for 12 days</span>
          </div>
        </div>
      ),
    },
    hype: {
      id: "hype",
      tabLabel: "💖 Hype Mode",
      tagline: "Big celebrations for your financial wins.",
      badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
      userPrompt: "How are my savings doing this month? ✨",
      assistantReply:
        "YOU ACTUALLY DID THAT! 🚀 You skipped 3 impulse Amazon carts, automated your SIP, and hit ₹18,500 towards your Goa Trip goal! You are officially becoming that financially responsible person.",
      cardTitle: "Savings Milestone Crushed",
      cardContent: (
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-zinc-300">
            <span>Goa Trip Emergency Fund</span>
            <span className="font-bold text-emerald-400">₹18,500 / ₹20,000</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full w-[92%]" />
          </div>
          <div className="flex justify-between text-[11px] text-zinc-400">
            <span>92% Complete • 8 days ahead of schedule</span>
            <span className="text-emerald-400 font-semibold">+₹3,200 this week</span>
          </div>
        </div>
      ),
    },
    safetospend: {
      id: "safetospend",
      tabLabel: "🛡️ Safe-to-Spend",
      tagline: "Real-time math taking upcoming rent & bills into account.",
      badgeColor: "border-sky-500/30 bg-sky-500/10 text-sky-400",
      userPrompt: "Can I buy these ₹6,500 Nike sneakers? 👟",
      assistantReply:
        "Your ₹18,000 rent and ₹1,450 WiFi bill auto-debit on the 1st. If you buy the sneakers today, your Safe-to-Spend buffer drops to ₹420 until next Friday. Sleep on it for 48 hours first!",
      cardTitle: "Cash Flow Reality Check",
      cardContent: (
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Bank Balance</span>
            <span className="text-white font-bold text-sm">₹26,370</span>
          </div>
          <div className="rounded-lg bg-zinc-900/80 p-2.5 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Upcoming Bills</span>
            <span className="text-pink-400 font-bold text-sm">-₹19,450</span>
          </div>
          <div className="col-span-2 rounded-lg bg-sky-950/20 p-2.5 border border-sky-500/30">
            <div className="flex justify-between items-center">
              <span className="text-sky-300 font-medium">True Safe-to-Spend:</span>
              <span className="text-white font-extrabold text-sm">₹6,920</span>
            </div>
            <p className="text-[10px] text-zinc-400 mt-1">Sneakers take 94% of discretionary funds.</p>
          </div>
        </div>
      ),
    },
    breakdown: {
      id: "breakdown",
      tabLabel: "📊 Money Breakdown",
      tagline: "Where your cash actually goes, without spreadsheet headaches.",
      badgeColor: "border-purple-500/30 bg-purple-500/10 text-purple-400",
      userPrompt: "Where did all my salary go this month? 💸",
      assistantReply:
        "Here's your no-BS cashflow report: 44% Fixed Essentials (Rent & Bills), 24% Food & Groceries, 14% Fun & Shopping, and 18% Stashed into Savings. You beat last month's grocery spend by ₹2,100!",
      cardTitle: "September Spending Blueprint",
      cardContent: (
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between items-center text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-400" /> Rent & Essentials
            </span>
            <span className="font-semibold text-white">44% (₹28,600)</span>
          </div>
          <div className="flex justify-between items-center text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Food & Groceries
            </span>
            <span className="font-semibold text-white">24% (₹15,600)</span>
          </div>
          <div className="flex justify-between items-center text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Auto-Savings (SIP)
            </span>
            <span className="font-semibold text-emerald-400">18% (₹11,700)</span>
          </div>
          <div className="flex justify-between items-center text-zinc-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-400" /> Shopping & Fun
            </span>
            <span className="font-semibold text-white">14% (₹9,100)</span>
          </div>
        </div>
      ),
    },
  };

  const current = scenarios[activeMode];

  return (
    <div className="w-full">
      {/* Interactive Mode Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {(Object.keys(scenarios) as DemoMode[]).map((mode) => {
          const sc = scenarios[mode];
          const isActive = activeMode === mode;
          return (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${
                isActive
                  ? "bg-white text-black shadow-lg shadow-white/10 scale-105"
                  : "bg-[#131726] border border-[#232a3e] text-zinc-400 hover:text-white hover:bg-[#1a2034]"
              }`}
            >
              {sc.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Simulated Smartphone Screen */}
      <div className="mx-auto max-w-sm sm:max-w-md rounded-[38px] border-[5px] border-[#22293e] bg-[#0c0f1a] p-3.5 shadow-2xl shadow-emerald-500/10">
        {/* Speaker / Dynamic Island */}
        <div className="mx-auto mb-4 h-5 w-28 rounded-full bg-[#181d2c] flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-[#0c0f1a] mr-2" />
          <div className="h-1.5 w-10 rounded-full bg-[#242b3e]" />
        </div>

        {/* Chat Header inside phone */}
        <div className="flex items-center justify-between border-b border-[#1b2234] pb-3 mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center bg-transparent">
              <img src="/Setthi.png" alt="Setthi Avatar" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Setthi</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-zinc-400">Online • AI Financial Coach</span>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${current.badgeColor}`}>
            {current.tabLabel}
          </span>
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 min-h-[310px] flex flex-col justify-end">
          {/* User Bubble */}
          <div className="flex justify-end">
            <div className="max-w-[82%] rounded-2xl rounded-tr-xs bg-sky-600 px-3.5 py-2 text-xs font-medium text-white shadow-md">
              {current.userPrompt}
            </div>
          </div>

          {/* Setthi AI Assistant Bubble */}
          <div className="flex items-start gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden bg-transparent flex-shrink-0 mt-0.5">
              <img src="/Setthi.png" alt="Setthi" className="h-full w-full object-contain" />
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-[#161c2d] border border-[#232b40] px-3.5 py-2.5 text-xs text-zinc-200 leading-relaxed shadow-md">
              {current.assistantReply}
            </div>
          </div>

          {/* Dynamic Insight Card Generated by Setthi */}
          <div className="ml-8 rounded-xl border border-[#26314a] bg-[#111626]/90 p-3 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {current.cardTitle}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Live Insight</span>
            </div>
            {current.cardContent}
          </div>
        </div>

        {/* Fake Input Bar */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-[#22293e] bg-[#141a2a] px-3 py-2 text-xs text-zinc-500">
          <span className="text-zinc-400">💬</span>
          <span className="flex-1 truncate">Ask Setthi anything about your cash...</span>
          <button className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-black font-bold text-xs hover:brightness-110">
            ↑
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-zinc-400">
        👆 Click the buttons above to test Roast, Hype, Safe-to-Spend, and Cashflow breakdown modes.
      </p>
    </div>
  );
}
