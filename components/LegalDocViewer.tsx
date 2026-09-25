"use client";

import { useState, useEffect } from "react";
import type { LegalDocumentSection } from "@/lib/legalDocs";

interface LegalDocViewerProps {
  sections: LegalDocumentSection[];
}

export default function LegalDocViewer({ sections }: LegalDocViewerProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];

  // Handle URL hash on initial load
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, []);

  // Intercept anchor link clicks (e.g., from Table of Contents)
  const handleArticleClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);

      // Check if target element exists in current DOM
      const existingElement = document.getElementById(targetId);
      if (existingElement) {
        existingElement.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      } else {
        // If not in current tab, switch to "all" tab where all content resides
        setActiveTab("all");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
          }
        }, 100);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-[#e2e8f0]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-[#1c2130] bg-[#0c0e17]/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center bg-transparent flex-shrink-0">
                <img
                  src="/Setthi.png"
                  alt="Setthi App Icon"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Setthi <span className="text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">Legal Hub</span>
                </h1>
                <p className="text-xs text-zinc-400">
                  Compliance under DPDP Act 2023, IT Act 2000 & Apple / Google Guidelines
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 text-xs">
              <a
                href="mailto:setthi2003@gmail.com"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact: setthi2003@gmail.com
              </a>
            </div>
          </div>

          {/* Simple Tab Bar */}
          <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-[#181d2a] pt-3">
            {sections.map((sec) => {
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveTab(sec.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-sky-500/15 border border-sky-400/40 text-sky-300 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141824] border border-transparent"
                  }`}
                >
                  {sec.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Active Section Info Card */}
        <div className="mb-8 rounded-xl border border-[#1f2536] bg-[#0e121d] p-4 sm:p-5 shadow-lg">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
              Active Document
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{activeSection.title}</h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{activeSection.description}</p>
          </div>
        </div>

        {/* Markdown Rendered Prose with Click Interception */}
        <article
          onClick={handleArticleClick}
          className="prose-dark rounded-2xl border border-[#1a1f2e] bg-[#0b0e17] p-6 sm:p-10 shadow-xl overflow-hidden"
          dangerouslySetInnerHTML={{ __html: activeSection.html }}
        />

        {/* Bottom Navigation & Signoff */}
        <footer className="mt-12 border-t border-[#1a1f2e] pt-6 pb-12 text-center text-xs text-zinc-500">
          <p className="text-zinc-400 font-medium">Setthi Technologies • Santosh Patil (Founder & Grievance Officer)</p>
          <p className="mt-1">Bangalore, Karnataka, Republic of India • setthi2003@gmail.com</p>
          <p className="mt-3 text-[11px] text-zinc-600">
            Compliant with DPDP Act 2023, Information Technology Act 2000 (SPDI Rules 2011), and Apple Store Schedule 2 Guidelines.
          </p>
        </footer>
      </main>
    </div>
  );
}
