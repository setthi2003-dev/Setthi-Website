"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [confirmConsent, setConfirmConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    confirmationCode: string;
    email: string;
  } | null>(null);

const SUPABASE_URL = "https://lqvzhffsqspwmahiajfm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxdnpoZmZzcXNwd21haGlhamZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0Njg5MjIsImV4cCI6MjEwNTA0NDkyMn0.BOjbq_tp3OxqMR2tKhmRcmofjpnoU741u85B8poMHK0";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SETTHI-DEL-${random}`;
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !confirmConsent || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    try {
      let code = "";
      let succeeded = false;

      // 1. Try server API route
      try {
        const res = await fetch("/api/delete-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cleanEmail, reason, confirmConsent }),
        });
        if (res.ok) {
          const data = await res.json();
          code = data.confirmationCode;
          succeeded = true;
        }
      } catch {
        // Fall back to direct client REST
      }

      // 2. Direct Supabase REST submission
      if (!succeeded) {
        code = generateCode();
        const supaRes = await fetch(`${SUPABASE_URL}/rest/v1/account_deletion_requests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            email: cleanEmail,
            reason: reason || null,
            confirmation_code: code,
            status: "PENDING",
          }),
        });

        if (!supaRes.ok) {
          throw new Error("Unable to save request");
        }
      }

      setSuccessData({
        confirmationCode: code,
        email: cleanEmail,
      });
    } catch {
      setErrorMessage("Network error. Please verify your connection or email setthi2003@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#EDEDED] flex flex-col font-sans selection:bg-rose-500/20 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0A0A0C]/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20 group-hover:border-white/40 transition-colors">
            <Image
              src="/Setthi.png"
              alt="Setthi Logo"
              fill
              className="object-cover"
              sizes="28px"
            />
          </div>
          <span className="font-semibold text-base sm:text-lg tracking-tight text-white">
            setthi
          </span>
        </Link>

        <div className="flex items-center gap-4 text-xs font-medium text-zinc-400">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors hidden sm:inline-block">
            Terms of Service
          </Link>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Title Header */}
        <div className="space-y-3.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>DPDP Act 2023 & Mobile App Store Compliance</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            Request Account & Data Deletion
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed text-pretty">
            Under India&apos;s Digital Personal Data Protection (DPDP) Act 2023 and Google Play / Apple App Store policies, you have the absolute right to permanent erasure of your Setthi user account and all associated financial records.
          </p>
        </div>

        {/* Two Options Grid: In-App vs Web Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Web Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#141416] border border-white/[0.10] rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
            {successData ? (
              <div className="py-6 space-y-5 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white tracking-tight">
                    Deletion Request Submitted
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed text-pretty">
                    Your request has been queued in our statutory deletion pipeline. We have generated your formal tracking reference:
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.12] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">Reference Code:</span>
                    <span className="text-emerald-400 font-mono font-semibold">
                      {successData.confirmationCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">Registered Email:</span>
                    <span className="text-white font-mono">{successData.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-mono">Quarantine Period:</span>
                    <span className="text-zinc-300 font-mono">30 Days (DPDP Sec 8(7))</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.08] pt-4">
                  <p>
                    <strong className="text-white">What happens next:</strong> Your account has been locked from any active processing. If you did not make this request or wish to cancel within the 30-day grace period, email our Grievance Officer at{" "}
                    <a
                      href="mailto:setthi2003@gmail.com"
                      className="text-emerald-400 underline underline-offset-2"
                    >
                      setthi2003@gmail.com
                    </a>{" "}
                    quoting your reference code.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSuccessData(null);
                    setEmail("");
                    setReason("");
                    setConfirmConsent(false);
                  }}
                  className="w-full py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Submit Web Deletion Request
                  </h2>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    No need to have the mobile app installed. We will locate your account records and schedule permanent erasure.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs flex items-center gap-2">
                    <span>⚠</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="delete-email" className="block text-xs font-medium text-zinc-300">
                    Registered Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="delete-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full h-11 px-4 rounded-xl bg-black/60 border border-white/[0.12] focus:border-rose-400/80 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors font-sans"
                  />
                  <p className="text-[11px] text-zinc-500">
                    Enter the exact email used to sign in to your Setthi mobile account.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="delete-reason" className="block text-xs font-medium text-zinc-300">
                    Reason for Deletion (Optional)
                  </label>
                  <select
                    id="delete-reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-black/60 border border-white/[0.12] focus:border-white/30 text-sm text-zinc-200 focus:outline-none transition-colors font-sans"
                  >
                    <option value="" className="bg-[#141416] text-zinc-400">
                      Select a reason (optional)
                    </option>
                    <option value="No longer using the app" className="bg-[#141416] text-white">
                      No longer using the app
                    </option>
                    <option value="Privacy concerns" className="bg-[#141416] text-white">
                      Privacy concerns
                    </option>
                    <option value="Too many notifications" className="bg-[#141416] text-white">
                      Too many notifications
                    </option>
                    <option value="Switching to another device" className="bg-[#141416] text-white">
                      Switching to another device
                    </option>
                    <option value="Other" className="bg-[#141416] text-white">
                      Other reason
                    </option>
                  </select>
                </div>

                {/* Consent Acknowledgment Checkbox */}
                <div className="pt-2">
                  <div
                    onClick={() => setConfirmConsent(!confirmConsent)}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] hover:border-white/[0.18] cursor-pointer transition-all select-none"
                  >
                    <input
                      id="confirm-consent-box"
                      type="checkbox"
                      required
                      checked={confirmConsent}
                      onChange={(e) => setConfirmConsent(e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-0.5 w-5 h-5 rounded border-zinc-600 bg-zinc-900 accent-rose-500 cursor-pointer shrink-0"
                    />
                    <label
                      htmlFor="confirm-consent-box"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-zinc-300 leading-relaxed text-pretty cursor-pointer"
                    >
                      I understand that submitting this request will permanently erase my Setthi account, categorized financial transactions, AI chat conversations, and device tokens after a 30-day quarantine period.
                    </label>
                  </div>
                </div>

                <button
                  id="submit-delete-btn"
                  type="submit"
                  disabled={isSubmitting || !confirmConsent || !email}
                  className="w-full h-11 rounded-full bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_16px_rgba(225,29,72,0.35)] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting request...</span>
                    </>
                  ) : (
                    <span>Request Permanent Account Deletion</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: In-App Deletion Guide & Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* In-App Steps Box */}
            <div className="bg-[#141416] border border-white/[0.10] rounded-3xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.3)] space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white/[0.08] flex items-center justify-center text-xs font-mono text-white">
                  📱
                </span>
                <h3 className="font-semibold text-sm sm:text-base text-white tracking-tight">
                  Faster: Delete Directly in App
                </h3>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                If you still have the Setthi mobile app on your smartphone, you can instantly execute self-service account deletion:
              </p>

              <ol className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] text-white flex items-center justify-center shrink-0 font-mono text-[10px]">
                    1
                  </span>
                  <span>Open <strong>Setthi</strong> on Android or iOS.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] text-white flex items-center justify-center shrink-0 font-mono text-[10px]">
                    2
                  </span>
                  <span>Go to <strong>Settings</strong> (top-right avatar / profile tab).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] text-white flex items-center justify-center shrink-0 font-mono text-[10px]">
                    3
                  </span>
                  <span>Scroll down and tap <strong>Delete Account & Data</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-white/[0.06] text-white flex items-center justify-center shrink-0 font-mono text-[10px]">
                    4
                  </span>
                  <span>Confirm. All active sessions, local caches, and database rows are revoked.</span>
                </li>
              </ol>
            </div>

            {/* Statutory Grievance Contact */}
            <div className="bg-[#141416] border border-white/[0.10] rounded-3xl p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.3)] space-y-3">
              <h3 className="font-semibold text-sm text-white tracking-tight">
                Statutory Grievance Officer
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed text-pretty">
                As required by the DPDP Act 2023, you can also write directly to our designated Grievance Officer:
              </p>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1 text-xs">
                <p className="font-medium text-white">Santosh Patil</p>
                <p className="text-zinc-500">Founder & Grievance Officer</p>
                <p className="text-zinc-500">Bangalore, Karnataka, Republic of India</p>
                <a
                  href="mailto:setthi2003@gmail.com?subject=DPDP%20Account%20Deletion%20Request"
                  className="inline-block pt-1 text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2"
                >
                  setthi2003@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Data Erasure Transparency Table */}
        <section className="bg-[#141416] border border-white/[0.10] rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="space-y-1.5">
            <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              What Data is Deleted vs Retained
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              In accordance with DPDP Section 8(7) and Google Play Data Safety policies, here is our full disclosure:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/[0.10] text-zinc-400 font-mono uppercase text-[11px]">
                  <th className="py-3 px-3">Data Category</th>
                  <th className="py-3 px-3">Active Processing Status</th>
                  <th className="py-3 px-3">Post-Request Retention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                <tr>
                  <td className="py-3 px-3 font-medium text-white">Account Credentials & Profile</td>
                  <td className="py-3 px-3 text-rose-400">Terminated Immediately</td>
                  <td className="py-3 px-3 text-zinc-400">
                    Quarantined for 30 days to facilitate accidental recovery; permanently purged on Day 31.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">Bank Transactions & Ledgers</td>
                  <td className="py-3 px-3 text-rose-400">Terminated Immediately</td>
                  <td className="py-3 px-3 text-zinc-400">
                    All uploaded statements, categorized expense records, and recurring commitment rules purged permanently.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">AI Companion Chat History & Prompts</td>
                  <td className="py-3 px-3 text-rose-400">Terminated Immediately</td>
                  <td className="py-3 px-3 text-zinc-400">
                    Purged permanently within 30 days. No conversation data is ever used to train public LLM models.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-white">Push Notification Tokens (FCM)</td>
                  <td className="py-3 px-3 text-rose-400">Terminated Immediately</td>
                  <td className="py-3 px-3 text-zinc-400">
                    Device tokens revoked and deleted instantly upon request.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="w-full border-t border-white/[0.08] py-8 text-center text-xs text-zinc-500 space-y-2">
        <p>© {new Date().getFullYear()} Setthi Technologies. All rights reserved.</p>
        <div className="flex items-center justify-center gap-4 text-zinc-400">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/legal" className="hover:text-white transition-colors">
            DPDP Compliance
          </Link>
        </div>
      </footer>
    </div>
  );
}
