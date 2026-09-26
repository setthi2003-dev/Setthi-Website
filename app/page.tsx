import HomeNavbar from "@/components/HomeNavbar";
import InteractiveChatDemo from "@/components/InteractiveChatDemo";
import HomeFaq from "@/components/HomeFaq";
import HomeFooter from "@/components/HomeFooter";
import Link from "next/link";

export const metadata = {
  title: "Setthi — The AI That Makes Money Better",
  description: "Meet Setthi, your AI personal finance assistant. Chat with your money in plain English, get roasted for overspending, track budgets without spreadsheets, and save cash effortlessly.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#08090f] text-[#e2e8f0] selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      {/* Navigation */}
      <HomeNavbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-gradient-to-tr from-emerald-600/15 via-sky-600/15 to-pink-600/10 blur-[130px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 mb-6 shadow-sm">
            <span>🔥 The AI that talks back to your wallet</span>
          </div>

          {/* Main Cleo-inspired Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Meet Setthi, the AI that{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              makes money better.
            </span>
          </h1>

          {/* Catchy Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-xl text-zinc-300 leading-relaxed mb-8">
            Ditch the boring spreadsheets and clunky banking apps. Chat with your cash in plain English, get roasted when you blow your budget, and track what’s truly safe to spend.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <a
              href="#download"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-4 text-sm font-extrabold text-black shadow-xl shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Download Setthi Free</span>
              <span>→</span>
            </a>
            <a
              href="#demo"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-[#263148] bg-[#111624] px-6 py-4 text-sm font-semibold text-zinc-200 hover:bg-[#182033] hover:text-white transition-all"
            >
              <span>Try Interactive Demo</span>
              <span>↓</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 border-t border-[#1a2030] pt-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">★★★★★</span>
              <span className="font-semibold text-white">4.9 / 5</span>
              <span>App Store Rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">🔒</span>
              <span className="font-semibold text-white">AES-256</span>
              <span>Bank-Grade Encryption</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sky-400">🛡️</span>
              <span className="font-semibold text-white">DPDP Act 2023</span>
              <span>Zero Model Training</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Phone Demo Section */}
      <section id="demo" className="py-16 sm:py-24 border-y border-[#181f30] bg-[#090c16]/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Interactive Simulation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Talk to your money. <span className="text-emerald-400">Literally.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-xl mx-auto">
              Test out Setthi's personality below. Switch between Roast Mode, Hype Mode, and Cashflow calculations in real time:
            </p>
          </div>

          {/* Smartphone Simulator */}
          <InteractiveChatDemo />
        </div>
      </section>

      {/* Roast vs Hype Section (Cleo's Iconic Tough Love Concept) */}
      <section id="roast-mode" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">
              Tough Love & Pure Celebration
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              The AI that isn&apos;t afraid to tell you the truth.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-2xl mx-auto">
              Traditional banking apps give you boring pie charts. Setthi gives you real accountability when you need discipline, and big cheers when you crush your goals.
            </p>
          </div>

          {/* Two Big Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Roast Mode Card */}
            <div className="relative rounded-3xl border border-pink-500/30 bg-gradient-to-b from-[#1b111e] to-[#100d16] p-7 sm:p-9 shadow-xl overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 px-3 py-1 text-xs font-bold text-pink-400">
                  <span>🌶️</span>
                  <span>Roast Mode</span>
                </span>
                <span className="text-xs text-zinc-500 font-mono">Tough Love</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                Call out the impulse purchases before they happen.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                About to order delivery for the fourth time this week? Or buy those expensive headphones when rent is due in 3 days? Setthi drops hilarious, brutally honest reality checks that actually stop you in your tracks.
              </p>
              <div className="rounded-2xl border border-pink-500/20 bg-black/40 p-4 font-mono text-xs text-pink-300 leading-relaxed">
                💬 <strong className="text-white">Setthi:</strong> &ldquo;You bought ₹450 iced lattes every workday this month. That&apos;s ₹9,000 in bean juice. You could have invested in a whole coffee plantation by now.&rdquo;
              </div>
            </div>

            {/* Hype Mode Card */}
            <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0e1d1a] to-[#0c1314] p-7 sm:p-9 shadow-xl overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                  <span>💖</span>
                  <span>Hype Mode</span>
                </span>
                <span className="text-xs text-zinc-500 font-mono">Wins Only</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                Big celebrations for every single financial milestone.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Saving money is hard work. When you stick to your grocery ceiling, clear a credit card balance, or hit an emergency fund milestone, Setthi hypes you up like your proudest bestie.
              </p>
              <div className="rounded-2xl border border-emerald-500/20 bg-black/40 p-4 font-mono text-xs text-emerald-300 leading-relaxed">
                🎉 <strong className="text-white">Setthi:</strong> &ldquo;LOOK AT YOU! You saved ₹15,000 this month and didn&apos;t touch your emergency savings once. You are officially financially unbothered!&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-16 sm:py-24 border-t border-[#181f30] bg-[#090b14]/70">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Everything your wallet needs. <br />
              <span className="text-sky-400">Zero spreadsheet headaches.</span>
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento Card 1: Safe to Spend */}
            <div className="md:col-span-2 rounded-3xl border border-[#20293d] bg-[#0e1220] p-7 sm:p-8 shadow-lg hover:border-sky-500/40 transition-colors">
              <span className="text-3xl mb-3 block">🛡️</span>
              <h3 className="text-xl font-bold text-white mb-2">The True Safe-to-Spend Balance</h3>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                Bank balances lie. They show your current balance without factoring in the ₹22,000 in rent, utility bills, and SIPs due next week. Setthi automatically calculates what&apos;s truly safe to spend without panic at checkout.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-lg bg-sky-500/10 border border-sky-500/20 px-3 py-1 text-xs font-semibold text-sky-400">
                  Zero Overdraft Panic
                </span>
                <span className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                  Upcoming Bills Factored In
                </span>
              </div>
            </div>

            {/* Bento Card 2: Receipt OCR */}
            <div className="rounded-3xl border border-[#20293d] bg-[#0e1220] p-7 sm:p-8 shadow-lg hover:border-emerald-500/40 transition-colors">
              <span className="text-3xl mb-3 block">📸</span>
              <h3 className="text-xl font-bold text-white mb-2">Instant Receipt OCR</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Snap photos of paper receipts or forward digital invoices. Setthi parses the line items, merchant tags, and dates in under 2 seconds.
              </p>
            </div>

            {/* Bento Card 3: Plain English Chat */}
            <div className="rounded-3xl border border-[#20293d] bg-[#0e1220] p-7 sm:p-8 shadow-lg hover:border-purple-500/40 transition-colors">
              <span className="text-3xl mb-3 block">💬</span>
              <h3 className="text-xl font-bold text-white mb-2">Plain English Chat</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                No menus, no pivot tables. Just type &ldquo;Can I afford dinner at Bastian?&rdquo; or &ldquo;How much did I spend on cabs?&rdquo; and get real answers instantly.
              </p>
            </div>

            {/* Bento Card 4: DPDP Privacy Guaranteed */}
            <div className="md:col-span-2 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#0c1816] to-[#0d131f] p-7 sm:p-8 shadow-lg">
              <span className="text-3xl mb-3 block">🔒</span>
              <h3 className="text-xl font-bold text-white mb-2">Fortress-Grade Privacy & Zero AI Training</h3>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
                Your private financial records are NEVER used to train public machine learning foundation models. Supported by client-side encrypted sandboxes, Supabase Row-Level Security, and full Indian DPDP Act 2023 compliance.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  Read our DPDP Privacy Disclosures →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Simple 3-Step Setup
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2">
              Fix your cashflow in 60 seconds.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-[#1f2638] bg-[#0c0e18] p-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Log or Connect</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Type quick expenses, snap a receipt, or sync bank metadata securely via licensed RBI Account Aggregators.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1f2638] bg-[#0c0e18] p-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-extrabold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Ask Anything</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Ask Setthi if you can afford that weekend trip, check category budgets, or ask to get roasted for your shopping habit.
              </p>
            </div>

            <div className="rounded-2xl border border-[#1f2638] bg-[#0c0e18] p-6 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-500/30 text-pink-400 font-extrabold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Build Real Wealth</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Watch your emergency fund grow, stop impulse purchases, and stay completely in control of your financial future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Setthi vs Boring Apps */}
      <section className="py-16 sm:py-24 border-y border-[#181f30] bg-[#090c16]/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why people love Setthi over boring apps
            </h2>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-[#232b40] bg-[#0c0f1a] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#232b40] bg-[#121624]">
                    <th className="p-4 text-zinc-400 font-medium">Feature</th>
                    <th className="p-4 text-zinc-400 font-medium">Excel / Spreadsheets</th>
                    <th className="p-4 text-zinc-400 font-medium">Traditional Bank Apps</th>
                    <th className="p-4 text-emerald-400 font-bold bg-emerald-950/20">Setthi AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2233] text-zinc-300">
                  <tr>
                    <td className="p-4 font-semibold text-white">Conversational Natural Chat</td>
                    <td className="p-4 text-zinc-500">❌ Painful manual formulas</td>
                    <td className="p-4 text-zinc-500">❌ No chat interface</td>
                    <td className="p-4 text-emerald-400 font-bold bg-emerald-950/10">✅ Instant plain English</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Roast & Hype Accountability</td>
                    <td className="p-4 text-zinc-500">❌ Zero personality</td>
                    <td className="p-4 text-zinc-500">❌ Robotic & cold</td>
                    <td className="p-4 text-emerald-400 font-bold bg-emerald-950/10">✅ 🌶️ Tough love + Hype</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">True Safe-to-Spend Calculation</td>
                    <td className="p-4 text-zinc-500">❌ Broken spreadsheet cells</td>
                    <td className="p-4 text-zinc-500">❌ Deceptive balance</td>
                    <td className="p-4 text-emerald-400 font-bold bg-emerald-950/10">✅ Automated recurring math</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Receipt OCR Logging</td>
                    <td className="p-4 text-zinc-500">❌ Manual typing</td>
                    <td className="p-4 text-zinc-500">❌ Not available</td>
                    <td className="p-4 text-emerald-400 font-bold bg-emerald-950/10">✅ 2-second scan</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Zero Public AI Training</td>
                    <td className="p-4 text-zinc-400">N/A</td>
                    <td className="p-4 text-zinc-400">N/A</td>
                    <td className="p-4 text-emerald-400 font-bold bg-emerald-950/10">✅ Strict ZDR Guarantee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Love / Reviews */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Community Love
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Loved by 50,000+ smart budgeters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#1f2638] bg-[#0c0e18] p-6 space-y-3">
              <div className="text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                &ldquo;Setthi roasted my Swiggy addiction so hard on Tuesday that I actually made dal chawal at home. I saved ₹8,500 in my first 3 weeks. Essential app.&rdquo;
              </p>
              <div className="pt-2 text-xs font-semibold text-white">
                Ananya S. <span className="text-zinc-500 font-normal">• Bangalore</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1f2638] bg-[#0c0e18] p-6 space-y-3">
              <div className="text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                &ldquo;Finally an app that doesn&apos;t feel like a Chartered Accountant yelling at me. Setthi is like that smart friend who keeps you in check before you overspend.&rdquo;
              </p>
              <div className="pt-2 text-xs font-semibold text-white">
                Rahul M. <span className="text-zinc-500 font-normal">• Mumbai</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#1f2638] bg-[#0c0e18] p-6 space-y-3">
              <div className="text-amber-400 text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                &ldquo;Asked Setthi if I could buy a ₹5,000 jacket and it said &apos;You have ₹1,200 left for groceries until Friday, be serious&apos;. Stopped me in my tracks. 10/10.&rdquo;
              </p>
              <div className="pt-2 text-xs font-semibold text-white">
                Priya K. <span className="text-zinc-500 font-normal">• Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 border-t border-[#181f30] bg-[#090b14]/70">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <HomeFaq />
        </div>
      </section>

      {/* Final Download Call to Action Banner */}
      <section id="download" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0e211d] via-[#0d1620] to-[#120f1c] p-8 sm:p-14 text-center shadow-2xl relative">
            <div className="relative flex h-14 w-14 mx-auto mb-4 items-center justify-center bg-transparent">
              <img src="/Setthi.png" alt="Setthi App" className="h-full w-full object-contain" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Ready to fix your relationship with money?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-lg mx-auto mb-8 leading-relaxed">
              Join thousands of smart spenders who talk to Setthi every day. Free to download on iOS & Android.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:setthi2003@gmail.com?subject=Setthi%20Early%20Access%20Request"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 px-8 py-4 text-sm font-extrabold text-black shadow-xl hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Get Early Access Free</span>
                <span>→</span>
              </a>
              <Link
                href="/legal"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 text-sm font-medium text-zinc-300 hover:text-white hover:bg-black/60 transition-all"
              >
                <span>Read DPDP Legal Policies</span>
              </Link>
            </div>
            <p className="mt-6 text-[11px] text-zinc-400">
              No credit card required • 100% Private • Bank-Grade Security
            </p>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <HomeFooter />
    </div>
  );
}
