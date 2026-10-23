### 1. The Feeling in One Word

# **"Liberating"**

*(Alternative: **Cathartic**)*

#### Emotional & Psychological Rationale:
Traditional fintech interfaces (Mint, YNAB, banking apps) trigger **shame, cognitive fatigue, and dread** through cold dark terminals, microscopic spreadsheet grids, and alarming red/green warning tickers.

Meet Cleo inverts this psychological model:
- **Atmosphere of Serenity over Guilt**: The hero immediately places you in a tranquil, sun-drenched lakeside meadow instead of an austere bank vault or spreadsheet.
- **Radical Honesty with Zero Judgment**: The opening phone dialogue (*"My finances are hot garbage 🗑️🔥"* $\rightarrow$ *"You say this every Sunday 🙂"*) disarms the user's financial anxiety with empathetic, self-deprecating humor.
- **Relief through Simplicity**: Rather than demanding you categorize 40 transactions, Cleo acts like a candid friend who acknowledges the mess and handles it for you. It converts panic into peace of mind.

---

### 2. Captured Media & Asset Locations (Stored in Project)

All screenshots and the interactive scroll animation video have been captured, cataloged, and saved directly into your project's `public/cleo_reference/` directory for immediate and future reference:

| Asset Name | Description | File Path |
| :--- | :--- | :--- |
| **Full Scroll Animation (Video)** | **The scroll-driven 3D phone rising, rotating & message stream** | [meetcleo_scroll_animation.webp](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/meetcleo_scroll_animation.webp) |
| **Hero Loaded State** | Top landing viewport with floating tri-pill navbar | [cleo_hero_loaded_1791893822295.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_hero_loaded_1791893822295.png) |
| **Phone Rise (500px scroll)** | iPhone 15 Pro rising in 3D perspective over meadow | [cleo_scroll_500px_1791893850225.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_scroll_500px_1791893850225.png) |
| **Phone 3D Tilt & Chat Stream (1100px)** | Perspective tilt, scale down, and conversational bubble stream | [cleo_scroll_1100px_1791893865280.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_scroll_1100px_1791893865280.png) |
| **Feature Dock Transition (1900px)** | Phone settling into "Money talks. Cleo talks back." | [cleo_scroll_1900px_1791893887292.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_scroll_1900px_1791893887292.png) |
| **Bento Grid & Personality Cards** | High-contrast split-cards, micro-interactions | [cleo_features_bento_1791893907023.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_features_bento_1791893907023.png) |
| **Roast Mode & Testimonials** | Cleo Roast mode, social proof, playful badges | [cleo_roasts_testimonials_1791893928340.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_roasts_testimonials_1791893928340.png) |
| **Footer & Disclaimers** | Monolithic dark footer with clear regulatory disclosures | [cleo_footer_1791893943011.png](file:///Users/santosh/Setthi%20Website/setthi-app-website/public/cleo_reference/cleo_footer_1791893943011.png) |

---

### 3. Detailed UI/UX Breakdown & Cloning Blueprint

If an engineer or designer were tasked with building an identical clone, here are the exact architectural specifications:

#### A. The Scroll-Driven Phone Animation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Scroll Container (height: 300vh, position: relative)       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ Sticky Viewport (position: sticky; top: 0; h: 100vh)  │  │
│  │                                                       │  │
│  │   [Background Image Layer: scale 1.05 -> 1.0]         │  │
│  │                                                       │  │
│  │   [Perspective Stage: perspective(1200px)]            │  │
│  │      └── [Phone Frame: translateY, scale, rotateY]    │  │
│  │             └── [Screen Canvas: Chat Stagger In]      │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

1. **Phase 1: Entry ($0\% \rightarrow 25\%$ Scroll Progress)**
   - **Hero Text**: Starts at `opacity: 1`, fades out to `opacity: 0` and floats slightly upwards (`translateY(0) -> translateY(-40px)`).
   - **Phone Mockup**: Starts off-screen at `translateY(70vh)` with `scale: 1.15`. As you scroll, it moves to `translateY(0)` at screen center.
   - **Camera / Background**: The idyllic pastoral background gently scales down from `1.08` to `1.00`, giving a subtle parallax depth illusion.

2. **Phase 2: Perspective Tilt & Depth ($25\% \rightarrow 55\%$ Scroll Progress)**
   - **3D Transform**: The device tilts along the 3D axes:
     - `rotateY(-8deg)`
     - `rotateX(4deg)`
     - `scale: 1.0 -> 0.88`
   - This creates an isometric angled view that draws the eye toward the dynamic screen surface.

3. **Phase 3: Conversational Stream ($55\% \rightarrow 80\%$ Scroll Progress)**
   - **Inside the Phone Screen**:
     - *Message 1 (User Bubble)*: Floats in from the bottom-right with an elastic overshoot spring curve:
       `transform: translateY(20px) scale(0.92) -> translateY(0) scale(1.0)`, `opacity: 0 -> 1`.
       *Copy*: *"My finances are hot garbage 🗑️🔥"* (dark pill, white text).
     - *Message 2 (Cleo Bubble)*: Delays by ~200ms scroll distance, pops in from the left with a subtle typing delay state:
       *Copy*: *"You say this every Sunday 🙂 Let's check where the money actually went."* (soft ivory/white pill, dark text).
     - *Dynamic Card*: A summary insight pill or category breakout slides upwards beneath the chat.

4. **Phase 4: Docking & Section Transition ($80\% \rightarrow 100\%$ Scroll Progress)**
   - Pastoral background cross-fades (`opacity: 1 -> 0`) into a crisp off-white canvas (`#FAF9F6`).
   - The phone rotates back to neutral (`rotateY(0deg) rotateX(0deg)`) and docks into the top of the next feature section (`"Money talks. Cleo talks back."`).

#### B. Component & Layout Specifications

##### 1. The Floating "Tri-Pill" Header
- **Layout**: Fixed or sticky `top: 1.25rem`, split into **three decoupled floating islands** rather than a single full-width bar:
  - **Left Pill**: Brand logo pill (`padding: 0.6rem 1.2rem; border-radius: 9999px; background: rgba(255,255,255,0.85); backdrop-filter: blur(16px)`).
  - **Center Pill**: Navigation links (`Personal`, `Credit`, `Roast`, `Reviews`), each with an invisible hover capsule that fills with `#EAE9E4`.
  - **Right Pill**: Action button (`Get Cleo` or `Log in`), solid `#0C0C0E` with white text and a high-contrast pill outline.

##### 2. Color Palette & Surface Tokens
- **Background Bone/Linen**: `#FAF9F5` (warmer and softer than harsh sterile white `#FFFFFF`).
- **Dark Neutral (Ink)**: `#0C0C0E` (deep obsidian black used for pills, high-contrast headings, and footers).
- **Subtle Surface Grey**: `#F1F0EB` (used for feature card backgrounds and input fields).
- **Warm Peach Tint**: `#FDECE3` (used for Cleo user bubbles and conversational emphasis).
- **Meadow Greens & Lake Blues**: Pastoral nature tones `#4B6354` and `#88A9C3` that create calmness.

##### 3. Typography Hierarchy
- **Primary Display Font**: High-character Neo-Grotesque with tight geometric letterforms (similar to *Neue Haas Grotesk Bold*, *Cleo Grotesk*, or *Söhne Breit*).
  - Letter spacing: `-0.035em` (tight tracking creates authoritative, punchy editorial headlines).
  - Line height: `0.95` to `1.05`.
- **Body & Secondary Copy**: Neutral modern sans-serif (*Inter* or *Geist*).
  - Letter spacing: `-0.01em`.
  - Line height: `1.55`.
- **Micro-Badges & System Tags**: Monospace / uppercase sans-serif with wide tracking (`letter-spacing: 0.08em; font-size: 0.75rem`).

##### 4. Tone of Voice & Conversational Microcopy
- **Anti-Bank Cadence**: Short, punchy, conversational, unapologetic.
- Examples captured on page:
  - *"Money talks. Cleo talks back."*
  - *"Roast mode: Because sometimes you need a friend to tell you the truth."*
  - *"Never overdraft again. Cleo spots you up to $250."*
  - *"Budgeting without the spreadsheet crying."*

---

### 4. Implementation Code Blueprint (Framer Motion + React)

To build this exact scroll-driven phone animation in a Next.js / React application:

```tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function CleoHeroScrollPhone() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero title fade out
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Phone translateY, scale, and 3D rotation
  const phoneY = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], ["60vh", "0vh", "0vh", "15vh"]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [1.15, 1.0, 0.9, 0.82]);
  const phoneRotateY = useTransform(scrollYProgress, [0.3, 0.55, 0.8, 1], [0, -9, -9, 0]);
  const phoneRotateX = useTransform(scrollYProgress, [0.3, 0.55, 0.8, 1], [0, 5, 5, 0]);

  // Chat message springs
  const msg1Opacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const msg1Scale = useTransform(scrollYProgress, [0.45, 0.55], [0.85, 1]);
  
  const msg2Opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const msg2Y = useTransform(scrollYProgress, [0.6, 0.7], [20, 0]);

  // Background pastoral image crossfade
  const bgOpacity = useTransform(scrollYProgress, [0.75, 0.95], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#FAF9F5]">
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Pastoral Background with parallax */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/cleo_reference/cleo_hero_loaded_1791893822295.png')` }}
        />

        {/* Floating Hero Headline */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 text-center max-w-3xl px-6 mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#0C0C0E]">
            Cleo makes money better.
          </h1>
        </motion.div>

        {/* 3D Perspective Phone Stage */}
        <div style={{ perspective: "1200px" }} className="relative z-20 flex items-center justify-center">
          <motion.div
            style={{
              y: phoneY,
              scale: phoneScale,
              rotateY: phoneRotateY,
              rotateX: phoneRotateX,
              transformStyle: "preserve-3d"
            }}
            className="w-[320px] md:w-[380px] h-[660px] bg-black rounded-[52px] p-3 shadow-2xl border-[4px] border-[#333]"
          >
            {/* Screen Inner Container */}
            <div className="w-full h-full bg-gradient-to-b from-[#FDEFE7] to-[#FAF5F0] rounded-[44px] p-6 flex flex-col justify-end overflow-hidden">
              {/* Message 1 */}
              <motion.div 
                style={{ opacity: msg1Opacity, scale: msg1Scale }}
                className="self-end bg-[#0C0C0E] text-white px-5 py-3 rounded-2xl rounded-tr-sm text-sm font-medium shadow-md mb-3"
              >
                My finances are hot garbage 🗑️🔥
              </motion.div>

              {/* Message 2 */}
              <motion.div 
                style={{ opacity: msg2Opacity, y: msg2Y }}
                className="self-start bg-white text-[#0C0C0E] px-5 py-3 rounded-2xl rounded-tl-sm text-sm font-medium shadow-sm border border-black/5"
              >
                You say this every Sunday 🙂 Let's see what you actually spent.
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

---

### 5. Identified Tech Stack

Based on network inspection, script bundles, and DOM attributes:

1. **Core Web Framework**:
   - **Next.js (App Router)** + **React 18**: Evident from `_next/static/chunks/` script tags, Next image component wrappers (`_next/image?url=...`), and streaming server components.
2. **Styling & CSS**:
   - **Tailwind CSS** + **Tailwind Merge**: Utility classes with CSS custom properties (`var(--radius)`, `var(--canvas)`).
   - **Vanilla CSS 3D Transforms**: `perspective`, `transform-style: preserve-3d`, `rotateY`, `scale3d`.
3. **Animation & Smooth Scrolling**:
   - **Framer Motion (`framer-motion`)**: Drives element spring physics, entry stagger, and scroll-linked transforms.
   - **Lenis Smooth Scroll** / **GSAP ScrollTrigger**: Smooth momentum scroll hijacking to prevent jittery mouse wheel jumps during pinned stages.
4. **Typography**:
   - **Custom Grotesk Typeface**: `Cleo Grotesk` (custom cut of Neue Haas Grotesk / Söhne) loaded as WOFF2 with `font-display: swap`.
5. **Assets & Media**:
   - WebP image assets with responsive `srcset` resolutions.
   - Inline SVG vector paths for the iPhone 15 Pro hardware frame, antenna bands, Dynamic Island pill cutout, and speaker grille.
6. **Hosting & Edge Delivery**:
   - **Vercel** + **Cloudflare Edge CDN** (HTTP/3, Brotli compression, edge caching).