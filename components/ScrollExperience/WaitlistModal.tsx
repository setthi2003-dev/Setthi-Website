"use client";

import React, { useState, useEffect } from "react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website_modal" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Unable to save your request. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-[#181818] border border-white/[0.14] p-5 xs:p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span className="font-semibold text-sm sm:text-base text-white tracking-tight">
              Setthi early access
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#8A8F98] hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="py-6 sm:py-8 text-center space-y-3.5">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xl">
              ✓
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight">
              You are on the early access list.
            </h3>
            <p className="text-xs sm:text-sm text-[#8A8F98] max-w-xs mx-auto leading-relaxed text-pretty">
              We sent your invite confirmation to <span className="text-white font-mono">{email}</span>. You will receive access on iOS and Android.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 sm:pt-5 space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-[#8A8F98] leading-relaxed mb-4 text-pretty">
                Join thousands of people chatting with their money, cutting impulsive expenses, and knowing what is safe to spend. Completely free.
              </p>

              {error && (
                <div className="mb-3 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <span>⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <label htmlFor="modal-email" className="block text-xs font-mono text-[#8A8F98] uppercase mb-1.5">
                Your email:
              </label>
              <input
                id="modal-email"
                type="email"
                required
                disabled={isSubmitting}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                autoFocus
                className="w-full h-11 px-4 rounded-xl sm:rounded-full bg-[#272727] border border-white/[0.12] text-sm text-white placeholder-[#8A8F98]/50 focus:outline-none focus:border-white/40 font-sans transition-colors disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col-reverse xs:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-[11px] sm:text-xs font-mono text-[#8A8F98]">
                No spam • Instant invite
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-semibold tracking-tight shadow-[0_4px_14px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Saving..." : "Request invite"}</span>
                {!isSubmitting && <span className="font-mono text-xs">↵</span>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
