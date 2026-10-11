"use client";

import React from "react";
import NotificationToast from "./NotificationToast";
import AiCompanionRive from "@/components/AiCompanionRive";
import { TRANSACTIONS } from "./types";

interface ReducedMotionBentoProps {
  onClaimAccess: () => void;
}

export default function ReducedMotionBento({ onClaimAccess }: ReducedMotionBentoProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
      {/* Eyebrow info for accessibility */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
            All-In-One Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Your Monthly Money Story at a Glance
          </h2>
        </div>
        <div className="font-mono text-xs text-[#8A8F98] hidden sm:block">
          Day 01 to Day 28 • Full Cycle
        </div>
      </div>

      {/* 4-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Initial Balance / Salary Anchor */}
        <div className="rounded-xl bg-[#121316] border border-white/[0.08] p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#8A8F98] uppercase">
                Payday
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Day 01 / Salary Day
              </span>
            </div>

            <div className="text-3xl font-mono font-bold text-white tracking-tight my-4">
              ₹50,000<span className="text-[#8A8F98] text-xl">.00</span>
            </div>

            <p className="text-xs text-[#8A8F98] leading-relaxed">
              Your salary lands in your account. Setthi immediately looks ahead at your upcoming rent and bills to figure out what you can safely spend.
            </p>
          </div>

          <div className="pt-6 border-t border-white/[0.06] mt-4 space-y-2">
            <div className="flex justify-between text-[11px] font-mono text-[#8A8F98]">
              <span>Days into the month</span>
              <span className="text-white">Day 1 of 28</span>
            </div>
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-white/40" />
            </div>
          </div>
        </div>

        {/* Card 2: Categorized Expense Pills & Stream */}
        <div className="rounded-xl bg-[#121316] border border-white/[0.08] p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-[#8A8F98] uppercase">
                Where It Went
              </span>
              <span className="font-mono text-[11px] text-[#8A8F98]">10 Spends Logged</span>
            </div>

            {/* Categorized Expense Pills */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2 rounded bg-[#18191E] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#717684]" />
                  <span className="text-[10px] font-mono text-[#8A8F98] uppercase">Needs</span>
                </div>
                <div className="font-mono text-sm font-semibold text-white">52%</div>
              </div>

              <div className="p-2 rounded bg-[#18191E] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span className="text-[10px] font-mono text-[#8A8F98] uppercase">Wants</span>
                </div>
                <div className="font-mono text-sm font-semibold text-white">28%</div>
              </div>

              <div className="p-2 rounded bg-[#18191E] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                  <span className="text-[10px] font-mono text-red-400 uppercase">Leaks</span>
                </div>
                <div className="font-mono text-sm font-semibold text-red-400">14%</div>
              </div>

              <div className="p-2 rounded bg-[#18191E] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Saved</span>
                </div>
                <div className="font-mono text-sm font-semibold text-emerald-400">6%</div>
              </div>
            </div>

            {/* Preview Toasts */}
            <div className="space-y-1.5">
              {TRANSACTIONS.slice(0, 2).map((tx) => (
                <NotificationToast key={tx.id} transaction={tx} />
              ))}
            </div>
          </div>

          <div className="pt-3 text-[11px] font-mono text-[#8A8F98] border-t border-white/[0.06] mt-3">
            Automatic categorization in seconds
          </div>
        </div>

        {/* Card 3: AI Insight Terminal Card */}
        <div className="rounded-xl bg-[#0F1014] border border-white/[0.08] p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <AiCompanionRive size={24} />
                <span className="font-mono text-[11px] text-[#8A8F98]">
                  AI Summary
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400">Real talk</span>
            </div>

            <p className="font-sans text-[13px] text-[#EDEDED] leading-relaxed mb-4">
              <span className="text-emerald-400 font-mono mr-1">&gt;</span>
              &ldquo;Balance: ₹7,050. ₹8,400 drained into post-midnight orders and recurring subscriptions you haven&apos;t opened in 4 months.&rdquo;
            </p>

            <div className="space-y-1.5 text-[11px] font-mono text-[#8A8F98]">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span>Late-night food:</span>
                <span className="text-red-400 font-medium">₹1,450</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span>Unused subscriptions:</span>
                <span className="text-red-400 font-medium">₹3,149</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Truly safe to spend:</span>
                <span className="text-white font-medium">₹7,050</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-2">
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#8A8F98]">
              Helpful reality checks when you need them
            </span>
          </div>
        </div>

        {/* Card 4: Action & Early Access CTA */}
        <div className="rounded-xl bg-[#121316] border border-white/[0.08] p-5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-[#8A8F98] uppercase">
                Early Access
              </span>
              <span className="font-mono text-[10px] text-emerald-400">100% Free</span>
            </div>

            <h3 className="text-base font-semibold text-white tracking-tight mb-2">
              Get Setthi Free
            </h3>
            <p className="text-xs text-[#8A8F98] leading-relaxed mb-4">
              Join thousands of people chatting with their money and staying on top of cashflow effortlessly.
            </p>

            <div className="space-y-1.5 mb-4">
              <div className="text-[11px] font-mono text-[#8A8F98] flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero AI model training</span>
              </div>
              <div className="text-[11px] font-mono text-[#8A8F98] flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Stays private on your phone</span>
              </div>
              <div className="text-[11px] font-mono text-[#8A8F98] flex items-center gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% Free forever • No ads</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onClaimAccess}
              className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all shadow-md"
            >
              <span>Get Free Early Access</span>
              <span className="font-mono">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
