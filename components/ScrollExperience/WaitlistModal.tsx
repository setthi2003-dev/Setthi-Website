"use client";

import React, { useState, useEffect } from "react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open if caller supports
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg rounded-xl bg-[#0D0E12] border border-white/[0.12] p-6 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white/[0.08] flex items-center justify-center">
              <span className="text-white text-xs font-mono">⌘</span>
            </div>
            <span className="font-semibold text-sm text-[#EDEDED] tracking-[-0.02em]">
              Setthi Early Access
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-[#8A8F98] hover:text-white px-2 py-1 rounded hover:bg-white/[0.06] transition-colors"
          >
            ESC
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-lg">
              ✓
            </div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              You&apos;re on the early access list!
            </h3>
            <p className="text-xs text-[#8A8F98] max-w-xs mx-auto leading-relaxed">
              We sent your invite confirmation to <span className="text-white font-mono">{email}</span>. You will be among the first to get access on iOS and Android.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-5 space-y-4">
            <div>
              <p className="text-xs text-[#8A8F98] leading-relaxed mb-3">
                Join thousands of people chatting with their money, cutting out impulsive expenses, and knowing what is safe to spend. 100% free forever.
              </p>
              <label htmlFor="modal-email" className="block text-[11px] font-mono text-[#8A8F98] uppercase mb-1.5">
                Your email:
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                autoFocus
                className="w-full h-10 px-3.5 rounded-lg bg-[#14161C] border border-white/[0.1] text-sm text-white placeholder-[#8A8F98]/50 focus:outline-none focus:border-white/30 font-sans"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-[#8A8F98]">
                No spam • Instant invite badge
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight transition-colors"
              >
                <span>Request Invite</span>
                <span className="font-mono text-xs">↵</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
