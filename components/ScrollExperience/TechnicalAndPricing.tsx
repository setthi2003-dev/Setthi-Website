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
      q: "Is Setthi really 100% free?",
      a: "Yes. Setthi is completely free to use. There are no paid tiers, no monthly subscriptions, and no surprise paywalls.",
    },
    {
      q: "Can Setthi move my money or make payments?",
      a: "Never. Setthi can never touch, move, or make payments with your money. It is only an assistant that helps you see your spending and answer your questions.",
    },
    {
      q: "Does Setthi train AI on my personal spending?",
      a: "No, never. Your financial records are private to you. We never sell your personal information or use your messages to train public AI models.",
    },
    {
      q: "How is 'Safe to Spend' different from my bank balance?",
      a: "Your bank balance tells you what is in your account today, but it forgets that rent, electricity, or subscriptions are due next week. Setthi puts aside money for your upcoming bills first, so you know exactly what is safe to spend on food or fun without stress.",
    },
    {
      q: "What is Roast Mode?",
      a: "A fun, honest reality check. If you're about to order food for the 4th time this week or spend ₹500 on coffee right before rent day, Setthi gives you a humorous nudge to stop you in your tracks.",
    },
  ];

  return (
    <section id="details" className="relative w-full bg-[#08090C] text-[#EDEDED] pt-24 pb-20 border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-24">
        {/* ========================================================= */}
        {/* SECTION 1: HOW SETTHI PROTECTS YOU (SIMPLE & JARGON-FREE) */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
              Privacy & Peace of Mind
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Built to be private, honest, and easy to use.
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F98] max-w-2xl leading-relaxed mb-10">
            You don&apos;t need to be an accountant to manage your money. Setthi keeps everything simple, clear, and completely secure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-xl bg-[#0F1014] border border-white/[0.08] space-y-3">
              <div className="text-2xl mb-1">🔒</div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Stays on Your Phone
              </h3>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Your spending history stays private on your device. We never sell your personal records or share them with advertisers.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0F1014] border border-white/[0.08] space-y-3">
              <div className="text-2xl mb-1">🛡️</div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Zero AI Training
              </h3>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Your bank statements and bills are never fed into public AI models. What you talk about with Setthi remains completely confidential.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0F1014] border border-white/[0.08] space-y-3">
              <div className="text-2xl mb-1">⚡</div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Instant Plain English
              </h3>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                No complex formulas or confusing charts. Ask simple questions like &ldquo;Can I afford this dinner?&rdquo; and get real answers right away.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: 100% FREE GUARANTEE (NO PRICING / NO TIERS) */}
        {/* ========================================================= */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0F1014] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs">
              <span>✓</span>
              <span>100% Free For Everyone</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              No subscriptions. No hidden costs.
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8F98] max-w-xl leading-relaxed">
              Every feature is included for free: automatic spending categories, safe-to-spend calculations, roast & hype modes, and instant answers in plain English.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWaitlist}
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-all"
          >
            <span>Get Free Early Access</span>
            <span className="font-mono">→</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
              Common Questions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-8">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-white hover:text-zinc-200 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-mono text-xs text-[#8A8F98] ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-[#8A8F98] leading-relaxed pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: FINAL INVITATION */}
        {/* ========================================================= */}
        <div className="rounded-2xl bg-[#0D0E12] border border-white/[0.1] p-8 sm:p-12 text-center space-y-5">
          <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-lg">
            💬
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Stop wondering where your salary went.
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98] max-w-md mx-auto leading-relaxed">
            Join thousands of smart spenders who talk to Setthi every day. Free on iOS and Android.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-colors"
            >
              <span>Get Free Early Access</span>
              <span className="font-mono">→</span>
            </button>
            <Link
              href="/legal"
              className="inline-flex items-center justify-center h-10 px-5 rounded-full border border-white/[0.08] hover:border-white/20 text-xs font-medium text-[#8A8F98] hover:text-white transition-colors"
            >
              Privacy & Legal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
