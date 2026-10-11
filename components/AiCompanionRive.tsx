"use client";

import React, { useEffect, useRef } from "react";
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

interface AiCompanionRiveProps {
  className?: string;
  size?: number;
}

export default function AiCompanionRive({
  className = "",
  size = 24,
}: AiCompanionRiveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const riveRef = useRef<Rive | null>(null);

  const innerScale = 2.15;
  const innerW = size * innerScale;
  const innerH = size * innerScale;
  const shiftX = innerW * -0.21;
  const shiftY = innerH * -0.15;

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
      className={`relative shrink-0 rounded-full overflow-hidden flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        mixBlendMode: "screen",
      }}
    >
      <div
        style={{
          width: innerW,
          height: innerH,
          position: "absolute",
          transform: `translate(${shiftX}px, ${shiftY}px)`,
        }}
        className="pointer-events-none shrink-0"
      >
        <canvas
          ref={canvasRef}
          width={Math.round(innerW * 2)}
          height={Math.round(innerH * 2)}
          style={{ width: "100%", height: "100%" }}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}
