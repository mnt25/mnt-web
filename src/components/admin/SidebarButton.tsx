import React from "react";

const SidebarButton = ({
  icon,
  text,
  active,
  onClick,
  collapsed = false,
}: {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
  collapsed?: boolean;
}) => (
  <button
    onClick={onClick}
    title={collapsed ? text : undefined}
    className={`flex items-center w-full transition-all duration-200 select-none outline-none group rounded-xl font-medium cursor-pointer
      ${collapsed ? "px-0 py-3 justify-center" : "px-3.5 py-3"}
      ${
        active
          ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold shadow-xs"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60 border border-transparent"
      }`}
  >
    {/* Icon */}
    <div
      className={`transition-transform duration-200 group-hover:scale-110 shrink-0 ${
        active
          ? "text-cyan-600 dark:text-cyan-400"
          : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
      }`}
    >
      {icon}
    </div>

    {!collapsed && (
      <span className="ml-3 font-mono text-xs tracking-tight truncate">
        {text}
      </span>
    )}

    {/* Active indicator dot */}
    {active && !collapsed && (
      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-sm" />
    )}
  </button>
);

export default SidebarButton;
