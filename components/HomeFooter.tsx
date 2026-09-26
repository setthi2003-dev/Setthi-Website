import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="border-t border-[#1a2133] bg-[#07080e] pt-16 pb-12 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center bg-transparent flex-shrink-0">
                <img src="/Setthi.png" alt="Setthi Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-extrabold text-white">Setthi</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              The AI-powered money bestie that makes personal budgeting conversational, honest, and actually fun.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Built for India • DPDP Act 2023 Compliant
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-emerald-400 transition-colors">
                  AI Budgeting & Chat
                </a>
              </li>
              <li>
                <a href="#roast-mode" className="hover:text-pink-400 transition-colors flex items-center gap-1">
                  <span>Roast Mode</span>
                  <span className="text-[10px]">🔥</span>
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-sky-400 transition-colors">
                  Safe-to-Spend Tracker
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-emerald-400 transition-colors">
                  Download Mobile App
                </a>
              </li>
            </ul>
          </div>

          {/* Statutory Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy (DPDP 2023)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service (SEBI Exemption)
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-emerald-400 transition-colors">
                  DPDP Statutory Consent Notice
                </Link>
              </li>
              <li>
                <Link href="/eula" className="hover:text-emerald-400 transition-colors">
                  End User License Agreement (EULA)
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-emerald-400 transition-colors">
                  Full Compliance Compendium
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Statutory Redressal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            <p className="text-xs text-zinc-400">
              For grievances, data deletion requests, or general feedback:
            </p>
            <a
              href="mailto:setthi2003@gmail.com"
              className="inline-block text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              setthi2003@gmail.com
            </a>
            <p className="text-[11px] text-zinc-500">
              Founder & Grievance Officer: Santosh Patil<br />
              Bangalore, Karnataka, Republic of India
            </p>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="mt-12 border-t border-[#181d2a] pt-6 text-center text-[11px] text-zinc-500 space-y-2">
          <p>© {new Date().getFullYear()} Setthi Technologies. All rights reserved.</p>
          <p className="max-w-2xl mx-auto leading-relaxed text-zinc-600">
            Setthi is an automated personal financial aggregation and budgeting assistant tool. It is not registered with SEBI as an Investment Adviser (RIA) or Portfolio Manager and does not provide formal investment or tax advice. All AI model inference is processed with enterprise Zero Data Retention guarantees.
          </p>
        </div>
      </div>
    </footer>
  );
}
