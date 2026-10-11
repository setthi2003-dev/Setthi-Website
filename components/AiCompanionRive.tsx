"use client";

import React, { useEffect, useState } from "react";
import { useRive } from "@rive-app/react-canvas";

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
    setMounted(true);
  }, []);

  const { RiveComponent } = useRive({
    src: "/ai_companion.riv",
    autoplay: true,
  });

  if (!mounted) {
    return (
      <div
        className={`relative rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <RiveComponent
        className="w-full h-full object-contain pointer-events-none"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
