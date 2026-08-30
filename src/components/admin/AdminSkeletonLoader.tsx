import React from "react";

interface AdminSkeletonLoaderProps {
  title?: string;
  italicWord?: string;
  endWord?: string;
  subtitle?: string;
  cardsCount?: number;
}

const AdminSkeletonLoader: React.FC<AdminSkeletonLoaderProps> = ({
  title = "Đang",
  italicWord = "nạp",
  endWord = "dữ liệu",
  subtitle = "Đang đồng bộ luồng dữ liệu máy chủ — kiên nhẫn một chút nhé!",
  cardsCount = 6,
}) => {
  return (
    <div className="w-full space-y-8 select-none font-sans py-2 animate-in fade-in duration-300">
      {/* Top Banner & Progress Block */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
        {/* Typographic Title with Homepage Cyan Brand Palette */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase">
            <span>ADMIN // SYSTEM PIPELINE</span>
            <span>•</span>
            <span className="text-cyan-600 dark:text-cyan-400">ĐANG ĐỒNG BỘ DỮ LIỆU...</span>
          </div>

          <div className="flex items-baseline gap-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-950 dark:text-white">
              <span className="text-cyan-600 dark:text-cyan-400">{title} </span>
              <span className="italic font-serif text-teal-600 dark:text-teal-300 font-normal">{italicWord} </span>
              <span>{endWord}</span>
            </h1>
            <span className="text-cyan-500 dark:text-cyan-400 text-3xl sm:text-4xl select-none leading-none animate-pulse drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">
              ★
            </span>
          </div>
        </div>

        {/* Coffee / Progress Card with Modern Cyan Glow & Hard Shadow */}
        <div className="w-full lg:max-w-md p-4 sm:p-5 rounded-2xl border-2 border-cyan-500/30 dark:border-cyan-500/25 bg-white/85 dark:bg-zinc-900/80 shadow-[4px_4px_0px_0px_rgba(6,182,212,0.25)] dark:shadow-[4px_4px_0px_0px_rgba(6,182,212,0.15)] space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-wide text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="text-base">☕</span> CẦM CỐC CÀ PHÊ
            </span>
            <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-500/20 px-2.5 py-0.5 rounded-full font-semibold border border-cyan-500/20">
              LIVE PIPELINE
            </span>
          </div>

          <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {subtitle}
          </p>

          {/* Animated Progress Bar matching Homepage Gradient */}
          <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative border border-cyan-500/20">
            <div
              className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)] animate-[progressGpu_1.2s_linear_infinite]"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </div>

      {/* Modern Skeleton Grid Cards with Cyan Touches */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: cardsCount }).map((_, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-2xl border-2 border-black/10 dark:border-white/10 hover:border-cyan-500/30 bg-white/70 dark:bg-zinc-900/60 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.06)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.04)] space-y-4 relative overflow-hidden transition-colors"
          >
            {/* Header pill badge (e.g. # 01, # 02) */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800/80 rounded-md animate-pulse" />
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                # {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Skeleton paragraph rows simulating content */}
            <div className="space-y-2.5 pt-1">
              <div className="h-3.5 w-full bg-zinc-200 dark:bg-zinc-800/70 rounded-md animate-pulse" />
              <div className="h-3.5 w-5/6 bg-zinc-200 dark:bg-zinc-800/70 rounded-md animate-pulse" />
              <div className="h-3.5 w-4/6 bg-zinc-200 dark:bg-zinc-800/70 rounded-md animate-pulse" />
            </div>

            {/* Bottom tag / button placeholder */}
            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800/80 rounded-md animate-pulse" />
                <div className="h-4 w-14 bg-zinc-200 dark:bg-zinc-800/80 rounded-md animate-pulse" />
              </div>
              <div className="h-6 w-16 bg-cyan-500/15 rounded-full animate-pulse border border-cyan-500/20" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes progressGpu {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSkeletonLoader;
