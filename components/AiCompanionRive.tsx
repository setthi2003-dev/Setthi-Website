"use client";

import React, { useEffect, useState } from "react";
import { useRive, Rive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

// Suppress default-state-machine deprecation warning globally if supported
if (typeof window !== "undefined" && Rive && "suppressDeprecationWarnings" in Rive) {
  try {
    (Rive as any).suppressDeprecationWarnings = ["default-state-machine"];
  } catch {
    // Ignore if not writable
  }
}

interface AiCompanionRiveProps {
  className?: string;
  size?: number;
}

export default function AiCompanionRive({
  className = "",
  size = 32,
}: AiCompanionRiveProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && Rive && "suppressDeprecationWarnings" in Rive) {
      try {
        (Rive as any).suppressDeprecationWarnings = ["default-state-machine"];
      } catch {
        // Ignore
      }
    }
    setMounted(true);
  }, []);

  const { RiveComponent } = useRive({
    src: "/ai_companion.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
      minX: 170,
      minY: 400,
      maxX: 430,
      maxY: 660,
    }),
  });

  if (!mounted) {
    return (
      <div
        className={`relative shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <RiveComponent
        className="w-full h-full object-contain pointer-events-none"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

