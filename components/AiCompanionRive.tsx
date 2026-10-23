"use client";

import React, { useEffect, useRef } from "react";
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

import { preloadRiveCompanion, getCachedRiveBuffer } from "@/lib/rivePreloader";

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

  // The artboard artwork has surrounding margin.
  // Scaling by 1.8x brings the character to fill the visual footprint of `size`
  // with comfortable breathing room.
  const scale = 1.8;
  const canvasSize = Math.round(size * scale);
  const dpr = 2;

  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;

    const initRive = (buffer?: ArrayBuffer) => {
      if (cancelled || !canvasRef.current) return;
      try {
        const rive = new Rive({
          ...(buffer ? { buffer: buffer.slice(0) } : { src: "/ai_companion.riv" }),
          canvas: canvasRef.current,
          stateMachines: ["State Machine 1"],
          autoplay: true,
          layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
          }),
        });

        riveRef.current = rive;
      } catch (err) {
        console.error("Failed to initialize Rive companion:", err);
      }
    };

    const cached = getCachedRiveBuffer();
    if (cached) {
      initRive(cached);
    } else {
      preloadRiveCompanion()
        .then((buf) => initRive(buf))
        .catch(() => initRive());
    }

    return () => {
      cancelled = true;
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

  // Center the character inside the container with balanced margins
  const opticalXOffset = Math.round(canvasSize * 0.13);
  const opticalYOffset = Math.round(canvasSize * 0.20);

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center select-none pointer-events-none rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        mixBlendMode: "screen",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 54%, transparent 68%)",
        maskImage: "radial-gradient(circle at 50% 50%, black 54%, transparent 68%)",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize * dpr}
        height={canvasSize * dpr}
        style={{
          width: canvasSize,
          height: canvasSize,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(calc(-50% - ${opticalXOffset}px), calc(-50% - ${opticalYOffset}px))`,
          display: "block",
        }}
        className="pointer-events-none block"
      />
    </div>
  );
}
