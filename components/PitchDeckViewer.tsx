"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DeckConfig, SlideData } from "@/lib/pitchDeckData";

interface PitchDeckViewerProps {
  config: DeckConfig;
}

export default function PitchDeckViewer({ config }: PitchDeckViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"slides" | "pdf">("slides");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [mouseActive, setMouseActive] = useState(false);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = config.slides.length;
  const currentSlide: SlideData = config.slides[currentSlideIndex];

  // Navigation handlers
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : 0));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 >= 0 ? prev - 1 : totalSlides - 1));
  }, [totalSlides]);

  // Keyboard navigation (Full Keynote / Presentation experience)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT") return;

      if (
        e.key === "ArrowRight" ||
        e.key === " " ||
        e.key === "PageDown" ||
        e.key === "ArrowDown" ||
        e.key === "Enter"
      ) {
        e.preventDefault();
        goToNextSlide();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "PageUp" ||
        e.key === "ArrowUp" ||
        e.key === "Backspace"
      ) {
        e.preventDefault();
        goToPrevSlide();
      } else if (e.key.toLowerCase() === "p") {
        setViewMode((prev) => (prev === "slides" ? "pdf" : "slides"));
      } else if (e.key.toLowerCase() === "f") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // Mouse activity detection (controls fade away automatically)
  const handleMouseMove = () => {
    setMouseActive(true);
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      setMouseActive(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    };
  }, []);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = touchStartX - e.changedTouches[0].clientX;
    const diffY = touchStartY - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
  };

  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-screen h-screen bg-[#070709] text-[#EDEDED] flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* ========================================================= */}
      {/* 1. VIEW MODE: FULL-WINDOW SLIDES (ACTUAL DECK DISPLAY) */}
      {/* ========================================================= */}
      {viewMode === "slides" ? (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {/* Active Deck Slide Image (Ultra-HD Retina rendered from actual PDF/Keynote) */}
          <div className="relative w-full h-full flex items-center justify-center p-0">
            <Image
              src={currentSlide.image}
              alt={currentSlide.title || `Slide ${currentSlideIndex + 1}`}
              fill
              priority
              unoptimized
              className="object-contain w-full h-full pointer-events-none select-none"
              sizes="100vw"
            />
          </div>

          {/* Preload adjacent slides for instantaneous crisp transitions */}
          <div className="hidden" aria-hidden="true">
            {config.slides.map((s, idx) => (
              Math.abs(idx - currentSlideIndex) <= 2 && idx !== currentSlideIndex ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={s.id} src={s.image} alt="" decoding="async" />
              ) : null
            ))}
          </div>

          {/* Invisible Left & Right Click Advance Zones (Apple Keynote Style) */}
          <div
            onClick={goToPrevSlide}
            className="absolute top-0 bottom-0 left-0 w-[25vw] z-20 cursor-w-resize"
            title="Previous Slide (← / Left Click)"
          />
          <div
            onClick={goToNextSlide}
            className="absolute top-0 bottom-0 right-0 w-[35vw] z-20 cursor-e-resize"
            title="Next Slide (→ / Right Click / Space)"
          />

          {/* 3px Minimal Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.08] z-30 pointer-events-none">
            <div
              className="h-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 2. VIEW MODE: FULL-WINDOW VECTOR PDF EMBED */
        /* ========================================================= */
        <div className="relative w-full h-full bg-black">
          <iframe
            src={`${config.pdfUrl}#view=Fit&toolbar=0`}
            className="w-full h-full border-0"
            title="Setthi Pitch Deck PDF"
          />
        </div>
      )}

      {/* ─── Floating Top Right Controls (Switch Deck & Exit, Fades in on Mouse Move) ─── */}
      <div
        className={`fixed top-5 right-6 z-40 flex items-center gap-2.5 transition-opacity duration-300 ${
          mouseActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href={config.alternateUrl}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-emerald-500/30 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-all shadow-xl"
        >
          <span>{config.alternateLabel}</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/[0.15] text-xs font-medium text-zinc-300 hover:text-white transition-all shadow-xl"
        >
          <span>✕ Exit to Site</span>
        </Link>
      </div>

      {/* ─── Floating Bottom Controls (Only visible on Mouse Move, Zero Clutter) ─── */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 hover:bg-black/95 backdrop-blur-xl border border-white/[0.16] shadow-2xl transition-opacity duration-300 ${
          mouseActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={goToPrevSlide}
          className="px-3 py-1 rounded-full text-xs font-semibold text-white hover:bg-white/[0.15] transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>← Prev</span>
        </button>

        <span className="text-zinc-600">|</span>

        {/* Slide Dots / Thumbnail Jump */}
        <div className="flex items-center gap-1.5 px-1">
          {config.slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlideIndex(idx);
                if (viewMode === "pdf") setViewMode("slides");
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentSlideIndex && viewMode === "slides"
                  ? "w-6 bg-emerald-400"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
              title={`Jump to Slide ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-zinc-600">|</span>

        {/* Next Button */}
        <button
          type="button"
          onClick={goToNextSlide}
          className="px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 hover:bg-white/[0.15] transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Next →</span>
        </button>

        <span className="text-zinc-600">|</span>

        {/* Slide Counter */}
        <span className="text-xs font-mono font-medium text-zinc-400 tabular-nums">
          {String(currentSlideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>

        <span className="text-zinc-600">|</span>

        {/* Toggle between Slide Deck and Native Vector PDF */}
        <button
          type="button"
          onClick={() => setViewMode(viewMode === "slides" ? "pdf" : "slides")}
          className="px-3 py-1 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.18] transition-colors cursor-pointer"
        >
          {viewMode === "slides" ? "PDF View" : "Slide Deck"}
        </button>
      </div>
    </div>
  );
}
