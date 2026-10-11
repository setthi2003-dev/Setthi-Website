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
      q: "Does Setthi train AI foundation models on my personal banking data?",
      a: "Never. Under our DPDP Act 2023 statutory charter and strict Zero Data Retention (ZDR) guarantee, financial transaction payloads are processed within an isolated AES-256 client-side sandbox. Your statements and bank metadata are never fed into LLM model training corpora.",
    },
    {
      q: "How does the scroll-driven ledger calculate 'True Safe-to-Spend'?",
      a: "Standard banking apps only report static ledger balances, ignoring impending obligations. Setthi continuously projects scheduled rent, utility auto-debits, recurring SIPs, and essential grocery minimums before reporting your safe discretionary spend ceiling.",
    },
    {
      q: "How does the 1 AM UPI guardrail work?",
      a: "When enabled, any UPI debit triggered during high-impulse hours (12:00 AM – 05:00 AM) triggers an intentional 60-second friction window and a blunt tough-love reality check before final confirmation.",
    },
    {
      q: "Can I connect my bank accounts via RBI Account Aggregator?",
      a: "Yes. Setthi interfaces with licensed RBI Account Aggregators (AAs) utilizing 100% consent-driven, end-to-end encrypted telemetry. You can revoke access or purge stored caches at any moment with a single click.",
    },
  ];

  return (
    <section id="details" className="relative w-full bg-[#08090C] text-[#EDEDED] pt-24 pb-20 border-t border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-28">
        {/* ========================================================= */}
        {/* SECTION 1: ARCHITECTURAL SPECIFICATIONS */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
              System Architecture & Cryptography
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Engineered with high-density, zero-trust discipline.
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F98] max-w-2xl leading-relaxed mb-10">
            Every transaction event is cryptographically isolated. No advertisement pixels, no tracking cookies, and absolute compliance with India&apos;s Digital Personal Data Protection Act 2023.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[#0F1014] border border-white/[0.08] space-y-3">
              <div className="font-mono text-xs text-[#8A8F98] flex items-center justify-between">
                <span>SPEC-01</span>
                <span className="text-emerald-400">ENCRYPTED</span>
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                AES-256 Client Sandboxing
              </h3>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Ledger entries reside in an encrypted on-device SQLite enclave. Decryption keys never traverse our servers without hardware enclave attestation.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0F1014] border border-white/[0.08] space-y-3">
              <div className="font-mono text-xs text-[#8A8F98] flex items-center justify-between">
                <span>SPEC-02</span>
                <span className="text-emerald-400">STATUTORY</span>
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                DPDP Act 2023 Compliance
              </h3>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Full statutory consent lifecycle management, right to erasure, and zero model training. You own 100% of your financial footprint.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#0F1014] border border-white/[0.08] space-y-3">
              <div className="font-mono text-xs text-[#8A8F98] flex items-center justify-between">
                <span>SPEC-03</span>
                <span className="text-emerald-400">INFERENCE</span>
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">
                Sub-50ms Micro-Triage
              </h3>
              <p className="text-xs text-[#8A8F98] leading-relaxed">
                Proprietary categorization heuristics map merchant identifiers to Needs, Wants, Leaks, and Saved with 99.4% precision in sub-50 milliseconds.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: ACCESS TIERS */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
              Release Cohorts & Pricing
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Transparent membership. No dark patterns.
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F98] max-w-xl leading-relaxed mb-10">
            Choose your cadence. Batch 01 early access members receive permanent lifetime fee guarantees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0E12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[#8A8F98] uppercase">Cohort: Standard</span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.06] text-[#8A8F98]">
                    Public Beta
                  </span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">₹0</div>
                <p className="text-xs text-[#8A8F98] leading-relaxed mb-6">
                  Essential manual ledger, receipt OCR, and conversational cashflow inquiries.
                </p>

                <ul className="space-y-2.5 text-xs text-[#EDEDED] font-mono mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>100 Monthly Receipt OCR scans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Safe-to-Spend calculation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Standard Roast & Hype modes</span>
                  </li>
                  <li className="flex items-center gap-2 text-[#8A8F98]">
                    <span>—</span>
                    <span>Automated UPI account aggregators</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={onOpenWaitlist}
                className="w-full h-10 rounded-full border border-white/[0.12] hover:border-white/30 text-xs font-semibold text-white transition-colors"
              >
                Join Public Beta
              </button>
            </div>

            {/* Founder Tier */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#121316] border border-white/[0.15] relative flex flex-col justify-between shadow-2xl">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider">
                Founder Batch 01
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-white uppercase">Cohort: Sovereign</span>
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Invite Only
                  </span>
                </div>
                <div className="text-3xl font-mono font-bold text-white mb-2">
                  ₹299<span className="text-sm font-normal text-[#8A8F98]"> / month</span>
                </div>
                <p className="text-xs text-[#8A8F98] leading-relaxed mb-6">
                  Complete real-time RBI Account Aggregator sync, custom 1 AM debit guardrails, and executive leak diagnostics.
                </p>

                <ul className="space-y-2.5 text-xs text-[#EDEDED] font-mono mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Real-time RBI Account Aggregator sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Unlimited OCR & invoice parsing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>1 AM friction cooldown guardrails</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Direct priority executive support</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={onOpenWaitlist}
                className="w-full h-10 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-colors shadow-md"
              >
                Claim Founder Seat →
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================= */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#8A8F98]">
              Inquiries & Security
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
        {/* SECTION 4: FINAL TERMINAL CTA BANNER */}
        {/* ========================================================= */}
        <div className="rounded-2xl bg-[#0D0E12] border border-white/[0.1] p-8 sm:p-12 text-center space-y-5">
          <div className="w-12 h-12 mx-auto rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Stop guessing your cashflow. Start commanding it.
          </h3>
          <p className="text-xs sm:text-sm text-[#8A8F98] max-w-md mx-auto leading-relaxed">
            Join the waitlist for Setthi. Designed with high-density dark-mode precision, bank-grade encryption, and zero spreadsheet friction.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-colors"
            >
              <span>Join Batch 01 Waitlist</span>
              <span className="font-mono">→</span>
            </button>
            <Link
              href="/legal"
              className="inline-flex items-center justify-center h-10 px-5 rounded-full border border-white/[0.08] hover:border-white/20 text-xs font-medium text-[#8A8F98] hover:text-white transition-colors"
            >
              Statutory Legal Disclosures
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
