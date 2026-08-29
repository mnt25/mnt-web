import React from "react";

interface SeparatorProps {
  className?: string;
  hasDot?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({ className = "", hasDot = true }) => {
  return (
    <div
      className={`relative w-full max-w-7xl mx-auto my-6 md:my-8 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-800 to-transparent pointer-events-none px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {hasDot && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-900 shadow-sm" />
      )}
      <div className="absolute left-4 sm:left-6 lg:left-8 -top-1 w-2 h-2 text-zinc-300 dark:text-zinc-700 font-mono text-[10px] leading-none select-none">+</div>
      <div className="absolute right-4 sm:right-6 lg:right-8 -top-1 w-2 h-2 text-zinc-300 dark:text-zinc-700 font-mono text-[10px] leading-none text-right select-none">+</div>
    </div>
  );
};
