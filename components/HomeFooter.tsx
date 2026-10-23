import React from "react";
import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#000000] pt-20 pb-16 text-zinc-400">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center bg-transparent flex-shrink-0">
                <img src="/Setthi.png" alt="Setthi Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Setthi</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 text-pretty">
              The AI money companion that makes personal budgeting conversational, private, and clear.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Built for India • DPDP Act 2023 compliant</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#details" className="hover:text-emerald-400 transition-colors">
                  AI budgeting and chat
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-emerald-400 transition-colors">
                  Safe to spend tracker
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-emerald-400 transition-colors">
                  Recurring bill detection
                </a>
              </li>
            </ul>
          </div>

          {/* Statutory Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Legal and compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy policy (DPDP 2023)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of service (SEBI exemption)
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-emerald-400 transition-colors">
                  DPDP statutory consent notice
                </Link>
              </li>
              <li>
                <Link href="/eula" className="hover:text-emerald-400 transition-colors">
                  End user license agreement (EULA)
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-emerald-400 transition-colors">
                  Compliance compendium
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="text-zinc-400 hover:text-rose-400 transition-colors">
                  Delete account & data
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Statutory Redressal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Contact and support</h4>
            <p className="text-xs text-zinc-400 text-pretty">
              For grievances, data deletion requests, or general inquiries:
            </p>
            <div className="space-y-1">
              <div>
                <Link
                  href="/delete-account"
                  className="inline-block text-xs font-medium text-rose-400 hover:text-rose-300 underline underline-offset-4"
                >
                  Request account deletion →
                </Link>
              </div>
              <div>
                <a
                  href="mailto:setthi2003@gmail.com"
                  className="inline-block text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  setthi2003@gmail.com
                </a>
              </div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed text-pretty">
              Founder & Grievance Officer: Santosh Patil<br />
              Bangalore, Karnataka, Republic of India
            </p>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="mt-12 border-t border-white/[0.08] pt-6 text-center text-xs text-zinc-500 space-y-2">
          <p>© {new Date().getFullYear()} Setthi Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
