"use client";

import React, { useState, useEffect, useCallback } from "react";
import LinearHeader from "./LinearHeader";
import PinnedScrollTimeline from "./PinnedScrollTimeline";
import ReducedMotionBento from "./ReducedMotionBento";
import TechnicalAndPricing from "./TechnicalAndPricing";
import WaitlistModal from "./WaitlistModal";
import HomeFooter from "@/components/HomeFooter";

export default function LandingPageExperience() {
  const [currentDay, setCurrentDay] = useState(1);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Listen to prefers-reduced-motion system setting
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
    }
    const listener = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleProgressChange = useCallback((progress: number, day: number) => {
    setScrollPercent(progress);
    setCurrentDay(day);
  }, []);

  const toggleMotionMode = () => {
    setIsReducedMotion((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#EDEDED] selection:bg-white/20 selection:text-white font-sans antialiased overflow-x-clip">
      {/* 40px Persistent Floating Island Header */}
      <LinearHeader
        currentDay={currentDay}
        scrollPercent={scrollPercent}
        isReducedMotion={isReducedMotion}
        onToggleMotion={toggleMotionMode}
        onOpenWaitlist={() => setIsWaitlistOpen(true)}
      />

      {/* Main Experience: Either Reduced-Motion Bento Grid OR Pinned Scroll Timeline */}
      <main className="w-full">
        {isReducedMotion ? (
          <ReducedMotionBento onClaimAccess={() => setIsWaitlistOpen(true)} />
        ) : (
          <PinnedScrollTimeline
            onClaimAccess={() => setIsWaitlistOpen(true)}
            onProgressChange={handleProgressChange}
          />
        )}

        {/* Technical Architecture, Pricing & FAQ Section */}
        <TechnicalAndPricing onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      </main>

      {/* Comprehensive Legal & Compliance Footer */}
      <HomeFooter />

      {/* Command Palette Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </div>
  );
}
