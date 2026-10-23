"use client";

import React, { useState, useEffect, useRef } from "react";
import AiCompanionRive from "@/components/AiCompanionRive";
import TransactionStarfield from "@/components/ScrollExperience/TransactionStarfield";

interface CleoHeroExperienceProps {
  onOpenWaitlist: () => void;
}

// Reusable Setthi AI avatar matching the companion
function SetthiAvatar({ size = 36 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <AiCompanionRive size={size} />
    </div>
  );
}

export default function CleoHeroExperience({
  onOpenWaitlist,
}: CleoHeroExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportSize, setViewportSize] = useState({ width: 1440, height: 900 });

  // Center hero early access state
  const [heroEmail, setHeroEmail] = useState("");
  const [isHeroSubmitting, setIsHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = heroEmail.trim().toLowerCase();
    if (!cleanEmail || isHeroSubmitting) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setHeroError("Please enter a valid email");
      return;
    }

    setIsHeroSubmitting(true);
    setHeroError(null);

    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, source: "hero_center_stream" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHeroError(data?.error || "Unable to join right now");
      } else {
        setHeroSubmitted(true);
      }
    } catch {
      setHeroError("Network error. Try again.");
    } finally {
      setIsHeroSubmitting(false);
    }
  };

  // Viewport resize listener
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll position listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable =
            containerRef.current.offsetHeight - window.innerHeight;
          if (totalScrollable <= 0) return;

          const currentScrolled = -rect.top;
          const rawProgress = currentScrolled / totalScrollable;
          setScrollProgress(Math.min(1, Math.max(0, rawProgress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------------------------------------------------------------------------
  // CLEO PHONE ZOOM-OUT DYNAMICS
  // Base phone dimensions: 375px wide, 730px high
  // -------------------------------------------------------------------------
  const isMobile = viewportSize.width < 640;
  const phoneWidth = isMobile ? 330 : 375;
  const phoneHeight = isMobile ? 660 : 730;

  // Exact scale required so that at scrollProgress = 0, the phone screen covers 100% of the viewport
  const scaleX = viewportSize.width / phoneWidth;
  const scaleY = viewportSize.height / phoneHeight;
  const targetFullScale = Math.max(scaleX, scaleY) * 1.08;

  // Resting scale after zoom-out: compact, elegant handheld size with generous breathing room
  const targetRestScale = isMobile ? 0.78 : 0.72;

  // 1. ZOOM OUT PHASE: 0.00 -> 0.38
  const zoomProgress = Math.min(1, Math.max(0, scrollProgress / 0.38));
  // Smooth cubic ease-out
  const zoomEase = 1 - Math.pow(1 - zoomProgress, 3);
  const phoneZoomScale = targetFullScale - zoomEase * (targetFullScale - targetRestScale);

  // 2. 3D ISOMETRIC TILT PHASE: 0.38 -> 0.72
  const tiltProgress = Math.min(1, Math.max(0, (scrollProgress - 0.38) / 0.34));
  const tiltEase = Math.sin((tiltProgress * Math.PI) / 2);
  const rotateY = -tiltEase * 9.5;
  const rotateX = tiltEase * 4.2;
  const tiltScale = targetRestScale - tiltEase * (targetRestScale * 0.05);

  // Active scale combining zoom-out and tilt
  const activeScale = zoomProgress < 1 ? phoneZoomScale : tiltScale;

  // Background pastoral meadow parallax scale: 1.08 -> 1.00
  const bgScale = 1.08 - scrollProgress * 0.08;

  // Phone chassis shadow opacity (fades in as phone contracts into view)
  const phoneShadowOpacity = Math.min(0.85, Math.max(0, (scrollProgress - 0.12) / 0.22));

  // Phone hardware buttons opacity
  const hardwareButtonsOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.20) / 0.15));

  // -------------------------------------------------------------------------
  // PHONE SCREEN CONTENT TIMELINES
  // -------------------------------------------------------------------------
  // Hero Dark Overlay: visible at start with 3D transaction starfield, fades out 0.00 -> 0.24
  const heroOverlayOpacity = Math.max(0, 1 - scrollProgress / 0.24);

  // App header & status bar fade in smoothly as phone zooms out
  const statusBarOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.12) / 0.16));

  // Message 1 (User bubble 1: "How much did I spend on food?"): pops in at scrollProgress >= 0.22
  const msg1Progress = Math.min(1, Math.max(0, (scrollProgress - 0.22) / 0.11));
  const msg1Opacity = msg1Progress;
  const msg1Scale = 0.90 + msg1Progress * 0.10;

  // Message 2 (Setthi AI breakdown): reveals at scrollProgress >= 0.33
  const msg2Progress = Math.min(1, Math.max(0, (scrollProgress - 0.33) / 0.13));
  const msg2Opacity = msg2Progress;
  const msg2TranslateY = (1 - msg2Progress) * 14;

  // Message 3 (User bubble 2: "How much on groceries?"): pops in at scrollProgress >= 0.46
  const msg3Progress = Math.min(1, Math.max(0, (scrollProgress - 0.46) / 0.11));
  const msg3Opacity = msg3Progress;
  const msg3Scale = 0.90 + msg3Progress * 0.10;

  // Message 4 (Setthi AI groceries breakdown): reveals at scrollProgress >= 0.57
  const msg4Progress = Math.min(1, Math.max(0, (scrollProgress - 0.57) / 0.12));
  const msg4Opacity = msg4Progress;
  const msg4TranslateY = (1 - msg4Progress) * 14;

  // Center navigation pill fades out quickly as user scrolls (0.00 -> 0.10)
  const centerPillOpacity = Math.max(0, 1 - scrollProgress / 0.10);

  // Phone translateY settles 14px lower as it contracts to handheld size
  const phoneTranslateY = zoomProgress * 14;

  // Meadow roll-up transition into next section: 0.70 -> 0.96 (luxurious, silky smooth travel)
  const rollUpProgress = Math.min(1, Math.max(0, (scrollProgress - 0.70) / 0.26));
  // Smoothstep easing (3x^2 - 2x^3) eliminates acceleration spikes at both start and finish
  const rollUpEase = rollUpProgress * rollUpProgress * (3 - 2 * rollUpProgress);

  // During sheet rise, phone gracefully aligns back to 0 rotation and glides slightly upward
  const activeRotateY = rotateY * (1 - rollUpEase);
  const activeRotateX = rotateX * (1 - rollUpEase);
  const activePhoneTranslateY = phoneTranslateY - (rollUpEase * 36);
  const finalActiveScale = activeScale * (1 - rollUpEase * 0.05);

  // Floating header opacity: smoothly dissolves as roll-up sheet locks in (0.82 -> 0.95)
  const headerOpacity = Math.max(0, 1 - (scrollProgress - 0.82) / 0.13);

  return (
    <div
      ref={containerRef}
      id="cleo-experience"
      className="relative w-full h-[320vh] bg-[#FAF9F5] text-[#0C0C0E]"
    >
      {/* ========================================================= */}
      {/* 1. FLOATING TRI-PILL HEADER (IDENTICAL TO CLEO, RESPONSIVE) */}
      {/* ========================================================= */}
      <header
        className="fixed top-3 sm:top-5 inset-x-0 z-50 px-3 sm:px-8 flex items-center justify-between pointer-events-none max-w-[1920px] mx-auto transition-opacity duration-200"
        style={{
          opacity: headerOpacity,
          display: headerOpacity <= 0.01 ? "none" : "flex",
        }}
      >
        {/* Left Pill: Logo */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#0C0C0E]/75 hover:bg-[#0C0C0E]/90 backdrop-blur-xl border border-white/10 text-white font-bold tracking-tight text-sm sm:text-lg shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all cursor-pointer active:scale-95"
          >
            <span>setthi</span>
          </button>
        </div>

        {/* Center Pill: Navigation links (only rendered on desktop md+, fades out as phone zooms out) */}
        <nav
          className="hidden md:flex pointer-events-auto items-center gap-8 px-8 py-2.5 rounded-full bg-[#0C0C0E]/70 backdrop-blur-xl border border-white/10 text-sm font-medium text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-opacity duration-200"
          style={{
            opacity: centerPillOpacity,
            display: !isMobile && centerPillOpacity > 0.01 ? "flex" : "none",
          }}
        >
          <a
            href="#features"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Features
          </a>
          <a
            href="#details"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Pricing &amp; FAQ
          </a>
          <a
            href="#details"
            className="hover:text-white transition-colors cursor-pointer"
          >
            Security &amp; Privacy
          </a>
        </nav>

        {/* Right Pill: Call to Action */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={onOpenWaitlist}
            className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#0C0C0E]/80 hover:bg-[#0C0C0E] backdrop-blur-xl border border-white/10 text-white text-xs sm:text-sm font-semibold tracking-tight shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <span>Get early access</span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. STICKY VIEWPORT STAGE */}
      {/* ========================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Full-bleed serene architectural sanctuary background (Solace design) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out will-change-transform"
          style={{
            backgroundImage: "url('/images/solace_sanctuary_bg.jpg')",
            transform: `scale(${bgScale})`,
            transformOrigin: "center center",
          }}
        />

        {/* Soft atmospheric solace overlay for gentle depth and calm contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#181A1B]/20 via-transparent to-[#121415]/35 pointer-events-none" />

        {/* ========================================================= */}
        {/* 3. 3D PERSPECTIVE IPHONE (ZOOMS OUT FROM ENTIRE SCREEN) */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative pointer-events-auto will-change-transform"
            style={{
              transform: `translate3d(0, ${activePhoneTranslateY}px, 0) scale(${finalActiveScale}) rotateY(${activeRotateY}deg) rotateX(${activeRotateX}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Phone Shadow on Meadow (Fades in as phone contracts to normal size) */}
            <div
              className="absolute -inset-10 rounded-[64px] blur-3xl bg-black/75 pointer-events-none transition-opacity duration-200"
              style={{
                opacity: phoneShadowOpacity,
                transform: "translateZ(-80px)",
              }}
            />

            {/* Hardware buttons on left (volume & action) */}
            <div
              className="transition-opacity duration-200"
              style={{ opacity: hardwareButtonsOpacity }}
            >
              <div className="absolute -left-[9px] top-28 w-[4px] h-8 bg-[#2C2D35] rounded-l-md border-l border-white/20" />
              <div className="absolute -left-[9px] top-40 w-[4px] h-12 bg-[#2C2D35] rounded-l-md border-l border-white/20" />
              <div className="absolute -left-[9px] top-56 w-[4px] h-12 bg-[#2C2D35] rounded-l-md border-l border-white/20" />
            </div>

            {/* Power button on right */}
            <div
              className="transition-opacity duration-200"
              style={{ opacity: hardwareButtonsOpacity }}
            >
              <div className="absolute -right-[9px] top-36 w-[4px] h-16 bg-[#2C2D35] rounded-r-md border-r border-white/20" />
            </div>

            {/* iPhone 15 Pro Titanium Chassis */}
            <div
              className="relative rounded-[54px] p-[10px] bg-gradient-to-b from-[#3E4049] via-[#1E1F24] to-[#2B2D35] shadow-[0_35px_90px_rgba(0,0,0,0.85)] border border-white/20 select-none overflow-hidden"
              style={{
                width: `${phoneWidth}px`,
                height: `${phoneHeight}px`,
              }}
            >
              {/* Screen Inner Bezel */}
              <div className="w-full h-full rounded-[44px] bg-black text-white flex flex-col justify-between relative overflow-hidden select-none font-sans">
                {/* ─── INITIAL HERO SCREEN: PURE BLACK BG + TRANSACTIONS + CENTER TEXT & SCROLL ─── */}
                <div
                  className="absolute inset-0 z-40 bg-black select-none transition-opacity duration-150 will-change-transform overflow-hidden flex flex-col items-center justify-center"
                  style={{
                    opacity: heroOverlayOpacity,
                    display: heroOverlayOpacity <= 0.01 ? "none" : "flex",
                  }}
                >
                  {/* The 3D Transaction Stream */}
                  <TransactionStarfield
                    scrollProgress={scrollProgress}
                    parentScale={activeScale}
                  />
                </div>

                {/* ─── NATIVE iOS STATUS BAR (EXACT SCREENSHOT: < Settings 6:06 | ••• WiFi Battery) ─── */}
                <div
                  className="relative z-30 pt-3 px-5 flex items-center justify-between text-white transition-opacity duration-200"
                  style={{ opacity: statusBarOpacity }}
                >
                  {/* Left: < Settings 6:06 */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-[10px] text-white/90 font-medium">
                      <svg className="w-2.5 h-2.5 mr-0.5 fill-current" viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                      </svg>
                      <span>Settings</span>
                    </div>
                    <span className="text-[13px] font-semibold text-white tracking-tight ml-1.5">6:06</span>
                  </div>

                  {/* Right: ••• WiFi Battery */}
                  <div className="flex items-center gap-2">
                    {/* Cellular signal dots */}
                    <div className="flex items-center gap-[2px]">
                      <span className="w-1 h-1 rounded-full bg-white/70" />
                      <span className="w-1 h-1 rounded-full bg-white/70" />
                      <span className="w-1 h-1 rounded-full bg-white/70" />
                    </div>
                    {/* WiFi Icon */}
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4zm0 3c3.55 0 6.78 1.43 9.14 3.75L12 19.89 2.86 10.75C5.22 8.43 8.45 7 12 7z"/>
                    </svg>
                    {/* Battery Icon with solid white shell and white interior */}
                    <div className="flex items-center">
                      <div className="w-[18px] h-[9px] rounded-[2.5px] border border-white p-[1px] flex items-center">
                        <div className="h-full w-full bg-white rounded-[1.5px]" />
                      </div>
                      <div className="w-[1px] h-[3.5px] bg-white rounded-r-sm -ml-[0.5px]" />
                    </div>
                  </div>
                </div>

                {/* ─── HEADER BAR: SETTHI AI + 46 CREDITS + TRASH (EXACT SCREENSHOT) ─── */}
                <div
                  className="relative z-30 px-4 pt-2.5 pb-2 flex items-center justify-between transition-opacity duration-200"
                  style={{ opacity: statusBarOpacity }}
                >
                  {/* Left: Avatar + Title + Online dot + Subtitle */}
                  <div className="flex items-center gap-2.5">
                    <SetthiAvatar size={34} />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-[15px] font-bold text-white tracking-tight leading-none">
                          Setthi AI
                        </h2>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
                      </div>
                      <p className="text-[10px] text-zinc-400 font-medium tracking-tight mt-0.5 leading-none">
                        Smart Finance Companion
                      </p>
                    </div>
                  </div>

                  {/* Right: Credits badge + Trash icon */}
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-full bg-[#1C1C1E] border border-white/10 text-white/90 text-[10px] font-medium tracking-tight">
                      46 credits
                    </div>
                    <button
                      type="button"
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      aria-label="Clear chat"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ─── CHAT FEED (EXACT SCREENSHOT REPLICA) ─── */}
                <div className="flex-1 px-4 pt-2 pb-24 overflow-y-auto space-y-4 no-scrollbar">
                  {/* Message 1: User ("How much did I spend on food?") */}
                  <div
                    className="flex justify-end transition-all duration-300 will-change-transform"
                    style={{
                      opacity: msg1Opacity,
                      transform: `scale(${msg1Scale})`,
                      display: msg1Opacity <= 0.05 ? "none" : "flex",
                    }}
                  >
                    <div className="bg-[#1C1C22] text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm text-[12.5px] font-normal leading-snug border border-white/5 max-w-[85%] shadow-sm">
                      How much did I spend on food?
                    </div>
                  </div>

                  {/* Message 2: Setthi AI Spending Breakdown */}
                  <div
                    className="space-y-2 transition-all duration-300 will-change-transform"
                    style={{
                      opacity: msg2Opacity,
                      transform: `translateY(${msg2TranslateY}px)`,
                      display: msg2Opacity <= 0.05 ? "none" : "block",
                    }}
                  >
                    {/* Sender line */}
                    <div className="flex items-center gap-1.5">
                      <SetthiAvatar size={20} />
                      <span className="text-[12px] font-bold text-white tracking-tight">Setthi AI</span>
                    </div>

                    {/* Body text matching screenshot */}
                    <div className="text-[11.5px] text-zinc-100 font-normal leading-relaxed pl-1 space-y-2.5">
                      <p className="text-zinc-200">
                        Between 6 Jul and 6 Oct 2026, here is what your food spending looks like:
                      </p>

                      <ul className="space-y-1.5 pl-0.5">
                        <li className="leading-snug">
                          <strong className="text-white font-semibold">• Eating out, tea &amp; snacks:</strong>{" "}
                          <span className="text-zinc-200">₹4,328.27 across 37 transactions.</span>
                        </li>
                        <li className="leading-snug">
                          <strong className="text-white font-semibold">• Groceries &amp; daily needs:</strong>{" "}
                          <span className="text-zinc-200">₹2,646 across 36 transactions.</span>
                        </li>
                      </ul>

                      <p className="text-zinc-200 leading-snug">
                        That brings your combined total for food and groceries to ₹6,974.27 over this period.
                      </p>

                      {/* Copy Action */}
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors pt-0.5 cursor-pointer"
                      >
                        <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  {/* Message 3: User ("How much on groceries?") */}
                  <div
                    className="flex justify-end transition-all duration-300 will-change-transform"
                    style={{
                      opacity: msg3Opacity,
                      transform: `scale(${msg3Scale})`,
                      display: msg3Opacity <= 0.05 ? "none" : "flex",
                    }}
                  >
                    <div className="bg-[#1C1C22] text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm text-[12.5px] font-normal leading-snug border border-white/5 max-w-[85%] shadow-sm">
                      How much on groceries?
                    </div>
                  </div>

                  {/* Message 4: Setthi AI Grocery Breakdown */}
                  <div
                    className="space-y-2 transition-all duration-300 will-change-transform"
                    style={{
                      opacity: msg4Opacity,
                      transform: `translateY(${msg4TranslateY}px)`,
                      display: msg4Opacity <= 0.05 ? "none" : "block",
                    }}
                  >
                    {/* Sender line */}
                    <div className="flex items-center gap-1.5">
                      <SetthiAvatar size={20} />
                      <span className="text-[12px] font-bold text-white tracking-tight">Setthi AI</span>
                    </div>

                    {/* Body text matching screenshot */}
                    <div className="text-[11.5px] text-zinc-100 font-normal leading-relaxed pl-1 space-y-2">
                      <p className="text-zinc-200">
                        Between 6 Jul and 6 Oct 2026, you spent ₹2,646 on{" "}
                        <strong className="text-white font-semibold">Groceries &amp; daily needs</strong> across 36 transactions.
                      </p>
                      <p className="text-zinc-400 text-[11px] leading-snug">
                        Your top purchases in this category included orders at Blinkit (₹314), Aarvi Super Store (₹245), and G P...
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─── FLOATING BOTTOM INPUT AREA & DOCK (EXACT SCREENSHOT) ─── */}
                <div
                  className="absolute bottom-0 inset-x-0 z-30 px-3 pb-2 pt-6 bg-gradient-to-t from-black via-black/95 to-transparent transition-opacity duration-200"
                  style={{ opacity: statusBarOpacity }}
                >
                  {/* Floating input pill */}
                  <div className="h-11 rounded-full bg-[#16161A] border border-white/10 px-4 flex items-center justify-between shadow-2xl mb-2.5">
                    <span className="text-[11px] text-zinc-500 truncate mr-2">
                      Ask about balances, spends, or merchants...
                    </span>
                    <button
                      type="button"
                      className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 shadow-md hover:bg-zinc-200 transition-colors cursor-pointer"
                      aria-label="Send message"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5"/>
                        <path d="m5 12 7-7 7 7"/>
                      </svg>
                    </button>
                  </div>

                  {/* Floating Navigation Dock */}
                  <div className="h-11 rounded-full bg-[#101014] border border-white/10 px-6 flex items-center justify-between shadow-2xl">
                    {/* Active Companion Tab */}
                    <div className="flex items-center justify-center cursor-pointer">
                      <div className="px-3.5 py-1 rounded-2xl bg-[#1C1C22] flex items-center justify-center">
                        <SetthiAvatar size={24} />
                      </div>
                    </div>

                    {/* Center: Sparkline / Analytics Tab */}
                    <button
                      type="button"
                      className="p-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      aria-label="Trends & Analytics"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                      </svg>
                    </button>

                    {/* Right: Profile Tab */}
                    <button
                      type="button"
                      className="p-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                      aria-label="Account Profile"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </button>
                  </div>

                  {/* Native iOS Home Indicator Bar */}
                  <div className="w-28 h-1 bg-white/40 rounded-full mx-auto mt-2 mb-0.5" />
                </div>

                {/* Screen Glass Sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 z-40" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3.5 INITIAL HERO OVERLAY: HEADLINE, INPUT & SCROLL */}
        {/* Rendered at native viewport resolution; sits on z-[38] above the 3D phone & transactions */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 z-[38] flex flex-col items-center justify-center pointer-events-none px-4 select-none will-change-transform"
          style={{
            opacity: Math.max(0, 1 - scrollProgress / 0.16),
            display: scrollProgress >= 0.16 ? "none" : "flex",
            transform: `translateY(${-scrollProgress * 50}px)`,
          }}
        >
          <div className="flex flex-col items-center max-w-[780px] w-full mx-auto text-center pointer-events-none px-2 sm:px-4">
            <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.02em] text-white leading-[1.2] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] mb-4 sm:mb-6 text-center max-w-[340px] sm:max-w-[780px] text-balance">
              Your personal finance assistant.
            </h1>

            {/* Minimalist Center Early Access Input */}
            <div className="w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[380px] pointer-events-auto flex flex-col items-center">
              {heroSubmitted ? (
                <div className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 h-[44px] sm:h-[48px] rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium text-xs sm:text-sm tracking-tight backdrop-blur-xl animate-in fade-in duration-300 shadow-[0_8px_32px_rgba(16,185,129,0.15)]">
                  <span className="font-bold text-sm sm:text-base">✓</span>
                  <span>You&apos;re on the early access list</span>
                </div>
              ) : (
                <form
                  onSubmit={handleHeroSubmit}
                  className="relative flex items-center justify-between w-full h-[44px] sm:h-[48px] rounded-full bg-white/[0.08] hover:bg-white/[0.12] focus-within:bg-white/[0.15] border border-white/20 focus-within:border-white/40 backdrop-blur-xl transition-all shadow-[0_8px_32px_rgba(0,0,0,0.5)] pl-4 sm:pl-5 pr-1 sm:pr-1.5"
                >
                  <input
                    type="email"
                    required
                    disabled={isHeroSubmitting}
                    value={heroEmail}
                    onChange={(e) => {
                      setHeroEmail(e.target.value);
                      if (heroError) setHeroError(null);
                    }}
                    placeholder="Enter your email"
                    className="flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none text-xs sm:text-sm font-sans tracking-tight min-w-0 pr-2"
                  />
                  <button
                    type="submit"
                    disabled={isHeroSubmitting}
                    aria-label="Get early access"
                    className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}

              {heroError && (
                <p className="text-rose-400 text-xs mt-2 font-sans tracking-tight">
                  {heroError}
                </p>
              )}
            </div>

            {/* Subtle, Minimal Scroll Indicator */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-white/60 text-[10px] sm:text-xs font-medium tracking-[0.22em] uppercase mt-5 sm:mt-7">
              <span>Scroll</span>
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70 animate-bounce translate-y-[1px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. ROLL-UP SHEET: Silky-smooth GPU-accelerated transition */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 z-40 bg-[#FAF9F5] rounded-t-[36px] sm:rounded-t-[64px] shadow-[0_-30px_90px_rgba(0,0,0,0.30)] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden will-change-transform"
          style={{
            transform: `translate3d(0, ${(1 - rollUpEase) * 100}%, 0)`,
            pointerEvents: rollUpProgress > 0.4 ? "auto" : "none",
            visibility: rollUpProgress <= 0.001 ? "hidden" : "visible",
          }}
        >
          {/* Subtle iOS-style sheet grabber pill */}
          <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-10 sm:w-12 h-1 sm:h-1.5 rounded-full bg-black/15 pointer-events-none" />

          {/* Sheet Content with graceful inner parallax */}
          <div
            className="max-w-3xl text-center select-none pt-4 px-2 sm:px-4 will-change-transform"
            style={{
              transform: `translate3d(0, ${(1 - rollUpEase) * 35}px, 0)`,
              opacity: Math.min(1, rollUpProgress * 2.2),
            }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#0C0C0E] leading-[1.15] mb-3 sm:mb-4 text-balance">
              Personal finance, finally simple.
            </h2>
            <p className="text-xs sm:text-base md:text-lg text-[#52525B] max-w-xl mx-auto mb-6 sm:mb-8 font-sans leading-relaxed text-pretty">
              Your personal finance assistant that tracks spending, protects upcoming bills, and calculates your daily budget in real time. No manual tracking. No spreadsheets.
            </p>
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#0C0C0E] text-white hover:bg-black/90 text-xs sm:text-sm font-semibold tracking-tight shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <span>Get early access</span>
              <span className="font-mono text-sm">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
