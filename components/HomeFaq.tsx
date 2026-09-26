"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "What exactly is Setthi?",
      answer:
        "Setthi is your AI-powered financial assistant and digital money coach. Instead of squinting at endless rows of numbers or clunky bank apps from 2012, you talk to Setthi in plain conversational English. Ask if you can afford dinner, track your spending categories automatically, get roasted when you overspend, and celebrate your savings milestones.",
    },
    {
      question: "What is Roast Mode? Can I turn it off?",
      answer:
        "Roast Mode is our tough-love AI setting that calls you out when you make questionable financial decisions (like buying ₹400 artisanal coffees when rent is due in 3 days). It delivers sarcastic, brutally honest feedback to keep your impulsive spending in check. If you prefer positive reinforcement, you can switch to Hype Mode or Neutral Mode anytime in your settings!",
    },
    {
      question: "Does Setthi train public AI models on my personal financial data?",
      answer:
        "ABSOLUTELY NOT. We operate under strict enterprise Zero Data Retention (ZDR) agreements. Your personal identification, income, expenses, and prompt inquiries are never used to train, retrain, fine-tune, or improve foundation public machine learning models (like OpenAI or Anthropic). All data is encrypted with AES-256 at rest and TLS 1.3 in transit.",
    },
    {
      question: "How does the 'Safe-to-Spend' calculation work?",
      answer:
        "Most banking apps only show your current balance, tricking you into thinking you have money to spend when rent, EMIs, credit card bills, and SIPs are due in 48 hours. Setthi automatically deducts your upcoming recurring obligations from your ledger to show you what's actually safe to splurge without panic.",
    },
    {
      question: "How do I log expenses in Setthi?",
      answer:
        "However you want! You can snap photos of printed receipts with our automated OCR scanner, forward digital invoices, type quick natural language messages (e.g. 'Spent ₹450 on fuel'), or sync bank feeds under user-authorized RBI Account Aggregator gateways.",
    },
    {
      question: "Is Setthi free to download and use?",
      answer:
        "Yes! Setthi offers a robust free tier with core AI budgeting, expense tracking, and conversational queries. Optional premium features (such as unlimited receipt OCR scans and deep tax categorization) are available via transparent in-app subscriptions.",
    },
  ];

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-[#1e2538] bg-[#0d101a] overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
            >
              <span>{faq.question}</span>
              <span className={`ml-4 text-emerald-400 text-lg transition-transform ${isOpen ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-[#191f2e]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
