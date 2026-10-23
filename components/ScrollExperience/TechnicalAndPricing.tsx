"use client";

import React, { useState } from "react";
import Link from "next/link";

interface TechnicalAndPricingProps {
  onOpenWaitlist: () => void;
}

export default function TechnicalAndPricing({ onOpenWaitlist }: TechnicalAndPricingProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Chat With Your Money get exact numbers?",
      a: "Setthi connects directly to your statement data. Rather than guessing or hallucinating, it calculates exact rupee numbers and dates from your transactions and explains them in plain, clear language.",
    },
    {
      q: "Why are there no emojis in the replies?",
      a: "Financial clarity matters. Setthi's answers stream in with simple words, exact dates, and no emojis, so you can read your numbers without clutter.",
    },
    {
      q: "Can Setthi move my money or make payments?",
      a: "Never. Setthi can never touch, move, or make payments with your money. It is only an assistant that helps you understand your spending and answer your questions.",
    },
    {
      q: "Does Setthi train AI on my personal spending?",
      a: "No, never. Your financial records are private to you. We never sell your personal information or use your messages to train public AI models.",
    },
    {
      q: "How is Safe to Spend different from my bank balance?",
      a: "Your bank balance tells you what is in your account today, but it forgets that rent, electricity, or subscriptions are due next week. Setthi puts aside money for your upcoming bills first, so you know exactly what is safe to spend on food or fun without stress.",
    },
    {
      q: "Is Setthi really 100% free?",
      a: "Yes. Setthi is completely free to use. There are no paid tiers, no monthly subscriptions, and no surprise paywalls.",
    },
  ];

  return (
    <section id="details" className="relative w-full bg-[#000000] text-[#EDEDED] pt-20 pb-24 sm:pt-28 sm:pb-32 border-t border-white/[0.08]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-28">

        {/* ========================================================= */}
        {/* 100% FREE RISK REVERSAL */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#181818] border border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>100% free for everyone</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              No subscriptions. No hidden costs.
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8F98] max-w-xl leading-relaxed text-pretty">
              Every feature is included for free: automatic spending categories, safe to spend calculations, recurring bills detection, and instant answers in plain English.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-semibold tracking-tight active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer"
          >
            <span>Get free early access</span>
            <span className="font-mono">→</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
              Common questions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-8 text-balance">
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#1F1F1F] border-white/20 shadow-lg"
                      : "bg-[#181818] border-white/[0.08] hover:border-white/[0.15]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left p-5 sm:p-6 text-sm sm:text-base font-medium text-white hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <span className="text-balance">{faq.q}</span>
                    <span className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center font-mono text-xs text-[#8A8F98] ml-4 shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                      <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed border-t border-white/[0.06] pt-4 text-pretty">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 6: FINAL INVITATION CTA */}
        {/* ========================================================= */}
        <div className="rounded-3xl bg-[#181818] border border-white/[0.1] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#272727] border border-white/[0.1] flex items-center justify-center text-emerald-400">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
            Stop wondering where your money went
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98] max-w-md mx-auto leading-relaxed text-pretty">
            Join thousands of thoughtful spenders who talk with Setthi. Free forever on iOS and Android.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="inline-flex items-center justify-center gap-2 h-11 px-7 rounded-full bg-white text-black hover:bg-zinc-200 text-sm font-semibold tracking-tight active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer"
            >
              <span>Get free early access</span>
              <span className="font-mono">→</span>
            </button>
            <Link
              href="/legal"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-white/[0.1] hover:border-white/25 hover:bg-white/[0.04] text-xs sm:text-sm font-medium text-[#8A8F98] hover:text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              Privacy and legal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
