import React from "react";

const SidebarButton = ({
  icon,
  text,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3.5 transition-all duration-300 relative rounded-none select-none outline-none group ${
      active
        ? "bg-gradient-to-r from-blue-500/10 to-transparent text-blue-400 font-bold"
        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30"
    }`}
  >
    {/* Active left neon border */}
    {active && (
      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
    )}

    {/* Hover subtle line indicator */}
    {!active && (
      <span className="absolute left-0 top-0 bottom-0 w-0 bg-zinc-700 transition-all duration-300 group-hover:w-0.5" />
    )}

    {/* Icon with glowing active state */}
    <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? "text-blue-400 filter drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]" : "text-zinc-400 group-hover:text-zinc-200"}`}>
      {icon}
    </div>

    <span className="ml-4 font-mono tracking-wider text-xs uppercase">{text}</span>

    {/* High tech crosshair dash decorations */}
    {active && (
      <div className="absolute right-4 w-1.5 h-1.5 border-r border-t border-blue-400/50" />
    )}
  </button>
);

export default SidebarButton;
