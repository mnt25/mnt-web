import React from "react";
import {
  X,
  LayoutDashboard,
  FileText,
  FolderKanban,
  MessageSquare,
  LogOut,
  Terminal,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SidebarButton from "./SidebarButton";
import { useTheme } from "../../context/ThemeContext";

interface Props {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const { theme, setTheme } = useTheme();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expire");
    window.location.href = "/pslogin";
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen
          bg-white/90 dark:bg-[#070708]/85 backdrop-blur-md 
          border-r border-slate-200 dark:border-zinc-800/80
          flex flex-col justify-between
          z-50 transform transition-all duration-300 ease-in-out relative
          ${sidebarCollapsed ? "md:w-[68px]" : "md:w-64"} w-64
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* DESKTOP COLLAPSE TOGGLE BUTTON */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="
            hidden md:flex items-center justify-center
            absolute -right-3.5 top-1/2 -translate-y-1/2 z-60
            w-7 h-7 rounded-full
            bg-white dark:bg-zinc-900
            border border-slate-200 dark:border-zinc-700
            text-slate-500 dark:text-zinc-400
            hover:text-blue-600 dark:hover:text-blue-400
            hover:border-blue-400 dark:hover:border-blue-500/60
            shadow-sm hover:shadow-blue-500/10
            transition-all duration-200
          "
          aria-label={sidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          title={sidebarCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>

        {/* HEADER BRANDING */}
        <div className="h-16 flex items-center px-4 justify-between border-b border-slate-200 dark:border-zinc-800/80 relative overflow-hidden">
          <div className={`flex items-center gap-3 transition-all duration-300 ${sidebarCollapsed ? "md:justify-center md:w-full" : ""}`}>
            <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0" />
            {!sidebarCollapsed && (
              <span className="font-mono text-sm tracking-wider font-extrabold text-slate-800 dark:text-zinc-100 uppercase whitespace-nowrap">
                PS // Console
              </span>
            )}
          </div>
          <button
            className="md:hidden text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
          {/* Subtle neon light ray below header */}
          <div className="absolute bottom-[-1px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>

        {/* LOGGED IN USER CONSOLE CARD */}
        {!sidebarCollapsed && (
          <div className="px-5 py-4 border-b border-slate-200 dark:border-zinc-800/40 bg-slate-50 dark:bg-zinc-950/20">
            <div className="flex items-center gap-3.5 p-3 border border-slate-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-950/50 rounded-none relative shadow-sm dark:shadow-none">
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-blue-500 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-blue-500 pointer-events-none" />
              <div className="w-8 h-8 rounded-none border border-slate-200 dark:border-zinc-800 flex items-center justify-center bg-slate-100 dark:bg-zinc-900/50 relative">
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">SYS</span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-zinc-950" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[10px] text-slate-500 dark:text-zinc-500 tracking-wider">USER_ROOT</span>
                <span className="block font-mono text-xs font-bold text-slate-800 dark:text-zinc-300 truncate">adminmaster</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed: avatar only */}
        {sidebarCollapsed && (
          <div className="hidden md:flex justify-center py-4 border-b border-slate-200 dark:border-zinc-800/40 bg-slate-50 dark:bg-zinc-950/20">
            <div className="w-8 h-8 rounded-none border border-slate-200 dark:border-zinc-800 flex items-center justify-center bg-slate-100 dark:bg-zinc-900/50 relative">
              <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400">SYS</span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-zinc-950" />
            </div>
          </div>
        )}

        {/* NAVIGATION LIST */}
        <nav className={`flex-1 p-3 space-y-1.5 overflow-y-auto mt-2 ${sidebarCollapsed ? "md:px-2" : ""}`}>
          <SidebarButton
            icon={<LayoutDashboard className="w-4 h-4" />}
            text="Tổng quan"
            active={activeTab === "dashboard"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("dashboard");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FileText className="w-4 h-4" />}
            text="Quản lý CV"
            active={activeTab === "cv"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("cv");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<FolderKanban className="w-4 h-4" />}
            text="Dự án"
            active={activeTab === "projects"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("projects");
              setSidebarOpen(false);
            }}
          />
          <SidebarButton
            icon={<MessageSquare className="w-4 h-4" />}
            text="Tin nhắn"
            active={activeTab === "messages"}
            collapsed={sidebarCollapsed}
            onClick={() => {
              setActiveTab("messages");
              setSidebarOpen(false);
            }}
          />
        </nav>

        {/* LOGOUT & THEME BUTTON CONTAINER */}
        <div className={`p-3 border-t border-slate-200 dark:border-zinc-800/80 bg-slate-50 dark:bg-zinc-950/20 flex gap-2 ${sidebarCollapsed ? "md:flex-col md:items-center md:p-2" : ""}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center justify-center px-3 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-200 dark:border-red-500/10 hover:border-red-300 dark:hover:border-red-500/30 bg-red-50 dark:bg-red-950/5 hover:bg-red-100 dark:hover:bg-red-950/20 rounded-none transition-all duration-300 font-mono tracking-wider text-xs uppercase
              ${sidebarCollapsed ? "md:w-10 md:h-10 md:flex-none" : "flex-1"}`}
            title="Đăng xuất"
            aria-label="Đăng xuất"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span className="ml-2 hidden md:inline">Đăng xuất</span>}
            <span className="ml-2 md:hidden">Đăng xuất</span>
          </button>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center justify-center border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 shrink-0
              ${sidebarCollapsed ? "md:w-10 md:h-10" : "w-11 h-11"}`}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Chuyển sang sáng" : "Chuyển sang tối"}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
