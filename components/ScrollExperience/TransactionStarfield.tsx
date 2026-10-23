"use client";

import React, { useEffect, useRef } from "react";

interface TransactionItem {
  id: number;
  merchant: string;
  amount: string;
  isIncome: boolean;
  icon: string;
}

const TRANSACTIONS: TransactionItem[] = [
  { id: 1, merchant: "Swiggy", amount: "-₹420", isIncome: false, icon: "🍔" },
  { id: 2, merchant: "Uber", amount: "-₹240", isIncome: false, icon: "🚗" },
  { id: 3, merchant: "Netflix", amount: "-₹649", isIncome: false, icon: "🎬" },
  { id: 4, merchant: "Starbucks", amount: "-₹380", isIncome: false, icon: "☕️" },
  { id: 5, merchant: "Salary Credit", amount: "+₹85,000", isIncome: true, icon: "💰" },
  { id: 6, merchant: "Blinkit", amount: "-₹512", isIncome: false, icon: "⚡️" },
  { id: 7, merchant: "Amazon", amount: "-₹1,899", isIncome: false, icon: "📦" },
  { id: 8, merchant: "Zomato", amount: "-₹340", isIncome: false, icon: "🍕" },
  { id: 9, merchant: "Spotify", amount: "-₹119", isIncome: false, icon: "🎵" },
  { id: 10, merchant: "Cult.fit", amount: "-₹2,400", isIncome: false, icon: "🏋️" },
  { id: 11, merchant: "Apple Store", amount: "-₹199", isIncome: false, icon: "📱" },
  { id: 12, merchant: "Zara", amount: "-₹3,290", isIncome: false, icon: "🛍️" },
  { id: 13, merchant: "Electricity", amount: "-₹1,850", isIncome: false, icon: "💡" },
  { id: 14, merchant: "Flight to Goa", amount: "-₹5,800", isIncome: false, icon: "✈️" },
  { id: 15, merchant: "Chai Point", amount: "-₹65", isIncome: false, icon: "☕️" },
  { id: 16, merchant: "Mutual Fund SIP", amount: "+₹10,000", isIncome: true, icon: "📈" },
  { id: 17, merchant: "BookMyShow", amount: "-₹520", isIncome: false, icon: "🍿" },
  { id: 18, merchant: "Instamart", amount: "-₹680", isIncome: false, icon: "🥑" },
  { id: 19, merchant: "Freelance", amount: "+₹22,000", isIncome: true, icon: "💼" },
  { id: 20, merchant: "Blue Tokai", amount: "-₹310", isIncome: false, icon: "☕️" },
];

interface ParticleTx {
  x: number;
  y: number;
  z: number;
  speed: number;
  data: TransactionItem;
}

interface TransactionStarfieldProps {
  scrollProgress?: number;
  parentScale?: number;
}

export default function TransactionStarfield({
  scrollProgress = 0,
  parentScale = 4.0,
}: TransactionStarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const txContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  const parentScaleRef = useRef(parentScale);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    parentScaleRef.current = parentScale;
  }, [parentScale]);

  useEffect(() => {
    const container = containerRef.current;
    const txContainer = txContainerRef.current;
    if (!container || !txContainer) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const MAX_DEPTH = 1100;
    const FOCAL_LENGTH = 340;

    const getRadius = (w: number, h: number) => {
      const minDim = Math.min(w, h);
      const minRadius = Math.max(70, minDim * 0.22);
      const maxRadius = Math.max(160, minDim * 0.65);
      return minRadius + Math.random() * (maxRadius - minRadius);
    };

    // 18 active transaction micro-pills radiating outward
    const TX_COUNT = 18;
    const txParticles: ParticleTx[] = [];
    for (let i = 0; i < TX_COUNT; i++) {
      const angle = (i / TX_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const radius = getRadius(width, height);
      txParticles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (i / TX_COUNT) * MAX_DEPTH + 40,
        speed: 2.4 + Math.random() * 1.6,
        data: TRANSACTIONS[i % TRANSACTIONS.length],
      });
    }

    // Build compact, minimalist micro-pill HTML
    const buildPillHTML = (data: TransactionItem) => `
      <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border ${
        data.isIncome
          ? "bg-[#091710]/90 border-emerald-500/35 text-emerald-100 shadow-[0_4px_16px_rgba(16,185,129,0.18)]"
          : "bg-[#0F121C]/90 border-white/12 text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
      }">
        <span class="text-[10px] leading-none">${data.icon}</span>
        <span class="font-normal text-[9px] tracking-tight whitespace-nowrap">${data.merchant}</span>
        <span class="font-mono text-[9px] whitespace-nowrap ${
          data.isIncome ? "text-emerald-400 font-medium" : "text-white/75"
        }">${data.amount}</span>
      </div>
    `;

    txContainer.innerHTML = "";
    const txElements: HTMLDivElement[] = [];

    txParticles.forEach((tx) => {
      const el = document.createElement("div");
      el.className =
        "absolute top-0 left-0 will-change-transform pointer-events-none select-none";
      el.innerHTML = buildPillHTML(tx.data);
      txContainer.appendChild(el);
      txElements.push(el);
    });

    let animationFrameId: number;

    const render = () => {
      const cx = width / 2;
      const cy = height / 2;

      const speedMultiplier = 1 + scrollRef.current * 2.5;

      for (let i = 0; i < txParticles.length; i++) {
        const tx = txParticles[i];
        const el = txElements[i];

        tx.z -= tx.speed * speedMultiplier;

        // Reset when it travels past the viewer
        if (tx.z <= 20) {
          tx.z = MAX_DEPTH;
          const angle = Math.random() * Math.PI * 2;
          const radius = getRadius(width, height);
          tx.x = Math.cos(angle) * radius;
          tx.y = Math.sin(angle) * radius;

          const nextData = TRANSACTIONS[Math.floor(Math.random() * TRANSACTIONS.length)];
          tx.data = nextData;
          el.innerHTML = buildPillHTML(nextData);
        }

        const rawScale = FOCAL_LENGTH / tx.z;
        const screenX = tx.x * rawScale + cx;
        const screenY = tx.y * rawScale + cy;

        // Opacity curve:
        // Deep (z > 920): gentle fade-in
        // Mid (120 <= z <= 920): visible
        // Close (z < 120): gentle fade-out
        let opacity = 0.95;
        if (tx.z > 920) {
          opacity = Math.max(0, (MAX_DEPTH - tx.z) / 180);
        } else if (tx.z < 120) {
          opacity = Math.max(0, (tx.z - 20) / 100);
        }

        // Center sanctuary exclusion: keep center uncluttered, serene, and free from covering the input
        const dx = Math.abs(screenX - cx);
        const dy = Math.abs(screenY - cy);
        const sanctuaryX = Math.min(160, width * 0.38);
        const sanctuaryY = Math.min(75, height * 0.12);
        if (dx < sanctuaryX && dy < sanctuaryY) {
          const normX = dx / sanctuaryX;
          const normY = dy / sanctuaryY;
          const dist = Math.sqrt(normX * normX + normY * normY);
          if (dist < 1) {
            opacity *= Math.max(0, (dist - 0.25) / 0.75);
          }
        }

        // Keep transaction size restrained & small
        // When parent is zoomed ~4x on desktop, scaleComp scales down so rendered size stays compact
        const currentParentScale = parentScaleRef.current || 1.0;
        const scaleComp = Math.max(0.20, 0.75 / Math.sqrt(currentParentScale));
        const displayScale = Math.min(0.68, Math.max(0.06, rawScale * scaleComp));

        el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) translate(-50%, -50%) scale(${displayScale})`;
        el.style.opacity = opacity.toFixed(2);
        el.style.zIndex = Math.floor(MAX_DEPTH - tx.z).toString();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black z-0 [isolation:isolate]"
    >
      {/* Subtle pure black depth atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />

      {/* Floating 3D Transaction Micro-Pills */}
      <div
        ref={txContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
