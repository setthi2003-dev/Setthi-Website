"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface FeatureStory {
  id: string;
  headline: string;
  story: string;
  image: string;
  iconType: "diamond" | "cluster" | "ring" | "constellation";
}

const FEATURE_STORIES: FeatureStory[] = [
  {
    id: "clarity",
    headline: "No bank speak.",
    story: "Unlike confusing financial dashboards, Setthi speaks in clear, quiet words. Ask anything, anytime, like talking to a trusted friend.",
    image: "/images/solace_feature_1.jpg",
    iconType: "diamond",
  },
  {
    id: "calm-mode",
    headline: "Money on calm mode.",
    story: "Upcoming bills, rent, and essentials are safeguarded before you even look. Spend freely with zero mental arithmetic.",
    image: "/images/solace_feature_2.jpg",
    iconType: "cluster",
  },
  {
    id: "unhurried",
    headline: "Always here, never rushed.",
    story: "Whenever you wonder if you can afford it, Setthi is right there with instant, truthful answers. No hold music, no judgment.",
    image: "/images/solace_feature_3.jpg",
    iconType: "constellation",
  },
  {
    id: "confidence",
    headline: "Quiet confidence.",
    story: "Your numbers stay strictly on your device. Zero spam, zero noise, and zero tracking—just pure financial solace.",
    image: "/images/solace_feature_4.jpg",
    iconType: "ring",
  },
  {
    id: "harmony",
    headline: "Shared ease.",
    story: "Whether planning together or checking a quick purchase, keep your household on the same calm page with zero tension.",
    image: "/images/solace_feature_5.jpg",
    iconType: "cluster",
  },
];

// Delicate white geometric constellation icons matching the Cleo screenshot
function FeatureIcon({ type }: { type: FeatureStory["iconType"] }) {
  if (type === "diamond") {
    return (
      <svg className="w-5 h-5 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="4" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="16" cy="8" r="1.5" />
        <circle cx="4" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="1.8" />
        <circle cx="20" cy="12" r="1.5" />
        <circle cx="8" cy="16" r="1.5" />
        <circle cx="16" cy="16" r="1.5" />
        <circle cx="12" cy="20" r="1.5" />
      </svg>
    );
  }
  if (type === "cluster") {
    return (
      <svg className="w-5 h-5 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="6" r="1.5" />
        <circle cx="18" cy="12" r="1.5" />
        <circle cx="12" cy="18" r="1.5" />
        <circle cx="6" cy="12" r="1.5" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }
  if (type === "constellation") {
    return (
      <svg className="w-5 h-5 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="7" cy="7" r="1.5" />
        <circle cx="17" cy="7" r="1.5" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="7" cy="17" r="1.5" />
        <circle cx="17" cy="17" r="1.5" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 text-white/90 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="2" />
      <circle cx="6" cy="12" r="1.4" />
      <circle cx="18" cy="12" r="1.4" />
      <circle cx="12" cy="6" r="1.4" />
      <circle cx="12" cy="18" r="1.4" />
    </svg>
  );
}

export default function SolaceFeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const count = FEATURE_STORIES.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Gentle, unhurried auto-glide (pauses when user hovers or interacts)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Touch handlers for fluid swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStartX(null);
  };

  const sideOffset = isMobile ? 245 : 340;
  const sideScale = isMobile ? 0.88 : 0.90;
  const sideRotate = isMobile ? 18 : 22;

  return (
    <section
      id="features"
      className="relative w-full bg-[#FAF9F5] text-[#0C0C0E] py-14 sm:py-28 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Warm Ambient Peach/Amber Solace Aura (matches Cleo screenshot background aura) */}
      <div
        className="pointer-events-none absolute right-[5%] sm:right-[15%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[520px] h-[280px] sm:h-[520px] rounded-full bg-gradient-to-br from-[#F5A671]/35 via-[#F28E52]/20 to-transparent blur-[80px] sm:blur-[120px] will-change-transform"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-12 relative z-10">
        {/* Section Header Tag matching Cleo's ▪ CLEO'S FEATURES */}
        <div className="flex items-center gap-2 mb-8 sm:mb-14">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#6E4F38]" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] font-semibold text-[#6E4F38]">
            Setthi&apos;s Features
          </span>
        </div>

        {/* 3D Curved Perspective Carousel Stage */}
        <div
          className="relative w-full h-[450px] xs:h-[490px] sm:h-[620px] flex items-center justify-center"
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {FEATURE_STORIES.map((feature, index) => {
            // Circular offset relative to active card (-1, 0, 1, etc.)
            let offset = index - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 1;

            // 3D curved orientation
            let transform = "translate3d(0, 0, -200px) scale(0.7)";
            let zIndex = 10;
            let opacity = 0;
            let rotateY = 0;

            if (isActive) {
              transform = "translate3d(0, 0, 0) scale(1)";
              zIndex = 30;
              opacity = 1;
              rotateY = 0;
            } else if (isLeft) {
              // Tilted backwards into the screen toward the left
              transform = `translate3d(-${sideOffset}px, 0, -60px) scale(${sideScale})`;
              zIndex = 20;
              opacity = 0.92;
              rotateY = sideRotate;
            } else if (isRight) {
              // Tilted backwards into the screen toward the right
              transform = `translate3d(${sideOffset}px, 0, -60px) scale(${sideScale})`;
              zIndex = 20;
              opacity = 0.92;
              rotateY = -sideRotate;
            }

            return (
              <div
                key={feature.id}
                onClick={() => {
                  if (isLeft) prevSlide();
                  if (isRight) nextSlide();
                }}
                className={`absolute w-[270px] xs:w-[295px] sm:w-[380px] md:w-[420px] h-[400px] xs:h-[440px] sm:h-[530px] rounded-[28px] sm:rounded-[34px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform shadow-[0_30px_70px_-20px_rgba(0,0,0,0.35)] cursor-pointer ${
                  !isVisible ? "pointer-events-none" : ""
                }`}
                style={{
                  transform: `${transform} rotateY(${rotateY}deg)`,
                  transformStyle: "preserve-3d",
                  zIndex,
                  opacity,
                }}
              >
                {/* Full-bleed photography */}
                <Image
                  src={feature.image}
                  alt={feature.headline}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  priority={index === 0}
                  className="object-cover object-center pointer-events-none select-none transition-transform duration-1000 ease-out"
                />

                {/* Subtle dark gradient scrim at bottom - visible only on active center card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none transition-opacity duration-500 ease-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Top-Left Constellation Icon */}
                <div className="absolute top-6 left-6 z-20 pointer-events-none">
                  <FeatureIcon type={feature.iconType} />
                </div>

                {/* Bottom Story & Typography Overlay - Appears only on the center card */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-7 sm:p-8 z-20 text-white select-none pointer-events-none space-y-2 transition-all duration-500 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                    {feature.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-200/90 leading-relaxed font-normal text-pretty max-w-sm drop-shadow-sm">
                    {feature.story}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet, unhurried navigation indicators & controls */}
        <div className="flex items-center justify-center gap-6 mt-6 sm:mt-10">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous feature"
            className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-[#0C0C0E] flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Minimalist dot indicator */}
          <div className="flex items-center gap-2">
            {FEATURE_STORIES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-500 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? "w-7 h-2 bg-[#0C0C0E]"
                    : "w-2 h-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next feature"
            className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-[#0C0C0E] flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
