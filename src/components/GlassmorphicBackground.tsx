import React from 'react';

/**
 * Premium glassmorphism animated background.
 * Uses hardware-accelerated slow-moving, blurred, translucent gradient orbs
 * to establish a modern, high-tech aesthetic without distracting from UI content.
 */
export const GlassmorphicBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-[#fafafa]"
    >
      {/* High-Tech Geometric Micro-grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />

      {/* Subtle ambient light gradient from top header */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/80 via-white/30 to-transparent" />

      {/* Orb 1 - Deep Indigo / Electric Violet (Top Left float) */}
      <div
        className="absolute -top-[10%] -left-[8%] w-[620px] h-[620px] rounded-full bg-gradient-to-br from-[#4f46e5]/14 via-[#7c3aed]/12 to-[#a855f7]/8 blur-[110px] animate-float-orb-1 opacity-80 will-change-transform"
      />

      {/* Orb 2 - Sky Cyan / Electric Azure (Top Right to Center float) */}
      <div
        className="absolute top-[8%] -right-[10%] w-[680px] h-[680px] rounded-full bg-gradient-to-bl from-[#0284c7]/14 via-[#38bdf8]/12 to-[#818cf8]/10 blur-[120px] animate-float-orb-2 opacity-75 will-change-transform"
      />

      {/* Orb 3 - High-Tech Royal Cobalt / Amethyst (Middle Right float) */}
      <div
        className="absolute top-[42%] right-[5%] w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-[#6366f1]/12 via-[#8b5cf6]/10 to-[#ec4899]/8 blur-[105px] animate-float-orb-3 opacity-70 will-change-transform"
      />

      {/* Orb 4 - Warm Rose / Amber Gold accent (Bottom Left float) */}
      <div
        className="absolute -bottom-[12%] left-[10%] w-[640px] h-[640px] rounded-full bg-gradient-to-tr from-[#f43f5e]/10 via-[#fb923c]/10 to-[#6366f1]/8 blur-[115px] animate-float-orb-4 opacity-65 will-change-transform"
      />

      {/* Orb 5 - Emerald / Cyber Teal Subtle Accent (Bottom Right float) */}
      <div
        className="absolute bottom-[4%] -right-[6%] w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-[#0d9488]/10 via-[#06b6d4]/10 to-[#3b82f6]/8 blur-[100px] animate-float-orb-5 opacity-60 will-change-transform"
      />

      {/* Modern Frosted Glass Overlay diffusion layer with subtle sheen */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/[0.22]" />

      {/* Vignette depth around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(244,244,245,0.35)_100%)]" />
    </div>
  );
};
