"use client";

import React, { useState, useEffect, useRef } from "react";
import AiCompanionRive from "@/components/AiCompanionRive";

interface DesktopToPhoneSectionProps {
  onClaimAccess: () => void;
}

export default function DesktopToPhoneSection({
  onClaimAccess,
}: DesktopToPhoneSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [viewportSize, setViewportSize] = useState({ width: 1440, height: 900 });

  // Stream conversation state
  const [typedQuestion, setTypedQuestion] = useState("");
  const [typedReply, setTypedReply] = useState("");
  const [phase, setPhase] = useState<"typing_q" | "calling_tool" | "streaming_r" | "idle">("typing_q");

  const QUESTION_TEXT = "Can I afford dinner with friends tonight?";
  const REPLY_TEXT =
    "Yes, comfortably. Your available balance is ₹7,050 with 4 days until salary. Your safe daily limit is ₹820, so a ₹500 dinner keeps you ₹320 ahead.";

  // Measure viewport size for seamless edge-to-edge full bleed scaling
  useEffect(() => {
    const updateSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Section scroll progress listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
          if (totalScrollable <= 0) return;

          const currentScrolled = -rect.top;
          const rawProgress = currentScrolled / totalScrollable;
          setSectionProgress(Math.min(1, Math.max(0, rawProgress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Conversational streaming loop
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (phase === "typing_q") {
      setTypedReply("");
      if (typedQuestion.length < QUESTION_TEXT.length) {
        timer = setTimeout(() => {
          setTypedQuestion(QUESTION_TEXT.slice(0, typedQuestion.length + 1));
        }, 30);
      } else {
        timer = setTimeout(() => {
          setPhase("calling_tool");
        }, 400);
      }
    } else if (phase === "calling_tool") {
      timer = setTimeout(() => {
        setPhase("streaming_r");
      }, 600);
    } else if (phase === "streaming_r") {
      if (typedReply.length < REPLY_TEXT.length) {
        timer = setTimeout(() => {
          const step = Math.min(3, REPLY_TEXT.length - typedReply.length);
          setTypedReply(REPLY_TEXT.slice(0, typedReply.length + step));
        }, 16);
      } else {
        setPhase("idle");
      }
    } else if (phase === "idle") {
      timer = setTimeout(() => {
        setTypedQuestion("");
        setTypedReply("");
        setPhase("typing_q");
      }, 7000);
    }

    return () => clearTimeout(timer);
  }, [phase, typedQuestion, typedReply]);

  // -------------------------------------------------------------------------
  // FULL-BLEED DESKTOP TO 3D PHONE CHOREOGRAPHY
  // 0.00 -> 0.20: 100% Full Bleed Desktop (edge-to-edge, zero margins/padding)
  // 0.20 -> 0.85: Zooms back, contracts from full screen into 3D phone
  // 0.85 -> 1.00: Settled isometric phone with left editorial headline
  // -------------------------------------------------------------------------
  const zoomProgress = Math.min(1, Math.max(0, (sectionProgress - 0.18) / 0.62));
  const zoomEase = Math.sin((zoomProgress * Math.PI) / 2);

  const isDesktop = viewportSize.width >= 1024;

  // Seamless full-bleed dimensions to phone geometry
  const targetPhoneW = 356;
  const targetPhoneH = Math.min(710, viewportSize.height * 0.86);

  const currentWidth = isDesktop
    ? viewportSize.width - zoomEase * (viewportSize.width - targetPhoneW)
    : viewportSize.width - zoomEase * (viewportSize.width - Math.min(340, viewportSize.width - 32));

  const currentHeight = isDesktop
    ? viewportSize.height - zoomEase * (viewportSize.height - targetPhoneH)
    : viewportSize.height - zoomEase * (viewportSize.height - Math.min(640, viewportSize.height * 0.84));

  const borderRadius = zoomEase * 48;
  const rotateY = -zoomEase * 9.5;
  const rotateX = zoomEase * 4.5;
  const translateZ = -zoomEase * 40;
  const translateX = isDesktop ? zoomEase * 180 : 0;
  const scale = 1.0 - zoomEase * 0.04;

  // Phone hardware components dissolve in
  const chassisOpacity = Math.min(1, Math.max(0, (zoomProgress - 0.22) / 0.60));

  // Left editorial narrative slides in cleanly
  const editorialOpacity = Math.min(1, Math.max(0, (zoomProgress - 0.38) / 0.52));
  const editorialTranslateX = (1 - editorialOpacity) * -36;

  return (
    <section
      ref={containerRef}
      id="desktop-ai-companion"
      className="relative w-full h-[260vh] bg-[#000000] text-[#EDEDED] overflow-x-clip"
    >
      {/* Sticky Fullscreen Viewport Stage: ZERO margins, ZERO padding on left and right */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center p-0 m-0">
        
        {/* Background subtle starry/grid field */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* ========================================================= */}
        {/* LEFT EDITORIAL STORY (Revealed as camera pulls back) */}
        {/* ========================================================= */}
        <div
          className="absolute left-8 lg:left-16 xl:left-24 max-w-lg select-none transition-all duration-300 z-10"
          style={{
            opacity: editorialOpacity,
            transform: `translateX(${editorialTranslateX}px)`,
            pointerEvents: editorialOpacity > 0.6 ? "auto" : "none",
            display: zoomProgress < 0.25 ? "none" : "block",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-[#8A8F98] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-200">The Conversation</span>
            <span className="text-white/20">•</span>
            <span>Zero Guilt</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.08] mb-4 text-balance">
            Money talks. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent">
              Setthi gives you peace of mind.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9A9EA7] leading-relaxed mb-6 font-sans text-pretty">
            No rigid spreadsheets. Ask what you can afford in plain English and get calm, mathematically grounded clarity.
          </p>

          <button
            type="button"
            onClick={onClaimAccess}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all duration-300 text-xs font-semibold tracking-tight shadow-[0_4px_20px_rgba(255,255,255,0.2)] border border-white cursor-pointer"
          >
            <span>Get free early access</span>
            <span className="font-mono text-xs">→</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* THE AI COMPANION CANVAS: Full-bleed desktop -> 3D Phone */}
        {/* ========================================================= */}
        <div
          className="flex items-center justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative will-change-transform"
            style={{
              transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
              transformStyle: "preserve-3d",
              transition: "transform 80ms ease-out",
            }}
          >
            {/* Ambient emerald backlight glow around phone */}
            <div
              className="absolute -inset-6 rounded-[60px] blur-3xl pointer-events-none transition-opacity duration-300"
              style={{
                opacity: chassisOpacity * 0.45,
                background: "radial-gradient(ellipse at 50% 40%, rgba(16, 185, 129, 0.35) 0%, transparent 70%)",
                transform: "translateZ(-80px)",
              }}
            />

            {/* Hardware side buttons (visible only when morphed into phone) */}
            <div
              className="absolute -left-[8px] top-28 w-[4px] h-8 bg-[#2A2B33] rounded-l-md border-l border-white/20 transition-opacity duration-300"
              style={{ opacity: chassisOpacity }}
            />
            <div
              className="absolute -left-[8px] top-40 w-[4px] h-12 bg-[#2A2B33] rounded-l-md border-l border-white/20 transition-opacity duration-300"
              style={{ opacity: chassisOpacity }}
            />
            <div
              className="absolute -left-[8px] top-56 w-[4px] h-12 bg-[#2A2B33] rounded-l-md border-l border-white/20 transition-opacity duration-300"
              style={{ opacity: chassisOpacity }}
            />
            <div
              className="absolute -right-[8px] top-36 w-[4px] h-16 bg-[#2A2B33] rounded-r-md border-r border-white/20 transition-opacity duration-300"
              style={{ opacity: chassisOpacity }}
            />

            {/* Outer Container (Seamless full-bleed transition) */}
            <div
              className="relative overflow-hidden select-none"
              style={{
                width: `${currentWidth}px`,
                height: `${currentHeight}px`,
                borderRadius: `${borderRadius}px`,
                padding: `${zoomEase * 10}px`,
                background: zoomProgress > 0.08
                  ? `linear-gradient(to bottom, rgba(44, 45, 53, ${chassisOpacity}), rgba(26, 27, 32, ${chassisOpacity}) 50%, rgba(37, 38, 46, ${chassisOpacity}))`
                  : "transparent",
                boxShadow: zoomProgress > 0.08
                  ? `0 30px 90px rgba(0,0,0,${0.6 + chassisOpacity * 0.35}), 0 0 0 1px rgba(255,255,255,${chassisOpacity * 0.08})`
                  : "none",
              }}
            >
              {/* Inner Screen Canvas */}
              <div
                className="w-full h-full bg-[#0E0F13] flex flex-col justify-between relative overflow-hidden transition-all duration-150"
                style={{
                  borderRadius: `${Math.max(0, borderRadius - zoomEase * 6)}px`,
                  border: zoomProgress > 0.05 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {/* Dynamic Island & iOS Status Bar (Dissolves in during phone zoom out) */}
                <div
                  className="relative z-30 pt-2 px-5 flex items-center justify-between text-xs text-white/80 font-mono transition-opacity duration-300"
                  style={{
                    opacity: chassisOpacity,
                    display: zoomProgress < 0.2 ? "none" : "flex",
                  }}
                >
                  <span className="font-semibold text-[11px] tracking-tight">9:41</span>
                  <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-5 bg-black rounded-full flex items-center justify-end pr-2 border border-white/10 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111318] ring-1 ring-white/15 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 h-1 bg-white rounded-full" />
                      <span className="w-0.5 h-1.5 bg-white rounded-full" />
                      <span className="w-0.5 h-2 bg-white rounded-full" />
                      <span className="w-0.5 h-2.5 bg-white rounded-full" />
                    </div>
                    <div className="w-4 h-2 rounded-[3px] border border-white/70 p-0.5 flex items-center">
                      <div className="h-full w-full bg-emerald-400 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* CLEAN, UNCLUTTERED APP TOP BAR */}
                {/* ========================================================= */}
                <div
                  className="relative z-20 transition-all duration-300 w-full"
                  style={{
                    paddingTop: zoomProgress > 0.25 ? "8px" : "80px",
                    paddingBottom: zoomProgress > 0.25 ? "8px" : "16px",
                    paddingLeft: zoomProgress > 0.25 ? "16px" : "32px",
                    paddingRight: zoomProgress > 0.25 ? "16px" : "32px",
                  }}
                >
                  <div className="w-full max-w-2xl mx-auto flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center overflow-hidden shrink-0">
                        <AiCompanionRive size={26} />
                      </div>
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white tracking-tight">Setthi</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <span className="text-[11px] font-mono text-[#8A8F98]">
                          Safe limit: ₹820 / day
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-medium text-white/90">
                        ₹7,050 balance
                      </span>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* CONVERSATION AREA: Minimal, calm, spacious */}
                {/* ========================================================= */}
                <div
                  className="flex-1 overflow-y-auto flex flex-col justify-center relative z-10 transition-all duration-300 w-full"
                  style={{
                    paddingLeft: zoomProgress > 0.25 ? "14px" : "32px",
                    paddingRight: zoomProgress > 0.25 ? "14px" : "32px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  }}
                >
                  <div className="w-full max-w-2xl mx-auto flex flex-col justify-center gap-4">
                    {/* User Question */}
                    <div className="self-end max-w-[85%] sm:max-w-md text-left">
                      <div className="bg-[#1C1E24] text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm font-medium border border-white/[0.08] shadow-sm leading-relaxed">
                        &ldquo;{typedQuestion}&rdquo;
                        {phase === "typing_q" && (
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-white align-middle animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Tool Query Indicator */}
                    {phase === "calling_tool" && (
                      <div className="self-start flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-xs font-mono text-emerald-400 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                        <span>Checking balance & 4 days until salary...</span>
                      </div>
                    )}

                    {/* AI Response Bubble */}
                    {(phase === "streaming_r" || phase === "idle") && (
                      <div className="self-start max-w-[92%] sm:max-w-lg text-left flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0 flex items-center justify-center overflow-hidden mt-0.5">
                          <AiCompanionRive size={22} />
                        </div>

                        <div className="flex-1 bg-[#14151B] text-[#EDEDED] px-4 py-3 rounded-2xl rounded-tl-sm text-sm border border-white/[0.08] shadow-md space-y-2 leading-relaxed">
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[11px] font-mono text-emerald-400">
                            <span>✓ Safe to spend</span>
                          </div>

                          <p className="text-[#D4D4D8]">
                            {typedReply}
                            {phase === "streaming_r" && (
                              <span className="inline-block w-1.5 h-3.5 ml-1 bg-emerald-400 align-middle animate-pulse" />
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ========================================================= */}
                {/* BOTTOM MINIMAL INPUT DOCK */}
                {/* ========================================================= */}
                <div
                  className="relative z-20 pb-6 transition-all duration-300 w-full"
                  style={{
                    paddingLeft: zoomProgress > 0.25 ? "14px" : "32px",
                    paddingRight: zoomProgress > 0.25 ? "14px" : "32px",
                  }}
                >
                  <div className="w-full max-w-2xl mx-auto">
                    <div className="h-11 rounded-full bg-[#16171E] border border-white/[0.08] px-4 flex items-center justify-between text-xs text-[#717682] shadow-inner">
                      <span className="truncate">Ask Setthi anything...</span>
                      <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0">
                        ↑
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-28 h-1 bg-white/20 rounded-full mx-auto mt-2 transition-opacity duration-300"
                    style={{ opacity: chassisOpacity }}
                  />
                </div>

                {/* Phone Glass Sheen */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[44px] bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.02] z-30 transition-opacity duration-300"
                  style={{ opacity: chassisOpacity }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
