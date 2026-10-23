"use client";

import React from "react";
import AiCompanionRive from "@/components/AiCompanionRive";

interface CalmBoxMachineProps {
  scrollProgress: number;
  onAskAi: () => void;
}

/*
 * THE QUIET MOMENT
 *
 * Design principle: Don't visualize money. Visualize the mental burden
 * of managing money disappearing.
 *
 * Four rules followed:
 * 1. Let the page breathe — generous whitespace, emptiness IS the product.
 * 2. Motion slows down — fast chaos settles into stillness.
 * 3. Colour as emotional signal — neutral chaos → warm ivory + deep forest green.
 * 4. Show one useful answer — a single insight, not twenty charts.
 *
 * The visitor should leave thinking:
 * "My financial life could feel this simple."
 */

export default function CalmBoxMachine({
  scrollProgress,
  onAskAi,
}: CalmBoxMachineProps) {
  // Normalize progress across the Screen 3 window [0.54 - 0.74]
  // 0.0 -> 0.35 (0.54 - 0.61): Companion appears in generous whitespace
  // 0.35 -> 0.75 (0.61 - 0.69): Insight text fades in clearly
  // 0.75 -> 1.0 (0.69 - 0.74): Gentle button appears
  const stageP = Math.min(1, Math.max(0, (scrollProgress - 0.54) / 0.17));

  const breathe = Math.min(1, Math.max(0, stageP / 0.35));
  const reveal = Math.min(1, Math.max(0, (stageP - 0.30) / 0.40));
  const invite = Math.min(1, Math.max(0, (stageP - 0.60) / 0.35));

  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden bg-transparent select-none"
      style={{ minHeight: "70vh" }}
    >
      {/* ─── THE CALM CENTER ─── */}
      <div
        className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto px-6 sm:px-8"
        style={{
          opacity: breathe,
          transform: `translateY(${(1 - breathe) * 20}px)`,
          transition: "opacity 500ms ease-out, transform 500ms ease-out",
        }}
      >
        {/* Soft, subtle ambient depth glow (no harsh box, just atmospheric presence) */}
        <div
          className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full pointer-events-none"
          style={{
            top: "-40px",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
            opacity: breathe,
          }}
        />

        {/* ─── The Companion ─── */}
        {/* Freely floating — completely transparent background, NO black box or card */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12 bg-transparent">
          <AiCompanionRive size={52} />
        </div>

        {/* ─── The ONE Insight ─── */}
        {/* A single gentle observation that brings clarity */}
        <div
          style={{
            opacity: reveal,
            transform: `translateY(${(1 - reveal) * 14}px)`,
          }}
          className="transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
        >
          <p
            className="text-base sm:text-lg leading-relaxed font-sans tracking-tight text-pretty"
            style={{ color: "#E8E4DD" }}
          >
            &ldquo;You have been ordering food delivery almost every evening
            this week. That is about{" "}
            <span
              className="font-medium text-emerald-300"
            >
              ₹4,200
            </span>{" "}
            — roughly double your usual pace.
            <br />
            <span style={{ color: "#B0ADA6" }}>
              Want me to keep an eye on this?
            </span>
            &rdquo;
          </p>
        </div>

        {/* ─── The Gentle Invitation ─── */}
        <div
          className="mt-8 sm:mt-12 flex flex-col items-center gap-3.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            opacity: invite,
            transform: `translateY(${(1 - invite) * 10}px)`,
            pointerEvents: invite > 0.5 ? "auto" : "none",
          }}
        >
          <button
            type="button"
            onClick={onAskAi}
            className="px-6 py-2.5 rounded-full text-sm font-medium cursor-pointer active:scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "#A7F3D0",
              boxShadow: "0 0 24px rgba(16, 185, 129, 0.08)",
            }}
          >
            Yes, watch this for me
          </button>

          <span
            className="text-xs tracking-wide font-mono"
            style={{ color: "#8A8F98" }}
          >
            or scroll down to ask anything
          </span>
        </div>
      </div>
    </div>
  );
}
