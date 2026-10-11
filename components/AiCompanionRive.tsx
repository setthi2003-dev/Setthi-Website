"use client";

import React, { useEffect, useRef } from "react";
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

interface AiCompanionRiveProps {
  className?: string;
  size?: number;
}

export default function AiCompanionRive({
  className = "",
  size = 32,
}: AiCompanionRiveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const riveRef = useRef<Rive | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const rive = new Rive({
        src: "/ai_companion.riv",
        canvas: canvasRef.current,
        stateMachines: ["State Machine 1"],
        autoplay: true,
        layout: new Layout({
          fit: Fit.FitWidth,
          alignment: Alignment.BottomCenter,
        }),
      });

      riveRef.current = rive;
    } catch (err) {
      console.error("Failed to initialize Rive companion:", err);
    }

    return () => {
      if (riveRef.current) {
        try {
          riveRef.current.cleanup();
        } catch {
          // ignore
        }
        riveRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <canvas
        ref={canvasRef}
        width={Math.round(size * 2)}
        height={Math.round(size * 2)}
        style={{
          width: size,
          height: size,
          mixBlendMode: "screen",
        }}
        className="pointer-events-none block"
      />
    </div>
  );
}
