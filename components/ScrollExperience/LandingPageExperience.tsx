"use client";

import React, { useState, useEffect, useCallback } from "react";
import LinearHeader from "./LinearHeader";
import PinnedScrollTimeline from "./PinnedScrollTimeline";
import ReducedMotionBento from "./ReducedMotionBento";
import CleoHeroExperience from "./CleoHeroExperience";
import TaglineReveal from "./TaglineReveal";
import SolaceFeaturesCarousel from "./SolaceFeaturesCarousel";
import TechnicalAndPricing from "./TechnicalAndPricing";
import WaitlistModal from "./WaitlistModal";
import HomeFooter from "@/components/HomeFooter";

interface LandingPageExperienceProps {
  initialProgress?: number;
}

export default function LandingPageExperience({ initialProgress }: LandingPageExperienceProps) {
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

  return (
    <div className="relative min-h-screen bg-[#FAF9F5] text-[#0C0C0E] selection:bg-black/10 selection:text-black font-sans antialiased overflow-x-clip">
      {/* Main Experience: Cleo Clone Experience with Setthi Storytelling */}
      <main className="w-full">
        {isReducedMotion ? (
          <ReducedMotionBento onClaimAccess={() => setIsWaitlistOpen(true)} />
        ) : (
          <CleoHeroExperience
            onOpenWaitlist={() => setIsWaitlistOpen(true)}
          />
        )}

        {/* Mandatory B11 Tagline Reveal Section */}
        <TaglineReveal />

        {/* 3D Solace Features Carousel Section (Cleo style with storytelling) */}
        <SolaceFeaturesCarousel />

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
