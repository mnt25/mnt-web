import React from "react";

const GrowingRootsBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none">
      {/* Background Matrix Grid */}
      <div
        className="absolute inset-0 bg-[#fafafa] dark:bg-[#09090b] transition-colors duration-500"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.04) 1px, transparent 0)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.04) 1px, transparent 0)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Subtle Vertical Architectural Guide Lines for 7xl Layout */}
      <div className="absolute inset-0 max-w-7xl mx-auto border-x border-black/[0.04] dark:border-white/[0.04] pointer-events-none" />

      {/* Ambient Top Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-cyan-500/[0.04] dark:from-cyan-500/[0.06] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default GrowingRootsBackground;
