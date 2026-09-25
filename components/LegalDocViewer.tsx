"use client";

import { useState, useEffect } from "react";
import type { LegalDocumentSection } from "@/lib/legalDocs";

interface LegalDocViewerProps {
  sections: LegalDocumentSection[];
}

export default function LegalDocViewer({ sections }: LegalDocViewerProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeSection = sections.find((s) => s.id === activeTab) || sections[0];

  // Listen to scroll position for floating back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-[#090a0f] text-[#e2e8f0]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full max-w-full border-b border-[#1c2130] bg-[#0c0e17]/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl px-3 sm:px-6 py-2.5 sm:py-3.5">
          <div className="flex w-full items-center justify-between gap-2">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center bg-transparent flex-shrink-0">
                <img
                  src="/Setthi.png"
                  alt="Setthi App Icon"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                    Setthi
                  </h1>
                  <span className="text-[10px] sm:text-xs font-medium text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    Legal Hub
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 text-xs flex-shrink-0">
              <a
                href="mailto:setthi2003@gmail.com"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-300 transition-colors active:scale-95"
                title="Contact: setthi2003@gmail.com"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Contact: setthi2003@gmail.com</span>
                <span className="sm:hidden text-[11px] font-medium">Contact</span>
              </a>
            </div>
          </div>

          {/* Swipeable Tab Bar with overflow protection */}
          <div className="w-full min-w-0 max-w-full mt-2 sm:mt-2.5 border-t border-[#181d2a] pt-2">
            <nav
              className="flex w-full min-w-0 items-center gap-1 sm:gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x"
              aria-label="Legal document categories"
            >
              {sections.map((sec) => {
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveTab(sec.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all flex-shrink-0 active:scale-95 ${
                      isActive
                        ? "bg-sky-500/15 border border-sky-400/40 text-sky-300 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141824] border border-transparent"
                    }`}
                  >
                    {sec.shortTitle}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-4xl min-w-0 px-3 sm:px-6 py-4 sm:py-6">
        {/* Active Section Info Card */}
        <div className="mb-4 sm:mb-6 rounded-xl border border-[#1f2536] bg-[#0e121d] p-3 sm:p-4 shadow-lg w-full min-w-0">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-sky-400 block">
            Active Document
          </span>
          <h2 className="text-base sm:text-xl font-bold text-white mt-0.5 leading-snug break-words">
            {activeSection.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed break-words">
            {activeSection.description}
          </p>
        </div>

        {/* Markdown Rendered Prose */}
        <article
          onClick={handleArticleClick}
          className="prose-dark w-full max-w-full min-w-0 rounded-xl sm:rounded-2xl border border-[#1a1f2e] bg-[#0b0e17] p-3.5 sm:p-7 md:p-9 shadow-xl overflow-hidden break-words"
          dangerouslySetInnerHTML={{ __html: activeSection.html }}
        />

        {/* Bottom Navigation & Signoff */}
        <footer className="mt-8 sm:mt-12 border-t border-[#1a1f2e] pt-6 pb-12 text-center text-xs text-zinc-500 px-2 w-full min-w-0">
          <p className="text-zinc-400 font-medium text-xs sm:text-sm">Setthi Technologies • Santosh Patil (Founder & Grievance Officer)</p>
          <p className="mt-1 text-[11px] sm:text-xs">Bangalore, Karnataka, Republic of India • setthi2003@gmail.com</p>
          <p className="mt-2.5 text-[10px] sm:text-[11px] text-zinc-600 max-w-md mx-auto leading-relaxed">
            Compliant with DPDP Act 2023, Information Technology Act 2000 (SPDI Rules 2011), and Apple Store Schedule 2 Guidelines.
          </p>
        </footer>
      </main>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#121622]/90 border border-sky-500/40 text-sky-400 shadow-xl backdrop-blur-md hover:bg-[#1a2030] active:scale-90 transition-all duration-200"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
