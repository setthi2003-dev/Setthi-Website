"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1c2233] bg-[#08090f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center bg-transparent flex-shrink-0">
            <img
              src="/Setthi.png"
              alt="Setthi Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Setthi
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              AI Money Bestie
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-300">
          <a href="#features" className="hover:text-emerald-400 transition-colors">
            Features
          </a>
          <a href="#roast-mode" className="hover:text-pink-400 transition-colors flex items-center gap-1">
            <span>Roast Mode</span>
            <span className="text-[10px] text-pink-400">🔥</span>
          </a>
          <a href="#how-it-works" className="hover:text-sky-400 transition-colors">
            How It Works
          </a>
          <a href="#faq" className="hover:text-zinc-100 transition-colors">
            FAQ
          </a>
          <Link href="/legal" className="hover:text-emerald-400 transition-colors">
            Legal & Privacy
          </Link>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#download"
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2 text-xs font-bold text-black shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all"
          >
            Get Setthi Free
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-[#22293d] bg-[#121624] text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1c2233] bg-[#0c0e17] px-4 py-4 space-y-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-emerald-400 py-1"
          >
            Features
          </a>
          <a
            href="#roast-mode"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-pink-400 hover:text-pink-300 py-1"
          >
            Roast Mode 🔥
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-sky-400 py-1"
          >
            How It Works
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-zinc-100 py-1"
          >
            FAQ
          </a>
          <Link
            href="/legal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-zinc-300 hover:text-emerald-400 py-1"
          >
            Legal & Privacy Hub
          </Link>
          <div className="pt-2">
            <a
              href="#download"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 text-xs font-bold text-black shadow-md shadow-emerald-500/20"
            >
              Get Setthi Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
